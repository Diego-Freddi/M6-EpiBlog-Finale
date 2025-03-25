# Guida Didattica EpiBlog

## Indice
1. [Introduzione](#introduzione)
2. [Sistemi Utilizzati](#sistemi-utilizzati)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Terminologie e Concetti](#terminologie-e-concetti)
6. [Flussi Logici](#flussi-logici)
7. [Scelte Implementative](#scelte-implementative)
8. [Conclusioni](#conclusioni)

## Introduzione

EpiBlog è un'applicazione web completa per la gestione di un blog, che permette agli utenti di registrarsi, autenticarsi, creare e gestire post, commentare i contenuti e interagire con altri utenti. L'applicazione è strutturata secondo un'architettura moderna che separa chiaramente il backend dal frontend, utilizzando tecnologie all'avanguardia per offrire un'esperienza utente fluida e reattiva.

### Panoramica dell'applicazione

EpiBlog è composto da due parti principali:
- Un **backend** basato su Node.js e Express.js che fornisce API RESTful per la gestione dei dati
- Un **frontend** sviluppato con React che offre un'interfaccia utente intuitiva e reattiva

L'applicazione implementa tutte le funzionalità tipiche di un blog moderno:
- Registrazione e autenticazione degli utenti (inclusa autenticazione con Google)
- Creazione, modifica ed eliminazione di post
- Caricamento di immagini per i post e i profili utente
- Sistema di commenti per interagire con i contenuti
- Gestione del profilo utente
- Visualizzazione dei post con paginazione

### Scopo e funzionalità principali

Lo scopo principale di EpiBlog è fornire una piattaforma per la condivisione di contenuti testuali e multimediali, con particolare attenzione all'esperienza utente e alla sicurezza. Le funzionalità principali includono:

1. **Gestione utenti**:
   - Registrazione con email e password
   - Autenticazione tramite credenziali locali o Google OAuth
   - Gestione del profilo utente con possibilità di aggiornare informazioni e immagine

2. **Gestione contenuti**:
   - Creazione di post con titolo, categoria, contenuto e immagine di copertina
   - Modifica e eliminazione dei propri post
   - Visualizzazione di tutti i post o filtrati per autore

3. **Interazione**:
   - Sistema di commenti per interagire con i post
   - Possibilità di eliminare i propri commenti

4. **Sicurezza**:
   - Autenticazione basata su JWT
   - Protezione delle route che richiedono autenticazione
   - Verifica dei permessi per le operazioni sensibili

## Sistemi Utilizzati

### Stack tecnologico

EpiBlog utilizza uno stack tecnologico moderno e completo, noto come stack MERN:

- **M**ongoDB: database NoSQL orientato ai documenti
- **E**xpress.js: framework web per Node.js
- **R**eact: libreria JavaScript per la costruzione di interfacce utente
- **N**ode.js: ambiente di runtime JavaScript lato server

Questo stack offre numerosi vantaggi:
- Utilizzo di JavaScript in tutto lo stack, semplificando lo sviluppo
- Elevata scalabilità e performance
- Ampia comunità di sviluppatori e risorse disponibili
- Flessibilità nella gestione dei dati

### Architettura dell'applicazione

L'architettura di EpiBlog segue il pattern MVC (Model-View-Controller) adattato per applicazioni web moderne:

1. **Model**: rappresentato dai modelli Mongoose che definiscono la struttura dei dati e interagiscono con il database MongoDB
2. **View**: implementato dal frontend React che gestisce l'interfaccia utente
3. **Controller**: implementato dalle route Express che gestiscono le richieste HTTP e la logica di business

L'applicazione è strutturata secondo un'architettura client-server:
- Il **server** (backend) espone API RESTful che gestiscono i dati e la logica di business
- Il **client** (frontend) consuma queste API per presentare i dati all'utente e gestire le interazioni

La comunicazione tra client e server avviene tramite richieste HTTP, con i dati scambiati in formato JSON.

### Tecnologie backend

Il backend di EpiBlog utilizza diverse tecnologie e librerie:

1. **Node.js**: ambiente di runtime JavaScript che permette di eseguire codice JavaScript lato server
   ```javascript
   // server.js
   const app = express();
   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

2. **Express.js**: framework web minimalista per Node.js che semplifica la creazione di API
   ```javascript
   // server.js
   const express = require("express");
   const app = express();
   app.use(express.json());
   ```

3. **MongoDB**: database NoSQL che memorizza i dati in formato BSON (Binary JSON)
   ```javascript
   // server.js
   mongoose.connect(process.env.MONGODB_URL, {});
   ```

4. **Mongoose**: ODM (Object Data Modeling) per MongoDB che fornisce una soluzione basata su schemi
   ```javascript
   // models/Post.js
   const postSchema = new mongoose.Schema({
       title: {
           type: String,
           required: true,
       },
       // Altri campi...
   }, { timestamps: true });
   ```

5. **JWT (JSON Web Token)**: standard per la creazione di token di accesso
   ```javascript
   // routes/auth.js
   const token = jwt.sign(
       { id: user._id, email: user.email, role: user.role }, 
       process.env.JWT_SECRET, 
       { expiresIn: '24h' }
   );
   ```

6. **Passport.js**: middleware di autenticazione che supporta diverse strategie
   ```javascript
   // utils/passport.js
   passport.use(new LocalStrategy(
       { usernameField: 'email', passwordField: 'password' }, 
       async(email, password, done) => {
           // Logica di autenticazione
       }
   ));
   ```

7. **Bcrypt**: libreria per l'hashing sicuro delle password
   ```javascript
   // routes/auth.js
   const hashedPassword = await bcrypt.hash(password, 10);
   ```

8. **Cloudinary**: servizio cloud per la gestione di immagini e video
   ```javascript
   // utils/cloudinary.js
   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   });
   ```

9. **Multer**: middleware per la gestione dell'upload di file
   ```javascript
   // utils/cloudinary.js
   const upload = multer({ storage: storage });
   ```

### Tecnologie frontend

Il frontend di EpiBlog utilizza diverse tecnologie e librerie:

1. **React**: libreria JavaScript per la costruzione di interfacce utente
   ```jsx
   // App.js
   function App() {
     return (
       <AuthProvider>
         <Router>
           <NavBar />
           <Routes>
             {/* Route components */}
           </Routes>
         </Router>
       </AuthProvider>
     );
   }
   ```

2. **React Router**: libreria per la gestione del routing in applicazioni React
   ```jsx
   // App.js
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/login" element={<Login />} />
     {/* Altre route */}
   </Routes>
   ```

3. **React Bootstrap**: implementazione dei componenti Bootstrap per React
   ```jsx
   // components/PostCard.jsx
   <Card className="h-100 shadow-sm">
     <Card.Img variant="top" src={post.cover} />
     <Card.Body>
       {/* Contenuto della card */}
     </Card.Body>
   </Card>
   ```

4. **Axios**: client HTTP basato su promesse per effettuare richieste al backend
   ```javascript
   // utils/api.js
   const api = axios.create({
       baseURL: 'http://localhost:5020/api'
   });
   ```

5. **Context API**: API di React per la gestione dello stato globale
   ```jsx
   // contexts/AuthContext.jsx
   const AuthContext = createContext();
   export const AuthProvider = ({ children }) => {
       // Logica di gestione dello stato
       return (
           <AuthContext.Provider value={{ user, token, login, logout }}>
               {children}
           </AuthContext.Provider>
       );
   };
   ```

6. **React Hooks**: funzioni che permettono di utilizzare lo stato e altre funzionalità di React in componenti funzionali
   ```jsx
   // pages/Home.jsx
   const [posts, setPosts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   
   useEffect(() => {
       const fetchPosts = async () => {
           // Logica per recuperare i post
       };
       fetchPosts();
   }, [currentPage]);
   ```

### Sistemi di database e storage

EpiBlog utilizza due sistemi principali per la persistenza dei dati:

1. **MongoDB**: database NoSQL utilizzato per memorizzare tutti i dati strutturati dell'applicazione
   - Utenti (credenziali, informazioni personali, ruoli)
   - Post (titolo, contenuto, categoria, autore, ecc.)
   - Commenti (contenuto, autore, post di riferimento)

   MongoDB è stato scelto per la sua flessibilità nello schema dei dati e per la sua naturale integrazione con JavaScript attraverso documenti JSON.

2. **Cloudinary**: servizio cloud utilizzato per lo storage di file multimediali
   - Immagini di copertina dei post
   - Immagini del profilo degli utenti

   Cloudinary offre funzionalità avanzate per la gestione delle immagini, come il ridimensionamento automatico, l'ottimizzazione e la distribuzione tramite CDN.

La combinazione di questi due sistemi permette di gestire in modo efficiente sia i dati strutturati che i file multimediali, delegando a servizi specializzati le rispettive responsabilità.

## Backend

### Struttura e organizzazione

Il backend di EpiBlog è organizzato in una struttura modulare che separa chiaramente le diverse responsabilità:

```
backend/
├── models/          # Definizione dei modelli di dati
│   ├── Comment.js
│   ├── Post.js
│   └── Users.js
├── routes/          # Definizione delle route API
│   ├── auth.js
│   ├── comments.js
│   ├── posts.js
│   └── users.js
├── utils/           # Utilità e configurazioni
│   ├── cloudinary.js
│   └── passport.js
├── .env.example     # Template per le variabili d'ambiente
├── package.json     # Dipendenze e script
└── server.js        # Punto di ingresso dell'applicazione
```

Questa struttura segue il principio di separazione delle responsabilità, dove:
- I **modelli** definiscono la struttura dei dati e l'interazione con il database
- Le **route** gestiscono le richieste HTTP e implementano la logica di business
- Le **utilità** forniscono funzionalità trasversali utilizzate in diverse parti dell'applicazione

### Modelli di dati

I modelli di dati sono definiti utilizzando Mongoose e rappresentano le entità principali dell'applicazione:

1. **User**: rappresenta un utente dell'applicazione
   ```javascript
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
           default: "",
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
       token: {
           type: String,
           required: false
       }
   }, { timestamps: true });
   ```

   Il modello User include:
   - Informazioni personali (nome, cognome, email)
   - Credenziali di accesso (password)
   - Immagine del profilo
   - Ruolo (Editor o Admin)
   - ID Google per l'autenticazione OAuth
   - Timestamp per tracciare creazione e aggiornamento

2. **Post**: rappresenta un articolo del blog
   ```javascript
   const postSchema = new mongoose.Schema({
       title: {
           type: String,
           required: true,
       },
       category: {
           type: String,
           required: true,
       },
       cover: String,
       content: {
           type: String,
           required: true,
       },
       readTime: {
           value: {    
               type: Number,
               required: true,
           },
           unit: {
               type: String,
               required: true,
           },
       },
       author: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
           required: true,
       },
   }, { timestamps: true });
   ```

   Il modello Post include:
   - Informazioni sul contenuto (titolo, categoria, testo)
   - Immagine di copertina
   - Tempo di lettura stimato
   - Riferimento all'autore (relazione con il modello User)
   - Timestamp per tracciare creazione e aggiornamento

3. **Comment**: rappresenta un commento a un post
   ```javascript
   const commentSchema = new mongoose.Schema({
       content: {
           type: String,
           required: true,
       },
       author: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
           required: true,
       },
       post: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Post",
           required: true,
       }
   }, { timestamps: true });
   ```

   Il modello Comment include:
   - Contenuto del commento
   - Riferimento all'autore (relazione con il modello User)
   - Riferimento al post commentato (relazione con il modello Post)
   - Timestamp per tracciare creazione e aggiornamento

Questi modelli definiscono non solo la struttura dei dati, ma anche le relazioni tra le diverse entità:
- Un utente può creare molti post (relazione uno-a-molti)
- Un post può avere molti commenti (relazione uno-a-molti)
- Un utente può creare molti commenti (relazione uno-a-molti)

### Routing e API

Le route API sono organizzate in moduli separati per ciascuna entità principale:

1. **auth.js**: gestisce l'autenticazione degli utenti
   - `POST /auth/register`: registrazione di un nuovo utente
   - `POST /auth/login`: login con credenziali locali
   - `GET /auth/me`: recupero informazioni dell'utente autenticato
   - `GET /auth/google`: autenticazione con Google
   - `GET /auth/google/callback`: callback per l'autenticazione Google

   Esempio di implementazione del login:
   ```javascript
   router.post('/login', (req, res, next) => {
       passport.authenticate('local', (err, user, info) => {
           if (err) return next(err);
           if (!user) {
               return res.status(400).json({ message: info.message });
           }

           const token = generateToken(user);
           const userToSend = {
               _id: user._id,
               email: user.email,
               role: user.role,
               firstName: user.firstName,
               lastName: user.lastName,
               profileImage: user.profileImage
           };
           res.json({ user: userToSend, token });
       })(req, res, next);
   });
   ```

2. **posts.js**: gestisce le operazioni sui post
   - `GET /posts`: recupero di tutti i post con paginazione
   - `GET /posts/:id`: recupero di un post specifico
   - `POST /posts`: creazione di un nuovo post
   - `PUT /posts/:id`: aggiornamento di un post esistente
   - `DELETE /posts/:id`: eliminazione di un post

   Esempio di implementazione del recupero dei post:
   ```javascript
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
   ```

3. **comments.js**: gestisce le operazioni sui commenti
   - `GET /comments/post/:postId`: recupero dei commenti di un post
   - `POST /comments`: creazione di un nuovo commento
   - `DELETE /comments/:id`: eliminazione di un commento

   Esempio di implementazione della creazione di un commento:
   ```javascript
   router.post("/", auth, async (req, res) => {
       try {
           const { content, post } = req.body;
           const newComment = new Comment({ 
               content, 
               author: req.userId,
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
   ```

4. **users.js**: gestisce le operazioni sugli utenti
   - `GET /users`: recupero di tutti gli utenti
   - `POST /users/register`: registrazione di un nuovo utente (duplicato di auth/register)
   - `POST /users/login`: login con credenziali locali (duplicato di auth/login)
   - `PUT /users/:id`: aggiornamento del profilo utente
   - `PUT /users/:id/password`: aggiornamento della password

   Esempio di implementazione dell'aggiornamento del profilo:
   ```javascript
   router.put("/:id", upload.single('profileImage'), async (req, res) => {
       try {
           const { id } = req.params;
           const { firstName, lastName } = req.body;

           const updateData = { firstName, lastName };
           
           if (req.file) {
               updateData.profileImage = req.file.path;
           }

           const updatedUser = await User.findByIdAndUpdate(
               id, 
               updateData, 
               { new: true }
           ).select("-password");
           
           if (!updatedUser) {
               return res.status(404).json({ message: "Utente non trovato" });
           }
           
           res.status(200).json(updatedUser);
       } catch (error) {
           res.status(500).json({ message: error.message });
       }
   });
   ```

Tutte queste route seguono i principi RESTful, utilizzando i metodi HTTP appropriati per le diverse operazioni (GET per lettura, POST per creazione, PUT per aggiornamento, DELETE per eliminazione) e restituendo risposte JSON con codici di stato HTTP appropriati.

### Autenticazione e sicurezza

EpiBlog implementa un sistema di autenticazione robusto che utilizza diverse tecnologie:

1. **JWT (JSON Web Token)**:
   - I token JWT vengono generati al login e contengono l'ID dell'utente, l'email e il ruolo
   - I token hanno una scadenza (24 ore) per limitare il rischio in caso di furto
   - I token vengono verificati per ogni richiesta che richiede autenticazione

   ```javascript
   // Generazione del token
   const generateToken = (user) => {
       return jwt.sign(
           { id: user._id, email: user.email, role: user.role }, 
           process.env.JWT_SECRET, 
           { expiresIn: '24h' }
       );
   };

   // Verifica del token
   const auth = async (req, res, next) => {
       try {
           const authHeader = req.headers.authorization;
           if (!authHeader || !authHeader.startsWith('Bearer ')) {
               return res.status(401).json({ message: 'Token non fornito' });
           }

           const token = authHeader.split(' ')[1];
           const decoded = jwt.verify(token, process.env.JWT_SECRET);
           
           req.userId = decoded.id;
           next();
       } catch (err) {
           // Gestione errori
       }
   };
   ```

2. **Passport.js**:
   - Implementa la strategia di autenticazione locale (email/password)
   - Implementa la strategia di autenticazione Google OAuth
   - Gestisce la serializzazione e deserializzazione degli utenti per le sessioni

   ```javascript
   // Strategia locale
   passport.use(new LocalStrategy(
       { usernameField: 'email', passwordField: 'password' }, 
       async(email, password, done) => {
           try {
               const user = await User.findOne({ email });
               if (!user) {
                   return done(null, false, { message: 'Utente non trovato' });
               }

               const isMatch = user.password.startsWith('$2b$') 
                   ? await bcrypt.compare(password, user.password) 
                   : user.password === password;

               if (!isMatch) {
                   return done(null, false, { message: 'Password errata' });
               }
               return done(null, user);
           } catch (err) {
               return done(err, false);
           }
       }
   ));

   // Strategia Google
   passport.use(new GoogleStrategy({
       clientID: process.env.GOOGLE_CLIENT_ID,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
       callbackURL: "http://localhost:5020/api/auth/google/callback"
   }, async (accessToken, refreshToken, profile, done) => {
       // Logica per trovare o creare l'utente
   }));
   ```

3. **Bcrypt**:
   - Utilizzato per l'hashing sicuro delle password
   - Implementa automaticamente il salting per proteggere contro attacchi rainbow table
   - Permette di verificare le password senza memorizzarle in chiaro

   ```javascript
   // Hashing della password
   const hashedPassword = await bcrypt.hash(password, 10);

   // Verifica della password
   const isMatch = await bcrypt.compare(password, user.password);
   ```

4. **Middleware di autorizzazione**:
   - Oltre all'autenticazione, il backend implementa controlli di autorizzazione
   - Verifica che l'utente sia l'autore di un post prima di permetterne la modifica o l'eliminazione
   - Verifica che l'utente sia l'autore di un commento prima di permetterne l'eliminazione

   ```javascript
   // Verifica che l'utente sia l'autore del post
   if (post.author.toString() !== req.userId) {
       return res.status(403).json({ message: "Non hai i permessi per modificare questo post" });
   }
   ```

Questo sistema di autenticazione e sicurezza garantisce che solo gli utenti autorizzati possano accedere a determinate funzionalità dell'applicazione e che le operazioni sensibili siano protette da accessi non autorizzati.

### Gestione file e immagini

EpiBlog utilizza Cloudinary per la gestione delle immagini, implementata attraverso le seguenti componenti:

1. **Configurazione di Cloudinary**:
   ```javascript
   // utils/cloudinary.js
   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   });
   ```

2. **Storage Cloudinary per Multer**:
   ```javascript
   // utils/cloudinary.js
   const storage = new CloudinaryStorage({
     cloudinary: cloudinary,
     params: {
       folder: 'blog',
       allowed_formats: ['jpg', 'png', 'jpeg']
     }
   });
   ```

3. **Middleware Multer per l'upload**:
   ```javascript
   // utils/cloudinary.js
   const upload = multer({ storage: storage });
   ```

4. **Utilizzo nelle route**:
   ```javascript
   // routes/posts.js
   router.post("/", auth, upload.single("cover"), async (req, res) => {
       // La cover è disponibile come req.file.path
   });

   // routes/users.js
   router.put("/:id", upload.single('profileImage'), async (req, res) => {
       // L'immagine del profilo è disponibile come req.file.path
   });
   ```

Questo sistema permette di:
- Caricare immagini direttamente su Cloudinary
- Memorizzare solo l'URL dell'immagine nel database
- Sfruttare le funzionalità di Cloudinary come il ridimensionamento e l'ottimizzazione
- Servire le immagini tramite la CDN di Cloudinary per migliori performance

### Configurazione del server

Il file `server.js` è il punto di ingresso dell'applicazione backend e configura tutti i componenti necessari:

```javascript
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
```

Questo file configura:
1. **Variabili d'ambiente**: carica le variabili d'ambiente dal file `.env`
2. **Middleware Express**:
   - CORS per gestire le richieste cross-origin
   - Parser JSON per interpretare i body delle richieste
   - Sessioni per Passport.js
3. **Passport**: inizializza Passport per l'autenticazione
4. **MongoDB**: configura la connessione al database
5. **Route API**: registra le route per le diverse entità
6. **Server HTTP**: avvia il server sulla porta specificata

## Frontend

### Struttura e organizzazione

Il frontend di EpiBlog è organizzato in una struttura modulare che separa chiaramente i diversi tipi di componenti:

```
frontend/
├── public/          # File statici
├── src/             # Codice sorgente
│   ├── components/  # Componenti riutilizzabili
│   │   ├── Comments.jsx
│   │   ├── Navbar.jsx
│   │   └── PostCard.jsx
│   ├── contexts/    # Context per la gestione dello stato
│   │   └── AuthContext.jsx
│   ├── pages/       # Componenti pagina
│   │   ├── CreatePost.jsx
│   │   ├── EditPost.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyPosts.jsx
│   │   ├── PostDetails.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   ├── utils/       # Utilità
│   │   └── api.js
│   ├── App.js       # Componente principale
│   ├── index.js     # Punto di ingresso
│   └── ...          # Altri file
└── package.json     # Dipendenze e script
```

Questa struttura segue le best practice di React, separando:
- **Componenti**: elementi UI riutilizzabili
- **Pagine**: componenti che rappresentano intere pagine dell'applicazione
- **Contesti**: gestione dello stato globale
- **Utilità**: funzioni e configurazioni condivise

### Componenti principali

I componenti principali dell'applicazione sono:

1. **Navbar.jsx**: barra di navigazione presente in tutte le pagine
   ```jsx
   const NavBar = () => {
     const { user, logout } = useAuth();
     const navigate = useNavigate();

     const handleLogout = () => {
       logout();
       navigate('/');
     };

     return (
       <Navbar bg="light" expand="lg" className="mb-4">
         <Container>
           <Navbar.Brand as={Link} to="/">Blog</Navbar.Brand>
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id="basic-navbar-nav">
             <Nav className="me-auto">
               <Nav.Link as={Link} to="/">Home</Nav.Link>
             </Nav>
             <Nav>
               {user ? (
                 // Menu utente autenticato
               ) : (
                 // Link login/register
               )}
             </Nav>
           </Navbar.Collapse>
         </Container>
       </Navbar>
     );
   }
   ```

   Questo componente:
   - Utilizza il context di autenticazione per verificare se l'utente è loggato
   - Mostra menu diversi per utenti autenticati e non autenticati
   - Gestisce il logout dell'utente

2. **PostCard.jsx**: card che rappresenta un post nella lista
   ```jsx
   const PostCard = ({ post }) => {
     const authorName = post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Autore sconosciuto';
     const navigate = useNavigate();

     return (
       <Card className="h-100 shadow-sm" onClick={() => navigate(`/posts/${post._id}`)} style={{ cursor: 'pointer' }}>
         <Card.Img variant="top" src={post.cover} style= {{maxHeight:"200px", objectFit:"cover"}} />
         <Card.Body>
           <div className="d-flex justify-content-between">
             <Badge bg="secondary">{post.category}</Badge>
             <small className="text-muted">{post.readTime.value} {post.readTime.unit}</small>
           </div>
           <Card.Title>{post.title}</Card.Title>
           <Card.Text>{post.content.substring(0,150)}...</Card.Text>
           <Badge bg="dark" className="ms-2">{authorName}</Badge>
         </Card.Body>
       </Card>
     );
   }
   ```

   Questo componente:
   - Riceve un post come prop
   - Visualizza le informazioni principali del post (titolo, categoria, anteprima del contenuto)
   - Gestisce la navigazione alla pagina di dettaglio del post quando viene cliccato

3. **Comments.jsx**: componente per la visualizzazione e gestione dei commenti
   ```jsx
   const Comments = ({ postId }) => {
       const [comments, setComments] = useState([]);
       const [newComment, setNewComment] = useState('');
       const [error, setError] = useState('');
       const { user } = useAuth();
       
       const fetchComments = async () => {
           try {
               const response = await axios.get(`http://localhost:5020/api/comments/post/${postId}`);
               setComments(response.data);
           } catch (error) {
               setError('Errore nel caricamento dei commenti');
           }
       };

       useEffect(() => {
           fetchComments();
       }, [postId]);

       const handleSubmit = async (e) => {
           e.preventDefault();
           try {
               const response = await axios.post('http://localhost:5020/api/comments', {
                   content: newComment,
                   author: user._id,
                   post: postId
               });
               setComments([response.data, ...comments]);
               setNewComment('');
               setError('');
           } catch (error) {
               setError('Errore nella pubblicazione del commento');
           }
       };

       // Resto del componente...
   };
   ```

   Questo componente:
   - Riceve l'ID del post come prop
   - Carica i commenti relativi al post
   - Permette agli utenti autenticati di aggiungere nuovi commenti
   - Permette agli utenti di eliminare i propri commenti

### Gestione dello stato

EpiBlog utilizza diversi approcci per la gestione dello stato:

1. **Context API**: per lo stato globale dell'applicazione
   ```jsx
   // contexts/AuthContext.jsx
   const AuthContext = createContext();

   export const AuthProvider = ({ children }) => {
       const [user, setUser] = useState(() => {
           const savedUser = localStorage.getItem("user");
           return savedUser ? JSON.parse(savedUser) : null;
       });

       const [token, setToken] = useState(() => {
           return localStorage.getItem("token");
       });

       // Funzioni per login, logout, ecc.

       return (
           <AuthContext.Provider value={{ user, token, login, logout }}>
               {children}
           </AuthContext.Provider>
       );
   };

   export const useAuth = () => {
       const context = useContext(AuthContext);
       if (!context) {
           throw new Error("useAuth deve essere utilizzato all'interno di un AuthProvider");
       }
       return context;
   };
   ```

   Il Context API viene utilizzato per:
   - Gestire lo stato di autenticazione dell'utente
   - Rendere disponibili i dati dell'utente in tutta l'applicazione
   - Fornire funzioni per login e logout

2. **useState**: per lo stato locale dei componenti
   ```jsx
   // pages/Home.jsx
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);
   ```

   useState viene utilizzato per:
   - Gestire i dati specifici di un componente
   - Gestire lo stato dell'interfaccia utente (loading, error)
   - Gestire input e form

3. **useEffect**: per effetti collaterali e chiamate API
   ```jsx
   // pages/Home.jsx
   useEffect(() => {
     const fetchPosts = async () => {
       try {
         setLoading(true);
         const response = await axios.get(`http://localhost:5020/api/posts?page=${currentPage}&limit=6`);
         setPosts(response.data.posts);
         setTotalPages(response.data.totalPages);
         setError(null);
       } catch (error) {
         console.error('Error fetching posts:', error);
         setError('Errore nel caricamento dei post');
         setPosts([]);
       } finally {
         setLoading(false);
       }
     };
     fetchPosts();
   }, [currentPage]);
   ```

   useEffect viene utilizzato per:
   - Caricare dati all'inizializzazione del componente
   - Ricaricare dati quando cambiano determinate dipendenze
   - Eseguire operazioni di pulizia quando il componente viene smontato

4. **localStorage**: per la persistenza dei dati tra le sessioni
   ```jsx
   // contexts/AuthContext.jsx
   const login = (userData, userToken) => {
       setUser(userData);
       setToken(userToken);
       localStorage.setItem("user", JSON.stringify(userData));
       localStorage.setItem("token", userToken);
   };

   const logout = () => {
       setUser(null);
       setToken(null);
       localStorage.removeItem("user");
       localStorage.removeItem("token");
   };
   ```

   localStorage viene utilizzato per:
   - Memorizzare i dati dell'utente e il token JWT
   - Mantenere l'utente autenticato anche dopo il refresh della pagina

### Routing e navigazione

EpiBlog utilizza React Router per gestire la navigazione tra le diverse pagine dell'applicazione:

1. **Configurazione delle route**:
   ```jsx
   // App.js
   function App() {
     return (
       <AuthProvider>
         <Router>
           <NavBar />
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
             <Route path="/posts/:id" element={<PostDetails />} />
             <Route path="/posts/create" element={<CreatePost />} />
             <Route path="/posts/edit/:id" element={<EditPost />} />
             <Route path="/my-posts" element={<MyPosts />} />
             <Route path="/profile" element={<Profile />} />
           </Routes>
         </Router>
       </AuthProvider>
     );
   }
   ```

   Questa configurazione definisce:
   - Le route disponibili nell'applicazione
   - I componenti da renderizzare per ciascuna route
   - I parametri dinamici (come `:id` per i post)

2. **Navigazione programmatica**:
   ```jsx
   // Esempio di navigazione dopo un'azione
   const navigate = useNavigate();
   
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       // Logica di invio dati
       navigate('/');  // Reindirizza alla home
     } catch (error) {
       // Gestione errori
     }
   };
   ```

   La navigazione programmatica viene utilizzata per:
   - Reindirizzare l'utente dopo operazioni come login, creazione post, ecc.
   - Implementare flussi di navigazione complessi

3. **Link per la navigazione dichiarativa**:
   ```jsx
   // Esempio di link nella navbar
   <Nav.Link as={Link} to="/">Home</Nav.Link>
   <Nav.Link as={Link} to="/login">Login</Nav.Link>
   ```

   I link vengono utilizzati per:
   - Permettere all'utente di navigare tra le diverse pagine
   - Creare menu e barre di navigazione

4. **Accesso ai parametri URL**:
   ```jsx
   // pages/PostDetails.jsx
   const { id } = useParams();
   
   useEffect(() => {
     const fetchPost = async () => {
       try {
         const response = await axios.get(`http://localhost:5020/api/posts/${id}`);
         setPost(response.data);
       } catch (error) {
         setError('Errore nel caricamento del post');
       } finally {
         setLoading(false);
       }
     };
     fetchPost();
   }, [id]);
   ```

   I parametri URL vengono utilizzati per:
   - Recuperare l'ID del post nella pagina di dettaglio
   - Recuperare l'ID del post nella pagina di modifica

### Interazione con le API

EpiBlog utilizza Axios per interagire con le API del backend:

1. **Configurazione di base**:
   ```javascript
   // utils/api.js
   import axios from 'axios';

   const api = axios.create({
       baseURL: 'http://localhost:5020/api'
   });

   // Aggiungi il token a tutte le richieste
   api.interceptors.request.use(
       (config) => {
           const token = localStorage.getItem('token');
           if (token) {
               config.headers.Authorization = `Bearer ${token}`;
           }
           return config;
       },
       (error) => {
           return Promise.reject(error);
       }
   );

   // Gestisci gli errori di autenticazione
   api.interceptors.response.use(
       (response) => response,
       (error) => {
           if (error.response && error.response.status === 401) {
               // Token scaduto o non valido
               localStorage.removeItem('user');
               localStorage.removeItem('token');
               window.location.href = '/login';
           }
           return Promise.reject(error);
       }
   );

   export default api;
   ```

   Questa configurazione:
   - Crea un'istanza di Axios con l'URL base dell'API
   - Aggiunge automaticamente il token JWT a tutte le richieste
   - Gestisce gli errori di autenticazione (token scaduto o non valido)

2. **Richieste GET**:
   ```javascript
   // Esempio di richiesta GET
   const fetchPosts = async () => {
     try {
       const response = await api.get(`/posts?page=${currentPage}&limit=6`);
       setPosts(response.data.posts);
       setTotalPages(response.data.totalPages);
     } catch (error) {
       setError('Errore nel caricamento dei post');
     }
   };
   ```

3. **Richieste POST**:
   ```javascript
   // Esempio di richiesta POST
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const formData = new FormData();
       formData.append('title', title);
       formData.append('category', category);
       formData.append('content', content);
       formData.append('readTime', JSON.stringify({ value: readTimeValue, unit: readTimeUnit }));
       formData.append('cover', coverImage);

       const response = await api.post('/posts', formData);
       navigate(`/posts/${response.data._id}`);
     } catch (error) {
       setError('Errore nella creazione del post');
     }
   };
   ```

4. **Richieste PUT**:
   ```javascript
   // Esempio di richiesta PUT
   const handleUpdate = async (e) => {
     e.preventDefault();
     try {
       const formData = new FormData();
       formData.append('title', title);
       formData.append('category', category);
       formData.append('content', content);
       formData.append('readTime', JSON.stringify({ value: readTimeValue, unit: readTimeUnit }));
       if (coverImage) {
         formData.append('cover', coverImage);
       }

       const response = await api.put(`/posts/${id}`, formData);
       navigate(`/posts/${response.data._id}`);
     } catch (error) {
       setError('Errore nell\'aggiornamento del post');
     }
   };
   ```

5. **Richieste DELETE**:
   ```javascript
   // Esempio di richiesta DELETE
   const handleDelete = async () => {
     try {
       await api.delete(`/posts/${id}`);
       navigate('/my-posts');
     } catch (error) {
       setError('Errore nell\'eliminazione del post');
     }
   };
   ```

Queste interazioni con le API permettono al frontend di:
- Recuperare dati dal backend (post, commenti, informazioni utente)
- Inviare nuovi dati al backend (creazione di post e commenti)
- Aggiornare dati esistenti (modifica di post e profilo utente)
- Eliminare dati (eliminazione di post e commenti)

## Terminologie e Concetti

### Glossario dei termini tecnici

#### Backend

- **MongoDB**: database NoSQL orientato ai documenti che memorizza i dati in formato BSON (Binary JSON).

- **Mongoose**: ODM (Object Data Modeling) per MongoDB e Node.js che fornisce una soluzione basata su schemi per modellare i dati dell'applicazione.

- **Express.js**: framework web per Node.js che semplifica lo sviluppo di applicazioni web e API.

- **Middleware**: funzioni che hanno accesso all'oggetto richiesta (req), all'oggetto risposta (res) e alla funzione next nel ciclo richiesta-risposta dell'applicazione.

- **JWT (JSON Web Token)**: standard aperto (RFC 7519) che definisce un modo compatto e autonomo per trasmettere in modo sicuro informazioni tra le parti come un oggetto JSON.

- **Bcrypt**: funzione di hashing delle password progettata per costruire password sicure resistenti agli attacchi di forza bruta.

- **Cloudinary**: servizio cloud che offre una soluzione per caricare, archiviare, gestire, manipolare e distribuire immagini e video.

- **Passport.js**: middleware di autenticazione per Node.js che supporta diverse strategie di autenticazione.

#### Frontend

- **React**: libreria JavaScript per costruire interfacce utente, basata sul concetto di componenti riutilizzabili.

- **JSX**: estensione della sintassi JavaScript che permette di scrivere markup HTML all'interno di JavaScript.

- **Hooks**: funzioni che permettono di "agganciare" le funzionalità di React state e lifecycle in componenti funzionali.

- **Context API**: funzionalità di React che permette di condividere dati tra componenti senza passarli esplicitamente attraverso le props.

- **React Router**: libreria di routing per React che permette di gestire la navigazione tra diverse "pagine" in un'applicazione a pagina singola.

- **Axios**: libreria JavaScript basata su promesse per effettuare richieste HTTP.

- **React Bootstrap**: libreria di componenti UI che implementa Bootstrap in React.

### Concetti fondamentali con esempi

#### MVC (Model-View-Controller)

Il pattern MVC separa un'applicazione in tre componenti principali:
- **Model**: gestisce i dati e la logica di business (Mongoose models)
- **View**: gestisce l'interfaccia utente (React components)
- **Controller**: gestisce le richieste dell'utente (Express routes)

Esempio in EpiBlog:
- **Model**: `Post.js` definisce la struttura dei dati dei post
- **Controller**: `posts.js` gestisce le richieste relative ai post
- **View**: `PostDetails.jsx` visualizza i dettagli di un post

#### RESTful API

Un'architettura per la creazione di servizi web che utilizza il protocollo HTTP e segue principi specifici.

Esempio in EpiBlog:
```javascript
// API RESTful per i post (routes/posts.js)
router.get("/", async (req, res) => { /* GET tutti i post */ });
router.get("/:id", async (req, res) => { /* GET un post specifico */ });
router.post("/", auth, upload.single("cover"), async (req, res) => { /* POST crea un nuovo post */ });
router.put("/:id", auth, upload.single('cover'), async (req, res) => { /* PUT modifica un post */ });
router.delete("/:id", auth, async (req, res) => { /* DELETE elimina un post */ });
```

#### JWT Authentication

Un meccanismo di autenticazione basato su token che permette di verificare l'identità di un utente senza sessioni lato server.

Esempio in EpiBlog:
```javascript
// Verifica del token JWT (routes/auth.js)
const token = authHeader.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

#### Single Page Application (SPA)

Un'applicazione web che carica una singola pagina HTML e la aggiorna dinamicamente in base all'interazione dell'utente, senza ricaricare l'intera pagina.

EpiBlog è una SPA costruita con React, che utilizza React Router per la navigazione tra le diverse "pagine" senza ricaricare il browser.

## Flussi Logici

### Registrazione e autenticazione

#### Registrazione Utente
1. **Frontend**: L'utente compila il form di registrazione nella pagina `Register.jsx`
2. **Frontend → Backend**: I dati vengono inviati alla route `/auth/register` tramite API
3. **Backend**: La route `auth.js` riceve i dati, verifica che l'utente non esista già, crea un hash della password con bcrypt
4. **Backend**: Viene creato un nuovo documento utente nel database MongoDB tramite il modello `Users.js`
5. **Backend**: Viene generato un JWT token con le informazioni dell'utente
6. **Backend → Frontend**: Il server risponde con i dati dell'utente e il token
7. **Frontend**: Il Context `AuthContext.jsx` salva l'utente e il token nel localStorage
8. **Frontend**: L'utente viene reindirizzato alla home page

```
Register.jsx → API → auth.js → Users.js → MongoDB → JWT → AuthContext.jsx → Home.jsx
```

#### Login Utente
1. **Frontend**: L'utente compila il form di login nella pagina `Login.jsx`
2. **Frontend → Backend**: I dati vengono inviati alla route `/auth/login` tramite API
3. **Backend**: La route `auth.js` utilizza Passport.js per autenticare l'utente
4. **Backend**: Passport verifica le credenziali confrontando la password con l'hash nel database
5. **Backend**: Viene generato un JWT token con le informazioni dell'utente
6. **Backend → Frontend**: Il server risponde con i dati dell'utente e il token
7. **Frontend**: Il Context `AuthContext.jsx` salva l'utente e il token nel localStorage
8. **Frontend**: L'utente viene reindirizzato alla home page

```
Login.jsx → API → auth.js → Passport.js → Users.js → MongoDB → JWT → AuthContext.jsx → Home.jsx
```

#### Login con Google
1. **Frontend**: L'utente clicca sul pulsante "Accedi con Google" nella pagina `Login.jsx`
2. **Frontend → Backend**: L'utente viene reindirizzato alla route `/auth/google`
3. **Backend**: Passport.js reindirizza l'utente all'autenticazione Google
4. **Backend**: Dopo l'autenticazione, Google reindirizza alla callback URL `/auth/google/callback`
5. **Backend**: Passport.js verifica i dati dell'utente, crea o aggiorna l'utente nel database
6. **Backend**: Viene generato un JWT token con le informazioni dell'utente
7. **Backend → Frontend**: L'utente viene reindirizzato a `/login?token=TOKEN`
8. **Frontend**: La pagina `Login.jsx` rileva il token nell'URL e lo utilizza per autenticare l'utente
9. **Frontend**: Il Context `AuthContext.jsx` salva l'utente e il token nel localStorage
10. **Frontend**: L'utente viene reindirizzato alla home page

```
Login.jsx → auth.js → Passport.js → Google OAuth → Passport.js → Users.js → MongoDB → JWT → Login.jsx → AuthContext.jsx → Home.jsx
```

### Creazione e gestione dei post

#### Visualizzazione dei Post
1. **Frontend**: La pagina `Home.jsx` viene caricata
2. **Frontend → Backend**: Viene inviata una richiesta GET a `/posts` tramite API
3. **Backend**: La route `posts.js` recupera i post dal database con paginazione
4. **Backend → Frontend**: Il server risponde con i post e le informazioni di paginazione
5. **Frontend**: `Home.jsx` aggiorna lo stato con i post ricevuti
6. **Frontend**: I post vengono visualizzati utilizzando il componente `PostCard.jsx`

```
Home.jsx → API → posts.js → Post.js → MongoDB → Home.jsx → PostCard.jsx
```

#### Creazione di un Post
1. **Frontend**: L'utente compila il form nella pagina `CreatePost.jsx`
2. **Frontend → Backend**: I dati e l'immagine vengono inviati alla route `/posts` tramite API
3. **Backend**: La route `posts.js` verifica l'autenticazione dell'utente tramite il middleware `auth`
4. **Backend**: L'immagine viene caricata su Cloudinary tramite `cloudinary.js`
5. **Backend**: Viene creato un nuovo documento post nel database tramite il modello `Post.js`
6. **Backend → Frontend**: Il server risponde con i dati del post creato
7. **Frontend**: L'utente viene reindirizzato alla pagina di dettaglio del post

```
CreatePost.jsx → API → auth middleware → posts.js → cloudinary.js → Post.js → MongoDB → PostDetails.jsx
```

#### Modifica di un Post
1. **Frontend**: L'utente modifica il form nella pagina `EditPost.jsx`
2. **Frontend → Backend**: I dati aggiornati vengono inviati alla route `/posts/:id` tramite API
3. **Backend**: La route `posts.js` verifica l'autenticazione e che l'utente sia l'autore del post
4. **Backend**: Se è stata caricata una nuova immagine, viene aggiornata su Cloudinary
5. **Backend**: Il documento post viene aggiornato nel database
6. **Backend → Frontend**: Il server risponde con i dati del post aggiornato
7. **Frontend**: L'utente viene reindirizzato alla pagina di dettaglio del post

```
EditPost.jsx → API → auth middleware → posts.js → cloudinary.js → Post.js → MongoDB → PostDetails.jsx
```

### Sistema di commenti

#### Visualizzazione dei Commenti
1. **Frontend**: La pagina `PostDetails.jsx` carica il componente `Comments.jsx`
2. **Frontend → Backend**: Viene inviata una richiesta GET a `/comments/post/:postId` tramite API
3. **Backend**: La route `comments.js` recupera i commenti relativi al post dal database
4. **Backend → Frontend**: Il server risponde con i commenti
5. **Frontend**: `Comments.jsx` aggiorna lo stato con i commenti ricevuti e li visualizza

```
PostDetails.jsx → Comments.jsx → API → comments.js → Comment.js → MongoDB → Comments.jsx
```

#### Creazione di un Commento
1. **Frontend**: L'utente scrive un commento nel componente `Comments.jsx`
2. **Frontend → Backend**: Il commento viene inviato alla route `/comments` tramite API
3. **Backend**: La route `comments.js` verifica l'autenticazione dell'utente
4. **Backend**: Viene creato un nuovo documento commento nel database tramite il modello `Comment.js`
5. **Backend → Frontend**: Il server risponde con i dati del commento creato
6. **Frontend**: `Comments.jsx` aggiorna lo stato aggiungendo il nuovo commento

```
Comments.jsx → API → auth middleware → comments.js → Comment.js → MongoDB → Comments.jsx
```

### Gestione del profilo utente

#### Visualizzazione del Profilo
1. **Frontend**: L'utente accede alla pagina `Profile.jsx`
2. **Frontend**: I dati dell'utente vengono recuperati dal Context `AuthContext.jsx`
3. **Frontend**: La pagina visualizza i dati dell'utente e le opzioni di modifica

```
Navbar.jsx → Profile.jsx → AuthContext.jsx
```

#### Aggiornamento del Profilo
1. **Frontend**: L'utente modifica i dati del profilo nella pagina `Profile.jsx`
2. **Frontend → Backend**: I dati aggiornati vengono inviati alla route `/users/:id` tramite API
3. **Backend**: La route `users.js` aggiorna il documento utente nel database
4. **Backend → Frontend**: Il server risponde con i dati dell'utente aggiornati
5. **Frontend**: `Profile.jsx` aggiorna il Context `AuthContext.jsx` con i nuovi dati

```
Profile.jsx → API → users.js → Users.js → MongoDB → Profile.jsx → AuthContext.jsx
```

### Interazione tra componenti

#### Relazione User-Post
- Un utente può creare molti post (relazione uno-a-molti)
- Nel modello `Post.js`, il campo `author` è un riferimento all'ID dell'utente
- Quando si recuperano i post, il campo `author` viene popolato con i dati dell'utente tramite `populate()`

```javascript
// Post.js
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
}

// posts.js (esempio di populate)
const posts = await Post.find(author)
    .populate("author", "firstName lastName")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(perPage);
```

#### Relazione Post-Comment
- Un post può avere molti commenti (relazione uno-a-molti)
- Nel modello `Comment.js`, il campo `post` è un riferimento all'ID del post
- Quando si recuperano i commenti, vengono filtrati per l'ID del post

```javascript
// Comment.js
post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
}

// comments.js (esempio di query)
const comments = await Comment.find({ post: req.params.postId })
    .populate("author", "firstName lastName profileImage")
    .sort({ createdAt: -1 });
```

## Scelte Implementative

### Motivazioni architetturali

#### Separazione Backend-Frontend

**Scelta implementativa**: L'applicazione è stata strutturata con una netta separazione tra backend (Node.js/Express) e frontend (React).

**Argomentazione**:
- **Manutenibilità**: La separazione permette di sviluppare, testare e mantenere le due parti indipendentemente.
- **Scalabilità**: È possibile scalare backend e frontend separatamente in base alle necessità.
- **Specializzazione**: Consente ai team di sviluppo di specializzarsi nelle rispettive aree.
- **Evoluzione tecnologica**: Permette di aggiornare o sostituire una delle due parti senza impattare l'altra.
- **API-first**: Facilita lo sviluppo di future applicazioni (mobile, desktop) che possono utilizzare le stesse API.

#### Pattern MVC

**Scelta implementativa**: Adozione del pattern Model-View-Controller, con modelli Mongoose, controller nelle route Express e view gestite da React.

**Argomentazione**:
- **Separazione delle responsabilità**: Ogni componente ha un ruolo ben definito.
- **Organizzazione del codice**: Struttura chiara e prevedibile che facilita la comprensione.
- **Riutilizzo del codice**: I modelli e i controller possono essere riutilizzati in diverse parti dell'applicazione.
- **Testabilità**: Facilita la scrittura di test unitari per ciascun componente.

### Scelte tecnologiche

#### Node.js e Express

**Scelta implementativa**: Utilizzo di Node.js con il framework Express per il backend.

**Argomentazione**:
- **JavaScript full-stack**: Permette di utilizzare lo stesso linguaggio sia nel frontend che nel backend.
- **Asincronia**: L'architettura event-driven di Node.js è ideale per operazioni I/O intensive come le richieste al database.
- **Ecosistema npm**: Accesso a un vasto ecosistema di librerie e strumenti.
- **Prestazioni**: Express è leggero e performante, ideale per API RESTful.
- **Comunità attiva**: Ampia comunità di sviluppatori e documentazione disponibile.

#### MongoDB e Mongoose

**Scelta implementativa**: Utilizzo di MongoDB come database NoSQL con Mongoose come ODM.

**Argomentazione**:
- **Flessibilità dello schema**: Ideale per dati con struttura variabile o in evoluzione.
- **Formato JSON**: Naturale integrazione con JavaScript e le API REST.
- **Scalabilità orizzontale**: Facilità di distribuzione su più server.
- **Mongoose**: Aggiunge validazione, casting dei tipi, hooks e altre funzionalità che migliorano l'esperienza di sviluppo.
- **Relazioni**: Nonostante MongoDB sia un database NoSQL, Mongoose facilita la gestione delle relazioni tra documenti tramite populate().

#### JWT per l'Autenticazione

**Scelta implementativa**: Utilizzo di JSON Web Token per l'autenticazione invece di sessioni server-side.

**Argomentazione**:
- **Stateless**: Non richiede di memorizzare lo stato della sessione sul server.
- **Scalabilità**: Facilita la distribuzione su più server senza necessità di condividere lo stato delle sessioni.
- **Performance**: Riduce le query al database per verificare l'autenticazione.
- **Cross-domain**: Facilita l'autenticazione tra domini diversi.
- **Mobile-friendly**: Ideale per applicazioni mobile che utilizzano le stesse API.

#### React e React Bootstrap

**Scelta implementativa**: Utilizzo di React come libreria per l'interfaccia utente e React Bootstrap per i componenti UI.

**Argomentazione**:
- **Component-based**: Facilita la creazione di interfacce modulari e riutilizzabili.
- **Virtual DOM**: Ottimizza le performance minimizzando le manipolazioni del DOM.
- **Unidirezionalità dei dati**: Flusso di dati prevedibile che facilita il debugging.
- **Componenti pronti all'uso**: React Bootstrap riduce il tempo di sviluppo dell'interfaccia.
- **Responsive design**: Supporto nativo per layout responsive.

### Pattern di progettazione

#### Componenti Funzionali e Hooks

**Scelta implementativa**: Utilizzo di componenti funzionali e hooks invece di componenti a classe.

**Argomentazione**:
- **Semplicità**: I componenti funzionali sono più semplici e leggibili.
- **Hooks**: Permettono di utilizzare lo stato e altre funzionalità di React senza scrivere classi.
- **Riutilizzo della logica**: I custom hooks permettono di estrarre e riutilizzare la logica tra componenti.
- **Prestazioni**: I componenti funzionali possono essere ottimizzati più facilmente.
- **Direzione futura**: Rappresentano la direzione futura di React.

#### Context API per la Gestione dello Stato

**Scelta implementativa**: Utilizzo della Context API di React per la gestione dello stato globale.

**Argomentazione**:
- **Semplicità**: Soluzione nativa di React, senza dipendenze esterne.
- **Prop drilling**: Evita il passaggio di props attraverso componenti intermedi.
- **Scope limitato**: Ideale per stati globali di dimensioni contenute come l'autenticazione.
- **Integrazione**: Si integra naturalmente con gli hooks di React.
- **Apprendimento**: Curva di apprendimento ridotta rispetto a soluzioni più complesse come Redux.

### Considerazioni sulla sicurezza

#### Hashing delle Password

**Scelta implementativa**: Utilizzo di bcrypt per l'hashing delle password.

**Argomentazione**:
- **Sicurezza**: bcrypt è progettato specificamente per l'hashing sicuro delle password.
- **Salt**: Incorpora automaticamente un salt unico per ogni password.
- **Fattore di costo**: Permette di regolare il costo computazionale dell'hashing.
- **Resistenza**: Resistente agli attacchi di forza bruta e alle tabelle rainbow.
- **Standard di settore**: Ampiamente riconosciuto come best practice.

#### Protezione CORS

**Scelta implementativa**: Configurazione esplicita di CORS per limitare le origini delle richieste.

**Argomentazione**:
- **Sicurezza**: Previene attacchi CSRF (Cross-Site Request Forgery).
- **Controllo**: Permette di specificare esattamente quali domini possono interagire con l'API.
- **Credenziali**: Configurazione esplicita per l'invio di credenziali nelle richieste cross-origin.
- **Headers**: Controllo sui headers permessi nelle richieste e nelle risposte.
- **Conformità**: Rispetto delle best practice di sicurezza web.

#### Middleware di Autorizzazione

**Scelta implementativa**: Implementazione di middleware per verificare i permessi degli utenti.

**Argomentazione**:
- **Sicurezza**: Garantisce che solo gli utenti autorizzati possano eseguire determinate azioni.
- **Riutilizzo**: Il middleware può essere applicato a diverse route.
- **Separazione delle responsabilità**: Separa la logica di autorizzazione dalla logica di business.
- **Manutenibilità**: Facilita la modifica delle regole di autorizzazione.
- **Chiarezza**: Rende esplicite le regole di autorizzazione.

### Scalabilità e manutenibilità

#### Struttura Modulare

**Scelta implementativa**: Organizzazione del codice in moduli separati per funzionalità.

**Argomentazione**:
- **Manutenibilità**: Facilita la comprensione e la modifica del codice.
- **Scalabilità**: Permette di aggiungere nuove funzionalità senza impattare quelle esistenti.
- **Collaborazione**: Facilita il lavoro in team su diverse parti dell'applicazione.
- **Testabilità**: Permette di testare i moduli separatamente.
- **Riutilizzo**: I moduli possono essere riutilizzati in diverse parti dell'applicazione.

#### Paginazione

**Scelta implementativa**: Implementazione della paginazione per le liste di post.

**Argomentazione**:
- **Performance**: Riduce il carico sul server e sul client.
- **Scalabilità**: Gestisce efficacemente grandi quantità di dati.
- **Esperienza utente**: Migliora i tempi di caricamento e la reattività dell'interfaccia.
- **Bandwidth**: Riduce la quantità di dati trasferiti.
- **Usabilità**: Fornisce un'interfaccia familiare per navigare tra i contenuti.

#### Servizi Cloud

**Scelta implementativa**: Utilizzo di Cloudinary per la gestione delle immagini.

**Argomentazione**:
- **Scalabilità**: Gestisce automaticamente il carico e lo storage.
- **CDN**: Distribuzione efficiente delle immagini a livello globale.
- **Funzionalità avanzate**: Trasformazioni, ottimizzazione, e altre funzionalità specializzate.
- **Costi**: Evita di dover gestire e scalare un proprio sistema di storage.
- **Manutenibilità**: Riduce la complessità dell'applicazione delegando la gestione delle immagini.

## Conclusioni

### Riepilogo

EpiBlog è un'applicazione web completa per la gestione di un blog, che implementa tutte le funzionalità tipiche di una piattaforma moderna di blogging:

1. **Autenticazione e gestione utenti**:
   - Registrazione e login con credenziali locali
   - Autenticazione con Google OAuth
   - Gestione del profilo utente

2. **Gestione dei contenuti**:
   - Creazione, modifica ed eliminazione di post
   - Caricamento di immagini per i post
   - Categorizzazione dei post

3. **Interazione**:
   - Sistema di commenti per i post
   - Gestione dei propri commenti

L'applicazione è stata sviluppata utilizzando tecnologie moderne e best practice di sviluppo:

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Passport.js
- **Frontend**: React, React Router, React Bootstrap, Axios, Context API
- **Storage**: Cloudinary per le immagini

La struttura dell'applicazione segue il pattern MVC, con una chiara separazione tra backend e frontend, e un'organizzazione modulare del codice che facilita la manutenzione e l'estensione.

### Possibili miglioramenti

Nonostante EpiBlog sia già un'applicazione completa e funzionale, ci sono diversi miglioramenti che potrebbero essere implementati:

1. **Funzionalità aggiuntive**:
   - Sistema di like/reazioni per i post
   - Condivisione dei post sui social media
   - Ricerca avanzata dei contenuti
   - Sistema di tag per i post
   - Notifiche per nuovi commenti o interazioni

2. **Miglioramenti tecnici**:
   - Implementazione di test automatizzati
   - Ottimizzazione delle performance
   - Implementazione di un sistema di caching
   - Miglioramento dell'accessibilità
   - Supporto per PWA (Progressive Web App)

3. **Sicurezza**:
   - Implementazione di rate limiting per prevenire attacchi di forza bruta
   - Miglioramento della validazione dei dati
   - Implementazione di CSRF protection
   - Aggiunta di autenticazione a due fattori

4. **Esperienza utente**:
   - Miglioramento del design responsive
   - Implementazione di temi chiari/scuri
   - Aggiunta di editor WYSIWYG per i post
   - Miglioramento dell'interfaccia di gestione dei post

### Risorse aggiuntive

Per approfondire le tecnologie utilizzate in EpiBlog, si consiglia di consultare le seguenti risorse:

- **Node.js e Express**:
  - [Documentazione ufficiale di Node.js](https://nodejs.org/en/docs/)
  - [Documentazione ufficiale di Express](https://expressjs.com/)

- **MongoDB e Mongoose**:
  - [Documentazione ufficiale di MongoDB](https://docs.mongodb.com/)
  - [Documentazione ufficiale di Mongoose](https://mongoosejs.com/docs/)

- **React e React Router**:
  - [Documentazione ufficiale di React](https://reactjs.org/docs/getting-started.html)
  - [Documentazione ufficiale di React Router](https://reactrouter.com/web/guides/quick-start)

- **Autenticazione e sicurezza**:
  - [Documentazione ufficiale di JWT](https://jwt.io/introduction)
  - [Documentazione ufficiale di Passport.js](http://www.passportjs.org/docs/)
  - [OWASP Top Ten](https://owasp.org/www-project-top-ten/)

- **Cloudinary**:
  - [Documentazione ufficiale di Cloudinary](https://cloudinary.com/documentation)

Queste risorse possono essere utili sia per comprendere meglio le tecnologie utilizzate in EpiBlog, sia per implementare i miglioramenti suggeriti.
