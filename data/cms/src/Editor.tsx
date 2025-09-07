import { useParams } from "react-router-dom";
import { getTypeBySlug } from "../schema/helpers";
import { Button, Form, Layout } from "antd";
import { Header } from "antd/es/layout/layout";

export function Editor({ typeSlug }: { typeSlug: string }) {
  const { id } = useParams();
  const type = getTypeBySlug(typeSlug);

  console.log(type);
  return type?.shape ? (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            textTransform: "capitalize",
          }}
        >
          {id === "new" ? `New ${typeSlug}` : id}
        </h1>
      </Header>
      <Form>
        {Object.entries(type.shape).map(([fieldSlug, field]) => {
          console.log({ fieldSlug, field, id });

          return (
            <Form.Item
              label={field.meta().label}
              key={fieldSlug}
              hidden={field.meta().hidden}
            >
              d
            </Form.Item>
          );
        })}
        <Button type="primary" htmlType="submit">
          {id === "new" ? "Add New" : "Edit"}
        </Button>
      </Form>
    </Layout>
  ) : null;
}
