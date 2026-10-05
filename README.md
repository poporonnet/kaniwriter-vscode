# kaniwriter-vscode README

kaniwriter integration for VSCode.

## Features

- Upload the current mruby/c program and open kaniwriter

## Installation

Download the latest `.vsix` file from [release page](https://github.com/poporonnet/kaniwriter-vscode/releases) and install it in VSCode.

## How to use

Open any `.rb` file and click `▶` icon in the menu bar.

## Configuration

- `kaniwriter-vscode.compilerInstance`: Select the instance of kanicc ( online compiler ) to use.
- `kaniwriter-vscode.writerInstance`: Select the instance of kaniwriter ( web writer ) to use.
- `kaniwriter-vscode.customCompilerUrl`: Define custom URL for kanicc. Effective only when `compilerInstance` is set to `Custom`.
- `kaniwriter-vscode.customWriterUrl`: Define custom URL for kaniwriter. Effective only when `writerInstance` is set to `Custom`.

## License

MIT: see [LICENSE](./LICENSE).
