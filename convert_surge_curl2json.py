import json
import shlex
from dataclasses import asdict


import utils
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


if __name__ == "__main__":
    utils.find_files('requests_and_responses/requests/curls', 'requests_and_responses/requests/jsons', restrict_orig_file_type='txt', new_file_type='json', handler=rewrite)
