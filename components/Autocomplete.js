import React, {useState} from 'react'
import {Text, TouchableOpacity} from "react-native";
import Autocomplete from "react-native-autocomplete-input";

export default ({data, selectedItem, setSelectedItem}) => {

    const [query, setQuery] = useState('');
    const [hideAutoComplete, setHideAutoComplete] = useState(true);

    const filteredData = data.filter(
        item => item.aliases.some(
            alias => alias.toLowerCase().includes(query)
        )
    );

    return <Autocomplete
        data={filteredData.map(medication => medication.title)}
        defaultValue={selectedItem?.title}
        onChangeText={text => setQuery(text.toLowerCase())}
        renderItem={({item, i}) => (
            <TouchableOpacity
                onPress={() => {
                    setQuery('');
                    setSelectedItem(data.filter(it => it.title === item)[0]);
                    setHideAutoComplete(true);
                }}
            >
                <Text>{item}</Text>
            </TouchableOpacity>
        )}
        hideResults={hideAutoComplete}
        onBlur={() => setHideAutoComplete(true)}
        onFocus={() => setHideAutoComplete(false)}
    />
}