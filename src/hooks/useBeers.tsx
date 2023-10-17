import { useCallback } from 'react';
import axios from 'axios';
import { Beer } from '@/interfaces/interfaces';

const useBeers = () => {
  const getRandomBeer = useCallback(async (): Promise<Beer | undefined> => {
    const randomBeersUrl = 'https://api.punkapi.com/v2/beers/random';
    try {
      const { data } = await axios.get(randomBeersUrl);

      return data[0] as Beer;
    } catch (error) {
      console.error(error);
    }
  }, []);
  return {
    getRandomBeer,
  };
};

export default useBeers;
