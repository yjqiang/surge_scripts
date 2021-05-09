import json
import os
import shlex
from dataclasses import asdict


from requests_and_responses.requests.parse_curl import parse_curl
from requests_and_responses.requests.parse_echo import parse_echo


def rewrite(orig_path: str, new_path: str) -> None:
    with open(orig_path, encoding='utf8') as f:
        lines = f.readlines()
        assert len(lines) == 1

    list_command = shlex.split(lines[0])

    # 利用 | 把一行 str 分割成不同的命令（echo、curl 等）
    dict_list_commands = {}
    pre_index = 0
    for i, element in enumerate(list_command):
        if element == '|':  # 不同命令之间分割
            dict_list_commands[list_command[pre_index]] = list_command[pre_index: i]
            pre_index = i + 1  # 更新下个 list_command 的起始点
    dict_list_commands[list_command[pre_index]] = list_command[pre_index:]

    # 特别处理数据
    assert 'curl' in dict_list_commands
    for index, element in enumerate(dict_list_commands['curl']):
        if '@-' == element:
            assert 'echo' in dict_list_commands
            echo = parse_echo(dict_list_commands['echo'])
            dict_list_commands['curl'][index] = echo.data

    curl = parse_curl(dict_list_commands['curl'])

    with open(new_path, 'w+', encoding='utf8') as f:
        f.write(json.dumps(asdict(curl), indent=4))

    print(f'DONE: {orig_path} -> {new_path}')


def find_files(orig_root: str, new_root: str, directories: list[str]) -> None:
    """

    :param orig_root: 原始 curl 的文件夹隶属于哪个目录
    :param new_root: 处理后的 json 的文件夹隶属于哪个目录
    :param directories: 哪个文件夹（原始 curl 和处理后的 json 的文件夹一致的）
    :return:
    """
    for directory in directories:
        orig_directory_path = os.path.join(orig_root, directory)
        new_directory_path = os.path.join(new_root, directory)
        os.makedirs(new_directory_path, exist_ok=True)  # Recursive directory creation function. Like mkdir(), but makes all intermediate-level directories needed to contain the leaf directory.
        for name in os.listdir(orig_directory_path):
            orig_path = os.path.join(orig_directory_path, name)
            if os.path.isfile(orig_path):  # 文件名
                new_path = os.path.join(new_directory_path, os.path.splitext(name)[0] + '.json')  # os.path.splitext(name) -> ('my_file', '.txt')
                rewrite(orig_path, new_path)


if __name__ == "__main__":
    find_files('requests_and_responses/requests/curls', 'requests_and_responses/requests/jsons', ['test'])
