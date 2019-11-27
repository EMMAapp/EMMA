import EStyleSheet from 'react-native-extended-stylesheet';
import _ from "lodash"
import Colors from "./Colors";

export const calendarTheme = {
    textDayFontFamily: 'sf-pro-regular',
    textMonthFontFamily: 'sf-pro-regular',
    textDayHeaderFontFamily: 'sf-pro-regular',
    todayTextColor: Colors.purple,
    arrowColor: Colors.purple,
};

const toRem = (number) => `${number/10}rem`;

export const getHeightWidthStyle = (height, width) =>
    EStyleSheet.create({
        heightWidthStyle: {
            height: _.includes(height, "%") ? height : toRem(height),
            width: _.includes(width, "%") ? width : toRem(width),
        }
    }).heightWidthStyle;

export const getBorderRadiusStyle = (borderRadius) =>
    EStyleSheet.create({
        borderRadiusStyle: {
            borderRadius: toRem(borderRadius)
        }
    }).borderRadiusStyle;

export const getFontSizeStyle = (fontSize) =>
    EStyleSheet.create({
        fontSizeStyle: {
            fontSize: toRem(fontSize)
        }
    }).fontSizeStyle;

const styles = EStyleSheet.create({
    // padding
    p5: {
        padding: '0.5rem'
    },

    // padding-left
    pl2: {
        paddingLeft: '0.2rem'
    },
    pl5: {
        paddingLeft: '0.5rem'
    },

    // padding-top
    pt5: {
        paddingTop: '0.5rem'
    },
    pt15: {
        paddingTop: '1.5rem'
    },

    // padding-bottom
    pb2: {
        paddingBottom: '0.2rem'
    },
    pb5: {
        paddingBottom: '0.5rem'
    },
    pb10: {
        paddingBottom: '1rem'
    },

    // margin-top
    mt15: {
        marginTop: '1.5rem'
    },
    mt40: {
        marginTop: '4rem'
    },

    // margin
    m5: {
        margin: '0.5rem'
    },
    m7: {
        margin: '0.7rem'
    },

    fullWidth: {
        width: '100%'
    }
});

export default styles;
