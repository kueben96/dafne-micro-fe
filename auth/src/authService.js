const API_BASE_URL = 'http://localhost:8086/api';

export async function registerUser({ email, firstName, industry, jobTitle, lastName }) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            email: email,
            firstName: firstName,
            industry: industry,
            jobTitle: jobTitle,
            lastName: lastName
        }),
    });

    if (!response.ok) {
        throw new Error('Register failed. Please check your credentials.');
    }

    const data = await response.json();
    shareTokenAsEvent(data.access_token);
    return data.access_token;
}

export async function loginUser({ email, password }) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            user: email,
            user_pass: password,
        }),
    });

    if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
    }

    const data = await response.json();
    shareTokenAsEvent(data.access_token);
    return data.access_token;
}

const shareTokenAsEvent = (token) => {
    window.dispatchEvent(new CustomEvent('jwtReceived', { detail: token }));
}
