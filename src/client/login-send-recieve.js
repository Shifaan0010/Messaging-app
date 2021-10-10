function loggedIn() {
    return document.cookie.split(';').find((line) => line.startsWith('username'));
}

