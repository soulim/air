import { Runner } from "../runner.js";

class Simple {
  // The test runner ignores this property even if it starts with "test_".
	get test_getter() {}

  // The test runner treats this function as a test.
	test_foo() {
		let exp = "Foo";
		let act = "Quox";
		
		if (act !== exp) {
			throw new Error(`want = "${exp}", got = "${act}"`);
		}
	}
}

let runner = new Runner();
let suite = new Simple();

runner.run(suite);
