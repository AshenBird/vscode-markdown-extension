
import * as vscode from 'vscode';
import {createMindMapExtensions} from "./Extension";
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(...createMindMapExtensions(context));
}

export function deactivate() {}
