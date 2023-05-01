const mongoose = require('mongoose');

const { Schema } = mongoose;

const examResultModel = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    exam: {
        type: Schema.Types.ObjectId,
        ref: "Exam",
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    passMark: {
        type: Number,
        required: true,
        default: 50
    },
    status: {
        type: String,
        enum: ['failed', 'passed'],
        default: 'failed'
    },
    remarks: {
        type: String,
        enum: ['excellent', 'good', 'poor'],
        default: 'poor'
    },
    position: {
        type: Number,
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    classLevel: {
        type: Schema.Types.ObjectId,
        ref: "ClassLevel",
        required: true
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
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const ExamResult = mongoose.model('ExamResult', examResultModel);

module.exports = ExamResult;