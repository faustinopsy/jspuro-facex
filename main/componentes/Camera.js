export default class Camera {
    constructor(videoElementId) {
        this.videoElement = document.getElementById(videoElementId);
    }

    async activateCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
                this.videoElement.srcObject = stream;
            } catch (err) {
                console.error("Falha ao ativar a câmera:", err);
            }
        }
    }
}
