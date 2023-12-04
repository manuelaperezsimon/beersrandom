'use client';

import useBeers from '@/hooks/useBeers';
import { Beer } from '@/interfaces/interfaces';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

const searchTypeValues = {
  BY_NAME: 'by_name',
  BY_DESCRIPTION: 'by_description',
  NOT_SEARCH_TYPE: 'not_search_type',
};

const Search = () => {
  const [searchType, setSearchType] = useState(
    searchTypeValues.NOT_SEARCH_TYPE
  );

  const [descriptionSearch, setDescriptionSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [searchedBeers, setSearchedBeers] = useState([] as Beer[]);

  const { getBeersByName, getBeersByDescription } = useBeers();

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    if (searchType === 'by_name') setNameSearch(target.value);
    if (searchType === 'by_description') setDescriptionSearch(target.value);
    if (target.value === '') setSearchedBeers([]);
  };

  const handleSearch = async () => {
    try {
      if (searchType === 'by_name') {
        const beersByName = await getBeersByName(nameSearch);
        setSearchedBeers(beersByName as Beer[]);
      }

      if (searchType === 'by_description') {
        const beersByDescription = await getBeersByDescription(
          descriptionSearch
        );
        setSearchedBeers(beersByDescription as Beer[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-4 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 mb-10 mt-10">
          Search a beer
        </p>
      </div>
      <div className="flex flex-col self-start ml-28 gap-10">
        <div className="flex">
          <div>
            <span
              className={`inline-flex items-center rounded-md bg-gray-50 px-4 py-2 text-xs font-medium ring-1 ring-inset ring-gray-500/10 p-10 mr-4 ${
                searchType === 'by_description'
                  ? 'text-gray-300'
                  : 'text-gray-600'
              }`}
            >
              <input
                className={`mr-4 ${
                  searchType === 'by_description'
                    ? 'pointer-events-none bg-gray-300 text-gray-600'
                    : undefined
                }`}
                type="checkbox"
                onClick={() =>
                  setSearchType(
                    searchType === 'not_search_type'
                      ? searchTypeValues.BY_NAME
                      : searchTypeValues.NOT_SEARCH_TYPE
                  )
                }
              ></input>
              By name
            </span>
          </div>
          <div>
            <span
              className={`inline-flex items-center rounded-md bg-gray-50 px-4 py-2 text-xs font-medium ring-1 ring-inset ring-gray-500/10 p-10 mr-4 ${
                searchType === 'by_name' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <input
                className={`mr-4 ${
                  searchType === 'by_name'
                    ? 'pointer-events-none bg-gray-300 text-gray-600'
                    : undefined
                }`}
                type="checkbox"
                onClick={() =>
                  setSearchType(
                    searchType === 'not_search_type'
                      ? searchTypeValues.BY_DESCRIPTION
                      : searchTypeValues.NOT_SEARCH_TYPE
                  )
                }
              ></input>
              By description
            </span>
          </div>
          <button
            onClick={handleSearch}
            className="inline-flex items-center rounded-md bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
          >
            Search
          </button>
        </div>
        <div>
          <input
            className="p-2 rounded-md"
            type="search"
            placeholder="Search"
            onChange={handleChange}
          ></input>
        </div>
      </div>

      {searchedBeers?.length > 0 && (
        <ul>
          {searchedBeers.map((beer) => (
            <li
              key={beer.name}
              className="mt-6 mb-10 max-w-7xl px-6 lg:px-8 bg-white p-8"
            >
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 mb-6">
                {beer.name}
              </h3>
              <div className="flex gap-10">
                <Image
                  src={beer?.image_url}
                  alt={beer?.name}
                  width={50}
                  height={50}
                />
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  {beer.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Search;
