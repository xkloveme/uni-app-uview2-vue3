var t=Object.defineProperty,e=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,o=(e,r,n)=>r in e?t(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n,a=(t,e,r)=>(o(t,"symbol"!=typeof e?e+"":e,r),r);import{u as i,i as s,a as u,d as l,c,w as f,b as d,s as h,o as p,e as g,f as m,g as y,h as v,j as b,k as _,t as $,r as w,l as S,m as M,p as O,n as x,q as D,v as A,x as j,$ as T,y as Y,z as P,A as C,B as L,C as k,D as E,E as F,F as H,G as B,H as I,I as N,J as W,K as z,L as U,M as q}from"./vendor.9f2ae564.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const r of t)if("childList"===r.type)for(const t of r.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),"use-credentials"===t.crossorigin?e.credentials="include":"anonymous"===t.crossorigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const J={},V=function(t,e){return e&&0!==e.length?Promise.all(e.map((t=>{if((t=`./${t}`)in J)return;J[t]=!0;const e=t.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${r}`))return;const n=document.createElement("link");return n.rel=e?"stylesheet":"modulepreload",e||(n.as="script",n.crossOrigin=""),n.href=t,document.head.appendChild(n),e?new Promise(((e,r)=>{n.addEventListener("load",e),n.addEventListener("error",(()=>r(new Error(`Unable to preload CSS for ${t}`))))})):void 0}))).then((()=>t())):t()},Z={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:6e4,suspensible:!0};window.uni={},window.wx={},window.rpx2px=i;const R={},K=Object.assign;window.____A8AFA30____=!0,delete window.____A8AFA30____,window.__uniConfig=K({globalStyle:{backgroundColor:"#F8F8F8",navigationBar:{backgroundColor:"#F8F8F8",titleColor:"#000000"}},easycom:{autoscan:!0,custom:{"^sys$":"@/sys.vue","^uni-(.*)":"@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"}},compilerVersion:"3.4.3"},{async:Z,debug:!1,networkTimeout:{request:6e4,connectSocket:6e4,uploadFile:6e4,downloadFile:6e4},sdkConfigs:{},qqMapKey:void 0,googleMapKey:void 0,nvue:{"flex-direction":"column"},locale:"",fallbackLocale:"",locales:Object.keys(R).reduce(((t,e)=>{const r=e.replace(/\.\/locale\/(uni-app.)?(.*).json/,"$2");return K(t[r]||(t[r]={}),R[e].default),t}),{}),router:{mode:"hash",base:"/",assets:"assets"}}),window.__uniLayout=window.__uniLayout||{};const G={loadingComponent:s,errorComponent:u,delay:Z.delay,timeout:Z.timeout,suspensible:Z.suspensible},Q=()=>V((()=>import("./pages-index-index.ce441d82.js")),["assets/pages-index-index.ce441d82.js","assets/index.39ed2cd1.css","assets/vendor.9f2ae564.js","assets/sys.8aab21da.js","assets/sys.9561513c.css"]).then((t=>h(t.default||t))),X=l(K({loader:Q},G)),tt=()=>V((()=>import("./pages-index-hi.3c174d64.js")),["assets/pages-index-hi.3c174d64.js","assets/hi.4d029d1a.css","assets/vendor.9f2ae564.js","assets/sys.8aab21da.js","assets/sys.9561513c.css"]).then((t=>h(t.default||t))),et=l(K({loader:tt},G)),rt=()=>V((()=>import("./pages-test-form.6691165c.js")),["assets/pages-test-form.6691165c.js","assets/form.31c4d168.css","assets/vendor.9f2ae564.js","assets/sys.8aab21da.js","assets/sys.9561513c.css"]).then((t=>h(t.default||t))),nt=l(K({loader:rt},G)),ot=()=>V((()=>import("./pages-test-index.e3ab9fe0.js")),["assets/pages-test-index.e3ab9fe0.js","assets/index.8f730c14.css","assets/vendor.9f2ae564.js","assets/sys.8aab21da.js","assets/sys.9561513c.css"]).then((t=>h(t.default||t))),at=l(K({loader:ot},G));function it(t){return p(),c(d,null,{page:f((()=>[g(t,{ref:"page"},null,512)])),_:1})}window.__uniRoutes=[{path:"/",alias:"/pages/index/index",component:{setup:()=>()=>it(X)},loader:Q,meta:{isQuit:!0,isEntry:!0,navigationBar:{titleText:"主页"}}},{path:"/pages/index/hi",component:{setup:()=>()=>it(et)},loader:tt,meta:{navigationBar:{titleText:"hi页面"}}},{path:"/pages/test/form",component:{setup:()=>()=>it(nt)},loader:rt,meta:{navigationBar:{titleText:"表单页面"}}},{path:"/pages/test/index",component:{setup:()=>()=>it(at)},loader:ot,meta:{navigationBar:{titleText:"测试页面"}}}].map((t=>(t.meta.route=(t.alias||t.path).substr(1),t)));const st=y({setup:t=>(v((()=>{console.log("App Launch")})),b((()=>{console.log("App Show")})),_((()=>{console.log("App Hide")})),()=>{})});m(st),Promise.prototype.wait=function(t){return this.then((e=>new Promise((r=>setTimeout((()=>r(e)),t)))),(e=>new Promise(((r,n)=>setTimeout((()=>n(e)),t)))))},Promise.prototype.go=function(){return this.then((t=>new Promise((e=>e([t,null])))),(t=>new Promise((e=>e([null,t])))))},Promise.wait=t=>new Promise((e=>setTimeout(e,t)));var ut=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));let lt=({title:t,args:e})=>console.log(` [ ${t} ] `,...e);lt=({type:t,bg:e,title:r,args:n})=>console[["log","info","warn","error"].includes(t)?t:"log"](`%c ${r} `,`color:#fff;background:${e};padding:5px;margin:5px 0;font-family:Monaco,PingFang SC`,...n);const ct={log:"linear-gradient(45deg, #4facfe 0%, #00f2fe 150%);",info:"linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);",warn:"linear-gradient(to right, #e6b980 0%, #eacda3 100%);",error:"linear-gradient(45deg, #ff0844 0%, #ffb199 100%);",debug:"linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",success:"linear-gradient(45deg, #43e97b 0%, #38f9d7 150%);"},ft=(dt=Object.keys(ct).map((t=>{let[e]=ct[t].split("|");return[t,(r,...n)=>lt({type:t,bg:e,title:r,args:n})]})),[...dt].reduce(((t,[e,r])=>(t[e]=r,t)),{}));var dt;var ht=Object.freeze(Object.defineProperty({__proto__:null,loggers:ft,default:function(){Object.assign(De,ft)}},Symbol.toStringTag,{value:"Module"})),pt="object"==typeof global&&global&&global.Object===Object&&global,gt="object"==typeof self&&self&&self.Object===Object&&self,mt=pt||gt||global||Function("return this")(),yt=mt.Symbol,vt=Object.prototype,bt=vt.hasOwnProperty,_t=vt.toString,$t=yt?yt.toStringTag:void 0;var wt=Object.prototype.toString;var St=yt?yt.toStringTag:void 0;function Mt(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":St&&St in Object(t)?function(t){var e=bt.call(t,$t),r=t[$t];try{t[$t]=void 0;var n=!0}catch(a){}var o=_t.call(t);return n&&(e?t[$t]=r:delete t[$t]),o}(t):function(t){return wt.call(t)}(t)}var Ot=/\s/;var xt=/^\s+/;function Dt(t){return t?t.slice(0,function(t){for(var e=t.length;e--&&Ot.test(t.charAt(e)););return e}(t)+1).replace(xt,""):t}function At(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}var jt=/^[-+]0x[0-9a-f]+$/i,Tt=/^0b[01]+$/i,Yt=/^0o[0-7]+$/i,Pt=parseInt;function Ct(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return null!=t&&"object"==typeof t}(t)&&"[object Symbol]"==Mt(t)}(t))return NaN;if(At(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=At(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=Dt(t);var r=Tt.test(t);return r||Yt.test(t)?Pt(t.slice(2),r?2:8):jt.test(t)?NaN:+t}var Lt=function(){return mt.Date.now()},kt=Math.max,Et=Math.min;function Ft(t,e,r){var n,o,a,i,s,u,l=0,c=!1,f=!1,d=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function h(e){var r=n,a=o;return n=o=void 0,l=e,i=t.apply(a,r)}function p(t){return l=t,s=setTimeout(m,e),c?h(t):i}function g(t){var r=t-u;return void 0===u||r>=e||r<0||f&&t-l>=a}function m(){var t=Lt();if(g(t))return y(t);s=setTimeout(m,function(t){var r=e-(t-u);return f?Et(r,a-(t-l)):r}(t))}function y(t){return s=void 0,d&&n?h(t):(n=o=void 0,i)}function v(){var t=Lt(),r=g(t);if(n=arguments,o=this,u=t,r){if(void 0===s)return p(u);if(f)return clearTimeout(s),s=setTimeout(m,e),h(u)}return void 0===s&&(s=setTimeout(m,e)),i}return e=Ct(e)||0,At(r)&&(c=!!r.leading,a=(f="maxWait"in r)?kt(Ct(r.maxWait)||0,e):a,d="trailing"in r?!!r.trailing:d),v.cancel=function(){void 0!==s&&clearTimeout(s),l=0,n=u=o=s=void 0},v.flush=function(){return void 0===s?i:y(Lt())},v}const Ht="function"==typeof atob,Bt="function"==typeof btoa,It="function"==typeof Buffer,Nt="function"==typeof TextDecoder?new TextDecoder:void 0,Wt="function"==typeof TextEncoder?new TextEncoder:void 0,zt=Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),Ut=(t=>{let e={};return zt.forEach(((t,r)=>e[t]=r)),e})(),qt=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,Jt=String.fromCharCode.bind(String),Vt="function"==typeof Uint8Array.from?Uint8Array.from.bind(Uint8Array):(t,e=(t=>t))=>new Uint8Array(Array.prototype.slice.call(t,0).map(e)),Zt=t=>t.replace(/[^A-Za-z0-9\+\/]/g,""),Rt=Bt?t=>btoa(t):It?t=>Buffer.from(t,"binary").toString("base64"):t=>{let e,r,n,o,a="";const i=t.length%3;for(let s=0;s<t.length;){if((r=t.charCodeAt(s++))>255||(n=t.charCodeAt(s++))>255||(o=t.charCodeAt(s++))>255)throw new TypeError("invalid character found");e=r<<16|n<<8|o,a+=zt[e>>18&63]+zt[e>>12&63]+zt[e>>6&63]+zt[63&e]}return i?a.slice(0,i-3)+"===".substring(i):a},Kt=It?t=>Buffer.from(t).toString("base64"):t=>{let e=[];for(let r=0,n=t.length;r<n;r+=4096)e.push(Jt.apply(null,t.subarray(r,r+4096)));return Rt(e.join(""))},Gt=t=>{if(t.length<2)return(e=t.charCodeAt(0))<128?t:e<2048?Jt(192|e>>>6)+Jt(128|63&e):Jt(224|e>>>12&15)+Jt(128|e>>>6&63)+Jt(128|63&e);var e=65536+1024*(t.charCodeAt(0)-55296)+(t.charCodeAt(1)-56320);return Jt(240|e>>>18&7)+Jt(128|e>>>12&63)+Jt(128|e>>>6&63)+Jt(128|63&e)},Qt=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,Xt=It?t=>Buffer.from(t,"utf8").toString("base64"):Wt?t=>Kt(Wt.encode(t)):t=>Rt(t.replace(Qt,Gt)),te=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,ee=t=>{switch(t.length){case 4:var e=((7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3))-65536;return Jt(55296+(e>>>10))+Jt(56320+(1023&e));case 3:return Jt((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return Jt((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},re=Ht?t=>atob(Zt(t)):It?t=>Buffer.from(t,"base64").toString("binary"):t=>{if(t=t.replace(/\s+/g,""),!qt.test(t))throw new TypeError("malformed base64.");t+="==".slice(2-(3&t.length));let e,r,n,o="";for(let a=0;a<t.length;)e=Ut[t.charAt(a++)]<<18|Ut[t.charAt(a++)]<<12|(r=Ut[t.charAt(a++)])<<6|(n=Ut[t.charAt(a++)]),o+=64===r?Jt(e>>16&255):64===n?Jt(e>>16&255,e>>8&255):Jt(e>>16&255,e>>8&255,255&e);return o},ne=It?t=>Vt(Buffer.from(t,"base64")):t=>Vt(re(t),(t=>t.charCodeAt(0))),oe=It?t=>Buffer.from(t,"base64").toString("utf8"):Nt?t=>Nt.decode(ne(t)):t=>re(t).replace(te,ee),ae=t=>oe(Zt(t.replace(/[-_]/g,(t=>"-"==t?"+":"/"))));function ie(t){var e;const r=w({data:null,t:null,from:null});try{const n=null==(e=S().pop().$page.fullPath.split("?q=")[1])?void 0:e.replace(/%E7%AD%89/g,"=");n&&Object.assign(r,JSON.parse(ae(n))),t&&t(r.data)}catch(n){M((()=>{var e;const n=null==(e=S().pop().$page.fullPath.split("?q=")[1])?void 0:e.replace(/%E7%AD%89/g,"=");n&&Object.assign(r,JSON.parse(ae(n))),t&&t(r.data)}))}return $(r)}const se=Symbol("mescroll");function ue(t){const e=w({enable:"all",mescroll:null,fetch:t=>setTimeout((()=>t.endSuccess(10,!1)),1e3)});O(se,e);let r=e,n=x(r,"mescroll"),o=x(r,"fetch"),a=x(r,"enable");null==t||t((t=>n.value&&n.value.onPageScroll(t))),D((()=>n.value&&n.value.onReachBottom())),A((()=>n.value&&n.value.onPullDownRefresh()));const i={onLoad:t=>(o.value=t,i),enable:t=>(a.value=t,i),mescroll:n};return i}const le={to:Ft(((t,e)=>{const r=[...S()].pop().route.split("/"),n=String(+new Date);if(!t.startsWith("/")){let e=t.split("/");t=[null,["",r[0],r[1],e[0]],["",r[0],e[0],e[1]]][e.length].join("/")}const o={data:e,from:r,t:n},a=((t,e=!1)=>e?(t=>t.replace(/=/g,"").replace(/[+\/]/g,(t=>"+"==t?"-":"_")))(Xt(t)):Xt(t))(JSON.stringify(o)).replace(/=/g,"等");return j({url:t+"?q="+a,fail:t=>console.log(t),success:()=>De.info("页面切换",e||"","=>"+t)}),new Promise((t=>T(n,t)))}),500,{leading:!0,trailing:!1}),back:Ft((t=>{if(t){console.log("回调:",t);const{t:e}=ie();Y(e.value,t)}try{P({})}catch(e){const t="/pages/index/index";try{j({url:t})}catch(r){C({url:t})}}}),500,{leading:!0,trailing:!1})};var ce=Object.freeze(Object.defineProperty({__proto__:null,default:function(){Object.assign(De,le)}},Symbol.toStringTag,{value:"Module"}));let fe={log:(...t)=>(De.debug(/(?<=src)(.*?\.vue)/.exec(new Error("123").stack)[0],...t),t[0]),any:t=>t};var de=Object.freeze(Object.defineProperty({__proto__:null,default:function(t){Object.assign(t.config.globalProperties,fe)}},Symbol.toStringTag,{value:"Module"})),he={exports:{}},pe=he.exports=function(){var t=1e3,e=6e4,r=36e5,n="millisecond",o="second",a="minute",i="hour",s="day",u="week",l="month",c="quarter",f="year",d="date",h="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,g=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},y=function(t,e,r){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(r)+t},v={s:y,z:function(t){var e=-t.utcOffset(),r=Math.abs(e),n=Math.floor(r/60),o=r%60;return(e<=0?"+":"-")+y(n,2,"0")+":"+y(o,2,"0")},m:function t(e,r){if(e.date()<r.date())return-t(r,e);var n=12*(r.year()-e.year())+(r.month()-e.month()),o=e.clone().add(n,l),a=r-o<0,i=e.clone().add(n+(a?-1:1),l);return+(-(n+(r-o)/(a?o-i:i-o))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:f,w:u,d:s,D:d,h:i,m:a,s:o,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},b="en",_={};_[b]=m;var $=function(t){return t instanceof O},w=function t(e,r,n){var o;if(!e)return b;if("string"==typeof e){var a=e.toLowerCase();_[a]&&(o=a),r&&(_[a]=r,o=a);var i=e.split("-");if(!o&&i.length>1)return t(i[0])}else{var s=e.name;_[s]=e,o=s}return!n&&o&&(b=o),o||!n&&b},S=function(t,e){if($(t))return t.clone();var r="object"==typeof e?e:{};return r.date=t,r.args=arguments,new O(r)},M=v;M.l=w,M.i=$,M.w=function(t,e){return S(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var O=function(){function m(t){this.$L=w(t.locale,null,!0),this.parse(t)}var y=m.prototype;return y.parse=function(t){this.$d=function(t){var e=t.date,r=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match(p);if(n){var o=n[2]-1||0,a=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],o,n[3]||1,n[4]||0,n[5]||0,n[6]||0,a)):new Date(n[1],o,n[3]||1,n[4]||0,n[5]||0,n[6]||0,a)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},y.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},y.$utils=function(){return M},y.isValid=function(){return!(this.$d.toString()===h)},y.isSame=function(t,e){var r=S(t);return this.startOf(e)<=r&&r<=this.endOf(e)},y.isAfter=function(t,e){return S(t)<this.startOf(e)},y.isBefore=function(t,e){return this.endOf(e)<S(t)},y.$g=function(t,e,r){return M.u(t)?this[e]:this.set(r,t)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(t,e){var r=this,n=!!M.u(e)||e,c=M.p(t),h=function(t,e){var o=M.w(r.$u?Date.UTC(r.$y,e,t):new Date(r.$y,e,t),r);return n?o:o.endOf(s)},p=function(t,e){return M.w(r.toDate()[t].apply(r.toDate("s"),(n?[0,0,0,0]:[23,59,59,999]).slice(e)),r)},g=this.$W,m=this.$M,y=this.$D,v="set"+(this.$u?"UTC":"");switch(c){case f:return n?h(1,0):h(31,11);case l:return n?h(1,m):h(0,m+1);case u:var b=this.$locale().weekStart||0,_=(g<b?g+7:g)-b;return h(n?y-_:y+(6-_),m);case s:case d:return p(v+"Hours",0);case i:return p(v+"Minutes",1);case a:return p(v+"Seconds",2);case o:return p(v+"Milliseconds",3);default:return this.clone()}},y.endOf=function(t){return this.startOf(t,!1)},y.$set=function(t,e){var r,u=M.p(t),c="set"+(this.$u?"UTC":""),h=(r={},r[s]=c+"Date",r[d]=c+"Date",r[l]=c+"Month",r[f]=c+"FullYear",r[i]=c+"Hours",r[a]=c+"Minutes",r[o]=c+"Seconds",r[n]=c+"Milliseconds",r)[u],p=u===s?this.$D+(e-this.$W):e;if(u===l||u===f){var g=this.clone().set(d,1);g.$d[h](p),g.init(),this.$d=g.set(d,Math.min(this.$D,g.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},y.set=function(t,e){return this.clone().$set(t,e)},y.get=function(t){return this[M.p(t)]()},y.add=function(n,c){var d,h=this;n=Number(n);var p=M.p(c),g=function(t){var e=S(h);return M.w(e.date(e.date()+Math.round(t*n)),h)};if(p===l)return this.set(l,this.$M+n);if(p===f)return this.set(f,this.$y+n);if(p===s)return g(1);if(p===u)return g(7);var m=(d={},d[a]=e,d[i]=r,d[o]=t,d)[p]||1,y=this.$d.getTime()+n*m;return M.w(y,this)},y.subtract=function(t,e){return this.add(-1*t,e)},y.format=function(t){var e=this,r=this.$locale();if(!this.isValid())return r.invalidDate||h;var n=t||"YYYY-MM-DDTHH:mm:ssZ",o=M.z(this),a=this.$H,i=this.$m,s=this.$M,u=r.weekdays,l=r.months,c=function(t,r,o,a){return t&&(t[r]||t(e,n))||o[r].substr(0,a)},f=function(t){return M.s(a%12||12,t,"0")},d=r.meridiem||function(t,e,r){var n=t<12?"AM":"PM";return r?n.toLowerCase():n},p={YY:String(this.$y).slice(-2),YYYY:this.$y,M:s+1,MM:M.s(s+1,2,"0"),MMM:c(r.monthsShort,s,l,3),MMMM:c(l,s),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:c(r.weekdaysMin,this.$W,u,2),ddd:c(r.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(a),HH:M.s(a,2,"0"),h:f(1),hh:f(2),a:d(a,i,!0),A:d(a,i,!1),m:String(i),mm:M.s(i,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:o};return n.replace(g,(function(t,e){return e||p[t]||o.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(n,d,h){var p,g=M.p(d),m=S(n),y=(m.utcOffset()-this.utcOffset())*e,v=this-m,b=M.m(this,m);return b=(p={},p[f]=b/12,p[l]=b,p[c]=b/3,p[u]=(v-y)/6048e5,p[s]=(v-y)/864e5,p[i]=v/r,p[a]=v/e,p[o]=v/t,p)[g]||v,h?b:M.a(b)},y.daysInMonth=function(){return this.endOf(l).$D},y.$locale=function(){return _[this.$L]},y.locale=function(t,e){if(!t)return this.$L;var r=this.clone(),n=w(t,e,!0);return n&&(r.$L=n),r},y.clone=function(){return M.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},m}(),x=O.prototype;return S.prototype=x,[["$ms",n],["$s",o],["$m",a],["$H",i],["$W",s],["$M",l],["$y",f],["$D",d]].forEach((function(t){x[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),S.extend=function(t,e){return t.$i||(t(e,O,S),t.$i=!0),S},S.locale=w,S.isDayjs=$,S.unix=function(t){return S(1e3*t)},S.en=_[b],S.Ls=_,S.p={},S}();!function(t){function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=e(t),n={name:"zh-cn",weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(t,e){return"W"===e?t+"周":t+"日"},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah点mm分",LLLL:"YYYY年M月D日ddddAh点mm分",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},meridiem:function(t,e){var r=100*t+e;return r<600?"凌晨":r<900?"早上":r<1100?"上午":r<1300?"中午":r<1800?"下午":"晚上"}};r.default.locale(n,null,!0)}(he.exports);var ge={exports:{}},me=ge.exports=function(t,e,r){t=t||{};var n=e.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function a(t,e,r,o){return n.fromToBase(t,e,r,o)}r.en.relativeTime=o,n.fromToBase=function(e,n,a,i,s){for(var u,l,c,f=a.$locale().relativeTime||o,d=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],h=d.length,p=0;p<h;p+=1){var g=d[p];g.d&&(u=i?r(e).diff(a,g.d,!0):a.diff(e,g.d,!0));var m=(t.rounding||Math.round)(Math.abs(u));if(c=u>0,m<=g.r||!g.r){m<=1&&p>0&&(g=d[p-1]);var y=f[g.l];s&&(m=s(""+m)),l="string"==typeof y?y.replace("%d",m):y(m,n,g.l,c);break}}if(n)return l;var v=c?f.future:f.past;return"function"==typeof v?v(l):v.replace("%s",l)},n.to=function(t,e){return a(t,e,this,!0)},n.from=function(t,e){return a(t,e,this)};var i=function(t){return t.$u?r.utc():r()};n.toNow=function(t){return this.to(i(this),t)},n.fromNow=function(t){return this.from(i(this),t)}},ye={exports:{}},ve=ye.exports=function(t,e,r){var n="h:mm A",o={lastDay:"[Yesterday at] "+n,sameDay:"[Today at] "+n,nextDay:"[Tomorrow at] "+n,nextWeek:"dddd [at] "+n,lastWeek:"[Last] dddd [at] "+n,sameElse:"MM/DD/YYYY"};e.prototype.calendar=function(t,e){var n=e||this.$locale().calendar||o,a=r(t||void 0).startOf("d"),i=this.diff(a,"d",!0),s="sameElse",u=i<-6?s:i<-1?"lastWeek":i<0?"lastDay":i<1?"sameDay":i<2?"nextDay":i<7?"nextWeek":s,l=n[u]||o[u];return"function"==typeof l?l.call(this,r()):this.format(l)}};pe.extend(me),pe.extend(ve),pe.locale("zh-cn");var be=Object.freeze(Object.defineProperty({__proto__:null,default:function(){Object.assign(De,{time:pe})}},Symbol.toStringTag,{value:"Module"}));class _e extends(k({namespaced:"global"})){constructor(){super(...arguments),a(this,"config",{})}}var $e=Object.defineProperty,we=Object.getOwnPropertyDescriptor;class Se extends(k({namespaced:"user"})){constructor(){super(...arguments),a(this,"name","123"),a(this,"token",""),a(this,"tokenExpired",""),a(this,"userInfo",{})}async login(){}}((t,e,r,n)=>{for(var o,a=n>1?void 0:n?we(e,r):e,i=t.length-1;i>=0;i--)(o=t[i])&&(a=(n?o(e,r,a):o(a))||a);n&&a&&$e(e,r,a)})([E],Se.prototype,"login",1);var Me=Object.freeze(Object.defineProperty({__proto__:null,Global:_e,User:Se},Symbol.toStringTag,{value:"Module"})),Oe={set:(t,e,r,n)=>(console.log("[vuex]",n+"."+e,r),t[e]=r,!0),get:(t,e,r)=>t[e]};var xe={try:t=>new Promise(((e,r)=>{try{e(t())}catch(n){r(n)}})),catch:t=>new Promise((e=>{try{e(t())}catch(r){}}))};const De=((t,a)=>{for(var i in a||(a={}))r.call(a,i)&&o(t,i,a[i]);if(e)for(var i of e(a))n.call(a,i)&&o(t,i,a[i]);return t})({[Symbol.toStringTag]:"AppGlobalUtils"},xe),Ae={install:(t,e)=>{De.catch((()=>window.app=De)),De.catch((()=>uni.app=De)),De.catch((()=>wx.app=De)),De.catch((()=>wx.uni=uni)),t.config.globalProperties.app=De,t.config.globalProperties.uni=uni,t.use(function(){const t={},e={};for(const n in Me)if(Object.prototype.hasOwnProperty.call(Me,n)){const t=Me[n];Object.assign(e,F(t))}const r=H({modules:e,plugins:[B({storage:{getItem:t=>N(t),setItem:(t,e)=>W({key:t,data:e}),removeItem:t=>z({key:t})}})]});for(const n in Me)Object.prototype.hasOwnProperty.call(Me,n)&&(t[n]=I(r,Me[n]));return Object.keys(t).forEach((e=>{De[e]=new Proxy({},{set:(r,n,o,a)=>Oe.set(t[e],n,o,e),get:(r,n,o)=>Oe.get(t[e],n,e)})})),r}()),t.use({install(t){}});let r="";Object.entries({"./utils/addon.ts":ut,"./utils/logger.ts":ht,"./utils/page.ts":ce,"./utils/pitch.ts":de,"./utils/time.ts":be}).forEach((([e,n])=>{var o;let a=e.replace(/^\.\/utils\//,"");try{null==(o=null==n?void 0:n.default)||o.call(n,t),r+=a+" "}catch(i){console.error("[appPlugin 加载失败]",`in ${a}\n`,i)}}))}};(function(){const t=q(st);return t.use(Ae),{app:t}})().app.use(U).mount("#app");export{se as S,De as a,ie as b,ue as u};
