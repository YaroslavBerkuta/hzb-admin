import { Button, Card, Flex, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useFlatList } from "../../hooks";
import { instagramApi } from "../../api/instagram";

export const Instagram = () => {
  const navigate = useNavigate();
  const { items, resetFlatList } = useFlatList({
    fetchItems: instagramApi.getList,
    needInit: true,
    limit: 1000000,
  });

  const remove = async (id: number) => {
    try {
      await instagramApi.remove(id);
      resetFlatList();
      message.success("Пост видаленно");
    } catch (error) {
      message.error("Сталась помилка");
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() =>
          navigate(`/instagram/create`, {
            state: {
              mod: "create",
            },
          })
        }
      >
        Додати пост
      </Button>
      <Flex
        wrap="wrap"
        gap="small"
        style={{ marginTop: 40, justifyContent: "space-between" }}
      >
        {items?.map((it: any) => (
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
                  navigate(`/instagram/create`, {
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
