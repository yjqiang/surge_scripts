import got, {Method, ResponseType} from "got";
import {
    readdirSync as fsReaddirSync,
    readFileSync as fsReadFileSync,
    statSync as fsStatSync,
    rmSync as fsRmSync,
    mkdirSync as fsMkdirSync,
    existsSync as fsExistsSync, writeFileSync
} from 'fs';
import {Headers} from "got/dist/source/core/options";
import {
    extname as pathExtname,
    join as pathJoin} from "path";
import {strict as assert} from "assert";
import {EOL as osEOL} from "os";
import {gunzipSync as zlib_gunzipSync} from "zlib";

const async_request = async (method: Method, url: string, body: any=null, headers: Headers={}): Promise<{ body: string; status: number; headers: object }> => {
    let rsp;
    if (body === null)
        rsp = await got(
            url,
            {
                method: method,
                responseType: <ResponseType> 'text',
                headers: headers,
            },
        );
    else if (body instanceof Object)
        rsp = await got(
            url,
            {
                method: method,
                responseType: <ResponseType> 'text',
                json: body,
                headers: headers,
            },
        );

    else
        rsp = await got(
            url,
            {
                method: method,
                responseType: <ResponseType> 'text',
                body: body,
                headers: headers,
            },
        );
    return {
        body: rsp.body,
        status: rsp.statusCode,
        headers: rsp.headers,
    }
};

const read_text_file = (path: string): string =>
    fsReadFileSync(path, {encoding: 'utf8'});

const read_json_file = (path: string): any =>
    JSON.parse(read_text_file(path));

const write_json_file = (path: string, data: any): void => {
    let lines = JSON.stringify(data, null, 4).split(/\r?\n/);  // https://stackoverflow.com/a/21895354

    writeFileSync(path, lines.join(osEOL));
}


const read_request_json_file = (path: string): { url: string; method: Method; data: any; headers: Headers } =>{
    let request = read_json_file(path);

    let content_type = request['headers']['Content-Type'];
    if (request['headers'].hasOwnProperty('Content-Type')){
        console.assert(request['data'] !== null)
        if (content_type.includes('application/json'))  // 存在 "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            request['data'] = JSON.parse(
                Buffer.from((<string> request['data']).replace(/\\x/g, ''), 'hex')  // 读取 hex 数据读为 Buffer
                    .toString()
            );
        if (content_type.includes('application/x-www-form-urlencoded'))
            request['data'] = Buffer.from((<string> request['data']).replace(/\\x/g, ''), 'hex')  // 读取 hex 数据读为 Buffer
                .toString()
    }

    return {
        url: <string> request['url'],
        method: <Method> request['method'],
        data: <any> request['data'],
        headers: <Headers> request['headers'],
    }
};

/**
 * 查找每个文件 orig_root/directory_name/file_name
 * @param orig_root
 * @param restrict_orig_file_type 限制 file 后缀
 */
const find_files = function (orig_root: string, restrict_orig_file_type: string): Array<string>{
    let result: Array<string> = [];
    for (let directory_name of fsReaddirSync(orig_root)){
        let directory_path = pathJoin(orig_root, directory_name);
        assert.equal(fsStatSync(directory_path).isDirectory(), true);  // 是个存在的文件夹

        for (let file_name of fsReaddirSync(directory_path)){
            let file_path = pathJoin(directory_path, file_name)

            assert.equal(fsStatSync(file_path).isFile(), true); // 是个存在的文件
            if (pathExtname(file_path) === restrict_orig_file_type)
                result.push(file_path);
        }

    }
    return result;
};

/**
 * 每个文件都处理后保存到新位置 orig_root/directory_name/file_name -- 处理文件 --> new_root/directory_name/file_name
 * 原始和处理后文件夹一致的
 * @param orig_root 原始文件夹隶属于哪个目录
 * @param new_root 处理后文件夹隶属于哪个目录
 * @param handler
 * @param restrict_orig_file_type 限制 file 后缀
 * @param new_file_type
 * @param exception_directory_names
 */
const handler_files = function (orig_root: string, new_root: string, handler: Function, restrict_orig_file_type: string, new_file_type: string, exception_directory_names: null | Array<string> = null): void{
    if (exception_directory_names === null)
        exception_directory_names = []

    for (let directory_name of fsReaddirSync(orig_root)){
        let orig_directory_path = pathJoin(orig_root, directory_name);
        assert.equal(fsStatSync(orig_directory_path).isDirectory(), true);  // 是个存在的文件夹

        if (exception_directory_names.includes(directory_name))
            continue

        let new_directory_path = pathJoin(new_root, directory_name);

        // 如果没有 new_directory_path，就创建一个出来；否则确保此文件夹内数据清空
        if (fsExistsSync(new_directory_path) && fsStatSync(new_directory_path).isDirectory())
            fsRmSync(new_directory_path, {recursive: true});
        fsMkdirSync(new_directory_path);

        for (let orig_file_name of fsReaddirSync(orig_directory_path)){
            let orig_file_path = pathJoin(orig_directory_path, orig_file_name);
            assert.equal(fsStatSync(orig_file_path).isFile(), true); // 是个存在的文件

            let split_file_name = orig_file_name.split('.');
            if (split_file_name[1] === restrict_orig_file_type) {
                split_file_name[1] = new_file_type;
                let new_file_path = pathJoin(new_directory_path, split_file_name.join('.'));
                handler(orig_file_path, new_file_path);
            }
        }
    }
};



export { async_request, read_json_file, write_json_file, read_text_file, read_request_json_file, find_files, handler_files};
