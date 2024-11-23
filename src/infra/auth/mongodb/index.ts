import mongoose from "mongoose"
import { enviroment } from "../../enviroment"


export const dbConnection = async () => {
    try {
        await mongoose.connect(enviroment.mongoUrl).then(() => {
            console.log("Connected to mongodb");
        })

    } catch (error) {
        console.log("Error in db", error)
    }
}