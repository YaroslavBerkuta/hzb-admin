/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "antd";
import { FC, useEffect, useState } from "react";
import { categoriesApi } from "../../../api/categories";
import { getTranslate } from "../../../helpers/translate.helpers";
import { Lang } from "../../../typing/enums";
import { useFlatList } from "../../../hooks";

export const SelectCategory: FC<{
  defaultValue: string;
  setValue: (val: string) => void;
}> = ({ defaultValue, setValue }) => {
  const [options, setOptions] = useState<any[]>([]);

  const { items } = useFlatList({
    fetchItems: categoriesApi.getList,
    needInit: true,
    limit: 1000,
  });

  useEffect(() => {
    setOptions(
      items?.map((it: any) => ({
        value: String(it.id),
        label: getTranslate<any>(it.translations, Lang.UA)?.name,
      }))
    );
  }, [items]);

  const onChange = (value: string) => {
    setValue(value);
  };
  const onSearch = (value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Select
      style={{ width: 300 }}
      defaultValue={defaultValue}
      showSearch
      placeholder="Виберіть категорію"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={options}
    />
  );
};
