import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";
import { wp, hp } from "@/helpers/screenResize";
import { Colors } from "@/constants/Colors";

export function CustomDrawerContent(props: any) {
    const theme = useColorScheme() ?? "light";

    const menuItems = [
        { name: "Home", icon: "home", route: "index" },
        { name: "Profile", icon: "person", route: "profile" },
        { name: "Favorites", icon: "favorite", route: "favorites" },
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
});
