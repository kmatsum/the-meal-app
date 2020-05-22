//React Imports
import React from 'react';
//React Navigation Imports
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigation } from 'react-navigation-drawer';
//Expo Imports
import { Ionicons } from '@expo/vector-icons';
//Screen Imports
import ScreenCategory from '../screens/ScreenCategory';
import ScreenCategoryMeals from '../screens/ScreenCategoryMeals';
import ScreenMealDetails from '../screens/ScreenMealDetails';
import ScreenFavorites from '../screens/ScreenFavorites'
//Constant Imports
import Colors from '../constants/Colors';

//This will enable stack navigation on all included screens 'TAG: Class Pointer'
//Returns a NAVIGATION CONTAINTER
const MealsNavigator = createStackNavigator(
    { //First argument of createStackNavigator(): A list of Screen Objects and a KEY VALUE PAIR for easier identification
        Categories: ScreenCategory,
        CategoryMeals: {
            screen: ScreenCategoryMeals,
            /*[Module 120]: If you are using the '{ OBJECT }' way to create parts of your navigator,
            you can also setup properties here:                                                     */
            // navigationOptions: {
            //     headerTintColor: 'white',
            //     headerStyle: {
            //         backgroundColor: Colors.primaryColor,
            //     }
            // }
        },
        MealDetails: ScreenMealDetails,
    },
    { //Second argument of createStackNavigator(): Allows you to pass CONFIGURATION to the Navigator
        /*[Module 120]: Default Navigation Configuration (In this case, we are changing the header look)
        Default Navigation Options will ALWAYS be OVERWRITTEN by specific-set Options
        [Options Set in the First Argument Above] > [Options set in the SCREEN.js Component File] > [DefaultNavigationOptions]  */
        defaultNavigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: Colors.primaryColor,
            },
        }
    });

/* [Module 129] Bottom Tab Navigator: Creating a Bottom Tab Navigator to either show all Meals or just the Favorites.
'MealsNavigator' is abled to be used as a screen because 'createStackNavigator()' returns a React Component. So you can
essentially point your navigator to another navigator. Combining many navigation options will enable us to create complex
applications. The 'createAppContainer(VALUE)' needed to be updated to 'TabMealsNavigator' since the tab Navigator is our primary
source of entry for our application.                                                                                    */
const TabMealsnavigator = createBottomTabNavigator(
    { //First argument of createBottomTabNavigator(): A list of Screen Objects and a KEY VALUE PAIR for easier identification
        Meals: {
            screen: MealsNavigator,
            navigationOptions: {
                //The Navigator will take the KEY VALUE PAIR as the displayed Title Text, but you can set the title manually as well:
                // tabBarLabel: 'Meals',

                /* [Module 130]: tabBarIcon is a navigationOption which you can set a function which returns the
                icon that you want to display with other properties as well. The 'tabInfo' parameter has valueable
                information on the Navigation tab, such as 'tabInfo.tintColor' to ensure dynamic-capabilities    */
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons
                            name='ios-restaurant'
                            size={25}
                            color={tabInfo.tintColor}
                        />
                    );
                }
            }
        },
        Favorites: {
            screen: ScreenFavorites,
            navigationOptions: {
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons
                            name='ios-star'
                            size={25}
                            color={tabInfo.tintColor}
                        />
                    );
                }
            }
        }
    },
    { //Second argument of createBottomTabNavigator(): Allows you to pass CONFIGURATION to the Navigator
        /* [Module 130]:  */
        tabBarOptions: {
            activeTintColor: Colors.accentColor,
        }
    }
);

//Export what the createAppContainter returns, passing the default navigator we will be using.
export default createAppContainer(TabMealsnavigator);