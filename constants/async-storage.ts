import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_ACCESS_TOKEN, USER_ID, USER_ROLE } from ".";
import { useEffect, useState } from "react";

export const storeData = async (value: string, key: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('my-key');
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

export const asyncSetUserRole = async (userRole: string) => {
   await storeData(userRole, USER_ROLE)
}


export const asyncSetToken = async (token: string) => {
  await storeData(token, USER_ACCESS_TOKEN)
}


export const asyncSetUserID= async (id: string) => {
  await storeData(id, USER_ID)
}

export const asyncRemoveAll = async () => {
  asyncSetToken("")
  asyncSetUserID("")
  asyncSetUserRole("")
}

export function useStorageState(userID?: boolean) {
  const [state, setState] = useState<string>();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   (async () => {
    setLoading(true)
    const value = await AsyncStorage.getItem(userID ? USER_ID : USER_ACCESS_TOKEN);
    if (value !== null) {
      setState(value)
      // value previously stored
    }
    setLoading(false)
   })()
  }, []);

  return { token: state, loading };
}

export function useRole(userID?: boolean) {
  const [state, setState] = useState<string>();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   (async () => {
    setLoading(true)
    const value = await AsyncStorage.getItem(USER_ROLE);
    if (value !== null) {
      setState(value)
      // value previously stored
    }
    setLoading(false)
   })()
  }, []);

  return { role: state, loading };
}
