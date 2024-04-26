import 'i18next';

// Constant
import tr from '../constants/translations/tr';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      login: typeof tr.login;
      main: typeof tr.main;
      drawer: typeof tr.drawer;
      forms: typeof tr.forms;
      sellers: typeof tr.sellers;
    };
  }
}
