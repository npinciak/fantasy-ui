/*
 * Prepare environment for unit tests.
 * This file is required by karma.conf.js and loads recursively all the .spec and framework files.
 */

import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
// do not remove this line, prevents organize-imports moving zone.js to end of imports.
// zone.js needs to be first import for tests

import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  teardown: { destroyAfterEach: false },
});
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
