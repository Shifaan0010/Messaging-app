const messages_everyone = [{ time: 0, username: 'everyone', text: 'Hello World' }];

const users = {
    everyone: {},
    abc: {
        password: '',
        messages: {
            everyone: messages_everyone,
        },
    },
    pqr: {
        password: '',
        messages: {
            everyone: messages_everyone,
        },
    },
    xyz: {
        password: '',
        messages: {
            everyone: messages_everyone,
        },
    },
};

function validateUser(username, password) {
    return users?.[username]?.password === password ?? false;
}

function getUsers() {
    return Object.keys(users);
}

function getMessages(user1, user2) {
    return users?.[user1]?.messages?.[user2] ?? [];
}

function sendMessage(message, from, to) {
    if (
        Object.keys(users).includes(from) &&
        Object.keys(users).includes(to) &&
        !Object.keys(users[from].messages).includes(to)
    ) {
        const m = [];
        users[from].messages[to] = m;
        users[to].messages[from] = m;
    }

    if (message?.length >= 1) {
        users?.[from]?.messages?.[to].unshift({
            username: from,
            text: message,
        });
    }
}

module.exports = { validateUser, getUsers, getMessages, sendMessage };
