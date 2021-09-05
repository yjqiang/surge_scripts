import got, {Method, ResponseType} from "got";
import {readdirSync as fsReaddirSync, readFileSync as fsReadFileSync, statSync as fsStatSync} from 'fs';
import {Headers} from "got/dist/source/core";
import {extname as pathExtname, join as pathJoin} from "path";
import {strict as assert} from "assert";

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
 */
const find_files = function (orig_root: string): Array<string>{
    let result: Array<string> = [];
    for (let directory_name of fsReaddirSync(orig_root)){
        let directory_path = pathJoin(orig_root, directory_name);
        assert.equal(fsStatSync(directory_path).isDirectory(), true);  // 是个存在的文件夹

        for (let file_name of fsReaddirSync(directory_path)){
            let file_path = pathJoin(directory_path, file_name)

            assert.equal(fsStatSync(file_path).isFile(), true); // 是个存在的文件
            assert.equal(pathExtname(file_path), '.sgmodule');

            result.push(file_path);
        }

    }
    return result;
};

export { async_request, read_json_file, read_text_file, read_request_json_file, find_files};
