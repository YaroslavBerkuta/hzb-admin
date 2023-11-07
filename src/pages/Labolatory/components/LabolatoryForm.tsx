/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lang } from "../../../typing/enums";
import { FC } from "react";
import { find } from "lodash";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";

interface IProps {
  defaultValues: any;
  setField: any;
  lang: Lang;
}

export const LabolatoryForm: FC<IProps> = ({ defaultValues, setField, lang }) => {
  const onChange = (val: string, key: string) => {
    setField(
      "translations",
      defaultValues.translations.map((item: any) =>
        item.lang === lang ? { ...item, [key]: val } : item
      )
    );
  };
  return (
    <div>
      <Input
        name="title"
        placeholder="Заголовок"
        style={{ marginBottom: 20 }}
        defaultValue={
          find(defaultValues.translations, (el) => el.lang === lang)?.name
        }
        onChange={(e) => onChange(e.target.value, "name")}
      />
      <TextArea
        name="description"
        placeholder="Опис"
        defaultValue={
          find(defaultValues.translations, (el) => el.lang === lang)
            ?.description
        }
        rows={10}
        style={{ marginTop: 20 }}
        onChange={(e) => onChange(e.target.value, "description")}
      />
    </div>
  );
};
