"use client";

import { useState, useEffect } from "react";
import { pageService } from "@/services/pages/page";

import SummaryCard from "@/components/pages/page/summary-card";
import styles from "./summaries.module.css";

interface Summary {
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}

function formatCurrency(n: number) {
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function Summaries() {
  const [summaries, setSummaries] = useState<Summary[]>([]);

  useEffect(() => {
    async function fetchSummaries() {
      try {
        const response = await pageService.fetchSummaries();
        setSummaries(response.summaries.map((summary) => ({
          label: summary.label, value: formatCurrency(summary.value), change: summary.change, positive: summary.positive
        })));
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    }

    fetchSummaries();
  }, []);

  return (<div className={styles["summary-grid"]}>
    {summaries.map((summary) => (
      <SummaryCard
        key={summary.label}
        label={summary.label}
        value={summary.value}
        change={summary.change}
        positive={summary.positive}
      />
    ))}
  </div>);
}