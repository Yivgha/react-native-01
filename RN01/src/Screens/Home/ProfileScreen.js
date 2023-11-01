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
    RefreshControl,
    ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import AvatarInput from '../../components/common/Avatar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { authLogOutUser } from '../../redux/auth/authOperations'
import { useDispatch, useSelector } from 'react-redux'
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
    increment,
    writeBatch,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const bgImg = require('../../../assets/images/bg-img-1x.jpg')

function ProfileScreen({ navigation }) {
    const [profilePosts, setProfilePosts] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const dispatch = useDispatch()
    const myDB = getFirestore()
    const authFirebase = getAuth()
    const user = authFirebase.currentUser
    const { userId } = useSelector((state) => state.auth)

    const logout = () => {
        dispatch(authLogOutUser())
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 150)
        getUserPosts()
    }, [])

    const getUserPosts = async () => {
        const q = query(
            collection(myDB, 'posts'),
            where('userId', '==', userId)
        )
        const querySnapshot = await getDocs(q)
        const documents = querySnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            }
        })
        setProfilePosts(documents)
    }

    const putLikeToPost = async (item) => {
        const itemId = item.id

        const batch = writeBatch(myDB)
        const docRef = doc(myDB, 'posts', `${itemId}`)

        batch.update(docRef, { likes: increment(1) })
        batch
            .commit()
            .then(() => {
                console.log(item.likes, item.id)
                alert('Post liked!')
            })
            .then(() => getUserPosts())
    }

    useEffect(() => {
        getUserPosts()
        console.log('updated')
    }, [])

    return (
        <View style={styles.wrapper}>
            <ImageBackground source={bgImg} style={styles.image}>
                <View style={styles.container}>
                    <View style={styles.topBox}>
                        <AvatarInput
                            value={user?.photoURL}
                            style={{ borderRadius: 16 }}
                        />
                        <TouchableOpacity onPress={logout}>
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
                    <Text style={styles.title}>{user?.displayName}</Text>

                    <SafeAreaView style={styles.postContainer}>
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        >
                            <FlatList
                                data={profilePosts}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.onePost}>
                                        <Image
                                            source={{ uri: item.photo }}
                                            alt={`${item.name}`}
                                            style={styles.postImage}
                                        />
                                        <Text style={styles.postTitle}>
                                            {item.name}
                                        </Text>

                                        <View style={styles.postSocials}>
                                            <View
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={styles.socialBtn}
                                                    onPress={() => {
                                                        navigation.navigate(
                                                            'Comments',
                                                            {
                                                                postId: item.id,
                                                                photo: item.photo,
                                                                name: item.name,
                                                            }
                                                        )
                                                    }}
                                                >
                                                    <FontAwesome
                                                        name="comments"
                                                        size={24}
                                                        color="#FF6C00"
                                                        style={{
                                                            marginRight: 3,
                                                        }}
                                                    />
                                                    <Text>
                                                        {item.commentsNumber}
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.socialBtn}
                                                    onPress={() => {
                                                        putLikeToPost(item)
                                                    }}
                                                >
                                                    <Feather
                                                        name="thumbs-up"
                                                        size={24}
                                                        color="#FF6C00"
                                                        style={{
                                                            marginRight: 3,
                                                        }}
                                                    />
                                                    <Text>{item.likes}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.socialBtn}
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'MapScreen',
                                                        {
                                                            locationCoords:
                                                                item.locationCoords,
                                                            locationName:
                                                                item.locationName,
                                                        }
                                                    )
                                                }
                                            >
                                                <Feather
                                                    name="map-pin"
                                                    size={24}
                                                    color="#BDBDBD"
                                                    style={{ marginRight: 3 }}
                                                />
                                                <Text
                                                    style={styles.locationText}
                                                >
                                                    {item.locationName}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        </ScrollView>
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
        marginRight: 10,
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 30,
        color: '#212121',
        textAlign: 'center',
        lineHeight: 35,
        letterSpacing: 0.01,
        marginTop: -30,
        marginBottom: 20,
    },
    postContainer: {
        width: 380,
        height: 350,
        paddingBottomg: 10,
    },
    onePost: {
        marginBottom: 20,
        paddingBottom: 5,
    },
    postImage: {
        width: 380,
        height: 240,
        marginBottom: 15,
        borderRadius: 8,
    },
    postTitle: {
        color: '#212121',
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 19,
        marginBottom: 10,
        textTransform: 'uppercase',
        paddingHorizontal: 10,
    },
    postSocials: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    socialBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    locationText: {
        textDecorationLine: 'underline',
        color: '#212121',
        marginLeft: 4,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        textTransform: 'uppercase',
    },
})
export default ProfileScreen
