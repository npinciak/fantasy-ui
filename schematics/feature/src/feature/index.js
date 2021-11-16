"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.feature = void 0;
var core_1 = require("@angular-devkit/core");
var schematics_1 = require("@angular-devkit/schematics");
function feature(options) {
    return function (tree, _context) {
        if (!tree) {
            throw new Error('tree cannot be null');
        }
        var folderName = options.folderName;
        var path = "src/app/" + core_1.strings.dasherize(folderName);
        var templateSource = schematics_1.apply(schematics_1.url('../../files'), [
            schematics_1.template(__assign(__assign(__assign({}, core_1.strings), options), { uppercase: function (s) { return s.toUpperCase(); } })),
            schematics_1.move(path),
        ]);
        return schematics_1.branchAndMerge(schematics_1.mergeWith(templateSource));
    };
}
exports.feature = feature;
