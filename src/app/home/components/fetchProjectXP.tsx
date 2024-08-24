import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

interface XP {
  path: string;
  amount: number;
}

interface result {
  login: string;
  projects: XP[];
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
        show: true,
        style: {
          fontSize: "11px",
          colors: "#fff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
          colors: "#fff",
        },
      },
    },
    markers: {
      size: 5,
    },
  });
  const [series, setSeries] = useState<any>([]);

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
        const result = data.data.user[0];

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
    <div className="w-[55%] bg-[#333335] p-4 rounded m-4">
      <Chart options={options} series={series} type="line" width={800} />
    </div>
  );
}
