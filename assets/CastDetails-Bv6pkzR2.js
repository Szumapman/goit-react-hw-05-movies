import{r as i,b as x,j as s}from"./main-4-E1Amgb.js";import{f as d,C as L,c as g}from"./TmdbAPITools-C9iC_wzd.js";const j="/goit-react-hw-05-movies/assets/no_photo-E7UykEyX.jpg",u="_castList_hnxny_1",f="_castListItem_hnxny_21",h={castList:u,castListItem:f},C=()=>{const[a,l]=i.useState([]),{movieId:n}=x(),[e,r]=i.useState(!0);return i.useEffect(()=>{r(!0),d(g(n)).then(t=>{l(t.cast)}).catch(t=>{t.log(t)}).finally(()=>{r(!1)})},[n]),s.jsxs(s.Fragment,{children:[e&&s.jsx("p",{children:"Loading..."}),!e&&a.length>0&&s.jsx("ul",{className:h.castList,children:a.map(({id:t,profile_path:c,name:o,character:m})=>s.jsxs("li",{className:h.castListItem,children:[s.jsx("img",{src:c?L(c):j,alt:c?`${o} photo`:`replacement image for ${o}`}),s.jsx("p",{children:o}),s.jsxs("p",{children:["Character: ",m]})]},t))}),!e&&a.length===0&&s.jsx("p",{children:"Sorry, we have no information about cast for this movie."})]})};export{C as default};
