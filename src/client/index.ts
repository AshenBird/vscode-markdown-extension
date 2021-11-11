

// @ts-ignore
import MindElixir, { E } from 'mind-elixir';
console.error(MindElixir);

(document.getElementById("app") as HTMLElement).innerHTML = "test";

const mind = new MindElixir({
  el: '#app',
  direction: MindElixir.LEFT,
  // 创建新数据
  data: MindElixir.new('new topic'), 
  // 也使用 getDataAll 得到的数据
  // data: {...},
  draggable: true, // 启用拖动 default true
  contextMenu: true, // 启用右键菜单 default true
  toolBar: true, // 启用工具栏 default true
  nodeMenu: true, // 启用节点菜单 default true
  keypress: true, // 启用快捷键 default true
});
mind.init();
