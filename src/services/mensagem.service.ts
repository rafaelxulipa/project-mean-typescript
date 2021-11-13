import { MensagemInterface } from "../interfaces/mensagem.interface";
import { MensagemUsuario, UsuarioInterface } from "../interfaces/usuario.interface";

class MensagemService {

    public getresultadoMensagemUsuario(mensagens: MensagemInterface[], usuario: UsuarioInterface): MensagemUsuario{

        return {
            _id: usuario._id,
            nome: usuario.nome,
            avatar: usuario.avatar,
            ultimaMensagem: mensagens[0]?.texto || null,
            dataUltimaMensagem: mensagens[0]?.createdAt || null,
        }
    }

    public retornaMensagensOrdenadas(usuariosMensagem: MensagemUsuario[]): MensagemUsuario[]{
        return usuariosMensagem.sort((a, b) => {
            return (a.dataUltimaMensagem ? 0 : 1) - (b.dataUltimaMensagem ? 0 : 1)
                || -(a.dataUltimaMensagem > b.dataUltimaMensagem)
                || +(a.dataUltimaMensagem < b.dataUltimaMensagem)
        });

    }

}

export default new MensagemService();