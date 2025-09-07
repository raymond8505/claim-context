import { Button, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { getTypeBySlug } from "../schema/helpers";

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
          {type?.meta().label?.plural}
        </h1>
        <Button
          type="primary"
          onClick={() => {
            navigate(`/${type?.meta().label?.plural}/new`);
          }}
        >
          Create
        </Button>
      </Header>
    </Layout>
  );
}
