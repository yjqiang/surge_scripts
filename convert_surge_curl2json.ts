import {strict as assert} from "assert";

import {split as shlexSplit} from "shlex";

import {parse_curl} from "./requests_and_responses/requests/parse_curl.js";
import {parse_echo} from "./requests_and_responses/requests/parse_echo.js";
import {handler_files, read_text_file, write_json_file} from "./runtime/utils.js";


function rewrite(orig_path: string, new_path: string): void {
    let lines = read_text_file(orig_path).split(/\r?\n/);  // https://stackoverflow.com/a/21895354
    assert.equal(lines.length === 1, true);

    let list_command = shlexSplit(lines[0])

    // 利用 | 把一行 str 分割成不同的命令（echo、curl 等）
    let dict_list_commands: { [key: string]: string[] } = {};
    let pre_index = 0;

    let i: number;

    i = 0
    for (let element of list_command) {
        if (element === '|') {  // 不同命令之间分割
            dict_list_commands[list_command[pre_index]] = list_command.slice(pre_index, i);
            pre_index = i + 1;  // 更新下个 list_command 的起始点
        }
        i += 1;
    }
    dict_list_commands[list_command[pre_index]] = list_command.slice(pre_index);

    // 特别处理数据
    i = 0;
    assert.equal('curl' in dict_list_commands, true);
    for (let element of dict_list_commands['curl']) {
        if ('@-' === element) {
            assert.equal('echo' in dict_list_commands, true);
            let echo = parse_echo(dict_list_commands['echo']);
            dict_list_commands['curl'][i] = echo.data;
        }
        i += 1;
    }

    let curl = parse_curl(dict_list_commands['curl']);

    write_json_file(new_path, curl.asdict());

    console.log(`DONE: ${orig_path} -> ${new_path}`);
}


handler_files('requests_and_responses/requests/curls', 'requests_and_responses/requests/jsons', rewrite, 'txt', 'json');
