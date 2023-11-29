/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { CreateProductionForm } from "./components/CreateProductionForm";
import { Lang } from "../../typing/enums";
import { Button, Tabs, Upload, UploadProps } from "antd";
import { defaultValues } from "./config";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  createProduction,
  updateProduction,
} from "../../services/domains/production/index";
import { isEmpty } from "lodash";

export const NewProduction = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<any>([]);
  const location = useLocation();
  const { mod, data } = location.state;

  const { setField, onSubmit, values } = useForm(
    isEmpty(data) ? defaultValues : data,
    () => null
  );

  useEffect(() => {
    data?.cover &&
      setFileList(data.cover.map((it: any) => ({ ...it, url: it.fileUrl })));
  }, [data]);

  const submit = async () => {
    try {
      if (mod === "create") {
        await createProduction(values, fileList);
        navigate("/production");
      } else {
        await updateProduction(data.id, values);
        navigate("/production");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      label: "Українська",
      key: "ua",
      children: (
        <CreateProductionForm
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
        <CreateProductionForm
          defaultValues={values}
          setField={setField}
          lang={Lang.EN}
        />
      ),
    },
  ];

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <div>
      {!data && (
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
