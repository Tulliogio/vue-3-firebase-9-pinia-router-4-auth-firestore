import { collection, getDocs, query, where, addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { auth, db } from '../FirebaseConfig';
import { nanoid } from "nanoid";


export const useDatabaseStore = defineStore("database", {
     state: () => ({
          documents: [],
          loadingDoc: false,
     }),
     actions: {
          async getUrls() {
               if (this.documents.length !== 0) {
                    this.loadingDoc = true;
                    return;
               }
               this.documents = [];
               const q = query(
                    collection(db, "urls"),
                    where("user", "==", auth.currentUser.uid)
               );
               try {
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                         this.documents.push({
                              id: doc.id,
                              ...doc.data(),
                         });
                    });
               } catch (error) {
                    console.log(error);
               } finally {
                    this.loadingDoc = false;
               }
          },
          async leerUrl(id) {
               this.loadingDoc = true;
               try {
                    const docRef = doc(db, "urls", id);
                    const docSnap = await getDoc(docRef);

                    if (!docSnap.exists()) {
                         throw new Error("no existe el doc");
                    }

                    if (docSnap.data().user === auth.currentUser.uid) {
                         return docSnap.data().name;
                    } else {
                         throw new Error("no eres el autor");
                    }
               } catch (error) {
                    console.log(error.message);
               } finally {
                    this.loadingDoc = false;
               }
          },
          async updateUrl(id, name) {
               this.loadingDoc = true;
               try {
                    const docRef = doc(db, "urls", id);
                    const docSnap = await getDoc(docRef);

                    if (!docSnap.exists()) {
                         throw new Error("no existe el doc");
                    }

                    if (docSnap.data().user === auth.currentUser.uid) {
                         await updateDoc(docRef, {
                              name: name,
                         });
                         this.documents = this.documents.map((item) =>
                              item.id === id ? { ...item, name: name } : item
                         );
                    } else {
                         throw new Error("no eres el autor");
                    }
               } catch (error) {
                    console.log(error.message);
               } finally {
                    this.loadingDoc = false;
               }
          },
          async addUrl(name) {
               this.loadingDoc = true;
               try {
                    const docObjeto = {
                         name: name,
                         short: nanoid(5),
                         user: auth.currentUser.uid
                    };
                    const q = query(collection(db, 'urls'))
                    const docRef = await addDoc(q, docObjeto);
                    this.documents.push({ id: docRef.id, ...docObjeto });
               } catch (error) {
                    console.log(error);
               } finally {
                    this.loadingDoc = false;
               }
          },
          async deleteUrl(id) {
               this.loadingDoc = true;
               try {
                    const docRef = doc(db, "urls", id);
                    const docSnap = await getDoc(docRef);

                    if (!docSnap.exists()) {
                         throw new Error('no existe el doc')
                    }

                    if (docSnap.data().user === auth.currentUser.uid) {
                         await deleteDoc(docRef);
                         this.documents = this.documents.filter(
                              (item) => item.id !== id
                         );
                    } else {
                         throw new Error('no eres el autor')
                    }
               } catch (error) {
                    console.log(error.message);
               } finally {
                    this.loadingDoc = false;
               }
          },
     },
});
