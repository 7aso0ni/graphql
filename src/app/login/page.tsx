import React from "react";

export default function Login() {
  return (
    <div className="bg-gradient-bg bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center">
      <div className="bg-white p-10 drop-shadow">
        <form action="" className="flex flex-col gap-4 text-black ">
          <input
            className="focus:outline-none border-b border-black"
            type="text"
            placeholder="Username"
          />
          <input
            className="focus:outline-none border-b border-black placeholder: ml-1"
            type="password"
            placeholder="Password"
          />
        </form>
      </div>
    </div>
  );
}
