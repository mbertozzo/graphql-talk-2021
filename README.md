# graphql-talk-2021

This repository hosts the code related to the 2021 edition of a talk about the development of a GraphQL API with Node.js, Express, MySQL (+ Sequelize and Apollo), consumed by a React client.

The application is configured with [Airbnb's ESLint rules](https://github.com/airbnb/javascript) and formatted through [prettier](https://prettier.io/).

### Getting started

```bash
# Clone the repository
git clone https://github.com/mbertozzo/graphql-api-talk.git

# Move to the project directory
cd graphql-api-talk

# Install NPM dependencies
npm install (or yarn)
```

To run the development environment, leveraging [webpack dev server](https://webpack.js.org/configuration/dev-server/) for hot reloading the client code, type:

```bash
# Run development evironment
npm run dev (or yarn dev)
```

In a production evironment, run the following:

```bash
# Build
npm run build (or yarn build)

# Start the server
npm start (or yarn start)
```

### Configuring VSCode
This project makes use of eslint to enforce coding style and prettier to consistently format code.

If you use VSCode, follow these steps to have everything up and running:

1. Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
3. Edit VSCode settings with the properties below
   ```json
   "eslint.alwaysShowStatus": true,
   "eslint.autoFixOnSave": true,
   "editor.formatOnSave": true,
   "prettier.eslintIntegration": true
   ```
