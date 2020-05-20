import { Form, FormItem, Input, Checkbox, Button, Link, Row, Col, Steps, Step, Divider, Select, Option, RadioGroup, Radio, Upload, Menu, MenuItem, Submenu, MenuItemGroup, Dialog, Table, TableColumn, Breadcrumb, BreadcrumbItem, PageHeader, Pagination, Card } from "element-ui";

import { Loading, MessageBox, Message, Notification } from "element-ui";

export default {
  install(V) {
    V.use(Menu)
      .use(MenuItem)
      .use(Submenu)
      .use(MenuItemGroup)
      .use(Button)
      .use(Dialog)
      .use(Input)
      .use(Form)
      .use(FormItem)
      .use(Table)
      .use(TableColumn)
      .use(Breadcrumb)
      .use(BreadcrumbItem)
      .use(PageHeader)
      .use(Radio)
      .use(RadioGroup)
      .use(Select)
      .use(Option)
      .use(Pagination)
      .use(Card)
      .use(Link)
      .use(Row)
      .use(Col)
      .use(Divider);
    V.prototype.$loading = Loading.service;
    V.prototype.$msgbox = MessageBox;
    V.prototype.$alert = MessageBox.alert;
    V.prototype.$confirm = MessageBox.confirm;
    V.prototype.$prompt = MessageBox.prompt;
    V.prototype.$notify = Notification;
    V.prototype.$message = Message;
  }
};
