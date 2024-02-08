import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Button, TextInput, ImageBackground } from 'react-native';
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
    DISPLAY_TIME?: string;
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
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [nbPlace, setNbPlace] = useState('');

    // États pour contrôler l'affichage des DateTimePickers
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

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

    const onChangeStartTime = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setStartTime(selectedDate);
        }
        setShowStartTimePicker(false);
    };

    const onChangeEndTime = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setEndTime(selectedDate);
        }
        setShowEndTimePicker(false);
    };

    const submitActivity = async () => {
        setModalVisible(false);
        // Ici, vous pouvez envoyer les données au serveur via fetch()
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
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                    <Text style={styles.buttonText}>Proposer une activité</Text>
                </TouchableOpacity>
                {activities.map((activity, index) => (
                    <View key={index} style={styles.activityContainer}>
                        <Text style={styles.activityText}>
                            {activity.LIB_ACTIVITE} Proposé par : {activity.NOM} {"\n"}Places restantes : {activity.NB_PLACE}{"\n"}
                            {activity.DISPLAY_TIME}
                        </Text>
                    </View>
                ))}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Proposer une activité</Text>
                        <Picker
                            selectedValue={selectedActivity}
                            style={styles.picker}
                            onValueChange={(itemValue: string | number, itemIndex: number) => setSelectedActivity(itemValue.toString())}
                        >
                            <Picker.Item label="Activité 1" value="1" />
                            <Picker.Item label="Activité 2" value="2" />
                        </Picker>
                        <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                            <Text>Afficher le sélecteur de début</Text>
                        </TouchableOpacity>
                        {showStartTimePicker && (
                            <DateTimePicker
                                value={startTime}
                                mode="datetime"
                                display="default"
                                onChange={onChangeStartTime}
                            />
                        )}
                        <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                            <Text>Afficher le sélecteur de fin</Text>
                        </TouchableOpacity>
                        {showEndTimePicker && (
                            <DateTimePicker
                                value={endTime}
                                mode="datetime"
                                display="default"
                                onChange={onChangeEndTime}
                            />
                        )}
                        <TextInput
                            placeholder="Nombre de places"
                            keyboardType="numeric"
                            onChangeText={setNbPlace}
                            value={nbPlace}
                            style={styles.input}
                        />
                        <Button title="Valider" onPress={submitActivity} />
                        <Button title="Annuler" onPress={() => setModalVisible(false)} />
                    </View>
                </Modal>
            </ScrollView>
        </ImageBackground>
    );
}

export default ActivityRoom;
