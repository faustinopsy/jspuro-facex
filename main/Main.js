// Main.js
import Camera from './componentes/Camera.js';
import FaceRegister from './componentes/FaceRegister.js';
import Recognition from './componentes/Recognition.js';
import Presence from './componentes/Presence.js';
import User from './componentes/User.js';

const camera = new Camera('videoElementId');
const apiUrl = 'https://webcrud.faustinopsy.com/app/';

const faceRegister = new FaceRegister(camera, apiUrl);
const recognition = new Recognition(camera, apiUrl);
const presence = new Presence(apiUrl);
const user = new User(apiUrl);


