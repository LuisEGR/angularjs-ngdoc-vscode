let Util = require('./util');
let AJSParser = require('./base.parser');
module.exports = class ModuleParser extends AJSParser {
  parse() {
    let moduleData = {};
    moduleData.moduleName = this.getModuleName();
    moduleData.moduleName_ = Util.fromCammelCase(moduleData.moduleName);
    return moduleData;
  }

  getModuleName() {
    let moduleName; 
    moduleName = this.scriptStr.match(/^.*[ ]*.module\(.*$/gm);
    moduleName = moduleName.length ? moduleName[0] : '';
    moduleName = moduleName.match(/['"`]{1}[a-zA-Z]+['"`]{1}/g);
    moduleName = moduleName.length ? moduleName[0] : '';
    moduleName = moduleName.replace(/['"`]/g, '');
    return moduleName;
  }
}
