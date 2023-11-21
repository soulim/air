import { Runner } from "./air.js"

// A dummy test suite.
class Suite {
  constructor() {
    this.runned = new Array();
  }
  
  get test_getter_func() { throw new Error("access to a getter detected"); }

  test_sync_func() {
    this.runned.push("test_sync_func");
  }
}

Deno.test("Runner_run", () => {
  let runner = new Runner();
  let suite = new Suite();
  
  runner.run(suite);

  if (suite.runned.length !== 1) {
    throw new Error(`want length of [${suite.runned.join(",")}] to be 1, got ${suite.runned.length}`);
  }
  
  if (!suite.runned.includes("test_sync_func")) {
    throw new Error(`want "test_sync_func" to be included in [${suite.runned.join(",")}]`);
  }
});
