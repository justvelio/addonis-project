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
import { db } from "../config";


export const getAllExtensions = () => {
    let data = 'null';
  const dbRef = ref(db);
  get(child(dbRef, `extensions/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val()
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return data;
};
