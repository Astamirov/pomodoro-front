import { useTranslation } from 'react-i18next';

const Language = () => {

  const { t, i18n } = useTranslation();


  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <button onClick={() => changeLanguage("en")}>EN</button>
      <button onClick={() => changeLanguage("ru")}>RU</button>
      <div>{t("text")}</div>
      <div>{t("hello")}</div>
    </>
  )
}

export default Language