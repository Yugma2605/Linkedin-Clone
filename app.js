
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const connect_database = require('./config/database');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

connect_database.connectToMongoDB();

// Swagger setup
const options = {
  definition: {
        openapi: "3.1.0",
        info: {
          title: "Linkedin API",
          version: "0.1.0",
          description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
          license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
          },
          contact: {
            name: "LogRocket",
            url: "https://logrocket.com",
            email: "info@email.com",
          },
        },
        servers: [
          {
            url: "http://localhost:3000",
          },
        ],
      },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/users', userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});