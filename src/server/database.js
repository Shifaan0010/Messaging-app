const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const mongoClient = new MongoClient(uri);

const databaseName = 'messaging-app';

(async () => {
    await mongoClient.connect();

    const everyoneUser = await mongoClient
        .db(databaseName)
        .collection('users')
        .findOne({ username: 'everyone' });

    if (everyoneUser == null) {
        await mongoClient
            .db(databaseName)
            .collection('users')
            .insertOne({ username: 'everyone' });
    }

    const everyoneMessages = await mongoClient
        .db(databaseName)
        .collection('messages')
        .findOne({ group: 'everyone' });

    if (everyoneMessages == null) {
        await mongoClient
            .db(databaseName)
            .collection('messages')
            .insertOne({ group: 'everyone', messages: [] });
    }

    console.log('Connected successfully to mongodb');
})();

async function findUser(username) {
    return await mongoClient
        .db(databaseName)
        .collection('users')
        .findOne({ username: username });
}

async function validateUser(username, password) {
    const user = await findUser(username);

    // console.log(user);

    return user?.password === password;
}

async function getUsers() {
    const cursor = await mongoClient
        .db(databaseName)
        .collection('users')
        .find({}, { projection: { username: 1 } });
    const userList = await cursor.toArray();

    cursor.close();

    // console.log(userList);

    return userList.map((user) => user.username);
}

async function getMessages(user1, user2) {
    try {
        const user = await findUser(user1);

        const messageDoc = await mongoClient
            .db(databaseName)
            .collection('messages')
            .findOne({ _id: user.messages[user2] });

        return messageDoc.messages;
    } catch (error) {
        console.log(`Could not find messages for ${user1} ${user2}`);
        return [];
    }
}

async function sendMessage(message, from, to) {
    const database = mongoClient.db(databaseName);
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
                // console.log(o);

                await users.updateOne(toUser, o);

                // console.log(added.insertedId);
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
    const database = mongoClient.db(databaseName);
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
                everyone: (
                    await mongoClient
                        .db(databaseName)
                        .collection('messages')
                        .findOne({ group: 'everyone' })
                )['_id'],
            },
        });
        return username;
    }
}

async function setUser(username, { firstname, lastname, dob }) {
    // console.log(username, { firstname, lastname, dob })

    const updated = await mongoClient
        .db(databaseName)
        .collection('users')
        .updateOne(
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

export {
    validateUser,
    getUsers,
    getMessages,
    sendMessage,
    createUser,
    setUser,
};
