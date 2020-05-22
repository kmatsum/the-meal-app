import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default function ScreenFavorites (props) {
    return (
        <View style={styles.screen}>
            <Text>The Favorites Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
