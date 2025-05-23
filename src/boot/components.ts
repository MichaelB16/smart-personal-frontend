import { boot } from 'quasar/wrappers';

const components = {
  AppAlert: () => import('src/shared/components/AppAlert.vue'),
  AppLoading: () => import('src/shared/components/AppLoading.vue'),
  AppTitlePage: () => import('src/shared/components/AppTitlePage.vue'),
  AppModal: () => import('src/shared/components/AppModal.vue'),
  AppFormFooter: () => import('src/shared/components/AppFormFooter.vue'),
  AppInput: () => import('src/shared/components/AppInput.vue'),
  AppInputMoney: () => import('src/shared/components/AppInputMoney.vue'),
  AppSelect: () => import('src/shared/components/AppSelect.vue'),
  AppCard: () => import('src/shared/components/AppCard.vue'),
  AppLogo: () => import('src/shared/components/AppLogo.vue'),
};

import { Money3Directive } from 'v-money3';

export default boot(async ({ app }) => {
  // app.config.globalProperties.$q.dark.set(true);
  app.directive('money', Money3Directive);
  for (const [name, component] of Object.entries(components)) {
    app.component(name, (await component()).default);
  }
});
