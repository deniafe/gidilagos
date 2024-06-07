'use client'
import { Search } from '@/components/icons/Search'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
import { SearchInput } from './SearchInput'
import { useEffect, useState } from 'react'
import { buildSearchURL } from '@/lib/utils'
import { SearchParameters, EventOptions } from '@/lib/types'
  

export const SearchBox = () => {
    // const { searchUrl, setSearchUrl, searchOptions, setSearchOptions } = useSearchEventContext()
    const [searchOptions, setSearchOptions] = useState<EventOptions>()
    const [searchUrl, setSearchUrl] = useState('')
    const [query, setQuery] = useState('')
    const [popoverOpen, setPopoverOpen] = useState(false)
    
    let urlOptions: SearchParameters = {}
  
    const handleQuery = (query: string) => {
      setQuery(query)
      urlOptions.query = query
      urlOptions.category = searchOptions?.category
      urlOptions.date = searchOptions?.when
      urlOptions.venue = searchOptions?.where
      urlOptions.price = searchOptions?.price
      setSearchUrl(buildSearchURL(urlOptions))
    }
  
    const handleCategory = (category: string) => {
      setSearchOptions((prevSearchOptions) => ({
        ...prevSearchOptions,
        category
      }))

      console.log('These are the search options', searchOptions)
    }
  
    const handleWhen = (when: string) => {
      setSearchOptions((prevSearchOptions) => ({
        ...prevSearchOptions,
        when
      }))
    }
  
    const handleWhere = (where: string) => {
      setSearchOptions((prevSearchOptions) => ({
        ...prevSearchOptions,
        where
      }))
    }
  
    const handlePrice = (price: string) => {
     setSearchOptions((prevSearchOptions) => ({
        ...prevSearchOptions,
        price
      }))
    }

     // Function to delete a field from searchOptions
  const deleteFieldFromSearchOptions = (fieldName: keyof EventOptions): void => {
    setSearchOptions((prevSearchOptions) => {
      const { [fieldName]: deletedField, ...rest } = prevSearchOptions ?? {}; // Provide a default value
      return rest;
    });

    // Get all radio buttons
    const radioButtons = document.querySelectorAll<HTMLInputElement>(`input[type="radio"][id^=${fieldName}]`);

     // Deselect all radio buttons when any of them is clicked
     radioButtons.forEach((rb) => {
        (rb as HTMLInputElement).checked = false;
     });
        

  };
  
    useEffect(() => {
      urlOptions.query = query
      urlOptions.category = searchOptions?.category
      urlOptions.date = searchOptions?.when
      urlOptions.venue = searchOptions?.where
      urlOptions.price = searchOptions?.price
      setSearchUrl(buildSearchURL(urlOptions))
    }, [searchOptions]);
  
  return (
    <>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen} >
            <PopoverTrigger className='w-full'>
                {popoverOpen && <div className="fixed top-0 left-0 z-10 h-full w-screen bg-black opacity-80"></div>}
               {!popoverOpen && <div 
                    className='flex cursor-pointer py-3 mx-[2rem] md:mx-0 rounded-full shadow-[0_3px_8px_-4px_#31859C] dark:shadow-none dark:border dark:border-border'>
                    <div className="grow flex justify-center text-primary text-xs md:text-sm">
                        Search by categories, date, and location
                    </div>
                    <div className="flex justify-start mr-6 ">
                        <Search height={20} width={20} />
                    </div>
                </div>}
            </PopoverTrigger>
            <PopoverContent className='w-full' avoidCollisions={false} >
                <SearchInput searchOptions={searchOptions} handleQuery={handleQuery} searchUrl={searchUrl} handleCategory={handleCategory} handleWhen={handleWhen} handleWhere={handleWhere} handlePrice={handlePrice} deleteFieldFromSearchOptions={deleteFieldFromSearchOptions} />
            </PopoverContent>
        </Popover>
    </>
  )
}
