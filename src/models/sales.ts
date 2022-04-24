import {Schema, model} from 'mongoose';

const schema = new Schema({
    pago: Number,
    products: [
        {
          cant:Number,
          _id:String
        }
      ]
});


export default model('Sales',schema);