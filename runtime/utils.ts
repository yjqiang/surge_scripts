import got, {Method, ResponseType} from "got";
import * as fs from 'fs';

const async_request = async (method: Method, url: string): Promise<{ body: any; status: number; headers: object }> => {
    let rsp = await got(
        url,
        {
            method: method,
            responseType: <ResponseType> 'text',
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


export { async_request, read_json_file, read_text_file};
