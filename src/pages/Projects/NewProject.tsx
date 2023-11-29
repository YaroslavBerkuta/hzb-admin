/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tabs, Upload } from "antd";
import { isEmpty } from "lodash";
import { ProjectForm } from "./components/ProjectForm";
import { Lang } from "../../typing/enums";
import { defaultValues } from "./config";
import { createProject, updateProject } from "../../services/domains/project";

export const NewProject = () => {
  const [file, setFile] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { mod, data } = location.state;

  const { setField, onSubmit, values } = useForm(
    isEmpty(data) ? defaultValues : data,
    () => null
  );

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const submit = async () => {
    try {
      if (mod === "create") {
        await createProject(values, file);
        navigate("/projects");
      } else {
        await updateProject(data.id, values);
        navigate("/projects");
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
      {mod === "create" && (
        <Upload
          multiple={true}
          listType="picture-card"
          onChange={({ file }) => {
            setFile(file.originFileObj);
          }}
        >
          {!isEmpty(file) ? null : uploadButton}
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
