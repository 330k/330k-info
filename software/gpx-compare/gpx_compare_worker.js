/* Copyright 2022 Kei Misawa All Rights Reserved */
const DEGREE=Math.PI/180;let coords_base=[],coords_target=[],nearest_base=null,nearest_target=null;function updateCoordsBase(t){coords_base=[];for(let e=0;e<t.length;e++){let n=[];for(let s=0;s<t[e].length;s++){const a=latlng2XYZ(t[e][s].lat,t[e][s].lng);n.push({lat:t[e][s].lat,lng:t[e][s].lng,X:a.X,Y:a.Y,Z:a.Z})}coords_base.push(n)}coords_base.length?(console.time("construct"),nearest_base=new nearestNeighbor(coords_base),console.timeEnd("construct")):nearest_base=null}function updateCoordsTarget(t){coords_target=[];for(let e=0;e<t.length;e++){let n=[];for(let s=0;s<t[e].length;s++){const a=latlng2XYZ(t[e][s].lat,t[e][s].lng);n.push({lat:t[e][s].lat,lng:t[e][s].lng,X:a.X,Y:a.Y,Z:a.Z})}coords_target.push(n)}coords_target.length?(console.time("construct"),nearest_target=new nearestNeighbor(coords_target),console.timeEnd("construct")):nearest_target=null}function calculateDifference(t,e,n){const s={base:[],target:[]};if(nearest_target){console.time("Nearest Neighbor Search");for(const n of coords_base){const a=[];let r=[];for(let s=0;s<n.length;s++){if(e||void 0===n[s].dist_dev){const t=nearest_target.searchNearest(n[s]).distance;n[s].dist_dev=t}n[s].dist_dev>t&&(r.length>0&&r[r.length-1]+1!==s&&(a.push(r),r=[]),r.push(s))}r.length&&a.push(r),s.base.push(a)}console.timeEnd("Nearest Neighbor Search")}if(nearest_base){console.time("Nearest Neighbor Search");for(const e of coords_target){const a=[];let r=[];for(let s=0;s<e.length;s++){if(n||void 0===e[s].dist_dev){const t=nearest_base.searchNearest(e[s]).distance;e[s].dist_dev=t}e[s].dist_dev>t&&(r.length>0&&r[r.length-1]+1!==s&&(a.push(r),r=[]),r.push(s))}r.length&&a.push(r),s.target.push(a)}console.timeEnd("Nearest Neighbor Search")}return s}function RDPTree(t,e,n=!1){return this.coords=t,this.rdptree=function s(a,r){let o=-Number.MAX_VALUE,c=-1;for(let n=a+1;n<=r-1;n++){const s=e(t[a],t[r],t[n]).distance;s>o&&(o=s,c=n)}return n&&(c=Math.floor(.5*(a+r))),o>0?{start:a,end:r,max_distance:o,max_index:c,left:s(a,c),right:s(c,r)}:{start:a,end:r,max_distance:0,max_index:-1,left:null,right:null}}(0,t.length-1),this.searchNearest=function(n,s=Number.MAX_VALUE){return function n(s,a,r){if(0===s.max_distance)return{start:s.start,end:s.end,...e(t[s.start],t[s.end],a)};const o=e(t[s.start],t[s.max_index],a).distance,c=e(t[s.max_index],t[s.end],a).distance,i=o-s.left.max_distance>r,l=c-s.right.max_distance>r;if(i&&l)return{start:null,end:null,distance:Number.MAX_VALUE};if(i)return n(s.right,a,r);if(l)return n(s.left,a,r);let h,d,u,g;o<c?(u=s.left,h=o,g=s.right,d=c):(u=s.right,h=c,g=s.left,d=o);const f=n(u,a,r);if(0===f.distance)return f;const _=Math.min(r,f.distance);if(d-g.max_distance>_)return f;const M=n(g,a,_);return f.distance<M.distance?f:M}(this.rdptree,n,s)},this}function LinearSearch(t,e){return this.coords=t,this.searchNearest=function(n){let s=Number.MAX_VALUE,a=-1;for(let r=0;r<t.length-1;r++){const o=e(t[r],t[r+1],n).distance;o<s&&(s=o,a=r)}return{start:a,end:a+1,distance:s}},this}function nearestNeighbor(t){const e=function(t,e,n){const s=t.X,a=t.Y,r=t.Z,o=e.X,c=e.Y,i=e.Z,l=n.X,h=n.Y,d=n.Z;let u=(s*s+a*a+o*l-s*(o+l)+c*h-a*(c+h)+(r-i)*(r-d))/((s-o)*(s-o)+(a-c)*(a-c)+(r-i)*(r-i));u>1?u=1:u<0?u=0:isNaN(u)&&(u=0);const g=s-(s-o)*u,f=a-(a-c)*u,_=r-(r-i)*u;return{distance:Math.sqrt((g-l)*(g-l)+(f-h)*(f-h)+(_-d)*(_-d)),x:g,y:f,z:_,t:u}};return this.RDPTrees=t.map(t=>new RDPTree(t,e)),this.searchNearest=function(n){let s=Number.MAX_VALUE,a=null,r=this.RDPTrees.map((s,a)=>({index:a,distance:e(t[a][0],t[a][t[a].length-1],n).distance}));r.sort((t,e)=>t.distance-e.distance);for(let t=0;t<r.length;t++){let e=this.RDPTrees[r[t].index].searchNearest(n,s);e.distance<s&&(s=e.distance,a={coord_index:r[t].index,start:e.start,end:e.end})}return{distance:s,info:a}},this}function latlng2MercatorXY(t,e){const n=Math.PI/180;return{X:e*n,Y:Math.asinh(Math.tanh(t*n))}}function mercatorXY2latlng(t,e){const n=180/Math.PI;return{lat:Math.atanh(Math.sinh(e))*n,lng:t*n}}function latlng2XYZ(t,e,n=0){const s=1/298.257223563,a=s*(2-s),r=Math.PI/180,o=t*r,c=e*r,i=Math.sin(o),l=Math.cos(o),h=Math.sin(c),d=Math.cos(c),u=1-i*i*a,g=6378137/Math.sqrt(u);return{X:(g+n)*l*d,Y:(g+n)*l*h,Z:(.9933056200098587*g+n)*i}}function xyz2Latlng(t,e,n){const s=6378137,a=1/298.257223563,r=a*(2-a),o=Math.PI/180,c=Math.sin,i=Math.cos,l=Math.sqrt,h=(Math.atan,Math.atan2),d=(Math.abs,l(t*t+e*e)),u=h(n,(1-a)*d);return{lat:h(n+42841.31151331357*c(u)**3,d-r*s*i(u)**3)/o,lng:h(e,t)/o}}function hubeny(t,e,n,s){"use strict";const a=1/298.257223563,r=a*(2-a),o=Math.PI/180,c=Math.sin,i=Math.cos,l=Math.tan,h=Math.sqrt,d=(t-n)*o,u=((e-s+180)%360-180)*o,g=.5*(t+n)*o,f=c(g),_=i(g),M=6378137/h(1-f*f*r),m=.006739496742276434*_*_,b=m*m,N=m*b,x=l(g),p=x*x,X=p*p,Y=d*d,E=d*Y,P=d*E,Z=d*P,A=u*u,v=u*A,L=u*v,D=u*L,I=u*D,R=_*_,T=_*R,S=_*T,U=_*S,V=_*U,q=M*_*u+M*_/24*(1-m+b-N-9*p*m+18*p*b-27*p*N)*Y*u+M*T/24*-p*v+M*_/5760*(7+10*m-27*b-54*p*m-642*p*b+675*p*N)*P*u+M*T/5760*(-16-70*p-158*p*m+158*p*b+90*X*m-180*X*b)*Y*v+M*U/5760*(-24*p+3*X-27*p*m)*D+M*_/1935360*62*(d*Z)*u+M*T/1935360*(-416-2954*p)*P*v+M*U/1935360*(-192-1680*p+2652*X)*Y*D+M*(_*V)/1935360*(-816*p+528*X-6*p)*(u*I),w=M/(1+m)*d+M/24*(3*m-6*b+9*N-3*p*m+21*p*b-54*p*N)*E+M*R/24*(-2-3*p+3*p*m-3*p*b+3*p*N)*d*A+M/5760*(-36*m+207*b+36*p*m-1062*p*b+135*X*b)*Z+M*R/5760*(-16-60*p+4*m-4*b+102*p*m+48*p*b+90*X*m-630*X*b)*E*A+M*S/5760*(-8-20*p+15*X-8*m+96*p*m-15*X*m+15*X*b)*d*L+M*R/1935360*(-192-2016*p)*Z*A+M*S/1935360*(256+784*p+4200*X)*E*L+M*V/1935360*(-64-224*p+1148*X-42*(p*X))*d*I;return h(q*q+w*w)}addEventListener("message",function(t){console.log(t.data),postMessage(self[t.data.func](...t.data.args))});