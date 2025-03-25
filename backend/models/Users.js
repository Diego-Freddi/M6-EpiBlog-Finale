const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: "", // L'immagine di default sarà gestita dal frontend 
    },
    role: {
        type: String,
        enum: ["Editor", "Admin"],
        default: "Editor",
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    // Campo temporaneo per la migrazione
    token: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
