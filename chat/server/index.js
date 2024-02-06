// Import dependencies
import "./dotenv.js";
import express from "express";
import cors from "cors";

// Initialize the express application
const app = express();

// Middlewares
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Built-in middleware for JSON payloads

app.use((req, res, next) => {
	// Custom logger middleware
	console.log(`Request received to ${ req.url }`);
	next();	// Pass the request
});

// Specify the port to listen on
const PORT = process.env.PORT || 3000;

// Define a route for GET requests to the root URL "/"
app.get("/", (req, res) => {
	res.send("Welcome to the Express server!");
});

// Define a route for POST requests to "/post"
app.post("/post", (req, res) => {
	console.log(req.body); // Log the request body to the console
	res.status(201).send({ message: "Data received", data: req.body });
});

// Middleware fallback for unhandled routes
app.use((req, res, next) => {
	res.status(404).send({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({ message: "An error occurred", error: err.message });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
	console.log(`Server is running on port ${ PORT }`);
});