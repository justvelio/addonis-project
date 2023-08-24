// import { getDatabase, ref, onValue } from "firebase/database";
// import { db } from "../config";

// export const getAllExtensions = ( id ) => {
//     const extensionsRef = ref(db, `extensions/${id}`);

//     onValue(extensionsRef, (snapshot) => {
//         const data = snapshot.val();
//         console.log(data)
//     });
// }

import { getDatabase, ref, child, get } from "firebase/database";
import { db } from "../../../config/firebase-config";

export const getAllExtensions = async () => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `extensions/`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

// get(child(dbRef, `extensions/`))
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       data = snapshot.val()
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });
