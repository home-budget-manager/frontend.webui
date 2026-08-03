import PageContainerComponent from "@/components/pages/page-container";

import Summaries from "@/components/pages/page/summaries";
import Widgets from "@/components/pages/page/widgets";

export default function Page() {
  return (
    <PageContainerComponent title="Dashboard" subtitle="Welcome back, Alex. Here's your financial overview.">
      <Summaries />
      <Widgets />
    </PageContainerComponent>
  );
}
