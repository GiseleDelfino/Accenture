# Test Case: DemoQA Progress Bar Flow

## Objective
Validate the complete flow of interacting with the Progress Bar widget, including stopping before 25%, validating the progress value, completing the progress bar to 100%, and resetting it.

## Preconditions
- Internet connection available.
- DemoQA website accessible.

## Execution Steps

### 1. Access the Website
**Action:** Navigate to https://demoqa.com/

**Expected Result:**
- Home page is displayed successfully.

### 2. Open Widgets Section
**Action:** Select the **Widgets** option from the home page.

**Expected Result:**
- Widgets section is displayed.

### 3. Open Progress Bar
**Action:** Click on the **Progress Bar** submenu.

**Expected Result:**
- Progress Bar page is displayed.

### 4. Start the Progress Bar
**Action:** Click the **Start** button.

**Expected Result:**
- Progress Bar begins progressing.

### 5. Stop Before 25%
**Action:** Stop the Progress Bar before it reaches 25%.

**Expected Result:**
- Progress Bar stops successfully.
- Current value remains below or equal to 25%.

### 6. Validate Progress Value
**Action:** Verify the displayed progress value.

**Expected Result:**
- Progress value is less than or equal to 25%.

### 7. Complete the Progress Bar
**Action:** Click **Start** again and allow the Progress Bar to reach 100%.

**Expected Result:**
- Progress Bar reaches 100%.
- Reset button becomes available.

### 8. Reset the Progress Bar
**Action:** Click the **Reset** button.

**Expected Result:**
- Progress Bar returns to 0%.
- Initial state is restored.

## Acceptance Criteria

The test will be considered successful when:

- The DemoQA website is accessed successfully.
- The Widgets section is opened.
- The Progress Bar page is displayed.
- The Progress Bar is stopped before reaching 25%.
- The displayed value is less than or equal to 25%.
- The Progress Bar reaches 100% after being restarted.
- The Progress Bar is reset successfully.
- The widget returns to its initial state.

## Final Expected Result

The user is able to control, validate, complete, and reset the Progress Bar widget without errors.
