// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { TextEncoder } from 'util';
import * as vscode from 'vscode';

import { DepNodeProvider, Dependency } from './nodeDependencies';
import { JsonOutlineProvider } from './jsonOutline';
import { FtpExplorer } from './ftpExplorer';
import { FileExplorer } from './fileExplorer';
import { TestViewDragAndDrop } from './testViewDragAndDrop';
import { TestView } from './testView';
import ColorsViewProvider from './ColorsViewProvider';
import CatCodingViewProvider from './CatCodingViewProvider';

let interval_id: any;

function showTime(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('This is the interval !!!!!!!!!! ' + new Date());

	console.log(process.env.PWD);

	console.log(context);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const provider = new ColorsViewProvider(context.extensionUri);

	showTime(context);

	// interval_id = setInterval(() => {
	// 	showTime(context);
	// }, 60000);

	// console.log(process);


	const { spawn } = require('node:child_process');
	const ls = spawn('docker', "ps -a".split(' '));

	ls.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "harold-extension" is now active!');


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('harold-extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from harold-extension!')

		const editor = vscode.window.activeTextEditor

		vscode.window.showInformationMessage(editor?.document.getText() || "No text selected")

	});

	let echo = vscode.commands.registerCommand('harold-extension.echo_selection', async () => {
		const editor = vscode.window.activeTextEditor

		if (!editor) {
			vscode.window.showInformationMessage("No open text editor")
			return // No open text editor
		}

		const msg = editor?.document.getText(editor.selection)

		console.log(msg)

		const resp = await vscode.window.showInformationMessage(msg || "No text selected", "Yes", "No")

		if (resp === "Yes" && msg) {
			editor.insertSnippet(new vscode.SnippetString("<h1>${1:${TM_SELECTED_TEXT}}$0</h1>"))
		}
	});

	let disposable2 = vscode.commands.registerCommand('harold-extension.quickpick', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const items = [
			{ id: 1, label: 'Quick Pick 1', detail: 'This is the Quick Pick 1', payload: { label: 'Quick Pick 1', detail: 'This is the Quick Pick 1' } },
			{ id: 2, label: 'Quick Pick 2', detail: 'This is the Quick Pick 2', payload: { label: 'Quick Pick 2', detail: 'This is the Quick Pick 2' } },
			{ id: 3, label: 'Quick Pick 3', detail: 'This is the Quick Pick 3', payload: { label: 'Quick Pick 3', detail: 'This is the Quick Pick 3' } },
			{ id: 4, label: 'Open chat.openai.com', detail: 'Open ChatGPT', fn: () => vscode.env.openExternal("https://chat.openai.com/chat" as any) },
		]

		const choice = await vscode.window.showQuickPick(items, {
			matchOnDetail: true
		});

		console.log(choice)

		if (choice?.id === 3) {
			const choice = await vscode.window.showQuickPick(items, {
				matchOnDetail: true
			});

			console.log(choice)
		}

		choice?.fn && choice.fn()
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(echo);
	context.subscriptions.push(disposable2);


	let currentPanel: vscode.WebviewPanel | undefined = undefined;

	const catCodingViewProvider = new CatCodingViewProvider(context);

	vscode.window.registerWebviewViewProvider('catCoding', catCodingViewProvider);

	context.subscriptions.push(
		vscode.commands.registerCommand('harold-extension.catCoding.start', () => {
			catCodingViewProvider.show();
		})
	);

	vscode.window.onDidOpenTerminal((terminal) => {
		console.log("terminal: ", terminal)

		// terminal.sendText("echo 'hello world'")
	})

	// vscode.window.createTerminal("My Terminal").show()

	context.subscriptions.push(
		vscode.commands.registerCommand('harold-extension.catCoding.doRefactor', () => {
			catCodingViewProvider.refactor();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('harold-extension.myAmazingExtension.persistWorkspaceData', async () => {
			console.log("context.storageUri: ", context.storageUri)

			if (!context.storageUri) {
				return;
			}

			// Create the extension's workspace storage folder if it doesn't already exist
			try {
				// When folder doesn't exist, and error gets thrown
				await vscode.workspace.fs.stat(context.storageUri);
			} catch {
				// Create the extension's workspace storage folder
				await vscode.workspace.fs.createDirectory(context.storageUri)
			}

			const workspaceData = vscode.Uri.joinPath(context.storageUri, 'workspace-data.json');
			const writeData = new TextEncoder().encode(JSON.stringify({ now: Date.now() }));
			vscode.workspace.fs.writeFile(workspaceData, writeData);
		}
		));

	context.subscriptions.push(
		vscode.commands.registerCommand('harold-extension.myAmazingExtension.persistGlobalData', async () => {
			console.log("context.globalStorageUri: ", context.globalStorageUri)

			if (!context.globalStorageUri) {
				return;
			}

			// Create the extension's global (cross-workspace) folder if it doesn't already exist
			try {
				// When folder doesn't exist, and error gets thrown
				await vscode.workspace.fs.stat(context.globalStorageUri);
			} catch {
				await vscode.workspace.fs.createDirectory(context.globalStorageUri)
			}

			const workspaceData = vscode.Uri.joinPath(context.globalStorageUri, 'global-data.json');
			const writeData = new TextEncoder().encode(JSON.stringify({ now: Date.now() }));
			vscode.workspace.fs.writeFile(workspaceData, writeData);
		}));

	vscode.window.onDidChangeActiveTextEditor((editor) => {
		console.log("editor: ", editor)
	})

	vscode.window.onDidChangeActiveColorTheme((theme) => {
		console.log("theme: ", theme)
	})

	vscode.languages.registerHoverProvider(
		{ scheme: 'typescript', },
		{
			provideHover(doc: vscode.TextDocument) {
				return new vscode.Hover('For *all* TypeScript documents.');
			}
		}
	);

	vscode.window.onDidChangeWindowState((windowState) => {
		console.log("windowState: ", windowState)
	})

	vscode.window.onDidChangeTerminalState((terminalState) => {
		console.log("terminalState: ", terminalState, terminalState.state)
	})

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ColorsViewProvider.viewType, provider));

	context.subscriptions.push(
		vscode.commands.registerCommand('calicoColors.addColor', () => {
			provider.addColor();
		}));

	context.subscriptions.push(
		vscode.commands.registerCommand('calicoColors.clearColors', () => {
			provider.clearColors();
		}));

	// from tree-view-sample (START)
	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	// Samples of `window.registerTreeDataProvider`
	const nodeDependenciesProvider = new DepNodeProvider(rootPath);
	vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
	vscode.commands.registerCommand('nodeDependencies.refreshEntry', () => nodeDependenciesProvider.refresh());
	vscode.commands.registerCommand('extension.openPackageOnNpm', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
	vscode.commands.registerCommand('nodeDependencies.addEntry', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
	vscode.commands.registerCommand('nodeDependencies.editEntry', (node: Dependency) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`));
	vscode.commands.registerCommand('nodeDependencies.deleteEntry', (node: Dependency) => vscode.window.showInformationMessage(`Successfully called delete entry on ${node.label}.`));

	const jsonOutlineProvider = new JsonOutlineProvider(context);
	vscode.window.registerTreeDataProvider('jsonOutline', jsonOutlineProvider);
	vscode.commands.registerCommand('jsonOutline.refresh', () => jsonOutlineProvider.refresh());
	vscode.commands.registerCommand('jsonOutline.refreshNode', offset => jsonOutlineProvider.refresh(offset));
	vscode.commands.registerCommand('jsonOutline.renameNode', args => {
		let offset = undefined;
		if (args.selectedTreeItems && args.selectedTreeItems.length) {
			offset = args.selectedTreeItems[0];
		} else if (typeof args === 'number') {
			// @ts-ignore
			offset = args;
		}
		if (offset) {
			jsonOutlineProvider.rename(offset);
		}
	});
	vscode.commands.registerCommand('extension.openJsonSelection', range => jsonOutlineProvider.select(range));

	// Samples of `window.createView`
	new FtpExplorer(context);
	new FileExplorer(context);

	// Test View
	new TestView(context);

	new TestViewDragAndDrop(context);
	// from tree-view-sample (END)
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log('----------------------------- deactivate');

	if (interval_id) {
		clearInterval(interval_id);
	}

}


