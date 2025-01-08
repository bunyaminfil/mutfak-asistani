import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { hp, wp } from "../../helpers/screenResize";
import { TouchableOpacity, View, Text } from "react-native";

export const RadioButton = ({ label, selected, onPress }: any) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                    style={{
                        height: 24,
                        width: 24,
                        borderWidth: 2,
                        borderColor: selected ? Colors.lime : Colors.white,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {selected && (
                        <View
                            style={{
                                height: 16,
                                width: 16,
                                backgroundColor: Colors.lime,
                            }}
                        />
                    )}
                </View>
                <Text
                    style={{
                        color: selected ? Colors.lime : Colors.white,
                        marginLeft: 8,
                        fontSize: wp(5),
                    }}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
