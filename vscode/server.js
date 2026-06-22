import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import adminRoutes from './Routes/admin.routes.js';
import reporterRoutes from './Routes/reporter.routes.js';
import userRoutes from './Routes/user.routes.js';
import connectDB from './Config/db.js';
import superadminRoutes from './Routes/superAdmin.routes.js'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const PORT = process.env.PORT || 8004;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
 

connectDB();


app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public legacy/local uploads. Object-storage URLs continue to be served directly.
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    dotfiles: 'deny',
    fallthrough: true,
    maxAge: '7d'
}));

app.use('/api/v1/superadmin', superadminRoutes); // NEW ROUTE FOR SUPERADMIN
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/reporter', reporterRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
