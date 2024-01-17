import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    table: {
        flexDirection: 'column',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    tableHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    tableColumn: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
    eventText: {
        fontSize: 16,
    },
});
