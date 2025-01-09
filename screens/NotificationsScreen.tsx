import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Pressable, Switch, Platform, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { hp, wp } from "@/helpers/screenResize";
import { useAppDispatch, useAppSelector } from "@/store/redux/hook";
import { MaterialIcons } from "@expo/vector-icons";
import { useLanguage } from "@/context/LanguageContext";
import {
    addNotification,
    toggleNotification,
    NotificationItem,
    removeNotification,
} from "@/store/redux/slices/notifications";
import { requestNotificationPermissions, scheduleNotification } from "@/utils/notifications";

const NotificationsScreen: React.FC = () => {
    const { t } = useLanguage();
    const theme = useColorScheme() ?? "light";
    const dispatch = useAppDispatch();
    const notifications = useAppSelector((state) => state.notificationsReducer.items);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedType, setSelectedType] = useState<"meal" | "market" | "general">("general");
    const [customTitle, setCustomTitle] = useState("");
    const [customBody, setCustomBody] = useState("");

    useEffect(() => {
        requestNotificationPermissions();
    }, []);

    const handleAddNotification = async () => {
        const hours = selectedTime.getHours();
        const minutes = selectedTime.getMinutes();
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        const newNotification = {
            type: selectedType,
            time: timeString,
            enabled: true,
            days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
            title: selectedType === "general" ? customTitle : t(`notifications.${selectedType}Title`),
            body: selectedType === "general" ? customBody : t(`notifications.${selectedType}Body`),
        };

        if (selectedType === "general" && (!customTitle.trim() || !customBody.trim())) {
            Alert.alert(t("notifications.error"), t("notifications.errorMessage"));
            return;
        }

        dispatch(addNotification(newNotification));

        // Schedule the notification
        const trigger = {
            hour: selectedTime.getHours(),
            minute: selectedTime.getMinutes(),
            repeats: true,
        };

        await scheduleNotification(newNotification.title, newNotification.body, trigger);

        // Clear custom inputs after adding
        setCustomTitle("");
        setCustomBody("");
    };

    const renderItem = ({ item }: { item: NotificationItem }) => (
        <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
                <MaterialIcons
                    name={
                        item.type === "meal" ? "restaurant" : item.type === "market" ? "shopping-cart" : "notifications"
                    }
                    size={24}
                    color={Colors[theme].text}
                />
                <View style={styles.notificationDetails}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationMessage}>{item.body}</Text>
                    <Text style={styles.notificationTime}>
                        {item.time.split(':').slice(0, 2).join(':') + ' ' + 
                        (parseInt(item.time.split(':')[0]) >= 12 ? 'PM' : 'AM')}
                    </Text>
                </View>
            </View>
            <View style={styles.actionButtons}>
                <Switch
                    value={item.enabled}
                    onValueChange={(value: boolean) => {
                        dispatch(toggleNotification(item.id));
                    }}
                    trackColor={{ false: "#767577", true: Colors.primary }}
                />
                <Pressable
                    onPress={() => {
                        Alert.alert(t("notifications.deleteTitle"), t("notifications.deleteMessage"), [
                            {
                                text: t("notifications.cancel"),
                                style: "cancel",
                            },
                            {
                                text: t("notifications.delete"),
                                onPress: () => dispatch(removeNotification(item.id)),
                                style: "destructive",
                            },
                        ]);
                    }}
                    style={styles.deleteButton}
                >
                    <MaterialIcons name="delete" size={24} color={Colors.primary} />
                </Pressable>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <Text style={styles.title}>{t("notifications.title")}</Text>

            <View style={styles.addSection}>
                <View style={styles.typeSelector}>
                    {["meal", "market", "general"].map((type) => (
                        <Pressable
                            key={type}
                            style={[styles.typeButton, selectedType === type && styles.selectedType]}
                            onPress={() => setSelectedType(type as any)}
                        >
                            <Text style={[styles.typeText, selectedType === type && styles.selectedTypeText]}>
                                {t(`notifications.${type}`)}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <Pressable style={styles.timeSelector} onPress={() => setShowTimePicker(true)}>
                    <MaterialIcons name="access-time" size={24} color={Colors[theme].text} />
                    <Text style={styles.timeText}>
                        {selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                </Pressable>

                {showTimePicker && (
                    <DateTimePicker
                        value={selectedTime}
                        mode="time"
                        is24Hour={true}
                        onChange={(event, date) => {
                            setShowTimePicker(Platform.OS === "ios");
                            if (date) setSelectedTime(date);
                        }}
                    />
                )}

                {selectedType === "general" && (
                    <View style={styles.customInputs}>
                        <TextInput
                            style={styles.input}
                            placeholder={t("notifications.customTitle")}
                            value={customTitle}
                            onChangeText={setCustomTitle}
                        />
                        <TextInput
                            style={[styles.input, styles.messageInput]}
                            placeholder={t("notifications.customMessage")}
                            value={customBody}
                            onChangeText={setCustomBody}
                            multiline
                        />
                    </View>
                )}

                <Pressable style={styles.addButton} onPress={handleAddNotification}>
                    <Text style={styles.addButtonText}>{t("notifications.add")}</Text>
                </Pressable>
            </View>

            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    title: {
        fontSize: wp(6),
        fontWeight: "bold",
        margin: wp(4),
    },
    addSection: {
        padding: wp(4),
        backgroundColor: "#fff",
        borderRadius: wp(2),
        marginHorizontal: wp(4),
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    typeSelector: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: hp(2),
    },
    typeButton: {
        padding: wp(3),
        borderRadius: wp(2),
        backgroundColor: "#f0f0f0",
        flex: 1,
        marginHorizontal: wp(1),
    },
    selectedType: {
        backgroundColor: Colors.primary,
    },
    typeText: {
        textAlign: "center",
        fontSize: wp(3.5),
    },
    selectedTypeText: {
        color: "#fff",
    },
    timeSelector: {
        flexDirection: "row",
        alignItems: "center",
        padding: wp(3),
        backgroundColor: "#f0f0f0",
        borderRadius: wp(2),
        marginBottom: hp(2),
    },
    timeText: {
        marginLeft: wp(2),
        fontSize: wp(4),
    },
    addButton: {
        backgroundColor: Colors.primary,
        padding: wp(3),
        borderRadius: wp(2),
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: wp(4),
        fontWeight: "bold",
    },
    list: {
        flex: 1,
        marginVertical: wp(4),
    },
    notificationItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: wp(4),
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    notificationInfo: {
        flexDirection: "row",
        alignItems: "flex-start",
        flex: 1,
    },
    notificationDetails: {
        marginLeft: wp(3),
        flex: 1,
    },
    notificationTitle: {
        fontSize: wp(4),
        fontWeight: "500",
        flexWrap: "wrap",
    },
    notificationMessage: {
        fontSize: wp(3.5),
        color: "#666",
        marginTop: hp(0.5),
        flexWrap: "wrap",
        marginRight: wp(2),
    },
    notificationTime: {
        fontSize: wp(3.5),
        color: "#666",
        marginTop: hp(0.5),
    },
    actionButtons: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp(2),
    },
    deleteButton: {
        padding: wp(1),
    },
    customInputs: {
        gap: hp(1),
        marginBottom: hp(2),
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: wp(2),
        padding: wp(2),
        fontSize: wp(4),
    },
    messageInput: {
        height: hp(10),
        textAlignVertical: "top",
    },
});

export default NotificationsScreen;
