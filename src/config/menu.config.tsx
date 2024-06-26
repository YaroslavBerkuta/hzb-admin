import {
  CheckOutlined,
  ContainerOutlined,
  CopyOutlined,
  FullscreenOutlined,
  InstagramOutlined,
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
    label: "Категорії товарів",
    key: "category",
    path: "category",
    icon: <ShoppingCartOutlined />,
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
    label: "Дистриб\'ютори",
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
    label: "Випробувальна Лабораторія",
    key: "labolatory",
    path: "labolatory",
    icon: <RocketOutlined />,
  },
  {
    label: "Instagram",
    key: "instagram",
    path: "instagram",
    icon: <InstagramOutlined />,
  },
];
