import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import AvatarInput from '../../components/common/Avatar'
import { TouchableOpacity } from 'react-native-gesture-handler'
const bgImg = require('../../../assets/images/bg-img-1x.jpg')

function ProfileScreen({ navigate }) {
    const [posts, setPosts] = useState([])
    return (
        <View style={styles.wrapper}>
            <ImageBackground source={bgImg} style={styles.image}>
                <View style={styles.container}>
                    <View style={styles.topBox}>
                        <AvatarInput />
                        <TouchableOpacity
                            onPress={() => navigate('Login', { name: 'Login' })}
                        >
                            <Feather
                                name="log-out"
                                size={24}
                                color="#BDBDBD"
                                style={{
                                    marginLeft: 80,
                                    marginBottom: 30,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>User Login</Text>

                    <View style={styles.postContainer}>
                        <Image
                            source={require('../../../assets/images/posts/forest.jpg')}
                            style={styles.postImage}
                        />
                        <Text style={styles.postTitle}>title</Text>
                        <View style={styles.postDetails}>
                            <View style={styles.postIconsLeft}>
                                <TouchableOpacity style={styles.postIcons}>
                                    <FontAwesome
                                        name="commenting-o"
                                        size={24}
                                        color="#FF6C00"
                                        style={{
                                            transform: [{ rotateY: '180deg' }],
                                        }}
                                    />
                                    <Text style={styles.iconText}>8</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.postIcons}>
                                    <Feather
                                        name="thumbs-up"
                                        size={24}
                                        color="#FF6C00"
                                    />
                                    <Text style={styles.iconText}>8</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.postIconsRight}>
                                <Feather
                                    name="map-pin"
                                    size={24}
                                    color="#BDBDBD"
                                />
                                <Text style={styles.locationText}>Ukraine</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 16,
    },
    topBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 30,
        color: '#212121',
        textAlign: 'center',
        lineHeight: 35,
        letterSpacing: 0.01,
        marginBottom: 32,
    },
    postContainer: {
        paddingBottom: 45,
    },
    postImage: {
        width: '100%',
        height: 240,
        marginBottom: 8,
        borderRadius: 8,
    },
    postTitle: {
        color: '#212121',
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 19,
        marginBottom: 8,
    },
    postDetails: {
        color: '#212121',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postIconsLeft: {
        flexDirection: 'row',
    },
    postIconsRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    iconText: {
        marginLeft: 8,
    },
    locationText: {
        textDecorationLine: 'underline',
        color: '#212121',
        marginLeft: 4,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
    },
})
export default ProfileScreen
