import React, { useState, useEffect } from "react";

interface AuditResult {
  auditorLogin: string;
  grade: number;
}

export function AuditorLogin({ accessToken }: { accessToken: string | null }) {
  const [auditors, setAuditors] = useState<AuditResult[]>([]);
  useEffect(() => {
    (async () => {
      const query = `
    {
      audit(
        where: {
          auditorLogin: { _neq: "halmakan" },
          _and: { grade: { _gte: 0 } }
        }
      ) {
        auditorLogin
        grade
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

        const data = await response.json();
        const auditors = data.data.audit;

        const auditorsResult: AuditResult[] = [];
        auditors.forEach((auditor: AuditResult) => {
          auditorsResult.push(auditor);
        });

        setAuditors(auditorsResult);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accessToken]);

  return (
    <div className="w-[92.5%] text-white bg-[#333335] h-[500px] overflow-auto w-custom-scrollbar">
      {auditors.map((auditor, idx) =>
        auditor.grade < 1 ? (
          <div key={idx} className="w-full p-2 flex justify-around">
            <div className="px-4 flex justify-center items-center">
              <div>{auditor.auditorLogin}</div>
            </div>
            <div className="px-4 flex justify-center items-center">
              <div className="text-red-400">FAIL</div>
            </div>
          </div>
        ) : (
          <div key={idx} className="w-full p-2 flex justify-around ">
            <div className="px-4 flex justify-center items-center">
              <div>{auditor.auditorLogin}</div>
            </div>
            <div className="px-4 flex justify-center items-center">
              <div className="text-green-400">PASS</div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
