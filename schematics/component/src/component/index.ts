import { strings } from '@angular-devkit/core';
import { apply, branchAndMerge, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';

export function component(options: unknown): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    if (!tree) {
      throw new Error('tree cannot be null');
    }

    const { folderName } = options;

    const path = `src/app/${strings.dasherize(folderName)}`;
    const templateSource = apply(url('../../files'), [
      template({
        ...strings,
        ...options,
        lowercase: (s: string) => s.toLowerCase(),
        uppercase: (s: string) => s.toUpperCase(),
        leadingLowercase: (s: string) => (s ? s[0].toLowerCase() + s.substr(1, s.length) : s),
      }),
      move(path),
    ]);

    return branchAndMerge(mergeWith(templateSource));
  };
}
