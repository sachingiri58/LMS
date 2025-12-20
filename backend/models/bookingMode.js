import mongoose from "mongoose";
const bookingModeSchema = new mongoose.Schema({
  bookingId:{
    type:String,
  required : true,
unique:true,
index:true },
clearUserId:{
  type:String,
  required:true,
  index:true
},
studentName:{
  type:String,
  default:'unknown'
},
course:{
  type:String,
  required:true
  
},
clearName:{
  type:String,
  required:true
  
},
teacherName:{
  type:String,
  required:true
  
},
price:{
  type:Number,
  required:true
},

  paymentMethod: { type: String, enum: ["Online"], default: "Online" },

    // normalize to TitleCase if that's what your code expects
    paymentStatus: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" },
    paymentIntentId: { type: String, default: null },
    sessionId: { type: String, default: null },

    // make orderStatus values consistent + include "Confirmed"
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed", "Failed"],
      default: "Pending",
    },

    notes: { type: String, default: "" },
},{
  timestamps:true
});
const Booking =mongoose.models.Booking || mongoose.model('Booking',bookingModeSchema);
export default Booking;