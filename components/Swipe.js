import React from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import {isRTL} from "../utils/localization";

const THRESHOLD = 20;

export default ({children, onUp, onDown, onLeft, onRight, style}) =>
    <GestureRecognizer
        style={style}
        onSwipe={(gestureName, gestureState) => {
            let {dx, dy} = gestureState;
            if (isRTL) {
                dx = -1 * dx;
            }
            if (dx > THRESHOLD && onLeft) {
                onLeft();
            }
            if (dx < -1 * THRESHOLD && onRight) {
                onRight();
            }
            if (dy > THRESHOLD && onDown) {
                onDown();
            }
            if (dy < -1 * THRESHOLD && onUp) {
                onUp();
            }
        }}>
        {children}
    </GestureRecognizer>
