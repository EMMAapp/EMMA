import React, {useState} from 'react'
import {Button, StyleSheet, Text, TextInput, View} from 'react-native'
import {REGISTER} from "../../navigation/Routes";
import {logInWithFacebook} from '../../store';
import RouteGuard from "../../navigation/RouteGuard";
import localization from "../../utils/localization";

export default function LoginScreen({navigation, screenProps}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const {setIsLoading} = screenProps;

    const handleLogin = async () => {
        const success = await logInWithFacebook();
        if (success) {
            RouteGuard(navigation);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{color: '#e93766', fontSize: 40}}>{localization('auth.signin')}</Text>
            {errorMessage &&
            <Text style={{color: 'red'}}>
                {errorMessage}
            </Text>}
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder={localization('auth.email-placeholder')}
                onChangeText={newEmail => setEmail(newEmail)}
                value={email}
            />
            <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder={localization('auth.password-placeholder')}
                onChangeText={newPassword => setPassword(newPassword)}
                value={password}
            />
            <Button title={localization('auth.signin')} color="#e93766" onPress={handleLogin}/>
            <View>
                <Text>
                    {localization('auth.dont-have-an-account')}
                    <Text onPress={() => navigation.navigate(REGISTER)} style={{color: '#e93766', fontSize: 18}}> {localization('auth.signup')} </Text
                    ></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        fontSize: 20,
        width: '90%',
        borderColor: '#9b9b9b',
        borderBottomWidth: 1,
        marginTop: 8,
        marginVertical: 15
    }
});
