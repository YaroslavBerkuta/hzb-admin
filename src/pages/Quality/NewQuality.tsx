/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../../hooks";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tabs, Upload, UploadProps } from "antd";
import { defaultValues } from "./config";
import { QualityForm } from "./components/QualityForm";
import { Lang } from "../../typing/enums";
import { createQuality, updateQuality } from "../../services/domains/quality";
import { isEmpty } from "lodash";

export const NewQuality = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<any>([]);

  const location = useLocation();
  const { mod, data } = location.state;

  const { setField, onSubmit, values } = useForm<any>(
    isEmpty(data) ? defaultValues : data,
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
      if (mod === "create") {
        await createQuality(values, fileList);
      } else {
        await updateQuality(data.id, values);
      }
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
      {mod === "create" && (
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      )}

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
