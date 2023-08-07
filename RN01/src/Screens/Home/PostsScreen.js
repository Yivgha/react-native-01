import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from '../nestedScreens/MapScreen';
import DefaultPostsScreen from '../nestedScreens/DefaultPostsScreen';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen name='DefaultPostsScreen' component={DefaultPostsScreen} options={{ headerShown: false }}/>
            <NestedScreen.Screen name='Comments' component={CommentsScreen} />
            <NestedScreen.Screen name='MapScreen' component={MapScreen}/>
        </NestedScreen.Navigator>)
}

export default PostsScreen;