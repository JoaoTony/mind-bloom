import { defualtTheme } from "@/styles/theme"
import { StyleSheet } from "react-native"

export const childCardStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#e2e7f3',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
    height: 100,
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
  occupation: {
    fontSize: 14,
    color: '#6d6f74',
    marginBottom: 6
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
  },
  values: {
    width: 100,
    height: 30,
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 12,
  },
  value: {
    flex: 2,
    backgroundColor:`${defualtTheme.colors.green.dark}`,
    justifyContent: 'center',
    alignItems: 'center'
  },
  valueTexrt: {
    color: "#fff"
  }

})
