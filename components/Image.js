import React from "react";
import {Image} from "react-native";
import {borderRadiusStyle, hwStyle} from "../constants/Styles";

import Beach from "../assets/images/beach.png"
import BeachAnimation from "../assets/images/beach.gif"
import Motorcycle from "../assets/images/motorcycle.jpg"
import Wonder from "../assets/images/wonder.png"
import Confused from "../assets/images/confused.jpg"
import WelcomeAnimation from "../assets/images/welcome.gif"

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
        case "confused":
            return Confused;
        case "welcomeAnimation":
            return WelcomeAnimation;
        default:
            return null;
    }
};

export default ({name, style, width, height, circled}) =>
    <Image
        style={[{resizeMode: 'contain'}, hwStyle(height, width), circled ? borderRadiusStyle(height / 2) : null, style]}
        source={getImageByName(name)}
    />
