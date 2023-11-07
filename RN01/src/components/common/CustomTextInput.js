import { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

const CustomInput = ({ onChangeText, value, style, ...props }) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <View
            style={[
                styles.inputWrapper,
                { borderColor: isFocused ? '#FF6C00' : '#F6F6F6' },
                { color: isFocused ? '#BDBDBD' : '#212121' },
                { backgroundColor: isFocused ? '#ffffff' : '#F6F6F6' },
            ]}
            isFocused={isFocused}
            onFocus={() => {
                setIsFocused(true)
            }}
            onBlur={() => {
                setIsFocused(false)
            }}
        >
            <TextInput
                underlineColorAndroid={'rgba(0,0,0,0)'}
                style={[styles.formInput, style]}
                onChangeText={onChangeText}
                value={value}
                onFocus={() => {
                    setIsFocused(true)
                }}
                onBlur={() => {
                    setIsFocused(false)
                }}
                {...props}
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: 16,
        borderWidth: 1,
        backgroundColor: '#F6F6F6',
        borderStyle: 'solid',
        height: 50,
        padding: 16,
        borderRadius: 8,
        textAlign: 'left',
    },
    formInput: {
        flex: 1,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        borderWidth: 0,
        // underlineColorAndroid: 'transparent',
    },
})
