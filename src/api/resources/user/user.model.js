import mongoose from 'mongoose';

const { Schema } = mongoose;

export const ADMIN_ROLE = 1;
export const USER_ROLE = 2;

const userSchema = new Schema({
    local: { email: String, password: String },
    nombre: { type: String, required: false },
    imagen: { type: String, required: false },
    role: { default: USER_ROLE, required: true, type: Number },
    google: { email: String, id: String, displayName: String, token: String },
    twitter: { email: String, id: String, displayName: String, token: String },
    albums: [{ type: Schema.Types.ObjectId, ref: 'Album', required: false }]
        // facebook: { email: String, id: String, displayName: String, token: String }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);