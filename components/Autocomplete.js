import React, {useEffect, useState} from 'react'
import SearchableDropdown from 'react-native-searchable-dropdown';
import localization from "../utils/localization";
import {borderRadiusStyle, marginStyle, paddingStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested'
]);

export default ({items, selectedItem, setSelectedItem, itemWidth, textAlign, style, keyboardType}) => {

    const [query, setQuery] = useState('');

    useEffect(() => setQuery(selectedItem ? selectedItem : ''), [selectedItem, setQuery]);

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
        onItemSelect={(item) => {
            setSelectedItem(item.name);
            setQuery(item.name);
        }}
        containerStyle={{...marginStyle(5, 'top'), ...style}}
        itemStyle={itemStyle}
        itemTextStyle={{color: Colors.grayDark}}
        itemsContainerStyle={{borderColor: Colors.grayMedium, borderWidth: 1, ...borderRadiusStyle(5), ...marginStyle(1, 'top')}}
        items={items}
        textInputProps={
            {
                placeholder: localization('autocompletePlaceholder'),
                underlineColorAndroid: "transparent",
                style: {...itemStyle, ...borderRadiusStyle(5), borderWidth: 1},
                keyboardType: keyboardType,
                value: query,
                onChangeText: text => {
                    setQuery(text);
                    setSelectedItem(null);
                }
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