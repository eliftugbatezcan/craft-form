import React from 'react';
import type { FormField } from '../../types/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface Props {
  field: FormField;
}

export const FieldRenderer = ({ field }: Props) => {
  // SRP: Bu bileşenin tek sorumluluğu tipe göre doğru UI'ı çizmek
  switch (field.type) {
    case 'text':
    case 'email':
      return (
        <div className="space-y-2 w-full">
          <Label className="text-sm font-medium text-slate-700">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </Label>
          <Input 
            placeholder={field.placeholder || `${field.label} giriniz...`} 
            disabled // Builder modunda etkileşimi kapatıyoruz
            className="bg-slate-50/50"
          />
        </div>
      );
    case 'checkbox':
      return (
        <div className="flex items-center space-x-3 p-2">
          <Checkbox id={field.id} disabled />
          <Label 
            htmlFor={field.id}
            className="text-sm font-medium leading-none cursor-not-allowed"
          >
            {field.label}
          </Label>
        </div>
      );
    default:
      return (
        <div className="p-4 border border-dashed rounded-md text-xs text-slate-400 italic">
          Bu alan tipi ({field.type}) henüz geliştirilme aşamasında.
        </div>
      );
  }
};