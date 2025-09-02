import { Layout, Menu } from "antd";
import schema from "../schema";
import * as z from "zod";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
                key: type.meta()?.label as string,
                label: type.meta()?.label as string,
                onClick: () => {
                  location.href = `/${type
                    .meta()
                    ?.label?.toString()
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
                return (
                  <Route
                    path={type.meta()?.label?.toString().toLowerCase()}
                    element={
                      <strong>
                        {type.meta()?.label?.toString().toLowerCase()}
                      </strong>
                    }
                  />
                );
              })}
            </Routes>
          </BrowserRouter>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
