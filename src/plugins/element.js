import Vue from 'vue'
import {
 Button ,
 Table,
 TableColumn,
 Header,
 Container,
 Aside,
 Main,
 Col,
 Menu,
 Submenu,
 MenuItem,
 Card,
 Row,
 Dialog,
 Form,
 FormItem,
 Input,
 Message,
 MessageBox,
 Radio,
 Pagination,
 Select,
 Option,
 Upload
} from 'element-ui'

Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Header)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)



