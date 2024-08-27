import { useLayoutEffect, useState } from "react"

export const getDataServiceFn = () => {
    const [dataService, setDataService] = useState<string>()
    useLayoutEffect(() => {
        (async () => {
            try {
              const response = await fetch('https://backend-sistemas-autoorganizados-2.onrender.com/usersIntoPage')
              const data = await response.json()
              setDataService(data)
            } catch (error) {
              
            }
          })();
        }, [])
        return dataService
    }