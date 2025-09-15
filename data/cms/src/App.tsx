import { Layout, Menu } from "antd";
import schema from "../schema";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Archive } from "./Archive";
import { Editor } from "./Editor";
import { TypeMeta } from "../schema/types";
function App() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout>
        <Layout.Sider
          style={{
            height: "100%",
          }}
        >
          <Menu
            items={schema.map((type) => {
              return {
                key: (type?.meta() as TypeMeta)?.label?.plural ?? "",
                label: (type?.meta() as TypeMeta)?.label?.plural ?? "",
                onClick: () => {
                  location.href = `/${(type?.meta() as TypeMeta)?.slug}`;
                },
              };
            })}
          />
        </Layout.Sider>
        <Layout.Content style={{ padding: "min(1vmin,2em)" }}>
          <BrowserRouter>
            <Routes>
              {schema.map((type) => {
                const typeLabel = (
                  type?.meta() as TypeMeta
                )?.label?.plural?.toLowerCase();

                return typeLabel ? (
                  <>
                    <Route
                      path={typeLabel}
                      element={
                        <Archive typeSlug={(type?.meta() as TypeMeta)?.slug} />
                      }
                    />
                    <Route
                      path={`${typeLabel}/:id`}
                      element={
                        <Editor typeSlug={(type?.meta() as TypeMeta)?.slug} />
                      }
                    />
                  </>
                ) : null;
              })}
            </Routes>
          </BrowserRouter>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
