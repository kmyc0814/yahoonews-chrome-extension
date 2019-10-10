document.querySelectorAll(".msthdtxt").forEach(e => e.parentNode.removeChild(e)); //消す
document.querySelectorAll(".yjnSubAd").forEach(e => e.parentNode.removeChild(e)); //消す

if(('localStorage' in window) && (window.localStorage !== null)) {
    // ローカルストレージが使える
} else {
    // 使えない。。。
}
  let newscategory = document.querySelectorAll("#gnSec li");//（主要=0）国内=1　国際=2　経済=3　エンタメ=4　スポーツ=5　ＩＴ=6　科学=7　ライフ=8　地域=9
  let current = document.querySelector("#gnSec .current");
  newscategory = [].slice.call(newscategory);// HTMLCollectionから配列を作成
  console.log(newscategory);
  let index = newscategory.indexOf(current);// 要素の順番を取得
  console.log(index);


  let arr = localStorage.getItem('Key') ? JSON.parse(localStorage.getItem('Key')) : [];//arrに出力

  if(!arr[index]){//arr[index]に何も入っていなかったら
      arr[index]=1;
      }else{
        arr[index]=parseInt(arr[index])+1;//そうでなければ＋１
      }
  //他のページでlocalStorageが更新されたら反映する
  window.addEventListener("storage",function(e){
     if(e.key=="Key"){   //Keyが更新された
     disp(e.newValue);
     }
     },false);
  str = JSON.stringify(arr);//arrをjson形式にして
  localStorage.setItem('Key',str);//値＝strとして保存

//表示
 // let element1 = document.createElement("div");// <div></div>
 // element1.className = "newscount"
 // element1.textContent =
 //   "国内:"+arr[1]+"回"
 //  +"\n国際:"+arr[2]+"回"
 //  +"\n経済:"+arr[3]+"回"
 //  +"\nエンタメ:"+arr[4]+"回"
 //  +"\nスポーツ:"+arr[5]+"回"
 //  +"\nＩＴ:"+arr[6]+"回"
 //  +"\n科学:"+arr[7]+"回"
 //  +"\nライフ:"+arr[8]+"回"
 //  +"\n地域:"+arr[9]+"回";           // <button>Push Me!</button>
 // let target = document.querySelector("#msthd");
 // target.appendChild(element1);


let element2 = document.createElement("div");//<div></div>
element2.className = "chart";

if(document.querySelector("#yjnSub")){//#yjnSubの配列があれば
let parentElement = document.querySelector("#yjnSub");
let referenceElement = document.querySelector("#yjnFixableArea");
console.log("yjnSubのほう");

parentElement.insertBefore(element2, referenceElement);
}else{
let parentElement = document.querySelector("#sub");
let referenceElement = document.querySelector("#fixedArea");
console.log("subのほう");

parentElement.insertBefore(element2, referenceElement);
}

const url = chrome.runtime.getURL("index.html");
loadFileToElement(element2, url, afterLoad);
//バランスに応じて背景色を変える
var arrvalue = [arr[1] +arr[8] + arr[9], arr[2], arr[3], arr[4] + arr[5], arr[6] + arr[7]];
let max = Math.max.apply(null, arrvalue);
let min = Math.min.apply(null,arrvalue);
console.log(max);
console.log(min);
console.log(min / max);
// if((min / max =< 0.3)){//ここがうまくいかない
  // console.log("偏ってる！")

// }else if(min / max =< 0.5){
//   console.log("微妙です")
// }else if(min / max =< 0.7){
//   console.log("あんまり偏ってない")
// }

//
 function afterLoad(){
   // console.log("追加後に行う処理をここに書きます");
   var ctx = document.getElementById("myChart");
   var myChart = new Chart(ctx, {
     type: 'radar',
     data: {
       labels: ["国内・地域・ライフ", "国際", "経済", "エンタメ・スポーツ", "IT・科学"],
       datasets: [{
         label: '閲覧回数',
         backgroundColor: "rgba(54, 162, 235,0.4)",
         borderColor: "rgba(54, 162, 235,1)",
         pointBackgroundColor: "rgba(179,181,198,1)",  //結合点の背景色
         pointBorderColor: "#fff",//結合点の枠線の色
         pointHoverBackgroundColor: "#fff",//結合点の背景色（ホバーしたとき）
         pointHoverBorderColor: "rgba(179,181,198,1)",//結合点の枠線の色（ホバーしたとき）
         hitRadius: 5,//結合点より外でマウスホバーを認識する範囲（ピクセル単位）
         data: [arr[1] +arr[8] + arr[9], arr[2], arr[3], arr[4] + arr[5], arr[6] + arr[7]],

       }]
     },
     options: {
       tooltips: {
        enabled: true,
        callbacks: {
            label: function(tooltipItem, data) {
                console.log(data);
                return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }//optionsはdata、typeと同じ階層
              }
            },
        scale: {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 10,
            stepSize: 1
          }
        }

     }
   });
}
 function loadFileToElement(element, url, callback){
   let xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function(){
     if(xhr.readyState == 4 && xhr.status == 200){
       element.innerHTML = xhr.responseText;
       callback();
      }
    }
   xhr.open('GET', url, true);
   xhr.send();
   }


 // localStorage.clear();
