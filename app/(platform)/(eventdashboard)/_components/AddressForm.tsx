import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form';
import { FormSchema, Period } from '@/lib/types';
import { states, states_and_location } from '@/lib/constants';
import dynamic from 'next/dynamic'
import { LGA } from '@/lib/types';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
  
  type Props = {
    form: UseFormReturn<z.infer<typeof FormSchema>>;
    setRegions: Dispatch<SetStateAction<LGA[]>>
    setRegionNames: Dispatch<SetStateAction<string[]>>
    setCenter: Dispatch<SetStateAction<[number, number]>>
    setZoom: Dispatch<SetStateAction<number>>
    regions: LGA[]
    regionNames: string[]
    center: number[]
    zoom: number
    
  }
  
  export const AddressForm = ({form, regionNames, setRegionNames, regions, setRegions, center, zoom, setCenter, setZoom}: Props) => {
  
    const isLoading = form.formState.isSubmitting
  

  const Map = useMemo(() => dynamic(() => import('./Map'), { 
    ssr: false 
  }), [location])

  function logLGAsByName(locationName: string): void {
    const location = states_and_location.find((loc) => loc.name === locationName);
  
    if (location) {
      setRegions(location.LGAs)
      const lgaNames = location.LGAs.map((loc) => loc.name)
      setRegionNames(lgaNames)
    } 
  }

  function getStateLatLng(locationName: string): [number, number] | null {
    const location = states_and_location.find((loc) => loc.name === locationName);
  
    if (location) {
      return [location.latitude, location.longitude];
    } else {
      return null;
    }
  }

  function getRegionLatLng(locationName: string): [number, number] | null {
    const location = regions?.find((loc) => loc.name === locationName);
  
    if (location) {
      return [location.latitude, location.longitude];
    } else {
      return null;
    }
  }

  useEffect(() => {
    const state = form.getValues().state
    console.log('lllllllllllllllllllllll', state)
    state && logLGAsByName(state)
  }, [form])
  

  
    return (
      <div className={`transition-all transform ${true ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <h2 className="text-center text-[1.3rem] text-gray-500 font-medium mb-4 md:mb-6">
        Enter Event Address
      </h2>

  
      <div className="grid grid-cols-1 gap-y-4 md:gap-4 md:grid-cols-2 ">
        <div className="md:col-span-1" >
            <FormField
                disabled={isLoading}
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                    <Select onValueChange={(value) => {
                        field.onChange(value)
                        logLGAsByName(value)
                        setCenter(getStateLatLng(value) || [6.5244, 3.3792])
                        setZoom(8)
                    }
                    } defaultValue={field.value}>
                        <SelectTrigger>
                        <SelectValue placeholder="State"  />
                        </SelectTrigger>
                        <SelectContent>
                        {
                            states.map((state) => 
                            <SelectItem 
                            key={state} 
                            value={state}
                            >
                            {state}
                            </SelectItem>)
                        }
                        </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
        </div>

        <div className="md:col-span-1" >
            <FormField
                disabled={isLoading}
                control={form.control}
                name="region"
                render={({ field }) => ( 
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                    <Select onValueChange={(value) => {
                        field.onChange(value)
                        setCenter(getRegionLatLng(value) || [6.5244, 3.3792])
                        setZoom(10)
                        }
                    } defaultValue={field.value}>
                        <SelectTrigger>
                        <SelectValue placeholder="Region"  />
                        </SelectTrigger>
                        <SelectContent>
                        {
                            regionNames.map((region) => 
                            <SelectItem 
                            key={region} 
                            value={region}
                            >
                            {region}
                            </SelectItem>)
                        }
                        </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
        </div>

        <div className="md:col-span-3">
            <FormField
            disabled={isLoading}
            control={form.control}
            name="street"
            render={({ field }) => (
                <FormItem className="flex-1">
                <FormLabel>Street</FormLabel>
                <FormControl>
                    <Input
                    placeholder="Street"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />    
        </div>
      </div>

      <div className="mt-[3rem] md:mt-[3rem]">
        <Map center={center} zoom={zoom} />
      </div>
    </div>
    )
  }
  