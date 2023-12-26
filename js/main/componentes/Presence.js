export default class Presence {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.presencas = [];
        this.registroPesquisa = '';
        this.dataPesquisa = '';
    }

    async buscarPresencas() {
        this.presencas = await this.buscarPresencasPorRegistro(this.registroPesquisa, this.dataPesquisa);
        this.renderPresencas();
    }

    handleRegistroPesquisaChange(event) {
        this.registroPesquisa = event.target.value;
    }

    handleDataPesquisaChange(event) {
        this.dataPesquisa = event.target.value;
    }

    async handleAtualizarPresenca(presenca) {
        await this.atualizarPresenca(presenca.id, presenca.novaDataHora);
        await this.buscarPresencas();
    }

    renderPresencas() {
        const listContainer = document.getElementById('presencas-list');
        listContainer.innerHTML = ''; 

        this.presencas.forEach(presenca => {
            const listItem = document.createElement('li');
            listItem.textContent = `${presenca.nome} (${presenca.registro}) - `;

            if (presenca.editavel) {
                const inputNovaDataHora = document.createElement('input');
                inputNovaDataHora.type = 'datetime-local';
                inputNovaDataHora.value = presenca.novaDataHora;
                inputNovaDataHora.onchange = e => presenca.novaDataHora = e.target.value;

                const botaoSalvar = document.createElement('button');
                botaoSalvar.className = 'btn-salvar';
                botaoSalvar.textContent = 'Salvar';
                botaoSalvar.onclick = () => this.handleAtualizarPresenca(presenca);

                listItem.appendChild(inputNovaDataHora);
                listItem.appendChild(botaoSalvar);
            } else {
                const spanDataHora = document.createElement('span');
                spanDataHora.textContent = presenca.data_hora;

                const botaoEditar = document.createElement('button');
                botaoEditar.className = 'btn-editar';
                botaoEditar.textContent = 'Editar';
                botaoEditar.onclick = () => {
                    presenca.editavel = true;
                    this.renderPresencas();
                };

                listItem.appendChild(spanDataHora);
                listItem.appendChild(botaoEditar);
            }

            listContainer.appendChild(listItem);
        });
    }

    async registrarPresenca (idUsuario, tipo){
        try {
            const response = await fetch(`${this.apiUrl}Presenca.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_usuario: idUsuario, tipo: tipo }),
            });
    
            const data = await response.json();
            if (data.status) {
                alert('Presença registrada');
                return data.status
            } 
        } catch (error) {
            console.error('Erro ao registrar presença:', error);
        }
    };
    async buscarPresencasPorRegistro (registro, dataregistro){
        try {
            let url = `${this.apiUrl}Presenca.php`;
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
            const response = await fetch(`${this.apiUrl}Presenca.php`, {
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
    render() {
        const container = document.createElement('div');
        container.className = 'camera-container container';

        const title = document.createElement('h1');
        title.textContent = 'Presenças Registradas';
        container.appendChild(title);

        const inputRegistro = document.createElement('input');
        inputRegistro.type = 'text';
        inputRegistro.placeholder = 'Digite o número do registro';
        inputRegistro.onchange = (e) => this.handleRegistroPesquisaChange(e);
        container.appendChild(inputRegistro);

        const inputData = document.createElement('input');
        inputData.type = 'date';
        inputData.placeholder = 'Digite a data (YYYY-MM-DD)';
        inputData.onchange = (e) => this.handleDataPesquisaChange(e);
        container.appendChild(inputData);

        const botaoBuscar = document.createElement('button');
        botaoBuscar.textContent = 'Buscar';
        botaoBuscar.onclick = () => this.buscarPresencas();
        container.appendChild(botaoBuscar);

        const presencasList = document.createElement('ul');
        presencasList.id = 'presencas-list';
        container.appendChild(presencasList);

        return container;
    }
}
