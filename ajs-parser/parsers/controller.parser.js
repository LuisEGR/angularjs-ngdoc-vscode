let AJSParser = require('./base.parser');

module.exports = class ControllerParser extends AJSParser {
  
  parse() {
    let componentData = {};
    componentData.controllerName = this.getControllerName();
    return componentData;
  }

  getControllerName(){
    let name = this.scriptStr.match(/^\s*.*(function)*\(\)/gm);
    name = name && name[0] ? name[0] : 'CONTROLLER_NAME';
    name = name.replace(/\s|\(|\)|export|function|default/g, '');
    return name;
  }
}
