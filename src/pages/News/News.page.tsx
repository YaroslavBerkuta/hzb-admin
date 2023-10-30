import { Button, List, Skeleton, message } from "antd";
import { newsApi } from "../../api/news";
import { useFlatList } from "../../hooks";
import { INews, INewsTranslates } from "../../typing";
import { getTranslate } from "../../helpers/translate.helpers";
import { Lang } from "../../typing/enums";
import { useNavigate } from "react-router-dom";

export const News = () => {
  const { items, resetFlatList, isLoading } = useFlatList<INews>({
    fetchItems: newsApi.getList,
    needInit: true,
    loadParams: {},
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <Skeleton />;
  }

  const deletePost = async (id: number) => {
    try {
      await newsApi.delete(id);
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
          navigate(`/news/create`, {
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
        renderItem={(item: INews) => (
          <List.Item
            key={item.id}
            actions={[
              <Button onClick={() => deletePost(item.id)} type="dashed">
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
                getTranslate<INewsTranslates>(item.translations, Lang.UA)?.name
              }
            />
            {
              getTranslate<INewsTranslates>(item.translations, Lang.UA)
                ?.description
            }
          </List.Item>
        )}
      />
    </>
  );
};
