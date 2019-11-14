const categoryLabels = ["国内・地域・ライフ", "国際", "経済", "エンタメ・スポーツ", "IT・科学"];

document.querySelectorAll(".msthdtxt").forEach(e => e.parentNode.removeChild(e)); //消す
document.querySelectorAll(".yjnSubAd").forEach(e => e.parentNode.removeChild(e)); //消す
// let oscategory = document.querySelectorAll(".yjnHeader_sub_cat a") || document.querySelectorAll("#gnSec li a");←できない
let oscategory
let newscategory;//（主要=0）国内=1　国際=2　経済=3　エンタメ=4　スポーツ=5　ＩＴ=6　科学=7　ライフ=8　地域=9
let current;

if(document.querySelectorAll(".yjnHeader_sub_cat a").length > 0){
  oscategory = document.querySelectorAll(".yjnHeader_sub_cat a")
  newscategory = document.querySelectorAll(".yjnHeader_sub_cat li");
  current = document.querySelector(".yjnHeader_sub_cat .current");
  console.log(".yjnHeader_sub_cat .current");
}else{
  oscategory = document.querySelectorAll("#gnSec li a")
  newscategory = document.querySelectorAll("#gnSec li");
  current = document.querySelector("#gnSec .current");
  console.log("#gnSec .current");
  }
  newscategory = [].slice.call(newscategory);// HTMLCollectionから配列を作成
  let index = newscategory.indexOf(current);// 要素の順番を取得
  console.log(index);

let bgcolor1 = '#4d4dff';//おすすめボタンの色：青
let color1 = '#ffffff';//白
let bgcolor2 = '#e60000';//とても偏ってるときの色：赤
let color2 = '#f2f2f2';//白に近いグレー
let bgcolor3 = '#ffb3b3';//偏ってる時の色：薄赤
let color3 = '#ffe6ff';//薄赤

chrome.storage.local.get(['balance'], function (value) {//グラフ用の記録

  let balance = value.balance || Array(5).fill(0);

  if(index == 1 ||index == 8 || index == 9) balance[0] += 1;
  if(index == 2) balance[1] += 1;
  if(index == 3) balance[2] += 1;
  if(index == 4 ||index == 5) balance[3] += 1;
  if(index == 6 ||index == 7) balance[4] += 1;


chrome.storage.local.set({ 'balance': balance });

  //表示

   let element1 = document.createElement("div");// <div></div>
   // element1.className = "newscount"
   element1.textContent = balance.map((count, i) => categoryLabels[i] + ":" + count + "回").join("\n");
   let target = document.querySelector("#msthd");
   target.appendChild(element1);
   console.log(element1.textContent);


      //背景色の変化
      //var balance = [data1, data2, data3, data4, data5];
      let max = Math.max.apply(null, balance);
      let min = Math.min.apply(null, balance);

      let minindex = balance.indexOf(min);// 閲覧回数が最小のカテゴリー:0~4
      // let maxindex = balance.indexOf(max);

      //おすすめボタン
      let element3 =document.createElement("button");
      element3.id = "osbutton";
      element3.style.backgroundColor = bgcolor1;
      element3.style.color = color1;
      target.appendChild(element3);

        if(minindex == 0){//国内・地域・ライフがminのとき
          oscategory[1].style.backgroundColor = bgcolor1;
          oscategory[1].style.color = color1;
          element3.textContent = "おすすめ→国内";
          document.getElementById("osbutton").onclick = function() {
        window.location.href = 'https://news.yahoo.co.jp/categories/domestic';
          // window.location.href = 'パス名'; // 通常の遷移
          // window.open('パス名', '_blank'); // 新しいタブを開き、ページを表示
        }};
        if(minindex == 1){//国際がminのとき
          oscategory[1].style.backgroundColor = bgcolor1;
          oscategory[1].style.color = color1;
          element3.textContent = "おすすめ→国際";
          document.getElementById("osbutton").onclick = function() {
          window.location.href = 'https://news.yahoo.co.jp/categories/world';
        }};
        if(minindex == 2){//経済がminのとき
          oscategory[2].style.backgroundColor = bgcolor1;
          oscategory[2].style.color = color1;
          element3.textContent = "おすすめ→経済";
          document.getElementById("osbutton").onclick = function() {
          window.location.href = 'https://news.yahoo.co.jp/categories/business';
        }};
        if(minindex == 3){//スポーツ・エンタメがminのとき
          oscategory[3].style.backgroundColor = bgcolor1;
          oscategory[3].style.color = color1;
          element3.textContent = "おすすめ→エンタメ";
          document.getElementById("osbutton").onclick = function() {
          window.location.href = 'https://news.yahoo.co.jp/categories/entertainment';
        }};
        if(minindex == 4){//IT・科学がminのとき
          oscategory[4].style.backgroundColor = bgcolor1;
          oscategory[4].style.color = color1;
          element3.textContent = "おすすめ→IT";
          document.getElementById("osbutton").onclick = function() {
          window.location.href = 'https://news.yahoo.co.jp/categories/it';
        }};



      console.log(minindex);
      console.log(max);
      console.log(min);
      console.log(min / max);

var obj = document.getElementById("wrapper");
var obj2 = document.getElementById("contents");
var obj3 = document.querySelector('body');
      if((min / max <= 0.3)){
        console.log("とても偏ってる！")
        obj.style.color = color2;            //文字色を白にする
        obj.style.backgroundColor = bgcolor2;  //背景色を赤にする
        obj2.style.color = color2;            //文字色を白にする
        obj2.style.backgroundColor = bgcolor2;  //背景色を赤にする
        obj3.style.webkitTransform = "rotate(1.5deg)";
      }else if(min / max <= 0.4){
        console.log("偏ってる！")
        obj.style.color = color3;            //文字色を白にする
        obj.style.backgroundColor = bgcolor3;  //背景色をうすい赤にする
        obj2.style.color = color3;            //文字色を白にする
        obj2.style.backgroundColor = bgcolor3;
        obj3.style.webkitTransform = "rotate(1deg)";
      }else if(min / max <= 0.5){
        console.log("微妙です")
      }else if(min / max <= 0.7){
        console.log("あんまり偏ってない")
      }

});//グラフ用の記録ここまで
//ログをとる
//現在のurlを取得
let url = location.href;
let categorytext = newscategory[index].textContent;
if(document.querySelectorAll("#gnSec li").length > 0){
chrome.storage.local.get(['kiroku'], function (val) {
let saishin = { timestamp: Date.now(), category: categorytext, url: url };
let kiroku = val.kiroku || [];
let urlog = kiroku.map(function(o){ return o.url });//urlのみの配列
//console.log(saishin.url);
let found = urlog.find(function(elem) {
  return elem === saishin.url;
});
    if(!found){
    kiroku.push(saishin);
    chrome.storage.local.set({'kiroku': kiroku}, function () {
      console.log("新しく保存");
    });
  }else{
    console.log("前にも見た");
  }
console.log(kiroku);
  });
};
//ログをとるここまで






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
const indexurl = chrome.runtime.getURL("index.html");
loadFileToElement(element2, indexurl, afterLoad);



//
 function afterLoad(){
   // console.log("追加後に行う処理をここに書きます");
   chrome.storage.local.get(['balance'], function (result) {
     let balance = result.balance || Array(5).fill(0);

   var ctx = document.getElementById("myChart");
   ctx.style.color = 'black';
   ctx.style.backgroundColor = 'white';
   var myChart = new Chart(ctx, {
     type: 'radar',
     data: {
       labels: categoryLabels,
       datasets: [{
         label: '閲覧回数',
         backgroundColor: "rgba(54, 162, 235,0.4)",
         borderColor: "rgba(54, 162, 235,1)",
         pointBackgroundColor: "rgba(179,181,198,1)",  //結合点の背景色
         pointBorderColor: "#fff",//結合点の枠線の色
         pointHoverBackgroundColor: "#fff",//結合点の背景色（ホバーしたとき）
         pointHoverBorderColor: "rgba(179,181,198,1)",//結合点の枠線の色（ホバーしたとき）
         hitRadius: 5,//結合点より外でマウスホバーを認識する範囲（ピクセル単位）
         data: balance,

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
            // suggestedMax: 10,
            stepSize: 1
          }
        }

     }
   });
 });
}
 function loadFileToElement(element, indexurl, callback){
   let xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function(){
     if(xhr.readyState == 4 && xhr.status == 200){
       element.innerHTML = xhr.responseText;
       callback();
      }
    }
   xhr.open('GET', indexurl, true);
   xhr.send();
   }
