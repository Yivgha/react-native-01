import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const basicAvatar = require('../../../assets/images/avatars/avatar-1-2x.png')

function PostsScreen() {
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
            <View>
                <Text>Some post</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
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
})

export default PostsScreen
