import{r as c,j as e,L as f}from"./index-b9XftyV_.js";import{n as h}from"./no_poster-CgO5xeLg.js";import{P as l}from"./TmdbAPITools-C9iC_wzd.js";const v="_movieList_1e9pi_1",L="_movieListItem_1e9pi_21",a={movieList:v,movieListItem:L},j=(o,t)=>{const m=c.useRef({});return c.useEffect(()=>{if(!t.hash)return;const s=m.current[Number(t.hash.slice(1))];s&&s.scrollIntoView({behavior:"instant"})},[o]),e.jsx("ul",{className:a.movieList,children:o.map(({id:s,title:i,poster_path:r})=>e.jsx("li",{id:String(s),className:a.movieListItem,children:e.jsx(f,{to:`/movies/${s}#${s}`,state:{from:{...t,hash:`#${s}`}},ref:n=>{n&&(m.current[s]=n)},children:e.jsxs("div",{children:[e.jsx("img",{src:r?l(r):h,alt:r?`${i} poster`:`replacement poster for ${i}`,width:300,height:450}),e.jsx("p",{children:i})]})})},s))})};export{j as M};
