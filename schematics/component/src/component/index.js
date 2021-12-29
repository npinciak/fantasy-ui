"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.component = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
function component(options) {
    return (tree, _context) => {
        if (!tree) {
            throw new Error('tree cannot be null');
        }
        const { folderName } = options;
        const path = `src/app/${core_1.strings.dasherize(folderName)}`;
        const templateSource = schematics_1.apply(schematics_1.url('../../files'), [
            schematics_1.template(Object.assign(Object.assign(Object.assign({}, core_1.strings), options), { lowercase: (s) => s.toLowerCase(), uppercase: (s) => s.toUpperCase(), leadingLowercase: (s) => (s ? s[0].toLowerCase() + s.substr(1, s.length) : s) })),
            schematics_1.move(path),
        ]);
        return schematics_1.branchAndMerge(schematics_1.mergeWith(templateSource));
    };
}
exports.component = component;
//# sourceMappingURL=index.js.map