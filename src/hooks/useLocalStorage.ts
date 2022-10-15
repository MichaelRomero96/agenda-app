import { useState } from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [storedData, setStoredData] = useState((): any | string => {
    try {
      const response = window.localStorage.getItem(key)
      return response ? JSON.parse(response) : initialValue
    } catch (error) {
      return 'NO_DATA'
    }
  })

  const setData = <U>(data: U): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data))
      setStoredData(data)
    } catch (error) {
      throw new Error('There was an error with local storage')
    }
  }
  return [storedData, setData]
}
