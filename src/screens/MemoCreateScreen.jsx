import React from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView,
} from 'react-native';

import AppBar from '../components/Appbar';
import CircleButton from '../components/CircleButton';

export default function MemoCreateScreen() {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <AppBar />
            <View style={styles.inputContainer}>
                <TextInput value="hi" />
            </View>
            <CircleButton name="check" />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    inputContainer: {
        paddingHorizontal : 24,
        paddingVertical : 32,
        flex : 1,
    },
    input:{
        flex : 1,
        textAlignVertical:'top',
        fontSize : 16,
        lineHeight : 24,
    }
});


