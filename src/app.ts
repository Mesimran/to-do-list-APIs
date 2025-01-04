import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './API/routes/taskRoutes';
import connectDB from './Config/dbConn';
import { variables } from './Config/envLoader';

const app: Application = express();
//middleware 
app.use(cors());
app.use(bodyParser.json());

//database connection
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
