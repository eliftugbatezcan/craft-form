export type FieldType = 'text' | 'number' | 'email' | 'checkbox' | 'dropdown';

export interface BaseField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  placeholder?: string;
}

export interface SelectionField extends BaseField {
  type: 'dropdown';
  options: string[];
}

// 3. Union Type: Bir alan ya temel bir alandır ya da seçimli bir alandır
// Bu yapı "Open/Closed" prensibine uygundur; yeni tipler eklemek çok kolaydır.
export type FormField = BaseField | SelectionField;

// 4. Formun genel yapısı
export interface FormSchema {
  title: string;
  fields: FormField[];
}