import { useTranslations } from "next-intl";

import "./page.scss";

export default function Page() {
  const t = useTranslations("App/Page");
  return (
    <div className="dashboard">
      <h1>{t('title')}</h1>
      <p>{t('subtitle', { name: 'Alex' })}</p>
    </div>
  );
}
