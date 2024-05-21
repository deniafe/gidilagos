'use client'
import { useModal } from '@/providers/modal-provider'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import CustomModal from '../global/CustomModal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UploadMediaForm from '../forms/UploadMedia'
import { MediaBucket } from './MediaBucket'
import { Media } from '@/lib/types'
import { useUser } from '@clerk/nextjs'
import { getAllMedia } from '@/actions/media.action'
import { toast } from 'sonner'

const MediaUploadButton = () => {
  const [data, setData] = useState<Media[]>([])
  const { isOpen, setOpen, setClose } = useModal()
  const {user} = useUser()
  const userId = user?.id || ''

  useEffect(() => {
    const getMedia = async () => {
      try {
        const allMedia = await getAllMedia()
        setData(allMedia)
      } catch(e) {
        toast('Could not get media')
      }
      
    }
    getMedia()
  })

  return (
    <Button
      onClick={() => {
        setOpen(
          <CustomModal
            title="Your Media"
            subheading="Upload an image or pick an image from your media bucket"
          >
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">
                   {'Upload '} <span className='hidden md:inline'> An Image From Your Device</span>
                </TabsTrigger>
                <TabsTrigger value="password">
                   {'Pick '}<span className='hidden md:inline'> An Image From Your Media Bucket</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                  <UploadMediaForm userId={userId}></UploadMediaForm>
              </TabsContent>
              <TabsContent value="password">
                <MediaBucket />
              </TabsContent>
            </Tabs>

          </CustomModal>
        )
      }}
    >
      Upload
    </Button>
  )
}

export default MediaUploadButton