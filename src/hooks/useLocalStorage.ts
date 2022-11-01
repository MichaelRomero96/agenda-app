import { useState } from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [storedData, setStoredData] = useState((): any => {
    try {
      const response = window.localStorage.getItem(key)
      return response ? JSON.parse(response) : initialValue
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw Error(error)
    }
  })

  const setData = <V>(data: V): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data))
      setStoredData(data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw Error(error)
    }
  }
  return [storedData, setData]
}
