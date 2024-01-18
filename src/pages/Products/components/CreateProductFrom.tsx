/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Lang } from "../../../typing/enums";
import { Input } from "antd";
import { find } from "lodash";
import { Editor } from "@tinymce/tinymce-react";

interface IProps {
  defaultValues: any;
  setField: any;
  lang: Lang;
}

export const CreateProductFrom: FC<IProps> = ({
  defaultValues,
  setField,
  lang,
}) => {
  const onChange = (val: string, key: string) => {
    setField(
      "translations",
      defaultValues.translations.map((item: any) =>
        item.lang === lang ? { ...item, [key]: val } : item
      )
    );
  };

  return (
    <div>
      <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>Назва:</p>
      <Input
        name="title"
        placeholder="Заголовок"
        defaultValue={
          find(defaultValues.translations, (el) => el.lang === lang)?.name
        }
        onChange={(e) => onChange(e.target.value, "name")}
      />
      <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>Опис:</p>
      <Editor
        apiKey="0q4u8e72jrvy87zmkquxbnf2s4zk5w6kb13l1fpezqcoq2ur"
        initialValue={
          find(defaultValues.translations, (el) => el.lang === lang)
            ?.description
        }
        init={{
          branding: false,
          height: 330,
          menubar: false,
          plugins:
            "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
          toolbar:
            "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
          image_advtab: true,
        }}
        onChange={(e) => onChange(e.target.getContent(), "description")}
      />
      <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>
        Додаткова Інформація:
      </p>
      <Editor
        apiKey="0q4u8e72jrvy87zmkquxbnf2s4zk5w6kb13l1fpezqcoq2ur"
        initialValue={
          find(defaultValues.translations, (el) => el.lang === lang)?.info
        }
        init={{
          branding: false,
          height: 330,
          menubar: false,
          plugins:
            "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
          toolbar:
            "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
          image_advtab: true,
        }}
        onChange={(e) => onChange(e.target.getContent(), "info")}
      />
      <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>
        Атрибути товару:
      </p>
      <Editor
        apiKey="0q4u8e72jrvy87zmkquxbnf2s4zk5w6kb13l1fpezqcoq2ur"
        initialValue={
          find(defaultValues.translations, (el) => el.lang === lang)
            ?.previewHtml
        }
        init={{
          branding: false,
          height: 330,
          menubar: false,
          plugins:
            "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
          toolbar:
            "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
          image_advtab: true,
        }}
        onChange={(e) => onChange(e.target.getContent(), "previewHtml")}
      />
    </div>
  );
};
