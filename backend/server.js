require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require('./utils/passport');
const session = require('express-session');

//Routes
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");
const { router: authRoutes } = require("./routes/auth");

const app = express();

// middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Configurazione sessioni
app.use(session({
    secret: process.env.JWT_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Inizializzazione Passport
app.use(passport.initialize());
app.use(passport.session());

// Mongo
mongoose.connect(process.env.MONGODB_URL, {});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB", err);
});

//URL
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

// Avvio server
const PORT = process.env.PORT || 5020;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

    

