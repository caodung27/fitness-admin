const apiUrl = 'https://fitness-be.onrender.com';

const authProvider = {
    // 
    login: async ({ username, password }) => {
        const request = new Request(`${apiUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        try {
            const response = await fetch(request);
            const json = await response.json();

            if (json.token) {
                localStorage.setItem('token', json.token);
                localStorage.setItem('user', JSON.stringify(json.user));
                return Promise.resolve();
            } else {
                return Promise.reject(new Error('Authentication failed'));
            }
        } catch (error) {
            console.error('Login error:', error);
            return Promise.reject(new Error('Authentication failed'));
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserId: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user)._id : null;
    },
};

export default authProvider;
