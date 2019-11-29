import React from "react";
import Beach from "../assets/images/beach.png"
import BeachAnimation from "../assets/images/beach.gif"
import {Image} from "react-native";
import {hwStyle} from "../constants/Styles";

const getImageByName = (name) => {
    switch (name) {
        case "beach":
            return Beach;
        case "beachAnimation":
            return BeachAnimation;
        default:
            return null;
    }
};

export default ({name, style, width, height}) =>
    <Image
        style={[{resizeMode: 'contain'}, hwStyle(height, width), style]}
        source={getImageByName(name)}
    />
