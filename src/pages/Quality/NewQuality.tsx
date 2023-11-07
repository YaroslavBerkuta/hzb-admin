/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../../hooks";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tabs, Upload, UploadProps } from "antd";
import { defaultValues } from "./config";
import { QualityForm } from "./components/QualityForm";
import { Lang } from "../../typing/enums";
import { createQuality } from "../../services/domains/quality";

export const NewQuality = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<any>([]);

  const { setField, onSubmit, values } = useForm<any>(
    defaultValues,
    () => null
  );

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const submit = async () => {
    try {
      await createQuality(values, fileList);
      navigate("/quality");
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      label: "Українська",
      key: "ua",
      children: (
        <QualityForm
          defaultValues={values}
          setField={setField}
          lang={Lang.UA}
        />
      ),
    },
    {
      label: "Англійська",
      key: "en",
      children: (
        <QualityForm
          defaultValues={values}
          setField={setField}
          lang={Lang.EN}
        />
      ),
    },
  ];

  return (
    <div>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
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
