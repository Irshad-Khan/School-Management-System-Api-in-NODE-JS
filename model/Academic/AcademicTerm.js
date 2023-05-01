const mongoose = require('mongoose');

const { Schema } = mongoose;

const academicTermModel = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requried: true
    },
    duration: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }
}, { timestamps: true });

const AcademicTerm = mongoose.model('AcademicTerm', academicTermModel);

module.exports = AcademicTerm;