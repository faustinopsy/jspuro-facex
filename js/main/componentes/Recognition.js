import User from './User.js';
import Presenca from './Presence.js';
export default class Recognition {
    constructor(camera, userApiUrl,faceapi) {
        this.camera = camera;
        this.camera.activateCamera();
        this.userApi = new User(userApiUrl);
        this.presenca = new Presenca(userApiUrl);
        this.buscarFaces();
        this.usuarios = [];
        this.detections= null;
    }
    async buscarFaces() {
        this.usuarios = await this.userApi.buscarFaces();
    };
    async compareFaces (){
        this.detections = await faceapi.detectSingleFace(this.camera.videoElement, new faceapi.TinyFaceDetectorOptions())
                                     .withFaceLandmarks()
                                     .withFaceDescriptor();
        if (!this.detections) {
            alert("Nenhum rosto detectado.");
            return;
        }

        let matched = false;

        this.usuarios.forEach(async (userData) => {
            userData.faces.forEach(async (faceArray) => {
                const faceDescriptor = new Float32Array(faceArray);
                if (faceDescriptor.length === this.detections.descriptor.length) {
                    const distance = faceapi.euclideanDistance(faceDescriptor, this.detections.descriptor);
                    const similarity = (1 - distance) * 100;
                    if (similarity >= 76) { 
                        matched = true;
                        console.log(`Rosto reconhecido: ${userData.nome} com ${Math.round(similarity)} % de aproximidade`);

                        const response = await this.presenca.registrarPresenca(userData.id, 'E');
                        if (response) {
                            return;
                        }
                        
                    }
                }
            });
        });
        if (!matched) {
            alert("Rosto não reconhecido.\n tente novamente");
        }
    };

    render() {
        const container = document.createElement('div');
        container.className = 'camera-container';
        const videoContainer = this.camera.render(); 
        container.appendChild(videoContainer);
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Marcar presença';
        saveButton.onclick = () => this.compareFaces();
        container.appendChild(saveButton);

        return container;
    }
}
