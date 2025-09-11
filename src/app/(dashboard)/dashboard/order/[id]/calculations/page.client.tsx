"use client";

import React from "react";

import { useQueryState } from "nuqs";

import AdditionalServicesTable from "@/features/calculations/ui/additional-services-table";
import ApplicationPostTable from "@/features/calculations/ui/application-post-table";
import ApplicationRealTable from "@/features/calculations/ui/application-real-table";
import ApproxTimeTable from "@/features/calculations/ui/approx-time-table";
import CalculationsTable from "@/features/calculations/ui/calculations-table";
import CommercialProposalTable from "@/features/calculations/ui/commercial-proposal-table";
import DetailsTable from "@/features/calculations/ui/details-table";
import { CalculationsNavbar } from "@/features/calculations/ui/nav-bar";
import ResultsPanel from "@/features/calculations/ui/results-panel";
import HeaderNav from "@/features/order/ui/header-nav";

export default function CalculationsPageClient({ id }: { id: string }) {
  const [activeTab] = useQueryState("tab", {
    defaultValue: "all-calculations",
  });

  return (
    <div>
      <HeaderNav orderId={id} activeTab="Прорахунки" />
      <CalculationsNavbar orderId={id} />

      {/* Show Results Panel only when tab is "result" */}
      {activeTab === "result" && <ResultsPanel />}
      {/* Show Application Real Table when tab is "application-real" */}
      {activeTab === "application-real" && <ApplicationRealTable />}
      {/* Show Application Post Table when tab is "application-post" */}
      {activeTab === "application-post" && <ApplicationPostTable />}
      {/* Show Details Table when tab is "detailed-calculation" */}
      {activeTab === "additional-services" && <AdditionalServicesTable />}

      {(activeTab === "detailed-calculation" ||
        activeTab === "additional-services" ||
        activeTab === "initial-data" ||
        activeTab === "application-real" ||
        activeTab === "application-post") && <DetailsTable />}

      {/* Show Commercial Proposal Table when tab is "commercial-proposal" */}
      {activeTab === "commercial-proposal" && <CommercialProposalTable />}

      {/* Show Approx Time Table when tab is "approx-time" */}
      {activeTab === "approx-time" && <ApproxTimeTable />}

      {/* Show Calculations Table for other tabs */}
      {activeTab === "all-calculations" && <CalculationsTable />}
    </div>
  );
}
