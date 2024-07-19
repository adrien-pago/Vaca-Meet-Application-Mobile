import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  dateLibelle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
},  

  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
 
  buttonText: {
    color: 'black',
    backgroundColor: '#3b82f6',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },

  datePickerText: {
    color: '#3b82f6',
    borderRadius: 10,
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },

  activityContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fond semi-transparent
    padding: 20,
  },

  modalCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%', // Prend toute la largeur
    maxWidth: 600, // Limite la largeur maximale pour les grands écrans
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  activityText: {
    fontSize: 16,
    color: '#333333',
  },

  detailContainer: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor:'#3b82f6',
    borderRadius: 10,
  },

  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: '100%', // Prend toute la largeur
  },
});
