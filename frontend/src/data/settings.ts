export interface PlatformSettings {
  theme: "system";
  language: "en-IN";
  timezone: "Asia/Kolkata";
  notifications: {
    alerts: boolean;
    reports: boolean;
    scenarioUpdates: boolean;
  };
  integrations: {
    weatherFeed: "planned";
    logisticsFeed: "planned";
    governmentDataExchange: "planned";
  };
  displayTime: string;
  displayDate: string;
}

export const settings: PlatformSettings = {
  theme: "system",
  language: "en-IN",
  timezone: "Asia/Kolkata",
  notifications: {
    alerts: true,
    reports: true,
    scenarioUpdates: true
  },
  integrations: {
    weatherFeed: "planned",
    logisticsFeed: "planned",
    governmentDataExchange: "planned"
  },
  displayTime: "11:42 AM",
  displayDate: "28 Nov 2024"
};
