import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function getAllDishes() {
  const snapshot = await getDocs(collection(db, 'dishes'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
