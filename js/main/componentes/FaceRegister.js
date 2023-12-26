import User from './User.js'; 
export default class FaceRegister {
    constructor(userApiUrl, faceapi) {
        // this.modelLoader = new ModelLoader();
        // this.loadModels();
        this.userApi = new User(userApiUrl);
        this.captureData = [];
        this.formData = { name: '', number: '' };
        this.totalCaptures = 3;
        this.videoElement = document.createElement('video');
        this.videoElement.autoplay = true;
        this.initializeCamera();
        this.capturesInfo = null;
    }

    async initializeCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
                this.videoElement.srcObject = stream;
            } catch (err) {
                console.error("Falha ao ativar a câmera:", err);
            }
        }
    }
    updateCapturesInfo() {
        if (this.capturesInfo) {
            this.capturesInfo.textContent = `Capturas: ${this.captureData.length} de ${this.totalCaptures}`;
        }
    }
    handleFormChange(event) {
        const { name, value } = event.target;
        this.formData[name] = value; 
    }

    async handleSave() {
        if (this.captureData.length === this.totalCaptures) {
            const usuario = { 
                nome: this.formData.name, 
                registro: this.formData.number, 
                rosto: this.captureData.map(descriptor => Array.from(descriptor)) 
            };
            const response = await this.userApi.cadastrarUsuario(usuario);
            if (response) {  
                this.captureData = [];
                this.formData = { name: '', number: '' };
                this.updateCapturesInfo();
                this.clearFormFields();  // Método para limpar os campos do formulário
            }
            
        }
    }
    clearFormFields() {
        document.querySelector('input[name="name"]').value = '';
        document.querySelector('input[name="number"]').value = '';
    }
    async captureFace() {
        if (this.captureData.length==3) {
            alert('Quantida de máxima de fotos atingida')
            return;
        }
        const detection = await faceapi.detectSingleFace(
            this.videoElement, 
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceDescriptor();
        if (detection) {
            const descriptor = detection.descriptor;
            this.captureData.push(descriptor);
            console.log('Face captured successfully.');
            this.updateCapturesInfo();
        } else {
            console.log('No faces detected.');
        }
    }
   
    render() {
        const container = document.createElement('div');
        container.className = 'camera-container';
        container.appendChild(this.videoElement);

        this.capturesInfo = document.createElement('p');
        this.capturesInfo.textContent = `Capturas: ${this.captureData.length} de ${this.totalCaptures}`;
        container.appendChild(this.capturesInfo);

        const captureButton = document.createElement('button');
        captureButton.textContent = 'Capturar Face';
        captureButton.onclick = () => this.captureFace();
        container.appendChild(captureButton);

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.placeholder = 'Nome';
        nameInput.value = this.formData.name;
        nameInput.onchange = (event) => this.handleFormChange(event);
        container.appendChild(nameInput);

        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.name = 'number';
        numberInput.placeholder = 'Número';
        numberInput.value = this.formData.number; 
        numberInput.onchange = (event) => this.handleFormChange(event);
        container.appendChild(numberInput);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Salvar Dados';
        saveButton.onclick = () => this.handleSave();
        container.appendChild(saveButton);

        return container;
    }
}
