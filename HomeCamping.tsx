import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'; 
import styles from './HomeCampingStyles';
import { PlanningEvent } from './types';
import WeeklyPlanning from './WeeklyPlanning';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/fond_vaca_meet.jpg" };
const defaultProfilePic = require('./ASSET/profil.jpg');

function HomeCamping() {
    const [userPhoto, setUserPhoto] = useState(defaultProfilePic);
    const [planning, setPlanning] = useState<{ [key: string]: PlanningEvent[] }>({}); // Changé pour utiliser un objet
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPlanning, setShowPlanning] = useState(false);

    useEffect(() => {
        // Charger les informations de l'utilisateur (logique à implémenter)
    }, []);

    useEffect(() => {
        loadPlanning();
    }, [selectedDate]);

    const getWeekStartAndEnd = (date: Date) => {
        let startDate = new Date(date);
        let endDate = new Date(date);

        startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
        endDate.setDate(endDate.getDate() - endDate.getDay() + 7);

        return { startDate, endDate };
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const loadPlanning = async () => {
        const { startDate, endDate } = getWeekStartAndEnd(selectedDate);
        const startDateStr = formatDate(startDate);
        const endDateStr = formatDate(endDate);
        try {
            const response = await fetch(`https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoadPlanningCamping.php?dateDebut=${startDateStr}&dateFin=${endDateStr}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonResponse: any = await response.json(); // Ajouté ': any'

            if (jsonResponse.status === 'success') {
                const structuredPlanning = structurePlanningByDay(jsonResponse.data);
                setPlanning(structuredPlanning);
            } else {
                console.error("Erreur dans la réponse du serveur: ", jsonResponse.message);
            }
        } catch (error) {
            console.error("Erreur lors du chargement du planning: ", error);
        }
    };

    const structurePlanningByDay = (data: any[]) => { // Ajouté ': any[]'
        const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        let structuredData = { Lundi: [], Mardi: [], Mercredi: [], Jeudi: [], Vendredi: [], Samedi: [], Dimanche: [] };

        data.forEach((item: any) => { // Ajouté ': any'
            const dayOfWeek = new Date(item.DATE_HEURE_DEBUT).getDay();
            const dayName = weekDays[dayOfWeek - 1];
            structuredData[dayName as keyof typeof structuredData].push(item);
        });

        return structuredData;
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.profilePicContainer}>
                    <Image source={userPhoto} style={styles.profilePic} />
                </TouchableOpacity>
                <Text style={styles.text}>Bienvenue dans votre camping!</Text>
                <TouchableOpacity style={styles.button} onPress={() => setShowPlanning(!showPlanning)}>
                    <Text style={styles.buttonText}>Voir planning Camping</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Voir activité vacancier</Text>
                </TouchableOpacity>
                <View style={styles.dateControls}>
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={selectedDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2020-01-01"
                        maxDate="2025-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date: string) => {
                            setSelectedDate(new Date(date));
                            setShowPlanning(false);
                        }}
                    />
                </View>
                {showPlanning && <WeeklyPlanning planning={planning} />}
            </View>
        </ImageBackground>
    );
}

export default HomeCamping;
