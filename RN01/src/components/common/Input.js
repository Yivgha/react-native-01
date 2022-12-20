import { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

const PasswordInput = ({
    onChangeText,
    iconPosition,
    icon,
    value,
    style,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const getFlexDirection = () => {
        if (icon && iconPosition) {
            if (iconPosition === 'left') {
                return 'row'
            } else if (iconPosition === 'right') {
                return 'row-reverse'
            }
        }
    }
    return (
        <View
            style={[
                styles.inputWrapper,
                { alignItems: icon ? 'center' : 'baseline' },
                { flexDirection: getFlexDirection() },
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
            <View>{icon && icon}</View>

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

export default PasswordInput

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: 32,
        borderWidth: 1,
        backgroundColor: '#F6F6F6',
        borderStyle: 'solid',
        height: 50,
        padding: 16,
        borderRadius: 8,
    },
    formInput: {
        flex: 1,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        borderWidth: 0,
        outlineStyle: 'none',
    },
})
