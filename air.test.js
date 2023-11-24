import { Runner } from "./air.js";

// A test suite to run a self-check on Runner.
class Suite {
  constructor() {
    this.runned = new Array();
  }

  test_sync_func() {
    this.runned.push("test_sync_func");
  }

  get test_getter_func() {
    throw new Error("detected access to a getter method: 'test_getter_func'");
  }

  testing() {
    throw new Error("detected access to a non-test method: 'testing'");
  }

  TestSyncFunc() {
    throw new Error("detected access to a non-test method: 'TestSyncFunc'");
  }

  testSyncFunc() {
    throw new Error("detected access to a non-test method: 'testSyncFunc'");
  }
}

let suite = new Suite();

let runner = new Runner();
runner.run(suite);

// Methods with names starting with the "test_" prefix must be treated as tests.
let exp = ["test_sync_func"];

if (suite.runned.length !== exp.length) {
  throw new Error(
    `want length of [${
      suite.runned.join(", ")
    }] to be ${exp.length}, got ${suite.runned.length}`,
  );
}

exp.forEach((test) => {
  if (!suite.runned.includes(test)) {
    throw new Error(
      `want '${test}' to be included in [${suite.runned.join(", ")}]`,
    );
  }
});
