import React from 'react';
    import { Calendar as CalendarIcon } from "lucide-react";
    import { format } from "date-fns";
    import { cn } from "@/lib/utils";
    import { Button } from "@/components/ui/button";
    import { Calendar } from "@/components/ui/calendar";
    import {
      Popover,
      PopoverContent,
      PopoverTrigger,
    } from "@/components/ui/popover";

    interface DatePickerProps {
      date: Date | undefined;
      onDateChange: (date: Date | undefined) => void;
    }

    export const DatePicker = ({ date, onDateChange }: DatePickerProps) => {
      return (
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick your exam date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={onDateChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    };
