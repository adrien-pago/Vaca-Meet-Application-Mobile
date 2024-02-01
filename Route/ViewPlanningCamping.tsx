import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import styles from '../Styles/ViewPlanningCampingStyles';

type PlanningEvent = {
    LIB_ACTIVITE: string;
    DATE_HEURE_DEBUT: string;
    DATE_HEURE_FIN: string;
    DISPLAY_DATE?: string;
    DISPLAY_TIME?: string;
    LIBELLE_STRUCTURE: string;
};

type PlanningData = {
    [key: string]: PlanningEvent[];
};

type ViewPlanningCampingProps = {
    route: RouteProp<RootStackParamList, 'ViewPlanningCamping'>;
};

function ViewPlanningCamping({ route }: ViewPlanningCampingProps) {
    const [planning, setPlanning] = useState<PlanningData>({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [displayDatePicker, setDisplayDatePicker] = useState(false);

    useEffect(() => {
        loadPlanning(startDate, endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        if (showDatePicker) {
            setDisplayDatePicker(true);
        }
    }, [showDatePicker]);

    const loadPlanning = async (start: Date, end: Date) => {
        const startDateStr = start.toISOString().split('T')[0];
        const endDateStr = end.toISOString().split('T')[0];
    
        try {
            const response = await fetch(`https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoadPlanningCamping.php?dateDebut=${startDateStr}&dateFin=${endDateStr}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.status === 'success') {
                const transformedPlanning = transformDataToPlanningStructure(data.data);
                setPlanning(transformedPlanning); 
            } else {
                console.error("Erreur dans la réponse du serveur: ", data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du planning: ", error);
        }
    };

    const transformDataToPlanningStructure = (data: PlanningEvent[]) => {
        const structuredData: PlanningData = {};
        data.forEach((event) => {
            const eventStartDate = new Date(event.DATE_HEURE_DEBUT);
            const eventEndDate = new Date(event.DATE_HEURE_FIN);
            const dayFormatted = eventStartDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
            const startTime = eventStartDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            const endTime = eventEndDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

            const dayKey = eventStartDate.toISOString().split('T')[0];

            if (!structuredData[dayKey]) {
                structuredData[dayKey] = [];
            }

            structuredData[dayKey].push({
                ...event,
                DISPLAY_DATE: dayFormatted,
                DISPLAY_TIME: `de ${startTime} à ${endTime}`,
            });
        });

        return structuredData;
    };
   

    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setStartDate(selectedDate);
            // Trouver le prochain dimanche après la date sélectionnée
            const nextSunday = new Date(selectedDate);
            nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()));
            setEndDate(nextSunday);
            setShowDatePicker(false);
        }
        setDisplayDatePicker(false);
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.datePickerText}>Choisir la semaine</Text>
            </TouchableOpacity>
            {displayDatePicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                />
            )}
            <Text style={styles.header}>Planning du Camping</Text>
            <Text style={styles.datesLabel}>
                Du {startDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}{' '}
                au {endDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </Text>

            {Object.keys(planning).map((dayKey, dayIndex) => (
                <View key={dayIndex} style={styles.dayContainer}>
                    {planning[dayKey].length > 0 && (
                        <Text style={styles.dayTitle}>{planning[dayKey][0].DISPLAY_DATE}</Text>
                    )}
                    {planning[dayKey].map((event, eventIndex) => (
                        <View key={eventIndex} style={styles.eventContainer}>
                            <Text style={styles.eventText}>{event.LIB_ACTIVITE} {event.DISPLAY_TIME} {event.LIBELLE_STRUCTURE}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

export default ViewPlanningCamping;
