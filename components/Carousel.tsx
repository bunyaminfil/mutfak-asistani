import React from "react";
import { View, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Text } from "@/components/ui/Text";
import { wp, hp } from "@/helpers/screenResize";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { withTiming } from "react-native-reanimated";

interface CarouselItem {
    title: string;
    url: string;
}

interface CarouselProps {
    data: CarouselItem[];
}

const { width: screenWidth } = Dimensions.get("window");

const MyCarousel: React.FC<CarouselProps> = ({ data }) => {
    const theme = useColorScheme() ?? "light";

    const renderItem = ({ item }: { item: CarouselItem }) => {
        return (
            <View style={styles.slide}>
                <ImageBackground source={{ uri: item.url }} style={styles.image} resizeMode="contain">
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    const baseOptions = {
        vertical: false,
        width: screenWidth,
        height: hp(25),
    };

    return (
        <View style={styles.container}>
            <Carousel
                {...baseOptions}
                loop
                autoPlay={true}
                data={data}
                withAnimation={{
                    type: "timing",
                    config: {
                        duration: 1000,
                    },
                }}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(25),
        alignItems: "center",
        justifyContent: "center",
    },
    slide: {
        flex: 1,
        borderRadius: wp(2),
        marginHorizontal: wp(4),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "#fff",
        fontSize: wp(5),
        fontWeight: "bold",
        textShadowColor: "rgba(0, 0, 0, 0.75)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});

export default MyCarousel;
