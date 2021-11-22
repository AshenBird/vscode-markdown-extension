import {
  CancellationToken,
  CustomTextEditorProvider,
  Range,
  TextDocument,
  WebviewPanel,
  window,
  workspace,
  WorkspaceEdit,
} from "vscode";
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
const template = fs.readFileSync(
  path.resolve(__dirname, "../template.html"), {
  encoding: "utf8"
}
);
interface Message {
  type: "save" | "change",
  content: string
};


export class MindMapEditorProvider implements CustomTextEditorProvider {
  // constructor(private readonly drawioEditorService: DrawioEditorService) {}
  constructor() { }
  webview!: vscode.Webview;

  public async resolveCustomTextEditor(
    document: TextDocument,
    webviewPanel: WebviewPanel,
    token: CancellationToken
  ) {
    this.webview = webviewPanel.webview;
    this.webview.options = {
      enableScripts: true,
    };
    this.webview.html = this.createHTML(document);
    this.mountListener(document);
  }

  private async clientChange(content: string, document: TextDocument) {
    const workspaceEdit = new WorkspaceEdit();
    workspaceEdit.replace(
      document.uri,
      new Range(0, 0, document.lineCount, 0),
      content
    );
    workspace.applyEdit(workspaceEdit);
  }

  private createHTML(document: TextDocument) {
    const scriptPath = this.webview.asWebviewUri(
      vscode.Uri.file(
        path.resolve(
          __dirname,
          "../client/index.js"
        )
      )
    ).toString();
    return (template
      .replace("{{client-entry}}", scriptPath)
      .replace("{{init-data}}", document.getText()))
      .replace("{{init-config}}", "{}");
  }

  private mountListener(document: TextDocument) {
    this.webview.onDidReceiveMessage(({ type, content }: Message) => {
      const actions = {
        save(content: string) { },
        change: this.clientChange
      };
      actions[type](content, document);
    });

    vscode.workspace.onDidChangeTextDocument(async (e) => {
      if (e.document !== document) { return; }
      // Sometimes VS Code reports a document change without a change.
      if (e.contentChanges.length === 0) { return; }
      const newContent = e.document.getText();
      this.webview.postMessage({ type:"change", content: newContent});
    });
  }
}