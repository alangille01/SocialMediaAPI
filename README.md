# Social Network API

## Description

The Social Network API is a RESTful API built for a social media startup. It allows users to share thoughts, react to friends' thoughts, and manage a friend list. The API uses Node.js, Express.js, MongoDB, and Mongoose for routing and database management. This API is designed to handle large amounts of unstructured data using a NoSQL database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
  - [User Routes](#user-routes)
  - [Friend Routes](#friend-routes)
  - [Thought Routes](#thought-routes)
  - [Reaction Routes](#reaction-routes)
- [Models](#models)
  - [User Model](#user-model)
  - [Thought Model](#thought-model)
  - [Reaction Schema](#reaction-schema)
- [Seeding the Database](#seeding-the-database)
- [Technologies](#technologies)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/social-network-api.git
    ```

2. Navigate to the project directory:
    ```bash
    cd social-network-api
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

4. Set up MongoDB locally on your machine. Ensure MongoDB is running on `mongodb://localhost:27017/socialNetworkDB`.

## Usage

1. To start the server, use the following command:
    ```bash
    npm start
    ```
   The server will start and the Mongoose models will be synced to the MongoDB database.

2. To test the API routes, use a tool like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).

## API Routes

### User Routes

- **GET** `/api/users`
  - Retrieves all users.

- **GET** `/api/users/:id`
  - Retrieves a single user by its `_id`, along with populated thought and friend data.

- **POST** `/api/users`
  - Creates a new user.
  - Example Request Body:
    ```json
    {
      "username": "lernantino",
      "email": "lernantino@gmail.com"
    }
    ```

- **PUT** `/api/users/:id`
  - Updates a user by its `_id`.

- **DELETE** `/api/users/:id`
  - Removes a user by its `_id`.
  - Bonus: Deletes the user's associated thoughts when the user is deleted.

### Friend Routes

- **POST** `/api/users/:userId/friends/:friendId`
  - Adds a new friend to a user's friend list.

- **DELETE** `/api/users/:userId/friends/:friendId`
  - Removes a friend from a user's friend list.

### Thought Routes

- **GET** `/api/thoughts`
  - Retrieves all thoughts.

- **GET** `/api/thoughts/:id`
  - Retrieves a single thought by its `_id`.

- **POST** `/api/thoughts`
  - Creates a new thought and associates it with a user.
  - Example Request Body:
    ```json
    {
      "thoughtText": "Here's a cool thought...",
      "username": "lernantino",
      "userId": "5edff358a0fcb779aa7b118b"
    }
    ```

- **PUT** `/api/thoughts/:id`
  - Updates a thought by its `_id`.

- **DELETE** `/api/thoughts/:id`
  - Removes a thought by its `_id`.

### Reaction Routes

- **POST** `/api/thoughts/:thoughtId/reactions`
  - Creates a reaction stored in a single thought's `reactions` array field.

- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId`
  - Removes a reaction by the reaction's `reactionId` value.

## Models

### User Model

- `username` (String): Unique, required, trimmed.
- `email` (String): Required, unique, must match a valid email address.
- `thoughts` (Array of _id values): References the Thought model.
- `friends` (Array of _id values): References the User model (self-reference).
- **Virtuals:**
  - `friendCount`: Retrieves the length of the user's friends array on query.

### Thought Model

- `thoughtText` (String): Required, must be between 1 and 280 characters.
- `createdAt` (Date): Default value is the current timestamp, formatted using a getter method.
- `username` (String): The user who created this thought, required.
- `reactions` (Array of nested documents): Created with the `reactionSchema`.
- **Virtuals:**
  - `reactionCount`: Retrieves the length of the thought's reactions array on query.

### Reaction Schema (Embedded in Thought Model)

- `reactionId` (ObjectId): Default value is set to a new ObjectId.
- `reactionBody` (String): Required, maximum of 280 characters.
- `username` (String): Required.
- `createdAt` (Date): Default value is the current timestamp, formatted using a getter method.

## Seeding the Database

To seed the database with initial data:

1. Create a directory named `seeds` and a file named `seed.js` inside it.
2. Use the provided seed script to populate the database with sample users and thoughts.
3. Run the seed script with the following command:
    ```bash
    npm run seed
    ```

This will clear existing data and insert the seed data into the database.

## License

This project is licensed under the MIT license. For more information, please visit [this link](https://opensource.org/licenses/MIT).


## Questions

If you have any questions, please feel free to reach out via [GitHub](https://github.com/alangille01) or email me at langille.alexis@gmail.com.