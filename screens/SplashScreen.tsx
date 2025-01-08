import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { Text } from "@/components/ui/Text";
import { hp, wp } from "../helpers/screenResize";

const SplashScreen: React.FC = () => {
    const theme = useColorScheme() ?? "light";

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[theme].background,
        },
        content: {
            flex: 1,
            paddingTop: hp(10),
            paddingHorizontal: wp(5),
        },
        mainText: {
            color: Colors[theme].text,
            fontSize: wp(8),
            fontWeight: "700",
            textAlign: "left",
            fontFamily: Fonts.Black,
        },
        subText: {
            color: Colors[theme].text,
            fontSize: wp(10),
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.mainText}>Mutfak Asistanı</Text>
                <Text style={styles.subText}>Uygulamasına Hoşgeldiniz!</Text>
            </View>
        </SafeAreaView>
    );
};

export default SplashScreen;
