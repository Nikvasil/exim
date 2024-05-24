const mongoose = require('mongoose');


const socialTeenagerProjectSchema = new mongoose.Schema({
    X: { type: Number, required: true },
    Y: { type: Number, required: true },
    OBJECTID: { type: Number, required: true },
    ID: { type: Number, required: true },
    TRAEGER: { type: String, required: true },
    LEISTUNGEN: { type: String, required: true },
    STRASSE: { type: String },
    PLZ: { type: Number },
    ORT: { type: String },
    TELEFON: { type: String },
    FAX: { type: String }
});


const SocialTeenagerProject = mongoose.model('SocialTeenagerProject', socialTeenagerProjectSchema);


module.exports = SocialTeenagerProject;
