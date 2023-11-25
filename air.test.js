import { Randomizer, Runner } from "./air.js";

// TestRandomizer implements the same interface as Randomizer,
// but allows to watch method calls.
class TestRandomizer extends Randomizer {
  shuffled = 0;

  shuffle(collection) {
    this.shuffled += 1;

    return super.shuffle(collection);
  }
}

// TestSuite is a test suite to perform self-checks on Runner.
class TestSuite {
  constructor() {
    this.runned = new Array();
  }

  test_sync_alpha_func() {
    this.runned.push("test_sync_alpha_func");
  }

  test_sync_beta_func() {
    this.runned.push("test_sync_beta_func");
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

let suite = new TestSuite();
let randomizer = new TestRandomizer();

let runner = new Runner();
runner.randomizer = randomizer;

runner.run(suite);

// Runner shuffles test methods before calling them.
if (randomizer.shuffled === 0) {
  throw new Error(
    `expected at least one call to the randomizer, but got ${randomizer.shuffled}`,
  );
}

// Methods with names starting with the "test_" prefix must be treated as tests.
let exp = [
  "test_sync_alpha_func",
  "test_sync_beta_func",
];

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
