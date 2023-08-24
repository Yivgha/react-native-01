import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from 'react-native'
import { useSelector } from 'react-redux'
import { EvilIcons } from '@expo/vector-icons'
import db from '../../firebase/firebaseConfig'
import {
    collection,
    getFirestore,
    addDoc,
    getDoc,
    onSnapshot,
} from 'firebase/firestore'

function CommentsScreen({ route }) {
    const { postId, photo, name } = route.params;
    const [comment, setComment] = useState('')
    const [allComm, setAllComm] = useState([])

    const { nickname } = useSelector((state) => state.auth)

    const myDB = getFirestore()

    const sendComment = () => {
        console.log('Sending comment', comment)
        createComment()
        setComment('')
    };

    const createComment = async () => {
        const date = new Date();
        const commentDate = date.toUTCString();
        
        const createCommentRef = await addDoc(
            collection(myDB, `posts/${postId}/comments`),
            { comment, nickname,  commentDate }
        )
        return createCommentRef
    }

    const getAllComments = async () => {
        const commQuery = await onSnapshot(
            collection(myDB, `posts/${postId}/comments`),
            (querySnapshot) => {
                const documents = querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                        date:doc.commentDate
                    }
                })
                setAllComm(documents)
            }
        )
        return () => commQuery()
    }

    useEffect(() => {
        getAllComments();
    }, [])

    return (
        <View style={styles.wrapper}>
            <View style={styles.pictureInComm}>
                <Image source={{uri: `${photo}`}} alt={`${name}`} style={{width: 340, height: 240, borderRadius: 10}} />
            </View>


                <SafeAreaView style={styles.commBlock}>
                    <FlatList
                        data={allComm}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.oneComment}>
                                <View>
                            <Text style={styles.commNick}>
                                    {item.nickname}
                                </Text>
                                </View>
                                <View style={styles.commText}>
                                <Text style={{color: "#212121", fontSize: 18, marginBottom: 8}} >
                                    {item.comment}
                                </Text>
                                    <Text style={{color: "gray", fontSize: 13}}>{item.commentDate }</Text>
                                    </View>
                            </View>
                        )}
                    />
                </SafeAreaView>

            <View style={styles.commentInputBox}>
                <TextInput
                    style={styles.commentInput}
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                    placeholder="Comment..."
                />
                <TouchableOpacity
                    style={styles.sendCommBtn}
                    onPress={sendComment}
                >
                    <EvilIcons name="arrow-up" size={34} color="#fff" />
                </TouchableOpacity>
            </View>
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
    pictureInComm: {
        width: 340,
        height: 240,
        marginTop: 0,
        marginBottom: 10,
    },
    commBlock: {
        width: 340,
        height: 200,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 5,
        borderRadius: 10,
        border: 'transparent',
    },
    commentInputBox: {
        width: 340,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 10,
        paddingVertical: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
    },
    commentInput: {
        height: 50,
        width: 280,
        outline: 'none',
        border: 'none',
    },
    oneComment: {
        overflowY: 'scroll',
        paddingLeft: 10,
        paddingRight: 5,
        marginBottom: -15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "baseline",
        width: 340,
        height: 110,
    },
    commNick: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 30,
        // border: 'transparent',
        outline: 'none',
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "red"
    },
    commText: {
       border: "transparent",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: 270,
        minHeight: 70,
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        textAlign: 'center',
        backgroundColor: "#BDBDBD"
    },
    sendCommBtn: {
        backgroundColor: '#FF6C00',
        color: '#fff',
        width: 34,
        height: 34,
        borderRadius: 50,
        border: "transparent",
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default CommentsScreen
