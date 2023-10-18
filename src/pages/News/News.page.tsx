import { List, Skeleton } from "antd";
import { newsApi } from "../../api/news";
import { useFlatList } from "../../hooks";
import { INews, INewsTranslates } from "../../typing";
import { getTranslate } from "../../helpers/translate.helpers";
import { Lang } from "../../typing/enums";

export const News = () => {
  const { items } = useFlatList<INews>({
    fetchItems: newsApi.getList,
    needInit: true,
    loadParams: {},
  });

  if (items.length === 0) {
    return <Skeleton />;
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 5,
      }}
      dataSource={items}
      renderItem={(item: INews) => (
        <List.Item
          key={item.id}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
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
  );
};
