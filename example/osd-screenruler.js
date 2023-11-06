(function(d,c){typeof exports=="object"&&typeof module<"u"?c(exports,require("openseadragon")):typeof define=="function"&&define.amd?define(["exports","openseadragon"],c):(d=typeof globalThis<"u"?globalThis:d||self,c(d.OSDScreenRuler={},d.OpenSeadragon))})(this,function(d,c){"use strict";var he=Object.defineProperty;var ge=(d,c,h)=>c in d?he(d,c,{enumerable:!0,configurable:!0,writable:!0,value:h}):d[c]=h;var F=(d,c,h)=>(ge(d,typeof c!="symbol"?c+"":c,h),h);function h(){}function R(e){return e()}function T(){return Object.create(null)}function k(e){e.forEach(R)}function L(e){return typeof e=="function"}function V(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function X(e){return Object.keys(e).length===0}function Y(e,t){e.appendChild(t)}function O(e,t,n){e.insertBefore(t,n||null)}function P(e){e.parentNode&&e.parentNode.removeChild(e)}function C(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function j(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function f(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function W(e){return Array.from(e.childNodes)}let E;function S(e){E=e}function Z(){if(!E)throw new Error("Function called outside component initialization");return E}function G(e){Z().$$.on_mount.push(e)}const w=[],U=[];let v=[];const q=[],J=Promise.resolve();let H=!1;function K(){H||(H=!0,J.then(B))}function I(e){v.push(e)}const M=new Set;let y=0;function B(){if(y!==0)return;const e=E;do{try{for(;y<w.length;){const t=w[y];y++,S(t),Q(t.$$)}}catch(t){throw w.length=0,y=0,t}for(S(null),w.length=0,y=0;U.length;)U.pop()();for(let t=0;t<v.length;t+=1){const n=v[t];M.has(n)||(M.add(n),n())}v.length=0}while(w.length);for(;q.length;)q.pop()();H=!1,M.clear(),S(e)}function Q(e){if(e.fragment!==null){e.update(),k(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(I)}}function ee(e){const t=[],n=[];v.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),v=t}const te=new Set;function ne(e,t){e&&e.i&&(te.delete(e),e.i(t))}function oe(e,t,n){const{fragment:o,after_update:r}=e.$$;o&&o.m(t,n),I(()=>{const s=e.$$.on_mount.map(R).filter(L);e.$$.on_destroy?e.$$.on_destroy.push(...s):k(s),e.$$.on_mount=[]}),r.forEach(I)}function re(e,t){const n=e.$$;n.fragment!==null&&(ee(n.after_update),k(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ie(e,t){e.$$.dirty[0]===-1&&(w.push(e),K(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function se(e,t,n,o,r,s,u=null,p=[-1]){const l=E;S(e);const i=e.$$={fragment:null,ctx:[],props:s,update:h,not_equal:r,bound:T(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(l?l.$$.context:[])),callbacks:T(),dirty:p,skip_bound:!1,root:t.target||l.$$.root};u&&u(i.root);let $=!1;if(i.ctx=n?n(e,t.props||{},(_,x,...z)=>{const N=z.length?z[0]:x;return i.ctx&&r(i.ctx[_],i.ctx[_]=N)&&(!i.skip_bound&&i.bound[_]&&i.bound[_](N),$&&ie(e,_)),x}):[],i.update(),$=!0,k(i.before_update),i.fragment=o?o(i.ctx):!1,t.target){if(t.hydrate){const _=W(t.target);i.fragment&&i.fragment.l(_),_.forEach(P)}else i.fragment&&i.fragment.c();t.intro&&ne(e.$$.fragment),oe(e,t.target,t.anchor),B()}S(l)}class le{constructor(){F(this,"$$");F(this,"$$set")}$destroy(){re(this,1),this.$destroy=h}$on(t,n){if(!L(n))return h;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(t){this.$$set&&!X(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const fe="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(fe);const me="";function D(e){let t,n,o,r,s,u,p;return{c(){t=C("line"),o=C("rect"),f(t,"x1",0),f(t,"y1",e[2]),f(t,"x2",n=e[0][0]),f(t,"y2",e[2]),f(t,"class","svelte-nzrivt"),f(o,"class","handle svelte-nzrivt"),f(o,"x",0),f(o,"y",r=e[2]-e[3]/2),f(o,"width",s=e[0][0]),f(o,"height",e[3])},m(l,i){O(l,t,i),O(l,o,i),u||(p=j(o,"pointerdown",e[4]),u=!0)},p(l,i){i&4&&f(t,"y1",l[2]),i&1&&n!==(n=l[0][0])&&f(t,"x2",n),i&4&&f(t,"y2",l[2]),i&12&&r!==(r=l[2]-l[3]/2)&&f(o,"y",r),i&1&&s!==(s=l[0][0])&&f(o,"width",s),i&8&&f(o,"height",l[3])},d(l){l&&(P(t),P(o)),u=!1,p()}}}function ue(e){let t,n,o,r,s=e[0]&&D(e);return{c(){t=C("svg"),n=C("g"),s&&s.c(),f(n,"transform",e[1]),f(t,"class","osd-screenruler svelte-nzrivt")},m(u,p){O(u,t,p),Y(t,n),s&&s.m(n,null),o||(r=[j(n,"pointermove",e[5]),j(n,"pointerup",e[6])],o=!0)},p(u,[p]){u[0]?s?s.p(u,p):(s=D(u),s.c(),s.m(n,null)):s&&(s.d(1),s=null),p&2&&f(n,"transform",u[1])},i:h,o:h,d(u){u&&P(t),s&&s.d(),o=!1,k(r)}}}function ae(e,t,n){let o,{viewer:r}=t,s,u=1,p,l,i=!1;const $=()=>{var g,m;const a=(m=(g=r.world.getItemAt(0))==null?void 0:g.source)==null?void 0:m.dimensions;a&&(n(0,s=[a.x,a.y]),n(2,l=a.y/2),_())},_=()=>{const a=r.viewport.getContainerSize().x,g=r.viewport.getZoom(!0),m=r.viewport.getFlip(),b=r.viewport.pixelFromPoint(new c.Point(0,0),!0);m&&(b.x=a-b.x);const A=g*a/r.world.getContentFactor(),pe=m?-A:A,_e=r.viewport.getRotation(!0);n(1,p=`translate(${b.x}, ${b.y}) scale(${pe}, ${A}) rotate(${_e})`),n(8,u=g*a/r.world.getContentFactor())},x=a=>{i=!0,a.target.setPointerCapture(a.pointerId),r.setMouseNavEnabled(!1)},z=a=>{if(i){const{offsetX:g,offsetY:m}=a,{y:b}=r.viewport.viewerElementToImageCoordinates(new c.Point(g,m));n(2,l=b)}},N=a=>{i=!1,a.target.releasePointerCapture(a.pointerId),r.setMouseNavEnabled(!0)};return G(()=>(r.addHandler("open",$),r.addHandler("update-viewport",_),$(),()=>{r.removeHandler("page",$),r.removeHandler("update-viewport",_)})),e.$$set=a=>{"viewer"in a&&n(7,r=a.viewer)},e.$$.update=()=>{e.$$.dirty&256&&n(3,o=6/u)},[s,p,l,o,x,z,N,r,u]}class ce extends le{constructor(t){super(),se(this,t,ae,ue,V,{viewer:7})}}const de=e=>{new ce({target:e.element.querySelector(".openseadragon-canvas"),props:{viewer:e}})};d.init=de,Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=osd-screenruler.js.map
