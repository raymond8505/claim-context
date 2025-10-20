import { useNavigate, useParams } from "react-router-dom";
import { getTypeBySlug } from "../schema/helpers";
import { Button, DatePicker, Form, Input, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { FieldMeta, TypeMeta } from "../schema/types";
import { useCallback } from "react";
import { useREST } from "./hooks/useREST";
import { ZodType } from "zod";
import { ArrayField } from "./ArrayField";

/**
 *
 * @param param0
 * @returns
 */
export function Editor({ typeSlug }: { typeSlug?: string }) {
  const { id } = useParams();
  const [form] = Form.useForm();

  const type = getTypeBySlug(typeSlug);
  const { createItem, getItemById, updateItem } = useREST<
    Record<string, unknown> & { id: string }
  >(typeSlug);

  const navigate = useNavigate();

  const item = (id ? getItemById(id) : undefined) as Record<string, unknown>;
  const onFinish = useCallback(
    (fields: Record<string, unknown> & { id: string }) => {
      if (id) {
        updateItem(fields);
      } else {
        createItem(fields).then((newItem) => {
          navigate(`/${typeSlug}/${newItem.id}`);
        });
      }
    },
    [createItem, navigate, typeSlug, updateItem, id]
  );

  if (!typeSlug) return null;

  if (item) {
    Object.entries(item).forEach(([name, value]) => {
      form.setFieldValue(name, value);
    });
  }

  return type?.shape ? (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1em",
        }}
      >
        <h1
          style={{
            textTransform: "capitalize",
          }}
        >
          {id === "new"
            ? `New ${(type.meta() as TypeMeta)?.label?.singular}`
            : `Edit "${
                item?.[(type.meta() as TypeMeta).labelField ?? "title"]
              }"`}
        </h1>
      </Header>
      <Form form={form} onFinish={onFinish}>
        {Object.entries(type.shape).map(
          ([fieldSlug, field]: [string, ZodType]) => {
            let inputElement;
            switch (field.type) {
              case "date":
                inputElement = (
                  <DatePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    readOnly={(field.meta() as FieldMeta).readOnly}
                    disabled={(field.meta() as FieldMeta).readOnly}
                  />
                );
                break;
              case "array": {
                inputElement = (
                  <ArrayField form={form} field={field} fieldSlug={fieldSlug} />
                );
                break;
              }
              case "string":
              default:
                if (field.meta()?.multiline) {
                  inputElement = <Input.TextArea style={{ height: "20em" }} />;
                } else {
                  inputElement = <Input />;
                }
                break;
            }

            return (
              <Form.Item
                label={(field.meta() as FieldMeta)?.label}
                key={fieldSlug}
                name={fieldSlug}
                hidden={(field.meta() as FieldMeta)?.hidden}
              >
                {inputElement}
              </Form.Item>
            );
          }
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {id === "new" ? "Add New" : "Edit"}
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  ) : null;
}
