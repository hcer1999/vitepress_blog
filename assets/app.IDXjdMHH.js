import{R as p}from"./chunks/theme.B9zvDHXN.js";import{V as s,a6 as u,a7 as c,a8 as l,a9 as f,aa as d,ab as m,ac as h,ad as g,ae as A,af as P,d as v,u as w,o as y,A as C,ag as R,ah as b,ai as E,h as S}from"./chunks/framework.DJyBczLA.js";function i(e){if(e.extends){const a=i(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const o=i(p),T=v({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=w();return y(()=>{C(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&R(),b(),E(),o.setup&&o.setup(),()=>S(o.Layout)}});async function D(){globalThis.__VITEPRESS__=!0;const e=_(),a=V();a.provide(c,e);const t=l(e.route);return a.provide(f,t),a.component("Content",d),a.component("ClientOnly",m),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:a,router:e,siteData:h}),{app:a,router:e,data:t}}function V(){return g(T)}function _(){let e=s,a;return A(t=>{let n=P(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),s&&(e=!1),r},o.NotFound)}s&&D().then(({app:e,router:a,data:t})=>{a.go().then(()=>{u(a.route,t.site),e.mount("#app")})});export{D as createApp};