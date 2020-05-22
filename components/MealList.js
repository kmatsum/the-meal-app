//React Imports
import React from 'react';
//React Native Imports
import { StyleSheet, View, FlatList } from 'react-native';
//Custom Component Imports
import MealItem from '../components/MealItem';

export default function MealList(props) {
    //Function to return a Component template that the renderItem property will handle
    //Think of it like a customer ArrayAdapter in Java Android development
    function renderMealItem(itemData) {
        return (
            <MealItem
                onSelectMeal={() => { }}
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                /*[Module 126]: We added the onClick Method for each meal Item to navigate to the meal details screen, as
                well as pass the 'MEAL OBJECT' so we can use it's information in the next screen.                       */
                onClick={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetails',
                        params: {
                            MealObject: itemData.item,
                        }
                    });
                }}
            />
        );
    }



    //COMPONENTS CODE ==========
    return (
        <View style={styles.list}>
            <FlatList
                style={{ width: '95%', margin: 10 }}
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});