import * as vscode from 'vscode';
import { getNonce } from './GetNonce';

export const cats = {
    'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
    'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};

export default class CatCodingViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;
    private context: vscode.ExtensionContext;
    currentPanel?: vscode.WebviewPanel;

    constructor(
        private readonly _extensionUri: vscode.Uri, context: vscode.ExtensionContext,


    ) { this.context = context; }

    createWebviewView() {
        const columnToShowIn = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        this.currentPanel = vscode.window.createWebviewPanel(
            'catCoding',
            'Cat Coding',
            columnToShowIn as any,
            {
                enableScripts: true,
            }
        );
        this.currentPanel.webview.html = this._getHtmlForWebview();

        this.setupNewWebView(this.currentPanel);
    }

    setupNewWebView(panel: vscode.WebviewPanel) {
        // Reset when the current panel is closed
        panel.onDidDispose(
            () => {
                this.currentPanel = undefined;
            },
            null,
            this.context?.subscriptions
        );

        // Update contents based on view state changes
        panel.onDidChangeViewState(
            e => {
                const panel = e.webviewPanel;
                console.log("panel.viewColumn: ", panel.viewColumn)
                switch (panel.viewColumn) {
                    case vscode.ViewColumn.One:
                        this.updateWebviewForCat(panel, 'Coding Cat');
                        return;

                    case vscode.ViewColumn.Two:
                        this.updateWebviewForCat(panel, 'Compiling Cat');
                        return;

                    case vscode.ViewColumn.Three:
                        this.updateWebviewForCat(panel, 'Testing Cat');
                        return;
                }
            },
            null,
            this.context.subscriptions
        );

        panel.webview.onDidReceiveMessage(
            message => {
                console.log("message: ", message);

                switch (message.command) {
                    case 'alert':
                        vscode.window.showInformationMessage(message.text);
                        return;
                }
            },
            undefined,
            this.context.subscriptions
        );

    }

    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): void | Thenable<void> {
        this._view = webviewView;

        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,

            localResourceRoots: [
                this._extensionUri
            ]
        };

        webviewView.webview.html = this._getHtmlForWebview();
    }

    private _getHtmlForWebview(cat: keyof typeof cats = 'Coding Cat') {
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

    updateWebviewForCat(panel: vscode.WebviewPanel, catName: keyof typeof cats) {
        panel.title = catName;
        panel.webview.html = this._getHtmlForWebview(catName);
    }
}

