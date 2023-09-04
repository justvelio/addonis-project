import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { getUserData } from "../../services/users.service";
import AdminDashboard from "./AdminDashboard";

const AdminPanel = ({ role }) => {
    const [userRole, setUserRole] = useState(null);
  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          getUserData(uid)
            .then((data) => {
              setUserRole(data.role);
              console.log("User Role:", data.role);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        } else {
          setUserRole(null);
        }
      });
    }, []);
  
    console.log("current UR:", userRole);
  
    if (userRole !== 'admin') {
        return (
          <div className="flex justify-center items-center h-screen">
            <div>You do not have admin privileges.</div>
          </div>
        );
      }
    
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="">
            <AdminDashboard />
            
          </div>
        </div>
      );
  };

  export default AdminPanel;
