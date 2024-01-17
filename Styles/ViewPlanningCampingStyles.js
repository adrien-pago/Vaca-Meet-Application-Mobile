import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    dayContainer: {
        marginBottom: 10,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    eventContainer: {
        backgroundColor: '#f0f0f0',
        padding: 5,
        borderRadius: 5,
        marginBottom: 5,
    },
    eventText: {
        fontSize: 16,
    },
});

export default styles;
