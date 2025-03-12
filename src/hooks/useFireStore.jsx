import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const useFireStore = (collections, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        if (!condition || !condition.compareValue || !condition.compareValue.length) {
            return;
        }

        const collectionRef = collection(db, collections);
        const q = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(docs);
        });

        return () => unsubscribe(); // Cleanup khi component unmount
    }, [collections, condition]);

    return documents;
};

export default useFireStore;
