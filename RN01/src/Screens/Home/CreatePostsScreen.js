import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React, { useState, useEffect, useRef } from 'react'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { useIsFocused } from '@react-navigation/native';

function CreatePostsScreen({ navigation }, props) {
    const isFocused = useIsFocused()
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState("");

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);

    const takePhoto = async () => {
        if (photo === "") {
            const photo = await camera.takePictureAsync();
        console.log("Snap taken", photo.uri);
        setPhoto(photo.uri);
        await MediaLibrary.createAssetAsync(photo.uri);
        } else {
            deletePhoto();
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
        console.log("Posting");
            navigation.navigate("Posts", { photo });
            deletePhoto();
        }
    };

    const deletePhoto = () => {
        if (photo !== "") {
            console.log("Deleted");
            setPhoto("");
        } else {
            console.log("Nothing to delete");
        }
    }

     useEffect(() => {
         (async () => {
             const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [photo, camera]);

  if (hasPermission === null) {
      console.log("Has permission");
      return <View />
  }
    if (hasPermission === false) {
      console.log("No access to camera");
    return <Text>Enable access for Camera to proceed</Text>;
    }
    
    return (
        <View style={styles.wrapper}>
            <View style={styles.uploadBox}>
                {isFocused && <Camera style={styles.camera} type={type} ref={setCamera}>
                    <View style={styles.takePhotoContainer}>
                        <Image source={{ uri: photo }} style={{ height: "100%", width: "100%" }} />
                    </View>
                    <TouchableOpacity onPress={flipCamera} style={styles.flipBox}>
                        <MaterialCommunityIcons name="camera-flip-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.snapBox} onPress={takePhoto}>
                        <FontAwesome name="camera" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </Camera>}
                <Text style={styles.mainText}>Upload photo</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.sendBtn} onPress={sendPhoto}>
<Text style={{color: "#FFF"}}>Post photo</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.deleteBtn} onPress={deletePhoto}>
            <AntDesign name="delete" size={20} color="#BDBDBD"/>
                </TouchableOpacity>
            </View>
            {/* 
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
            </TouchableOpacity> */}
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
        paddingLeft: 5,
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
    uploadBox: {
        width: '100%',
        paddingHorizontal: 'auto',
        marginBottom: 16,
        height: 350,
        position: "relative",
    },
    camera: {
        height: 250,
        alignItems: 'center',
        marginBottom: 10,
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
        marginBottom: 10,
        marginHorizontal: "auto",
    },
    deleteBtn: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
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
