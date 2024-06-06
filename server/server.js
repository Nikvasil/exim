const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('node-cron');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const kindergartenRoutes = require('./routes/kindergartenRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const socialChildProjectRoutes = require('./routes/socialChildProjectRoutes');
const socialTeenagerProjectRoutes = require('./routes/socialTeenagerProjectRoutes');
const updateData = require('./scripts/updateData');


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
    .then(()=>(console.log("MongoDB connected ... ")))
    .catch(err=>console.log(err))


app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use('/api/users', userRoutes); // User routes
app.use('/api/kindergarten', kindergartenRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/social-child-projects', socialChildProjectRoutes);
app.use('/api/social-teenager-projects', socialTeenagerProjectRoutes);


cron.schedule('*/10 * * * *', () => {
    updateData();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

