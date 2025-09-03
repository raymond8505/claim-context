import { useParams } from "react-router-dom";
import { getTypeBySlug } from "../schema/helpers";
import { Form } from "antd";

export function Editor({ typeSlug }: { typeSlug: string }) {
  const { id } = useParams();
  const type = getTypeBySlug(typeSlug);

  console.log(type);
  return type?.shape ? (
    <Form>
      {Object.entries(type.shape).map(([fieldSlug, field]) => {
        console.log({ fieldSlug, field });

        return null;
      })}
    </Form>
  ) : null;
}
