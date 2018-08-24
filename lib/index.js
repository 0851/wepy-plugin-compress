'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _prettyData = require('pretty-data');

var _prettyData2 = _interopRequireDefault(_prettyData);

var _uglifyJs = require('uglify-js');

var _uglifyJs2 = _interopRequireDefault(_uglifyJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pd = _prettyData2.default.pd;

var _class = function () {
    function _class() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, _class);

        this.filter = config.filter || /\.(json|wxml|wxss|js)$/;
        this.pretty = (0, _extends3.default)({
            json: pd.jsonmin,
            wxml: pd.xmlmin,
            wxss: pd.cssmin,
            js: function js(code) {
                var minify = _uglifyJs2.default.minify(code);
                if (minify.error) {
                    console.log(minify.error);
                    process.exit(0);
                    return code;
                }
                return minify.code;
            }
        }, config.pretty || {});
    }

    (0, _createClass3.default)(_class, [{
        key: 'apply',
        value: function apply(op) {
            if (!op.code) {
                op.next();
                return;
            }
            if (!this.filter.test(op.file)) {
                op.next();
                return;
            }
            try {
                op.output && op.output({
                    action: '压缩',
                    file: op.file
                });
                var extname = _path2.default.extname(op.file).replace(/\./, "");
                var met = this.pretty[extname];
                if (_lodash2.default.isFunction(met)) {
                    op.code = met(op.code);
                }
                op.next();
            } catch (e) {
                console.error('\u5F02\u5E38\u5904\u7406 , ' + e.message);
                op.next();
                return;
            }
        }
    }]);
    return _class;
}();

exports.default = _class;
