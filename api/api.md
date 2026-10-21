# Test Case: Book Rental Flow

## Objective
Validate the complete flow of user registration, authentication, and book rental.

## Preconditions
- API is available.
- At least 2 books are available for rental.

## Execution Steps

### 1. Create User
**Action:** Create a new user.

**Expected Result:**
- User created successfully.
- User ID returned.

### 2. Generate Access Token
**Action:** Authenticate the created user.

**Expected Result:**
- Access token generated.

### 3. Validate Authorization
**Action:** Use the token on a protected endpoint.

**Expected Result:**
- User is authorized.
- Successful response returned.

### 4. List Available Books
**Action:** Retrieve the list of books available for rental.

**Expected Result:**
- List of books returned.
- At least 2 books available.

### 5. Rent Two Books
**Action:** Select and rent two books.

**Expected Result:**
- Rental completed successfully.
- Books linked to the user.

### 6. Retrieve User Details
**Action:** Retrieve the user details.

**Expected Result:**
- User information returned.
- The two rented books are included in the response.

## Acceptance Criteria

The test will be considered successful when:

- The user is created successfully.
- The access token is generated.
- Authorization is validated.
- Available books are listed.
- Two books are rented successfully.
- The rented books are displayed in the user details.

## Final Expected Result

The created user must be authenticated, authorized, and have two rented books associated with their account.
