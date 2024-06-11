const mongoose = require('mongoose');


const kindergartenSchema = new mongoose.Schema({
    X: { type: Number, required: true },
    Y: { type: Number, required: true },
    OBJECTID: { type: Number, required: true },
    ID: { type: Number, required: true },
    TRAEGER: { type: String },
    BEZEICHNUNG: { type: String, required: true },
    KURZBEZEICHNUNG: { type: String },
    STRASSE: { type: String },
    STRSCHL: { type: Number },
    HAUSBEZ: { type: String },
    PLZ: { type: Number },
    ORT: { type: String },
    HORT: { type: Number },
    KITA: { type: Number },
    URL: { type: String },
    TELEFON: { type: String },
    EMAIL: { type: String },
    BARRIEREFREI: { type: Number },
    INTEGRATIV: { type: Number }
});


const Kindergarten = mongoose.model('Kindergarten', kindergartenSchema);


module.exports = Kindergarten;