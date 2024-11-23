const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
const port = 5000
const app = express()
// var cors = require('cors')

// app.use(cors())

const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:3000', 'https://inotebook-host.vercel.app'], // Localhost for development, Vercel domain for production
    credentials: true, // Allow credentials (cookies, headers, etc.)
};

app.use(cors(corsOptions)); // Apply the CORS configuration

app.use(express.json())
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/', (req, res) => { 
  res.send('hello aman hope you are consistent until you get internship ')
})

app.listen(port, () => {
  console.log(`Inotebook Backend listening on port http://localhost:${port}`)
})