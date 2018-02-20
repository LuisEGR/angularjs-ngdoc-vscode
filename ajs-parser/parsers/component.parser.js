let Util = require('./util');
let AJSParser = require('./base.parser');

module.exports = class ComponentParser extends AJSParser {
  
  parse() {
    let componentData = {};
    componentData.bindings = this.getBindings();
    componentData.componentName = this.getComponentName();
    componentData.componentName_ = Util.fromCammelCase(componentData.componentName);
    return componentData;
  }

  getBindings() {
    let fileData = this.scriptStr;
    if(fileData == '') return {};
    fileData = fileData.replace(/^[ ]*[*/].*/gm, '');
    let fromPos = fileData.search('bindings');
    let toPos = fromPos;
    let actualChar = '';
    while (/[}]/.test(actualChar) == false) {
      actualChar = fileData.charAt(toPos);
      toPos += 1;
    }
    let binds = {};
    eval(`binds = { ${fileData.slice(fromPos, toPos)} }`);
    return binds.bindings || {};
  }

  getComponentName(){
    let toks = this.path.split('/');
    if(toks.length < 2) return 'componentName';
    let name = Util.toCammelCase(toks[toks.length - 2]);
    return name;
  }
}
