import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { hp, wp } from "@/helpers/screenResize";
import { useAppDispatch, useAppSelector } from "@/store/redux/hook";
import { getMenu } from "@/store/redux/slices/foods";
import { LoadingTypes } from "@/types/loadingTypes";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import ErrorOverlay from "@/components/ui/ErrorOverlay";
import FoodCard from "@/components/cards/FoodCard";

interface FoodItem {
    strCategory: string;
    idCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

const FoodsScreen: React.FC = () => {
    const theme = useColorScheme() ?? "light";
    const dispatch = useAppDispatch();
    const { foods, loading, error } = useAppSelector((state) => state.foodsReducer);

    useEffect(() => {
        dispatch(getMenu(1000));
    }, [dispatch]);

    const renderItem = ({ item }: { item: FoodItem }) => (
        <FoodCard 
            title={item.strCategory}
            url={item.strCategoryThumb}
            onPress={() => {}}
        />
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[theme].background,
        },
        content: {
            padding: wp(2),
        },
    });

    if (loading === LoadingTypes.loading) {
        return <LoadingOverlay />;
    }

    if (error) {
        return <ErrorOverlay message={error} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={foods}
                renderItem={renderItem}
                keyExtractor={(item) => item.idCategory}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                numColumns={2}
            />
        </SafeAreaView>
    );
};

export default FoodsScreen;