/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
const simpleTestHelper = {
    renderTestingCasesToDom: function(tests, failures) {
        let numberOfTestCases = Object.keys(tests).length;
        let templateString = `Ran ${numberOfTestCases} tests: ${numberOfTestCases -
            failures} successes, ${failures} failures`;

        let element = document.createElement('h1');
        element.textContent = templateString;
        document.body.appendChild(element);
    }
};

const TinyTest = {
    run: function(tests) {
        let failures = 0;
        for (let testName in tests) {
            let testAction = tests[testName];
            try {
                testAction();
                console.log(
                    '%c' + testName,
                    'color: green; font-weight: bold;'
                );
            } catch (e) {
                failures++;
                console.groupCollapsed(
                    '%c' + testName,
                    'color: red; font-weight: bold;'
                );
                console.error('%c' + e.stack, 'color: red;');
                console.trace('%c' + 'Stack trace', 'color: purple;');
                console.groupEnd();
            }
        }
        setTimeout(function() {
            // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor =
                    failures == 0 ? '#99ff99' : '#ff9999';
                simpleTestHelper.renderTestingCasesToDom(tests, failures);
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error(
                'assertEquals() "' + expected + '" != "' + actual + '"'
            );
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error(
                'assertStrictEquals() "' + expected + '" !== "' + actual + '"'
            );
        }
    }
};

const fail = TinyTest.fail,
    assert = TinyTest.assert,
    assertEquals = TinyTest.assertEquals,
    eq = TinyTest.assertEquals, // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals,
    tests = TinyTest.run;