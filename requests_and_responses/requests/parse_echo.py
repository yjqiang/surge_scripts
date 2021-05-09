import argparse

from dataclasses import dataclass

parser = argparse.ArgumentParser()

parser.add_argument('-n', required=True)


@dataclass
class Echo:
    data: str


def parse_echo(list_command: list[str]) -> Echo:
    assert list_command[0] == 'echo'
    parsed_args = parser.parse_args(list_command[1:])

    return Echo(
        data=parsed_args.n,
    )
