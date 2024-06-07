import React, { useState } from 'react';
import { CloudUpload, Upload, X, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/Firebase/config';
import { Loading } from '../Loading';
import { createMedia } from '@/actions/media.action';
import { Media } from '@/lib/types';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';


type Props = {
  setImgUrl: (url: string) => void;
};

const ImageUploader = ({setImgUrl}: Props) => {
  const {user} = useUser()
  const userId = user?.id
  console.log(user)
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setImage(null);
    setUploaded(false);
  };

  const uploadImage = async () => {
    if (!image && !userId) return;

    // Get the original filename
    const fileName = image instanceof File ? image.name : `image_${Date.now()}`;


    setUploading(true);
    const storageRef = ref(storage, `${userId}/${fileName}`);

    try {
      const blob = await fetch(image as string).then((res) => res.blob());
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress if needed
        },
        (error) => {
          console.error(error);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            if(userId) {
                const media: Partial<Media> = {
                    name: fileName,
                    link: downloadURL,
                    userId: userId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
                await createMedia(media)
            }
           
            setUploading(false);
            setUploaded(true);
            setImageURL(downloadURL);
            toast('✅ Image uploaded successfully')
          });
        }
      );
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast('⛔ Oppse!', {description: '.An error occurred. Could not upload image'})

    }
  };

  const handleClickImage = () => {
    // Perform action when the uploaded image is clicked
    console.log('Image clicked');
    imageURL && setImgUrl(imageURL)
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>
          Please upload or drop an image from your device
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center w-full h-96 border-dashed rounded-lg cursor-pointer border-2 p-4" onDragOver={handleDragOver} onDrop={handleDrop}>
        {image ? (
            <div className="relative w-full h-full md:w-3/4 ">
            <Image src={image as string} width={2} height={2} alt="Uploaded" className={`object-cover w-full h-full rounded-lg ${uploading ? 'opacity-50' : ''}`} />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                {uploaded && <span onClick={handleClickImage} className="bg-secondary px-2 py-1 rounded-md">Click image to use</span>}
            </div>
            <button onClick={removeImage} disabled={uploading || uploaded} className="absolute top-2 right-2 p-1 bg-white rounded-full">
                <X className="w-5 h-5 text-red-500" />
            </button>
            <Button onClick={uploadImage} disabled={uploading || uploaded} className={`absolute bottom-2 left-2 ${uploading ? 'opacity-50' : ''}`}>
                {uploading ? <Loading /> : uploaded ? <><CheckCircle className="mr-2" />Uploaded</> : <><CloudUpload className="mr-2" />Upload</>}
            </Button>
            </div>
        ) : (
            <label className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
            <Upload className="w-10 h-10 text-muted-foreground" />
            <span className="mt-2 text-muted-foreground">Upload or drop image</span>
            <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
        )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
