"use client";
import React from "react";
import Link from "next/link";
import Search from "./Search";
import { useNote } from "./context";

const Navbar = () => {
  const { user } = useNote();
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
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <span className="text-2xl">{user?.email[0]}</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/"} className=" no-underline ">
                Profile
              </Link>
            </li>
            <li>
              <Link href={"/"} className=" no-underline ">
                Settings
              </Link>
            </li>
            <li>
              <Link href={"/"} className=" no-underline ">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
