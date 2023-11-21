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
			if (!property.startsWith("test_")) return;

			let descriptor = Object.getOwnPropertyDescriptor(prototype, property);

			if (typeof(descriptor.value) !== "function") return;

			try {
				descriptor.value.call(suite);
			} catch(err) {
				console.log(err.stack)
			}
		});
	}
}

export { Runner };
