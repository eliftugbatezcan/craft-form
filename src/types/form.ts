export type FieldType =
  | "text"
  | "textarea"
  | "full_name"
  | "email"
  | "checkbox"
  | "address"
  | "dropdown"
  | "phone"
  | "date"
  | "header";

export interface BaseField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  helpText?: string;
}

export type DateFormat = "AA-GG-YYYY" | "GG-AA-YYYY" | "YYYY-AA-GG";

export interface DateField extends BaseField {
  type: "date";
  dateFormat?: DateFormat;
  showCalendar?: boolean;
  defaultDate?: "none" | "current" | "custom";
}

export interface SelectionField extends BaseField {
  type: "dropdown";
  options: { label: string; value: string }[];
}

export interface PhoneField extends BaseField {
  type: "phone";
  countryCode?: string;
  defaultCountryCode?: string;
}

export interface HeaderField extends BaseField {
  type: "header";
  variant: "h1" | "h2" | "h3";
}

export interface AddressField extends BaseField {
  type: "address";
}

export interface FullNameField extends BaseField {
  type: "full_name";
}

export type FormField =
  | BaseField
  | SelectionField
  | PhoneField
  | HeaderField
  | DateField
  | AddressField
  | FullNameField;

export interface FormSchema {
  title: string;
  description?: string;
  fields: FormField[];
}
