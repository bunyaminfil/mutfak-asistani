import React, { useState } from "react";
import { StyleSheet, View, FlatList, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { hp, wp } from "@/helpers/screenResize";
import { useAppDispatch, useAppSelector } from "@/store/redux/hook";
import { addItem, removeItem, toggleItem, clearList, MarketItem } from "@/store/redux/slices/market";
import { MaterialIcons } from "@expo/vector-icons";
import { useLanguage } from "@/context/LanguageContext";

const MarketScreen: React.FC = () => {
    const { t } = useLanguage();
    const theme = useColorScheme() ?? "light";
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.marketReducer.items);
    const [newItemName, setNewItemName] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState("");

    const handleAddItem = () => {
        if (newItemName.trim()) {
            dispatch(addItem({
                name: newItemName.trim(),
                quantity: newItemQuantity.trim(),
            }));
            setNewItemName("");
            setNewItemQuantity("");
        }
    };

    const renderItem = ({ item }: { item: MarketItem }) => (
        <View style={styles.itemContainer}>
            <Pressable 
                style={styles.checkbox} 
                onPress={() => dispatch(toggleItem(item.id))}
            >
                <MaterialIcons
                    name={item.checked ? "check-box" : "check-box-outline-blank"}
                    size={24}
                    color={Colors[theme].text}
                />
            </Pressable>
            <View style={styles.itemDetails}>
                <Text style={[
                    styles.itemText,
                    item.checked && styles.checkedText
                ]}>
                    {item.name}
                </Text>
                {item.quantity ? (
                    <Text style={[
                        styles.quantityText,
                        item.checked && styles.checkedText
                    ]}>
                        ({item.quantity})
                    </Text>
                ) : null}
            </View>
            <Pressable 
                onPress={() => dispatch(removeItem(item.id))}
                style={styles.deleteButton}
            >
                <MaterialIcons name="delete" size={24} color={Colors.primary} />
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <Text style={styles.title}>{t("market.title")}</Text>
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={t("market.itemName")}
                    value={newItemName}
                    onChangeText={setNewItemName}
                />
                <TextInput
                    style={[styles.input, styles.quantityInput]}
                    placeholder={t("market.quantity")}
                    value={newItemQuantity}
                    onChangeText={setNewItemQuantity}
                />
                <Pressable onPress={handleAddItem} style={styles.addButton}>
                    <MaterialIcons name="add" size={24} color="#fff" />
                </Pressable>
            </View>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />

            {items.length > 0 && (
                <Pressable 
                    style={styles.clearButton}
                    onPress={() => dispatch(clearList())}
                >
                    <Text style={styles.clearButtonText}>{t("market.clearList")}</Text>
                </Pressable>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    title: {
        fontSize: wp(6),
        fontWeight: "bold",
        margin: wp(4),
    },
    inputContainer: {
        flexDirection: "row",
        paddingHorizontal: wp(4),
        gap: wp(2),
    },
    input: {
        flex: 2,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: wp(2),
        padding: wp(2),
        fontSize: wp(4),
    },
    quantityInput: {
        flex: 1,
    },
    addButton: {
        backgroundColor: Colors.primary,
        borderRadius: wp(2),
        padding: wp(2),
        justifyContent: "center",
        alignItems: "center",
    },
    list: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: wp(4),
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    checkbox: {
        marginRight: wp(3),
    },
    itemDetails: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: wp(2),
    },
    itemText: {
        fontSize: wp(4),
        flex: 1,
        flexWrap: "wrap",
    },
    quantityText: {
        fontSize: wp(3.5),
        color: "#666",
    },
    checkedText: {
        textDecorationLine: "line-through",
        color: "#999",
    },
    deleteButton: {
        padding: wp(2),
    },
    clearButton: {
        margin: wp(4),
        padding: wp(3),
        backgroundColor: Colors.primary,
        borderRadius: wp(2),
        alignItems: "center",
    },
    clearButtonText: {
        color: "#fff",
        fontSize: wp(4),
        fontWeight: "bold",
    },
});

export default MarketScreen; 