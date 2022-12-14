import {useState} from 'react';
import { StyleSheet, View,  TextInput } from 'react-native';

const Input = ({
  onChangeText,
  iconPosition,
  icon,
value,
  style,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };
  return (
    <View
        style={[
          styles.inputWrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {flexDirection: getFlexDirection()},
        ]} focused={focused}>
        <View>{icon && icon}</View>

        <TextInput
          style={[styles.formInput, style]}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>
  );
};

export default Input;

const styles = StyleSheet.create({
   inputWrapper: {
        height: 50,
       borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 50,
    padding: 16,
    borderRadius: 6,
        color: "fff",
    marginBottom: 16,
    },
    formInput: {
         flex: 1,
        width: '100%',
    },
})