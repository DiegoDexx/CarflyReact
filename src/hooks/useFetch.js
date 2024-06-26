import { useState, useEffect} from "react";



export function useFetch(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const json = await response.json();
            setData(json);
          } else {
            throw response;
          }
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [url]);
  
    return { data, loading, error };
    
}