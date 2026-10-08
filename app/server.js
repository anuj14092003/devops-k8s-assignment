const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get("/health", (req, res) => {
    console.log("Health check received");

    res.status(200).json({
        status: "UP",
        message: "DevOps assignment application is healthy"
    });
});

// Application endpoint
app.get("/", (req, res) => {
    console.log("Home endpoint received");

    res.json({
        message: "Hello from Kubernetes DevOps Assignment!"
    });
});

// Custom event endpoint
app.get("/api/event", (req, res) => {
    console.log("Custom application event generated");

    res.json({
        event: "sample-event",
        message: "This is a custom application event"
    });
});

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});