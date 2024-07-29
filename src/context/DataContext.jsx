import { createContext, useState, useEffect } from 'react'

const DataContext = createContext()

// eslint-disable-next-line react/prop-types
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const [query, setQuery] = useState('sd')
  const [history, setHistory] = useState([])
    const [error, setError] = useState({
    state: false,
    label: ''
  })
  const [loading, setLoading] = useState(true)

  const isValidIP = (ip) => {
    const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)?)?$/
    return regex.test(ip)
  }

  const fetchData = async () => {
    if (!isValidIP(query)) {
      setError({ state: true, label: 'Invalid IP address' })
      return
    }

    setLoading(true)
    setError({ state: false, label: '' })
    try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_aBJaavqy42nyEKSMnTtRKTACVh3PN&ipAddress=${query}`)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
      const updatedHistory = [...history, query]
      if(query != '') {
        setHistory(updatedHistory)
        localStorage.setItem('ipHistory', JSON.stringify(updatedHistory))
      }
    } catch (error) {
      setError({ state : true, label : error.message })
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('ipHistory')) || []
    setHistory(storedHistory);
  }, [])
  
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <DataContext.Provider value={{ data, history, error, loading, setQuery, fetchData, setHistory }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext
