export async function apiRegister({username, password, password2}) {
    const url = '/api/users/register';
    const req = {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
            password2: password2
        })
    };
    return fetch(url, req)
    .then( (res) => res )
    .catch( (err) => err );
}

export async function apiLogin({username, password}) {
    const url = '/api/users/login';
    const req = {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    };
    return fetch(url, req)
    .then( (res) => res )
    .catch( (err) => err );
}