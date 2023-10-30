import { useNavigate } from "react-router-dom";
import { productionApi } from "../../api/production";
import { IProduction, IProductionTranslate } from "../../typing";
import { useFlatList } from "../../hooks";
import { Button, List, message } from "antd";
import { getTranslate } from "../../helpers/translate.helpers";
import { Lang } from "../../typing/enums";

export const Production = () => {
  const navigate = useNavigate();

  const { items, resetFlatList } = useFlatList<IProduction>({
    fetchItems: productionApi.getList,
    needInit: true,
    loadParams: {},
  });

  const removeAwarads = async (id: number) => {
    try {
      await productionApi.delete(id);
      message.info("Нагороду видалено");
      resetFlatList();
    } catch (error) {
      console.log(error);
      message.error("Щось пішло не так");
    }
  };

  return (
    <div>
      <Button onClick={() => navigate(`/production/create`)}>
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
        renderItem={(item: IProduction) => (
          <List.Item
            key={item.id}
            actions={[
              <Button onClick={() => removeAwarads(item.id)} type="dashed">
                Видалити новину
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
                getTranslate<IProductionTranslate>(item.translations, Lang.UA)
                  ?.name
              }
            />
            {
              getTranslate<IProductionTranslate>(item.translations, Lang.UA)
                ?.data
            }
          </List.Item>
        )}
      />
    </div>
  );
};
