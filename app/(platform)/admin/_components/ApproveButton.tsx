import { updateEvent } from "@/actions/event.actions";
import { Loading } from "@/components/global/Loading";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Event } from '@/lib/types';
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
    event: Event
}

export function ApproveButton({ event }: Props) {

    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const eventData: Partial<Event> = {
                isApproved: checked,
            };
            await updateEvent(event.id, eventData);
            toast(`✅ Event ${checked ? 'Approved' : 'Disapproved'} successfully`);

            setLoading(false);
            setIsOpen(false);

        } catch (error) {
            setLoading(false);
            toast('⛔ Oppse!', { description: 'could not update the event' });
            setIsOpen(false);
        }
    };

    useEffect(() => {
        setChecked(event.isApproved);
    }, [event]);

    return (
        <div>
            <div onClick={() => setIsOpen(true)}>
                <div className="flex items-end">
                    <p
                        className="mb-2 p-1 rounded text-center text-sm font-medium dark:text-neutral-200"
                        style={{ background: event.isApproved ? '#36d4a5' : '#d54c4c' }}
                    >
                        {event.isApproved ? "Approved" : "Not Approved"}
                    </p>
                </div>
            </div>
            <Dialog
                open={isOpen}
                onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}
            >
                <DialogContent className="w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Approve Or Disapprove Event</DialogTitle>
                        <DialogDescription>
                            Select an option to approve or disapprove the event.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="approve"
                                name="approval"
                                value="approved"
                                checked={checked}
                                onChange={() => setChecked(true)}
                                className="peer"
                            />
                            <Label htmlFor="approve" className="cursor-pointer">
                                Approved
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="disapprove"
                                name="approval"
                                value="disapproved"
                                checked={!checked}
                                onChange={() => setChecked(false)}
                                className="peer"
                            />
                            <Label htmlFor="disapprove" className="cursor-pointer">
                                Disapproved
                            </Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? <Loading /> : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
