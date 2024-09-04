import { useEffect, useState } from 'react'

const PREFIX = 'Syntax Canva'

export default function useLocalStorage(key, initialVal) {
  const prefixedKey = PREFIX + key

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialVal === 'function') {
      return initialVal()
    } else {
      return initialVal
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
