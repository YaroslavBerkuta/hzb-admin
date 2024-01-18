import { Menu } from "antd";
import { menuConfig } from "../../config";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Menu
      items={menuConfig}
      onClick={(e) => navigate(e.key, {})}
      theme="dark"
      mode="horizontal"
      style={{ flex: 1, minWidth: 0 }}
    />
  );
};
