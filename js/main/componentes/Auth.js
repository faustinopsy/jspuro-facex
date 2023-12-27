export default class Auth {
    constructor(apiUrl, navbar,onLoginSuccess) {
        this.apiUrl = apiUrl;
        this.navbar = navbar;
        this.onLoginSuccess = onLoginSuccess;
        this.activeTab = 'login';
    }

    async registrarUsuario(usuario){
        try {
            const response = await fetch(`${this.apiUrl}Usuarios.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...usuario, acao: 'registrar' }),
            });
    
            const data = await response.json();
            if(data.status){
                console.log('Registrado com sucesso');
                const mensagem = {
                    ...data,
                    message: 'Cadastrado com sucesso'
                };
                alert(mensagem.message) 
            }else{
                const mensagem = {
                    ...data,
                    message: 'Já existe registro para o usuário'
                };
                alert(mensagem.message) 
            }
            
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return error
        }
    };
    async fazerLogin(credenciais) {
        try {
            const response = await fetch(`${this.apiUrl}Usuarios.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...credenciais, acao: 'login' }),
            });
    
            const data = await response.json();
            if(data.status){
                console.log('Logado com sucesso');
                const mensagem = {
                    ...data,
                    message: 'Logado com sucesso'
                };
                localStorage.setItem('isLoggedIn', 'true');
                alert(mensagem.message) ;
                this.navbar.update(true);
                this.onLoginSuccess();
            }else{
                const mensagem = {
                    ...data,
                    message: 'Não é possivel logar'
                };
                alert(mensagem.message) 
            }
           
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return error
        }
    };

    render() {
        const container = document.createElement('div');
        container.className = 'container';

        const tabs = this.renderTabs();
        container.appendChild(tabs);

        if (this.activeTab === 'register') {
            container.appendChild(this.renderRegistroForm());
        } else if (this.activeTab === 'login') {
            container.appendChild(this.renderLoginForm());
        }

        return container;
    }

    renderTabs() {
        const tabs = document.createElement('div');
        tabs.className = 'tabs';

        const tabRegistro = document.createElement('div');
        tabRegistro.className = `tab ${this.activeTab === 'register' ? 'active' : ''}`;
        tabRegistro.textContent = 'Registro';
        tabRegistro.onclick = () => {
            this.activeTab = 'register';
            document.getElementById('main-container').innerHTML = '';
            document.getElementById('main-container').appendChild(this.render());
        };

        const tabLogin = document.createElement('div');
        tabLogin.className = `tab ${this.activeTab === 'login' ? 'active' : ''}`;
        tabLogin.textContent = 'Login';
        tabLogin.onclick = () => {
            this.activeTab = 'login';
            document.getElementById('main-container').innerHTML = '';
            document.getElementById('main-container').appendChild(this.render());
        };

        tabs.appendChild(tabRegistro);
        tabs.appendChild(tabLogin);

        return tabs;
    }

    renderRegistroForm() {
        const form = document.createElement('div');
        form.innerHTML = `
            <h2>Registro</h2>
            <form id="registroForm">
                <input type="text" name="nome" placeholder="Nome">
                <input type="text" name="registro" placeholder="Registro">
                <input type="email" name="email" placeholder="Email">
                <input type="password" name="senha" placeholder="Senha">
                <button type="submit">Registrar</button>
            </form>
        `;

        const registroForm = form.querySelector('#registroForm');
        registroForm.onsubmit = (e) => this.handleSubmitRegistro(e);

        return form;
    }

    renderLoginForm() {
        const form = document.createElement('div');
        form.innerHTML = `
            <h2>Login</h2>
            <form id="loginForm">
                <input type="email" name="email" placeholder="Email">
                <input type="password" name="senha" placeholder="Senha">
                <button type="submit">Login</button>
            </form>
        `;

        const loginForm = form.querySelector('#loginForm');
        loginForm.onsubmit = (e) => this.handleSubmitLogin(e);

        return form;
    }

    handleSubmitRegistro(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const usuario = {
            nome: formData.get('nome'),
            registro: formData.get('registro'),
            email: formData.get('email'),
            senha: formData.get('senha')
        };
        this.registrarUsuario(usuario);
    }

    handleSubmitLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const credenciais = {
            email: formData.get('email'),
            senha: formData.get('senha')
        };
        this.fazerLogin(credenciais);
    }
}
