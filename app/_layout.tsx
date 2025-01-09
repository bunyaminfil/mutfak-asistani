import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CustomDrawerContent } from "@/components/DrawerContent";
import { Pressable, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "@/store/redux";
import { LanguageProvider } from "@/context/LanguageContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <LanguageProvider>
                <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                    <Drawer
                        drawerContent={(props) => <CustomDrawerContent {...props} />}
                        screenOptions={({ navigation }) => ({
                            headerLeft: () => (
                                <Pressable 
                                    onPress={() => navigation.openDrawer()} 
                                    style={{ 
                                        marginLeft: Platform.OS === "ios" ? 8 : 16,
                                        padding: 8 
                                    }}
                                >
                                    <MaterialIcons
                                        name="menu"
                                        size={24}
                                        color={colorScheme === "dark" ? "#fff" : "#000"}
                                    />
                                </Pressable>
                            ),
                        })}
                    >
                        <Drawer.Screen
                            name="index"
                            options={{
                                title: "Home",
                                drawerLabel: "Home",
                            }}
                        />
                        {/* <Drawer.Screen
                            name="profile"
                            options={{
                                title: "Profile",
                                drawerLabel: "Profile",
                            }}
                        /> */}
                        <Drawer.Screen
                            name="favorites"
                            options={{
                                title: "Favorites",
                                drawerLabel: "Favorites",
                            }}
                        />
                        <Drawer.Screen
                            name="category"
                            options={{
                                title: "Category",
                                drawerItemStyle: { display: "none" },
                            }}
                        />
                        <Drawer.Screen
                            name="meal"
                            options={{
                                title: "Meal Details",
                                drawerItemStyle: { display: "none" },
                            }}
                        />
                        <Drawer.Screen
                            name="market"
                            options={{
                                title: "Shopping List",
                                drawerLabel: "Shopping List",
                                drawerIcon: ({ size, color }) => (
                                    <MaterialIcons name="shopping-cart" size={size} color={color} />
                                ),
                            }}
                        />
                        <Drawer.Screen name="+not-found" options={{ drawerItemStyle: { display: "none" } }} />
                    </Drawer>
                    <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
                </ThemeProvider>
            </LanguageProvider>
        </Provider>
    );
}
