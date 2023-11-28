/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tabs, Upload } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { CreateAwardsForm } from "./components/createAwardsForm";
import { Lang } from "../../typing/enums";
import { useForm } from "../../hooks";
import { saveAwards, updateAwards } from "../../services/domains/awards/index";
import { defaultValue } from "./config";
import { useLocation, useNavigate } from "react-router-dom";
export const NewAwards = () => {
  const [file, setFile] = useState<any>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const { mod, data } = location.state;

  const { setField, onSubmit, values } = useForm(
    isEmpty(data) ? defaultValue : data,
    () => null
  );

  useEffect(() => {
    data?.cover &&
      setFile(data.cover.map((it: any) => ({ ...it, url: it.fileUrl })));
  }, [data]);

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
        <CreateAwardsForm
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
        <CreateAwardsForm
          defaultValues={values}
          setField={setField}
          lang={Lang.EN}
        />
      ),
    },
  ];

  const submit = async () => {
    try {
      if (mod === "create") {
        console.log("create");
        await saveAwards(values, file);
      } else {
        console.log("update");
        await updateAwards(data.id, values);
      }
      navigate(`/awards`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Upload
        multiple={true}
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
