import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal:  16,
    color: "#717F7F",
    fontSize: 16

  },
  inputSelect: {
    flex: 1,
    height: "100%",


    color: '#383838',
    fontSize: 14,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
   containert: {
    width: '100%',
    gap: 6
  },
    inputWapper: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 14,
    borderColor: '#98A2B3',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
   selectText: {
    color: "#717F7F",
    fontSize: 16,
  },
    label: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize:  14,
    lineHeight: 20,
    color: '#344054'
  },
    icon: {
    width: 20,
    height: 20,
    color: '#717F7F'
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    top: 50,
    zIndex: 100,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 8,
    color: '#98A2B3'
  },
})
