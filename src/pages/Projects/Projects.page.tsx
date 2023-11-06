/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useFlatList } from "../../hooks";
import { Button, List, Skeleton, message } from "antd";
import { Lang } from "../../typing/enums";
import { getTranslate } from "../../helpers/translate.helpers";
import { IProject, IProjectTranslates } from "../../typing";
import { projectApi } from "../../api/projects";

export const Projects = () => {
  const { items, resetFlatList, isLoading } = useFlatList<IProject>({
    fetchItems: projectApi.getList,
    needInit: true,
    loadParams: {},
  });
  const navigate = useNavigate();

  const remove = async (id: number) => {
    try {
      await projectApi.remove(id);
      resetFlatList();
      message.success("Проект видалено");
    } catch (error) {
      console.log(error);
      message.error("Щось пішло нетак");
    }
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div>
      <Button onClick={() => navigate(`/projects/create`)}>Новий проект</Button>
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
              <Button onClick={() => remove(item.id)} type="dashed">
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
                getTranslate<IProjectTranslates>(item.translations, Lang.UA)
                  ?.name
              }
            />
            {
              getTranslate<IProjectTranslates>(item.translations, Lang.UA)
                ?.description
            }
          </List.Item>
        )}
      />
    </div>
  );
};
