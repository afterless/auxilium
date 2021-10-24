const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema for entity
const EntitySchema = new Schema({
    name: {
        type: String,
        required: ['true', 'restaurnt name field is required'],
    },
    hours: {
        type: Schema.Types.Mixed,
        required: ['true', 'hours is required']
    },
    menu: {
        type: Schema.Types.Mixed,
        required: ['true', 'menu is required']
    },
    num: {
        type: String,
        match: /^[\+][1][0-9]{10}$/, 
        required: ['true', 'phone number is required']
    },
    prompt: {
        type: [Schema.Types.Mixed],    
    }
});

// Create model for Entity
const Entity = mongoose.model('entity', EntitySchema);

module.exports = Entity;
