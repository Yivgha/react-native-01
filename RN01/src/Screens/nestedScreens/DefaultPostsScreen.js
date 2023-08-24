import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'

import db from "../../firebase/firebaseConfig";
import {  collection, query, onSnapshot, doc, getFirestore, getDocs } from 'firebase/firestore';

const basicAvatar = require('../../../assets/images/avatars/avatar-1-2x.png')

function DefaultPostsScreen({ route, navigation }) {
    const [posts, setPosts] = useState([]);

    const getAllPosts = async() => {
        const myDB = getFirestore();
        
        // const querySnapshot = await getDocs(collection(myDB, "posts"));
        const postsQuery = onSnapshot(collection(myDB, "posts"), (querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            });
            setPosts(documents);
        });
        return () => postsQuery();
};
  

    useEffect(() => {
       getAllPosts();
    }, [])

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
                    <Text style={styles.userName}>
                        Natali Romanova
                    </Text>
                    <Text style={styles.userMail}>email@example.com</Text>
                </View>
            </View>
            <View style={styles.flatList}>
                <FlatList
                    data={posts}
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={({ item }) => (
                        <View style={{ height: 350, width: 350, paddingHorizontal: "auto", paddingVertical: "auto" }}>
                            <Image
                                source={{ uri: item.photo }}
                                style={{
                                    marginHorizontal: 'auto',
                                    height: 250,
                                    width: 350,
                                }}
                            />
                            <Text style={styles.photoName}>{item.name}</Text>
                            <View style={styles.postIcons}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('Comments')
                                    }
                                >
                                   <View  style={{display: "flex", flexDirection:"row", margin: 0}}>
                                    <FontAwesome
                                        name="comments"
                                        size={30}
                                        color="black"
                                        />
                                      </View>
                                    </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('MapScreen', {locationCoords: item.locationCoords, locationName: item.locationName})
                                    }
                                >
                                   <View style={{display: "flex", flexDirection:"row",  margin: 0}}>
                                    <EvilIcons
                                        name="location"
                                        size={30}
                                        color="black"
                                        />
                                        <Text>
                                            {item.locationName}
                                        </Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        overflowY: 'scroll',
        height: 500,
        width: '100%',
        paddingVertical: 5,
    },
    postIcons: {
        marginTop: 5,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "center",
    },
    photoName: {
        color: "#000",
        marginTop: 5,
        marginBottom: 0,
    }
})

export default DefaultPostsScreen
