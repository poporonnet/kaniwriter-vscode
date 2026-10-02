import vscode from "vscode";

const getConfig = () => {
  const compilerUrlFallback = "https://ceres.epi.it.matsue-ct.ac.jp/compile";
  const writerUrlFallback = "https://kaniwriter.poporon.org";

  const config = vscode.workspace.getConfiguration("kaniwriter-vscode");

  const compilerUrl = config.get<(string & {}) | "custom">(
    "compilerUrl",
    "custom"
  );
  const writerUrl = config.get<(string & {}) | "custom">("writerUrl", "custom");

  const customCompilerUrl =
    config.get<string>("customCompilerUrl", compilerUrlFallback) ||
    compilerUrlFallback; // 空文字列もフォールバック
  const customWriterUrl =
    config.get<string>("customWriterUrl", writerUrlFallback) ||
    writerUrlFallback; // 空文字列もフォールバック

  return {
    compilerUrl: compilerUrl === "custom" ? customCompilerUrl : compilerUrl,
    writerUrl: writerUrl === "custom" ? customWriterUrl : writerUrl,
  };
};

type PostCodeRequest = {
  code: string;
};

type PostCodeResponse = {
  status: string;
  id: string;
};

export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand(
    "kaniwriter-vscode.open-kaniwriter",
    async () => {
      try {
        const { compilerUrl, writerUrl } = getConfig();

        const editor = vscode.window.activeTextEditor;
        const code = editor?.document.getText();
        if (!code) return;

        const uploadResponse = await fetch(`${compilerUrl}/code`, {
          method: "POST",
          body: JSON.stringify({
            code: Buffer.from(code).toString("base64"),
          } satisfies PostCodeRequest),
        });
        if (!uploadResponse.ok) {
          throw new Error("Failed to fetch kaniwriter", {
            cause: uploadResponse,
          });
        }

        const uploadResult = (await uploadResponse.json()) as PostCodeResponse;
        vscode.env.openExternal(
          vscode.Uri.parse(`${writerUrl}/?id=${uploadResult.id}`)
        );
      } catch (err) {
        console.error(err);
        const select = await vscode.window.showErrorMessage(
          "Failed to upload the program to kaniwriter",
          "Retry",
          "Close"
        );
        if (select === "Retry") {
          vscode.commands.executeCommand("kaniwriter-vscode.open-kaniwriter");
        }
      }
    }
  );

  context.subscriptions.push(disposable);
};

export const deactivate = () => {};
