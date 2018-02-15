let Util = require('./util');
let AJSParser = require('./base.parser');

module.exports = class FunctionParser extends AJSParser {
  
  parse() {
    let functionData = {};
    functionData.functionName = this.getFunctionName();
    return functionData;
  }

  getFunctionName(){
    let name = this.scriptStr.replace(/\s+|[=()>{]|(vm.)|function\(.+/g, '');
    return name;
  }
}
