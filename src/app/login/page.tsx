"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Image from "next/image";
import {
  faEye,
  faEyeSlash,
  faUser,
  faLock,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPopUpMessage, setShowPopUpMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (username.trim() === "" || password.trim() === "")
        throw new Error("Please fill in all the fields");

      // convert data into json object
      const jsonData = JSON.stringify({ username, password });

      //TODO: get session cookie from 01
    } catch (error) {
      setShowPopUpMessage(true);
      if (typeof error === "string") setErrorMessage(error);
      else if (error instanceof Error) setErrorMessage(error.message);
      else setErrorMessage("An unexpected error happened");
    }
  };

  return (
    <div className="bg-primary-dark-bg h-screen flex items-center justify-center">
      <div className="bg-neutral-light shadow-lg w-auto max-h-md flex flex-row">
        <Image
          src="/Login-amico.png"
          alt="Login Illustration"
          className=" "
          width={500}
          height={300}
        />
        <div className="px-12 flex flex-col justify-evenly">
          {showPopUpMessage && (
            <div className="flex flex-row items-center py-3 px-3 justify-between bg-red-300 rounded">
              <p className="text-sm">{errorMessage}</p>
              <FontAwesomeIcon
                icon={faX}
                className="hover:cursor-pointer"
                onClick={() => setShowPopUpMessage(false)}
              />
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-5 text-black mb-5"
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
    </div>
  );
}
