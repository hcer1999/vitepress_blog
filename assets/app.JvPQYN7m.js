import{R as p}from"./chunks/theme.DlFqQpaE.js";import{X as s,a8 as u,a9 as c,aa as l,ab as f,ac as d,ad as m,ae as h,af as g,ag as A,ah as C,d as P,u as v,o as w,C as y,ai as R,aj as b,ak as E,h as S}from"./chunks/framework.dOJbCP6k.js";function i(e){if(e.extends){const a=i(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const o=i(p),T=P({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=v();return w(()=>{y(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&R(),b(),E(),o.setup&&o.setup(),()=>S(o.Layout)}});async function j(){globalThis.__VITEPRESS__=!0;const e=_(),a=D();a.provide(c,e);const t=l(e.route);return a.provide(f,t),a.component("Content",d),a.component("ClientOnly",m),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:a,router:e,siteData:h}),{app:a,router:e,data:t}}function D(){return g(T)}function _(){let e=s,a;return A(t=>{let n=C(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),s&&(e=!1),r},o.NotFound)}s&&j().then(({app:e,router:a,data:t})=>{a.go().then(()=>{u(a.route,t.site),e.mount("#app")})});export{j as createApp};