import React from "react";
import type { FormField, PhoneField, DateField } from "../../types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  field: FormField;
}

export const FieldRenderer = ({ field }: Props) => {
  const RequiredBadge = () =>
    field.required ? <span className="text-red-500 ml-1">*</span> : null;

  const FieldWrapper = ({
    children,
    customLabel = field.label,
  }: {
    children: React.ReactNode;
    customLabel?: string;
  }) => (
    <div className="space-y-3 w-full animate-in fade-in duration-300">
      <Label className="text-sm font-bold text-slate-700 flex items-center">
        {customLabel} <RequiredBadge />
      </Label>
      {children}
    </div>
  );

  const SubInput = ({
    label,
    placeholder,
  }: {
    label: string;
    placeholder: string;
  }) => (
    <div className="space-y-1.5 flex-1">
      <Label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-1">
        {label}
      </Label>
      <Input
        disabled
        placeholder={placeholder}
        className="bg-slate-50/50 border-slate-200 focus:ring-0"
      />
    </div>
  );

  switch (field.type) {
    case "header":
      return (
        <div className="py-6 border-b border-slate-100 mb-4 bg-white print:pb-2">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {field.label}
          </h2>
          {field.placeholder && (
            <p className="text-slate-500 mt-2 text-base leading-relaxed">
              {field.placeholder}
            </p>
          )}
        </div>
      );

    case "full_name":
      return (
        <FieldWrapper>
          <div className="grid grid-cols-2 gap-4">
            <SubInput label="Ad" placeholder={field.placeholder || "Adınız"} />
            <SubInput
              label="Soyad"
              placeholder={field.placeholder || "Soyadınız"}
            />
          </div>
        </FieldWrapper>
      );

    case "address":
      return (
        <FieldWrapper>
          <div className="grid gap-4">
            <SubInput
              label="Açık Adres"
              placeholder={field.placeholder || "Sokak, No, Kapı..."}
            />
            <div className="grid grid-cols-2 gap-4">
              <SubInput
                label="İl"
                placeholder={field.placeholder || "Örn: İstanbul"}
              />
              <SubInput
                label="İlçe"
                placeholder={field.placeholder || "Örn: Beşiktaş"}
              />
            </div>
          </div>
        </FieldWrapper>
      );

    case "textarea":
      return (
        <FieldWrapper>
          <Textarea
            disabled
            placeholder={field.placeholder || ""}
            className="min-h-[120px] bg-slate-50/50 resize-none"
          />
        </FieldWrapper>
      );

    case "phone":
      const phoneField = field as PhoneField;
      return (
        <FieldWrapper>
          <div className="flex gap-2">
            <div className="w-24 bg-slate-100 border rounded-md text-sm text-slate-600 font-bold flex items-center justify-center shrink-0">
              {phoneField.countryCode || "🇹🇷 +90"}
            </div>
            <Input
              disabled
              placeholder={field.placeholder || "5XX XXX XX XX"}
              className="bg-slate-50/50"
            />
          </div>
        </FieldWrapper>
      );

    case "date":
      const dateField = field as DateField;

      const currentPlaceholder =
        field.placeholder || dateField.dateFormat || "GG-AA-YYYY";

      return (
        <FieldWrapper>
          <div className="relative group">
            <Input
              type="text"
              disabled
              placeholder={currentPlaceholder}
              className="bg-slate-50/50 border-slate-200 cursor-default pr-10"
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
          </div>
        </FieldWrapper>
      );

    case "dropdown":
      return (
        <FieldWrapper>
          <Select disabled>
            <SelectTrigger className="bg-slate-50/50">
              <SelectValue
                placeholder={field.placeholder || "Seçenek seçiniz..."}
              />
            </SelectTrigger>
            <SelectContent />
          </Select>
        </FieldWrapper>
      );

    case "checkbox":
      return (
        <div className="flex items-start space-x-3 p-4 border rounded-xl bg-slate-50/20 border-slate-200 hover:bg-slate-50 transition-colors">
          <Checkbox id={field.id} disabled className="mt-1" />
          <div className="grid gap-2 leading-none">
            <Label className="text-sm font-bold text-slate-700 leading-none">
              {field.label} <RequiredBadge />
            </Label>
            {field.placeholder && (
              <p className="text-xs text-slate-500 font-medium">
                {field.placeholder}
              </p>
            )}
          </div>
        </div>
      );

    default:
      return (
        <FieldWrapper>
          <Input
            type={field.type}
            disabled
            placeholder={field.placeholder || ""}
            className="bg-slate-50/50 border-slate-200"
          />
        </FieldWrapper>
      );
  }
};
