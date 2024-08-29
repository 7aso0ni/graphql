import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function UserSkills({ accessToken }: { accessToken: string | null }) {
  const [options, setOptions] = useState<any>({
    chart: {
      id: "column-chart",
      type: "bar", // Set type to 'bar' for column chart
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [], // Initially an empty array for categories (labels)
      labels: {
        style: {
          colors: [],
          fontSize: "14px",
        },
      },
    },
    yaxis: {
      title: {
        text: "% (percentage)",
        style: {
          color: "#fff",
        },
      },
      labels: {
        style: {
          colors: ["#fff"], // Set the color of the y-axis labels to white
        },
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    tooltip: {
      theme: "dark",
    },
    legend: {
      labels: {
        colors: "#fff", // Set the color of the legend text to white
      },
    },
  });

  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    const query = `
    {
      transaction(
        where: { type: { _like: "skill%" } }
        order_by: { progress: { updatedAt: desc } }
      ) {
        amount
        originEventId
        path
        type
      }
    }
    `;

    (async () => {
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
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const transactions = data.data.transaction;

        const latestTransactionsMap = new Map<string, number>();

        transactions.forEach((item: any) => {
          const type = item.type.replace("skill_", "");
          if (!latestTransactionsMap.has(type)) {
            latestTransactionsMap.set(type, item.amount);
          }
        });

        const skills = Array.from(latestTransactionsMap.keys());
        const amounts = Array.from(latestTransactionsMap.values());

        if (skills.length === 0 || amounts.length === 0) {
          console.warn("No data available for the chart.");
        } else {
          console.log("Skills:", skills);
          console.log("Amounts:", amounts);

          setOptions((prevOptions: any) => ({
            ...prevOptions,
            xaxis: {
              categories: skills, // Update the categories (x-axis labels)
              labels: {
                style: {
                  colors: Array(skills.length).fill("#fff"), // Set all label colors to white
                },
              },
            },
          }));

          setSeries([{ name: "Skills", data: amounts }]); // Update the series data
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accessToken]);

  return (
    <div>
      {series.length > 0 ? (
        <Chart
          type="bar"
          options={options}
          series={series}
          height={500}
          width={700}
          className="w-[100%] bg-[#333335]  rounded m-4 text-white"
        />
      ) : (
        <p>No data available for the chart.</p>
      )}
    </div>
  );
}
