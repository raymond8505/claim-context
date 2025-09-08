import { Button, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { getTypeBySlug } from "../schema/helpers";
import { TypeMeta } from "../schema/types";

export function Archive({ typeSlug }: { typeSlug: string }) {
  const navigate = useNavigate();
  const type = getTypeBySlug(typeSlug);
  return (
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
          {(type?.meta() as TypeMeta).label?.plural}
        </h1>
        <Button
          type="primary"
          onClick={() => {
            navigate(`/${(type?.meta() as TypeMeta).label?.plural}/new`);
          }}
        >
          Create
        </Button>
      </Header>
    </Layout>
  );
}
