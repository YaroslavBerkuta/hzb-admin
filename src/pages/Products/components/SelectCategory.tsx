/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "antd";
import { FC, useEffect, useState } from "react";
import { categoriesApi } from "../../../api/categories";
import { getTranslate } from "../../../helpers/translate.helpers";
import { Lang } from "../../../typing/enums";

export const SelectCategory: FC<{
  defaultValue: string;
  setValue: (val: string) => void;
}> = ({ defaultValue, setValue }) => {
  const [options, setOptions] = useState<any[]>([]);

  const loadCategory = async () => {
    try {
      const { data } = await categoriesApi.getList();
      setOptions(
        data?.map((it: any) => ({
          value: String(it.id),
          label: getTranslate<any>(it.translations, Lang.UA).name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

  const onChange = (value: string) => {
    setValue(value);
  };
  const onSearch = (value: string) => {
    console.log("search:", value);
  };
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
