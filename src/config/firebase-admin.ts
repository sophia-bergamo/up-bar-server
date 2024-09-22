import admin from "firebase-admin";
var serviceAccount = require(`${__dirname}/serviceAccountKey.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://up-bar-36400.appspot.com",
});

const bucket = admin.storage().bucket();
export { bucket };
