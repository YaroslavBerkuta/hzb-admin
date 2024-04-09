/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Flex, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useFlatList } from "../../hooks";
import { productApi } from "../../api/products";
import { getTranslate } from "../../helpers/translate.helpers";
import { Lang } from "../../typing/enums";
import { useState } from "react";

export const Products = () => {
  const navigate = useNavigate();
  const { items, resetFlatList } = useFlatList({
    fetchItems: productApi.getList,
    needInit: true,
    limit: 1000000,
  });

  const remove = async (id: number) => {
    try {
      await productApi.remove(id);
      message.success("Видалено товар");
      resetFlatList();
    } catch (error) {
      message.error("Не вдалося видалити");
    }
  };

  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  
  const filterItemsByCategory = (parentId: number) => {
    const filtered = items.filter((item: any) => {
      if (item.productCategory && item.productCategory.length > 0) {
        return item.productCategory.some((category: any) => category.category.parentId === parentId);
      }
      return false;
    });
    setFilteredItems(filtered);
  };
  

  const resetFilter = () => {
    setFilteredItems([]);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() =>
          navigate(`/products/create`, {
            state: {
              mod: "create",
            },
          })
        }
      >
        Додати товар
      </Button>
      <Button style={{ marginLeft: 10 }} onClick={resetFilter}>
        Всі товари
      </Button>
      <Button style={{ marginLeft: 10 }} onClick={() => filterItemsByCategory(1)}>
        Залізобетонні вироби
      </Button>
      <Button style={{ marginLeft: 10 }} onClick={() => filterItemsByCategory(4)}>
        Бетони та розчини
      </Button>
      <Button style={{ marginLeft: 10 }} onClick={() => filterItemsByCategory(5)}>
        Вироби з деревини
      </Button>
      
      <Flex
        wrap="wrap"
        gap="small"
        style={{ marginTop: 40, justifyContent: "space-between" }}
      >
        {(filteredItems.length > 0 ? filteredItems : items).map((it: any) => (
          <Card
            key={it.id}
            hoverable
            style={{ width: 340, marginBottom: 20 }}
            loading={false}
          >
            <div style={{ marginBottom: 10 }}>
              <img
                style={{ objectFit: "contain", height: 350, width: "100%" }}
                alt="example"
                src={it?.cover[0]?.fileUrl}
              />
            </div>
            <p>{getTranslate<any>(it?.translations, Lang.UA)?.name}</p>
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
                  navigate(`/products/create`, {
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
