export default class Navbar {
    constructor(navigateCallback) {
        this.navigateCallback = navigateCallback;
    }

    render() {
        const navbarElement = document.createElement('header');
        navbarElement.className = 'navbar';
        navbarElement.innerHTML = `
            <a href="#" data-link="register">Cadastrar Rosto</a>
            <a href="#" data-link="recognize">Reconhecer e Registrar Presença</a>
            <a href="#" data-link="presence">Presenças</a>
            <a href="#" data-link="users">Usuários</a>
            <a href="#" data-link="login">Login</a>
            <span class="hamburger-icon">&#9776;</span>
        `;
        navbarElement.querySelectorAll('a').forEach(linkElement => {
            linkElement.addEventListener('click', (event) => this.onNavigate(event, linkElement.dataset.link));
        });
        navbarElement.querySelector('.hamburger-icon').addEventListener('click', this.toggleHamburgerMenu);
        return navbarElement;
    }

    onNavigate(event, link) {
        event.preventDefault();
        this.navigateCallback(link);
    }

    toggleHamburgerMenu() {
        const navbarElement = document.querySelector('.navbar');
        navbarElement.classList.toggle('responsive');
    }
}
