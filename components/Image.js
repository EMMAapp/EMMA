import React from "react";
import {Image} from "react-native";
import {hwStyle, borderRadiusStyle} from "../constants/Styles";

import Beach from "../assets/images/beach.png"
import BeachAnimation from "../assets/images/beach.gif"
import Motorcycle from "../assets/images/motorcycle.jpg"
import Wonder from "../assets/images/wonder.png"

const getImageByName = (name) => {
    switch (name) {
        case "beach":
            return Beach;
        case "beachAnimation":
            return BeachAnimation;
        case "motorcycle":
            return Motorcycle;
        case "wonder":
            return Wonder;
        default:
            return null;
    }
};

export default ({name, style, width, height, circled}) =>
    <Image
        style={[{resizeMode: 'contain'}, hwStyle(height, width), circled ? borderRadiusStyle(height / 2) : null, style]}
        source={getImageByName(name)}
    />
