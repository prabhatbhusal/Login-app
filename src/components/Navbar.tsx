"use client";

import React from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useSession, signOut } from "next-auth/react"; // Import Auth.js hooks

const Navbar = () => {
  const { data: session, status } = useSession(); // Get session data and status

  // Determine if the user is logged in and their role
  const isLogged = !!session?.user;
  const userRole = session?.user?.role || null;
  const redirectUrl = userRole === "admin" ? "/admin" : "/jobs";

  return (
    <div className="px-25 py-12">
      <ul className="flex flex-row justify-around items-center h-15 border-1 border-gray-500 rounded shadow-md font-bold text-md">
        <li className="hover:text-gray-500 transition ease-in-out duration-700">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-gray-500 transition ease-in-out duration-700">
          <Link href="/about">About</Link>
        </li>
        <li className="hover:text-gray-500 transition ease-in-out duration-700">
          <Link href="/jobs">Jobs</Link>
        </li>
        <li className="hover:text-gray-500 transition ease-in-out duration-700">
          {status === "loading" ? (
            <span>Loading...</span> // Optional: Show a loading state
          ) : !isLogged ? (
            <Link href="/login">
              <button>Login</button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={redirectUrl}>
                <User size={25} />
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;