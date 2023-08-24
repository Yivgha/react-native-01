import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import CommentsScreen from '../nestedScreens/CommentsScreen'
import MapScreen from '../nestedScreens/MapScreen'
import DefaultPostsScreen from '../nestedScreens/DefaultPostsScreen'

const NestedScreen = createStackNavigator()

const PostsScreen = () => {
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen
                name="DefaultPostsScreen"
                component={DefaultPostsScreen}
                options={{
                    title: 'Posts',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#FFFFFF',
                        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
                        borderBottomWidth: 1,
                    },
                    headerTintColor: '#212121',
                    headerTitleStyle: {
                        fontFamily: 'Roboto-Bold',
                        fontSize: 17,
                        lineHeight: 19,
                        paddingTop: 11,
                        paddingBottom: 11,
                    },
                    headerRight: () => (
                        <TouchableOpacity onPress={() => logout()}>
                            <Feather
                                name="log-out"
                                size={24}
                                color="#BDBDBD"
                                style={{ marginRight: 16 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <NestedScreen.Screen
                name="Comments"
                component={CommentsScreen}
                options={{
                    headerStyle: {
                        backgroundColor: '#FFFFFF',
                        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
                        borderBottomWidth: 1,
                    },
                }}
            />
            <NestedScreen.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ title: 'Location' }}
            />
        </NestedScreen.Navigator>
    )
}

export default PostsScreen
