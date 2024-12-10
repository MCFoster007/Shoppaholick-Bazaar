import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
// import schema from Book.js
import { itemSchema } from './Item.js';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    // set saveditems to be an array of data that adheres to the itemschema
    savedItems: [itemSchema],
}, 
// set this to use virtual below
{
    toJSON: {
        virtuals: true,
    },
});
// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.virtual('itemCount').get(function () {
    return this.savedItems.length;
});
const User = model('User', userSchema);
export default User;
