export default class Presence {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async registerPresence(userId, type) {
        try {
            const response = await fetch(`${this.apiUrl}Presenca.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_usuario: userId, tipo: type }),
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
    }


}
