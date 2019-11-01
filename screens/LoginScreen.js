import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, View, Button} from 'react-native'
import {REGISTER} from "../navigation/Routes";
import * as firebase from "firebase";

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        }
        catch (e) {
            setErrorMessage(e.message)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{color: '#e93766', fontSize: 40}}>Login</Text>
            {errorMessage &&
            <Text style={{color: 'red'}}>
                {errorMessage}
            </Text>}
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={newEmail => setEmail(newEmail)}
                value={email}
            />
            <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={newPassword => setPassword(newPassword)}
                value={password}
            />
            <Button title="Login" color="#e93766" onPress={handleLogin}/>
            <View>
                <Text>
                    Don't have an account?
                    <Text onPress={() => navigation.navigate(REGISTER)} style={{color: '#e93766', fontSize: 18}}> Sign Up </Text
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
