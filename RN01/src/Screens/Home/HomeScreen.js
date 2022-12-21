import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import PostsScreen from './PostsScreen'
import CreatePostsScreen from './CreatePostsScreen'
import ProfileScreen from './ProfileScreen'

const MainTab = createBottomTabNavigator()

function HomeScreen({ navigation: { navigate } }) {
    return (
        <MainTab.Navigator
            initialRouteName="Posts"
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingTop: 10,
                    paddingBottom: 22,
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(0, 0, 0, 0.3)',
                    height: 70,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    if (route.name === 'Posts') {
                        iconName = focused ? 'view-grid' : 'view-grid-outline'
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'account' : 'account-outline'
                    }
                    return (
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        </View>
                    )
                },
                tabBarActiveTintColor: '#FF6C00',
                tabBarInactiveTintColor: '#BDBDBD',
            })}
        >
            <MainTab.Screen
                name="Posts"
                component={PostsScreen}
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
                        fontWeight: 'bold',
                        fontSize: 17,
                        lineHeight: 19,
                        paddingTop: 11,
                        paddingBottom: 11,
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigate('Login', { name: 'Login' })}
                        >
                            <Feather
                                name="log-out"
                                size={24}
                                color="#BDBDBD"
                                style={{ marginRight: 10 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <MainTab.Screen
                name="Create"
                component={CreatePostsScreen}
                options={{
                    title: 'Create post',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#FFFFFF',
                        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
                        borderBottomWidth: 1,
                    },

                    headerTintColor: '#212121',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 17,
                        lineHeight: 22,
                        paddingTop: 11,
                        paddingBottom: 11,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigate('Posts', { name: 'Posts' })}
                        >
                            <MaterialCommunityIcons
                                name="arrow-left"
                                size={24}
                                color="#BDBDBD"
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                    ),
                    tabBarIcon: () => (
                        <View style={styles.plusIconContainer}>
                            <Feather name="plus" size={24} color="#ffffff" />
                        </View>
                    ),
                }}
            />
            <MainTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
        </MainTab.Navigator>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIconContainer: {
        backgroundColor: '#FF6C00',
        width: 70,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default HomeScreen
