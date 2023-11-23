// Runner executes test suites.
//
// A test suite is a class. Any method which name starts with the "test_"
// prefix is treated as a test.
class Runner {
  run(suite) {
    let prototype = Object.getPrototypeOf(suite);
    let properties = Object.getOwnPropertyNames(prototype);

    // TODO: Randomize tests.

    properties.forEach(function (property) {
      // TODO: Make the prefix configurable.
      // TODO: Change the prefix to be "test" (no underscore).
      if (!property.startsWith("test_")) return;

      let descriptor = Object.getOwnPropertyDescriptor(prototype, property);

      if (typeof (descriptor.value) !== "function") return;
      // TODO: Add support for async functions.

      try {
        descriptor.value.call(suite);
      } catch (err) {
        console.log(err.stack);
      }
    });
  }
}

export { Runner };
