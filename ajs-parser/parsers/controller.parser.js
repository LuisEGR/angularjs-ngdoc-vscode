let Util = require('./util');
let AJSParser = require('./base.parser');

module.exports = class ControllerParser extends AJSParser {
  
  parse() {
    let componentData = {};
    componentData.controllerName = this.getControllerName();
    return componentData;
  }

  getControllerName(){
    let name = this.scriptStr.match(/^\s*.*(function)*\(\)/gm);
    name = name[0] || '';
    name = name.replace(/\s|\(|\)|export|function|default/g, '');
    return name;
  }
}
