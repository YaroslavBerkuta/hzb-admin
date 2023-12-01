import { Button, List, Skeleton, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Lang } from "../../typing/enums";
import { getTranslate } from "../../helpers/translate.helpers";
import { useFlatList } from "../../hooks";
import { IPartner } from "../../typing/interfaces/partner.inerface";
import { partnerApi } from "../../api/partners";

export const Partner = () => {
  const { items, resetFlatList, isLoading } = useFlatList<IPartner>({
    fetchItems: partnerApi.getList,
    needInit: true,
    loadParams: {},
  });
  const navigate = useNavigate();
  if (isLoading) {
    return <Skeleton />;
  }

  const deletePost = async (id: number) => {
    try {
      await partnerApi.delete(id);
      resetFlatList();
      message.success("Видалено новину");
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
      <Button
        onClick={() =>
          navigate(`/partners/create`, {
            state: {
              mod: "create",
            },
          })
        }
      >
        Новий пост
      </Button>
      <List
        itemLayout="vertical"
        size="default"
        pagination={{
          pageSize: 5,
          position: "top",
          style: { marginBottom: 15 },
        }}
        dataSource={items}
        renderItem={(item: any) => (
          <List.Item
            key={item.id}
            actions={[
              <Button onClick={() => deletePost(item.id)} type="dashed">
                Видалити новину
              </Button>,
              <Button
                onClick={() =>
                  navigate(`/partners/create`, {
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
              title={getTranslate<any>(item.translations, Lang.UA)?.name}
            />
            {getTranslate<any>(item.translations, Lang.UA)?.description}
          </List.Item>
        )}
      />
    </>
  );
};
