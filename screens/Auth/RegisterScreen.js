import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, View, Button} from 'react-native'
import {LOGIN} from "../../navigation/Routes";
import {registerPatient} from '../../store';
import RouteGuard from "../../navigation/RouteGuard";
import localization from "../../utils/localization";

export default function RegisterScreen({navigation, screenProps}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const {setIsLoading} = screenProps;

    const handleSignUp = async () => {
        setIsLoading(true);
        const {success, errorMessage} = await registerPatient(email, password);
        setIsLoading(false);
        if (success) {
            RouteGuard(navigation);
        }
        else {
            setErrorMessage(errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{color: '#e93766', fontSize: 40}}>{localization('auth.signup')}</Text>
            {errorMessage &&
            <Text style={{color: 'red'}}>
                {errorMessage}
            </Text>}
            <TextInput
                placeholder={localization('auth.email-placeholder')}
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={(newEmail) => setEmail(newEmail)}
                value={email}
            />
            <TextInput
                secureTextEntry
                placeholder={localization('auth.password-placeholder')}
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={(newPassword) => setPassword(newPassword)}
                value={password}
            />
            <Button title={localization('auth.signup')} color="#e93766" onPress={handleSignUp}/>
            <View>
                <Text>
                    {localization('auth.already-have-an-account')}
                    <Text onPress={() => navigation.navigate(LOGIN)} style={{color: '#e93766', fontSize: 18}}> {localization('auth.signin')} </Text>
                </Text>
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
