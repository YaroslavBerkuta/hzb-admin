import { Button, Form, Input } from "antd";
import styles from "./index.module.scss";
import { authService } from "../../services/domains/auth/index";
import { ILoginPayload } from "../../api/auth/interface";

type FieldType = {
  email?: string;
  password?: string;
};

export const Auth = () => {
  const submit = async (values: ILoginPayload) => {
    await authService.login(values);
  };
  return (
    <div className={styles.wrapper}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={submit}
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          style={{ marginBottom: 30 }}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
