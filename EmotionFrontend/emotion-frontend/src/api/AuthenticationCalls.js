
export async function login(username, password) {
    const url = 'http://localhost:8080/api/auth/login';
    const requestBody = JSON.stringify({ username, password });
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during login:', error.message);
        return null;
    }
}

export async function addUser(username,password,email) {
    const url = 'http://localhost:8080/api/auth/authenticate';
    const requestBody = JSON.stringify({username,password,email});
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        });
        if (!response.ok) {
            throw new Error('Failed to authenticate user');
        }
        const responseData = await response.text();
        return responseData;
    } catch (error) {
        console.error('Error during user authentication:', error.message);
        return null;
    }
}