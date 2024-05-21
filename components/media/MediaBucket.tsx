import { Media } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import MediaUploadButton from './UploadMediaButton'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import MediaCard from './media-card'
import { FolderSearch } from 'lucide-react'
import { CardDescription, CardHeader, CardTitle } from '../ui/card'
import { getAllMedia } from '@/actions/media.action'
import { toast } from 'sonner'
import { SkeletonMediaCard } from './SkeletonMediaCard'

export const MediaBucket = () => {

  const [data, setData] = useState<Media[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getMedia = async () => {
      setLoading(true)
      try {
        const allMedia = await getAllMedia()
        setData(allMedia)
        setLoading(false)
      } catch(e) {
        toast('Could not get media')
      }
      
    }
    getMedia()
  }, [])

  return (
    <div className="flex flex-col gap-4 h-full w-full">
     <CardHeader>
        <CardTitle>Media Bucket</CardTitle>
        <CardDescription>
          Pick an image from your media bucket
        </CardDescription>
      </CardHeader>
      <Command>
        <CommandInput placeholder="Search for file name..." />
        <CommandList className="pb-40 max-h-full ">
          <CommandEmpty>No Media Files</CommandEmpty>
          <CommandGroup heading="Media Files">
            <div className="flex flex-wrap gap-4 pt-4"> 
              { loading ? <SkeletonMediaCard />
               : data.map((file) => ( 
                <CommandItem
                  key={file.id}
                  className="p-0 max-w-[200px] w-full rounded-lg !font-medium !opacity-100 !pointer-events-auto"
                >
                  <MediaCard file={file} /> 
                </CommandItem>
              ))
            }
              {!loading && !data?.length && (
                <div className="flex items-center justify-center w-full flex-col">
                  <FolderSearch
                    size={200}
                    className="dark:text-muted text-slate-300"
                  />
                  <p className="text-muted-foreground ">
                    Empty! no files to show.
                  </p>
                </div>
              )}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}