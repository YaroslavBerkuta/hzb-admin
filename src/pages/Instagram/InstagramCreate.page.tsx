import { Button, Input, Upload, UploadFile, UploadProps, message } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { PlusOutlined } from "@ant-design/icons";
import {
  createInstagram,
  updateInstagram,
} from "../../services/domains/instagram";

export const InstagramCreate = () => {
  const [file, setFile] = useState<UploadFile[]>([]);
  const [removeGallery, setRemoveGallery] = useState<any[]>([]);
  const location = useLocation();
  const { mod, data } = location.state;
  const navigate = useNavigate();

  const { setField, onSubmit, values } = useForm(
    isEmpty(data) ? { link: "" } : data,
    () => null
  );

  useEffect(() => {
    data?.cover &&
      setFile(
        data.cover.map((it: any) => ({ ...it, uid: it.id, url: it.fileUrl }))
      );
  }, [data]);

  const handleChangeGallery: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFile(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузити</div>
    </div>
  );

  const submit = async () => {
    try {
      if (mod === "create") {
        await createInstagram(values, file[0]);
      } else {
        await updateInstagram(data.id, values, file[0], removeGallery);
      }
      message.success("Пост створено");
      setTimeout(() => navigate(`/instagram`), 2000);
    } catch (error) {
      console.log(error);
      message.error("Щось пішло не так");
    }
  };

  return (
    <div>
      <div>
        <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>Фото:</p>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          onRemove={(e) => setRemoveGallery((prev) => [...prev, e.uid])}
          onChange={handleChangeGallery}
          fileList={file}
        >
          {file.length == 0 && uploadButton}
        </Upload>
      </div>
      <div>
        <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>Ссилка:</p>
        <Input
          name="link"
          onChange={(e) => setField("link", e.target.value)}
          defaultValue={values?.link}
          placeholder="Ссилка на пост"
        />
      </div>
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
