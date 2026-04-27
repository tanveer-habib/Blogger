import connectDB from "./db";
import Email from "@/models/Email";

export const fetchEmail = async () => {
    try {
        await connectDB();
        let emails = await Email.find().lean();
        return emails.map((email) => ({
            ...email, _id: email._id.toString()
        }));
    } catch (error) {
        console.log(error.message)
    }
};