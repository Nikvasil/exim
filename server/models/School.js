const mongoose = require('mongoose');


const schoolSchema = new mongoose.Schema({
    X: {type: Number, required: true},
    Y: {type: Number, required: true},
    OBJECTID: {type: Number, required: true},
    ID: {type: Number, required: true},
    TYP: {type: Number},
    ART: {type: String},
    STANDORTTYP: {type: Number},
    BEZEICHNUNG: {type: String, required: true},
    KURZBEZEICHNUNG: {type: String},
    STRASSE: {type: String},
    PLZ: {type: Number},
    ORT: {type: String},
    TELEFON: {type: String},
    FAX: {type: String},
    EMAIL: {type: String},
    PROFILE: {type: String},
    WWW: {type: String},
    TRAEGER: {type: String},
    TRAEGERTYP: {type: Number},
    BEZUGNR: {type: String},
    GEBIETSARTNUMMER: {type: Number},
    SNUMMER: {type: Number},
    NUMMER: {type: Number},
    GlobalID: {type: String},
    CreationDate: {type: Date},
    Creator: {type: String},
    EditDate: {type: Date},
    Editor: {type: String}
});


const School = mongoose.model('School', schoolSchema);


module.exports = School;