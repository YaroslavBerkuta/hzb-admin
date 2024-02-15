/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect, useState } from "react";
import { Lang } from "../../../typing/enums";
import { find } from "lodash";
import { Button, Input } from "antd";
import { DetailInput } from "./DetailInput";

interface IProps {
  defaultValues: any;
  setField: any;
  lang: Lang;
}

export const ProjectForm: FC<IProps> = ({ defaultValues, setField, lang }) => {
  const [info, setInfo] = useState<Array<any>>([]);

  useEffect(() => {
    setInfo(
      find(defaultValues.translations, (el) => el.lang === lang)?.info ?? []
    );
  }, []);

  const removeItem = (index: number) => {
    setInfo((prev: any) =>
      prev.filter((_item: any, idx: number) => idx !== index)
    );
  };

  const onChange = (val: any, key: string) => {
    setField(
      "translations",
      defaultValues.translations.map((item: any) =>
        item.lang === lang ? { ...item, [key]: val, info } : item
      )
    );
  };

  const renderInput = useCallback(() => {
    return info?.map((it: any, index: number) => (
      <DetailInput
        onRemove={() => removeItem(index)}
        title={it.title}
        desc={it.description}
        key={index}
        setTitle={(title: string) => {
          setInfo((prevItems: any) => {
            const updatedItems = [...prevItems];
            updatedItems[index].title = title;
            return updatedItems;
          });
          setField(
            "translations",
            defaultValues.translations.map((item: any) =>
              item.lang === lang ? { ...item, info } : item
            )
          );
        }}
        setDesc={(description: string) => {
          setInfo((prevItems: any) => {
            const updatedItems = [...prevItems];
            updatedItems[index].description = description;
            return updatedItems;
          });
          setField(
            "translations",
            defaultValues.translations.map((item: any) =>
              item.lang === lang ? { ...item, info } : item
            )
          );
        }}
      />
    ));
  }, [info, removeItem]);
  return (
    <div>
      <Input
        name="title"
        placeholder="Заголовок"
        defaultValue={
          find(defaultValues.translations, (el) => el.lang === lang)?.name
        }
        onChange={(e) => onChange(e.target.value, "name")}
      />
      <Input
        name="sity"
        placeholder="Місто"
        style={{ marginTop: 10 }}
        defaultValue={
          find(defaultValues.translations, (el) => el.lang === lang)?.sity
        }
        onChange={(e) => onChange(e.target.value, "sity")}
      />
      <h3 style={{ marginTop: 20 }}>Обсяг продукції: </h3>
      {renderInput()}

      <Button
        type="primary"
        style={{ marginTop: 10 }}
        onClick={() => setInfo([...info, { title: "", description: "" }])}
      >
        Додати продукцію
      </Button>
    </div>
  );
};
