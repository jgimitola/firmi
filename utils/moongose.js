import {connect, connection} from 'mongoose';

async function dbConnect(){

    const db = await connect(process.env.MONGODB_URL);

    console.log(db.connections[0].readyState);

}

connection.on("connected", () => {
    console.log("Mongoose connected to db");
});

connection.on("error", (err) => {
    console.log(err.message);
});