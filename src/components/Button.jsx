import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import { string } from 'prop-types';

export default function Button(props) {
    const { label,onPress } = props;
    return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
    );
}
Button.prototype = {
    label: string.isRequired,
};
Button.defaultProps= {
    onPress: null,
};
const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#367FD3',
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 24,
    },
    buttonLabel: {
        fontSize: 16,
        lineHeight: 32,
        paddingVertical: 8,
        paddingHorizontal: 32,
        color: '#FFFFFF',
    },
});
