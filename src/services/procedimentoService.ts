import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Procedure } from "@/types/Procedure";

export async function getGlobalProcedures(): Promise<Procedure[]> {
  const snapshot = await getDocs(collection(db, "procedimentos"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  } as Procedure));
}
