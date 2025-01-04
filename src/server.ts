import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import taskRoutes from './API/routes/taskRoutes';
import connectDB from './Config/dbConn';
import { variables } from './Config/envLoader';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//variables object
interface Variables {
    DB_URL: string;
    PORT: number;
    BASE_URL: string;
}

// Database connection
const connectToDatabase = async (): Promise<void> => {
    try {
        await connectDB(variables.DB_URL); 
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); 
    }
};

connectToDatabase();

// Routes
app.use('/api/tasks', taskRoutes);

// Start the server
app.listen(variables.PORT, () => {
    console.log(`Server is running on ${variables.BASE_URL}`);
});

export default app;
