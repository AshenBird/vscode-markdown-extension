

// @ts-ignore
import MindElixir, { E } from 'mind-elixir';

// @ts-ignore
const vscode = acquireVsCodeApi();

const changeContent = (content: string) => {
  vscode.postMessage({
    type: "change",
    content
  });
};

const map = new Map();

const _data = (document.getElementById("data") as HTMLElement).innerText.trim();

const _config = (document.getElementById("config") as HTMLElement)?.innerText.trim();

const data = _data ? JSON.parse(_data) : MindElixir.new('new topic');

const customConfig = _config ? JSON.parse(_config) : {};


map.set("data", data);



const defaultConfig = {
  el: '#app',
  direction: MindElixir.LEFT,
  // 创建新数据
  data: map.get("data"),
  // 也使用 getDataAll 得到的数据
  // data: {...},
  draggable: true, // 启用拖动 default true
  contextMenu: true, // 启用右键菜单 default true
  toolBar: true, // 启用工具栏 default true
  nodeMenu: true, // 启用节点菜单 default true
  keypress: true, // 启用快捷键 default true


  locale: 'zh_CN', // [zh_CN,zh_TW,en,ja,pt] waiting for PRs
  overflowHidden: false, // default false
  // primaryLinkStyle: 2, // [1,2] default 1
  // primaryNodeVerticalGap: 15, // default 25
  // primaryNodeHorizontalGap: 15, // default 65
  // contextMenuOption: {
  //   focus: true,
  //   link: true,
  //   extend: [
  //     {
  //       name: 'Node edit',
  //       onclick: () => {
  //         alert('extend menu');
  //       },
  //     },
  //   ],
  // },
  // allowUndo: false,
  // before: {
  //   insertSibling(el, obj) {
  //     return true;
  //   },
  //   async addChild(el, obj) {
  //     await sleep();
  //     return true;
  //   },
  // },
};




const config = Object.assign({}, defaultConfig, customConfig);

const mind = new MindElixir(config);
mind.init();

// 处理变更
// @ts-ignore
mind.bus.addListener('operation', operation => {
  console.log('operation', operation);
  // return {
  //   name: action name,
  //   obj: target object
  // }

  // name: [insertSibling|addChild|removeNode|beginEdit|finishEdit]
  // obj: target

  // name: moveNode
  // obj: {from:target1,to:target2}

  const data = JSON.stringify(mind.getAllData()) as string;
  changeContent(data);
});

// // @ts-ignore
// mind.bus.addListener('selectNode', node => {
//   console.log("selectNode", node);
// });

const change = (n: string) => {
  if (n.trim() === mind.getAllDataString().trim()) { return; }
  map.set("data", n);//MindElixir.new('')
};

window.addEventListener('message', event => {
  const { type, content } = event.data; // The JSON data our extension sent
  if (type === "change") {
    change(content);
  }
});

