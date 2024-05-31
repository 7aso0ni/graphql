"use client";

import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");

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
          <img src="/graphql-logo.png" alt="" className="h-32 w-32" />
        </div>

        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col gap-4 text-black mb-5"
        >
          <input
            className="focus:outline-none border-b border-black bg-inherit"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="focus:outline-none border-b bg-inherit border-black placeholder: ml-1"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-400 hover:bg-secondary-purple rounded-lg p-2 mt-5"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
