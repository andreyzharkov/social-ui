import Cookies from 'js-cookie';

let Api = {
    API_BASE: 'http://social-webapi.azurewebsites.net/api',
    ALT_AVATAR_LINK: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292048.jpg'
};

Api.setAuthToken = token => {
    Cookies.set('auth-token', token);
};

Api.getAuthToken = () => {
    return Cookies.get('auth-token');
};

Api.removeAuthToken = () => {
    Cookies.remove('auth-token');
};

// Api.query = (url, method) => {
//     fetch('http://social-webapi.azurewebsites.net/api/' + url, {
//         method: method,
//         headers: {
//             'Authorization': 'Bearer ' + token,
//         }
//     })
//         .then(res => res.json())
//         .then(data => this.setState({data, isLoading: false}))
//         .catch(error => this.setState({error, isLoading: false}));
// }

export default Api;