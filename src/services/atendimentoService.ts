import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc
} from "firebase/firestore";
import { Atendimento } from "@/types/Atendimento";

export async function getAtendimento(uid: string): Promise<Atendimento[]> {
  const q = query(
    collection(db, "users", uid, "atendimentos"),
    orderBy("data", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Atendimento);
}

export async function addAttendance(uid: string, atendimento: Atendimento): Promise<void> {
  await addDoc(collection(db, "users", uid, "atendimentos"), atendimento);
} 