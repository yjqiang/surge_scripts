import {strict as assert} from "assert";

import {Command } from "commander";


class Echo {
    data: string;

    constructor(data: string) {
        this.data = data;
    }
}


function parse_echo(list_command: string[]): Echo {
    // 如果 command 作为全局变量，似乎会出现不同的输入互相干扰的情况，不知道为啥
    let program = new Command();
    program
        .option('-n [nn]');

    assert.equal(list_command[0] === 'echo', true);

    let parsed_args = program.parse(list_command.slice(1), { from: 'user' }).opts();

    return new Echo(
        parsed_args.n,
    )
}


export { parse_echo };
