import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

function PostsScreen() {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}> PostsScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#000',
    },
})

export default PostsScreen
