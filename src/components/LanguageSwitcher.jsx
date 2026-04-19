import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        className={i18n.language === 'en' ? 'active' : ''}
        onClick={() => changeLanguage('en')}
      >
        {t('language.english')}
      </button>
      <button
        className={i18n.language === 'te' ? 'active' : ''}
        onClick={() => changeLanguage('te')}
      >
        {t('language.telugu')}
      </button>
      <button
        className={i18n.language === 'hi' ? 'active' : ''}
        onClick={() => changeLanguage('hi')}
      >
        {t('language.hindi')}
      </button>
    </div>
  );
}

export default LanguageSwitcher;