import { model, Schema } from "mongoose";

const collection = "users";

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'USER', enum: ['USER', 'ADMIN'] },
    verifyUser: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
});

const User = model(collection, schema);
export default User;
