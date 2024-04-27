const { MongoClient, ObjectId } = require("mongodb");

let connectionInstance = null;

async function createClientDatabase() {
  if (connectionInstance) return connectionInstance;

  const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
  connectionInstance = await client.connect();

  return await client.connect();
}

async function connectToDatabase() {
  const connection = await createClientDatabase();

  return connection.db(process.env.MONGODB_DB_NAME);
}

async function disconnectFromDatabase() {
  const connection = await createClientDatabase();

  connection.close();
  connectionInstance = null;
}

async function getUserByCredentials(username, password) {
  try {
    const client = await connectToDatabase();
    const collection = client.collection("users");
    const user = await collection.findOne({
      name: username,
      password: password,
    });
    if (!user) return null;
    return user;
  } catch (error) {
    console.error(error);
  } finally {
    disconnectFromDatabase();
  }
}

async function saveResultToDatabase(result) {
  try {
    const client = await connectToDatabase();
    const collection = client.collection("results");
    const { insertedId } = await collection.insertOne(result);
    return insertedId;
  } catch (error) {
    console.error(error);
  } finally {
    disconnectFromDatabase();
  }
}

async function getResultById(id) {
  try {
    const client = await connectToDatabase();
    const collection = client.collection("results");
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (!result) return null;
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    disconnectFromDatabase();
  }
}

module.exports = {
  getUserByCredentials,
  saveResultToDatabase,
  getResultById,
};
