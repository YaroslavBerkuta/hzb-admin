/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Tabs, Upload } from "antd";
import { useLocation } from "react-router-dom";
import { NewsForm } from "./components";
import { useForm } from "../../hooks";
import { Lang } from "../../typing/enums";
import { defaultValue } from "./config";
import { useEffect, useState } from "react";
import { saveNews } from "../../services/domains/news/index";
import { isEmpty } from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import { newsApi } from "../../api/news";

export const NewsDetails = () => {
  const [file, setFile] = useState<any>(null);

  const location = useLocation();
  const { mod, newsId } = location.state;

  const { setField, onSubmit, values } = useForm(defaultValue, () => null);

  const items = [
    {
      label: "Українська",
      key: "ua",
      children: (
        <NewsForm defaultValues={values} setField={setField} lang={Lang.UA} />
      ),
    },
    {
      label: "Англійська",
      key: "en",
      children: (
        <NewsForm defaultValues={values} setField={setField} lang={Lang.EN} />
      ),
    },
  ];

  const submit = async () => {
    try {
      if (mod === "create") {
        await saveNews(values, file);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Upload
        multiple={true}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        onChange={({ file }) => {
          console.log(file);
          setFile(file.originFileObj);
        }}
      >
        {!isEmpty(file) ? null : uploadButton}
      </Upload>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"large"}
        style={{ marginTop: 30 }}
        items={items}
      />
      <Button
        type="primary"
        size={"large"}
        style={{ marginTop: 30 }}
        onClick={() => onSubmit(submit)}
      >
        Зберегти
      </Button>
    </div>
  );
};
