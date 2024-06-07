'use client'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Copy, ImagePlus, MoreHorizontal, Trash } from 'lucide-react'
import Image from 'next/image'
import { toast } from "sonner"
import { Media } from '@/lib/types'
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '@/Firebase/config';
import { deleteMedia } from '@/actions/media.action'
import { truncateString } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'

type Props = { 
  file: Media, 
  removeMedia: (id: string) => void;
  setImgUrl: (url: string) => void; 
 }

const MediaCard = ({ file, removeMedia, setImgUrl }: Props) => {
  const [loading, setLoading] = useState(false)
  const {user} = useUser()
  const userId = user?.id

  const deleteImage = async (fileName: string, fileId: string): Promise<void> => {
    setLoading(true)
    const storageRef = ref(storage, `${userId}/${fileName}`);
  
    try {
      // Delete the image from Firebase Storage
      await deleteObject(storageRef);
      toast('✅ Image deleted from storage');
  
      // Delete the corresponding record from the database
      await deleteMedia(fileId);
      removeMedia(fileId);
      toast('✅ Image record deleted from bucket');
      setLoading(false)
    } catch (error) {
      toast('⛔ Oppse!', {description: '.An error occurred. Could not delete image'})
      console.error('Error deleting image:', error);
      setLoading(false)
    }
  };

  const handleClickImage = (imageURL: string) => {
    // Perform action when the uploaded image is clicked
    imageURL && setImgUrl(imageURL)
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <article className="border w-full rounded-lg bg-muted">
          <div className="relative w-full h-40">
            <Image
              src={file.link}
              alt="preview image"
              fill
              className="object-cover rounded-lg cursor-pointer hover:opacity-70"
              onClick={() => handleClickImage(file.link)}
            />
          </div>
          <p className="opacity-0 h-0 w-0">{truncateString(file.name)}</p>
          <div className="p-4 relative">
            {/* <p className="text-muted-foreground">
              {file.createdAt.toDateString()}
            </p> */}
            <p>{truncateString(file.name)}</p>
            <div className="absolute top-4 right-4 p-[1px] cursor-pointer ">
              <DropdownMenuTrigger>
                <MoreHorizontal />
              </DropdownMenuTrigger>
            </div>
          </div>

          <DropdownMenuContent>
          <DropdownMenuItem
              className="flex gap-2"
              onClick={() => {
                handleClickImage(file.link)
              }}
            >
              <ImagePlus size={15} /> Choose Image
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => {
                navigator.clipboard.writeText(file.link)
                toast('Copied To Clipboard')
              }}
            >
              <Copy size={15} /> Copy Image Link
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex gap-2">
                <Trash size={15} /> Delete Image
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </article>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Are you sure you want to delete this image? All events using this
            image will no longer have access to it!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            className="bg-destructive hover:bg-destructive"
            onClick={() => deleteImage(file.name, file.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default MediaCard