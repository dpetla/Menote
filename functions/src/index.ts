import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { firstNote } from './note-templates';

admin.initializeApp(functions.config().firebase);

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!');
// });

export const test = functions.auth.user().onCreate(user => {
  const data = {
    ...firstNote,
    uid: user.uid,
    dateCreated: new Date(),
    dateUpdated: new Date(),
  };
  return admin
    .firestore()
    .collection('notes')
    .add(data);
});
