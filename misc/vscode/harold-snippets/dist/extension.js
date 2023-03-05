/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("util");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const util_1 = __webpack_require__(3);
const vscode = __webpack_require__(1);
let interval_id;
const cats = {
    'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
    'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};
function showTime(context) {
    vscode.window.showInformationMessage('This is the interval !!!!!!!!!! ' + new Date());
    console.log(process.env.PWD);
    console.log(context);
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    showTime(context);
    // interval_id = setInterval(() => {
    // 	showTime(context);
    // }, 60000);
    // console.log(process);
    const { spawn } = __webpack_require__(2);
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
        vscode.window.showInformationMessage('Hello World from harold-extension!');
        const editor = vscode.window.activeTextEditor;
        vscode.window.showInformationMessage(editor?.document.getText() || "No text selected");
    });
    let echo = vscode.commands.registerCommand('harold-extension.echo_selection', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("No open text editor");
            return; // No open text editor
        }
        const msg = editor?.document.getText(editor.selection);
        console.log(msg);
        const resp = await vscode.window.showInformationMessage(msg || "No text selected", "Yes", "No");
        if (resp === "Yes" && msg) {
            editor.insertSnippet(new vscode.SnippetString("<h1>${1:${TM_SELECTED_TEXT}}$0</h1>"));
        }
    });
    let disposable2 = vscode.commands.registerCommand('harold-extension.quickpick', async () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const items = [
            { id: 1, label: 'Quick Pick 1', detail: 'This is the Quick Pick 1', payload: { label: 'Quick Pick 1', detail: 'This is the Quick Pick 1' } },
            { id: 2, label: 'Quick Pick 2', detail: 'This is the Quick Pick 2', payload: { label: 'Quick Pick 2', detail: 'This is the Quick Pick 2' } },
            { id: 3, label: 'Quick Pick 3', detail: 'This is the Quick Pick 3', payload: { label: 'Quick Pick 3', detail: 'This is the Quick Pick 3' } },
            { id: 4, label: 'Open chat.openai.com', detail: 'Open ChatGPT', fn: () => vscode.env.openExternal("https://chat.openai.com/chat") },
        ];
        const choice = await vscode.window.showQuickPick(items, {
            matchOnDetail: true
        });
        console.log(choice);
        if (choice?.id === 3) {
            const choice = await vscode.window.showQuickPick(items, {
                matchOnDetail: true
            });
            console.log(choice);
        }
        choice?.fn && choice.fn();
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(echo);
    context.subscriptions.push(disposable2);
    let currentPanel = undefined;
    context.subscriptions.push(vscode.commands.registerCommand('harold-extension.catCoding.start', () => {
        const columnToShowIn = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        if (currentPanel) {
            // If we already have a panel, show it in the target column
            currentPanel.reveal(columnToShowIn);
        }
        else {
            // Otherwise, create a new panel
            currentPanel = vscode.window.createWebviewPanel('catCoding', 'Cat Coding', columnToShowIn, {
                enableScripts: true,
            });
            currentPanel.webview.html = getWebviewContent();
            setupNewWebView(currentPanel);
        }
    }));
    function setupNewWebView(panel) {
        // Reset when the current panel is closed
        panel.onDidDispose(() => {
            currentPanel = undefined;
        }, null, context.subscriptions);
        // Update contents based on view state changes
        panel.onDidChangeViewState(e => {
            const panel = e.webviewPanel;
            console.log("panel.viewColumn: ", panel.viewColumn);
            switch (panel.viewColumn) {
                case vscode.ViewColumn.One:
                    updateWebviewForCat(panel, 'Coding Cat');
                    return;
                case vscode.ViewColumn.Two:
                    updateWebviewForCat(panel, 'Compiling Cat');
                    return;
                case vscode.ViewColumn.Three:
                    updateWebviewForCat(panel, 'Testing Cat');
                    return;
            }
        }, null, context.subscriptions);
        panel.webview.onDidReceiveMessage(message => {
            console.log("message: ", message);
            switch (message.command) {
                case 'alert':
                    vscode.window.showInformationMessage(message.text);
                    return;
            }
        }, undefined, context.subscriptions);
    }
    class CatCodingSerializer {
        async deserializeWebviewPanel(webviewPanel, state) {
            // `state` is the state persisted using `setState` inside the webview
            console.log(`Got state: ${state}`);
            currentPanel = webviewPanel;
            // Restore the content of our webview.
            //
            // Make sure we hold on to the `webviewPanel` passed in here and
            // also restore any event listeners we need on it.
            webviewPanel.webview.html = getWebviewContent();
            setupNewWebView(webviewPanel);
        }
    }
    vscode.window.registerWebviewPanelSerializer('catCoding', new CatCodingSerializer());
    vscode.window.onDidOpenTerminal((terminal) => {
        console.log("terminal: ", terminal);
        // terminal.sendText("echo 'hello world'")
    });
    // vscode.window.createTerminal("My Terminal").show()
    context.subscriptions.push(vscode.commands.registerCommand('harold-extension.catCoding.doRefactor', () => {
        if (!currentPanel) {
            return;
        }
        // Send a message to our webview.
        // You can send any JSON serializable data.
        currentPanel.webview.postMessage({ command: 'refactor', payload: { date: new Date() } });
    }));
    context.subscriptions.push(vscode.commands.registerCommand('harold-extension.myAmazingExtension.persistWorkspaceData', async () => {
        console.log("context.storageUri: ", context.storageUri);
        if (!context.storageUri) {
            return;
        }
        // Create the extension's workspace storage folder if it doesn't already exist
        try {
            // When folder doesn't exist, and error gets thrown
            await vscode.workspace.fs.stat(context.storageUri);
        }
        catch {
            // Create the extension's workspace storage folder
            await vscode.workspace.fs.createDirectory(context.storageUri);
        }
        const workspaceData = vscode.Uri.joinPath(context.storageUri, 'workspace-data.json');
        const writeData = new util_1.TextEncoder().encode(JSON.stringify({ now: Date.now() }));
        vscode.workspace.fs.writeFile(workspaceData, writeData);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('harold-extension.myAmazingExtension.persistGlobalData', async () => {
        console.log("context.globalStorageUri: ", context.globalStorageUri);
        if (!context.globalStorageUri) {
            return;
        }
        // Create the extension's global (cross-workspace) folder if it doesn't already exist
        try {
            // When folder doesn't exist, and error gets thrown
            await vscode.workspace.fs.stat(context.globalStorageUri);
        }
        catch {
            await vscode.workspace.fs.createDirectory(context.globalStorageUri);
        }
        const workspaceData = vscode.Uri.joinPath(context.globalStorageUri, 'global-data.json');
        const writeData = new util_1.TextEncoder().encode(JSON.stringify({ now: Date.now() }));
        vscode.workspace.fs.writeFile(workspaceData, writeData);
    }));
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        console.log("editor: ", editor);
    });
    vscode.window.onDidChangeActiveColorTheme((theme) => {
        console.log("theme: ", theme);
    });
    vscode.languages.registerHoverProvider({ scheme: 'typescript', }, {
        provideHover(doc) {
            return new vscode.Hover('For *all* TypeScript documents.');
        }
    });
    vscode.window.onDidChangeWindowState((windowState) => {
        console.log("windowState: ", windowState);
    });
    vscode.window.onDidChangeTerminalState((terminalState) => {
        console.log("terminalState: ", terminalState, terminalState.state);
    });
}
exports.activate = activate;
function updateWebviewForCat(panel, catName) {
    panel.title = catName;
    panel.webview.html = getWebviewContent(catName);
}
function getWebviewContent(cat = 'Coding Cat') {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  <img id="cat-container" src="${cats[cat]}" width="300" />

	  <h1 id="lines-of-code-counter">0</h1>
	  
	  <script>
	  const vscode = acquireVsCodeApi();

	  const previousState = vscode.getState();

	  const counter = document.getElementById('lines-of-code-counter');

	  let count = 0;
	  setInterval(() => {
		  counter.textContent = count++;
	  }, 100);

	  vscode.postMessage({
		command: 'alert',
		text: '🐛  on line ' + count,
		payload: {previousState: previousState}
	  })

	  // Handle the message inside the webview
	  window.addEventListener('message', event => {
		  console.log("event: ", event)

		  const message = event.data; // The JSON data our extension sent

		  switch (message.command) {
			  case 'refactor':
				  count = Math.ceil(count * 0.5);
				  counter.textContent = count;
				  vscode.postMessage({
					command: 'alert',
					text: '🐛  on line ' + count,
					payload: {msg: 'hello', previousState: previousState}
				  })
				  break;
		  }
	  });
  </script>
  </body>
  </html>`;
}
// This method is called when your extension is deactivated
function deactivate() {
    console.log('----------------------------- deactivate');
    if (interval_id) {
        clearInterval(interval_id);
    }
}
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map