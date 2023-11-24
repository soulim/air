// Runner executes test suites.
//
// A test suite is a class. Any method with its name starting with the "test_"
// prefix is treated as a test.
class Runner {
  // IDEA: Make the prefix configurable.
  get #prefix() {
    return "test_";
  }

  run(suite) {
    let prototype = Object.getPrototypeOf(suite);
    let properties = Object.getOwnPropertyNames(prototype);

    // TODO: Randomize tests.

    properties.forEach((property) => {
      if (!property.startsWith(this.#prefix)) return;

      let descriptor = Object.getOwnPropertyDescriptor(prototype, property);

      if (typeof (descriptor.value) !== "function") return;

      // TODO: Add support for async functions.

      // IDEA: Add support for fail-fast functionality.
      try {
        descriptor.value.call(suite);
      } catch (err) {
        console.log(err.stack);
      }
    });
  }
}

export { Runner };
