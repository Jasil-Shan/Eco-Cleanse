import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
    {
      user :  {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Users' ,
        required : true
      },
      worker :  {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'workers' ,
      },
      driver :  {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'drivers' ,
      },
      order_id :{
        type: String,
      },
      garbage:{    
        eWaste: {
          type: String,
          required: true,
        },
        foodWaste: {
          type: String,
          required: true,
        },
        plasticWaste: {
          type: String,
          required: true,
        },
        others: {
          type: String,
          required: true,
      }},
      paymentMethod: {
        type: String,
        required:true
      },
      totalAmount:{
        type:Number,
        required:true
      },
      assigned:{
        type:Boolean,
        default:false
      },
      status:{
        type:String,
        default:"Pending"
      },
      garbageCollected:{
        type:Object,
      } 
    }, 
    { timestamps: true }
  );

  const BookingModel = mongoose.model("bookings", bookingSchema)

export default BookingModel
