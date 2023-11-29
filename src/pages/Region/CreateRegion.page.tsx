import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { RegionLabel } from "../../typing/enums/region.enum";
import { Button, Select, Tabs } from "antd";
import { CreateRegionForm } from "./components/CreateRegionForm";
import { Lang } from "../../typing/enums";
import { defaultValue } from "./config";
import {
  createDistributot,
  updateDistributot,
} from "../../services/domains/distributors";
import { isEmpty } from "lodash";

export const CreateRegion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mod, data } = location.state;

  const { setField, onSubmit, values } = useForm(
    isEmpty(data) ? defaultValue : data,
    () => null
  );

  const submit = async () => {
    try {
      if (mod === "create") {
        await createDistributot(values);
        navigate(`/regions`);
      } else {
        await updateDistributot(data.id, values);
        navigate(`/regions`);
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
        <CreateRegionForm
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
        <CreateRegionForm
          defaultValues={values}
          setField={setField}
          lang={Lang.EN}
        />
      ),
    },
  ];

  return (
    <div>
      <Select
        defaultValue={defaultValue.key || "Виберіть регіон"}
        style={{ width: 220 }}
        onChange={(val) => setField("key", val)}
        options={RegionLabel}
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
