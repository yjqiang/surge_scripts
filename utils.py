import os
import shutil
from collections.abc import Callable
from typing import Optional


def find_files(orig_root: str, new_root: str, handler: Callable[[str, str], None], restrict_orig_file_type: str, new_file_type: str, exception_directory_names: Optional[list[str]] = None) -> None:
    """
    每个文件都处理后保存到新位置 orig_root/directory_name/file_name -- 处理文件 --> new_root/directory_name/file_name
    原始和处理后文件夹一致的
    :param new_file_type:
    :param restrict_orig_file_type: 限制 file 后缀（这里 js 包括了 *.js.example 文件）
    :param exception_directory_names: 排除
    :param handler:
    :param orig_root: 原始文件夹隶属于哪个目录
    :param new_root: 处理后文件夹隶属于哪个目录
    :return:
    """
    if exception_directory_names is None:
        exception_directory_names = []

    for directory_name in os.listdir(orig_root):
        orig_directory_path = os.path.join(orig_root, directory_name)
        assert os.path.isdir(orig_directory_path)  # 是个存在的文件夹

        if directory_name in exception_directory_names:
            continue

        new_directory_path = os.path.join(new_root, directory_name)

        # 如果没有 new_directory_path，就创建一个出来；否则使用 shutil.rmtree 确保此文件夹内数据清空
        if os.path.isdir(new_directory_path):
            shutil.rmtree(new_directory_path)
        os.makedirs(new_directory_path)  # Recursive directory creation function. Like mkdir(), but makes all intermediate-level directories needed to contain the leaf directory.

        for orig_file_name in os.listdir(orig_directory_path):
            orig_file_path = os.path.join(orig_directory_path, orig_file_name)
            split_file_name = orig_file_name.split('.')
            assert os.path.isfile(orig_file_path)  # 是个存在的文件
            if split_file_name[1] == restrict_orig_file_type:
                split_file_name[1] = new_file_type
                new_file_path = os.path.join(new_directory_path, '.'.join(split_file_name))
                handler(orig_file_path, new_file_path)
