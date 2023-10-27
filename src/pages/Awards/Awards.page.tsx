/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, List } from "antd";
import { Lang } from "../../typing/enums";
import { useFlatList } from "../../hooks";
import { getTranslate } from "../../helpers/translate.helpers";
import { awardsApi } from "../../api/awards";
import {
  IAwards,
  IAwardsTranslates,
} from "../../typing/interfaces/awards.interface";

export const Awards = () => {
  const { items } = useFlatList<IAwards>({
    fetchItems: awardsApi.getList,
    needInit: true,
    loadParams: {},
  });

  return (
    <>
      <Button onClick={() => {}}>Нова нагорода</Button>

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
              <Button onClick={() => {}} type="dashed">
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
