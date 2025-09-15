import { GlobalMeta, ZodType } from "zod";

export interface FieldMeta extends GlobalMeta {
  description?: string;
  label?: string;
  multiline?: boolean;
  hidden?: boolean;
  readOnly?: boolean;
  relationship?: {
    type: ZodType;
    displayField: string;
  };
  archive: {
    hidden: boolean;
  };
}

export interface TypeMeta extends GlobalMeta {
  label?: {
    singular?: string;
    plural?: string;
  };
  labelField?: string;
  slug: string;
}
