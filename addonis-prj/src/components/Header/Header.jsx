import { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { ChevronDoubleDownIcon, XIcon } from "@heroicons/react/solid";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import AppContext from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";
import SignOutButton from "../SignOut/SignOut";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import Search from "../Search/Search";
import { ChevronDownIcon } from "@chakra-ui/icons";
import "./Header.css";

const navigation = [
  { name: "Products", href: "#" },
  { name: "Partners", href: "#" },
  { name: "Careers", href: "#" },
  { name: "About Us", href: "#" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userData, loading } = useContext(AppContext);
  const navigate = useNavigate();

  // to do loading
  // console.log(loading);
  // console.log(user);
  if (!user || !userData) {
    return (
      <header className="absolute inset-x-0 top-0 z-50 custom-overlay">
      </header>
    );
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 custom-overlay">
      <nav
        className="flex items-center justify-end p-4 lg:px-8"
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
        <Search />
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
            <a
              key={item.name}
              href={item.href}
              className="text-lg font-semibold leading-6 text-white"
            >
              {item.name}
            </a>
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
              >
                {userData ? userData.username : ""}
              </MenuButton>
              <MenuList bg={"gray.100"}>
                <MenuItem bg={"gray.100"}>
                  <Link to="/user-profile">My Profile</Link>
                </MenuItem>
                <MenuItem bg={"gray.100"}>
                  <Link to="/upload-plugin">Upload Plugin</Link>
                </MenuItem>
                <MenuItem as={"div"} bg={"gray.100"}>
                  <SignOutButton />
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end text-slate-700">
              <SignUpModal />
              <LoginModal />
            </div>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <img
                className="h-12 w-auto"
                src="https://www.svgrepo.com/show/525382/home-wifi-angle.svg"
                alt="Company Logo"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-slate-880000"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6 text-lg">
                <Search />
                {user ? (
                  <div className="flex items-center">
                    <span className="text-slate-700 mr-4">
                      {userData.username}
                    </span>
                    <Link to="/user-profile" className="text-slate-700">
                      Update Profile
                    </Link>
                    <SignOutButton />
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:justify-end text-slate-700">
                    <SignUpModal />
                    <LoginModal />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-black opacity-50 pointer-events-none" />
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
