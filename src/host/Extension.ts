import * as vscode from 'vscode';
import {MindMapEditorProvider} from "./Editor";
export const createMindMapExtensions = (context: vscode.ExtensionContext)=>{

	let disposables:{ dispose(): any }[]=[];
  const editor = vscode.window.registerCustomEditorProvider(
    "mcswift-mindmap.vscode-mindmap",
    new MindMapEditorProvider(),
    { webviewOptions: { retainContextWhenHidden: true } }
  );
  disposables.push(editor);
  return disposables;
};

