const messages_everyone = [
    { username: 'everyone', text: 'Hello World' },
];

const users = {
    everyone: {},
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

function setUser(username, { firstname, lastname, dob }) {
    try {
        Object.assign(users[username], { firstname, lastname, dob });
        return `${username} ${firstname} ${lastname} ${dob}`;
    } catch (TypeError) {
        return 'User not found';
    }
}

export {
    validateUser,
    getUsers,
    getMessages,
    sendMessage,
    createUser,
    setUser,
};
