import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.eu.jiale0709.oasis',
  appName: 'Oasis',
  webDir: 'out',
  plugins: {
    LocalNotifications: {
      iconColor: "#BEF264",
      sound: null,
    },
  },
};

export default config;
