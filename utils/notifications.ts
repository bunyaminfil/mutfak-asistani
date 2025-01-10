import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function requestNotificationPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    return finalStatus === "granted";
}

export async function scheduleNotification(title: string, body: string, trigger: any) {
    try {
        // Cancel any existing notifications with the same title
        const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
        for (const notification of scheduledNotifications) {
            if (notification.content.title === title) {
                await Notifications.cancelScheduledNotificationAsync(notification.identifier);
            }
        }

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("meal-reminders", {
                name: "Meal Reminders",
                importance: Notifications.AndroidImportance.MAX,
                sound: "notification.wav",
                enableVibrate: true,
                enableLights: true,
            });
        }
        const triggers: any = {
            hour: trigger.hour,
            minute: trigger.minute,
            repeats: true,
            type: "daily",
        };
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: "notification.wav",
                priority: Notifications.AndroidNotificationPriority.MAX,
            },
            trigger: triggers,
        });

        console.log(`Scheduled daily notification for ${trigger.hour}:${trigger.minute}`);
        return identifier;
    } catch (error) {
        console.error("Error scheduling notification:", error);
        throw error;
    }
}

export function configurePushNotifications() {
    // Configure how notifications are handled
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
            priority: Notifications.AndroidNotificationPriority.MAX,
        }),
    });

    // Add notification listeners for debugging
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
    });

    return () => {
        subscription.remove();
        responseSubscription.remove();
    };
}
