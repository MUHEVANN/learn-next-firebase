import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
  // pertama ambil data menggunakan function getDocs
  const snapshot = await getDocs(collection(firestore, collectionName));
  // kemudian maaping data yang sudah didapat
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retriveDataById(collectionName: string, id: string) {
  // pertama ambil data menggunakan function getDocs
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  // kemudian maaping data yang sudah didapat
  const data = snapshot.data();

  return data;
}

type typeUserData = {
  email: string;
  fullname: string;
  password: string;
  phone: string;
  role?: string;
};
type Callback = (success: boolean) => void;
export async function singUp(userData: typeUserData, callback: Callback) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    callback(false);
    return;
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback(true);
      })
      .catch(() => {
        callback(false);
      });
  }
}
