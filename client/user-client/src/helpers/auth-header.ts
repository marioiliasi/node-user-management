export function authHeader() {
    const localStorageUser: any = localStorage.getItem('user');
    // return authorization header with jwt token
    let user = JSON.parse(localStorageUser);

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
