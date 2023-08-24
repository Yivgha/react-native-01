import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import {useSelector} from "react-redux"
import { AntDesign } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React, { useState, useEffect, useRef } from 'react'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { useIsFocused } from '@react-navigation/native';
import * as Location from "expo-location";
import db from "../../firebase/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {  collection, addDoc, getFirestore } from 'firebase/firestore';

function CreatePostsScreen({ navigation }, props) {
    const isFocused = useIsFocused();

    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState("");
    const [location, setLocation] = useState("Set location");
    const [name, setName] = useState("");

    const [type, setType] = useState(CameraType.back);

    const { userId, nickname } = useSelector((state) => state.auth);

    const takePhoto = async () => {
        if (photo === "") {
            const photo = await camera.takePictureAsync();
            const location = await Location.getCurrentPositionAsync();

            console.log("location", location);
            setPhoto(photo.uri);
            setLocation(location);

        await MediaLibrary.createAssetAsync(photo.uri);
        } else {
            setPhoto("");
            setName("");
            setLocation("");
        }
        
    };

    const flipCamera = () => {
        setType(
            type === CameraType.back
                ? CameraType.front
                : CameraType.back
        );
    };

    const sendPhoto = () => {
        if (photo !== "") {
            uploadPostToServer();
            navigation.navigate("DefaultPostsScreen",
                { photo, name, location });
            deletePhoto();
        }
    };

    const uploadPhotoToServer = async () => {
        const response = await fetch(photo);
        const file = await response.blob();

        const storage = getStorage();
        const uniquePostId = Date.now().toString();
        const storageRef = ref(storage, `postImage/${uniquePostId}`);
        
        await uploadBytes(storageRef, file).then((snapshot) => {console.log('Upload success');});       


        const processedPhoto = await getDownloadURL(storageRef);

        return processedPhoto;
    };

    const uploadPostToServer = async () => {
        const photo = await uploadPhotoToServer();

        const myDB = getFirestore();

        const createPostRef = await addDoc(collection(myDB, "posts"), { photo, name, location: location.coords, userId, nickname });
        return createPostRef;
    };

    const deletePhoto = () => {
        if (photo !== "") {
            console.log("Deleted");
            setPhoto("");
            setName("");
            setLocation("");
        } else {
            console.log("Nothing to delete");
        }
    }

     useEffect(() => {
         (async () => {
             const { status } = await Camera.requestCameraPermissionsAsync();
             await Location.requestForegroundPermissionsAsync();
             await MediaLibrary.requestPermissionsAsync();
             
    if (status !== "granted") {
      console.log("No access to camera");
    return <Text>Enable access for Camera to proceed</Text>;
    }
         })();  
     }, [photo, camera]);
  

  
    
    return (
        <View style={styles.wrapper}>
            <View style={styles.uploadBox}>
                {isFocused && <Camera style={styles.camera} type={type} ref={setCamera}>
                    <View style={styles.takePhotoContainer}>
                       {photo !== "" && (<Image source={{ uri: photo }} style={{ height: "100%", width: "100%" }} />)} 
                    </View>
                    <TouchableOpacity onPress={flipCamera} style={styles.flipBox}>
                        <MaterialCommunityIcons name="camera-flip-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.snapBox} onPress={takePhoto}>
                        <FontAwesome name="camera" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </Camera>}
                <Text style={styles.mainText}>Touch icon to make a photo</Text>
            </View>

            <View style={styles.nameBox}>
                <TextInput style={styles.mainText} value={name} placeholder='Set name' onChangeText={text => setName(text)} />
            </View>

            <View style={styles.locationBox}>
                <EvilIcons
                                        name="location"
                                        size={30}
                                        color="gray"
                                        />
                <TextInput style={styles.mainText} value={location} onChange={newLoc => setLocation(newLoc)}
                    placeholder={`${location?.coords?.latitude?.toString()}, ${location?.coords?.longitude?.toString()}`} />
            </View>

             <View>
                <TouchableOpacity style={styles.sendBtn} onPress={sendPhoto}>
<Text style={styles.sendBtnText}>Publish</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.deleteBtn} onPress={deletePhoto}>
            <AntDesign name="delete" size={20} color="#BDBDBD"/>
                </TouchableOpacity>
            </View>
          
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 10,
        alignItems: 'center',
    },
    mainText: {
        color: '#BDBDBD',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        paddingLeft: 5,
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
    uploadBox: {
        width: '100%',
        paddingHorizontal: 'auto',
        marginBottom: 15,
        position: "relative",
    },
    camera: {
        height: 250,
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 10,
    },
    snap: { color: '#fff' },
    snapBox: {
        marginTop: 90,
        borderWidth: 1,
        borderColor: '#fff',
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    takePhotoContainer: {
        position: "absolute",
        top: 10,
        left: 10,
        borderColor: "#fff",
        borderWidth: 1,
        height: 40,
        width: 40,
    },
    flipBox: {
        position: "absolute",
        top: 10,
        right: 10,
        height: 30,
        width: 30,
        color: "#fff",
    },
    sendBtn: {
        width: 300,
        height: 50,
        backgroundColor: "#FF6C00",
        borderRadius: 50,
        color: "#BDBDBD",
         alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        marginHorizontal: "auto",
    },
    sendBtnText: {
        color: "#fff"
    },
    nameBox: {
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 'auto',
        marginBottom: 10,
    },
    locationBox: {
        flexDirection: 'row',
       alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 'auto',
         marginBottom: 10,
    },
})
export default CreatePostsScreen
