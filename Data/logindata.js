const mongoose = require('mongoose');
const DataSchema = new mongoose.Schema({
  
    email:{
        type:String
    },
    password:{
        type:Number
    }

})

const Data = mongoose.model("store",DataSchema);
module.exports = Data;