import React, {useState} from 'react'
import SearchableDropdown from 'react-native-searchable-dropdown';
import localization from "../utils/localization";
import {borderRadiusStyle, marginStyle, paddingStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import {LogBox} from 'react-native'
import {flipIfRtl} from "../utils/utils";

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested'
]);

export default ({items, selectedItem, setSelectedItem, itemWidth, center, style, keyboardType, placeholderKey}) => {
    const {item} = selectedItem;
    const [textValue, setTextValue] = useState(item || '');

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
                placeholder: localization(placeholderKey || 'autocompletePlaceholder'),
                underlineColorAndroid: "transparent",
                autoCapitalize: "none",
                style: {...itemStyle, ...borderRadiusStyle(5), borderWidth: 1},
                keyboardType: keyboardType,
                defaultValue: item || '',
                onTextChange: () => {
                    setTextValue(undefined)
                },
                onEndEditing: (e) => {
                    setTextValue(item)
                },
                textAlign: center ? 'center' : flipIfRtl('left'),
                value: textValue
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
