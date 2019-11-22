import React, {useState, useEffect} from 'react'
import SearchableDropdown from 'react-native-searchable-dropdown';
import localization from "../utils/localization";

export default ({items, selectedItem, setSelectedItem}) => {

    const [query, setQuery] = useState('');

    useEffect(() => setQuery(selectedItem ? selectedItem : ''), [selectedItem, setQuery]);

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