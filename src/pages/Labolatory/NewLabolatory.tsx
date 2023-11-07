/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { defaultValues } from "./config";
import { PlusOutlined } from "@ant-design/icons";
import { LabolatoryForm } from "./components/LabolatoryForm";
import { Lang } from "../../typing/enums";
import { Button, Tabs, Upload, UploadProps } from "antd";
import { labolatoryCreate } from "../../services/domains/labolatory";

export const NewLabolatory = () => {
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

  const items = [
    {
      label: "Українська",
      key: "ua",
      children: (
        <LabolatoryForm
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
        <LabolatoryForm
          defaultValues={values}
          setField={setField}
          lang={Lang.EN}
        />
      ),
    },
  ];
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const submit = async () => {
    try {
      await labolatoryCreate(values, fileList);
      navigate("/labolatory");
    } catch (error) {
      console.log(error);
    }
  };
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
