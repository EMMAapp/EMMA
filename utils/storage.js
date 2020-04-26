import {AsyncStorage} from 'react-native';

export const getItem = async (key) => JSON.parse(await AsyncStorage.getItem(key));

export const setItem = async (key, item) => await AsyncStorage.setItem(key, JSON.stringify(item));
