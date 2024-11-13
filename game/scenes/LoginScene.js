class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoginScene' });
    }

    preload() {}

    create() {

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const title = this.add.text(centerX, centerY - 150, 'Login', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.usernameInput = this.add.dom(centerX, centerY - 50, 'input', {
            type: 'text',
            name: 'username',
            placeholder: 'Username',
            style: 'width: 200px; height: 30px; font-size: 16px; padding: 5px; border-radius: 5px; border: 1px solid #999; text-align: center;'
        });

        /* need to figure out how to hide password when its being entered */
        this.passwordInput = this.add.dom(centerX, centerY + 10, 'input', {
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            style: 'width: 200px; height: 30px; font-size: 16px; padding: 5px; border-radius: 5px; border: 1px solid #999; text-align: center;'
        });

        const loginButton = this.add.text(centerX, centerY + 70, 'Login', {
            fontSize: '20px',
            fill: '#0f0'
        }).setOrigin(0.5);
        loginButton.setInteractive();
        loginButton.on('pointerdown', () => this.handleLogin());

        const registerButton = this.add.text(centerX, centerY + 120, 'Register', {
            fontSize: '20px',
            fill: '#00f'
        }).setOrigin(0.5);
        registerButton.setInteractive();
        registerButton.on('pointerdown', () => this.handleRegister());
    }

    handleLogin() {
        const username = this.usernameInput.node.value;
        const password = this.passwordInput.node.value;

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                /* debug */
                console.log("Login successful", data.token);

                /* possible implementation here to transition into the main scene with session established */
                /* need to utilize setting a jwt cookie */
                this.game.registry.set('jwtToken', data.token);
                this.scene.start('MainScene')
            } else {
                /* debug */
                console.error("Login failed");
            }
        })
        .catch(console.error);
    }

    handleRegister() {
        const username = this.usernameInput.node.value;
        const password = this.passwordInput.node.value;

        fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        .then(res => {
            if (res.ok) {
                console.log("Registration successful");
                /* handle post registration stuff */
            } else {
                console.error("Registration failed");
            }
            return res.json();
        })
        .catch(console.error);
    }
}

export default LoginScene