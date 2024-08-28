"use client";

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
    <div className="w-[92.5%] text-white bg-[#333335] h-[500px] overflow-auto custom-scrollbar">
      <div className="w-full p-2 flex justify-around font-bold border-b border-gray-600">
        <div className="w-1/2 text-center">Auditor Name</div>
        <div className="w-1/2 text-center">Status</div>
      </div>
      {auditors.map((auditor, idx) => (
        <div
          key={idx}
          className="w-full p-2 flex justify-around border-b border-gray-600"
        >
          <div className="w-1/2 text-center">{auditor.auditorLogin}</div>
          <div
            className={`w-1/2 text-center ${
              auditor.grade < 1 ? "text-red-400" : "text-green-400"
            }`}
          >
            {auditor.grade < 1 ? "FAIL" : "PASS"}
          </div>
        </div>
      ))}
    </div>
  );
}
