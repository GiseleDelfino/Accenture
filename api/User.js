const api_url = "https://demoqa.com/Account/v1/"

/*
This is the user model class. A username and password are required to create a user
and call other endpoints, so they must be provided to the constructor.
Only functions relevant to the exercise endpoints and other required user operations
are included.
*/

class User {
    constructor(username, password, userId = "", books = [], token = "") {
        this.username = username;
        this.password = password;
        this.userId = userId;
        this.books = books;
        this.token = token;
    }

    // Create a user
    async create_user() {
        const payload = {
            userName: this.username,
            password: this.password
        };

        const response = await fetch(api_url + "User", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error: Failed to create user. Status: ${response.status}`);
        }

        // Store the data locally for use by this model instance
        const data = await response.json();
        this.userId = data.userID;
        this.books = data.books;
        return data;
    }

    // Generate a user token to authorize certain endpoints
    async generate_token(username = this.username, password = this.password) {
        const payload = {
            userName: username,
            password: password
        };

        const response = await fetch(api_url + "GenerateToken", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error: Failed to generate a token for the user. Status: ${response.status}`);
        }

        const data = await response.json();
        this.token = data.token;
        return data;
    }

    // Check whether the user is authorized
    async is_authorized(username = this.username, password = this.password) {
        const payload = {
            userName: username,
            password: password
        };

        const response = await fetch(api_url + "Authorized", {
            method: "POST",
            withCredentials: true,
            credentials: "include",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error: Failed to check user authorization. Status: ${response.status}`);
        }

        return await response.json();
    }

    async get_user_data(userId = this.userId) {
        // Require a user ID if it is not already available on this instance
        if (!userId) {
            throw new Error(
                "Error: userId was not provided or found on the User object.\n" +
                "Please provide a valid userId."
            );
        }

        const response = await fetch(api_url + "User/" + userId, {
            method: "GET",
            withCredentials: true,
            credentials: "include",
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error: Failed to retrieve user data. Status: ${response.status}`);
        }

        // Store the data locally for use by this model instance
        const data = await response.json();
        this.username = data.username;
        this.books = data.books;
        return data;
    }
}

export default User;
