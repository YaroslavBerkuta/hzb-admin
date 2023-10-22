import React, { FC } from "react";
import { NavBar } from "../NavBar/NavBar.component";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";

import styles from "./index.module.scss";

interface IPrpos {
  children: React.ReactNode;
}

export const Wrapper: FC<IPrpos> = ({ children }) => {
  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className={styles.logo}> HZB Admin Panel</div>
        <NavBar />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "white" }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "white",
              height: "100%",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>©2023 Creatory Studio</Footer>
      </Layout>
    </Layout>
  );
};
