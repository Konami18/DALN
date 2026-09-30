import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://greatstack:13022004@cluster0.igpdgep.mongodb.net/daln';
    await mongoose.connect(mongoURI).then(() => console.log("DB Connected"));
}

