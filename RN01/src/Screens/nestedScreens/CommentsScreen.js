import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

function CommentsScreen() {
    return (
        <View style={styles.wrapper}>
            <Text> Comments here</Text>
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
})
export default CommentsScreen
