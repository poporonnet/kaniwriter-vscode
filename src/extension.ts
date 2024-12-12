import * as vscode from "vscode";

const compilerUrl = "https://ceres.epi.it.matsue-ct.ac.jp/compile";
const writerUrl = "https://ceres.epi.it.matsue-ct.ac.jp/writer";

export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand(
    "kaniwriter-vscode.open-kaniwriter",
    async () => {
      vscode.window.showInformationMessage("Hello World from Kaniwriter!");
      const editor = vscode.window.activeTextEditor;
      const code = editor?.document.getText();
      if (!code) return;

      const codeUploadRes = await fetch(`${compilerUrl}/code`, {
        method: "POST",
        body: JSON.stringify({ code: Buffer.from(code).toString("base64") }),
      });
      const id = ((await codeUploadRes.json()) as { id: string }).id;
      vscode.window.showInformationMessage(code ?? "");
      vscode.env.openExternal(vscode.Uri.parse(`${writerUrl}/?id=${id}`));
    }
  );

  context.subscriptions.push(disposable);
};

export const deactivate = () => {};
