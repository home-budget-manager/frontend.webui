import { useTranslations } from "next-intl";

import PageLayout from "../layouts/page-layout";
import DashboardPage from "../features/dashboard/dashboard-page";

export default function Page() {
  const t = useTranslations("App/Page");
  return (
    <PageLayout title={t('title')} subtitle={t('subtitle', { name: 'Alex' })}>
      <DashboardPage />
    </PageLayout>
  );
}
