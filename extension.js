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
      let comparser = new AJSParser.ComponentParser(contenido, editor.document.uri.path);
      let componentData = comparser.parse();
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
        // _CONTROLLER_NAME_: controllerData.controllerName,
        _CONTROLLER_NAME_: '_CONTROLLER_NAME_',
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
      let functionData;
      let ngDoc;
      let spacesReq;
      if(editor.document.lineCount < 2 || position.line + 1 >= editor.document.lineCount){
        functionData = {
          functionName: 'FUNCTION_NAME',
        }
      }else{
        let lineFunction = editor.document.lineAt(position.line + 1);
        let functionStr = lineFunction.text;
        let functionParser = new AJSParser.FunctionParser(functionStr);
        functionData = functionParser.parse();
        spacesReq = lineFunction.firstNonWhitespaceCharacterIndex;
      }
      
      ngDoc = Util.processTemplate(defaultDocs._functionCtrl, {
        // _CONTROLLER_NAME_: controllerData.controllerName,
        _CONTROLLER_NAME_: '_CONTROLLER_NAME_',
        // _FUNCTION_NAME_: functionData.functionName
        _FUNCTION_NAME_: '_FUNCTION_NAME_'
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
      let contenido = editor.document.getText();
      let dirParser = new AJSParser.DirectiveParser(contenido, editor.document.uri.path);
      let directiveData = dirParser.parse();
      let bindingsComment = Util.generateBindingsParam(directiveData.scope);
      
      let ngDocTemplate = Util.processTemplate(defaultDocs._directive, {
        _MODULE_NAME_: directiveData.moduleName,
        _DIRECTIVE_NAME_: directiveData.directiveName,
        _BINDINGS_: bindingsComment,
        _RESTRICT_: directiveData.restrict,
        _META_SCOPE_: directiveData.metas['scope'],
        _META_PRIORITY_: directiveData.metas['priority'],
      });
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
