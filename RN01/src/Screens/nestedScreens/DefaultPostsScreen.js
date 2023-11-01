import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    RefreshControl,
    ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'

import { FontAwesome } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'
import db from '../../firebase/firebaseConfig'
import { collection, onSnapshot, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const basicAvatar = require('../../../assets/images/avatars/cat.jpg')

function DefaultPostsScreen({ navigation }) {
    const [posts, setPosts] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const authFirebase = getAuth()
    const user = authFirebase.currentUser

    const myDB = getFirestore()

    const getAllPosts = async () => {
        const postsQuery = onSnapshot(
            collection(myDB, 'posts'),
            (querySnapshot) => {
                const documents = querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                    }
                })

                setPosts(documents)
            }
        )

        return () => postsQuery()
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 150)
        getAllPosts()
    }, [])

    useEffect(() => {
        getAllPosts()
    }, [])

    return (
        <View style={styles.wrapper}>
            <View style={styles.userContainer}>
                <View style={styles.avatar}>
                    {user?.photoURL !== null ? (
                        <Image
                            source={{ uri: user?.photoURL }}
                            title="avatar"
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 16,
                            }}
                        />
                    ) : (
                        basicAvatar
                    )}
                </View>
                <View style={styles.credentials}>
                    <Text style={styles.userName}>{user.displayName}</Text>
                    <Text style={styles.userMail}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.flatList}>
                <SafeAreaView>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <FlatList
                            data={posts}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.onepost}>
                                    <Image
                                        source={{ uri: item.photo }}
                                        style={{
                                            height: 240,
                                            width: 380,
                                            borderRadius: 10,
                                        }}
                                    />
                                    <Text style={styles.photoName}>
                                        {item.name}
                                    </Text>
                                    <View style={styles.postIcons}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate(
                                                    'Comments',
                                                    {
                                                        postId: item.id,
                                                        photo: item.photo,
                                                        name: item.name,
                                                    }
                                                )
                                            }
                                        >
                                            <View
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    margin: 0,
                                                }}
                                            >
                                                <FontAwesome
                                                    name="comments"
                                                    size={24}
                                                    color="#BDBDBD"
                                                />
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                    }}
                                                >
                                                    {item?.commentsNumber}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate(
                                                    'MapScreen',
                                                    {
                                                        locationCoords:
                                                            item.locationCoords,
                                                        locationName:
                                                            item.locationName,
                                                    }
                                                )
                                            }
                                        >
                                            <View
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    margin: 0,
                                                }}
                                            >
                                                <EvilIcons
                                                    name="location"
                                                    size={24}
                                                    color="#BDBDBD"
                                                />
                                                <Text
                                                    style={{
                                                        textTransform:
                                                            'uppercase',
                                                        textDecorationLine:
                                                            'underline',
                                                    }}
                                                >
                                                    {item.locationName}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 250,
    },
    userContainer: {
        flexDirection: 'row',
        width: 170,
        height: 60,
        marginTop: 12,
        marginBottom: 12,
    },
    avatar: {
        width: 60,
        hieght: 60,
        borderRadius: 16,
        marginRight: 8,
    },
    credentials: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    userName: {
        fontFamily: 'Roboto-Bold',
        color: '#212121',
        fontSize: 13,
        lineHeight: 15,
    },
    userMail: {
        fontFamily: 'Roboto-Regular',
        color: 'rgba(33, 33, 33, 0.8)',
        fontSize: 11,
        lineHeight: 13,
    },
    flatList: {
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'scroll',
        height: 500,
        width: 380,
        paddingBottom: 35,
    },
    onepost: {
        height: 300,
        width: 380,
        marginBottom: 15,
    },
    postIcons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    photoName: {
        color: '#212121',
        marginTop: 10,
        marginBottom: 0,
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
        paddingHorizontal: 5,
    },
})

export default DefaultPostsScreen
