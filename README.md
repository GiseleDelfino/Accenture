# Accenture QA Automation

Cypress end-to-end (E2E) tests for the [DemoQA](https://demoqa.com/) website, plus a small JavaScript API workflow for its Book Store service.

## Requirements

- Node.js and npm
- Google Chrome for the Sortable test, which uses `cypress-real-events`
- Internet access to DemoQA
- For the Practice Form test, the upload file currently expected at `C:\Users\gdelf\Desktop\accenture.txt`

## Setup

Install the dependencies from the repository root:

```bash
npm ci
```

## Run the Cypress tests

Open Cypress interactively:

```bash
npx cypress open
```

Run all configured E2E specs in Chrome:

```bash
npx cypress run --browser chrome
```

Run one spec:

```bash
npx cypress run --browser chrome --spec "cypress/e2e/forms.cy.js"
```

The Cypress configuration discovers JavaScript specs and Cucumber feature files under `cypress/e2e`.

## E2E coverage

| Spec | What it covers |
| --- | --- |
| `forms.cy.js` | Fills and submits the Practice Form, verifies the result dialog, and clicks its Close button. |
| `alerts-frame-windows.cy.js` | Opens the sample browser window and verifies its content. |
| `elements.cy.js` | Adds, edits, and deletes a Web Tables record without refreshing. |
| `elements-refreshing.cy.js` | Checks whether a Web Tables record survives refreshes, then edits and deletes it. |
| `elements-cucumber.feature` | Uses Cucumber steps to create, verify, and delete 12 generated Web Tables records. |
| `widgets.cy.js` | Stops the Progress Bar at a random value under 25%, checks visual percentages, completes it, and resets it. |
| `Interactions.cy.js` | Randomizes the Sortable list and then sorts it in ascending order. |

Page Objects are in `cypress/pages`. Cucumber step definitions are beside their feature file in `cypress/e2e`.

## API workflow

The `api` folder contains `User` and `Book` API classes and an `ApiTest.js` integration script. The script creates a user (unless run in dry-run mode), generates a token, checks authorization, lists books, adds two randomly selected books to the user's collection, and retrieves the user details.

**The API workflow modifies DemoQA data.** Use a dedicated test account when running in dry-run mode; it skips account creation but still adds books to the supplied user's collection. The script does not remove the added books.

The API files use ES module imports and top-level `await`, while the root `package.json` currently declares `"type": "commonjs"`. Consequently, `node api/ApiTest.js` is not currently a supported direct run command. Configure a compatible Node.js ES module setup before running this workflow.

## Notes and known site behavior

- DemoQA Web Tables data is held in browser memory and is cleared on refresh. The refresh-persistence spec is expected to fail at its persistence assertion against the current site behavior.
- DemoQA's Practice Form result dialog can show an error when its Close button is clicked. The test asserts the dialog is dismissed after clicking Close and may fail if the site-side handler does not close it.
- The Practice Form spec uses a local absolute path for its upload file. Update the path in `cypress/e2e/forms.cy.js` if the file is stored elsewhere.
- DemoQA navigation occasionally leaves a page blank after a category click. Some page objects navigate directly to the corresponding DemoQA route after selecting the category.