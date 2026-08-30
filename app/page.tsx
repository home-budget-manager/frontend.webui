import { useTranslations } from "next-intl";

import PageContainerComponent from "@/components/pages/page-container";

import Summaries from "@/components/pages/page/summaries";
import Widgets from "@/components/pages/page/widgets";

export default function Page() {
  const t = useTranslations("App/Page");
  return (
    <PageContainerComponent title={t('title')} subtitle={t('subtitle', { name: 'Alex' })}>
      <Summaries />
      <Widgets />
    </PageContainerComponent>
  );
}
