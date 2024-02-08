import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, ImageBackground } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import styles from '../Styles/ActivityRoomStyles';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca_meet_fond_2.png" };

type ActivityEvent = {
    LIBELLE_EVENT_ROOM: string;
    NOM: string;
    NB_VACA: number;
    DATE: string;
    HEURE: string;
    DISPLAY_TIME?: string;
};

type NomActivite = {
    id: string;
    nom: string;
};

type ActivityRoomProps = {
    route: RouteProp<RootStackParamList, 'ActivityRoom'>;
};

const ActivityRoom: React.FC<ActivityRoomProps> = ({ route }) => {
    const { idCamping } = route.params;
    const [activities, setActivities] = useState<ActivityEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadActivities(selectedDate);
    }, [selectedDate, idCamping]);

    const loadActivities = async (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        try {
            const response = await fetch(`https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoadActivityRoom.php?idCamping=${idCamping}&date=${dateStr}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.status === 'success') {
                const formattedActivities: ActivityEvent[] = data.data.map((activity: ActivityEvent) => ({
                    ...activity,
                    // Supprimez ou ajustez cette ligne selon vos besoins
                    DISPLAY_TIME: `${activity.HEURE}` // Utilisez directement HEURE si c'est suffisant pour vos besoins
                }));
                setActivities(formattedActivities);
            } else {
                console.error("Erreur dans la réponse du serveur: ", data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des activités: ", error);
        }
    };


    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setSelectedDate(new Date(selectedDate.setHours(0, 0, 0, 0)));
            setShowDatePicker(false);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}> {/* Correction ici */}
                    <Text style={styles.datePickerText}>Choisir un jour</Text>
                </TouchableOpacity>
                {showDatePicker && ( // Correction ici
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
                <Text style={styles.header}>Activités proposées pour le jour sélectionné</Text>
                {activities.map((activity, index) => (
                    <View key={index} style={styles.activityContainer}>
                        <Text style={styles.activityText}>
                            {activity.LIBELLE_EVENT_ROOM} - Proposé par : {activity.NOM}
                            {"\n"}Places restantes : {activity.NB_VACA}
                            {"\n"}Date: {activity.DATE}, Heure: {activity.HEURE}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </ImageBackground>
    );
};

export default ActivityRoom;