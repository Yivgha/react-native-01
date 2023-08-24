import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
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
    onSnapshot,
} from 'firebase/firestore'

function CommentsScreen({ route }) {
    const { postId } = route.params
    const [comment, setComment] = useState('')
    const [allComm, setAllComm] = useState([])

    const { nickname } = useSelector((state) => state.auth)

    const myDB = getFirestore()

    const sendComment = () => {
        console.log('Sending comment', comment)
        createComment()
        setComment('')
    }

    const createComment = async () => {
        const createCommentRef = await addDoc(
            collection(myDB, `posts/${postId}/comments`),
            { comment, nickname }
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
                    }
                })
                setAllComm(documents)
            }
        )
        return () => commQuery()
    }

    useEffect(() => {
        getAllComments()
    }, [])

    return (
        <View style={styles.wrapper}>
            <View style={styles.pictureInComm}>
                <Text>Photo here</Text>
            </View>

            <View style={styles.commBlock}>
                <SafeAreaView>
                    <FlatList
                        data={allComm}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.oneComment}>
                                <Text style={styles.commNick}>
                                    {item.nickname}
                                </Text>
                                <Text style={styles.commText}>
                                    {item.comment}
                                </Text>
                            </View>
                        )}
                    />
                </SafeAreaView>
            </View>

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
        height: 200,
        marginTop: 0,
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    commBlock: {
        width: 340,
        height: 180,
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: 1,
        paddingTop: 10,
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
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 340,
        height: 100,
    },
    commNick: {
        width: 40,
        height: 40,
        borderRadius: 50,
        border: 'transparent',
        outline: 'none',
    },
    commText: {
        borderRadius: 20,
        borderWidth: 1,
        width: 270,
        height: 90,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 10,
    },
    sendCommBtn: {
        backgroundColor: '#FF6C00',
        color: '#fff',
        width: 34,
        height: 34,
        borderRadius: 50,
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default CommentsScreen
