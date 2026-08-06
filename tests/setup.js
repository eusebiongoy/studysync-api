const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");


jest.setTimeout(60000);


let mongoServer;


beforeAll(async () => {

  mongoServer = await MongoMemoryServer.create({
    instance: {
      launchTimeout: 30000
    }
  });


  await mongoose.connect(
    mongoServer.getUri()
  );

});


afterEach(async () => {

  const collections = mongoose.connection.collections;


  for (const collectionName in collections) {

    await collections[collectionName].deleteMany({});

  }

});

afterAll(async () => {

  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }


  if (mongoServer) {
    await mongoServer.stop();
  }

});