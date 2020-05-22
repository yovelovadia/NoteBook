import React, { useState, useEffect } from "react";

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const takeData = async () => {
      setIsLoading(true);
      try {
        console.log(url, "blaaaa");
        const res = await fetch(url);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        console.log(url);
        console.log(response);
      }
    };
    takeData();
  }, []);
  return { response, error, isLoading };
};

export default useFetch;
