export default class User {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchUsers() {
        try {
            const response = await fetch(`${this.apiUrl}Usuarios.php`);
            const data = await response.json();
            console.log('Usuários recuperados:', data.usuarios);
            return data.usuarios;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        }
    }
    async cadastrarUsuario(usuario) {
        try {
            const usuarioComAcao = {
                ...usuario,
                acao: 'cadastrar'
            };
            const response = await fetch(`${this.apiUrl}Usuarios.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioComAcao),
            });
    
            const data = await response.json();
            if(data.status){
                console.log('Usuário cadastrado:', data);
                return data.status
            }else{
                alert(data.message)
            }
           
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };
    async buscarFaces() {
        try {
            const response = await fetch(`${this.apiUrl}Usuarios.php`);
            const data = await response.json();
            console.log('Usuários recuperados:', data.usuarios);
            return data.usuarios;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        }
    };

    async buscarUsuariosRelatorio(){
        try {
            const response = await fetch(`${this.apiUrl}Usuarios.php?relatorio=1`);
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
            const response = await fetch(`${this.apiUrl}Usuarios.php?id=${id}`, {
                method: 'DELETE',
            });
    
            const data = await response.json();
            console.log('Usuário excluído:', data);
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
    
        }
    };

    async render() {
        const users = await this.buscarUsuariosRelatorio();
        const container = document.createElement('div');
        container.className = 'container';

        const title = document.createElement('h1');
        title.textContent = 'Usuários Cadastrados';
        container.appendChild(title);

        const userList = document.createElement('ul');
        users.forEach(usuario => {
            const userItem = document.createElement('li');
            userItem.textContent = `${usuario.nome} (Registro: ${usuario.registro}) `;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => this.confirmarExclusao(usuario);
            userItem.appendChild(deleteButton);

            userList.appendChild(userItem);
        });
        container.appendChild(userList);

        return container;
    }

    async confirmarExclusao(usuario) {
        if (confirm(`Tem certeza que deseja excluir o usuário ${usuario.nome}?`)) {
            await this.excluirUsuario(usuario.id);
            document.getElementById('main-container').innerHTML = '';
            document.getElementById('main-container').appendChild(await this.render());
        }
    }
}
