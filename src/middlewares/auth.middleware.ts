import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { UsuarioInterface } from "../interfaces/usuario.interface";
import usuarioModel from "../models/usuario.model";

class AuthMiddleware{
    public async autorizarUsuarioByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        const token = req.query.token || req.headers['x-access-token'];

        if(!token){
            return res.status(401).send({message: 'Acesso restrito!'});
        }

        try {
            const usuarioToken = jwt.verify(token, 'SECRET') as unknown as UsuarioInterface;
    
            const usuario = await usuarioModel.findById(usuarioToken._id);
    
            if(!usuario){
                return res.status(400).send({message:'usuário não existe no banco de dados!'});
            }

            req.usuario = usuario;
            
            return next();
            
        }catch(error){
            return res.status(401).send({message: 'Token Inválido!'});
        }
        
    }

    public async autorizarUsuarioByParams(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        
        try {
        
            const usuario = await usuarioModel.findById(req.params.id);
    
            if(!usuario){
                return res.status(400).send({message:'usuário não existe no banco de dados!'});
            }

            req.usuarioChat = usuario;
            
            return next();
            
        }catch(error){
            return res.status(401).send({message: 'Usuário inválido!'});
        }
        
    }
}

export default new AuthMiddleware();