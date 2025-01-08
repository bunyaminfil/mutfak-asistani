import React from "react";
import { Text as RNText, TextProps } from "react-native";
import { Colors } from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { FontTypes, ColorTypes } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";

interface IText extends TextProps {
    type?: FontTypes;
    color?: ColorTypes;
    size?: number;
    children: React.ReactElement | string | any;
    align?: "center" | "left" | "right";
}

export const Text = (props: IText) => {
    const theme = useColorScheme() ?? "light";
    return (
        <RNText
            {...props}
            style={[
                {
                    textAlign: props.align || "left",
                    color: props.color
                        ? (Colors[props.color] as any)[theme]?.text || Colors[props.color]
                        : Colors[theme].text,
                    fontSize: props.size,
                },
                props.style,
                { fontFamily: props.type ? Fonts[props.type] : Fonts.Regular },
            ]}
        >
            {props.children}
        </RNText>
    );
};
