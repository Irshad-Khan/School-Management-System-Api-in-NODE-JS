const mongoose = require('mongoose');

const { Schema } = mongoose;

const examModel = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    program: {
        type: Schema.Types.ObjectId,
        ref: "Program",
        required: true
    },
    passMark: {
        type: Number,
        required: true,
        default: 50
    },
    totalMark: {
        type: Number,
        required: true,
        default: 100
    },
    academicTerm: {
        type: Schema.Types.ObjectId,
        ref: "AcademicTerm",
        required: true
    },
    academicYear: {
        type: Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true
    },
    duration: {
        type: String,
        required: true,
        default: "30 minuts"
    },
    examDate: {
        type: Date,
        required: true
    },
    examTime: {
        type: Date,
        required: true
    },
    examType: {
        type: String,
        required: true,
        default: "Quize"
    },

    examStatus: {
        type: String,
        required: true,
        enum: ['pending', 'live'],
        default: "pending"
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "Question"
    }],
    classLevel: {
        type: Schema.Types.ObjectId,
        ref: "ClassLevel",
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },

}, { timestamps: true });

const Exam = mongoose.model('Exam', examModel);

module.exports = Exam;