    import React, { useState, useEffect } from 'react';
    import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
    import { db } from "../firebase/config";

    const useFireStore = (collections, condition) => {
        const [documents, setDocuments] = useState([]);

        useEffect(() => {
            if (!condition || !condition.compareValue || !condition.compareValue.length > 0) {
                return;
            }

            const collectionRef = collection(db, collections);
            const q = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue), orderBy('createdAt', 'asc'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const docs = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setDocuments(docs);
            });

            return () => unsubscribe();
        }, [collections, condition]);

        return documents;
    };

    export default useFireStore;
