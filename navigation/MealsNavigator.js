//React Imports
import React from 'react';
//React Native Imports
import { Platform } from 'react-native';
//React Navigation Imports
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
//Expo Imports
import { Ionicons } from '@expo/vector-icons';
//Screen Imports
import ScreenCategory from '../screens/ScreenCategory';
import ScreenCategoryMeals from '../screens/ScreenCategoryMeals';
import ScreenMealDetails from '../screens/ScreenMealDetails';
import ScreenFavorites from '../screens/ScreenFavorites';
import ScreenFilters from '../screens/ScreenFilters';
//Constant Imports
import Colors from '../constants/Colors';



/* [Module 133]: Create a defaultStackNavigationOptions object for reuse when making different stack navigators */
const defaultStackNavigatorOptions = {
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: Colors.primaryColor,
    },
};

//This will enable stack navigation on all included screens (Syntax: 'TAG: Class Pointer')
//Returns a NAVIGATION React Component
const MealsStackNavigator = createStackNavigator(
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
        defaultNavigationOptions: defaultStackNavigatorOptions,
    }
);


/* [Module 133]: Created a different stack navigator for the Favorites TAB of the app. */
const FavoritesStackNavigator = createStackNavigator(
    { //First argument of createStackNavigator(): A list of Screen Objects and a KEY VALUE PAIR for easier identification
        Favorites: ScreenFavorites,
        MealDetails: ScreenMealDetails
    },
    { //Second argument of createStackNavigator(): Allows you to pass CONFIGURATION to the Navigator
        defaultNavigationOptions: defaultStackNavigatorOptions,
    }
);



/* [Module 132]: Added a tabScreenConfig variable for easy re-usability with the different BottomTabNavigators that we are using */
const tabScreenConfig = {
    Meals: {
        screen: MealsStackNavigator,
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
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Favorites: {
        screen: FavoritesStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-star'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.accentColor
        }
    }
}

/* [Module 129]: Bottom Tab Navigator: Creating a Bottom Tab Navigator to either show all Meals or just the Favorites.
'MealsNavigator' is abled to be used as a screen because 'createStackNavigator()' returns a React Component. So you can
essentially point your navigator to another navigator. Combining many navigation options will enable us to create complex
applications. The 'createAppContainer(VALUE)' needed to be updated to 'TabMealsNavigator' since the tab Navigator is our primary
source of entry for our application.                                                                                        */
/* [Module 132]: To implement a better looking ANDROID Bottom Tab Navigator, we imported the new 'materialBottomTabNavigator' and 'Platform'
We then checked to see which platform we are using then change which BottomTabNavigator that gets used as the 'TabMealsNavigator'
React Component Object we pass later on in the code.                                                                        */
const TabMealsNavigator = (Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(
        //First argument of createMaterialBottomTabNavigator(): A list of Screen Objects and a KEY VALUE PAIR for easier identification
        tabScreenConfig,
        { //Second argument of createMaterialBottomTabNavigator(): Allows you to pass CONFIGURATION to the Navigator
            /* [Module 132]:  for 'MaterialBottomTabNavigator', we dont need to assign 'tabBarOption', we can just treat it as
            any other property                                                                                               */
            activeColor: 'white',
            shifting: true,
            //UNUSED: For MaterialBottomTabNavigator, there is the barStyle property to configure the entire bar
            // barStyle: {
            //     backgroundColor: Colors.primaryColor
            // }
        }
    )
    : createBottomTabNavigator(
        //First argument of createBottomTabNavigator(): A list of Screen Objects and a KEY VALUE PAIR for easier identification
        tabScreenConfig,
        { //Second argument of createBottomTabNavigator(): Allows you to pass CONFIGURATION to the Navigator
            tabBarOptions: {
                activeTintColor: Colors.accentColor,
            }
        }
    )
);


/* [Module 134]: We added a FiltersNavigator for the Filters screen that can be accessed from the DrawerNavigator
we are creating below, 'MainNavigator'.                                                                          */
const FiltersNavigator = createStackNavigator(
    {
        Filters: ScreenFilters,
    }
);


/* [Module 134] We created a 'drawerNavigator' called 'MainNavigator', as this will be the main entrance way to all
the other Navigation methods we have. (ex. 'MainNavigator' => 'TabMealsNavigator' => 'MealsStackNavigator' brings 
you to all available screens) This is also why we updated 'createAppContainer(ReactComponent)' to 'MainNavigator' */
const MainNavigator = createDrawerNavigator(
    {
        MealsFavs: TabMealsNavigator,
        Filters: FiltersNavigator,
    }
);

//Export what the createAppContainter returns, passing the default navigator we will be using.
export default createAppContainer(MainNavigator);