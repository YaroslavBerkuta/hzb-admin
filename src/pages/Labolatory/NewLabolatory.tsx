/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { defaultValues } from "./config";
import { PlusOutlined } from "@ant-design/icons";
import { LabolatoryForm } from "./components/LabolatoryForm";
import { Lang } from "../../typing/enums";
import { Button, Tabs, Upload, UploadProps } from "antd";
import {
  labolatoryCreate,
  updateLabolatory,
} from "../../services/domains/labolatory";
import { isEmpty } from "lodash";

export const NewLabolatory = () => {
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
      if (mod === "create") {
        await labolatoryCreate(values, fileList);
      } else {
        await updateLabolatory(data.id, values);
      }
      navigate("/labolatory");
    } catch (error) {
      console.log(error);
    }
  };
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
