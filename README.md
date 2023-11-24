# Air

_Air_ is an experimental test runner.

## Concept

- No test framework is required to write tests.
- No assertion libraries is required to use in tests.
- Any class can be a test suite.
- Any method of a test suite with its name starting with the `test_` prefix is
  treated as a test.

Goals:

- No need to bring and maintain yet another dependency into your project.
- No need to learn a domain-specific language of any testing framework.
- No need to switch mental context between writing code and expressing tests for
  that code in the language of any testing framework.

## Example

Define a test suite:

```javascript
import { Runner } from "../air.js";

// A simple test suite.
class Simple {
  // The test runner ignores this property even if its name starts with
  // the "test_" prefix.
  get test_getter() {}

  // The test runner treats this method as a test because its name starts
  // with the expected prefix.
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
```

Run:

```shell
> node testdata/simple.test.js

Error: want = "Foo", got = "Quox"
    at Simple.test_foo (file:///.../src/github.com/soulim/air/testdata/simple.test.js:11:10)
    ...
```

# Name

Air is something we barely notice and never learn how use. We just breathe.

## License

Copyright (c) 2023 Alexander Sulim

Air is free software: you can redistribute it and/or modify it under the terms
of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.
