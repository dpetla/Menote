import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { firstNote } from './note-templates';

admin.initializeApp(functions.config().firebase);

export const onNewUser = functions.auth.user().onCreate(user => {
  const data = {
    ...firstNote,
    uid: user.uid,
    dateCreated: new Date(),
    dateUpdated: new Date(),
  };
  return admin
    .firestore()
    .collection(user.uid)
    .add(data);
});

export const onDeleteUser = functions.auth.user().onDelete(user => {
  const collectionRef = admin.firestore().collection(user.uid);
  const promises: any[] = [];

  return collectionRef
    .get()
    .then(qs => {
      qs.forEach(docSnapshot => {
        promises.push(docSnapshot.ref.delete());
      });
      return Promise.all(promises);
    })
    .catch(error => {
      console.log(error);
      return false;
    });
});
