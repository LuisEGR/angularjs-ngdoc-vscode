module.exports = class Util{
  static processTemplate(template, data){
    let proc = template;
    Object.keys(data).forEach((k) => {
      let reg = new RegExp(k,'g');
      proc = proc.replace(reg, data[k])
    });
    return proc;
  }

  static generateBindingsParam(bindings){
    let params = '';
    Object.keys(bindings).forEach((k) => {
      let type = Util.getTypeBinding(bindings[k]);
      params += ` \n  * @param {${type}} ${k} Description`;
    });
    return params;
  }

  static getTypeBinding(bind){
    switch(bind){
    case '<?': return 'Boolean';
    case '<': return 'Object';
    case '@?': return 'String';
    case '@': return 'String';
    case '&?': return 'Function';
    case '&': return 'Function';
    }
  }
}
