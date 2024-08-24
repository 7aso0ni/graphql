"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "../context";
import { useRouter } from "next/navigation";
import { fetchGraphqlData } from "./components/fetchProjectXP";
import Chart from "react-apexcharts";

export default function Home() {
  const { accessToken } = useAppContext();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [options, setOptions] = useState<any>({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
  });
  const [series, setSeries] = useState<any>([]);

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
      return;
    }

    async function getData() {
      try {
        const result = await fetchGraphqlData(accessToken);

        console.log(
          result.xps.map((xp) => xp.path.split("/bahrain/bh-module/")[1])
        );

        setData(result);

        // Set options and series for the chart once data is fetched
        setOptions((prevOptions: any) => ({
          ...prevOptions,
          xaxis: {
            categories: result?.xps.map(
              (xp: any) => xp.path.split("/bahrain/bh-module/")[1]
            ),
          },
        }));

        setSeries([
          {
            name: "XP Amount",
            data: result?.xps.map((xp: any) => xp.amount),
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }

    getData();
  }, [accessToken, router]);

  return (
    <div className="">
      <Chart options={options} series={series} type="bar" width={800} />
    </div>
  );
}
