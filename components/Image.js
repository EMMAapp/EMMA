import React from "react";
import {Image} from "react-native";
import {borderRadiusStyle, hwStyle} from "../constants/Styles";

import Beach from "../assets/images/beach.png"
import BeachAnimation from "../assets/images/beach.gif"
import Motorcycle from "../assets/images/motorcycle.png"
import Wonder from "../assets/images/wonder.png"
import Confused from "../assets/images/confused.jpg"
import WelcomeAnimation from "../assets/images/welcome.gif"
import Followup from "../assets/images/followup.png"
import Plan from "../assets/images/plan.png"
import Yoga from "../assets/images/yoga.png"
import CatBook from "../assets/images/catbook.png"
import Confetti from "../assets/images/confetti.png"
import Writing from "../assets/images/writing.png"
import Logo from "../assets/images/logo.png"
import Tips from "../assets/images/tips.png"
import Procedure from "../assets/images/procedure.png"
import WeeksWait from "../assets/images/weekswait.png"
import Onboarding1 from "../assets/images/onboarding1.png"
import Onboarding2 from "../assets/images/onboarding2.png"
import Onboarding3 from "../assets/images/onboarding3.png"
// Update in App.js load if you add an image ^

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
        case "writing":
            return Writing;
        case "logo":
            return Logo;
        case "tips":
            return Tips;
        case "procedure":
            return Procedure;
        case "weekswait":
            return WeeksWait;
        case "onboarding1":
            return Onboarding1;
        case "onboarding2":
            return Onboarding2;
        case "onboarding3":
            return Onboarding3;
        default:
            return null;
    }
};

export default ({name, style, width, height, circled}) =>
    <Image
        style={[{resizeMode: 'contain'}, hwStyle(height, width), circled ? borderRadiusStyle(height / 2) : null, style]}
        source={getImageByName(name) || CatBook}
    />
