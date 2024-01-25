import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    datePickerText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'blue', 
        padding: 10,
    },
    datesLabel: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 8,
    },
    dayContainer: {
        marginVertical: 5,
    },
    dayTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    eventText: {
        fontSize: 14,
    },
});
