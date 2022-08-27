require("dotenv").config();

const express = require("express");
const { init } = require("./controller");
const cors = require("cors");
const routes = require("./routes");

// Create a new express app
const app = express();
// Add the body parses middleware, as well as the HTTP routes
app.use(express.json());

const corsOpts = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 204,
	allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use(routes);

// Initialize the database
init().then(() => {
	console.log("starting server on port 3000");
	app.listen(3000);
});
