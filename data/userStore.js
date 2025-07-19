import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth } from '../firebase/config';

export async function saveUserProfile(data) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, data, { merge: true });
}

export async function getUserProfile() {
  const user = auth.currentUser;
  if (!user) return null;

  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return snap.data();
  }
  return null;
}
