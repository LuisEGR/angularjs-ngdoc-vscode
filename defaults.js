let _component = `
/**
  * @ngdoc component
  * @name moduleName.component:componentName
  *
  * @description
  * description
  * 
  * @param {type} param Description
*/`;

let _module = `
/**
  * @ngdoc overview
  * @name moduleName.module:moduleNameChild
  *
  * @description
  * description
  * 
  * @example
  *  <b>script.js</b>
  *  <pre>
  *  import moduleName from './location...'
  *  angular.module('myModule', [moduleName]);
  *  </pre>
  * 
*/`;

let _controller = `
/**
  * @this vm
  * @ngdoc controller
  * @name moduleName.controller:controllerName
  *
  * @description
  * description
*/`;

let _functionCtrl = `
/**
* @ngdoc method
* @name controllerName#onInit
*
* @methodOf
* moduleName.controller:controllerName
*
* @description
* Description
*
* @param {type} name description
* @return {type} name description
*/`;

module.exports = {
  _module, 
  _component, 
  _controller,
  _functionCtrl,
};
