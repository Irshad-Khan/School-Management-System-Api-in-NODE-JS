const bcrypetjs = require('bcryptjs')
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin"
    }
}, {
    timestamps: true
});

/**
 * Mogoose use two type of middleware pre and post.
 * pre middleware is invoke before data adding in database
 * here we make password hash before adding in db. if condation check that
 * if user updating data and doesnt change password so it not rehash it otherwise 
 * below code run and password hash
 */
adminSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypetjs.genSalt()
    this.password = await bcrypetjs.hash(this.password, salt);
    next();
});

adminSchema.methods.verifyPassword = async function(enteredPassword) {
    return bcrypetjs.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;