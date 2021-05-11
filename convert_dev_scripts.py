import re

import utils

          
START_PATTERN = re.compile(r'^\s*//\s*START\s*$')
END_PATTERN = re.compile(r'^\s*//\s*END\s*$')


def find_cursor(pattern, lines: list[str], start: int) -> int:
    for index, line in enumerate(lines, start):
        if re.fullmatch(pattern, line) is not None:
            return index
    raise Exception(pattern)    


def rewrite_js_file(orig_path: str, new_path: str) -> None:
    with open(orig_path, encoding='utf8') as f:
        lines = f.readlines()

        # START 表明 surge js 的起始点（为了方便调试，我们里面还有 require、模拟的请求等）
        index_start = find_cursor(START_PATTERN, lines, 0)
        # 去缩进
        indent = lines[index_start].find('//')
        # 查最后有效行数
        index_end = find_cursor(END_PATTERN, lines[index_start+1:], index_start+1)

    with open(new_path, 'w+', encoding='utf8') as f:
        for line in lines[index_start+1: index_end]:
            f.write(line[indent:])  # 去除缩进

    print(f'DONE: {orig_path} -> {new_path}')


if __name__ == "__main__":
    utils.find_files('dev', 'scripts', restrict_orig_file_type='js', new_file_type='js', handler=rewrite_js_file, exception_directory_names=['test'])
