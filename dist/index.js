module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(259);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 155:
/***/ (function(module) {

module.exports = eval("require")("got");


/***/ }),

/***/ 259:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(266);
const jsonbin = __webpack_require__(572);

(async () => {
  let result;
  const method = core.getInput('method');
  try {
    switch (method) {
      case 'CREATE':
        result = await jsonbin.create(
          core.getInput('api_key'),
          core.getInput('body')
        );
        break;
      case 'UPDATE':
        result = await jsonbin.update(
          core.getInput('api_key'),
          core.getInput('bin_id'),
          core.getInput('body')
        );
        break;
      case 'DELETE':
        result = await jsonbin.delete(
          core.getInput('api_key'),
          core.getInput('bin_id')
        );
        break;
      default:
        core.setFailed(`${method} method is not supported.`);
        return;
    }
  } catch (err) {
    core.setFailed(err.message);
    return;
  }
  core.setOutput('bin_id', result.id);
  core.setOutput('url', result.url);
})();

/***/ }),

/***/ 266:
/***/ (function(module) {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 572:
/***/ (function(module, __unusedexports, __webpack_require__) {

const got = __webpack_require__(155);

const URL = 'https://api.jsonbin.io/b/';

module.exports = {
  create: (apiKey, body) => {
    return got.post(URL, {
      body: body,
      headers: {
        'secret-key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(({ body }) => {
      const { success, id } = JSON.parse(body);
      if (success) {
        return {
          url: URL + id,
          id: id
        };
      } else {
        throw new Error(`POST ${URL} failed.`);
      }
    });
  },
  update: (apiKey, binId, body) => {
    return got.put(URL + binId, {
      body: body,
      headers: {
        'secret-key': apiKey,
        'Content-Type': 'application/json',
        'versioning': false
      }
    }).then(({ body }) => {
      const { success, parentId } = JSON.parse(body);
      if (success) {
        return {
          url: URL + parentId,
          id: parentId
        };
      } else {
        throw new Error(`PUT ${URL}/${binId} failed.`);
      }
    });
  },
  delete: (apiKey, binId) => {
    return got.delete(URL + binId, {
      headers: {
        'secret-key': apiKey
      }
    }).then(({ body }) => {
      const { success, id } = JSON.parse(body);
      if (success) {
        return {
          url: URL + id,
          id: id
        };
      } else {
        throw new Error(`DELETE ${URL}/${binId} failed.`);
      }
    });
  }
};

/***/ })

/******/ });