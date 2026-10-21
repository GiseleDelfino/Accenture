# Test Case: DemoQA Web Tables Bulk Record Management Flow

## Objective
Validate the complete flow of creating and deleting 12 records dynamically in the Web Tables section using Cucumber.

## Preconditions
- Internet connection available.
- DemoQA website accessible.
- Cucumber test framework configured and running.

## Execution Steps

### 1. Access the Website
**Action:** Navigate to https://demoqa.com/

**Expected Result:**
- Home page is displayed successfully.

### 2. Open Elements Section
**Action:** Select the **Elements** option from the home page.

**Expected Result:**
- Elements section is displayed.

### 3. Open Web Tables
**Action:** Click on the **Web Tables** submenu.

**Expected Result:**
- Web Tables page is displayed.

### 4. Create 12 Records Dynamically
**Action:** Use Cucumber to create 12 records with dynamically generated data.

**Expected Result:**
- 12 records are created successfully.
- All records are displayed in the table.

### 5. Delete the 12 Created Records
**Action:** Delete all records created during the test execution.

**Expected Result:**
- All 12 records are deleted successfully.
- None of the created records remain in the table.

## Acceptance Criteria

The test will be considered successful when:

- The DemoQA website is accessed successfully.
- The Elements section is opened.
- The Web Tables page is displayed.
- 12 records are created dynamically through Cucumber.
- All 12 created records are displayed in the table.
- All 12 created records are deleted successfully.
- None of the created records remain visible after deletion.

## Final Expected Result

The user is able to create and delete 12 dynamic records through Cucumber in the Web Tables section without errors, leaving the application in its original state.
