import {
  ContainerOutlined,
  SmileOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export const menuConfig = [
  {
    label: "Сторінки",
    key: "pages",
    path: "pages",
    icon: <ContainerOutlined />,
  },
  {
    label: "Новини",
    key: "news",
    path: "news",
    icon: <UnorderedListOutlined />,
  },
  {
    label: "Нагороди",
    key: "awards",
    path: "awards",
    icon: <SmileOutlined />,
  },
];
