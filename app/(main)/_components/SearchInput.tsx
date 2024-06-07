'use client'

import { Search } from "@/components/icons/Search";
import { categories, cost, when, where } from '@/lib/constants';
import { EventOptions } from "@/lib/types";
import React, { useEffect, useRef } from "react";
// import { EventOptions, useSearchEventContext } from '@/context/SearchEventContext'

interface SearchInputProps {
  searchOptions: EventOptions | undefined;
  searchUrl: string;
  handleQuery: (e: string) => void;
  closeModal?: () => void;
  handleCategory: (e: string) => void;
  handleWhen: (e: string) => void;
  handleWhere: (e: string) => void;
  handlePrice: (e: string) => void;
  deleteFieldFromSearchOptions: (fieldName: keyof EventOptions) => void
}

export const SearchInput = ({ searchOptions, searchUrl, handleQuery, handleCategory, handleWhen, handleWhere, handlePrice, deleteFieldFromSearchOptions }: SearchInputProps) => {
//   const { searchOptions, setSearchOptions } = useSearchEventContext()

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Focus the input element when the component is mounted
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="mb-3 w-[22rem] sm:w-[32rem] md:w-[42rem] min-w-0">
      <div className='flex cursor-pointer mt-8 py-2 w-full rounded-full shadow-[0_3px_8px_-4px_#31859C] dark:shadow-none dark:border dark:border-border'>

        {/* Loop through searchOptions keys and values and render chips */}
       {searchOptions && (() => {
          const entries = Object.entries(searchOptions);
          const displayedEntries = entries.slice(0, 2);
          const remainingCount = entries.length - displayedEntries.length;

          return (
            <>
              {displayedEntries.map(([key, value], index) => (
                <div
                  key={index}
                  id={key}
                  className=" hidden ml-4 sm:flex h-[28px] cursor-pointer items-center justify-between rounded-[16px] border border-[#31859C] bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[11px] font-normal normal-case leading-none text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-[#31859C] hover:!shadow-none dark:text-neutral-200"
                  onClick={() => deleteFieldFromSearchOptions(key as keyof EventOptions)}
                >
                  {value}
                  <span
                    className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-3 w-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                </div>
              ))}
              {remainingCount > 0 && (
                <div className="hidden ml-4 sm:flex h-[28px] cursor-pointer items-center justify-between rounded-[16px] border border-[#31859C] bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[11px] font-normal normal-case leading-none text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-[#31859C] hover:!shadow-none dark:text-neutral-200">
                  +{remainingCount} more
                </div>
              )}
            </>
          );
        })()}

        <input
          ref={inputRef}
          type="search"
          onChange={(e) => handleQuery(e.target.value)}
          className="relative focus m-0 md:-mr-0.5 block w-[16rem] md:w-[49rem] min-w-0 flex-auto bg-transparent bg-clip-padding px-3 text-base font-normal first-letter: outline-none transition duration-200 ease-in-out focus:z-[3] placeholder:text-primary placeholder:text-xs placeholder:md:text-sm"
          placeholder="Search For Any Event"
        />

        <a 
          href={searchUrl}
          className="flex justify-start items-center mr-6 "
          >
          <Search height={20} width={20} />
        </a>
        
      </div>
      {/* Search Options */}
      <div className="grid-cols-1 sm:grid-cols-2 grid gap-4 md:grid-cols-4 lg:grid-cols-4 mt-16 md:ml-[6rem]">
        <div>
          <h6 className="mb-6 ml-[-1.5rem] flex justify-center font-medium text-lg uppercase md:justify-start">
            What
          </h6>
          {categories.map((category, index) => (
            <div key={index} className="mb-3 flex justify-center md:justify-start">
                <input
                className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:border-primary checked:after:border-primary checked:after:bg-primary focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] checked:focus:border-primary checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="radio"
                name="category"
                id={`category${index}`} 
                onChange={() => handleCategory(category.title)}
                />
            <a href="#!" className="text-sm">
              {category.title}
            </a>
          </div>
          ))}
          {/* Add more product links */}
        </div>
        {/* Products section */}
        <div>
          <h6 className="mb-6 ml-[-1.5rem] flex justify-center font-medium text-lg uppercase md:justify-start">
            When
          </h6>
          {when.map((wh, index) => (
            <div key={index} className="mb-3 flex justify-center md:justify-start">
              <input
                className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:border-primary checked:after:border-primary checked:after:bg-primary focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] checked:focus:border-primary checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="radio"
                name="when"
                id={`when${index}`} 
                onChange={() => handleWhen(wh)}
                />
            <a href="#!" className="text-sm">
              {wh}
            </a>
          </div>
          ))}
          {/* Add more product links */}
        </div>

        <div>
          <h6 className="mb-6 ml-[-1.5rem] flex justify-center font-medium text-lg uppercase md:justify-start">
            Where
          </h6>
          {where.map((wh, index) => (
            <div key={index} className="mb-3 flex justify-center md:justify-start">
                <input
                className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:border-primary checked:after:border-primary checked:after:bg-primary focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] checked:focus:border-primary checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="radio"
                name="where"
                id={`where${index}`} 
                onChange={() => handleWhere(wh)}
                />
            <a href="#!" className="text-sm">
              {wh}
            </a>
          </div>
          ))}
          {/* Add more product links */}
        </div>

        <div>
          <h6 className="mb-6 ml-[-1.5rem] flex justify-center font-medium text-lg uppercase md:justify-start">
            Cost
          </h6>
          {cost.map((ct, index) => (
            <div key={index} className="mb-3 flex justify-center md:justify-start">
              <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:border-primary checked:after:border-primary checked:after:bg-primary focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] checked:focus:border-primary checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="radio"
              name="cost"
              id={`price${index}`}
              onChange={() => handlePrice(ct)}
              />
              <a href="#!" className="text-sm">
              {ct}
            </a>
          </div>
          ))}
          {/* Add more product links */}
        </div>
        
      </div>
    </div>
  )
}