import dotenv from 'dotenv';

dotenv.config();

interface Variables {
    DB_URL: string;
    PORT: number;
    BASE_URL: string;
}

export const variables: Variables = {
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/mydatabase',  
    PORT: parseInt(process.env.PORT || '3000', 10),
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000', 
};
