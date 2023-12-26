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

}
