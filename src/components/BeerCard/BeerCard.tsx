'use client';
import React from 'react';
import useBeers from '@/hooks/useBeers';
import { useState } from 'react';
import { Beer } from '@/interfaces/interfaces';
import Image from 'next/image';
import Spinner from '../Spinner/Spinner';

const BeerCard = () => {
  const { getRandomBeer, getNonAlcoholicRandomBeer } = useBeers();
  const [randomBeer, setRandomBeer] = useState({} as Beer);
  const [isLoading, setLoading] = useState(false);

  const getrandom = async () => {
    try {
      setLoading(true);
      const beer = await getRandomBeer();
      if (beer) {
        const randomBeer = beer as Beer;
        setRandomBeer(randomBeer as Beer);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getNonAlcoholicBeer = async () => {
    try {
      setLoading(true);
      const beer = await getNonAlcoholicRandomBeer();
      if (beer) {
        const randomBeer = beer as Beer;
        setRandomBeer(randomBeer as Beer);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-10 px-10">
      {Object.keys(randomBeer)?.length === 0 ? (
        <button
          className="inline-flex items-center rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mb-6"
          onClick={getrandom}
        >
          Get a Random Beer
        </button>
      ) : (
        <div className="">
          {isLoading ? (
            <div className="h-20 w-20 ml-8">
              <Spinner marginBottom={4} marginTop={20} size="px" />
            </div>
          ) : (
            <div className="max-w-7xl px-6 lg:px-8 bg-white p-8">
              <article className="flex max-w-xl flex-col items-start justify-between">
                <div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 mb-6">
                    {randomBeer.name}
                  </h3>
                  <div className="flex gap-10">
                    <Image
                      src={randomBeer?.image_url}
                      alt={randomBeer?.name}
                      width={50}
                      height={50}
                    />
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                      {randomBeer.description}
                    </p>
                  </div>
                  <div className="flex gap-10">
                    <button
                      className="inline-flex items-center rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mt-10"
                      onClick={getrandom}
                    >
                      Get another Random Beer
                    </button>
                    <button
                      className="inline-flex items-center rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mt-10"
                      onClick={getNonAlcoholicBeer}
                    >
                      Get non alcoholic Random Beer
                    </button>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BeerCard;
