import { App } from 'vue'
import 'element-plus/dist/index.css'

import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs,
  ElAside,
  ElContainer,
  ElHeader,
  ElMain,
} from 'element-plus'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElAside,
  ElContainer,
  ElHeader,
  ElMain,
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name as string, component)
  }
}
