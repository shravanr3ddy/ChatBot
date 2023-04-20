





https://user-images.githubusercontent.com/90720113/233294022-d1623858-a820-40d7-a08a-5e26a3bcc83d.mov






This code is a simple React component for a chatbot front-end that can be integrated into any web application. It allows users to input questions and receive answers from the chatbot.


## To run and use this code, follow these steps:

1. **Requirements:**

   Make sure you have Node.js installed. If not, download and install Node.js from the official website: https://nodejs.org/en/download/

2. **Create a new React project:**

   Open a terminal (or command prompt) and run the following command to create a new React project:

   ```
   npx create-react-app chatbot-app
   ```

   This will create a new folder called `chatbot-app` with a boilerplate React application.

3. **Install required packages:**

   Change to the `chatbot-app` directory and install the required package, axios:

   ```
   cd chatbot-app
   npm install
   ```

4. **Add the ChatBot component:**

   Replace the contents of the `src/App.js` file with the provided ChatBot component code. Don't forget to import the required CSS file for styling (you can create your own or modify the existing `App.css` file).

5. **Run the React app:**

   In the terminal, run the following command to start the React development server:

   ```
   npm start
   ```

   This will open a new browser window with your chatbot front-end running at http://localhost:3000.

6. **Connect the front-end to the chatbot server:**

   To connect your React app to the chatbot server created in the previous example, update the axios post request URL in the `onSubmit` function:

   ```
   const response = await axios.post("http://127.0.0.1:5000/chatbot", {
   ```

   Make sure both the React app and the Flask server are running.

**Code explanation:**

- Import necessary packages: `React` for creating the component, `useState` for managing state, and `axios` for making API requests.

- Create a functional component `ChatBot` that maintains state for user input (`inputVal`), questions (`questions`), and answers (`answers`).

- Define an `onSubmit` function that sends the user's input to the chatbot server using an axios POST request and updates the state with the received response.

- Define an `onChange` function that updates the state when the user types in the input field.

- Define a `pressEnter` function that triggers the `onSubmit` function when the user presses the Enter key.

- Render the chatbot UI, displaying the user's questions and the chatbot's answers. The input field and send button allow users to interact with the chatbot.

- Export the `ChatBot` component for use in other parts of the application.

**Note:**
Make sure to add necessary styles for the chatbot UI in the `src/App.css` file. The classes used in the component code (e.g., `wrapper`, `title`, `box`, etc.) should be styled accordingly.
