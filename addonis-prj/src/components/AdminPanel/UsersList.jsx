import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase-config";
import { getUserData } from "../../services/users.service";
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  Button,
  StackDivider,
} from "@chakra-ui/react";
import { ref, get, update } from "firebase/database";

const UserList = () => {
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const usersPerPage = 12;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getUserData(uid)
          .then((data) => {
            setUserRole(data.role);

            if (data.role === "admin") {
              const usersRef = ref(db, "users");

              get(usersRef)
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    const usersArray = [];
                    snapshot.forEach((childSnapshot) => {
                      const uid = childSnapshot.key;
                      const user = childSnapshot.val();
                      usersArray.push({ uid, ...user });
                    });
                    setUsers(usersArray);
                  } else {
                    console.log("No user data available");
                  }
                })
                .catch((error) => {
                  console.error("Error fetching users:", error);
                });
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
        setUserRole(null);
      }
    });
  }, []);

  const toggleBlockUser = (uid, isBlocked) => {
    const updatedUsers = users.map((user) => {
      if (user.uid === uid) {
        return { ...user, isBlocked: !isBlocked };
      }
      return user;
    });

    setUsers(updatedUsers);

    const userRef = ref(db, `users/${uid}`);
    update(userRef, { isBlocked: !isBlocked })
      .then(() => {
        console.log(`User ${uid} blocked status updated successfully.`);
      })
      .catch((error) => {
        console.error("Error updating user blocked status:", error);
      });
  };

  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (userRole !== "admin") {
    return (
      <Box>
        <Text>You do not have admin privileges.</Text>
      </Box>
    );
  }

  return (
    <VStack h={'80vh'}> 
      <Text>All Users:</Text>
      <SimpleGrid
        columns={{ sm: 4, md: 4, lg: 4 }}
        spacing={4}
        divider={<StackDivider borderColor="gray.200" />}
      >
        {displayedUsers.map((user) => (
          <Box
            key={user.uid}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
          >
            <Text>Email: {user.email}</Text>
            <Text>First Name: {user.firstName}</Text>
            <Text>Last Name: {user.lastName}</Text>
            <Text>Phone: {user.phone}</Text>
            <Text>Username: {user.username}</Text>
            <Button
              colorScheme={user.isBlocked ? "red" : "blue"}
              onClick={() => toggleBlockUser(user.uid, user.isBlocked)}
            >
              {user.isBlocked ? "Unblock User" : "Block User"}
            </Button>
          </Box>
        ))}
      </SimpleGrid>
      <Box mt={4}>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </Button>
        <Text display="inline-block" mx={2}>
          Page {page} of {totalPages}
        </Text>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next Page
        </Button>
      </Box>
    </VStack>
  );
};

export default UserList;
