//React Imports
import React, { useState, useEffect, useCallback, useDebugValue } from 'react';
//React Native Imports
import {
    StyleSheet,
    Platform,
    View,
    Text,
    Switch
} from 'react-native';
//React Navigation Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//React Redux Imports
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/actions/meals';
//Custom Components Navigation
import HeaderButton from '../components/HeaderButton';
//Constant Imports
import Colors from '../constants/Colors';



/*Set any sort of navigationOptions onto the ScreenCategory JSX Object
  [Module 134]: Similar additions to the 'navigationOptions' in 'ScreenCategory'.
  detailed explinations there...                                                */
ScreenFilters.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item
                    title='Save'
                    iconName='ios-save'
                    onPress={() => {
                        console.log('Saving Filters');
                        navigationData.navigation.getParam('onSaveFilters')();
                        // console.log(navigationData.navigation.getParam('appliedFilters'))
                    }}
                />
            </HeaderButtons>
        ),
    }
};



/* [Module 140]: In order to create rows of switches with titles, a custom in-line component was created (since these switches
    are only used in this screen for this application).) Here, we set the all the properties, values, and onChange functions */
function FilterSwitch(props) {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.title}</Text>
            <Switch
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : 'white'}
                trackColor={{ true: Colors.primaryColor }}
                value={props.value}
                onValueChange={props.onValueChange}
            />
        </View>
    );
}



//DEFAULT FUNCTION: ScreenFilters ===============================================================================================
export default function ScreenFilters(props) {
    const dispatch = useDispatch();

    /* [Module 140]: OBJECT DESTRUCTIRUGING. This pulls out the navigation key, from the props OBJECT, storing it as a brand
    new consatnt with the same name, so we can refer to it individually. */
    const { navigation } = props;

    /* [Module 140]: Needed state management for keeping the state of each switch saved between renders */
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegitarian, setIsVegitarian] = useState(false);
    const [isVegan, setIsVegan] = useState(false);

    /* [Module 140]: Function 'saveFilters' was created to pass through the 'navigation.setParams()' function so we can
        call this function from outside the 'ScreenFilters' function, essentially allowing us to access the switch states
        that we have saved.

        We used the 'useCallback()' method becasue we want to save the function as-is at whatever point in time. The 'useCallback()'
        method will save the function AT THE CURRENT STATE. Think of it like the useCallback method will replace each value with the
        current state of that variable, so React will not have to grab the variable every time. The cached function will ONLY BE
        UPDATED if any of the variables in the second argument, the dependencies, changes. So in this case, the cached function's values
        will only be updated if one of the 4 filter variables are changed.

        Because 'useCallback()' saves the function with the CURRENT values, other stuff like 'useEffect()' can use the function as a
        dependency to change when the 'useEffect()' is called as well, like we do below.

        'setParams()' DOES REBUILD the screen, so then if 'saveFilters()' was NOT a 'useCallback()' function, then it would get rebuilt
        every time 'setParams()' is called, which would trigger 'useEffect()', which calls 'setParams()' and we run into an infinite loop. */
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegetarian: isVegitarian,
            vegan: isVegan
        };

        console.log(appliedFilters);
        
        /* [Module 153] */
        dispatch(setFilters(appliedFilters));
    },
        [ //Dependencies
            isGlutenFree,
            isLactoseFree,
            isVegitarian,
            isVegan,
            dispatch
        ]
    );


    /* [Module 140]: In order to set the parameters of the navigation object attached to this screen so we can access it from
        the 'navigationOptions()' up above (Which is outside the function, so it will not let us access internal variables),
        we needed a way to pass a function through 'setParams()'. 'setParams(PARAMS, DEPENDECIES)' takes a first argument of
        a parameter Object with KEY VALUE PAIRS and a second argument with an array of dependencies.
        
        'useEffect()' will be run every single time the screen is re-rendered. In order to specify when this effect will be run,
        we must specify dependencies. In the second argument, the 'saveFilters' function is set as a dependency, so only if the
        React sees a change in the 'saveFilters' function, will this useEffect function run, setting the 'navigation.setParams'
        to provide a KEY VALUE PAIR which points to the 'saveFilters' function */
    useEffect(() => {
        navigation.setParams({
            onSaveFilters: saveFilters
        });
    },
        [ //Dependencies
            saveFilters,
        ]
    );

    /* [Module 140 - Personal edit]: You COULD ALSO just set each switch-value as it's own parameter (or in the case below,
        create an object with the KEY VALUE PAIR 'appliedFilters') and pass it into 'navigation.params'. However, since the
        values that the useEffect() need to react to is the 4 boolean state variables that we have, THOSE 4 BOOLEAN VALUES
        will be the dependency in this case. */
    // useEffect(() => {
    //     navigation.setParams({
    //         appliedFilters: {
    //             glutenFree: isGlutenFree,
    //             lactoseFree: isLactoseFree,
    //             vegitarian: isVegitarian,
    //             vegan: isVegan
    //         }
    //     });
    // },
    //     [ //Dependencies
    //         isGlutenFree,
    //         isLactoseFree,
    //         isVegitarian,
    //         isVegan
    //     ]
    // );



    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filter / Restrictions</Text>
            <FilterSwitch
                title='Gluten-free'
                value={isGlutenFree}
                onValueChange={() => setIsGlutenFree(!isGlutenFree)}
            />
            <FilterSwitch
                title='Lactose-free'
                value={isLactoseFree}
                onValueChange={() => setIsLactoseFree(!isLactoseFree)}
            />
            <FilterSwitch
                title='Vegan'
                value={isVegan}
                onValueChange={() => setIsVegan(!isVegan)}
            />
            <FilterSwitch
                title='Vegitarian'
                value={isVegitarian}
                onValueChange={() => setIsVegitarian(!isVegitarian)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        margin: 20,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        paddingVertical: 10
    }
});
