const messages_everyone = [
    { time: 0, username: 'everyone', text: 'Hello World' },
];

const users = {
    everyone: {},
    abc: {
        password: 'abc',
        messages: {
            everyone: messages_everyone,
        },
    },
    pqr: {
        password: 'pqr',
        messages: {
            everyone: messages_everyone,
        },
    },
    xyz: {
        password: 'xyz',
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
        message?.length >= 1 &&
        Object.keys(users).includes(from) &&
        Object.keys(users).includes(to)
    ) {
        if (!Object.keys(users[from].messages).includes(to)) {
            const m = [];
            users[from].messages[to] = m;
            users[to].messages[from] = m;
        }

        users?.[from]?.messages?.[to].unshift({
            username: from,
            text: message,
        });
    }
}

function createUser({ firstname, lastname, dob, username, password }) {
    if (!Object.keys(users).includes(username)) {
        users[username] = {
            firstname,
            lastname,
            dob,
            password,
            messages: {
                everyone: messages_everyone,
            },
        };
        return users[username];
    }
}

module.exports = {
    validateUser,
    getUsers,
    getMessages,
    sendMessage,
    createUser,
};
