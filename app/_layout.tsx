import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CustomDrawerContent } from "@/components/DrawerContent";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "@/store/redux";

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
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                <Drawer
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                    screenOptions={({ navigation }) => ({
                        headerLeft: () => (
                            <Pressable onPress={() => navigation.openDrawer()} style={{ marginLeft: 16 }}>
                                <MaterialIcons name="menu" size={24} color={colorScheme === "dark" ? "#fff" : "#000"} />
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
                    <Drawer.Screen
                        name="foods"
                        options={{
                            title: "Foods",
                            drawerLabel: "Foods",
                        }}
                    />
                    <Drawer.Screen
                        name="profile"
                        options={{
                            title: "Profile",
                            drawerLabel: "Profile",
                        }}
                    />
                    <Drawer.Screen name="+not-found" options={{ drawerItemStyle: { display: "none" } }} />
                </Drawer>
                <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            </ThemeProvider>
        </Provider>
    );
}
