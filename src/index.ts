import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/dbConn';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/mydatabase'; 

// Middleware
app.use(express.json());

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await connectDB(DB_URL); 
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); 
    }
};

connectToDatabase(); 

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
