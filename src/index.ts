import * as vscode from 'vscode';
import * as fs from 'fs';
import { join as joinPath } from 'path';

const BASIC_CONFIG = `{
    "srcDir": "source",
    "buildDir": "build",
    "staticDir": "static",
    "HTMLcompressionLevel": 2
}`;

export function activate(context: vscode.ExtensionContext) {
    const createInitFile = vscode.commands.registerCommand("frost.init", () => {
        if (!vscode.workspace.rootPath) return vscode.window.showErrorMessage("Config File: No folder is opened.");
        const configFile = joinPath(vscode.workspace.rootPath, "frost.json");
        const metadataFile = joinPath(vscode.workspace.rootPath, "frost.metadata.json");
        if(fs.existsSync(configFile)) return vscode.window.showErrorMessage("Config file: frost.json already exists.")
        fs.writeFileSync(configFile, BASIC_CONFIG);
        if (!fs.existsSync(metadataFile)) fs.writeFileSync(metadataFile, "{\n    \n}");
    });
    
    context.subscriptions.push(createInitFile);
}

export function deactivate() {}