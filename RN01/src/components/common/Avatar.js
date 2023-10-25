import { useState} from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { getAuth, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const noAvatar = require('../../../assets/images/no-avatar-1x.png')
const addBtnImg = require('../../../assets/images/add-btn.png')
const deleteBtnImg = require('../../../assets/images/cancel-circle.png')

const AvatarInput = ({ value, onChange, style, ...props }) => {
    
   

    const authFirebase = getAuth()
    const user = authFirebase.currentUser

    const [image, setImage] = useState(user?.photoURL !== null ? user?.photoURL : null);

const uploadAvatarToServer = async (image) => {
        const response = await fetch(image);
        const file = await response.blob();

        const storage = getStorage();
        const uniqueAvatarId = Date.now().toString();
        const storageRef = ref(storage, `profilePic/${uniqueAvatarId}`);
        
        await uploadBytes(storageRef, file).then((snapshot) => {console.log('Upload success');});       

        const processedPhoto = await getDownloadURL(storageRef);
        return processedPhoto;
    };


    const updateProfilePic = async (image) => {
        try {
            const photoURL = await uploadAvatarToServer(image, user.uid);

            await updateProfile(user, {
                photoURL: photoURL
            });
            
        } catch (e) {
            console.log(e);
        }
    };
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        if (!result.canceled) {
            setImage(result.assets[0].uri)
        } else {
            alert("You didn't select any photo")
        }
    }

    const onReset = () => {
        setImage('')
    };
    
    return (
        <View
            style={[
                styles.wrapper,
                { transform: [{ translateY: -50 }, { translateX: 14 }] },
            ]}
        >
            {image !== null ? (
               
                    <Image
                        value={value}
                        source={{ uri: image }}
                        style={[{ width: 120, height: 120 }, style]}
                        onChange={updateProfilePic(image)}
                        {...props}
                    />
                
            ) : (
                <Image source={noAvatar} style={styles.noAvatar} />
            )}
            <TouchableOpacity style={styles.avatarBtn}>
                <View
                    style={[
                        styles.avatarBtn,
                        {
                            transform: [
                                { translateY: -14 },
                                { translateX: -14 },
                            ],
                        },
                    ]}
                >
                    {image ? (
                        <TouchableOpacity onPress={onReset}>
                            <Image
                                source={deleteBtnImg}
                                style={[
                                    { width: 25 },
                                    { height: 25 },
                                    { tintColor: '#F6F6F6' },
                                    { backgroundColor: '#ffffff' },
                                    { borderRadius: 12 },
                                ]}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={pickImage}>
                            <Image source={addBtnImg} />
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default AvatarInput

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    noAvatar: {
        width: 120,
        height: 120,
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
    },
    avatarBtn: {
        width: 25,
        height: 25,
    },
})
