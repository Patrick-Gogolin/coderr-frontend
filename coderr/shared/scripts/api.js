function setAuthCredentials(token, userId, username) {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('auth-user', username);
    localStorage.setItem('auth-user-id', userId);
}

function removeAuthCredentials() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-user-id');
}

function getAuthToken() {
    return localStorage.getItem('auth-token');
}

function getAuthUser() {
    return localStorage.getItem('auth-user');
}

function getAuthUserId() {
    return localStorage.getItem('auth-user-id');
}

function jsonToFormData(json) {
    const formData = new FormData();

    const appendFormData = (data, parentKey) => {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                appendFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            formData.append(parentKey, data);
        }
    };

    appendFormData(json, '');

    return formData;
};

function createHeaders() {
    const headers = {};

    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    return headers;
}

function getErrorMessage(error) {
    let errorMessage = 'Network error';

    if (error.message.includes('Failed to fetch')) {
        return 'Failed to connect to the server.';
    }

    if (error instanceof SyntaxError) {
        return 'Response was not valid JSON.';
    }

    if (error instanceof TypeError) {
        return 'There was an issue with the request or network connection.';
    }

    return errorMessage;
}

async function getData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: createHeaders(),
        });
        const responseData = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        return {
            ok: false,
            status: 'error',
            message: errorMessage
        };
    }
}

async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();

        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };

    } catch (error) {
        console.log(error);
        console.log(error.message);
        console.log(error.message.includes('Failed to fetch'));
        const errorMessage = getErrorMessage(error);
        return {
            ok: false,
            status: 'error',
            message: errorMessage
        };
    }
}

async function postDataWJSON(endpoint, data) {

    let header = createHeaders();
    header['Content-Type'] = 'application/json';
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        return {
            ok: false,
            status: 'error',
            message: errorMessage
        };
    }
}

async function patchDataWoFiles(endpoint, data) {
    let header = createHeaders();
    header['Content-Type'] = 'application/json';
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: header,
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        return {
            ok: false,
            status: 'error',
            message: errorMessage
        };
    }
}

async function patchData(endpoint, formData) {

    const headers = createHeaders();

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: headers,
            body: formData
        });

        const responseData = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        return {
            ok: false,
            status: 'error',
            message: errorMessage
        };
    }
}

async function deleteData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: createHeaders(),
        });

        return {
            ok: response.ok,
            status: response.status,
            data: {}
        };

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        return {
            ok: false,
            status: 'error',
            message: errorMessage
        };
    }
}

function getFormData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
}