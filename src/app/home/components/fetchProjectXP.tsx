import { useAppContext } from "@/app/context";

interface XP {
  path: string;
  amount: number;
}

interface result {
  login: string;
  projects: XP[];
}

export async function fetchGraphqlData(accessToken: string | null) {
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
    return result;
  } catch (error) {
    console.log(error);
  }
}
