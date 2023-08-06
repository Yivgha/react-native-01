import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'

const basicAvatar = require('../../../assets/images/avatars/avatar-1-2x.png')

function PostsScreen({ route }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (route.params) {
            setPosts(prevState => [...prevState, route.params]);
        }
    }, [route.params]);
    

    
console.log(posts);
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
                <FlatList data={posts}
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={({ item }) => (
                        <View style={{marginBottom: 10, height: 250, width: 350, paddingTop: 5, paddingBottom: 5}} >
                            <Image source={{ uri: item.photo }} style={{marginHorizontal: "auto", height: 250, width: 350}} />
                        </View>
                  )} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 130,
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
        justifyContent: "center",
        alignItems: "center",
        overflowY: "scroll",
    },
})

export default PostsScreen
