import argparse

from typing import Optional
from dataclasses import dataclass

parser = argparse.ArgumentParser()

parser.add_argument('url')

parser.add_argument('-d', '--data', '--data-ascii', default=None)  # --data-ascii <data>: (HTTP) This is just an alias for -d, --data；这里都会解析为 data
parser.add_argument('--data-binary', default=None)

parser.add_argument('-X', '--request', default=None)  # Specifies a custom request method to use when communicating with the HTTP server.

parser.add_argument('-H', '--header', action='append', required=True)

#  These are special cases of 'store_const' used for storing the values True and False respectively. In addition, they create default values of False and True respectively.
parser.add_argument('--compressed', action='store_true')
parser.add_argument('-k', '--insecure', action='store_true')


@dataclass
class Curl:
    url: str
    method: str
    data: Optional[str]  # bytes 之后直接怼成 str eg: b'\\x09\\x09' => '\\x09\\x09'
    headers: dict[str, str]


def parse_curl(list_command: list[str]) -> Curl:
    assert list_command[0] == 'curl'
    parsed_args = parser.parse_args(list_command[1:])

    headers = {}
    for curl_header in parsed_args.header:
        header_key, header_value = curl_header.split(":", 1)
        headers[header_key] = header_value.strip()

    data = None
    if parsed_args.data is not None:  # 原文是 str，encode 并转成 '\\x4d\\x79\\x20\\x6e\\x61\\x6d\\x65\\x20\\x69\\x73\\x20\\x53\\x74\\xc3\\xa5\\x6c\\x65' 模式
        bytes_data = parsed_args.data.encode('utf-8')
        data = bytes_data.hex()  # eg: '4d79206e616d65206973205374c3a56c65'
        assert len(data) % 2 == 0
        data = ''.join(f'\\x{data[index: index+2]}' for index in range(0, len(data), 2))  # eg: '\\x4d\\x79\\x20\\x6e\\x61\\x6d\\x65\\x20\\x69\\x73\\x20\\x53\\x74\\xc3\\xa5\\x6c\\x65'
    elif parsed_args.data_binary is not None:  # 原文是 '\\x4d\\x79\\x20\\x6e\\x61\\x6d\\x65\\x20\\x69\\x73\\x20\\x53\\x74\\xc3\\xa5\\x6c\\x65' 模式
        data = parsed_args.data_binary

    url = parsed_args.url

    # 设置 method
    if parsed_args.request is not None:
        method = parsed_args.request.upper()
    elif data is not None:
        method = 'POST'
    else:
        method = "GET"

    return Curl(
        url=url,
        method=method,
        data=data,
        headers=headers,
    )
