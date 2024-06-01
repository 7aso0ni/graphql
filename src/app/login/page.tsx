"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Image from "next/image";
import {
  faEye,
  faEyeSlash,
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // convert data into json object
      const jsonData = JSON.stringify({ username, password });

      //TODO: get session cookie from 01
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-primary-dark-bg h-screen flex items-center justify-center">
      <div className="bg-neutral-light px-10 py-5 rounded-lg shadow-lg max-w-md w-full max-h-md">
        <div className="flex justify-center mb-5">
          <Image
            src="/graphql-logo.png"
            alt="graphql logo"
            width={128}
            height={128}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col gap-4 text-black mb-5"
        >
          <div className="relative flex items-center border-b border-black">
            <FontAwesomeIcon
              icon={faUser}
              className="pl-2 text-text-neutral-dark"
            />
            <input
              className="focus:outline-none bg-inherit pl-4"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative flex items-center border-b border-black mt-5">
            <FontAwesomeIcon
              icon={faLock}
              className="pl-2 text-text-neutral-dark"
            />
            <input
              className="focus:outline-none bg-inherit flex-1 placeholder:ml-1 pl-4"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer ml-2 text-text-neutral-dark"
            />
          </div>

          <button
            type="submit"
            className="bg-secondary-purple hover:bg-secondary-purple-light rounded-lg p-2 mt-6 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
