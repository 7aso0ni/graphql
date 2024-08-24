"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "../context";
import { useRouter } from "next/navigation";
import { ProjectXP } from "./components/fetchProjectXP";
import Chart from "react-apexcharts";

export default function Home() {
  // const { accessToken } = useAppContext();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const accessToken = localStorage.getItem("tempSession");

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
      return;
    }
  }, [accessToken, router]);

  return (
    <div className="">
      <ProjectXP accessToken={accessToken} />
    </div>
  );
}
