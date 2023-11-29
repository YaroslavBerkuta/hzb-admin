/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, List, Skeleton, message } from "antd";
import { useFlatList } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { distributorApi } from "../../api/regions/intex";
import { IDistributors } from "../../typing/interfaces/distributors.interface";
import { getTranslate } from "../../helpers/translate.helpers";
import { Lang } from "../../typing/enums";
import { truncate } from "lodash";

export const Regions = () => {
  const { items, isLoading, resetFlatList } = useFlatList<IDistributors>({
    fetchItems: distributorApi.getList,
    needInit: true,
    loadParams: {},
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <Skeleton />;
  }

  const remove = async (id: number) => {
    try {
      await distributorApi.remove(id);
      resetFlatList();
      message.success("Дистрибютора видалено");
    } catch (error) {
      console.log(error);
      message.error("Щось пішло не так");
    }
  };

  return (
    <div>
      <Button
        onClick={() =>
          navigate(`/regions/create`, {
            state: {
              mod: "create",
            },
          })
        }
      >
        Новий дистрибютор
      </Button>
      <List
        style={{ marginTop: 20 }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={items}
        pagination={{
          pageSize: 9,
          position: "top",
          style: { marginBottom: 15 },
        }}
        renderItem={(item: IDistributors) => (
          <List.Item>
            <Card
              title={getTranslate(item.translations, Lang.UA).name}
              extra={
                <>
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
                      navigate(`/regions/create`, {
                        state: {
                          mod: "update",
                          data: item,
                        },
                      })
                    }
                  >
                    Редагувати
                  </Button>
                </>
              }
            >
              {truncate(getTranslate(item.translations, Lang.UA).description, {
                length: 250,
                separator: "...",
              })}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
