import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList,
    SafeAreaView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import AvatarInput from '../../components/common/Avatar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { authLogOutUser } from '../../redux/auth/authOperations'
import { useDispatch, useSelector } from 'react-redux'
import db from '../../firebase/firebaseConfig'
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    onSnapshot,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const bgImg = require('../../../assets/images/bg-img-1x.jpg')

function ProfileScreen({ navigation }) {
    const [profilePosts, setProfilePosts] = useState([])

    const dispatch = useDispatch()
    const myDB = getFirestore()
    const authFirebase = getAuth()
    const user = authFirebase.currentUser
    const { userId } = useSelector((state) => state.auth)

    const logout = () => {
        dispatch(authLogOutUser())
    }

    const getUserPosts = async () => {
        const q = await query(
            collection(myDB, 'posts'),
            where('userId', '==', userId)
        )
        const querySnapshot = await getDocs(q)
        const documents = await querySnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            }
        })
        setProfilePosts(documents);
    }

    useEffect(() => {
        getUserPosts()
    }, [])
    return (
        <View style={styles.wrapper}>
            <ImageBackground source={bgImg} style={styles.image}>
                <View style={styles.container}>
                    <View style={styles.topBox}>
                        <AvatarInput />
                        <TouchableOpacity
                            onPress={() => {
                                logout();
                            }}
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
                    <Text style={styles.title}>{user.displayName}</Text>

                    
                        <SafeAreaView style={styles.postContainer}>
                        <FlatList
                            data={profilePosts}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View>
                                    <Image
                                        source={{ uri: item.photo }}
                                        alt={`${item.name}`}
                                        style={styles.postImage}
                                    />
                                    <Text style={styles.postTitle}>
                                        {item.name}
                                    </Text>
                                    <View tyle={styles.postDetails}>
                                        <View style={styles.postIconsLeft}>
                                            <TouchableOpacity
                                                style={styles.postIcons}
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'Comments',
                                                        { postId: item.id }
                                                    )
                                                }
                                            >
                                                <FontAwesome
                                                    name="commenting-o"
                                                    size={24}
                                                    color="#FF6C00"
                                                    style={{
                                                        transform: [
                                                            {
                                                                rotateY:
                                                                    '180deg',
                                                            },
                                                        ],
                                                    }}
                                                />
                                                <Text style={styles.iconText}>
                                                    8
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.postIcons}
                                            >
                                                <Feather
                                                    name="thumbs-up"
                                                    size={24}
                                                    color="#FF6C00"
                                                />
                                                <Text style={styles.iconText}>
                                                    8
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.postIconsRight}>
                                            <Feather
                                                name="map-pin"
                                                size={24}
                                                color="#BDBDBD"
                                            />
                                            <Text style={styles.locationText}>
                                                {item.locationName}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                            </SafeAreaView>
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
        marginTop: -30,
        marginBottom: 32,
    },
    postContainer: {
        padding: 5,
        width: 350,
        height: 300,
        borderWidth: 1,
        borderColor: 'black',
    },
    postImage: {
        width: 350,
        height: 240,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
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
        display: 'flex',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    postIconsLeft: {
        display: 'flex',
        flexDirection: 'row',
    },
    postIconsRight: {
        display: 'flex',
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
