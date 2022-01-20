import {writeFileSync} from 'fs';
import {handler_files, read_text_file} from "./runtime/utils.js"
import {EOL as osEOL} from "os";
          
const START_PATTERN = /^\s*\/\/\s*START\s*$/;
const END_PATTERN = /^\s*\/\/\s*END\s*$/;


function find_cursor(pattern: RegExp, lines: string[], start: number): number {
    let index = start;
    for (let line of lines)  {
        if (line.match(pattern) !== null)
            return index;
        index = index + 1;
    }
    throw pattern;
}


function rewrite_js_file(orig_path: string, new_path: string): void{
    let lines = read_text_file(orig_path).split(/\r?\n/);  // https://stackoverflow.com/a/21895354

    // START 表明 surge js 的起始点（为了方便调试，我们里面还有 require、模拟的请求等）
    let index_start = find_cursor(START_PATTERN, lines, 0);
    // 去缩进
    let indent = lines[index_start].indexOf('//');
    // 查最后有效行数
    let index_end = find_cursor(END_PATTERN, lines.slice(index_start+1), index_start+1);

    let new_lines = []
    for (let line of lines.slice(index_start+1, index_end)) {
        if (line.slice(indent))
            new_lines.push(line.slice(indent));  // 去除缩进
    }
    // https://stackoverflow.com/questions/10384340/how-to-append-to-new-line-in-node-js
    writeFileSync(new_path, new_lines.join(osEOL) + osEOL);

    console.log(`DONE: ${orig_path} -> ${new_path}`);
}
handler_files('dev', 'scripts', rewrite_js_file, '.js', '.js', ['test']);
