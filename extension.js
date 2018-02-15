// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const defaultDocs = require('./defaults.js');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "angularjs-ngdoc-generator" is now active!');

  let addNgDoc = (type) => {
    const editor = vscode.window.activeTextEditor;
    if(editor){
      const position = editor.selection.active;
      // let contenido = editor.document.getText();
      // const ubicacionArchivo = editor.document.uri.path;
      let lang = editor.document.languageId;
      if(lang == 'javascript'){
        editor.edit(editBuilder => {
          editBuilder.insert(position, defaultDocs[type]);
        });
      }
    }
  }

  let ngdocComponent = vscode.commands
    .registerCommand('extension.ngDocComponent', () => {
      addNgDoc('_component');
    });

  let ngdocModule = vscode.commands
    .registerCommand('extension.ngDocModule', () => {
      addNgDoc('_module');
    });

  let ngdocController = vscode.commands
    .registerCommand('extension.ngDocController', () => {
      addNgDoc('_controller');
    });

  let ngdocFunctionCtrl = vscode.commands
    .registerCommand('extension.ngDocFunctionCtrl', () => {
      addNgDoc('_functionCtrl');
    });

  context.subscriptions.push(ngdocModule);
  context.subscriptions.push(ngdocComponent);
  context.subscriptions.push(ngdocController);
  context.subscriptions.push(ngdocFunctionCtrl);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
