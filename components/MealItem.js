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
                        <Text>{props.duration}m</Text>
                        <Text>{props.complexity.toUpperCase()}</Text>
                        <Text>{props.affordability.toUpperCase()}</Text>
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
        overflow: 'hidden'
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