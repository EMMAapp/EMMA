import React, {useState} from 'react'
import {Text, TouchableOpacity} from "react-native";
import SearchableDropdown from 'react-native-searchable-dropdown';
import localization from "../utils/localization";
import View from "react-native-web/dist/exports/View";

export default ({items, selectedItem, setSelectedItem}) => {

    const [query, setQuery] = useState('');

    if (selectedItem !== null && !query.length) {
        setQuery(selectedItem);
        return <View/>;
    }

    return <SearchableDropdown
        onItemSelect={(item) => {
            setSelectedItem(item.name);
            setQuery(item.name);
        }}
        containerStyle={{padding: 5}}
        itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
        }}
        itemTextStyle={{color: '#222'}}
        itemsContainerStyle={{maxHeight: 140}}
        items={items}
        textInputProps={
            {
                placeholder: localization('autocompletePlaceholder'),
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                value: query,
                onChangeText: text => {
                    setQuery(text);
                    setSelectedItem(null);
                }
            }
        }
        listProps={
            {
                nestedScrollEnabled: true
            }
        }
        setSort={(item, searchedText) =>
            item.aliases.some(
                alias => alias.toLowerCase().includes(searchedText.toLowerCase())
            )}
    />
}