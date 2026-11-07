import { useTranslations } from "next-intl";


export default function Page() {
  const t = useTranslations("App/Page");
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle', { name: 'Alex' })}</p>
    </div>
  );
}
