import React from "react";
import {Image} from "react-native";
import {borderRadiusStyle, hwStyle} from "../constants/Styles";

import Beach from "../assets/images/beach.png"
import BeachAnimation from "../assets/images/beach.gif"
import Motorcycle from "../assets/images/motorcycle.jpg"
import Wonder from "../assets/images/wonder.png"
import Confused from "../assets/images/confused.jpg"
import WelcomeAnimation from "../assets/images/welcome.gif"
import Followup from "../assets/images/followup.png"
import Plan from "../assets/images/plan.png"
import Yoga from "../assets/images/yoga.png"
import CatBook from "../assets/images/catbook.png"
import Confetti from "../assets/images/confetti.png"

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
        case "followup":
            return Followup;
        case "plan":
            return Plan;
        case "yoga":
            return Yoga;
        case "catbook":
            return CatBook;
        case "confetti":
            return Confetti;
        default:
            return null;
    }
};

export default ({name, style, width, height, circled}) =>
    <Image
        style={[{resizeMode: 'contain'}, hwStyle(height, width), circled ? borderRadiusStyle(height / 2) : null, style]}
        source={getImageByName(name) || CatBook}
    />
