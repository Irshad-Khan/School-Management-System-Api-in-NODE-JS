const mongoose = require('mongoose');

const { Schema } = mongoose;

const acadmicYearModel = new Schema({
    name: {
        type: String,
        required: true
    },
    fromYear: {
        type: String,
        required: true
    },
    toYear: {
        type: String,
        required: true
    },
    isCurrent: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: "Studnet"
    }],
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    }]
}, { timestamps: true });

const AcademicYear = mongoose.model('AcademicYear', acadmicYearModel);

module.exports = AcademicYear;