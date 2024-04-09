/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, List, message } from "antd";
import { Lang } from "../../typing/enums";
import { useFlatList } from "../../hooks";
import { getTranslate } from "../../helpers/translate.helpers";
import { awardsApi } from "../../api/awards";
import { useNavigate } from "react-router-dom";
import {
  IAwards,
  IAwardsTranslates,
} from "../../typing/interfaces/awards.interface";

export const Awards = () => {
  const navigate = useNavigate();

  const { items, resetFlatList } = useFlatList<IAwards>({
    fetchItems: awardsApi.getList,
    needInit: true,
    loadParams: {},
  });

  const removeAwarads = async (id: number) => {
    try {
      await awardsApi.delete(id);
      message.info("Нагороду видалено");
      resetFlatList();
    } catch (error) {
      console.log(error);
      message.error("Щось пішло не так");
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() =>
          navigate(`/awards/create`, {
            state: {
              mod: "create",
            },
          })
        }
      >
        Нова нагорода
      </Button>

      <List
        itemLayout="vertical"
        size="default"
        pagination={{
          pageSize: 5,
          position: "top",
        }}
        dataSource={items}
        renderItem={(item: IAwards) => (
          <List.Item
            key={item.id}
            actions={[
              <Button onClick={() => removeAwarads(item.id)} type="dashed">
                Видалити новину
              </Button>,
              <Button
                onClick={() =>
                  navigate(`/awards/create`, {
                    state: {
                      mod: "update",
                      data: item,
                    },
                  })
                }
              >
                Редагувати
              </Button>,
            ]}
            extra={
              <img
                width={272}
                height={200}
                style={{ objectFit: "contain" }}
                alt="logo"
                src={item?.cover[0]?.fileUrl}
              />
            }
          >
            <List.Item.Meta
              title={
                getTranslate<IAwardsTranslates>(item.translations, Lang.UA)
                  ?.name
              }
            />
            {
              getTranslate<IAwardsTranslates>(item.translations, Lang.UA)
                ?.description
            }
          </List.Item>
        )}
      />
    </>
  );
};
