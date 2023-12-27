class NodeApiStrategy {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchUsers() {
        const response = await fetch(`${this.apiUrl}/users`);
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

    async buscarFaces() {
        const response = await fetch(`${this.apiUrl}/users/faces`);
        const data = await response.json();
        return data.usuarios;
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

    async excluirUsuario(id) {
        const response = await fetch(`${this.apiUrl}/users/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    }
}
