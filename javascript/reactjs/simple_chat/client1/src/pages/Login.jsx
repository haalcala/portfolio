import React, { useState } from 'react';

import UseAPI from '../UseAPI';
import { useStore } from 'react-redux';

function Login() {
    const state = useStore().getState();

    console.log("Login.jsx: state: ", state)

    const api = UseAPI()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Logging in with: Username - ${username}, Password - ${password}`);

        api.login(username, password)
    };

    return (
        <div className="login-container">
            <div className="login_box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Log In</button>
                    </div>
                </form>
                <button onClick={() => api.login("user1", password)}>Login as normal user</button>
                <button onClick={() => api.login("support1", password)}>Login as support</button>
                <button onClick={() => api.login("admin1", password)}>Login as admin</button>
            </div>
        </div>
    );
}

export default Login;
