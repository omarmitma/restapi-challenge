import {Schema, model} from 'mongoose';

const schema = new Schema({
    name: String,
    cantidad: Number,
    precio:Number,
    categoria:String,
    imagePath:String
});

export default model('Product',schema);