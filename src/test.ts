/*
 * Prepare environment for unit tests.
 * This file is required by karma.conf.js and loads recursively all the .spec and framework files.
 */

import 'zone.js';
import 'zone.js/testing';
// do not remove this line, prevents organize-imports moving zone.js to end of imports.
// zone.js needs to be first import for tests

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
