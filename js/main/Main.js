import Navbar from './componentes/Navbar.js';
import Camera from './componentes/Camera.js';
import FaceRegister from './componentes/FaceRegister.js';
import Recognition from './componentes/Recognition.js';
import Presence from './componentes/Presence.js';
import User from './componentes/User.js';
import Auth from './componentes/Auth.js';
import * as faceapi from '../face-api.js';
import ModelLoader from './ModelLoader.js';
import NodeApiStrategy from './componentes/NodeApiStrategy.js';
import PhpApiStrategy from './componentes/PhpApiStrategy.js';


const camera = new Camera();
const mainContainer = document.getElementById('main-container');
const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const modelLoader = new ModelLoader(faceapi);
modelLoader.loadModels();

const backendType = 'node'; // 'node'
const userApiUrl = backendType === 'php' ? 'http://localhost/app/' : 'http://localhost:3000';
const apiStrategy = backendType === 'php' ? new PhpApiStrategy(userApiUrl) : new NodeApiStrategy(userApiUrl);


function navigate(link) {
    if (!isUserLoggedIn && !link) {
        link = 'login'; 
    }
    if (link === 'logout') {
        localStorage.removeItem('isLoggedIn'); 
        location.reload();
        return;
    }
    mainContainer.innerHTML = '';
    let componentInstance;
    switch (link) {
        case 'register': componentInstance = new FaceRegister(userApiUrl,faceapi,apiStrategy); break;
        case 'recognize': componentInstance = new Recognition(camera,userApiUrl,faceapi,apiStrategy); break;
        case 'presence': componentInstance = new Presence(userApiUrl,apiStrategy); break;
        case 'users':
            const userComponent = new User(userApiUrl,apiStrategy);
            userComponent.render().then(renderedElement => {
                mainContainer.appendChild(renderedElement);
            });
            break;
        case 'login':
            const onLoginSuccess = () => navigate('presence'); 
            const authComponent = new Auth(userApiUrl, navbar, onLoginSuccess, apiStrategy);
            mainContainer.appendChild(authComponent.render());
            break;
    }
    if (componentInstance) {
        mainContainer.appendChild(componentInstance.render());
    }
}

const navbar = new Navbar(navigate,isUserLoggedIn);
document.body.insertBefore(navbar.render(), mainContainer);
navigate(false)