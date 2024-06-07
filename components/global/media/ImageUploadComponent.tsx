'use client'

import { useModal } from '@/providers/modal-provider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CustomModal from "../CustomModal";
import { UploadImageButton } from './UploadImageButton'
import ImageUploader from './ImageUploader'
import { MediaBucket } from './MediaBucket'

type Props = {
    value: string;
    onChange: (url: string) => void;
};

export function ImageUploadComponent({ value, onChange }: Props) {
    const { isOpen, setOpen, setClose } = useModal()

    const setImgUrl = (url: string) => {
        onChange(url)
        return setClose()
    }

    return <UploadImageButton 
        value={value}
        onClick={() => {
            setOpen(
                <CustomModal
                title="Your Media"
                subheading="Upload an image or pick an image from your media bucket"
                >
                <div className="h-[75vh]">
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
                        <ImageUploader setImgUrl={setImgUrl} />
                    </TabsContent>
                    <TabsContent value="password">
                        <MediaBucket setImgUrl={setImgUrl} />
                    </TabsContent>
                    </Tabs>
                </div> 

                </CustomModal>
            )
            }}
        >

        </UploadImageButton>;
}
