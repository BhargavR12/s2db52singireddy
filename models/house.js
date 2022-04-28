const mongoose = require("mongoose")
const houseSchema = mongoose.Schema({
    House_name: { 
        type: String,
        minLength: 3,
        maxLength: 20, 
        required: true,
        trim: true
    },
    Location: { 
        type: String, 
        required: true
    },
    House_number: { 
        type: Number, 
        min:[0, 'Must be at least 0, got {VALUE}'], 
        max:9999
    }
})
module.exports = mongoose.model("house",houseSchema)
