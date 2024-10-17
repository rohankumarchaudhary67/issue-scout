import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URI}`
        );
        console.log(
            `MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
        );
    } catch (error: any) {
        console.log("MongoDB connection error: ", error);
        throw error;
    }
};

export default connectDB;