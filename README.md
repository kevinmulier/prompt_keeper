# 📔 Prompt Keeper

## 📝 Description

Prompt Keeper is a web-based application designed to store and manage user prompts across various AI models such as ChatGPT, Midjourney, Claude2, and Stable Diffusion. The application allows users to create, read, update, and delete prompts. Users can also view their prompts in a dashboard and explore a public gallery of prompts from other users. With Google OAuth for authentication, Prompt Keeper offers a secure way to manage and keep track of all your prompts in one place.

## ⚙️ Features

- User authentication via Google OAuth
- Dashboard for managing prompts
- Public gallery for prompts
- CRUD operations for prompts
- Support for multiple AI models
- Responsive UI

## 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js (Google OAuth)
- Handlebars.js (for Views, Layouts, and Partials)

## 📂 Project Structure

Here's an overview of the main files and folders in this project:

- `/config` - Contains config files
- `/models` - Contains Mongoose models for MongoDB
- `/routes` - Contains all route files
- `/middleware` - Contains custom middleware functions
- `/views` - Contains Handlebars views, layouts, and partials
- `/helpers` - Contains Handlebars helpers
- `/public` - Contains static files
- `app.js` - Entry point for the application

## 🛠 Setup and Installation

### 📋 Prerequisites

- Node.js
- MongoDB

### 🔧 Installation

1. Clone the repository.
   
    ```bash
    git clone https://github.com/kevinmulier/prompt_keeper.git
    ```

2. Navigate to the project directory.

    ```bash
    cd prompt-keeper
    ```

3. Install dependencies.

    ```bash
    npm install
    ```

4. Create a `.env` file and fill out the required fields (see `.env.example` for reference).

    ```env
    MONGODB_URI=your_mongodb_uri
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    SESSION_SECRET=your_session_secret
    PORT = 3000
    ```

5. Run the project.

    ```bash
    npm run start
    ```

## 📖 Usage

1. Open your web browser and go to `http://localhost:3000` (or whatever port you've set).
2. Use the Google OAuth flow to log in.
3. Once logged in, you can use the dashboard to create, edit, or delete prompts.
4. You can also view the public gallery of prompts or click on a user name to see all its public prompts.

## 🌟 Insights Gained

The development process provided valuable insights into various technical areas critical for full-stack development.

### Software Architecture

- Utilizing the MVC architecture improved code organization and facilitated scalability.
- Implementing CRUD operations enhanced understanding of data flow in web applications.

### Authentication and Security

- Integrating Google OAuth clarified the fundamentals of OAuth protocols and token-based authentication.
- The adoption of Passport.js provided experience with middleware-based authentication in Node.js.

### Database Management

- Working with MongoDB and Mongoose offered practical experience in NoSQL database management.
- Schema design and data modeling were central to optimizing database interactions.

### Front-End Technologies

- The use of Handlebars.js provided exposure to server-side templating mechanisms.

## 👥 Support and Contribution

Feel free to fork the project and submit pull requests for any features or fixes you think would improve the app. If you encounter any issues or have suggestions, please open an issue on GitHub.
