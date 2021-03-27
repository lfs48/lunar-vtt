export async function apiSignup({username, password}) {
    const url = '/api/users/register';
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
    fetch(url, req)
    .then( (res) => res.json() )
    .then( (data) => console.log(data) )
    .catch( (err) => console.log(err) );
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
    fetch(url, req)
    .then( (res) => res.json() )
    .then( (data) => console.log(data) )
    .catch( (err) => console.log(err) );
}