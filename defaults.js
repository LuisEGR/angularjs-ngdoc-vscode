let _component = `
/**
  * @ngdoc component
  * @name MODULE_NAME.component:_COMPONENT_NAME_
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
  * @name MODULE_NAME.controller:_CONTROLLER_NAME_
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
  * MODULE_NAME.controller:_CONTROLLER_NAME_
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
  * @name MODULE_NAME.filter:_FILTER_NAME_
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

let _service = `
/**
  * @ngdoc service
  * @name MODULE_NAME.SERVICE_NAME
  * 
  * @description
  * Description...
  *
  * @example
  * example...
**/`;

let _directive = `
/**
  * @ngdoc directive
  * @name _MODULE_NAME_.directive:_DIRECTIVE_NAME_ 
  * @restrict '_RESTRICT_'
  * @element ANY
  * _META_SCOPE_
  * _META_PRIORITY_
  * @description
  * Description...
  *
  * _BINDINGS_
  * 
  * @example
  * example...
**/`;

module.exports = {
  _module, 
  _component, 
  _controller,
  _functionCtrl,
  _filter,
  _service,
  _directive,
};
