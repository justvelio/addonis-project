import { ref, get, set } from "firebase/database";
import { db } from "../config/firebase-config";

export const incrementDownloadCount = async (pluginId) => {
  const pluginRef = ref(db, `plugins/${pluginId}`);
  const snapshot = await get(pluginRef);

  if (snapshot.exists()) {
    const pluginData = snapshot.val();
    const currentCount = pluginData.downloadCount || 0;
    const updatedCount = currentCount + 1;

    await set(pluginRef, { ...pluginData, downloadCount: updatedCount });
    return updatedCount;
  } else {
    throw new Error("Plugin does not exist");
  }
};