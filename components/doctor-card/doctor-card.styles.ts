import { StyleSheet } from "react-native"

export const doctorCardSyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#e2e7f3',
    borderRadius: 10,
    padding: 12,
    marginTop: 20
  },
  imgWapper: {
    width: 85,
    height: 85,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-end'
  },
  imag: {
    width: '90%',
    height: '90%'
  },
  name: {
    fontSize: 20,
    fontWeight: 800,
    color: '#4b4f59',
    marginBottom: 4
  },
  occupation: {
    fontSize: 16,
    color: '#6d6f74',
    marginBottom: 6
  },
})
