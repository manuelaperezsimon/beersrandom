import { useCallback } from 'react';
import axios from 'axios';
import { Beer } from '@/interfaces/interfaces';
import { toast } from 'react-toastify';

export const successModal = (message: string) =>
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
  });

export const errorModal = (error: string) =>
  toast.error(error, {
    position: toast.POSITION.TOP_CENTER,
  });

const useBeers = () => {
  const getRandomBeer = useCallback(async (): Promise<Beer | undefined> => {
    const randomBeersUrl = 'https://api.punkapi.com/v2/beers/random';
    try {
      const { data } = await axios.get(randomBeersUrl);
      return data[0] as Beer;
    } catch (error) {
      errorModal('Is not possible to get a random beer');
    }
  }, []);
  return {
    getRandomBeer,
  };
};

export default useBeers;
