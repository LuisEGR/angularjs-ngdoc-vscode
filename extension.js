// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const defaultDocs = require('./defaults.js');
const AJSParser = require('./ajs-parser');
const Util = require('./util');

let editor;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "angularjs-ngdoc-generator" is now active!');
  
  let addText = (text) => {
    // let lang = editor.document.languageId;
    // if(lang == 'javascript'){
    let position = editor.selection.active;
    editor.edit(editBuilder => {
      editBuilder.insert(position, text);
    });
    // }
  };
  
  let ngdocModule = vscode.commands
    .registerCommand('extension.ngDocModule', () => {
      editor = vscode.window.activeTextEditor;
      let contenido = editor.document.getText();
      let modparser = new AJSParser.ModuleParser(contenido);
      let moduleData = modparser.parse();
      let ngDocTemplate = '';
      ngDocTemplate = Util.processTemplate(defaultDocs._module, {
        '_MODULENAME_': moduleData.moduleName
      })
      addText(ngDocTemplate);
    });


  let ngdocComponent = vscode.commands
    .registerCommand('extension.ngDocComponent', () => {
      editor = vscode.window.activeTextEditor;
      let contenido = editor.document.getText();
      // console.log("Contenido:", contenido);
      let comparser = new AJSParser.ComponentParser(contenido, editor.document.uri.path);
      let componentData = comparser.parse();
      console.log("COMP:", componentData);
      let ngDocTemplate = '';
      let bindingsComment = Util.generateBindingsParam(componentData.bindings);
      ngDocTemplate = Util.processTemplate(defaultDocs._component, {
        _BINDINGS_: bindingsComment,
        _COMPONENT_NAME_: componentData.componentName,
      })
      addText(ngDocTemplate);
    });

 

  let ngdocController = vscode.commands
    .registerCommand('extension.ngDocController', () => {
      editor = vscode.window.activeTextEditor;
      let contenido = editor.document.getText();
      let contParser = new AJSParser.ControllerParser(contenido);
      let controllerData = contParser.parse();
      let ngDocTemplate = Util.processTemplate(defaultDocs._controller, {
        _CONTROLLER_NAME_: controllerData.controllerName,
      });
      addText(ngDocTemplate);
    });

  let ngdocFunctionCtrl = vscode.commands
    .registerCommand('extension.ngDocFunctionCtrl', () => {
      editor = vscode.window.activeTextEditor;
      let position = editor.selection.active;
      let contenido = editor.document.getText();
      let contParser = new AJSParser.ControllerParser(contenido);
      let controllerData = contParser.parse();
      let lineFunction = editor.document.lineAt(position.line + 1);
      let functionStr = lineFunction.text;
      let functionParser = new AJSParser.FunctionParser(functionStr);
      let functionData = functionParser.parse();
      let spacesReq = lineFunction.firstNonWhitespaceCharacterIndex;
      console.log("Posición:", position);
      console.log("functionStr:", functionStr);
      console.log("spacesReq:", spacesReq);
      let ngDoc = Util.processTemplate(defaultDocs._functionCtrl, {
        _CONTROLLER_NAME_: controllerData.controllerName,
        _FUNCTION_NAME_: functionData.functionName
      });
      if(spacesReq > 0){
        ngDoc = ngDoc.split('\n')
          .join('\n' + ' '.repeat(spacesReq));
      }
      addText(ngDoc);
    });

  let ngdocFilter = vscode.commands
    .registerCommand('extension.ngDocFilter', () => {
      editor = vscode.window.activeTextEditor;
      let ngDocTemplate = defaultDocs._filter;
      addText(ngDocTemplate);
    });

  let ngdocService = vscode.commands
    .registerCommand('extension.ngDocService', () => {
      editor = vscode.window.activeTextEditor;
      let ngDocTemplate = defaultDocs._service;
      addText(ngDocTemplate);
    });

  let ngdocDirective = vscode.commands
    .registerCommand('extension.ngDocDirective', () => {
      editor = vscode.window.activeTextEditor;
      let ngDocTemplate = defaultDocs._directive;
      addText(ngDocTemplate);
    });
    
  context.subscriptions.push(ngdocModule);
  context.subscriptions.push(ngdocComponent);
  context.subscriptions.push(ngdocController);
  context.subscriptions.push(ngdocFunctionCtrl);
  context.subscriptions.push(ngdocFilter);
  context.subscriptions.push(ngdocService);
  context.subscriptions.push(ngdocDirective);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
