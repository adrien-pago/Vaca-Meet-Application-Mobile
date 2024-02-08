import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import styles from '../Styles/ActivityRoomStyles';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca_meet_fond_2.png" };

type ActivityEvent = {
    LIB_ACTIVITE: string;
    NOM: string;
    NB_PLACE: number;
    HEURE_DEBUT: string;
    HEURE_FIN: string;
    DISPLAY_TIME?: string; // Pour afficher l'heure formatée
};

type ActivityRoomProps = {
    route: RouteProp<RootStackParamList, 'ActivityRoom'> & {
        params: {
            idCamping: number;
        };
    };
};

function ActivityRoom({ route }: ActivityRoomProps) {
    const { idCamping } = route.params;
    const [activities, setActivities] = useState<ActivityEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        loadActivities(selectedDate);
    }, [selectedDate]);

    const loadActivities = async (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];

        try {
            const response = await fetch(`https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoadActivityRoom.php?idCamping=${idCamping}&date=${dateStr}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status === 'success') {
                const formattedActivities = data.data.map((activity: ActivityEvent) => {
                    const startTime = new Date(activity.HEURE_DEBUT).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit'}) +'h';
                    const endTime = new Date(activity.HEURE_FIN).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) +'h';

                    return {
                        ...activity,
                        DISPLAY_TIME: `De ${startTime} à ${endTime}`
                    };
                });
                setActivities(formattedActivities);
            } else {
                console.error("Erreur dans la réponse du serveur: ", data.message);
                setActivities([]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des activités: ", error);
            setActivities([]);
        }
    };

    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            selectedDate.setHours(0, 0, 0, 0);
            setSelectedDate(selectedDate);
            setShowDatePicker(false);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.datePickerText}>Choisir un jour</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
                <Text style={styles.header}>Activités proposées par les vacanciers</Text>
                <Text style={styles.datesLabel}>
                    {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </Text>
                {activities.map((activity, index) => (
                    <View key={index} style={styles.activityContainer}>
                        <Text style={styles.activityText}>
                            {activity.LIB_ACTIVITE} Proposé par : {activity.NOM} {"\n"}Places restantes : {activity.NB_PLACE}{"\n"}
                            {activity.DISPLAY_TIME}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </ImageBackground>
    );
}

export default ActivityRoom;
