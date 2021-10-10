function loggedIn() {
    cookie = document.cookie
        .split(';')
        .find((line) => line.startsWith('username'));
    if (typeof cookie === 'string') {
        return cookie.split('=').reverse()[0];
    } else {
        return cookie;
    }
}

async function getContacts(username) {
    if (typeof username !== 'string' || username.length === 0) {
        return [];
    }
    const contacts = await fetch(`contacts/${username}`);
    return await contacts.json();
}

async function getMessages(username_1, username_2) {
    if (
        typeof username_1 !== 'string' ||
        typeof username_2 !== 'string' ||
        username_1.length === 0 ||
        username_2.length === 0
    ) {
        return [];
    }
    const messages = await fetch(`messages/${username_1}/${username_2}`);
    return await messages.json();
}

async function sendMessage(message, from, to) {
    if (
        typeof from !== 'string' ||
        typeof to !== 'string' ||
        typeof message !== 'string' ||
        from.length === 0 ||
        to.length === 0 ||
        message.length === 0
    ) {
        return;
    }

    const response = await fetch('messages', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: from,
            to: to,
            message: message,
        }),
    });

    console.log(await response.text());
}
