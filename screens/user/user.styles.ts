import { StyleSheet } from "react-native"

export const userSyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    flex: 1,
    padding: 16,
    alignItems: 'center'
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e2e7f3',
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  texts: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    width: '100%',
    fontSize: 16,
    padding: 10
  },
  text: {
    width: '100%',
    backgroundColor: '#e2e7f350',
    padding: 10
  },
  inputWrapper: {
    width: '100%',
    backgroundColor: '#e2e7f350',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,
    marginBottom:  40
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 45,
  },
  buttonSave: {
    backgroundColor: '#2E4A66',
    padding: 12,
    width: '40%',
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSaveText: {
    color: '#fff',
    fontSize:  16,
    fontWeight: '900'
  },
  cancel: {
    color: '#FE5B60',
    fontSize:  16,
    fontWeight: '900'
  },
  edit: {
    color: '#2E4A66',
    fontSize:  16,
    fontWeight: '900'
  }
})
