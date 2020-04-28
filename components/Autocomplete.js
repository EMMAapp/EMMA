import React, {useEffect, useRef} from 'react'
import SearchableDropdown from 'react-native-searchable-dropdown';
import localization, {isRTL} from "../utils/localization";
import {borderRadiusStyle, marginStyle, paddingStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import {YellowBox} from 'react-native'

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested'
]);

export default ({items, selectedItem, setSelectedItem, itemWidth, textAlign, style, keyboardType, placeholderKey}) => {
    const {item} = selectedItem;
    const textInputRef = useRef(null);
    useEffect(
        () => {
            if (item && textInputRef.current && item !== textInputRef.current.props.value) {
                if (Platform.OS === 'ios') {
                    setTimeout(() => {
                        textInputRef.current?.setNativeProps({text: item});
                    }, 500);
                }
                else {
                    textInputRef.current.setNativeProps({text: item});
                }
            }
        }, [selectedItem, textInputRef]);

    const itemStyle = {
        backgroundColor: Colors.grayLight,
        borderColor: Colors.grayMedium,
        color: Colors.grayDark,
        width: itemWidth,
        textAlign: textAlign,
        ...paddingStyle(5)
    };

    return <SearchableDropdown
        style={style}
        onItemSelect={(item) => setSelectedItem(item.name)}
        containerStyle={{...marginStyle(5, 'top'), ...style}}
        itemStyle={itemStyle}
        itemTextStyle={{color: Colors.grayDark, alignSelf: 'flex-start'}}
        itemsContainerStyle={{borderColor: Colors.grayMedium, borderWidth: 1, ...borderRadiusStyle(5), ...marginStyle(1, 'top')}}
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
                onEndEditing: (e) => setSelectedItem(e.nativeEvent.text || item),
                textAlign: isRTL ? 'right' : 'left'
            }
        }
        listProps={
            {
                nestedScrollEnabled: true,
                maxHeight: 200
            }
        }
        setSort={(item, searchedText) =>
            item.aliases.some(
                alias => alias.toLowerCase().includes(searchedText.toLowerCase())
            )}
    />
}