import { I18nextProvider } from 'react-i18next';
import i18n from 'locales';

const I18nProvider = props => <I18nextProvider i18n={i18n} {...props} />;

export default I18nProvider;
