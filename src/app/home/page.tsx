"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectXP } from "./components/fetchProjectXP";
import { FetchAuditRatio } from "./components/fetchAuditRatio";
import { AuditorLogin } from "./components/fetchAuditorLogin";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const accessToken = localStorage.getItem("tempSession");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
      return;
    }

    const query = `
    {
      user {
        login
      }
    }
    `;

    async function fetchUsername() {
      try {
        const response = await fetch(
          "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ query }),
          }
        );

        const data = await response.json();
        setUsername(data.data.user[0].login);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsername();
  }, [accessToken, router]);

  return (
    <div className="overflow-x-hidden items-center flex flex-col">
      <div className="w-full bg-[#333335] h-12 flex justify-between items-center text-white px-4">
        <span className="text-lg font-semibold ml-11">{username}</span>
        <Link
          onClick={() => localStorage.removeItem("tempSession")}
          href="/"
          className="hover:text-gray-300 transition-colors duration-200 mr-11"
        >
          Logout
        </Link>
      </div>

      <div className="flex justify-around w-full">
        <ProjectXP accessToken={accessToken} />
        <FetchAuditRatio accessToken={accessToken} />
      </div>
      <AuditorLogin accessToken={accessToken} />
    </div>
  );
}
