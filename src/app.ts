import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usuarioRouter from './routes/usuario.route';
import mensagemRoute from './routes/mensagem.route';


export class App{
    private express: express.Application;
    private porta = 9000;

    constructor(){
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
        this.listen();
    }

    public getApp(): express.Application{
        return this.express;
    }

    private middlewares(): void{
        this.express.use(express.json());
        this.express.use(cors());
    }

    private listen(): void {
        this.express.listen(this.porta, () => {
            console.log('Servidor iniciado na porta ' + this.porta);
        })
    }

    private database(): void {
        mongoose.connect('mongodb+srv://rafaelxulipa:210487@cluster0.tgwka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }

    private routes(): void{
        this.express.use('/usuarios', usuarioRouter);
        this.express.use('/mensagens', mensagemRoute);
    }
}