import React from 'react';
import { createIconSetFromIcoMoon} from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';

import icomoon from '../../assets/fonts/icomoon.ttf';
import selection from '../../assets/fonts/selection.json';
import {number, string, oneOf} from 'prop-types'

export default function Icon(props){
    const [fontLoaded] = useFonts({ icomoon });
    const { name, size, color } = props;
    const CustomIcon = createIconSetFromIcoMoon(selection);
    if(!fontLoaded){
        return null;
    }
    return <CustomIcon name={name} size={size} color={color} style={{ lineHeight: size - 1}} />;
}

Icon.propTypes = {
    name : oneOf(['plus', 'delete', 'Pencil', 'check']).isRequired,
    size : number,
    color : string,
};

Icon.defaultProps = {
    size : 24,
    color : '#000000',
};

