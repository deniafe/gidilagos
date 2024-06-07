import { ImageUp } from "lucide-react";
import Image from "next/image";

type Props = {
    value: string;
    onClick: () => void
};
  
export function UploadImageButton({value, onClick}: Props) {
    return (
      <div
          onClick={onClick}
          className="
          relative
          cursor-pointer
          hover:opacity-70
          transition
          border-dashed 
          border-2 
          p-20 
          border-muted
          flex
          flex-col
          justify-center
          items-center
          gap-4
          bg-muted
          text-muted-foreground
        "
      >
        <ImageUp size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
        {value && (
          <div
            className="
              absolute inset-0 w-full h-full"
          >
            <Image
              fill
              style={{
                objectFit: "cover",
              }}
              src={value}
              alt="House"
            />
          </div>
        )}
      </div>
    );
  }