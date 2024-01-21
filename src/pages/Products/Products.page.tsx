/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Flex, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useFlatList } from "../../hooks";
import { productApi } from "../../api/products";
import { getTranslate } from "../../helpers/translate.helpers";
import { Lang } from "../../typing/enums";

export const Products = () => {
  const navigate = useNavigate();
  const { items, resetFlatList } = useFlatList({
    fetchItems: productApi.getList,
    needInit: true,
    limit: 1000000,
  });

  const remove = async (id: number) => {
    try {
      await productApi.remove(id);
      message.success("Видалено товар");
      resetFlatList();
    } catch (error) {
      message.error("Не вдалося видалити");
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() =>
          navigate(`/products/create`, {
            state: {
              mod: "create",
            },
          })
        }
      >
        Додати товар
      </Button>

      <Flex
        wrap="wrap"
        gap="small"
        style={{ marginTop: 40, justifyContent: "space-between" }}
      >
        {items.map((it: any) => (
          <Card
            key={it.id}
            hoverable
            style={{ width: 340, marginBottom: 20 }}
            loading={false}
          >
            <div style={{ marginBottom: 10 }}>
              <img
                style={{ objectFit: "cover", height: 350, width: "100%" }}
                alt="example"
                src={it?.cover[0]?.fileUrl}
              />
            </div>
            <p>{getTranslate<any>(it?.translations, Lang.UA)?.name}</p>
            <div style={{ marginTop: 10 }}>
              <Button
                type="primary"
                style={{ marginRight: 10 }}
                onClick={() => remove(it.id)}
              >
                Видалити
              </Button>
              <Button
                onClick={() =>
                  navigate(`/products/create`, {
                    state: {
                      mod: "eddit",
                      data: it,
                    },
                  })
                }
              >
                Редагувати
              </Button>
            </div>
          </Card>
        ))}
      </Flex>
    </>
  );
};
