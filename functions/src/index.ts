import * as functions from "firebase-functions";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!");
  response.send("Hello from Firebase!");
});
