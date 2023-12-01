import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { defaultValue } from "./config";
import { PartnerForm } from "./components";
import { Lang } from "../../typing/enums";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Tabs, Upload, UploadFile, UploadProps } from "antd";
import { savePartner, updatePartner } from "../../services/domains/partner";

export const CreatePartner = () => {
  const [file, setFile] = useState<UploadFile[]>([]);
  const [removeFile, setRemoveFile] = useState<any[]>([]);
  const navigate = useNavigate();

  const location = useLocation();
  const { mod, data } = location.state;

  const { setField, onSubmit, values } = useForm(
    isEmpty(data) ? defaultValue : data,
    () => null
  );

  useEffect(() => {
    data?.cover &&
      setFile(
        data.cover.map((it: any) => ({ ...it, uid: it.id, url: it.fileUrl }))
      );
  }, [data]);

  const items = [
    {
      label: "Українська",
      key: "ua",
      children: (
        <PartnerForm
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
        <PartnerForm
          defaultValues={values}
          setField={setField}
          lang={Lang.EN}
        />
      ),
    },
  ];

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFile(newFileList);

  const submit = async () => {
    try {
      if (mod === "create") {
        await savePartner(values, file[0].originFileObj);
      } else {
        await updatePartner(data.id, values, removeFile, file[0]?.originFileObj);
      }
      navigate(`/partners`);
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
        fileList={file}
        listType="picture-card"
        onRemove={(e) => setRemoveFile((prev) => [...prev, e.uid])}
        onChange={handleChange}
      >
        {!isEmpty(file) ? null : uploadButton}
      </Upload>
      <Input
        name="link"
        placeholder="ссилка на партнера"
        defaultValue={values.link}
        onChange={(e) => setField("link", e.target.value)}
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
