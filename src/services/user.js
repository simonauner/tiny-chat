import { database } from 'firebase';

export function writeUserData(userId, name) {
    database()
        .ref(`users/${userId}`)
        .set({
            name,
        });
}
