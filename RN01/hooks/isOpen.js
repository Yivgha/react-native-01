import React, { useState, useRef, useEffect} from "react";
import { Keyboard } from "react-native";

export function useKeyboardStatus(){
  const [isOpen, setIsOpen] = useState(true);
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);

  useEffect(() => {
    keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => setIsOpen(false));
    keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));

    return () => {
      keyboardShowListener.current.remove();
      keyboardHideListener.current.remove();
    }
  })

  return isOpen;
}