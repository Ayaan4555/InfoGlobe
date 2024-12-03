const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const axios = require("axios");
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/authDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// User model
const User = mongoose.model('User', new mongoose.Schema({
  name:{type:String, required:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}));

// Register route


app.post('/auth/register', async (req, res) => {
  const { name , email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not registered' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign({ name:user.name , email:user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }

  
  
  


});

// CORS configuration
app.use(cors({
  origin: '*', // Be cautious with this in production
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helper function for API requests
async function makeApiRequest(url) {
  try {
    const response = await axios.get(url);
    return {
      status: 200,
      success: true,
      message: "Successfully fetched the data",
      data: response.data,
    };
  } catch (error) {
    console.error("API request error:", error.response ? error.response.data : error);
    return {
      status: 500,
      success: false,
      message: "Failed to fetch data from the API",
      error: error.response ? error.response.data : error.message,
    };
  }
}

app.get("/all-news", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let q = req.query.q || 'world'; // Default search query if none provided

  const d = new Date();
  const date=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()-1}`
  

  let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&from=${date}&to=${date}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

app.get("/top-headlines", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let category = req.query.category || "general";

  let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

// app.get("/country/:iso", async (req, res) => {
//   let pageSize = parseInt(req.query.pageSize) || 80;
//   let page = parseInt(req.query.page) || 1;
//   const country = req.params.iso;

//   let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=${pageSize}`;
//   const result = await makeApiRequest(url);
//   res.status(result.status).json(result);
// });

// app.get("/sources", async (req, res) => {
//   let pageSize = parseInt(req.query.pageSize) || 80;
//   let page = parseInt(req.query.page) || 1;
//   let country = req.query.country || "us";

//   let url = `https://newsapi.org/v2/sources?country=${country}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
//   const result = await makeApiRequest(url);
//   res.status(result.status).json(result);
// });


// app.get('/country', async (req , res) => {
//   let pageSize = parseInt(req.query.pageSize) || 80;
//   let page = parseInt(req.query.page) || 1;
//   let q = req.query.q || 'in';
  
// const d = new Date();
// const date=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()-1}`



//   let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&from=${date}&to=${date}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`
//   const result = await makeApiRequest(url);
//   res.status(result.status).json(result);
// })

// Import the middleware and other required modules
const authenticateToken = require('./middleware/authenticateToken');

// Country news route with authenticateToken middleware
app.get("/country", authenticateToken, async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let q = req.query.q || "in";

  const d = new Date();
  const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate() - 1}`;

  // Construct URL to fetch news data
  let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&from=${date}&to=${date}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);

  // Return the fetched data
  res.status(result.status).json(result);
});


app.get("/search", async (req,res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let searchTerm = req.query.q || "bitcoin";

  


  let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
   res.status(result.status).json(result);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});