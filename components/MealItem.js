//React Imports
import React from 'react';
//React Native Imports
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    ImageBackground,
} from 'react-native';
//Custom Component Imports
import DefaultText from '../components/DefaultText';



/* [Module 125]: In this module, we needed to create another card which took Meals and dispalyed them on the screen.
So in 'ScreenCategoryMeals.js', we had a FlatList to iterate through all the different data Objects (MEALS in this case),
which then it would create different components. (Think ArrayAdapters and ListViews in Android Developer)
- TODO: Make the styling and touchable work better on Android as we did for 'GridViewButton.js'
- We passed many of the Meal information through 'props'
- We introduced 'ImageBackground', which can be used to display an image in the background of things that we have within
  the nested views. (Think FrameLayouts from Android Development)
- Used Image to show a picture of the meal providing the Image URL through 'props'*/
export default function MealItem(props) {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity
                onPress={props.onClick}
            >
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }} >
                        <ImageBackground
                            source={{ uri: props.image }}
                            style={styles.bgImage}
                        >
                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetails }} >
                        <DefaultText>{props.duration}m</DefaultText>
                        <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 10
    },
    mealHeader: {
        height: '85%',
    },
    mealDetails: {
        height: '15%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mealRow: {
        flexDirection: 'row'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.45)',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'white',
        textAlign: 'right',
    }
});