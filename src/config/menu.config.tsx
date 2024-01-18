import {
  CheckOutlined,
  ContainerOutlined,
  CopyOutlined,
  FullscreenOutlined,
  OrderedListOutlined,
  RocketOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  StockOutlined,
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
    label: "Товари",
    key: "products",
    path: "products",
    icon: <ShoppingCartOutlined />,
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
  {
    label: "Дистрибютори",
    key: "regions",
    path: "regions",
    icon: <FullscreenOutlined />,
  },
  {
    label: "Партнери",
    key: "partners",
    path: "partners",
    icon: <CopyOutlined />,
  },
  {
    label: "Виробничі потужності",
    key: "production",
    path: "production",
    icon: <StockOutlined />,
  },
  {
    label: "Проекти",
    key: "projects",
    path: "projects",
    icon: <OrderedListOutlined />,
  },
  {
    label: "Система управління якістю",
    key: "quality",
    path: "quality",
    icon: <CheckOutlined />,
  },
  {
    label: "Випробувальна Лаболаторія",
    key: "labolatory",
    path: "labolatory",
    icon: <RocketOutlined />,
  },
];
