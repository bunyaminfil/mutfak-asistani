import React from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle, TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

interface ICustomButtonProps {
    title: string;
    onPress: () => void;
    style: StyleProp<ViewStyle>;
    buttonText: StyleProp<TextStyle>;
}

interface IIconButton extends TouchableOpacityProps {
    icon: React.FC<SvgProps>;
    size: number;
    style?: StyleProp<ViewStyle>;
}

export const Button = (props: ICustomButtonProps) => {
    return (
        <TouchableOpacity style={props.style} onPress={props.onPress}>
            <Text style={props.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export const IconButton: React.FC<IIconButton> = ({ icon: Icon, size, style, onPress, ...props }) => {
    return (
        <TouchableOpacity {...props} style={style} onPress={onPress}>
            <Icon width={size} height={size} />
        </TouchableOpacity>
    );
};
