import React, { FC } from "react";
import { NavBar } from "../NavBar/NavBar.component";
import { Layout, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

import styles from "./index.module.scss";

interface IPrpos {
  children: React.ReactNode;
}

export const Wrapper: FC<IPrpos> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.logo}> HZB Admin Panel</div>
        <NavBar />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: "85vh",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        HZB ADMIN ©{new Date().getFullYear()} Created by Creatory Studio
      </Footer>
    </Layout>
  );
};
