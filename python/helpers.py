import os


def get_directory(name: str):
    return f"{os.getcwd()}/models/{name}"


def check_path_exists(path):
    return os.path.exists(path)
