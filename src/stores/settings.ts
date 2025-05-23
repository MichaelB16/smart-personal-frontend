import { defineStore } from 'pinia';
import { IMenu } from 'src/shared/model/menu.type';
import { settingsService } from 'src/modules/personal/settings/services/SettingsService';
import { useNotification } from 'src/shared/composable/notification';
const { success, error } = useNotification();
export const useSettingStore = defineStore('settings', {
  state: () => ({
    widthPage: 0,
    menuMini: false,
    isMobile: false,
    loadingSetting: false,
    isDark: false,
    setting: {
      menu: [] as IMenu[],
    },
    userData: {
      name: '',
      phone: '',
      logo: '',
    },
  }),
  actions: {
    SET_MENU_MINI(value) {
      this.menuMini = value;
    },
    SET_WIDTH_PAGE(value) {
      this.widthPage = value;
    },
    SET_IS_MOBILE(value) {
      this.isMobile = value;
    },
    async requestSettings() {
      this.loadingSetting = true;
      await settingsService
        .getSettings()
        .then(({ data }) => {
          this.setting = data;
          this.userData = data.user;
        })
        .finally(() => {
          this.loadingSetting = false;
        });
    },
    async requestSetSettings(data) {
      await settingsService
        .saveSettings(data)
        .then(async () => {
          success();
          await this.requestSettings();
        })
        .catch(() => error());
    },
  },
});
