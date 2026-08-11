"use client";

import { use } from "react";

import PageContainerComponent from "@/components/pages/page-container";

export interface MyAccountPageParameters {
  accountId: string;
}

export default function MyAccountPage({ params }: { params: Promise<MyAccountPageParameters> }) {
  const { accountId } = use(params)

  return (
    <PageContainerComponent
      title="Account details"
      subtitle={`Details of account with id: ${accountId}`}
      backlink="/my-accounts"
      backlinkLabel="Back to My Accounts list">
      <p>Details of account with id: {accountId}</p>
    </PageContainerComponent>
  );
}