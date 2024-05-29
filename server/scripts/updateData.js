const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');


const Kindergarten = require('../models/Kindergarten');
const School = require('../models/School');
const SocialChildProject = require('../models/SocialChildProject');
const SocialTeenagerProject = require('../models/SocialTeenagerProject');


dotenv.config();


mongoose.connect(process.env.MONGO_URI)
    .then(()=>(console.log("MongoDB connected ... ")))
    .catch(err=>console.log(err))


const updateData = async () => {
    try {
        // Update Kindergartens
        const kindergartensPath = path.join(__dirname, '..', 'data', 'kindertageseinrichtungen.json');
        const kindergartensData = JSON.parse(fs.readFileSync(kindergartensPath, 'utf-8'));
        await Kindergarten.deleteMany();
        await Kindergarten.insertMany(kindergartensData);
        console.log('Kindergartens data updated successfully');

        // Update Schools
        const schoolsPath = path.join(__dirname, '..', 'data', 'schulen.json');
        const schoolsData = JSON.parse(fs.readFileSync(schoolsPath, 'utf-8'));
        await School.deleteMany();
        await School.insertMany(schoolsData);
        console.log('Schools data updated successfully');

        // Update Social Child Projects
        const socialChildProjectsPath = path.join(__dirname, '..', 'data', 'schulsozialarbeit.json');
        const socialChildProjectsData = JSON.parse(fs.readFileSync(socialChildProjectsPath, 'utf-8'));
        await SocialChildProject.deleteMany();
        await SocialChildProject.insertMany(socialChildProjectsData);
        console.log('Social Child Projects data updated successfully');

        // Update Social Teenager Projects
        const socialTeenagerProjectsPath = path.join(__dirname, '..', 'data', 'jugendberufshilfen.json');
        const socialTeenagerProjectsData = JSON.parse(fs.readFileSync(socialTeenagerProjectsPath, 'utf-8'));
        await SocialTeenagerProject.deleteMany();
        await SocialTeenagerProject.insertMany(socialTeenagerProjectsData);
        console.log('Social Teenager Projects data updated successfully');

    } catch (error) {
        console.error('Error updating data:', error);
    }
};


cron.schedule('*/10 * * * *', () => {
    console.log('Running the update data script...');
    updateData();
});


