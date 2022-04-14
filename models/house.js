const mongoose = require("mongoose")
const houseSchema = mongoose.Schema({
House_name: String,
Location: String,
House_number: String
})
module.exports = mongoose.model("house",houseSchema)