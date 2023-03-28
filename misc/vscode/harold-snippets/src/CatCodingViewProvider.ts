import * as vscode from 'vscode';
import { getNonce } from './GetNonce';

export const cats = {
    'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
    'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};



class CatCodingSerializer implements vscode.WebviewPanelSerializer {
    constructor(private catCodingViewProvider: CatCodingViewProvider) { }

    async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
        // `state` is the state persisted using `setState` inside the webview
        console.log(`CatCodingViewProvider.ts:: deserializeWebviewPanel:: Got state: ${state}`);

        this.catCodingViewProvider.currentPanel = webviewPanel;

        // Restore the content of our webview.
        //
        // Make sure we hold on to the `webviewPanel` passed in here and
        // also restore any event listeners we need on it.
        webviewPanel.webview.html = this.catCodingViewProvider._getHtmlForWebview();

        this.catCodingViewProvider.setupNewWebView(webviewPanel);
    }
}

export default class CatCodingViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;
    currentPanel?: vscode.WebviewPanel;
    _extensionUri: vscode.Uri;
    catState?: string;

    constructor(
        private context: vscode.ExtensionContext,
    ) {
        this.context = context;
        this._extensionUri = context.extensionUri;

        vscode.window.registerWebviewPanelSerializer('catCoding', new CatCodingSerializer(this));

        context.subscriptions.push(
            vscode.commands.registerCommand('harold-extension.catCoding.start', () => {
                this.show();
            })
        );

        context.subscriptions.push(
            vscode.commands.registerCommand('harold-extension.catCoding.doRefactor', () => {
                this.refactor();
            })
        );
    }

    show() {
        console.log("CatCodingViewProvider:: show(): ", this.currentPanel)

        const columnToShowIn = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (this.currentPanel) {
            // If we already have a panel, show it in the target column
            this.currentPanel.reveal(columnToShowIn);
        } else {
            // Otherwise, create a new panel
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
    }

    refactor() {
        this.currentPanel?.webview.postMessage({ command: 'refactor', payload: { date: new Date() } });
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
                console.log("CatCodingViewProvider.ts:: onDidChangeViewState:: panel.viewColumn: ", panel.viewColumn, "this.catState:", this.catState)

                let new_state;

                switch (panel.viewColumn) {
                    case vscode.ViewColumn.One:
                        new_state = 'Coding Cat'
                        break;

                    case vscode.ViewColumn.Two:
                        new_state = 'Compiling Cat'
                        break;

                    case vscode.ViewColumn.Three:
                        new_state = 'Testing Cat'
                        break;
                }

                if (new_state && new_state !== this.catState) {
                    this.updateWebviewForCat(panel, new_state);
                }
                else {
                    console.log("CatCodingViewProvider.ts:: onDidChangeViewState:: no change")
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
        console.log("CatCodingViewProvider:: resolveWebviewView(): ", webviewView, context, token)

        this._view = webviewView;

        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,

            localResourceRoots: [
                this._extensionUri
            ]
        };
    }

    _getHtmlForWebview(cat: keyof typeof cats = 'Coding Cat') {
        this.catState = cat

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

