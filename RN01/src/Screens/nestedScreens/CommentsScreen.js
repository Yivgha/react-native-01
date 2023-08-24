import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react';
import { EvilIcons } from '@expo/vector-icons'; 
import {useSelector} from "react-redux";
import db from "../../firebase/firebaseConfig";
import { collection, getFirestore, doc, addDoc } from 'firebase/firestore';

function CommentsScreen({ route }) {
    const {postId} = route.params;
    const [comment, setComment] = React.useState("");

    const {nickname} = useSelector(state => state.auth);

    const sendComment = () => {
        console.log("Sending comment", comment);
        createComment();
        setComment("");
    };

    const createComment = async () => {
        const myDB = getFirestore();
        // await collection(myDB, "posts").doc(postId).collection("comments").add({ comment, nickname })
        
         const createCommentRef = await addDoc(collection(myDB, `posts/${postId}/comments`),
             { comment, nickname });
        return createCommentRef;
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.pictureInComm}>
                <Text>Photo here</Text>
            </View>

            <View style={styles.commBlock}>
                <Text>Comments here</Text>
            </View>

            <View style={styles.commentInputBox}>
                <TextInput style={styles.commentInput} value={comment} onChangeText={text => setComment(text)} placeholder='Comment...'/>
                <TouchableOpacity style={styles.sendCommBtn} onPress={sendComment}> 
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
        borderColor: "black",
        borderWidth: 1,
    },
    commBlock: {
        width: 340,
        height: 180,
        marginBottom: 10,
        borderColor: "black",
        borderWidth: 1,
    },
    commentInputBox: {
        width: 340,
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 10,
        paddingVertical: 5,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 50,
    },
    commentInput: {
        height: 50,
        width: 280,
        outline: "none",
        border: "none",
    },
    sendCommBtn: {
        backgroundColor: "#FF6C00",
        color: "#fff",
        width: 34,
        height: 34,
        borderRadius: 50,
        outline: "none",
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default CommentsScreen
