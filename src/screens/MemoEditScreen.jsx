import React, { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Alert,
} from 'react-native';
import { shape,string } from 'prop-types';
import CircleButton from '../components/CircleButton';
import firebase from 'firebase';
import { translateErrors } from '../utils';

export default function MemoEditScreen(props) {
    const { navigation, route  } = props;
    const { id, bodyText } = route.params;
    const [body, setBody] = useState(bodyText);

    function handlePress() {
        const { currentUser } = firebase.auth();
        if (currentUser) {
            console.log(id);
            const db = firebase.firestore();
            const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
            ref.set({
                bodyText: body,
                updatedAt: new Date(),
            }, {merge: true})
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                const errorMsg = translateErrors(error.code);
                Alert.alert(errorMsg.tirle, errorMsg.description );
            });
        }

    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <View style={styles.inputContainer}>
                <TextInput
                value={body}
                multiline
                style={styles.input}
                onChangeText={(text) => { setBody(text); }}
            />
            </View>
            <CircleButton
                name="check"
                onPress = {handlePress}
            />
        </KeyboardAvoidingView>
    );
}

MemoEditScreen.propTypes = {
    route: shape({
        params: shape({ id: string ,bodyText: string}),
    }).isRequired,
};

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    inputContainer: {
        flex : 1,
    },
    input:{
        flex : 1,
        textAlignVertical:'top',
        fontSize : 16,
        lineHeight : 24,
        paddingTop: 32,
        paddingBottom: 32,
        paddingHorizontal: 27,
    }
});


