const API_BASE_URL = 'http://localhost:8086/api';

// TODO: Adapt to Jazib's API

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
        throw new Error('Registration failed');
    }

    const data = await response.json();
    handleMicroFrontendCommunication(data.access_token);
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
    handleMicroFrontendCommunication(data.access_token);
    return data.access_token;
}

const handleMicroFrontendCommunication = (token) => {
    localStorage.setItem('jwtToken', token);
    window.dispatchEvent(new CustomEvent('jwtReceived', { detail: token }));
}
