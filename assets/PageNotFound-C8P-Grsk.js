import{r as s,c,j as e}from"./index-DdgOfbeP.js";const u=()=>{const[t,a]=s.useState(5),o=c();return s.useEffect(()=>{const n=setInterval(()=>{a(r=>(r===1&&clearInterval(n),r-1))},1e3);return()=>clearInterval(n)},[o]),e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"404 Page not found"}),e.jsxs("p",{children:["Redirecting to main page in ",t," ",t===1?"second":"seconds..."]})]})};export{u as default};
