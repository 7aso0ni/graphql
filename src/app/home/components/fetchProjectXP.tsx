"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Chart component from ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface XP {
  path: string;
  amount: number;
}

interface result {
  login: string;
  xps: XP[];
}

export function ProjectXP({ accessToken }: { accessToken: string | null }) {
  const [options, setOptions] = useState<any>({
    chart: {
      id: "basic-line",
    },
    xaxis: {
      categories: [],
      tickPlacement: "on",
      labels: {
        show: false,
        style: {
          fontSize: "11px",
          colors: "", // Use a string for a single color
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
          colors: "#fff", // Use a string for a single color
        },
      },
    },
    markers: {
      size: 5,
    },
    tooltip: {
      theme: "dark",
      style: {
        colors: ["#000"],
      },
    },
  });
  const [series, setSeries] = useState<any>([]);

  useEffect(() => {
    setOptions((prevOptions: any) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        labels: {
          ...prevOptions.xaxis.labels,
          style: {
            ...prevOptions.xaxis.labels.style,
            colors: "#fff", // Ensuring color is white
          },
        },
      },
      yaxis: {
        ...prevOptions.yaxis,
        labels: {
          ...prevOptions.yaxis.labels,
          style: {
            ...prevOptions.yaxis.labels.style,
            colors: "#fff", // Ensuring color is white
          },
        },
      },
    }));
  }, []);

  useEffect(() => {
    (async () => {
      const query = `
      {
        user {
          login
          xps(
            order_by: { amount: desc },
            where: { path: { _regex: "^/bahrain/bh-module/(?!piscine-js|checkpoint).*" } }
          ) {
            path
            amount
          }
        }
      }
      `;

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

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error);
        }

        const data = await response.json();
        const result: result = data.data.user[0];

        setOptions((prevOptions: any) => ({
          ...prevOptions,
          xaxis: {
            categories: result?.xps
              .map((xp: XP) => xp.path.split("/bahrain/bh-module/"))
              .reverse(),
          },
        }));

        setSeries([
          {
            name: "XP Amount",
            data: result?.xps.map((xp: any) => xp.amount).reverse(),
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accessToken]);

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      className="w-[45%] bg-[#333335] p-4 rounded m-4 text-white"
    />
  );
}
