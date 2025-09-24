import { useState, useEffect } from "react";
import { collection, onSnapshot, query, QueryConstraint } from "firebase/firestore";
import { firestore } from "@/config/firebase"; // adjust path if needed

const useFetchData = (
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionName) return;

    const collectionRef = collection(firestore, collectionName);
    const q = query(collectionRef, ...constraints);

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
        setLoading(false);
      },
      (err) => {
        console.error("Fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [collectionName, constraints]);

  return { data, loading, error };
};

export default useFetchData;


const styles = {};