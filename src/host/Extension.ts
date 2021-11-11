import * as vscode from 'vscode';
import {MarkdownEditorProvider} from "./Editor";
export const createMindMapExtensions = (context: vscode.ExtensionContext)=>{

	let disposables:{ dispose(): any }[]=[];
  const editor = vscode.window.registerCustomEditorProvider(
    "mcswift-mindmap.vscode-mindmap",
    new MarkdownEditorProvider(),
    { webviewOptions: { retainContextWhenHidden: true } }
  );
  disposables.push(editor);
  return disposables;
};

