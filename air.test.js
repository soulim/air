import { Runner } from "./air.js"

// A test suite to run a self-check on Runner.
class SelfCheckSuite {
  constructor() {
    this.runned = new Array();
  }
  
  get test_getter_func() {
    this.runned.push("test_getter_func");
  }

  test_sync_func() {
    this.runned.push("test_sync_func");
  }
}

let suite = new SelfCheckSuite();

let runner = new Runner();
runner.run(suite);

// Self-checks

if (suite.runned.length !== 1) {
  throw new Error(`want length of [${suite.runned.join(",")}] to be 1, got ${suite.runned.length}`);
}

// Functions with names starting with "test_" prefix must be treated as tests.
if (!suite.runned.includes("test_sync_func")) {
  throw new Error(`want "test_sync_func" to be included in [${suite.runned.join(",")}]`);
}

// Getters even with names starting with "test_" prefix must be ignored.
if (suite.runned.includes("test_getter_func")) {
  throw new Error(`want "test_getter_func" not to be included in [${suite.runned.join(",")}]`);
}
