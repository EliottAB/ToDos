import { database } from '../firebase/config.js';
import { collection, getDocs } from 'firebase/firestore';

export async function getUsers(){
  const usersRef = collection(database, 'users');
  const snapshot = await getDocs(usersRef);
  
  const users = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  console.log(users);
};