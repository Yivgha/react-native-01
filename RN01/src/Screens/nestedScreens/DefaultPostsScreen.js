import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Button,
    Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'

const basicAvatar = require('../../../assets/images/avatars/avatar-1-2x.png')

function DefaultPostsScreen({ route, navigation }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params])
        }
    }, [route.params])

    console.log(posts)
    return (
        <View style={styles.wrapper}>
            <View style={styles.userContainer}>
                <View style={styles.avatar}>
                    <Image
                        source={basicAvatar}
                        title="avatar"
                        style={{ width: 60, height: 60 }}
                    />
                </View>
                <View style={styles.credentials}>
                    <Text style={styles.userName}>Natali Romanova</Text>
                    <Text style={styles.userMail}>email@example.com</Text>
                </View>
            </View>
            <View style={styles.flatList}>
                <FlatList
                    data={posts}
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={({ item }) => (
                        <View style={{ height: 300, width: 350 }}>
                            <Image
                                source={{ uri: item.photo }}
                                style={{
                                    marginHorizontal: 'auto',
                                    height: 250,
                                    width: 350,
                                }}
                            />
                            <View style={styles.postIcons}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('Comments')
                                    }
                                >
                                   <View>
                                    <FontAwesome
                                        name="comments"
                                        size={30}
                                        color="black"
                                        />
                                      </View>
                                    </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('MapScreen')
                                    }
                                >
                                   <View>
                                    <EvilIcons
                                        name="location"
                                        size={30}
                                        color="black"
                                        />
                                      </View>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 190,
    },
    userContainer: {
        flexDirection: 'row',
        width: 170,
        height: 60,
        marginTop: 32,
        marginBottom: 32,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        overflowY: 'scroll',
        height: 500,
        width: '100%',
    },
    postIcons: {
        marginTop: 5,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "center",
        paddingHorizontal: "auto"
    },
})

export default DefaultPostsScreen
