import { access } from "fs";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

interface AuditStats {
  totalUp: number;
  totalDown: number;
}

export function FetchAuditRatio({
  accessToken,
}: {
  accessToken: string | null;
}) {
  const [options, setOptions] = useState({
    chart: {
      id: "pie-chart",
    },
    labels: ["Total Up", "Total Down"],
    dataLabels: {
      style: {
        colors: ["#fff"], // Custom colors for the labels
      },
    },
    legend: {
      labels: {
        colors: ["#fff", "#fff"],
      },
    },
  });

  const [series, setSeries] = useState<number[]>([0, 0]);

  useEffect(() => {
    const query = `
    {
      user {
        totalUp
        totalDown
      }
    }
    `;
    (async () => {
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
        console.log(await response.json());
        return;
      }

      const data = await response.json();
      //   const username = data.data?.user[0].login;
      const auditStats: AuditStats = {
        totalUp: data.data?.user[0].totalUp,
        totalDown: data.data?.user[0].totalDown,
      };
      //   setUsername(username);
      setSeries([auditStats.totalUp, auditStats.totalDown]);
    })();
  }, [accessToken]);

  return (
    <Chart
      type="pie"
      options={options}
      series={series}
      className="w-[40%] bg-[#333335] p-4 rounded m-4 text-white"
    />
  );
}
