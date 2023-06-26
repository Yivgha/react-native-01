import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'

function CreatePostsScreen() {
    return (
        <View style={styles.wrapper}>
            <View style={styles.uploadText}>
                <View style={styles.photoContainer}>
                    <TouchableOpacity style={styles.cameraIcon}>
                        <FontAwesome name="camera" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.mainText}>Upload photo</Text>
            </View>
            <View style={styles.nameBox}>
                <Text style={styles.mainText}>Name...</Text>
            </View>

            <View style={styles.locationBox}>
                <Feather
                    name="map-pin"
                    size={24}
                    color="#BDBDBD"
                    style={{ marginRight: 4 }}
                />
                <Text style={styles.mainText}>Location...</Text>
            </View>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.mainText}>Publish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn}>
                <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainText: {
        color: '#BDBDBD',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
    },
    btn: {
        borderRadius: 100,
        backgroundColor: '#F6F6F6',
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 'auto',
        height: 50,
        width: '100%',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 120,
    },
    deleteBtn: {
        width: 70,
        height: 40,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingHorizontal: 'auto',
    },
    uploadText: {
        width: '100%',
        paddingHorizontal: 'auto',
        marginBottom: 16,
    },
    photoContainer: {
        width: '100%',
        height: 240,
        backgroundColor: '#E8E8E8',
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraIcon: {
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        padding: 18,
    },
    nameBox: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 'auto',
        marginBottom: 16,
    },
    locationBox: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 'auto',
    },
})
export default CreatePostsScreen
