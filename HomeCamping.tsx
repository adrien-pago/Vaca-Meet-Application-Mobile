import React from 'react';
import { View, Text } from 'react-native';
import styles from './HomeCampingStyles';  

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca meet fond.png" };

function HomeCamping() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue dans votre camping!</Text>
        </View>
    );
}

export default HomeCamping;
