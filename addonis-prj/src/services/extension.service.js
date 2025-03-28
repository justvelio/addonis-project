import { ref, onValue, get, child } from "firebase/database";
import { db } from "../config/firebase-config";
import { useEffect, useState } from "react";

export const useAllExtensionsFromDb = () => {
  const [extensions, setExtensions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, []);
  return { error, extensions, loading };
};

export const getPluginByName = async (extensionName) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `plugins/${extensionName}`))

      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
};
