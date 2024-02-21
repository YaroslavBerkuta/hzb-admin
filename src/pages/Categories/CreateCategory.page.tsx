/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { SelectCategory } from "../Products/components";
import { find, isEmpty } from "lodash";
import {
  Button,
  Input,
  Tabs,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Lang } from "../../typing/enums";
import {
  createCategory,
  updateCategory,
} from "../../services/domains/category";

const defaultValue = {
  key: null,
  translations: [
    {
      lang: Lang.EN,
      name: "",
    },
    {
      lang: Lang.UA,
      name: "",
    },
  ],
  parentId: null,
};

export const CreateCategory = () => {
  const [cover, setCover] = useState<UploadFile[]>([]);
  const [price, setPrice] = useState<UploadFile[]>([]);
  const [catalog, setCatalog] = useState<UploadFile[]>([]);
  const [removeFiles, setRemoveFiles] = useState<any[]>([]);
  const location = useLocation();
  const { mod, data } = location.state;
  const navigate = useNavigate();
  const { setField, onSubmit, values } = useForm(
    isEmpty(data) ? defaultValue : data,
    () => null
  );

  useEffect(() => {
    data?.cover &&
      setCover(
        data.cover.map((it: any) => ({
          ...it,
          uid: it.id,
          url: it.fileUrl,
          name: it.fileName,
        }))
      );

    data?.price &&
      setPrice(
        data.price.map((it: any) => ({
          ...it,
          uid: it.id,
          url: it.fileUrl,
          name: it.fileName,
        }))
      );
    data?.catalog &&
      setCatalog(
        data.catalog.map((it: any) => ({
          ...it,
          uid: it.id,
          url: it.fileUrl,
          name: it.fileName,
        }))
      );
  }, [data.catalog, data.cover, data.price]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузити</div>
    </div>
  );

  const handleChangeCover: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setCover(newFileList);

  const handleChangePrice: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setPrice(newFileList);

  const handleChangeCatalog: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setCatalog(newFileList);

  const submit = async () => {
    try {
      if (mod === "create") {
        await createCategory(
          values,
          price[0]?.originFileObj,
          catalog[0]?.originFileObj,
          cover[0]?.originFileObj
        );
        navigate("category");
      } else {
        await updateCategory(
          data?.id,
          values,
          price[0]?.originFileObj,
          catalog[0]?.originFileObj,
          cover[0]?.originFileObj,
          removeFiles
        );
        navigate("category");
      }
    } catch (error) {
      console.log(error);
      message.error("Щось пішло не так");
    }
  };

  const onChangeInput = (val: string, key: string, lang: Lang) => {
    setField(
      "translations",
      values?.translations?.map((item: any) =>
        item.lang === lang ? { ...item, [key]: val } : item
      )
    );
  };

  const items = [
    {
      label: "Українська",
      key: "ua",
      children: (
        <div>
          <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>Назва:</p>
          <Input
            name="title"
            placeholder="Заголовок"
            defaultValue={
              find(values.translations, (el) => el.lang === Lang.UA)?.name
            }
            onChange={(e) => onChangeInput(e.target.value, "name", Lang.UA)}
          />
        </div>
      ),
    },
    {
      label: "Англійська",
      key: "en",
      children: (
        <div>
          <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>Назва:</p>
          <Input
            name="title"
            placeholder="Заголовок"
            defaultValue={
              find(values.translations, (el) => el.lang === Lang.EN)?.name
            }
            onChange={(e) => onChangeInput(e.target.value, "name", Lang.EN)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>
          Унікальний ключ категорії:
        </p>
        <Input
          name="key"
          placeholder="Ключ категорії"
          value={values.key}
          onChange={(e) => setField("key", e.target.value)}
          style={{
            width: 300,
          }}
        />
      </div>
      <div>
        <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>
          Батьківська категорія:
        </p>
        <SelectCategory
          defaultValue={"Виберіть батьківську категорію"}
          setValue={(val: string) => setField("parentId", Number(val))}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 120,
          marginTop: 60,
        }}
      >
        <div style={{ width: "16%" }}>
          <p style={{ fontWeight: 600, fontSize: 20, marginBottom: 20 }}>
            Задній фон категорії:
          </p>
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            onRemove={(e) => setRemoveFiles((prev) => [...prev, e.uid])}
            onChange={handleChangeCover}
            fileList={cover}
          >
            {cover.length == 0 && uploadButton}
          </Upload>
        </div>
        <div style={{ width: "16%" }}>
          <p style={{ fontWeight: 600, fontSize: 20, marginBottom: 20 }}>
            Прайс цін:
          </p>
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            onRemove={(e) => setRemoveFiles((prev) => [...prev, e.uid])}
            onChange={handleChangePrice}
            fileList={price}
          >
            {price.length == 0 && uploadButton}
          </Upload>
        </div>
        <div style={{ width: "16%" }}>
          <p style={{ fontWeight: 600, fontSize: 20, marginBottom: 20 }}>
            Каталог:
          </p>
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            onRemove={(e) => setRemoveFiles((prev) => [...prev, e.uid])}
            onChange={handleChangeCatalog}
            fileList={catalog}
          >
            {catalog.length == 0 && uploadButton}
          </Upload>
        </div>
      </div>
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
