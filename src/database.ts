import { connect } from 'mongoose';
import config from './config'

export async function startConnection(){
    await connect(config.mongodbURL || "");
    console.log("Database is connected")
}