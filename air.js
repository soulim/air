// Randomizer implements tests shuffling logic for the test runner.
class Randomizer {
  // Shuffles given collection using the method described
  // here: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  shuffle(collection) {
    for (let i = collection.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [collection[i], collection[j]] = [collection[j], collection[i]];
    }

    return collection;
  }
}

// Runner executes test suites.
//
// A test suite is a class. Any method with its name starting with the "test_"
// prefix is treated as a test.
class Runner {
  // IDEA: Make the prefix configurable.
  #prefix = "test_";

  #randomizer = new Randomizer();

  set randomizer(value) {
    this.#randomizer = value;
  }

  run(suite) {
    let tests = this.#getTestsFrom(suite);

    tests = this.#randomizer.shuffle(tests);

    tests.forEach((test) => {
      // TODO: Add support for async functions.
      // IDEA: Add support for fail-fast functionality.
      try {
        test.call(suite);
      } catch (err) {
        console.log(err.stack);
      }
    });
  }

  #getTestsFrom(suite) {
    let tests = new Array();

    let prototype = Object.getPrototypeOf(suite);
    let properties = Object.getOwnPropertyNames(prototype);

    properties.forEach((property) => {
      if (!property.startsWith(this.#prefix)) return;

      let descriptor = Object.getOwnPropertyDescriptor(prototype, property);

      if (typeof (descriptor.value) !== "function") return;

      tests.push(descriptor.value);
    });

    return tests;
  }
}

export { Randomizer, Runner };
