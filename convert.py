import re
import os

          
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


def find_files(orig_root: str, new_root: str, directories: list[str]) -> None:
    """

    :param orig_root: 原始 js js 的文件夹隶属于哪个目录
    :param new_root: 处理后的 js 的文件夹隶属于哪个目录
    :param directories: 哪个文件夹（原始 js 和处理后的 js 的文件夹一致的）
    :return:
    """
    for directory in directories:
        orig_directory_path = os.path.join(orig_root, directory)
        new_directory_path = os.path.join(new_root, directory)
        os.makedirs(new_directory_path, exist_ok=True)  # Recursive directory creation function. Like mkdir(), but makes all intermediate-level directories needed to contain the leaf directory.
        for name in os.listdir(orig_directory_path):
            if not os.path.isdir(name):  # js 文件名
                orig_path = os.path.join(orig_directory_path, name)
                new_path = os.path.join(new_directory_path, name)
                rewrite_js_file(orig_path, new_path)


if __name__ == "__main__":
    find_files('dev', 'scripts', ['bilibili'])
