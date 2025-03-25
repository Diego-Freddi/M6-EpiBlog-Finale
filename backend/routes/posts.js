const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { upload } = require("../utils/cloudinary.js");
const { auth } = require("./auth");

//GET tutti i post
router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 6;
    const skip = (page - 1) * perPage;
    const author = req.query.author ? { author: req.query.author } : {};

    try {
        const totalPosts = await Post.countDocuments(author);
        const totalPages = Math.ceil(totalPosts / perPage);

        const posts = await Post.find(author)
        .populate("author", "firstName lastName")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage);

        res.status(200).json({
            posts,  
            currentPage: page,
            totalPages,
            totalPosts,
            perPage
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//GET un post specifico
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "firstName lastName");
        if (!post) {
            return res.status(404).json({ message: "Post non trovato" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 

//POST crea un nuovo post
router.post("/", auth, upload.single("cover"), async (req, res) => {
    try {
        const { title, category, content, readTime } = req.body;
        
        // Validazione dei dati
        if (!title || !category || !content || !req.file) {
            return res.status(400).json({ 
                message: "Tutti i campi sono obbligatori" 
            });
        }

        // Parse readTime da stringa a oggetto JSON
        const parsedReadTime = JSON.parse(readTime);

        const newPost = new Post({
            title,
            category,
            cover: req.file.path,
            content,
            readTime: parsedReadTime,
            author: req.userId // Usa l'ID dell'utente autenticato
        });

        const savedPost = await newPost.save();
        
        // Popola i dati dell'autore prima di inviare la risposta
        const populatedPost = await Post.findById(savedPost._id)
            .populate('author', 'firstName lastName');

        res.status(201).json(populatedPost);
    } catch (err) {
        console.error('Errore server:', err);
        res.status(500).json({ 
            message: "Errore durante il salvataggio del post",
            error: err.message 
        });
    }
});

//PUT modifica un post specifico
router.put("/:id", auth, upload.single('cover'), async (req, res) => {
    try {
        const { title, category, content, readTime } = req.body;
        
        // Verifica che l'utente sia l'autore del post
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post non trovato" });
        }
        
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({ message: "Non hai i permessi per modificare questo post" });
        }

        const updateData = {
            title,
            category,
            content,
            readTime: JSON.parse(readTime)
        };

        // Aggiorna il cover solo se è stato caricato un nuovo file
        if (req.file) {
            updateData.cover = req.file.path;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            updateData,
            { new: true }
        ).populate('author', 'firstName lastName');

        res.json(updatedPost);
    } catch (err) {
        console.error('Errore server:', err);
        res.status(500).json({ 
            message: "Errore durante l'aggiornamento del post",
            error: err.message 
        });
    }
});

//DELETE elimina un post specifico
router.delete("/:id", auth, async (req, res) => {
    try {
        // Verifica che l'utente sia l'autore del post
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post non trovato" });
        }
        
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({ message: "Non hai i permessi per eliminare questo post" });
        }

        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post eliminato con successo" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;