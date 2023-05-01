const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProgramSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true,
        default: "4 years"
    },
    // Created Automatically
    //CSFTY Example
    code: {
        type: String,
        default: function() {
            return (
                this.name
                .split(" ")
                .map(name => name[0])
                .join("").toUpperCase() +
                Math.floor(10 + Math.random() * 90) +
                Math.floor(10 + Math.random() * 90)
            );
        }
    },
    // For Forgin Key
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    // We will push the teachers that are incharge of the program
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        default: []
    }],
    studnets: [{
        type: Schema.Types.ObjectId,
        ref: "Studnet",
        default: []
    }],
    // We will push the subjects that are in the program is created
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: "Subject",
        default: []
    }]
}, {
    timestamps: true
});

const Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;