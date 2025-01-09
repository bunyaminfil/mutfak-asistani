import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";
import { wp, hp } from "@/helpers/screenResize";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/LanguageContext";

export function CustomDrawerContent(props: any) {
    const { language, setLanguage, t } = useLanguage();
    const theme = useColorScheme() ?? "light";

    const menuItems = [
        { name: t("drawer.home"), icon: "home", route: "index" },
        { name: t("drawer.profile"), icon: "person", route: "profile" },
        { name: t("drawer.favorites"), icon: "favorite", route: "favorites" },
        { name: t("drawer.market"), icon: "shopping-cart", route: "market" },
    ];

    const languages = [
        { code: "en", label: t("languages.en") },
        { code: "tr", label: t("languages.tr") },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <DrawerContentScrollView {...props}>
                <Pressable style={styles.profileSection} onPress={() => props.navigation.navigate("profile")}>
                    <View style={styles.avatarContainer}>
                        <MaterialIcons name="person" size={wp(12)} color="#666" style={styles.avatarIcon} />
                    </View>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileEmail}>john@example.com</Text>
                </Pressable>

                <View style={styles.drawerItems}>
                    {menuItems.map((item, index) => (
                        <Pressable
                            key={index}
                            style={styles.drawerItem}
                            onPress={() => props.navigation.navigate(item.route)}
                        >
                            <MaterialIcons
                                name={item.icon as any}
                                size={wp(6)}
                                color={Colors[theme].text}
                                style={styles.itemIcon}
                            />
                            <Text style={styles.itemText}>{item.name}</Text>
                        </Pressable>
                    ))}
                </View>

                <View style={styles.separator} />

                <View style={styles.languageSection}>
                    <Text style={styles.languageTitle}>{t("languages.language")}</Text>
                    {languages.map((lang) => (
                        <Pressable
                            key={lang.code}
                            style={[styles.languageItem, language === lang.code && styles.languageItemActive]}
                            onPress={() => setLanguage(lang.code as "en" | "tr")}
                        >
                            <Text style={[styles.languageText, language === lang.code && styles.languageTextActive]}>
                                {lang.label}
                            </Text>
                            {language === lang.code && (
                                <MaterialIcons name="check" size={wp(5)} color={Colors.primary} />
                            )}
                        </Pressable>
                    ))}
                </View>
            </DrawerContentScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileSection: {
        padding: wp(4),
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        alignItems: "center",
    },
    avatarContainer: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        backgroundColor: "#eee",
        marginBottom: hp(1),
        justifyContent: "center",
        alignItems: "center",
    },
    avatarIcon: {
        opacity: 0.8,
    },
    profileName: {
        fontSize: wp(4.5),
        fontWeight: "bold",
        marginBottom: hp(0.5),
    },
    profileEmail: {
        fontSize: wp(3.5),
        opacity: 0.7,
    },
    drawerItems: {
        padding: wp(4),
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: hp(1.5),
    },
    itemIcon: {
        marginRight: wp(3),
    },
    itemText: {
        fontSize: wp(4),
    },
    separator: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: hp(2),
        marginHorizontal: wp(4),
    },
    languageSection: {
        padding: wp(4),
    },
    languageTitle: {
        fontSize: wp(4),
        fontWeight: "bold",
        marginBottom: hp(2),
        color: "#666",
    },
    languageItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(2),
        borderRadius: wp(2),
        marginBottom: hp(1),
    },
    languageItemActive: {
        backgroundColor: Colors.primary + "10", // 10% opacity
    },
    languageText: {
        fontSize: wp(4),
        color: "#666",
    },
    languageTextActive: {
        color: Colors.primary,
        fontWeight: "bold",
    },
});
