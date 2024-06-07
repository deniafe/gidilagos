import { FileWarning } from "lucide-react";

export const Empty = () => (
    <div className="flex flex-col items-center gap-1 text-center ">
        <h3 className="text-2xl tracking-tight">
        No Events
        </h3>
        <span className="text-muted-foreground mt-8" >
            <FileWarning size={160} strokeWidth={0.5} />
        </span>
    </div>
)