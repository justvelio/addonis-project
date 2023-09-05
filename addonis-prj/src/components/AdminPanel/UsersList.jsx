import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  SimpleGrid,
  StackDivider,
  HStack,
} from "@chakra-ui/react";
import { ref, get, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase-config";
import { getUserData } from "../../services/users.service";

const UserList = () => {
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getUserData(uid)
          .then((data) => {
            setUserRole(data.role);

            if (data.role === "admin") {
              const usersRef = ref(db, "users");
              const pluginsRef = ref(db, "plugins");

              get(pluginsRef)
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    const pluginsArray = [];
                    snapshot.forEach((childSnapshot) => {
                      const plugin = childSnapshot.val();
                      pluginsArray.push({ ...plugin, id: childSnapshot.key });
                    });

                    get(usersRef)
                      .then((userSnapshot) => {
                        if (userSnapshot.exists()) {
                          const usersArray = [];
                          userSnapshot.forEach((userChildSnapshot) => {
                            const uid = userChildSnapshot.key;
                            const user = userChildSnapshot.val();
                            const userUploadedPlugins = pluginsArray.filter(
                              (plugin) => plugin.creatorUID === uid
                            );

                            usersArray.push({
                              uid,
                              ...user,
                              uploadedPluginsCount: userUploadedPlugins.length,
                            });
                          });
                          setUsers(usersArray);
                        } else {
                          console.log("No user data available");
                        }
                      })
                      .catch((error) => {
                        console.error("Error fetching users:", error);
                      });
                  } else {
                    console.log("No plugins data available");
                  }
                })
                .catch((error) => {
                  console.error("Error fetching plugins:", error);
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

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter users based on the search query
    const filtered = users.filter((user) => {
      const username = user.username.toLowerCase();
      const email = user.email.toLowerCase();
      return username.includes(query) || email.includes(query);
    });

    setFilteredUsers(filtered);
  };

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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (userRole !== "admin") {
    return (
      <Box>
        <Text>You do not have admin privileges.</Text>
      </Box>
    );
  }

  return (
    <VStack h={"80vh"}>
      <Box>
        <Text>Search Users by Username or Email:</Text>
        <input
        className="border-2"
          type="search"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search"
        />
      </Box>
      <SimpleGrid
  columns={{ sm: 4, md: 4, lg: 4 }}
  spacing={4}
  divider={<StackDivider borderColor="gray.200" />}
>
  {searchQuery !== ""
    ? filteredUsers.map((user) => (
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
      ))
    : currentUsers.map((user) => (
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
        {totalPages > 1 && (
          <HStack>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                variant={i + 1 === currentPage ? "solid" : "ghost"}
              >
                {i + 1}
              </Button>
            ))}
          </HStack>
        )}
      </Box>
    </VStack>
  );
};

export default UserList;
