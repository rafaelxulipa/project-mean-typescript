import { Request, Response } from "express"
import mensagemModel from "../models/mensagem.model";

class MensagemController {
    public async enviar (req: Request, res: Response):Promise<Response>{

        const mensagem = await mensagemModel.create(
            {
                texto: req.body.texto,
                remetente: req.usuario._id,
                destinatario: req.usuarioChat._id,

            }
        );

        return res.json(mensagem);

    }

    public async listar(req: Request, res: Response): Promise<Response>{
        const idUsuarioLogado = req.usuario._id;
        const idUsuarioChat = req.usuarioChat._id;

       /* const mensagens = await mensagemModel.find({
            $or:[
                {$and: [{remetente: idUsuarioLogado}, {destinatario: idUsuarioChat}]},
                {$and: [{remetente: idUsuarioChat}, {destinatario: idUsuarioLogado}]},
            ]
        }).sort('createdAt');*/

        const mensagens = await mensagemModel.buscaChat(idUsuarioLogado, idUsuarioChat).sort('createdAt');

        const mensagensChat = mensagens.map(mensagem =>{
            return {
                texto: mensagem.texto,
                createdAt: mensagem.createdAt,
                isRemetente: mensagem.remetente == String(idUsuarioLogado)
            }
        });

        return res.json(mensagensChat);
    }

}

export default new MensagemController();