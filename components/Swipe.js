import React from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

const THRESHOLD = 20;

export default ({children, onUp, onDown, onLeft, onRight}) =>
    <GestureRecognizer
        onSwipe={(gestureName, gestureState) => {
            const {dx, dy} = gestureState;
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
