const mongoose = require('mongoose');

const { Schema } = mongoose;

const yearGroupModel = new Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    academicYear: {
        type: Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true
    }
}, { timestamps: true });

const YearGroup = mongoose.model('YearGroup', yearGroupModel);

module.exports = YearGroup;