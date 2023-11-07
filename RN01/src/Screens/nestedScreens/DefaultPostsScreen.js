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
    Dimensions,
} from 'react-native'
import React, { useState, useEffect } from 'react'

import { FontAwesome } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'
import db from '../../firebase/firebaseConfig'
import { collection, onSnapshot, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const basicAvatar = require('../../../assets/images/avatars/cat.jpg')

const units = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

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
                                borderWidth: 1,
                                borderColor: '#FF6C00',
                            }}
                        />
                    ) : (
                        <Image
                            source={basicAvatar}
                            title="basicAvatar"
                            style={{
                                borderWidth: 1,
                                borderColor: '#FF6C00',
                                width: 60,
                                height: 60,
                                borderRadius: 16,
                            }}
                        />
                    )}
                </View>
                <View style={styles.credentials}>
                    <Text style={styles.userName}>{user.displayName}</Text>
                    <Text style={styles.userMail}>{user.email}</Text>
                </View>
            </View>
            <SafeAreaView style={styles.flatList}>
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
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View
                                style={styles.onepost}
                                key={item.id}
                                id={item.id}
                            >
                                <Image
                                    source={{ uri: item.photo }}
                                    style={{
                                        borderRadius: 10,
                                        aspectRatio: 1,
                                        width: units.width * 1,
                                        height: units.height * 0.4,
                                    }}
                                    resizeMode="center"
                                    resizeMethod="scale"
                                />
                                <Text style={styles.photoName}>
                                    {item.name}
                                </Text>
                                <View style={styles.postIcons}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('Comments', {
                                                postId: item.id,
                                                photo: item.photo,
                                                name: item.name,
                                            })
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
                                                    marginRight: 35,
                                                }}
                                            >
                                                {item?.commentsNumber}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('MapScreen', {
                                                locationCoords:
                                                    item.locationCoords,
                                                locationName: item.locationName,
                                            })
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
                                                    textTransform: 'uppercase',
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
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#FF6C00',
        borderRadius: 16,
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
        overflowY: 'scroll',
        height: 500,
        width: units.width * 1,
        paddingBottom: 35,
    },
    onepost: {
        marginBottom: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: units.width * 1,
    },
    postIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    photoName: {
        color: '#212121',
        marginTop: 10,
        marginBottom: 5,
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
        paddingHorizontal: 5,
    },
})

export default DefaultPostsScreen
