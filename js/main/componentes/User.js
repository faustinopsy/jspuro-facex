export default class User {
    constructor(apiUrl, apiStrategy) {
        this.apiUrl = apiUrl;
        this.apiStrategy = apiStrategy;
    }

    async fetchUsers() {
        return await this.apiStrategy.fetchUsers();
      }
    
      async cadastrarUsuario(usuario) {
        return await this.apiStrategy.cadastrarUsuario(usuario);
      }
    async buscarFaces() {
        return await this.apiStrategy.buscarFaces();
    };

    async buscarUsuariosRelatorio(){
        return await this.apiStrategy.buscarUsuariosRelatorio();
    };
    async excluirUsuario (registro){
        return await this.apiStrategy.excluirUsuario(registro);
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
            await this.excluirUsuario(usuario.registro);
            document.getElementById('main-container').innerHTML = '';
            document.getElementById('main-container').appendChild(await this.render());
        }
    }
}
