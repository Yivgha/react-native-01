import {useState, useRef} from 'react';
import { StyleSheet, View,  Image, TouchableOpacity, } from 'react-native';

const noAvatar = require("../../assets/images/no-avatar-1x.png");
const addBtnImg = require("../../assets/images/add-btn.png");
const deleteBtnImg = require("../../assets/images/delete-btn.png");

const AvatarInput = () => {

    const sheetRef = useRef(null);
    
    const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
    };
    
     const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
    };
    
    const onFileSelected = (image) => {
    closeSheet();
    setLocalFile(image);
  };
    return (
        <View style={[styles.wrapper, { transform: [{ translateY: -50 }, { translateX: 14 }]}]} onPress={openSheet} onFileSelected={onFileSelected}>
            <Image source={noAvatar} style={styles.noAvatar} />
            <TouchableOpacity style={styles.avatarBtn} onPress={openSheet} closeSheet={closeSheet} openSheet={openSheet}>
                
<View style={[styles.avatarBtn, {
        transform: [{ translateY: -14 }, { translateX: -14}]
      }]}>
                    <Image source={addBtnImg} />
      </View>
            </TouchableOpacity>
    </View>
)
}

export default AvatarInput;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "baseline",
    },
    noAvatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    },
    avatarBtn: {
        width: 25,
        height: 25, 
    }
})