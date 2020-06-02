import { Form, FormItem, Input, Checkbox, Button, Link, Row, Col, Steps, Step, Divider, Select, Option, RadioGroup, Radio, Upload, Breadcrumb, BreadcrumbItem, Card, Table, TableColumn, Image, Tabs, TabPane } from "element-ui";

import { Loading, MessageBox, Message, Notification } from "element-ui";

export default {
  install(V) {
    V.use(Form)
      .use(FormItem)
      .use(Input)
      .use(Checkbox)
      .use(Button)
      .use(Link)
      .use(Row)
      .use(Col)
      .use(Steps)
      .use(Step)
      .use(Divider)
      .use(Select)
      .use(Option)
      .use(RadioGroup)
      .use(Radio)
      .use(Upload)
      .use(Breadcrumb)
      .use(BreadcrumbItem)
      .use(Card)
      .use(Table)
      .use(TableColumn)
      .use(Image)
      .use(Tabs)
      .use(TabPane);
    V.prototype.$loading = Loading.service;
    V.prototype.$msgbox = MessageBox;
    V.prototype.$alert = MessageBox.alert;
    V.prototype.$confirm = MessageBox.confirm;
    V.prototype.$prompt = MessageBox.prompt;
    V.prototype.$notify = Notification;
    V.prototype.$message = Message;
  }
};
