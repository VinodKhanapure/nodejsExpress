var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProdSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  cost: {
    type: Number,
    required: true,
  },

  
  creator:{
    type:mongoose.Schema.Types.ObjectId,ref:"User",required:true
  }
  
});

var Prod = mongoose.model("Prod", ProdSchema);

module.exports = Prod;
