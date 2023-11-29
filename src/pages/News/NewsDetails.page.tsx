/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Tabs, Upload } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { NewsForm } from "./components";
import { useForm } from "../../hooks";
import { Lang } from "../../typing/enums";
import { defaultValue } from "./config";
import { useEffect, useState } from "react";
import { saveNews, updateNews } from "../../services/domains/news/index";
import { isEmpty } from "lodash";
import { PlusOutlined } from "@ant-design/icons";

export const NewsDetails = () => {
  const [file, setFile] = useState<any>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const { mod, data } = location.state;

  useEffect(() => {
    data?.cover &&
      setFile(data.cover.map((it: any) => ({ ...it, url: it.fileUrl })));
  }, [data]);

  const { setField, onSubmit, values } = useForm(
    isEmpty(data) ? defaultValue : data,
    () => null
  );

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
        console.log('create')
        await saveNews(values, file);
      } else {
        await updateNews(data.id, values);
      }
      navigate(`/news`);
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
        listType="picture-card"
        onChange={({ file }) => {
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
