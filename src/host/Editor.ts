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
  path.resolve(__dirname, "../client/index.html"),{
    encoding: "utf8"
  }
);


export class MarkdownEditorProvider implements CustomTextEditorProvider {
	// constructor(private readonly drawioEditorService: DrawioEditorService) {}
  constructor(){}
  public async resolveCustomTextEditor(
		document: TextDocument,
		webviewPanel: WebviewPanel,
		token: CancellationToken
  ){
    const webview = webviewPanel.webview;
    webview.options = {
      enableScripts: true,
    };
    const scriptPath =  webview.asWebviewUri(
      vscode.Uri.file(
        path.resolve(
          __dirname,
          "./client/index.js"
          )
        )
      ).toString();
    
    webview.html = template.replace("{{client-entry}}", scriptPath);;
    
   return;
  }
}