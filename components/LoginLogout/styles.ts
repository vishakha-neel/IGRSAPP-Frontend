import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginVertical: height * 0.03,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: height * 0.02,
    resizeMode: 'contain',
  },
  formSection: {
    width: '100%',
    padding: width * 0.05,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: width * 0.05,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  formTitle: {
    fontSize: width * 0.06,
    color: '#28a745',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: width * 0.045,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: width * 0.045,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: width * 0.03,
    borderRadius: 4,
    marginBottom: 10,
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eyeIcon: {
    padding: width * 0.02,
  },
  captchaImage: {
    width: width * 0.6,
    height: height * 0.1,
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'contain',
  },
  refreshText: {
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#28a745',
    padding: width * 0.035,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 5,
  },
  homeButton: {
    backgroundColor: 'blue',
    padding: width * 0.035,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 5,
    width: width * 0.25,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  resultContainer: {
    marginVertical: 10,
    padding: width * 0.035,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
    opacity: 0.6,
  },
  tableContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: 'row',
    padding: width * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5,
  },
  editSection: {
    marginVertical: 10,
    padding: width * 0.035,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: width * 0.03,
    borderRadius: 4,
    marginBottom: 10,
  }
});

export default styles;
