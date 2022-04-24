import { connect } from 'mongoose';

export async function startConnection(){
    await connect('mongodb://localhost/challenge');
    console.log("Database is connected")
}