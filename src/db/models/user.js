const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value) {
            const prohibitedValues = ['password'];

            if (
                prohibitedValues.some(
                    (pV) => pV.toLowerCase() === value.toLowerCase()
                )
            ) {
                throw new Error(`Password can't include prohibited values`);
            }
        },
    },
});

module.exports = {
    User,
};
