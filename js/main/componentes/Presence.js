export default class Presence {
    constructor(apiUrl,apiStrategy) {
        this.apiStrategy = apiStrategy;
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
        console.log(this.presencas)
        this.presencas.presencas.forEach(presenca => {
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
        return await this.apiStrategy.registrarPresenca (idUsuario, tipo);
    };
    async buscarPresencasPorRegistro (registro, dataregistro){
        return await this.apiStrategy.buscarPresencasPorRegistro (registro, dataregistro);
    };
    
    async atualizarPresenca(id, novaDataHora){
        return await this.apiStrategy.atualizarPresenca(id, novaDataHora);
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
