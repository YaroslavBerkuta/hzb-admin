/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "../../hooks";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Tabs, Upload, UploadFile, UploadProps } from "antd";
import { isEmpty } from "lodash";
import { ProjectForm } from "./components/ProjectForm";
import { Lang } from "../../typing/enums";
import { defaultValues } from "./config";
import { createProject, updateProject } from "../../services/domains/project";

export const NewProject = () => {
  const [file, setFile] = useState<UploadFile[]>([]);
  const [removeFile, setRemoveFile] = useState<any[]>([]);

  const location = useLocation();
  const { mod, data } = location.state;

  const { setField, onSubmit, values } = useForm(
    isEmpty(data) ? defaultValues : data,
    () => null
  );

  useEffect(() => {
    data?.cover &&
      setFile(
        data.cover.map((it: any) => ({ ...it, uid: it.id, url: it.fileUrl }))
      );
  }, [data]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFile(newFileList);

  const submit = async () => {
    try {
      if (mod === "create") {
        await createProject(values, file[0]?.originFileObj);
      } else {
        await updateProject(
          data.id,
          values,
          removeFile,
          file[0]?.originFileObj
        );
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
        <ProjectForm
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
        <ProjectForm
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
        multiple={true}
        fileList={file}
        listType="picture-card"
        onRemove={(e) => setRemoveFile((prev) => [...prev, e.uid])}
        onChange={handleChange}
      >
        {!isEmpty(file) ? null : uploadButton}
      </Upload>

      <Input
        name="years"
        placeholder="Роки"
        style={{ maxWidth: 400, marginTop: 40 }}
        defaultValue={values.years}
        onChange={(e) => setField("years", e.target.value)}
      />

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
