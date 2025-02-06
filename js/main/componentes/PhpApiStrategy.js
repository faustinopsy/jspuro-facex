export default class PhpApiStrategy {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
    }
  
    async fetchUsers() {
      const response = await fetch(`${this.apiUrl}UserRouter.php`);
      const data = await response.json();
      return data.usuarios;
    }
  
    async cadastrarUsuario(usuario) {
      const response = await fetch(`${this.apiUrl}UserRouter.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...usuario, acao: 'cadastrar' }),
      });
      const data = await response.json();
      return data.status;
    }
    async buscarFaces() {
        try {
            const response = await fetch(`${this.apiUrl}UserRouter.php?relatorio`);
            const data = await response.json();
            console.log('Usuários recuperados:', data.usuarios);
            return data.usuarios;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        }
    };
    async registrarPresenca (idUsuario, tipo){
        try {
            const response = await fetch(`${this.apiUrl}PresencaRouter.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_usuario: idUsuario, tipo: tipo }),
            });
    
            const data = await response.json();
            console.log(data)
            if (data.status) {
                alert('Presença registrada');
                return data.status
            } 
            alert(data.message);
        } catch (error) {
            console.error('Erro ao registrar presença:', error);
        }
    };
    async buscarPresencasPorRegistro (registro, dataregistro){
        try {
            let url = `${this.apiUrl}PresencaRouter.php`;
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
    
    async atualizarPresenca(id, novaDataHora){
        try {
            const response = await fetch(`${this.apiUrl}PresencaRouter.php`, {
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
    async buscarUsuariosRelatorio(){
        try {
            const response = await fetch(`${this.apiUrl}UserRouter.php?relatorio=1`);
            const data = await response.json();
            console.log('Usuários recuperados:', data.usuarios);
            return data.usuarios;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        }
    };
    async excluirUsuario (id){
        try {
            const response = await fetch(`${this.apiUrl}UserRouter.php?id=${id}`, {
                method: 'DELETE',
            });
    
            const data = await response.json();
            console.log('Usuário excluído:', data);
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
    
        }
    };
    async registrarUsuario(usuario){
        try {
            const response = await fetch(`${this.apiUrl}UserRouter.php`, {
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
            const response = await fetch(`${this.apiUrl}UserRouter.php`, {
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
               return true;
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