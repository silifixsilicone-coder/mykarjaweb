import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp as firestoreServerTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const serverTimestamp = firestoreServerTimestamp;

export interface ProductDocument {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  externalBuyLink: string;
  status: "active" | "inactive" | string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface OrderDocument {
  id?: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: "pending" | "completed" | "failed" | string;
  createdAt?: unknown;
}

export interface UserDocument {
  id?: string;
  name: string;
  email: string;
  role: "admin" | "user" | string;
  createdAt?: unknown;
}

/**
 * Add a new document to a specified collection.
 */
export async function addDocument(
  collectionName: string,
  data: Record<string, unknown>
): Promise<string> {
  try {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Fetch all documents from a specified collection.
 */
export async function getDocuments(
  collectionName: string
): Promise<Array<Record<string, unknown> & { id: string }>> {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as DocumentData),
    }));
  } catch (error) {
    console.warn(`Firestore getDocuments warning for ${collectionName}:`, error);
    return [];
  }
}

/**
 * Fetch a single document by ID from a specified collection.
 */
export async function getDocument(
  collectionName: string,
  id: string
): Promise<(Record<string, unknown> & { id: string }) | null> {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as DocumentData),
      };
    }
    return null;
  } catch (error) {
    console.warn(`Firestore getDocument warning for ${collectionName}/${id}:`, error);
    return null;
  }
}

/**
 * Update an existing document in a specified collection.
 */
export async function updateDocument(
  collectionName: string,
  id: string,
  data: Record<string, unknown>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error updating document ${collectionName}/${id}:`, error);
    throw error;
  }
}

/**
 * Delete a document by ID from a specified collection.
 */
export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document ${collectionName}/${id}:`, error);
    throw error;
  }
}
