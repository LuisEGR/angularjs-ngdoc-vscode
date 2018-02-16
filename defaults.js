let _component = `
/**
  * @ngdoc component
  * @name moduleName.component:_COMPONENT_NAME_
  * _BINDINGS_
  *
  * @description
  * description
  * 
*/`;

let _module = `
/**
  * @ngdoc overview
  * @name _MODULENAME_.module:_MODULENAME_
  *
  * @description
  * description
  * 
  * @example
  *  <b>script.js</b>
  *  <pre>
  *  import _MODULENAME_ from './location...'
  *  angular.module('myModule', [_MODULENAME_]);
  *  </pre>
  * 
*/`;

let _controller = `
/**
  * @this vm
  * @ngdoc controller
  * @name moduleName.controller:_CONTROLLER_NAME_
  *
  * @description
  * description
*/`;

let _functionCtrl = `
/**
  * @ngdoc method
  * @name _CONTROLLER_NAME_#_FUNCTION_NAME_
  *
  * @methodOf
  * moduleName.controller:_CONTROLLER_NAME_
  *
  * @description
  * Description
  *
  * @param {type} name description
  * @return {type} name description
*/`;

let _filter = `
/**
* @ngdoc filter
* @name moduleName.filter:filterName
* @function
*
* @description
* Description...
*
* @param {type} name Description.
*
* @returns {type} description
*
* @example
* example...
*/`;

module.exports = {
  _module, 
  _component, 
  _controller,
  _functionCtrl,
  _filter,
};
