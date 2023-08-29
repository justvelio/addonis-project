import { ref, onValue } from "firebase/database";
import { db } from "../config/firebase-config";
import { useEffect, useState } from "react";

export const useAllExtensionsFromDb = () => {
  const [extensions, setExtensions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const extensionsRef = ref(db, `extensions/`);
    try {
      onValue(extensionsRef, (snapshot) => {
        const data = snapshot.val();
        setExtensions(data);
      });
    } catch (error) {
      setError(error);
    }
  }, []);
  return { error, extensions };
};
