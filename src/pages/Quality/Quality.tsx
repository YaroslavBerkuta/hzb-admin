import { useNavigate } from "react-router-dom";
import { useFlatList } from "../../hooks";
import { Button, List, message } from "antd";
import { Lang } from "../../typing/enums";
import { getTranslate } from "../../helpers/translate.helpers";
import { IQuality, IQualityTranslate } from "../../typing";
import { qualityApi } from "../../api/quality";

export const Quality = () => {
  const navigate = useNavigate();

  const { items, resetFlatList } = useFlatList<IQuality>({
    fetchItems: qualityApi.getList,
    needInit: true,
    loadParams: {},
  });

  const removeQuality = async (id: number) => {
    try {
      await qualityApi.remove(id);
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
        type="primary"
        onClick={() =>
          navigate(`/quality/create`, {
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
        renderItem={(item: IQuality) => (
          <List.Item
            key={item.id}
            actions={[
              <Button onClick={() => removeQuality(item.id)} type="dashed">
                Видалити новину
              </Button>,
              <Button
                onClick={() =>
                  navigate(`/quality/create`, {
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
                getTranslate<IQualityTranslate>(item.translations, Lang.UA)
                  ?.name
              }
            />
            {
              getTranslate<IQualityTranslate>(item.translations, Lang.UA)
                ?.description
            }
          </List.Item>
        )}
      />
    </div>
  );
};
