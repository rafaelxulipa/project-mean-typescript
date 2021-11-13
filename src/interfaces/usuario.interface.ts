export interface UsuarioInterface{
    _id: any | string;
    nome?: string;
    senha?: string;
    avatar?: string;
    
}

export interface MensagemUsuario extends UsuarioInterface{
     ultimaMensagem: string;
     dataUltimaMensagem: Date;
}