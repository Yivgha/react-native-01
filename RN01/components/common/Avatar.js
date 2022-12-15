import { useState, useRef } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const noAvatar = require('../../assets/images/no-avatar-1x.png')
const addBtnImg = require('../../assets/images/add-btn.png')
const deleteBtnImg = require('../../assets/images/cancel-circle.png')

const AvatarInput = () => {
    const [image, setImage] = useState(null)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        console.log(result)

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        } else {
            alert("You didn't select any photo")
        }
    }

    const onReset = () => {
        setImage(null)
    }

    return (
        <View
            style={[
                styles.wrapper,
                { transform: [{ translateY: -50 }, { translateX: 14 }] },
            ]}
        >
            {image ? (
                image && (
                    <Image
                        source={{ uri: image }}
                        style={{ width: 120, height: 120 }}
                    />
                )
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
