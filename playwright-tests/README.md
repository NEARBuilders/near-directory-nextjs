# Testing Guide

This project uses [playwright](https://playwright.dev/) for end-to-end testing. Please become familiar with this documentation.

## Writing tests

Tests should be written for each change or addition to the codebase.
If a new feature is introduced, tests should be written to validate its functionality. If a bug is fixed, tests should be written to prevent regression. Writing tests not only safeguards against future breaks by other developers but also accelerates development by minimizing manual coding and browser interactions.

When writing tests, remember to:

- Test user-visible behavior
- Make tests as isolated as possible
- Avoid testing third-party dependencies

> **[LEARN BEST PRACTICES](https://playwright.dev/docs/best-practices)**

See the [cookbook](#cookbook) for help in covering scenerios. It is possible to [generate tests](https://playwright.dev/docs/codegen) via the [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright).

## Running tests

To run the tests, you may do so through the command line:

```cmd
npm run test
```

With playwright's interactive testing UI:

```cmd
npm run test:ui
```

Or through VS Code, see [Getting started - VS Code](https://playwright.dev/docs/getting-started-vscode).

## Recording video

You may automatically record video with your tests by setting

```
use: {
  video: "on"
}
```

in the [playwright.config.js](../playwright.config.js). After running tests, you will find the output as a `.webm` in `./test-results`. Then, [convert to MP4](https://video.online-convert.com/convert/webm-to-mp4) and share.

It is encouraged to include video in pull requests in order to demonstrate functionality and prove thorough testing.

## Cookbook

### Mocking fetch requests

If you are testing a component that makes fetch requests, you can mock them using the [fetch](https://playwright.dev/docs/api/class-fetch) API.

```javascript
await page.route("**/api/hello", (route) => {
  return route.fulfill({
    status: 200,
    body: "Hello, World!",
  });
});
```

Currently, we add this to the `beforeEach` hook in the test file. This way we do not have to mock the requests for every test.
