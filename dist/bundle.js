!function(){"use strict";function e(e){const n=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(let t=0;t<n.length;t++){const[r,o,i]=n[t];if(" "!==e[r]&&(e[r]===e[o]&&e[r]===e[i]))return{gameover:!0,winner:e[r]}}for(let n=0;n<e.length;n++)if(" "===e[n])return{gameover:!1,winner:"no winner"};return{gameover:!0,winner:"no winner"}}function n(t,r){let o=t,i=e(o);if(i.gameover)return"X"===i.winner?-1:"O"===i.winner?1:0;if(r){let e=100;for(let t=0;t<o.length;t++)" "===o[t]&&(o[t]="X",e=Math.min(e,n(o,!r)),o[t]=" ");return e}{let e=-100;for(let t=0;t<o.length;t++)" "===o[t]&&(o[t]="O",e=Math.max(e,n(o,!r)),o[t]=" ");return e}}let t=Array(9),r=!1,o={gameover:!1,winner:"no winner"};const i=document.querySelectorAll(".item");i.forEach(e=>{e.addEventListener("click",a)}),document.querySelector("#reset").addEventListener("click",function(){const e=document.querySelector("#select");u(),o={gameover:!1,winner:"no winner"},r="player"===e.value});const c=document.querySelector("#computer-turn");function u(){const e=document.querySelector("#notice");for(let e=0;e<9;e++)t[e]=" ",i[e].innerText=" ";e.innerText=""}function l(){const e=document.querySelector("#notice");"X"===o.winner?e.innerText="X is the winner!":"O"===o.winner?e.innerText="O is the winner!":e.innerText="It's a draw!"}function a(n){o.gameover||" "===n.target.textContent&&(r?(n.target.innerText="X",t[n.target.id]="X"):(n.target.innerText="O",t[n.target.id]="O"),(o=e(t)).gameover&&l(),r=!r)}document.querySelector("#select").addEventListener("change",e=>{r="player"===e.target.value}),c.addEventListener("click",()=>{const i=function(e,t){let r=e,o={score:-10,square:-1};if(!t)for(let e=0;e<r.length;e++){if(" "!==r[e])continue;r[e]="O";let i=n(r,!t);i>o.score&&(o.score=i,o.square=e),r[e]=" "}return o}(t,r);i.score<-1?alert("it is your turn"):(document.getElementById(i.square).innerText="O",t[i.square]="O",(o=e(t)).gameover&&l(),r=!r)}),u()}();
