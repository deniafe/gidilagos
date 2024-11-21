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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
            toast('⛔ Oppse!', { description: 'Could not update the event' });
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
                    <div className="py-4">
                        <RadioGroup
                            value={checked ? "approved" : "disapproved"}
                            onValueChange={(value) => setChecked(value === "approved")}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="approved"
                                    id="approved"
                                    className="peer"
                                />
                                <Label htmlFor="approved" className="cursor-pointer">
                                    Approved
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <RadioGroupItem
                                    value="disapproved"
                                    id="disapproved"
                                    className="peer"
                                />
                                <Label htmlFor="disapproved" className="cursor-pointer">
                                    Disapproved
                                </Label>
                            </div>
                        </RadioGroup>
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
