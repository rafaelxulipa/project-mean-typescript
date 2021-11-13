import { Document, model, Schema } from "mongoose";
import { UsuarioInterface } from "../interfaces/usuario.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


interface UsuarioModel extends UsuarioInterface, Document {
    compararSenhas(senha: string): Promise<boolean>;
    gerarToken(): string;
}

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        require: true,

    },
    senha:{
        type: String,
        require: true,
    },
    avatar:{
        type: String,
        require: false,
    }
});

UsuarioSchema.pre('save', async function criptografarSenha(){
    this.senha = await bcrypt.hash(this.senha, 8);
});

UsuarioSchema.pre<UsuarioModel>('save', function geraravatar(){
    const randomId = Math.floor(Math.random() * (1000000))+1;
    this.avatar = `https://api.adorable.io/avatars/285/${randomId}.png`;
})

UsuarioSchema.methods.compararSenhas = function (senha: string): Promise<boolean>{
    return bcrypt.compare(senha, this.senha);
}

UsuarioSchema.methods.gerarToken = function(): string{
    const decodedToken = {
        _id: String(this._id),
        nome: this.nome,
        avatar: this.avatar
    }

    return jwt.sign(decodedToken, 'SECRET', {
        expiresIn: '1d'
    });
}

export default model<UsuarioModel>('Usuario', UsuarioSchema);
