import { DatePicker, Input } from "antd";
import { ZodType } from "zod";

export function FormField({
  field,
  fieldSlug,
}: {
  field: ZodType;
  fieldSlug: string;
}) {
  switch (field.type) {
    case "date":
      return (
        <DatePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" />
      );
    case "string":
    default:
      if (field.meta()?.multiline) {
        return <Input.TextArea style={{ height: "20em" }} />;
      }
      return <Input />;
  }
}
