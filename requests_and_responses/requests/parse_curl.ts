import {strict as assert} from "assert";
import { Buffer } from 'buffer';

import {Command } from "commander";


class Curl {
    url: string;
    method: string;
    data: string | null;  // bytes 之后直接怼成 str eg: b'\\x09\\x09' => '\\x09\\x09'
    headers: { [key: string]: string }

    constructor(url: string, method: string, data: string | null, headers: { [key: string]: string }) {
        this.url = url;
        this.method = method;
        this.data = data;
        this.headers = headers;
    }

    asdict(): any {
        return {
            url: this.url,
            method: this.method,
            data: this.data,
            headers: this.headers
        }
    }
}

function collect(value: string, previous: string[]): string[] {
    return previous.concat([value]);
}

function parse_curl(list_command: string[]): Curl {
    // 如果 command 作为全局变量，似乎会出现不同的输入互相干扰的情况，不知道为啥
    let program = new Command();
    program
        // --data-ascii <data>: (HTTP) This is just an alias for -d, --data；这里都会解析为 data
        .option('-d, --data, --data-ascii [data]', '', null)
        .option('--data-binary [data-binary]', '', null)

        // Specifies a custom request method to use when communicating with the HTTP server.
        .option('-X, --request [request]', '', null)

        .option('-H, --header <headers>','repeatable value', collect, [])

        .option('--compressed', '', false)
        .option('-k, --insecure', '', false);

    assert.equal(list_command[0] === 'curl', true);

    program.parse(list_command.slice(1), { from: 'user' });

    // https://github.com/tj/commander.js#common-option-types-boolean-and-value
    // program.parse(arguments) processes the arguments, leaving any args not consumed by the program options in the program.args array.
    assert.equal(program.args.length === 1, true);
    let url: string = program.args[0];

    let parsed_args = program.opts();

    let headers: { [key: string]: string } = {};
    let curl_header: string;
    for (curl_header of parsed_args.header) {
        // https://stackoverflow.com/a/25177077
        let parts = curl_header.split(":");
        let header_key = parts[0];
        let header_value = parts.slice(1).join(':');
        headers[header_key] = header_value.trim();
    }

    let data: string | null = null;
    if (parsed_args.data !== null){  // 原文是 str，encode 并转成 '\\x4d\\x79\\x20\\x6e\\x61\\x6d\\x65\\x20\\x69\\x73\\x20\\x53\\x74\\xc3\\xa5\\x6c\\x65' 模式
        let buf: Buffer = Buffer.from(parsed_args.data, 'utf-8');
        data = buf.toString('hex');  // eg: '4d79206e616d65206973205374c3a56c65'

        assert.equal(data.length % 2 === 0, true);

        // eg: '\\x4d\\x79\\x20\\x6e\\x61\\x6d\\x65\\x20\\x69\\x73\\x20\\x53\\x74\\xc3\\xa5\\x6c\\x65'
        let array_data: string[] = [];
        for (let i = 0; i < data.length; i += 2)
            array_data.push(`\\x${data.slice(i, i+2)}`);
        data = array_data.join('');
    }
    else if (parsed_args.dataBinary !== null) // 原文是 '\\x4d\\x79\\x20\\x6e\\x61\\x6d\\x65\\x20\\x69\\x73\\x20\\x53\\x74\\xc3\\xa5\\x6c\\x65' 模式
        data = parsed_args.dataBinary;

    let method: string;
    // 设置 method
    if (parsed_args.request !== null)
        method = parsed_args.request.toUpperCase();
    else if (data !== null)
        method = 'POST';
    else
        method = "GET";

    return new Curl(
        url,
        method,
        data,
        headers,
    )
}


export { parse_curl };
