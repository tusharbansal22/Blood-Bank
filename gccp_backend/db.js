const path = require("path");
const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: path.join(__dirname,'./keyfile.json'),
});

module.exports = db;