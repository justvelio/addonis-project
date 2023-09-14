import { useState, useContext, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { ChevronDoubleDownIcon, XIcon } from "@heroicons/react/solid";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import AppContext from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";
import SignOutButton from "../SignOut/SignOut";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Stack,
  Avatar,
  Box,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import "./Header.css";
import { defaultProfilePictureURL } from "../views/MyProfile/MyProfile";

const navigation = [
  { name: "Products", href: "/products" },
  { name: "Partners", href: "/partners" },
  { name: "Careers", href: "#" },
  { name: "About Us", href: "/about-us" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const isAdminUser =
    userData && userData.role && userData.role.includes("admin");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50 custom-overlay">
      <nav
        className="flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 align-center">
          <Link to="/" className="-m-1.5 p-1.5">
            <img
              className="h-12 w-auto"
              src="https://www.svgrepo.com/show/525382/home-wifi-angle.svg"
              alt="Company Logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-800"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <ChevronDoubleDownIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-lg font-semibold leading-6 text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end text-slate-700">
          {user ? (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="unstyled"
                color={"white"}
                display={"flex"}
                alignItems={"center"}
              >
                {loading ? (
                  "Loading..."
                ) : (
                  <div className="flex items-center">
                    {userData && userData.profilePicture ? (
                      <Avatar
                        name={userData.username || "User"}
                        src={userData.profilePicture}
                        size="sm"
                        mr={2}
                      />
                    ) : (
                      <Avatar
                        name={userData.username || "User"}
                        src={defaultProfilePictureURL}
                        size="sm"
                        mr={2}
                      />
                    )}
                    {userData && userData.username ? userData.username : ""}
                  </div>
                )}
              </MenuButton>
              <MenuList bg={"gray.100"} maxH="20rem">
                <MenuItem bg={"gray.100"}>
                  <Link to="/user-profile">My Profile</Link>
                </MenuItem>
                <MenuItem bg={"gray.100"}>
                  <Link to="/my-plugins">My Plugins</Link>
                </MenuItem>
                <MenuItem bg={"gray.100"}>
                  <Link to="/upload-plugin">Upload Plugin</Link>
                </MenuItem>
                {isAdminUser && (
                  <MenuItem bg={"gray.100"}>
                    <Link to="/admin">Admin Dashboard</Link>
                  </MenuItem>
                )}
                <MenuItem as={"div"} bg={"gray.100"}>
                  <SignOutButton />
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end text-slate-700">
              <Flex alignItems="center" margin={1}>
                <Box ml={10}>
                <SignUpModal />
                </Box>
              </Flex>
              <Flex alignItems="center" margin={1}>
                <Box>
                <LoginModal />
                </Box>
              </Flex>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-64 overflow-y-auto px-4 py-4 sm:ring-1 sm:ring-white mobile-dropdown">
          <div className="flex items-center justify-between">
            <Button
              className="-m-2.5 rounded-md p-2.5 text-slate-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <Box fontSize={"lg"} py={6}>
                {user ? (
                  <div className="flex items-center">
                    <Stack>
                      <span className="text-black">
                        {userData && userData.username ? userData.username : ""}
                      </span>
                      <Link to="/user-profile" className="text-slate-700">
                        My Profile
                      </Link>
                      <Link to="/upload-plugin">Upload Plugin</Link>
                      {isAdminUser && (
                        <Link to="/admin" className="text-slate-700">
                          Admin Dashboard
                        </Link>
                      )}
                      <SignOutButton />
                    </Stack>
                  </div>
                ) : (
                  <div className="lg:flex lg:flex-1 lg:justify-end text-slate-700">
                    <SignUpModal />
                    <LoginModal />
                  </div>
                )}
              </Box>
            </div>
          </div>

          <div className="absolute inset-0 bg-black opacity-50 pointer-events-none" />
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
