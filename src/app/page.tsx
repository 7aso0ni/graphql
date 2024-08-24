"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  faEye,
  faEyeSlash,
  faChevronRight,
  faUser,
  faLock,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [identifier, setIdentifier] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPopUpMessage, setShowPopUpMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (identifier.trim() === "" || password.trim() === "")
        throw new Error("Please fill in all the fields");

      // convert data into json object
      const jsonData = JSON.stringify({ identifier, password });

      //TODO: get session cookie from 01
    } catch (error) {
      console.log(error);
      setShowPopUpMessage(true);
      if (typeof error === "string") setErrorMessage(error);
      else if (error instanceof Error) setErrorMessage(error.message);
      else setErrorMessage("An unexpected error happened");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rounded-md [background:linear-gradient(90deg,#5D54A4,#7C78B8)] relative h-[600px] w-[360px] shadow-sm">
        <div className="z-10 relative h-full ">
          <form className="p-[30px] pt-[156px] w-80" onSubmit={handleSubmit}>
            <div className="py-5 px-0 relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute top-8 text-secondary-purple-light"
              />
              <input
                type="text"
                name="identifier"
                placeholder="Username / Email"
                onChange={(e) => setIdentifier(e.target.value)}
                className="border-none [border-bottom:2px_solid_#D1D1D4] active focus hover:outline-none active focus hover:[border-bottom-color:#6A679E] outline-none p-2.5 pl-6 font-bold w-3/4 duration-200 "
              />
            </div>
            <div className="py-5 px-0 relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute top-8 text-secondary-purple-light pt-[1px]"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="border-none [border-bottom:2px_solid_#D1D1D4] active focus hover:outline-none active focus hover:[border-bottom-color:#6A679E] outline-none p-2.5 pl-6 font-bold w-3/4 duration-200"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute top-8 text-secondary-purple-light pt-[1px] right-16 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <button
              type="submit"
              className="relative select-none bg-white text-sm mt-[30px] py-4 px-5 rounded-[26px] [border:1px_solid_#D4D3E8] uppercase font-bold flex items-center w-full text-[#4C489D] [box-shadow:0px_2px_2px_#5C5696] cursor-pointer duration-200 hover:outline-none hover:border-[#6A679E]"
            >
              <span>Log In</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-[#7875B5] absolute text-2xl ml-auto right-4"
              />
            </button>
          </form>
        </div>
        <div className="absolute inset-0 z-0 [clip-path:inset(0_0_0_0)]">
          <span className="rotate-45 absolute h-[520px] w-[520px] bg-white top-[-50px] right-[120px] rounded-r-75 z-10"></span>
          <span className="rotate-45 absolute h-[220px] w-[220px] bg-[#6C63AC] top-[-172px] right-0 rounded-[32px]"></span>
          <span className="rotate-45 absolute h-[540px] w-[190px] bg-gradient-to-l from-[#5D54A4] to-[#6A679E] top-[-24px] right-0 rounded-[32px]"></span>
          <span className="rotate-45 absolute h-[400px] w-[200px] bg-[#7E7BB9] top-[420px] right-[50px] rounded-[60px]"></span>
        </div>
      </div>
    </div>
  );
}
