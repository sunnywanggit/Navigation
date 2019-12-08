const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
window.hashMap =  xObject || [{ url: "https://acfun.cn" }, { url: "https://baidu.com" }];

const simplifyUrl = (url) =>{
  return url.replace('https://','').replace('www.','')
  .replace(/\/.*/,'')
}
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node,index) => {
    const $li = $(`
    <li>
    <div class="site">

    <span class="delete">X</span>
    
   
    <span class="urlSimplify">${simplifyUrl(node.url).toUpperCase()[0]}</span>
   
    <p>${simplifyUrl( node.url)}</p>
  </div>
    </li>
    `
    ).insertBefore($lastLi);
    $li.on('click',()=>{
      window.open(node.url)
    })
    $li.on('click','.delete',(e)=>{
      hashMap.splice(index,1)
      e.stopPropagation()
      render()
    })
  });
};
render()

$("#addSite").on("click", () => {
  let url = window.prompt("请输入你要添加的网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({ url: url });
  render()
});

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    console.log(string)
    localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
  // const key = e.key
  const {key} = e
  for(let i=0;i<hashMap.length;i++){
    if(simplifyUrl(hashMap[i].url)[0] === key){
      window.open(hashMap[i].url)
    }
  }
})

