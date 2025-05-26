import { defualtTheme } from "@/styles/theme"
import { StyleSheet } from "react-native"

export const chatListCardStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#e2e7f3',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
    height: 100,
    padding: 12,
  },
  imgWapper: {
    width: 70,
    height: 70,
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
  message: {
    fontSize: 14,
    color: '#6d6f74',
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: '#6d6f74',
    marginBottom: 6,
    alignSelf: 'flex-end'
  },
  time: {
  }

})
