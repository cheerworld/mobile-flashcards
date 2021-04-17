import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NOTIFICATION_KEY = "Notifications";

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
    .catch((err) => console.error("Problem with clearLocalNotification:", err))
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      console.log("notification key ", data);
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            console.log("status", status);
            if (status === "granted") {

              Notifications.cancelAllScheduledNotificationsAsync()

              Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldPlaySound: true,
                  shouldShowAlert: true,
                  shouldSetBadge: false
                })
              })

              Notifications.scheduleNotificationAsync({
                content: {
                  title: "Log your stats",
                  body: "👋 Hey! Don't forget to log your stats for today!",
                },
                trigger: {
                  hour: 17,
                  minute: 0,
                  repeats: true,
                },
              })
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
          .catch((err) => console.error("Problem with asking notification permissions:", err))
      }
    })
    .catch((err) => console.error("Problem with getting NOTIFICATION_KEY:", err))
}
