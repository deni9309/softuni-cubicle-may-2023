const { Schema, model, MongooseError } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String },
    password: {
        type: String,
        // validate: {
        //     validator: function (value) {
        //         return this.repeatPassword === value;
        //     },
        //     message: `Passwords do not match!`
        // }
    },
});

//TODO: check whether user already exists

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new MongooseError('Passwords does not match!');
        }
    });

// executes before save -> db saves the passwordHash (the raw password is overwritten by passwordHash)
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = model('User', userSchema);

module.exports = User;
