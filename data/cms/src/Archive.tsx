import { Button, Layout, Table } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { getTypeBySlug } from "../schema/helpers";
import { FieldMeta, TypeMeta } from "../schema/types";
import { useREST } from "./hooks/useREST";
import { ColumnType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
export function Archive({ typeSlug }: { typeSlug?: string }) {
  const navigate = useNavigate();
  const { items, deleteItem } = useREST(typeSlug);

  if (!typeSlug) return null;

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
      <Table
        dataSource={items?.map((item) => {
          return {
            key: item.id,
            ...item,
          };
        })}
        columns={[
          ...Object.entries(type?.shape ?? {})
            .filter(([, field]) => {
              return !(field.meta() as FieldMeta)?.archive?.hidden;
            })
            .map(([fieldSlug, field]) => {
              //console.log(type?.shape);
              return {
                dataIndex: fieldSlug,
                key: fieldSlug,
                title: field.meta().label,
              } as ColumnType;
            }),
          {
            title: "Actions",
            render: (_, record) => {
              return (
                <>
                  <a href={`/${typeSlug}/${record.id}`}>
                    <EditOutlined />
                  </a>
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    style={{ marginLeft: 8 }}
                    onClick={() => {
                      if (confirm(`Delete ${record.title}?`)) {
                        deleteItem(record.id);
                      }
                    }}
                  />
                </>
              );
            },
          },
        ]}
      />
    </Layout>
  );
}
