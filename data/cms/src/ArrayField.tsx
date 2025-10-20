import { AutoComplete, Button, FormInstance, Input } from "antd";
import { ZodType } from "zod";
import { FieldMeta, TypeMeta } from "../schema/types";
import { useREST } from "./hooks/useREST";

export function ArrayField({
  form,
  field,
  fieldSlug,
}: {
  form: FormInstance;
  field: ZodType;
  fieldSlug: string;
}) {
  const def = (field as ZodType).def as unknown as {
    element?: ZodType;
  };
  const meta = def.element?.meta() as TypeMeta;

  const { items } = useREST(meta.slug);

  console.log({ items });
  return (
    <div>
      <ul></ul>
      <AutoComplete
        options={items?.map((item) => {
          console.log(item);
          return { label: "", value: item.id };
        })}
      />
      <Button htmlType="button">Add</Button>
    </div>
  );
}
