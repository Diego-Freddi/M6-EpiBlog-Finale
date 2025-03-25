const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();
const { auth } = require("./auth");

//GET tutti i commenti  
router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate("author", "firstName lastName profileImage")
            .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//POST crea un nuovo commento   
router.post("/", auth, async (req, res) => {
    try {
        const { content, post } = req.body;
        const newComment = new Comment({ 
            content, 
            author: req.userId, // Usa l'ID dell'utente autenticato
            post 
        });
        const savedComment = await newComment.save();
        const populatedComment = await Comment.findById(savedComment._id)
            .populate("author", "firstName lastName profileImage");
        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//DELETE cancella un commento
router.delete("/:id", auth, async (req, res) => {
    try {
        // Verifica che l'utente sia l'autore del commento
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Commento non trovato" });
        }
        
        if (comment.author.toString() !== req.userId) {
            return res.status(403).json({ message: "Non hai i permessi per eliminare questo commento" });
        }

        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Commento eliminato con successo" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;