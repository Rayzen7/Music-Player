import mongoose from "mongoose";

const ConnectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://nugrahasetio6:6RfU6wwTHGv4JZVO@rayzen7.86upg.mongodb.net/?retryWrites=true&w=majority&appName=Rayzen7");
        console.log("Database Connected");
    } catch (error) {
        console.error(error);
    }
}

export default ConnectDB