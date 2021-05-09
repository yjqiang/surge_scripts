import got, {Method, ResponseType} from "got";
import * as fs from 'fs';
import {Headers} from "got/dist/source/core";

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


const read_json_file = (path: string): any =>
    JSON.parse(fs.readFileSync(path, {encoding: 'utf8'}));

const read_text_file = (path: string): any =>
    fs.readFileSync(path, {encoding: 'utf8'});

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
}


export { async_request, read_json_file, read_text_file, read_request_json_file};
