import React, {useEffect, useRef} from 'react'
import SearchableDropdown from 'react-native-searchable-dropdown';
import localization from "../utils/localization";
import {borderRadiusStyle, marginStyle, paddingStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import {YellowBox} from 'react-native'
import {flipIfRtl} from "../utils/utils";

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested'
]);

export default ({items, selectedItem, setSelectedItem, itemWidth, center, style, keyboardType, placeholderKey}) => {
    const {item} = selectedItem;
    const textInputRef = useRef(null);

    const setNativeText = (text) => {
        if (Platform.OS === 'ios') {
            setTimeout(() => {
                textInputRef.current?.setNativeProps({text});
            }, 500);
        }
        else {
            textInputRef.current.setNativeProps({text});
        }
    };

    useEffect(
        () => {
            if (item && textInputRef.current && item !== textInputRef.current.props.value) {
                setNativeText(item);
            }
        }, [selectedItem, textInputRef]);

    const itemStyle = {
        backgroundColor: Colors.grayLight,
        borderColor: Colors.grayMedium,
        color: Colors.grayDark,
        width: itemWidth,
        ...paddingStyle(5)
    };

    return <SearchableDropdown
        style={style}
        onItemSelect={(item) => setSelectedItem(item.name)}
        containerStyle={{...marginStyle(5, 'top'), ...style}}
        itemStyle={itemStyle}
        itemTextStyle={{color: Colors.grayDark, alignSelf: center ? 'center' : 'flex-start'}}
        itemsContainerStyle={{
            width: '100%',
            borderColor: Colors.grayMedium,
            borderWidth: 1,
            ...borderRadiusStyle(5),
            ...marginStyle(1, 'top')
        }}
        items={items}
        textInputProps={
            {
                ref: textInputRef,
                placeholder: localization(placeholderKey || 'autocompletePlaceholder'),
                underlineColorAndroid: "transparent",
                autoCapitalize: "none",
                style: {...itemStyle, ...borderRadiusStyle(5), borderWidth: 1},
                keyboardType: keyboardType,
                defaultValue: item || '',
                onEndEditing: (e) => {
                    const {text} = e.nativeEvent;
                    if (!text) {
                        setNativeText(item);
                    }
                },
                textAlign: center ? 'center' : flipIfRtl('left')
            }
        }
        listProps={
            {
                nestedScrollEnabled: true,
                maxHeight: 200,
                backgroundColor: Colors.grayLight
            }
        }
        setSort={(item, searchedText) =>
            item.aliases.some(
                alias => alias.toLowerCase().includes(searchedText.toLowerCase())
            )}
    />
}
