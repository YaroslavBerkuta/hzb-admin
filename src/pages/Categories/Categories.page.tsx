/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, List, Skeleton, message } from "antd";
import { categoriesApi } from "../../api/categories";
import { useFlatList } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { getTranslate } from "../../helpers/translate.helpers";
import { Lang } from "../../typing/enums";
import { DeleteOutlined } from "@ant-design/icons";

export const Categories = () => {
  const navigate = useNavigate();
  const { items, isLoading, resetFlatList } = useFlatList({
    fetchItems: categoriesApi.getList,
    needInit: true,
    limit: 1000,
    loadParams: {
      limit: 1000,
    },
  });

  if (isLoading) {
    return <Skeleton />;
  }
  const remove = async (id: number) => {
    try {
      await categoriesApi.remove(id);
      message.success("Категорію видаленно");
      resetFlatList();
    } catch (error) {
      message.error("Щось пішло не так");
    }
  };

  return (
    <div>
      <Button
        onClick={() =>
          navigate("/category/create", {
            state: {
              mod: "create",
            },
          })
        }
      >
        Додати категорію
      </Button>
      <List
        style={{ marginTop: 20 }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={items}
        renderItem={(item: any) => (
          <List.Item>
            <Card title={getTranslate<any>(item.translations, Lang.UA)?.name}>
              <Button
                type="primary"
                size={"large"}
                onClick={() => remove(item.id)}
                style={{ marginRight: 10 }}
              >
                <DeleteOutlined />
              </Button>
              <Button
                onClick={() =>
                  navigate("/category/create", {
                    state: {
                      mod: "update",
                      data: item,
                    },
                  })
                }
              >
                Редагувати
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
