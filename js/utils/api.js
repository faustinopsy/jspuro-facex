
const urlBase= "https://webcrud.faustinopsy.com/app/";
export const  cadastrarUsuario = async (usuario) => {
    try {
        const usuarioComAcao = {
            ...usuario,
            acao: 'cadastrar'
        };
        const response = await fetch(`${urlBase}Usuarios.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioComAcao),
        });

        const data = await response.json();
        if(data.status){
            console.log('Usuário cadastrado:', data);
        }
       
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    }
};

export const registrarPresenca = async (idUsuario, tipo) => {
    try {
        const response = await fetch(`${urlBase}Presenca.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario: idUsuario, tipo: tipo }),
        });

        const data = await response.json();
        if (data.status) {
            console.log('Presença registrada:', data);
        } else {
            console.log('Erro ao registrar presença:', data.message);
        }
    } catch (error) {
        console.error('Erro ao registrar presença:', error);
    }
};
export const buscarPresencasPorRegistro = async (registro, dataregistro) => {
    try {
        let url = `${urlBase}Presenca.php`;
        const params = new URLSearchParams();
        if (registro) params.append('registro', registro);
        if (dataregistro) params.append('data', dataregistro);
        url += '?' + params.toString();

        const response = await fetch(url);
        const data = await response.json();
        console.log('Presenças recuperadas:', data.presencas);
        return data.presencas;
    } catch (error) {
        console.error('Erro ao buscar presenças:', error);
        return [];
    }
};

export const atualizarPresenca = async (id, novaDataHora) => {
    try {
        const response = await fetch(`${urlBase}Presenca.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, novaDataHora }),
        });

        const data = await response.json();
        if (data.status) {
            console.log('Presença atualizada:', data);
        } else {
            console.log('Erro ao atualizar presença:', data.error);
        }
    } catch (error) {
        console.error('Erro ao atualizar presença:', error);
    }
};

export const  buscarUsuarios = async () => {
    try {
        const response = await fetch(`${urlBase}Usuarios.php`);
        const data = await response.json();
        console.log('Usuários recuperados:', data.usuarios);
        return data.usuarios;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return [];
    }
};
export const  buscarUsuariosRelatorio = async () => {
    try {
        const response = await fetch(`${urlBase}Usuarios.php?relatorio=1`);
        const data = await response.json();
        console.log('Usuários recuperados:', data.usuarios);
        return data.usuarios;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return [];
    }
};
export const  excluirUsuario = async (id) => {
    try {
        const response = await fetch(`${urlBase}Usuarios.php?id=${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        console.log('Usuário excluído:', data);
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);

    }
};
export const registrarUsuario = async (usuario) => {
    try {
        const response = await fetch(`${urlBase}Usuarios.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...usuario, acao: 'registrar' }),
        });

        const data = await response.json();
        if(data.status){
            console.log('Registrado com sucesso');
            const sucesso = {
                ...data,
                message: 'Cadastrado com sucesso'
            };
            return sucesso
        }else{
            const sucesso = {
                ...data,
                message: 'Já existe registro para o usuário'
            };
            return sucesso
        }
        
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return error
    }
};
export const fazerLogin = async (credenciais) => {
    try {
        const response = await fetch(`${urlBase}Usuarios.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...credenciais, acao: 'login' }),
        });

        const data = await response.json();
        if(data.status){
            console.log('Logado com sucesso');
            const sucesso = {
                ...data,
                message: 'Logado com sucesso'
            };
            return sucesso
        }else{
            const sucesso = {
                ...data,
                message: 'Não é possivel logar'
            };
            return sucesso
        }
       
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return error
    }
};
