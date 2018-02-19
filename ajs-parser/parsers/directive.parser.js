let Util = require('./util');
let AJSParser = require('./base.parser');

module.exports = class DirectiveParser extends AJSParser {
  
  parse() {
    let directiveData = {};
    directiveData.moduleName = this.getModuleName();
    directiveData.directiveName = this.getDirectiveName();
    directiveData.directiveName_ = Util.fromCammelCase(directiveData.directiveName);
    directiveData.scope = this.getBindings();
    directiveData.restrict = this.getRestrict();
    directiveData.metas = this.getMetas();
    return directiveData;
  }

  getMetas() {
    let metas = {
      scope: '',
      priority: 'priority: 0',
    };
    let priority = this.scriptStr;

    if(this.scriptStr.indexOf('scope') !== -1){
      metas.scope = '@scope';
    }
    priority = priority.match(/\spriority:\s[0-9]+\,/gm);
    priority = priority && priority.length ? priority[0] : '';
    priority = priority.replace(/[^0-9]/g, '');
    if(priority != ''){
      metas.priority = 'priority: '+priority;
    }

    return metas;
  }

  getBindings() {
    let fileData = this.scriptStr;
    fileData = fileData.replace(/^[ ]*[*/].*|[ ]/gm, '');
    fileData = fileData.replace(/^[ ]*[*/].*|[ ]|\n/gm, '');
    let scope = fileData.match(/scope:{.*?}/g);
    scope = scope ? scope[0].substr(6) : '{}';
    eval('scope = ' + scope);
    return scope || {};
  }

  getModuleName(){
    let toks = this.path.split('/');
    let name = Util.toCammelCase(toks[toks.length - 2]);
    return name;
  }

  getDirectiveName(){
    let name = this.scriptStr.match(/^\s*.*(function)*\(\)/gm);
    name = name[0] || '';
    name = name.replace(/\s|\(|\)|export|function|default/g, '');
    return name;
  }

  getRestrict() {
    let directiveData;
    let restrict = 'AE';
    directiveData = this.scriptStr;
    directiveData = directiveData.replace(/^[ ]*[*/].*/gm, '');
    restrict = directiveData.match(/^[ ]*restrict.*$/gm);
    if(!restrict) return 'AE';
    restrict = restrict.length ? restrict[0] : 'E';
    restrict = restrict.match(/[`"'][AE][`"']/g)[0];
    restrict = restrict.replace(/[`"']|\s/g,'');
    return restrict;
  }
}
