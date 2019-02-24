"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var plugin,_regenerator=_interopRequireDefault(require("@babel/runtime/regenerator")),_typeof2=_interopRequireDefault(require("@babel/runtime/helpers/typeof")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),_StorageService=_interopRequireDefault(require("./StorageService")),_getRandomValues=_interopRequireDefault(require("get-random-values")),_createHash=_interopRequireDefault(require("create-hash")),iframe=parent,paired=!1,connected=!1,openRequests=[],allowReconnects=!0,sha256=function(a){return(0,_createHash.default)("sha256").update(a).digest("hex")},random=function(){var a=new Uint8Array(24);return(0,_getRandomValues.default)(a),a.join("")},_getOrigin=function getOrigin(){var a;return a="undefined"==typeof location?plugin:location.hasOwnProperty("hostname")&&location.hostname.length&&"localhost"!==location.hostname?location.hostname:plugin,"www."===a.substr(0,4)&&(a=a.replace("www.","")),a},appkey=_StorageService.default.getAppKey();Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;appkey||(appkey="appkey:"+random());var send=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:null,b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;null===a&&null===b?iframe.postMessage({protocol:"40/scatter"},"*"):iframe.postMessage({protocol:"42/scatter",type:a,data:b},"*")},pairingPromise=null,pair=function(){var a=!!(0<arguments.length&&arguments[0]!==void 0)&&arguments[0];return new Promise(function(b,c){pairingPromise={resolve:b,reject:c},send("pair",{data:{appkey:appkey,origin:_getOrigin(),passthrough:a},plugin:plugin})})},eventHandlers={},IframeService=/*#__PURE__*/function(){function a(){(0,_classCallCheck2.default)(this,a)}return(0,_createClass2.default)(a,null,[{key:"init",value:function init(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:6e4;plugin=a,this.timeout=b}},{key:"getOrigin",value:function getOrigin(){return _getOrigin()}},{key:"addEventHandler",value:function addEventHandler(a,b){b||(b="app"),eventHandlers[b]=a}},{key:"removeEventHandler",value:function removeEventHandler(a){a||(a="app"),delete eventHandlers[a]}},{key:"link",value:function link(){return connected?void 0:new Promise(/*#__PURE__*/function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){var c,d,e,f;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:window.addEventListener("message",function(a){if(!a.data.protocol||-1===a.data.protocol.indexOf("42/scatter"))return!1;// Real message
// const [type, data] = JSON.parse(msg.data.replace('42/scatter,', ''));
var b=a.data,g=b.type,h=b.data;return"paired"===g?c(h):"rekey"===g?d():"api"===g?e(h):"event"===g?f(h):void 0}),c=function(a){if(paired=a,paired){var b=_StorageService.default.getAppKey(),c=-1<appkey.indexOf("appkey:")?sha256(appkey):appkey;b&&b===c||(_StorageService.default.setAppKey(c),appkey=_StorageService.default.getAppKey())}pairingPromise.resolve(a)},d=function(){appkey="appkey:"+random(),send("rekeyed",{data:{appkey:appkey,origin:_getOrigin()},plugin:plugin})},e=function(a){var b=openRequests.find(function(b){return b.id===a.id});if(b){openRequests=openRequests.filter(function(b){return b.id!==a.id});var c="object"===(0,_typeof2.default)(a.result)&&null!==a.result&&a.result.hasOwnProperty("isError");c?b.reject(a.result):b.resolve(a.result)}},f=function(a){var b=a.event,c=a.payload;Object.keys(eventHandlers).length&&Object.keys(eventHandlers).map(function(a){eventHandlers[a](b,c)})},connected=!0,pair(!0).then(function(){b(!0)});case 7:case"end":return a.stop();}},a,this)}));return function(){return a.apply(this,arguments)}}())}},{key:"isConnected",value:function isConnected(){return connected}},{key:"isPaired",value:function isPaired(){return paired}},{key:"disconnect",value:function disconnect(){return!0}},{key:"removeAppKeys",value:function removeAppKeys(){_StorageService.default.removeAppKey(),_StorageService.default.removeNonce()}},{key:"sendApiRequest",value:function sendApiRequest(a){return new Promise(function(b,c){return"identityFromPermissions"!==a.type||paired?void pair().then(function(){if(!paired)return c({code:"not_paired",message:"The user did not allow this app to connect to their Scatter"});// Request ID used for resolving promises
a.id=random(),a.appkey=appkey,a.nonce=_StorageService.default.getNonce()||0;// Next nonce used to authenticate the next request
var d=random();a.nextNonce=sha256(d),_StorageService.default.setNonce(d),a.hasOwnProperty("payload")&&!a.payload.hasOwnProperty("origin")&&(a.payload.origin=_getOrigin()),openRequests.push(Object.assign({},a,{resolve:b,reject:c})),a=JSON.parse(JSON.stringify(a)),send("api",{data:a,plugin:plugin})}):b(!1)})}}]),a}();exports.default=IframeService;