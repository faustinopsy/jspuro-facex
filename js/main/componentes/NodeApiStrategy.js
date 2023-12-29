export default class NodeApiStrategy {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchUsers() {
        const response = await fetch(`${this.apiUrl}/users`);
        const data = await response.json();
        return data.usuarios;
    }
    async buscarFaces() {
        const response = await fetch(`${this.apiUrl}/users/faces`);
        const data = await response.json();
        return data.usuarios;
    }
    async cadastrarUsuario(usuario) {
        const response = await fetch(`${this.apiUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });
        const data = await response.json();
        return data;
    }

    async registrarPresenca(idUsuario, tipo) {
        const response = await fetch(`${this.apiUrl}/presences`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario: idUsuario, tipo: tipo }),
        });
        const data = await response.json();
        return data;
    }

    async buscarPresencasPorRegistro(registro, dataregistro) {
        let url = `${this.apiUrl}/presences`;
        const params = new URLSearchParams();
        if (registro) params.append('registro', registro);
        if (dataregistro) params.append('data', dataregistro);
        url += '?' + params.toString();

        const response = await fetch(url);
        const data = await response.json();
        return data.presencas;
    }

    async atualizarPresenca(id, novaDataHora) {
        const response = await fetch(`${this.apiUrl}/presences/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ novaDataHora }),
        });
        const data = await response.json();
        return data;
    }

    async buscarUsuariosRelatorio() {
        const response = await fetch(`${this.apiUrl}/users/relatorio`);
        const data = await response.json();
        return data.usuarios;
    }

    async excluirUsuario(registro) {
        const response = await fetch(`${this.apiUrl}/users/${registro}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    }
    async registrarUsuario(usuario){
        try {
            const response = await fetch(`${this.apiUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...usuario, acao: 'registrar' }),
            });
    
            const data = await response.json();
            if(data.status){
                console.log('Registrado com sucesso');
                const mensagem = {
                    ...data,
                    message: 'Cadastrado com sucesso'
                };
                alert(mensagem.message) 
            }else{
                const mensagem = {
                    ...data,
                    message: 'Já existe registro para o usuário'
                };
                alert(mensagem.message) 
            }
            
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return error
        }
    };
    async fazerLogin(credenciais) {
        try {
            const response = await fetch(`${this.apiUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...credenciais, acao: 'login' }),
            });
    
            const data = await response.json();
            if(data.status){
                console.log('Logado com sucesso');
                const mensagem = {
                    ...data,
                    message: 'Logado com sucesso'
                };
                localStorage.setItem('isLoggedIn', 'true');
                alert(mensagem.message) ;
                this.navbar.update(true);
                this.onLoginSuccess();
            }else{
                const mensagem = {
                    ...data,
                    message: 'Não é possivel logar'
                };
                alert(mensagem.message) 
            }
           
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return error
        }
    };
}
