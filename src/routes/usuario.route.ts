import { Router } from "express";
import usuarioController from "../controllers/usuario.controller";
import authMiddleware from "../middlewares/auth.middleware";

const usuarioRouter = Router();

usuarioRouter.post('/cadastro', usuarioController.cadastrar);
usuarioRouter.post('/login', usuarioController.autenticar);

usuarioRouter.get(
    '/:id',
    authMiddleware.autorizarUsuarioByParams,
    authMiddleware.autorizarUsuarioByToken,
    usuarioController.getById
);

usuarioRouter.get(
    '/',
    authMiddleware.autorizarUsuarioByToken,
    usuarioController.listar
);


export default usuarioRouter;