import { strings } from '@angular-devkit/core';
import { apply, branchAndMerge, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';

export function feature(options: unknown): Rule {
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
        uppercase: (s: string) => s.toUpperCase(),
      }),
      move(path),
    ]);

    return branchAndMerge(mergeWith(templateSource));
  };
}
