"use client";

import PageContainerComponent from "@/components/pages/page-container";
import { use } from "react";

export default function MyAccountPage({
  params,
}: {
  params: Promise<{ accountId: string }>
}) {
  const { accountId } = use(params)
 
    return (
        <PageContainerComponent title="Account details" subtitle={`Details of account with id: ${accountId}`}>
            <p>Details of account with id: {accountId}</p>
        </PageContainerComponent>
    );
}