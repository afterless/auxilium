const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema for entity
const EntitySchema = new Schema({

});

// Create model for Entity
const Entity = mongoose.model('entity', EntitySchema);

module.exports = Todo;
