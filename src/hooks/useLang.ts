import { useTranslation } from 'react-i18next';

const useLang = (name: string) => {
  const translation = useTranslation();

  const getLang = (key: string) => translation.t(`${name}.${key}`);

  return {
    getLang,
  };
};

export default useLang;
