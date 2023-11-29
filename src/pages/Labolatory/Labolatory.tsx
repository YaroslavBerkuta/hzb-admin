import { useNavigate } from "react-router-dom";
import { labolatoryApi } from "../../api/labolatory";
import { useFlatList } from "../../hooks";
import { ILabolatory, ILabolatoryTranslate } from "../../typing";
import { Button, List, message } from "antd";
import { getTranslate } from "../../helpers/translate.helpers";
import { Lang } from "../../typing/enums";

export const Labolatory = () => {
  const navigate = useNavigate();
  const { items, resetFlatList } = useFlatList<ILabolatory>({
    fetchItems: labolatoryApi.getList,
    needInit: true,
    loadParams: {},
  });

  const removeLabolatory = async (id: number) => {
    try {
      await labolatoryApi.remove(id);
      message.info("Створено");
      resetFlatList();
    } catch (error) {
      console.log(error);
      message.error("Щось пішло не так");
    }
  };

  return (
    <div>
      <Button
        onClick={() =>
          navigate(`/labolatory/create`, {
            state: {
              mod: "create",
            },
          })
        }
      >
        Новий запис
      </Button>
      <List
        itemLayout="vertical"
        size="default"
        pagination={{
          pageSize: 5,
          position: "top",
        }}
        dataSource={items}
        renderItem={(item: ILabolatory) => (
          <List.Item
            key={item.id}
            actions={[
              <Button onClick={() => removeLabolatory(item.id)} type="dashed">
                Видалити новину
              </Button>,
              <Button
                onClick={() =>
                  navigate(`/labolatory/create`, {
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
                getTranslate<ILabolatoryTranslate>(item.translations, Lang.UA)
                  ?.name
              }
            />
            {
              getTranslate<ILabolatoryTranslate>(item.translations, Lang.UA)
                ?.description
            }
          </List.Item>
        )}
      />
    </div>
  );
};
