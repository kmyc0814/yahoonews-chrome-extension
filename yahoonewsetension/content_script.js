document.querySelectorAll(".msthdtxt").forEach(e => e.parentNode.removeChild(e)); //消す
document.querySelectorAll(".yjnSubAd").forEach(e => e.parentNode.removeChild(e)); //消す

  let newscategory = document.querySelectorAll("#gnSec li");//（主要=0）国内=1　国際=2　経済=3　エンタメ=4　スポーツ=5　ＩＴ=6　科学=7　ライフ=8　地域=9
  let current = document.querySelector("#gnSec .current");
  newscategory = [].slice.call(newscategory);// HTMLCollectionから配列を作成
  let index = newscategory.indexOf(current);// 要素の順番を取得
  console.log(index);

var data1;
var data2;
var data3;
var data4;
var data5;

chrome.storage.local.get(["key1", "key2", "key3","key4","key5"], function (value) {
data1 = value.key1;
data2 = value.key2;
data3 = value.key3;
data4 = value.key4;
data5 = value.key5;

//更新する
if(!value.key1){
  value.key1 = 0;
  console.log(value.key1);
}

if(!value.key2){
  value.key2 = 0;
}
if(!value.key3){
  value.key3 = 0;
}
if(!value.key4){
  value.key4 = 0;
}
if(!value.key5){
  value.key5 = 0;
}

if(index == 1 ||index == 8 || index == 9){
  chrome.storage.local.get("key1", function (value) {
    // data1 = value.key1;
    if(!value.key1){
      data1 = 1;
      console.log(data1);
    }else{
      data1 = data1 + 1;
    }
    chrome.storage.local.set({'key1': data1}, function () {
    });

});}
if(index == 2){
  chrome.storage.local.get("key2", function (value) {
    // data2 = value.key2;
      if(!value.key2){
      data2 = 1;
    }else{
      data2 = data2 + 1;
    }
chrome.storage.local.set({'key2': data2}, function () {
  console.log(data2);
});
});}
if(index == 3){
  chrome.storage.local.get("key3", function (value) {
    data3 = value.key3;
      if(!value.key3){
      data3 = 1;
    }else{
      data3 = data3 + 1;
    }
    chrome.storage.local.set({'key3': data3}, function () {
});
});}
if(index == 4 ||index == 5){
    chrome.storage.local.get("key4", function (value) {
      data4 = value.key4;
        if(!value.key4){
        data4 = 1;
      }else{
        data4 = data4 + 1;
      }
  chrome.storage.local.set({'key4': data4}, function () {
  });
});}
if(index == 6 ||index == 7){
      chrome.storage.local.get("key5", function (value) {
        data5 = value.key5;
          if(!value.key5){
          data5 = 1;
        }else{
          data5 = data5 + 1;
        }
    chrome.storage.local.set({'key5': data5}, function () {
    });
      });}

      //表示

       let element1 = document.createElement("div");// <div></div>
       // element1.className = "newscount"
       element1.textContent =
         "国内・地域・ライフ:"+value.key1+"回"
        +"\n国際:"+value.key2+"回"
        +"\n経済:"+value.key3+"回"
        +"\nエンタメ・スポーツ:"+value.key4+"回"
        +"\nＩＴ・科学:"+value.key5+"回";
        let target = document.querySelector("#msthd");
        target.appendChild(element1);


      //背景色の変化
      var balance = [data1, data2, data3, data4, data5];
      let max = Math.max.apply(null, balance);
      let min = Math.min.apply(null, balance);

      let minindex = balance.indexOf(min);// 閲覧回数が最小のカテゴリー:0~4
      // let maxindex = balance.indexOf(max);

      //おすすめボタン
      let element3 =document.createElement("button");
      element3.id = "osbutton";
      element3.style.backgroundColor = "blue";
      element3.style.color = "white";
      target.appendChild(element3);

        if(minindex == 0){//国内・地域・ライフがminのとき
          element3.textContent = "おすすめ→国内";
          document.getElementById("osbutton").onclick = function() {
        window.location.href = 'https://news.yahoo.co.jp/categories/domestic';
          // window.location.href = 'パス名'; // 通常の遷移
          // window.open('パス名', '_blank'); // 新しいタブを開き、ページを表示
        }};
        if(minindex == 1){//国際がminのとき
          element3.textContent = "おすすめ→国際";
          document.getElementById("osbutton").onclick = function() {
          window.location.href = 'https://news.yahoo.co.jp/categories/world';
        }};
        if(minindex == 2){//経済がminのとき
          element3.textContent = "おすすめ→経済";
          document.getElementById("osbutton").onclick = function() {
          window.location.href = 'https://news.yahoo.co.jp/categories/business';
        }};
        if(minindex == 3){//スポーツ・エンタメがminのとき
          element3.textContent = "おすすめ→スポーツ";
          document.getElementById("osbutton").onclick = function() {
          window.location.href = 'https://news.yahoo.co.jp/categories/entertainment';
        }};
        if(minindex == 4){//IT・科学がminのとき
          element3.textContent = "おすすめ→IT";
          document.getElementById("osbutton").onclick = function() {
          window.location.href = 'https://news.yahoo.co.jp/categories/it';
        }};



      console.log(minindex);
      console.log(max);
      console.log(min);
      console.log(min / max);


      if((min / max <= 0.3)){
        console.log("偏ってる！")
        // document.body.style.backgroundColor = "#ccffcc";
        var obj = document.getElementById("wrapper");
        obj.style.color = '#ffffff';            //文字色を白にする
        obj.style.backgroundColor = '#ff0000';  //背景色を赤にする
        var obj2 = document.getElementById("contents");
        obj2.style.color = '#ffffff';            //文字色を白にする
        obj2.style.backgroundColor = '#ff0000';  //背景色を赤にする


        //
      }else if(min / max <= 0.5){
        console.log("微妙です")
      }else if(min / max <= 0.7){
        console.log("あんまり偏ってない")
      }

});

// chrome.storage.local.get(["key1", "key2", "key3","key4","key5"], function (value) {
//   data1 = value.key1;
//   data2 = value.key2;
//   data3 = value.key3;
//   data4 = value.key4;
//   data5 = value.key5;


　
// });




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



//
 function afterLoad(){
   // console.log("追加後に行う処理をここに書きます");
   chrome.storage.local.get(["key1", "key2", "key3","key4","key5"], function (value) {
   data1 = value.key1;
   data2 = value.key2;
   data3 = value.key3;
   data4 = value.key4;
   data5 = value.key5;

   var ctx = document.getElementById("myChart");
   ctx.style.color = 'black';
   ctx.style.backgroundColor = 'white';
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
         data: [data1,data2,data3,data4,data5],

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
