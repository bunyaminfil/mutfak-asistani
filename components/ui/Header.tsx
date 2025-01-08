import React from "react";
import { StyleProp, View, TextStyle, ViewStyle } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { IconButton } from "./Button";
import { Text } from "./Text";
import { BlueBackArrow, Menu, WhiteBackArrow } from "../icons";
import baseStyles from "@/constants/styles/base";
import { wp } from "../../helpers/screenResize";

interface HeaderProps {
    style?: StyleProp<ViewStyle>;
    title?: string | null;
    withBack?: boolean;
    leftComponent?: React.ReactElement | null;
    rightComponent?: React.ReactElement | null;
    drawer?: boolean;
    onBackPress?: (() => void) | null;
    headerWithIcon?: boolean;
    headerIcon?: React.ReactElement | null;
    titleStyle?: StyleProp<TextStyle>;
    iconColor?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    style,
    title,
    withBack = false,
    leftComponent = null,
    rightComponent = null,
    drawer = false,
    onBackPress = null,
    headerWithIcon = false,
    headerIcon = null,
    titleStyle,
    iconColor = false,
}) => {
    const navigation = useNavigation();

    return (
        <View style={[baseStyles.header, style]}>
            {/* Left Section */}
            <View style={baseStyles.headerLeft}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    {leftComponent
                        ? leftComponent
                        : withBack && (
                              <IconButton
                                  icon={iconColor ? BlueBackArrow : WhiteBackArrow}
                                  onPress={onBackPress || (() => navigation.goBack())}
                                  size={wp(6)}
                              />
                          )}
                </View>
            </View>

            {/* Center Section */}
            <View style={{ flexDirection: "column", alignItems: "center" }}>
                {headerWithIcon && headerIcon}
                <Text type="Bold" color="white" style={[baseStyles.headerTitle, titleStyle]}>
                    {title}
                </Text>
            </View>

            {/* Right Section */}
            <View style={baseStyles.headerRight}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    {rightComponent}
                    {drawer && (
                        <IconButton
                            icon={Menu}
                            size={wp(6)}
                            style={{ marginRight: wp(2) }}
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

export default Header;
