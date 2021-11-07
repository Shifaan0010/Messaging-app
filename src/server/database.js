const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const mongoClient = new MongoClient(uri);

(async () => {
    await mongoClient.connect();
    await mongoClient.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');
})();

async function findUser(username) {
    const database = mongoClient.db('messaging-app');
    const users = database.collection('users');

    const user = await users.findOne({ username: username });

    return user;
}

async function findMessageDoc(id) {
    const database = mongoClient.db('messaging-app');
    const messages = database.collection('messages');

    const message = await messages.findOne(
        id === 'everyone' ? { group: 'everyone' } : { _id: id }
    );

    return message;
}

async function validateUser(username, password) {
    const user = await findUser(username);

    // console.log(user);

    return user?.password === password;
}

async function getUsers() {
    const database = mongoClient.db('messaging-app');
    const users = database.collection('users');

    const cursor = await users.find({}, { projection: { username: 1 } });
    const userList = await cursor.toArray();

    // console.log(userList);

    return userList.map((user) => user.username);
}

async function getMessages(user1, user2) {
    const user = await findUser(user1);

    const messageDoc = await findMessageDoc(user.messages[user2]);

    try {
        return messageDoc.messages;
    } catch (KeyError) {
        return [];
    }
}

async function sendMessage(message, from, to) {
    const database = mongoClient.db('messaging-app');
    const users = database.collection('users');
    const messages = database.collection('messages');

    if (message?.length >= 1) {
        const fromUser = await findUser(from);
        const toUser = await findUser(to);

        if (fromUser && toUser) {
            // console.log(fromUser);
            // console.log(toUser);

            let added = null;

            if (!Object.keys(fromUser.messages).includes(to)) {
                added = await messages.insertOne({
                    messages: [],
                });

                const o2 = {
                    $set: {},
                };
                o2.$set[`messages.${to}`] = added.insertedId;

                await users.updateOne(fromUser, o2);

                const o = {
                    $set: {},
                };
                o.$set[`messages.${from}`] = added.insertedId;
                console.log(o);

                await users.updateOne(toUser, o);

                console.log(added.insertedId);
            }

            await messages.updateOne(
                {
                    _id:
                        added != null
                            ? added.insertedId
                            : fromUser.messages[to],
                },
                {
                    $push: {
                        messages: {
                            $each: [
                                {
                                    username: from,
                                    text: message,
                                },
                            ],
                            $position: 0,
                        },
                    },
                }
            );
        }
    }
}

async function createUser({ firstname, lastname, dob, username, password }) {
    const database = mongoClient.db('messaging-app');
    const users = database.collection('users');

    const alreadyUsed = await findUser(username);

    // console.log(alreadyPresent);

    if (alreadyUsed == null) {
        await users.insertOne({
            firstname,
            lastname,
            dob,
            username,
            password,
            messages: {
                everyone: (await findMessageDoc('everyone'))['_id'],
            },
        });
        return username;
    }
}

async function setUser(username, { firstname, lastname, dob }) {
    const database = mongoClient.db('messaging-app');
    const users = database.collection('users');

    // console.log(username, { firstname, lastname, dob })

    const updated = await users.updateOne(
        { username: username },
        {
            $set: {
                firstname: firstname,
                lastname: lastname,
                dob: dob,
            },
        }
    );

    return updated;
}

module.exports = {
    validateUser,
    getUsers,
    getMessages,
    sendMessage,
    createUser,
    setUser,
};
