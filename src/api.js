import Cookies from 'js-cookie';

let token = null;
let user_id = null;

export function is_logged_in() {
    if (token === null) {
        const _token = Cookies.get('auth-token');
        const _user_id = Cookies.get('user-id');
        if (!_token) {
            return false;
        }
        token = _token;
        user_id = _user_id;
        return token !== null;
    }
    return true;
}

function check_code(response) {
    if (response.status !== 200) {
        if (response.status === 401) {
            alert('Auth error')
        }
        if (response.status === 404) {
            alert('No user')
        }
        return;
    }
    return response.json()
}

function save_and_redir(json, token, remember) {
    console.log(json);
    user_id = json.id;
    if (remember) {
        Cookies.set('auth-token', token);
        Cookies.set('user-id', user_id);
    }
    window.location.replace("/");
}

export function login(_token, remember) {
    token = _token;
    fetch(`http://social-webapi.azurewebsites.net/api/users/me/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(response => check_code(response))
        .then(json => save_and_redir(json, token, remember))
        .catch(function (error) {
            console.log('Request failed', error)
        });

}

export function logout() {
    token = null;
    user_id = null;

    Cookies.remove('auth-token');

    window.location.replace("/");
    console.log("exit logout");
}

export function get_token() {
    return token;
}

export function get_id() {
    return user_id;
}
