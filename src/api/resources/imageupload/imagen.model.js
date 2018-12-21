import mongoose from 'mongoose';

const { Schema } = mongoose;

const albumSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    imagen: [{ type: String, required: false }],
    usuario: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
}, {
    timestamps: true
});

export default mongoose.model('Album', albumSchema);