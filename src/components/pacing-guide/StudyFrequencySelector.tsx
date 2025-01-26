import React from 'react';
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select";

    interface StudyFrequencySelectorProps {
      value: string;
      onChange: (value: string) => void;
    }

    export const StudyFrequencySelector = ({ value, onChange }: StudyFrequencySelectorProps) => {
      return (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select study frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="3x_week">3 times per week</SelectItem>
            <SelectItem value="2x_week">2 times per week</SelectItem>
            <SelectItem value="weekends">Weekends only</SelectItem>
          </SelectContent>
        </Select>
      );
    };
