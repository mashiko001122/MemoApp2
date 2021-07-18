import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { string, bool, shape } from 'prop-types';
function Hello(props) {
    const { children, bang ,style} = props;
    return (
        <View>
            <Text style={[styles.text,style]}>
                {`Hello ${children} ${bang ? '!' : ''}`}
            </Text>
        </View>
    );
}

Hello.propTypes ={
    children:string.isRequired,
    bang:bool,
    style:shape(),
};
Hello.defaultProps = {
    bang : false,
    style : null,
};

const styles = StyleSheet.create({
 containert:{
     color : '#ffffff',
     backgroundColor : '#F0F4F8',

 },
})
export default Hello;
