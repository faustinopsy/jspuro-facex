import Navbar from './componentes/Navbar.js';
import Camera from './componentes/Camera.js';
import FaceRegister from './componentes/FaceRegister.js';
import Recognition from './componentes/Recognition.js';
import Presence from './componentes/Presence.js';
import User from './componentes/User.js';
import Auth from './componentes/Auth.js';
import * as faceapi from '../face-api.js';
import ModelLoader from './ModelLoader.js';

const userApiUrl = 'https://webcrud.faustinopsy.com/app/';
const camera = new Camera();
const mainContainer = document.getElementById('main-container');

const modelLoader = new ModelLoader(faceapi);
modelLoader.loadModels();

function navigate(link) {
    mainContainer.innerHTML = '';
    let componentInstance;
    switch (link) {
        case 'register': componentInstance = new FaceRegister(userApiUrl,faceapi); break;
        case 'recognize': componentInstance = new Recognition(camera,userApiUrl,faceapi); break;
        case 'presence': componentInstance = new Presence(userApiUrl); break;
        case 'users':
            const userComponent = new User(userApiUrl);
            userComponent.render().then(renderedElement => {
                mainContainer.appendChild(renderedElement);
            });
            break;
        case 'login':
            const authComponent = new Auth(userApiUrl);
            mainContainer.appendChild(authComponent.render());
            break;
    }
    if (componentInstance) {
        mainContainer.appendChild(componentInstance.render());
    }
}

const navbar = new Navbar(navigate);
document.body.insertBefore(navbar.render(), mainContainer);
