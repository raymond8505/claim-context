import { Layout, Menu } from "antd";
import schema from "../schema";
import * as z from "zod";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Archive } from "./Archive";
import { Editor } from "./Editor";
function App() {
  console.log(z.globalRegistry);
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
                key: type.meta()?.label?.plural as string,
                label: type.meta()?.label?.plural as string,
                extra: "+",
                onClick: () => {
                  location.href = `/${type
                    .meta()
                    ?.label?.plural.toString()
                    .toLowerCase()}`;
                },
              };
            })}
          />
        </Layout.Sider>
        <Layout.Content style={{ padding: "min(1vmin,2em)" }}>
          <BrowserRouter>
            <Routes>
              {schema.map((type) => {
                const typeLabel = type
                  .meta()
                  ?.label?.plural.toString()
                  .toLowerCase();

                return typeLabel ? (
                  <>
                    <Route
                      path={typeLabel}
                      element={<Archive typeSlug={typeLabel} />}
                    />
                    <Route
                      path={`${typeLabel}/:id`}
                      element={<Editor typeSlug={typeLabel} />}
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
