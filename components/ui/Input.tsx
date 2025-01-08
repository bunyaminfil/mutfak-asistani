import React from "react";
import { Text } from "./Text";
import { TextInput, TextInputProps, StyleSheet, StyleProp, TextStyle } from "react-native";
import { Colors } from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { FontTypes, ColorTypes } from "@/constants";
import { wp } from "../../helpers/screenResize";
import { useColorScheme } from "react-native";

interface ICustomInputProps extends Omit<TextInputProps, 'style'> {
    type?: FontTypes;
    backgroundColor?: ColorTypes;
    borderRadius?: ColorTypes;
    size?: number;
    align?: "center" | "left" | "right";
    label: string;
    style?: StyleProp<TextStyle>;
}

export const Input = ({ type, backgroundColor, size, align, label, style, ...props }: ICustomInputProps) => {
    const theme = useColorScheme() ?? 'light';
    return (
        <>
            <Text size={wp(4)} color={theme}>
                {label}
            </Text>
            <TextInput
                {...props}
                style={[
                    styles.input,
                    {
                        textAlign: align || "left",
                        backgroundColor: backgroundColor ? Colors[theme].background : Colors[theme].background,
                        fontSize: size,
                        fontFamily: type ? Fonts[type] : Fonts.Regular,
                    },
                    style,
                ]}
            />
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        marginTop: wp(3),
        marginBottom: wp(3),
    }
});
