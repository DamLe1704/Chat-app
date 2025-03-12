import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const useFireStore = (collections, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        if (!condition || !condition.compareValue || !condition.compareValue.length) {
            setDocuments([]);
            return;
        }

        const fetchData = async () => {
            try {
                // 1. Truy vấn Firestore
                const roomsRef = collection(db, collections);
                const q = query(roomsRef, where(condition.fieldName, condition.operator, condition.compareValue));
                const querySnapshot = await getDocs(q);

                // 2. Xử lý dữ liệu nhận được
                const docs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setDocuments(docs);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ Firestore:", error);
            }
        };

        fetchData();
    }, [collections, condition]); // Chạy lại khi `collections` hoặc `condition` thay đổi

    return documents;
};

export default useFireStore;
