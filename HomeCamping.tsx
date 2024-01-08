import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import styles from './HomeCampingStyles';  

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca meet fond.png" };
const defaultProfilePic = require('./ASSET/profil.jpg'); // Assurez-vous que le chemin d'accès est correct

function HomeCamping() {
    const [userPhoto, setUserPhoto] = useState(defaultProfilePic);

    useEffect(() => {
        // Ici, vous pourriez charger la photo de profil de l'utilisateur, si disponible
        // setUserPhoto({ uri: "lien_vers_la_nouvelle_photo" });
    }, []);

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                {/* Rond avec la photo de profil */}
                <TouchableOpacity style={styles.profilePicContainer}>
                    <Image source={userPhoto} style={styles.profilePic} />
                </TouchableOpacity>

                <Text style={styles.text}>Bienvenue dans votre camping!</Text>
                
                {/* Bouton Voir planning Camping */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Voir planning Camping</Text>
                </TouchableOpacity>

                {/* Bouton Voir activité vacancier */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Voir activité vacancier</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

export default HomeCamping;
