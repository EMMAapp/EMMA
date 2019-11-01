import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, View, Button} from 'react-native'
import firebase from "firebase";
import {LOGIN} from "../navigation/Routes";

export default function RegisterScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    
    const handleSignUp = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
        }
        catch (e) {
            setErrorMessage(e.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{color: '#e93766', fontSize: 40}}>Sign Up</Text>
            {errorMessage &&
            <Text style={{color: 'red'}}>
                {errorMessage}
            </Text>}
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={(newEmail) => setEmail(newEmail)}
                value={email}
            />
            <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={(newPassword) => setPassword(newPassword)}
                value={password}
            />
            <Button title="Sign Up" color="#e93766" onPress={handleSignUp}/>
            <View>
                <Text>
                    Already have an account?
                    <Text onPress={() => navigation.navigate(LOGIN)} style={{color: '#e93766', fontSize: 18}}> Login </Text>
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
