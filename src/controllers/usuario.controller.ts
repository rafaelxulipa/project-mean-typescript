import { Request, Response } from "express";
import usuarioModel from "../models/usuario.model";
import mensagemModel from "../models/mensagem.model";
import mensagemService from "../services/mensagem.service";


class UsuarioController{

    public async cadastrar (req: Request, res: Response): Promise<Response>{
        const usuario = await usuarioModel.create(req.body);
        const resposta ={
            message: 'Usuario cadastrado com sucesso!', 
            _id: usuario._id,
            nome: usuario.nome,
            /* senha: usuario.senha,
            avatar: usuario.avatar */
        }
        return res.json(resposta);
    }

    public async autenticar (req: Request, res: Response): Promise<Response>{
        const { nome, senha} = req.body;

        const usuario = await usuarioModel.findOne({ nome });

        if(!usuario){
            return res.status(400).send({message: 'Usuario não encontrado'});
        }

        const senhaValida = await usuario.compararSenhas(senha);
        if(!senhaValida){
            return res.status(400).send({message: 'Senha incorreta'});
        }

        return res.json({
            usuario,
            token: usuario.gerarToken()
        });
    }

    public getById(req: Request, res: Response): Response{

        return res.json(req.usuarioChat);

    }

    public async listar(req: Request, res: Response): Promise<Response>{
        const idUsuarioLogado = req.usuario._id;

        const usuarios = await usuarioModel.find({ _id: {$ne: idUsuarioLogado} });

        const usuariosMensagem = await Promise.all(usuarios.map(usuario => {
            return mensagemModel.buscaChat(idUsuarioLogado, usuario._id)
            .sort('-createdAt')
            .limit(1)
            .map(mensagens => mensagemService.getresultadoMensagemUsuario(mensagens, usuario));
        }));

        const mensagensOrdenadas = mensagemService.retornaMensagensOrdenadas(usuariosMensagem);
            
        return res.json(mensagensOrdenadas);
    }

}


export default new UsuarioController();