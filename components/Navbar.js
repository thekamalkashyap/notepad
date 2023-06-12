"use client";
import React from "react";
import Link from "next/link";
import Search from "./Search";
import { useNote } from "./context";
import { logout } from "@/app/user/func";

const Navbar = () => {
  const { user, setUser, setState } = useNote();

  const handleLogout = async () => {
    await logout();
    setUser({ email: "" });
    setState({ notes: [], completedNotes: 0, totalNotes: 0 });
  };

  return (
    <div className="navbar pt-6 px-24 bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="no-underline normal-case text-xl">
          Knote
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Search />

        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="avatar cursor-pointer placeholder">
            {user.email ? (
              <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span className="text-2xl">{user.email[0]}</span>
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className=" ml-4 mt-3 cursor-pointer fill-primary-content "
                viewBox="0 0 16 16"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            )}
          </div>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/user/auth"} className=" no-underline ">
                Signin
              </Link>
            </li>
            {user.email && (
              <li>
                <button
                  onClick={() => handleLogout()}
                  className=" no-underline "
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
