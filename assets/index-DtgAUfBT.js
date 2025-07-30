(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();var Ht,k,Ja,Ka,Pe,ca,Xa,Ga,Ya,En,bn,vn,Za,ut={},Qa=[],nr=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Vt=Array.isArray;function Fe(e,t){for(var n in t)e[n]=t[n];return e}function Rn(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function ar(e,t,n){var a,i,r,s={};for(r in t)r=="key"?a=t[r]:r=="ref"?i=t[r]:s[r]=t[r];if(arguments.length>2&&(s.children=arguments.length>3?Ht.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)s[r]==null&&(s[r]=e.defaultProps[r]);return St(e,s,a,i,null)}function St(e,t,n,a,i){var r={type:e,props:t,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Ja,__i:-1,__u:0};return i==null&&k.vnode!=null&&k.vnode(r),r}function re(e){return e.children}function we(e,t){this.props=e,this.context=t}function Ke(e,t){if(t==null)return e.__?Ke(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?Ke(e):null}function ei(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=e.__c.base=n.__e;break}return ei(e)}}function wn(e){(!e.__d&&(e.__d=!0)&&Pe.push(e)&&!Ct.__r++||ca!=k.debounceRendering)&&((ca=k.debounceRendering)||Xa)(Ct)}function Ct(){for(var e,t,n,a,i,r,s,o=1;Pe.length;)Pe.length>o&&Pe.sort(Ga),e=Pe.shift(),o=Pe.length,e.__d&&(n=void 0,i=(a=(t=e).__v).__e,r=[],s=[],t.__P&&((n=Fe({},a)).__v=a.__v+1,k.vnode&&k.vnode(n),Un(t.__P,n,a,t.__n,t.__P.namespaceURI,32&a.__u?[i]:null,r,i??Ke(a),!!(32&a.__u),s),n.__v=a.__v,n.__.__k[n.__i]=n,ai(r,n,s),n.__e!=i&&ei(n)));Ct.__r=0}function ti(e,t,n,a,i,r,s,o,c,l,u){var h,g,m,v,d,y,p=a&&a.__k||Qa,b=t.length;for(c=ir(n,t,p,c,b),h=0;h<b;h++)(m=n.__k[h])!=null&&(g=m.__i==-1?ut:p[m.__i]||ut,m.__i=h,y=Un(e,m,g,i,r,s,o,c,l,u),v=m.__e,m.ref&&g.ref!=m.ref&&(g.ref&&Pn(g.ref,null,m),u.push(m.ref,m.__c||v,m)),d==null&&v!=null&&(d=v),4&m.__u||g.__k===m.__k?c=ni(m,c,e):typeof m.type=="function"&&y!==void 0?c=y:v&&(c=v.nextSibling),m.__u&=-7);return n.__e=d,c}function ir(e,t,n,a,i){var r,s,o,c,l,u=n.length,h=u,g=0;for(e.__k=new Array(i),r=0;r<i;r++)(s=t[r])!=null&&typeof s!="boolean"&&typeof s!="function"?(c=r+g,(s=e.__k[r]=typeof s=="string"||typeof s=="number"||typeof s=="bigint"||s.constructor==String?St(null,s,null,null,null):Vt(s)?St(re,{children:s},null,null,null):s.constructor==null&&s.__b>0?St(s.type,s.props,s.key,s.ref?s.ref:null,s.__v):s).__=e,s.__b=e.__b+1,o=null,(l=s.__i=rr(s,n,c,h))!=-1&&(h--,(o=n[l])&&(o.__u|=2)),o==null||o.__v==null?(l==-1&&(i>u?g--:i<u&&g++),typeof s.type!="function"&&(s.__u|=4)):l!=c&&(l==c-1?g--:l==c+1?g++:(l>c?g--:g++,s.__u|=4))):e.__k[r]=null;if(h)for(r=0;r<u;r++)(o=n[r])!=null&&(2&o.__u)==0&&(o.__e==a&&(a=Ke(o)),ri(o,o));return a}function ni(e,t,n){var a,i;if(typeof e.type=="function"){for(a=e.__k,i=0;a&&i<a.length;i++)a[i]&&(a[i].__=e,t=ni(a[i],t,n));return t}e.__e!=t&&(t&&e.type&&!n.contains(t)&&(t=Ke(e)),n.insertBefore(e.__e,t||null),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function rr(e,t,n,a){var i,r,s=e.key,o=e.type,c=t[n];if(c===null&&e.key==null||c&&s==c.key&&o==c.type&&(2&c.__u)==0)return n;if(a>(c!=null&&(2&c.__u)==0?1:0))for(i=n-1,r=n+1;i>=0||r<t.length;){if(i>=0){if((c=t[i])&&(2&c.__u)==0&&s==c.key&&o==c.type)return i;i--}if(r<t.length){if((c=t[r])&&(2&c.__u)==0&&s==c.key&&o==c.type)return r;r++}}return-1}function ha(e,t,n){t[0]=="-"?e.setProperty(t,n??""):e[t]=n==null?"":typeof n!="number"||nr.test(t)?n:n+"px"}function vt(e,t,n,a,i){var r;e:if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof a=="string"&&(e.style.cssText=a=""),a)for(t in a)n&&t in n||ha(e.style,t,"");if(n)for(t in n)a&&n[t]==a[t]||ha(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")r=t!=(t=t.replace(Ya,"$1")),t=t.toLowerCase()in e||t=="onFocusOut"||t=="onFocusIn"?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+r]=n,n?a?n.u=a.u:(n.u=En,e.addEventListener(t,r?vn:bn,r)):e.removeEventListener(t,r?vn:bn,r);else{if(i=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n))}}function fa(e){return function(t){if(this.l){var n=this.l[t.type+e];if(t.t==null)t.t=En++;else if(t.t<n.u)return;return n(k.event?k.event(t):t)}}}function Un(e,t,n,a,i,r,s,o,c,l){var u,h,g,m,v,d,y,p,b,w,_,x,A,M,F,S,C,N=t.type;if(t.constructor!=null)return null;128&n.__u&&(c=!!(32&n.__u),r=[o=t.__e=n.__e]),(u=k.__b)&&u(t);e:if(typeof N=="function")try{if(p=t.props,b="prototype"in N&&N.prototype.render,w=(u=N.contextType)&&a[u.__c],_=u?w?w.props.value:u.__:a,n.__c?y=(h=t.__c=n.__c).__=h.__E:(b?t.__c=h=new N(p,_):(t.__c=h=new we(p,_),h.constructor=N,h.render=or),w&&w.sub(h),h.props=p,h.state||(h.state={}),h.context=_,h.__n=a,g=h.__d=!0,h.__h=[],h._sb=[]),b&&h.__s==null&&(h.__s=h.state),b&&N.getDerivedStateFromProps!=null&&(h.__s==h.state&&(h.__s=Fe({},h.__s)),Fe(h.__s,N.getDerivedStateFromProps(p,h.__s))),m=h.props,v=h.state,h.__v=t,g)b&&N.getDerivedStateFromProps==null&&h.componentWillMount!=null&&h.componentWillMount(),b&&h.componentDidMount!=null&&h.__h.push(h.componentDidMount);else{if(b&&N.getDerivedStateFromProps==null&&p!==m&&h.componentWillReceiveProps!=null&&h.componentWillReceiveProps(p,_),!h.__e&&h.shouldComponentUpdate!=null&&h.shouldComponentUpdate(p,h.__s,_)===!1||t.__v==n.__v){for(t.__v!=n.__v&&(h.props=p,h.state=h.__s,h.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(j){j&&(j.__=t)}),x=0;x<h._sb.length;x++)h.__h.push(h._sb[x]);h._sb=[],h.__h.length&&s.push(h);break e}h.componentWillUpdate!=null&&h.componentWillUpdate(p,h.__s,_),b&&h.componentDidUpdate!=null&&h.__h.push(function(){h.componentDidUpdate(m,v,d)})}if(h.context=_,h.props=p,h.__P=e,h.__e=!1,A=k.__r,M=0,b){for(h.state=h.__s,h.__d=!1,A&&A(t),u=h.render(h.props,h.state,h.context),F=0;F<h._sb.length;F++)h.__h.push(h._sb[F]);h._sb=[]}else do h.__d=!1,A&&A(t),u=h.render(h.props,h.state,h.context),h.state=h.__s;while(h.__d&&++M<25);h.state=h.__s,h.getChildContext!=null&&(a=Fe(Fe({},a),h.getChildContext())),b&&!g&&h.getSnapshotBeforeUpdate!=null&&(d=h.getSnapshotBeforeUpdate(m,v)),S=u,u!=null&&u.type===re&&u.key==null&&(S=ii(u.props.children)),o=ti(e,Vt(S)?S:[S],t,n,a,i,r,s,o,c,l),h.base=t.__e,t.__u&=-161,h.__h.length&&s.push(h),y&&(h.__E=h.__=null)}catch(j){if(t.__v=null,c||r!=null)if(j.then){for(t.__u|=c?160:128;o&&o.nodeType==8&&o.nextSibling;)o=o.nextSibling;r[r.indexOf(o)]=null,t.__e=o}else for(C=r.length;C--;)Rn(r[C]);else t.__e=n.__e,t.__k=n.__k;k.__e(j,t,n)}else r==null&&t.__v==n.__v?(t.__k=n.__k,t.__e=n.__e):o=t.__e=sr(n.__e,t,n,a,i,r,s,c,l);return(u=k.diffed)&&u(t),128&t.__u?void 0:o}function ai(e,t,n){for(var a=0;a<n.length;a++)Pn(n[a],n[++a],n[++a]);k.__c&&k.__c(t,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(r){r.call(i)})}catch(r){k.__e(r,i.__v)}})}function ii(e){return typeof e!="object"||e==null||e.__b&&e.__b>0?e:Vt(e)?e.map(ii):Fe({},e)}function sr(e,t,n,a,i,r,s,o,c){var l,u,h,g,m,v,d,y=n.props,p=t.props,b=t.type;if(b=="svg"?i="http://www.w3.org/2000/svg":b=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),r!=null){for(l=0;l<r.length;l++)if((m=r[l])&&"setAttribute"in m==!!b&&(b?m.localName==b:m.nodeType==3)){e=m,r[l]=null;break}}if(e==null){if(b==null)return document.createTextNode(p);e=document.createElementNS(i,b,p.is&&p),o&&(k.__m&&k.__m(t,r),o=!1),r=null}if(b==null)y===p||o&&e.data==p||(e.data=p);else{if(r=r&&Ht.call(e.childNodes),y=n.props||ut,!o&&r!=null)for(y={},l=0;l<e.attributes.length;l++)y[(m=e.attributes[l]).name]=m.value;for(l in y)if(m=y[l],l!="children"){if(l=="dangerouslySetInnerHTML")h=m;else if(!(l in p)){if(l=="value"&&"defaultValue"in p||l=="checked"&&"defaultChecked"in p)continue;vt(e,l,null,m,i)}}for(l in p)m=p[l],l=="children"?g=m:l=="dangerouslySetInnerHTML"?u=m:l=="value"?v=m:l=="checked"?d=m:o&&typeof m!="function"||y[l]===m||vt(e,l,m,y[l],i);if(u)o||h&&(u.__html==h.__html||u.__html==e.innerHTML)||(e.innerHTML=u.__html),t.__k=[];else if(h&&(e.innerHTML=""),ti(t.type=="template"?e.content:e,Vt(g)?g:[g],t,n,a,b=="foreignObject"?"http://www.w3.org/1999/xhtml":i,r,s,r?r[0]:n.__k&&Ke(n,0),o,c),r!=null)for(l=r.length;l--;)Rn(r[l]);o||(l="value",b=="progress"&&v==null?e.removeAttribute("value"):v!=null&&(v!==e[l]||b=="progress"&&!v||b=="option"&&v!=y[l])&&vt(e,l,v,y[l],i),l="checked",d!=null&&d!=e[l]&&vt(e,l,d,y[l],i))}return e}function Pn(e,t,n){try{if(typeof e=="function"){var a=typeof e.__u=="function";a&&e.__u(),a&&t==null||(e.__u=e(t))}else e.current=t}catch(i){k.__e(i,n)}}function ri(e,t,n){var a,i;if(k.unmount&&k.unmount(e),(a=e.ref)&&(a.current&&a.current!=e.__e||Pn(a,null,t)),(a=e.__c)!=null){if(a.componentWillUnmount)try{a.componentWillUnmount()}catch(r){k.__e(r,t)}a.base=a.__P=null}if(a=e.__k)for(i=0;i<a.length;i++)a[i]&&ri(a[i],t,n||typeof e.type!="function");n||Rn(e.__e),e.__c=e.__=e.__e=void 0}function or(e,t,n){return this.constructor(e,n)}function lr(e,t,n){var a,i,r,s;t==document&&(t=document.documentElement),k.__&&k.__(e,t),i=(a=!1)?null:t.__k,r=[],s=[],Un(t,e=t.__k=ar(re,null,[e]),i||ut,ut,t.namespaceURI,i?null:t.firstChild?Ht.call(t.childNodes):null,r,i?i.__e:t.firstChild,a,s),ai(r,e,s)}function Dn(e){function t(n){var a,i;return this.getChildContext||(a=new Set,(i={})[t.__c]=this,this.getChildContext=function(){return i},this.componentWillUnmount=function(){a=null},this.shouldComponentUpdate=function(r){this.props.value!=r.value&&a.forEach(function(s){s.__e=!0,wn(s)})},this.sub=function(r){a.add(r);var s=r.componentWillUnmount;r.componentWillUnmount=function(){a&&a.delete(r),s&&s.call(r)}}),n.children}return t.__c="__cC"+Za++,t.__=e,t.Provider=t.__l=(t.Consumer=function(n,a){return n.children(a)}).contextType=t,t}Ht=Qa.slice,k={__e:function(e,t,n,a){for(var i,r,s;t=t.__;)if((i=t.__c)&&!i.__)try{if((r=i.constructor)&&r.getDerivedStateFromError!=null&&(i.setState(r.getDerivedStateFromError(e)),s=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,a||{}),s=i.__d),s)return i.__E=i}catch(o){e=o}throw e}},Ja=0,Ka=function(e){return e!=null&&e.constructor==null},we.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=Fe({},this.state),typeof e=="function"&&(e=e(Fe({},n),this.props)),e&&Fe(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),wn(this))},we.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),wn(this))},we.prototype.render=re,Pe=[],Xa=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Ga=function(e,t){return e.__v.__b-t.__v.__b},Ct.__r=0,Ya=/(PointerCapture)$|Capture$/i,En=0,bn=fa(!1),vn=fa(!0),Za=0;var ur=0;function f(e,t,n,a,i,r){t||(t={});var s,o,c=t;if("ref"in c)for(o in c={},t)o=="ref"?s=t[o]:c[o]=t[o];var l={type:e,props:c,key:n,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--ur,__i:-1,__u:0,__source:i,__self:r};if(typeof e=="function"&&(s=e.defaultProps))for(o in s)c[o]===void 0&&(c[o]=s[o]);return k.vnode&&k.vnode(l),l}var on;(on=typeof globalThis<"u"?globalThis:typeof window<"u"?window:void 0)!=null&&on.__PREACT_DEVTOOLS__&&on.__PREACT_DEVTOOLS__.attachPreact("10.26.5",k,{Fragment:re,Component:we});var da={};function ve(e){return e.type===re?"Fragment":typeof e.type=="function"?e.type.displayName||e.type.name:typeof e.type=="string"?e.type:"#text"}var st=[],He=[];function si(){return st.length>0?st[st.length-1]:null}var pa=!0;function ln(e){return typeof e.type=="function"&&e.type!=re}function Y(e){for(var t=[e],n=e;n.__o!=null;)t.push(n.__o),n=n.__o;return t.reduce(function(a,i){a+="  in "+ve(i);var r=i.__source;return r?a+=" (at "+r.fileName+":"+r.lineNumber+")":pa&&console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons."),pa=!1,a+`
`},"")}var cr=typeof WeakMap=="function";function _n(e){var t=[];return e.__k&&e.__k.forEach(function(n){n&&typeof n.type=="function"?t.push.apply(t,_n(n)):n&&typeof n.type=="string"&&t.push(n.type)}),t}function oi(e){return e?typeof e.type=="function"?e.__==null?e.__e!=null&&e.__e.parentNode!=null?e.__e.parentNode.localName:"":oi(e.__):e.type:""}var hr=we.prototype.setState;function un(e){return e==="table"||e==="tfoot"||e==="tbody"||e==="thead"||e==="td"||e==="tr"||e==="th"}we.prototype.setState=function(e,t){return this.__v==null&&this.state==null&&console.warn(`Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.

`+Y(si())),hr.call(this,e,t)};var fr=/^(address|article|aside|blockquote|details|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|main|menu|nav|ol|p|pre|search|section|table|ul)$/,dr=we.prototype.forceUpdate;function ce(e){var t=e.props,n=ve(e),a="";for(var i in t)if(t.hasOwnProperty(i)&&i!=="children"){var r=t[i];typeof r=="function"&&(r="function "+(r.displayName||r.name)+"() {}"),r=Object(r)!==r||r.toString?r+"":Object.prototype.toString.call(r),a+=" "+i+"="+JSON.stringify(r)}var s=t.children;return"<"+n+a+(s&&s.length?">..</"+n+">":" />")}we.prototype.forceUpdate=function(e){return this.__v==null?console.warn(`Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.

`+Y(si())):this.__P==null&&console.warn(`Can't call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

`+Y(this.__v)),dr.call(this,e)},k.__m=function(e,t){var n=e.type,a=t.map(function(i){return i&&i.localName}).filter(Boolean);console.error('Expected a DOM node of type "'+n+'" but found "'+a.join(", ")+`" as available DOM-node(s), this is caused by the SSR'd HTML containing different DOM-nodes compared to the hydrated one.

`+Y(e))},function(){(function(){var d=k.__b,y=k.diffed,p=k.__,b=k.vnode,w=k.__r;k.diffed=function(_){ln(_)&&He.pop(),st.pop(),y&&y(_)},k.__b=function(_){ln(_)&&st.push(_),d&&d(_)},k.__=function(_,x){He=[],p&&p(_,x)},k.vnode=function(_){_.__o=He.length>0?He[He.length-1]:null,b&&b(_)},k.__r=function(_){ln(_)&&He.push(_),w&&w(_)}})();var e=!1,t=k.__b,n=k.diffed,a=k.vnode,i=k.__r,r=k.__e,s=k.__,o=k.__h,c=cr?{useEffect:new WeakMap,useLayoutEffect:new WeakMap,lazyPropTypes:new WeakMap}:null,l=[];k.__e=function(d,y,p,b){if(y&&y.__c&&typeof d.then=="function"){var w=d;d=new Error("Missing Suspense. The throwing component was: "+ve(y));for(var _=y;_;_=_.__)if(_.__c&&_.__c.__c){d=w;break}if(d instanceof Error)throw d}try{(b=b||{}).componentStack=Y(y),r(d,y,p,b),typeof d.then!="function"&&setTimeout(function(){throw d})}catch(x){throw x}},k.__=function(d,y){if(!y)throw new Error(`Undefined parent passed to render(), this is the second argument.
Check if the element is available in the DOM/has the correct id.`);var p;switch(y.nodeType){case 1:case 11:case 9:p=!0;break;default:p=!1}if(!p){var b=ve(d);throw new Error("Expected a valid HTML node as a second argument to render.	Received "+y+" instead: render(<"+b+" />, "+y+");")}s&&s(d,y)},k.__b=function(d){var y=d.type;if(e=!0,y===void 0)throw new Error(`Undefined component passed to createElement()

You likely forgot to export your component or might have mixed up default and named imports`+ce(d)+`

`+Y(d));if(y!=null&&typeof y=="object")throw y.__k!==void 0&&y.__e!==void 0?new Error("Invalid type passed to createElement(): "+y+`

Did you accidentally pass a JSX literal as JSX twice?

  let My`+ve(d)+" = "+ce(y)+`;
  let vnode = <My`+ve(d)+` />;

This usually happens when you export a JSX literal and not the component.

`+Y(d)):new Error("Invalid type passed to createElement(): "+(Array.isArray(y)?"array":y));if(d.ref!==void 0&&typeof d.ref!="function"&&typeof d.ref!="object"&&!("$$typeof"in d))throw new Error(`Component's "ref" property should be a function, or an object created by createRef(), but got [`+typeof d.ref+`] instead
`+ce(d)+`

`+Y(d));if(typeof d.type=="string"){for(var p in d.props)if(p[0]==="o"&&p[1]==="n"&&typeof d.props[p]!="function"&&d.props[p]!=null)throw new Error(`Component's "`+p+'" property should be a function, but got ['+typeof d.props[p]+`] instead
`+ce(d)+`

`+Y(d))}if(typeof d.type=="function"&&d.type.propTypes){if(d.type.displayName==="Lazy"&&c&&!c.lazyPropTypes.has(d.type)){var b="PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";try{var w=d.type();c.lazyPropTypes.set(d.type,!0),console.warn(b+"Component wrapped in lazy() is "+ve(w))}catch{console.warn(b+"We will log the wrapped component's name once it is loaded.")}}var _=d.props;d.type.__f&&delete(_=function(x,A){for(var M in A)x[M]=A[M];return x}({},_)).ref,function(x,A,M,F,S){Object.keys(x).forEach(function(C){var N;try{N=x[C](A,C,F,"prop",null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(j){N=j}N&&!(N.message in da)&&(da[N.message]=!0,console.error("Failed prop type: "+N.message+(S&&`
`+S()||"")))})}(d.type.propTypes,_,0,ve(d),function(){return Y(d)})}t&&t(d)};var u,h=0;k.__r=function(d){i&&i(d),e=!0;var y=d.__c;if(y===u?h++:h=1,h>=25)throw new Error("Too many re-renders. This is limited to prevent an infinite loop which may lock up your browser. The component causing this is: "+ve(d));u=y},k.__h=function(d,y,p){if(!d||!e)throw new Error("Hook can only be invoked from render methods.");o&&o(d,y,p)};var g=function(d,y){return{get:function(){var p="get"+d+y;l&&l.indexOf(p)<0&&(l.push(p),console.warn("getting vnode."+d+" is deprecated, "+y))},set:function(){var p="set"+d+y;l&&l.indexOf(p)<0&&(l.push(p),console.warn("setting vnode."+d+" is not allowed, "+y))}}},m={nodeName:g("nodeName","use vnode.type"),attributes:g("attributes","use vnode.props"),children:g("children","use vnode.props.children")},v=Object.create({},m);k.vnode=function(d){var y=d.props;if(d.type!==null&&y!=null&&("__source"in y||"__self"in y)){var p=d.props={};for(var b in y){var w=y[b];b==="__source"?d.__source=w:b==="__self"?d.__self=w:p[b]=w}}d.__proto__=v,a&&a(d)},k.diffed=function(d){var y,p=d.type,b=d.__;if(d.__k&&d.__k.forEach(function(U){if(typeof U=="object"&&U&&U.type===void 0){var X=Object.keys(U).join(",");throw new Error("Objects are not valid as a child. Encountered an object with the keys {"+X+`}.

`+Y(d))}}),d.__c===u&&(h=0),typeof p=="string"&&(un(p)||p==="p"||p==="a"||p==="button")){var w=oi(b);if(w!==""&&un(p))p==="table"&&w!=="td"&&un(w)?console.error("Improper nesting of table. Your <table> should not have a table-node parent."+ce(d)+`

`+Y(d)):p!=="thead"&&p!=="tfoot"&&p!=="tbody"||w==="table"?p==="tr"&&w!=="thead"&&w!=="tfoot"&&w!=="tbody"?console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot> parent."+ce(d)+`

`+Y(d)):p==="td"&&w!=="tr"?console.error("Improper nesting of table. Your <td> should have a <tr> parent."+ce(d)+`

`+Y(d)):p==="th"&&w!=="tr"&&console.error("Improper nesting of table. Your <th> should have a <tr>."+ce(d)+`

`+Y(d)):console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent."+ce(d)+`

`+Y(d));else if(p==="p"){var _=_n(d).filter(function(U){return fr.test(U)});_.length&&console.error("Improper nesting of paragraph. Your <p> should not have "+_.join(", ")+" as child-elements."+ce(d)+`

`+Y(d))}else p!=="a"&&p!=="button"||_n(d).indexOf(p)!==-1&&console.error("Improper nesting of interactive content. Your <"+p+"> should not have other "+(p==="a"?"anchor":"button")+" tags as child-elements."+ce(d)+`

`+Y(d))}if(e=!1,n&&n(d),d.__k!=null)for(var x=[],A=0;A<d.__k.length;A++){var M=d.__k[A];if(M&&M.key!=null){var F=M.key;if(x.indexOf(F)!==-1){console.error('Following component has two or more children with the same key attribute: "'+F+`". This may cause glitches and misbehavior in rendering process. Component: 

`+ce(d)+`

`+Y(d));break}x.push(F)}}if(d.__c!=null&&d.__c.__H!=null){var S=d.__c.__H.__;if(S)for(var C=0;C<S.length;C+=1){var N=S[C];if(N.__H){for(var j=0;j<N.__H.length;j++)if((y=N.__H[j])!=y){var W=ve(d);console.warn("Invalid argument passed to hook. Hooks should not be called with NaN in the dependency array. Hook index "+C+" in component "+W+" was called with NaN.")}}}}}}();const pr="_app_od0zq_51",gr="_display-pane_od0zq_58",mr="_main-pane_od0zq_69",cn={app:pr,displayPane:gr,mainPane:mr},yr="_loading_f2b9q_132",br="_no-fonts_f2b9q_222",vr="_upload-header_f2b9q_233",wr="_upload-sub_f2b9q_238",_r="_upload-icon_f2b9q_243",xr="_families_f2b9q_255",Sr="_family-settings_f2b9q_261",kr="_family-header_f2b9q_271",Tr="_family-name_f2b9q_279",Fr="_copy-paste-buttons_f2b9q_284",Ar="_remove-font_f2b9q_288",Cr="_remove-font-family_f2b9q_288",Nr="_num-fonts_f2b9q_292",Ir="_single-font-settings_f2b9q_298",Mr="_single-font-header_f2b9q_309",jr="_single-font-file-size_f2b9q_315",Or="_single-font-subfamily_f2b9q_320",Er="_family-settings-body_f2b9q_324",Rr="_settings-section_f2b9q_329",Ur="_settings-section-title_f2b9q_346",Pr="_settings-section-title-text_f2b9q_354",Dr="_settings-section-body_f2b9q_358",qr="_settings-grid_f2b9q_363",Br="_single-font-settings-body_f2b9q_370",Lr="_settings-sub-section_f2b9q_375",$r="_checkbox-section_f2b9q_386",Hr="_checkboxes_f2b9q_386",Vr="_disabled_f2b9q_389",zr="_style-setting_f2b9q_393",Wr="_style-setting-name_f2b9q_397",Jr="_settings-list_f2b9q_405",Kr="_static-setting_f2b9q_414",Xr="_axis-setting_f2b9q_418",Gr="_axis-setting-modes_f2b9q_426",Yr="_spinbox-range_f2b9q_430",Zr="_label_f2b9q_436",Qr="_character-sets-header_f2b9q_447",es="_header-divider_f2b9q_453",ts="_character-set_f2b9q_447",ns="_character-set-header_f2b9q_468",as="_character-set-body_f2b9q_475",is="_character-set-name_f2b9q_479",rs="_unicode-range-textbox_f2b9q_483",ss="_axis-range-textbox_f2b9q_488",os="_invalid_f2b9q_492",T={loading:yr,noFonts:br,uploadHeader:vr,uploadSub:wr,uploadIcon:_r,families:xr,familySettings:Sr,familyHeader:kr,familyName:Tr,copyPasteButtons:Fr,removeFont:Ar,removeFontFamily:Cr,numFonts:Nr,singleFontSettings:Ir,singleFontHeader:Mr,singleFontFileSize:jr,singleFontSubfamily:Or,familySettingsBody:Er,settingsSection:Rr,settingsSectionTitle:Ur,settingsSectionTitleText:Pr,settingsSectionBody:Dr,settingsGrid:qr,singleFontSettingsBody:Br,settingsSubSection:Lr,checkboxSection:$r,checkboxes:Hr,disabled:Vr,styleSetting:zr,styleSettingName:Wr,settingsList:Jr,staticSetting:Kr,axisSetting:Xr,axisSettingModes:Gr,spinboxRange:Yr,label:Zr,characterSetsHeader:Qr,headerDivider:es,characterSet:ts,characterSetHeader:ns,characterSetBody:as,characterSetName:is,unicodeRangeTextbox:rs,axisRangeTextbox:ss,invalid:os};var Ie,q,hn,ga,ct=0,li=[],V=k,ma=V.__b,ya=V.__r,ba=V.diffed,va=V.__c,wa=V.unmount,_a=V.__;function Ye(e,t){V.__h&&V.__h(q,e,ct||t),ct=0;var n=q.__H||(q.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function ui(e){return ct=1,ls(hi,e)}function ls(e,t,n){var a=Ye(Ie++,2);if(a.t=e,!a.__c&&(a.__=[hi(void 0,t),function(o){var c=a.__N?a.__N[0]:a.__[0],l=a.t(c,o);c!==l&&(a.__N=[l,a.__[1]],a.__c.setState({}))}],a.__c=q,!q.__f)){var i=function(o,c,l){if(!a.__c.__H)return!0;var u=a.__c.__H.__.filter(function(g){return!!g.__c});if(u.every(function(g){return!g.__N}))return!r||r.call(this,o,c,l);var h=a.__c.props!==o;return u.forEach(function(g){if(g.__N){var m=g.__[0];g.__=g.__N,g.__N=void 0,m!==g.__[0]&&(h=!0)}}),r&&r.call(this,o,c,l)||h};q.__f=!0;var r=q.shouldComponentUpdate,s=q.componentWillUpdate;q.componentWillUpdate=function(o,c,l){if(this.__e){var u=r;r=void 0,i(o,c,l),r=u}s&&s.call(this,o,c,l)},q.shouldComponentUpdate=i}return a.__N||a.__}function Nt(e,t){var n=Ye(Ie++,3);!V.__s&&qn(n.__H,t)&&(n.__=e,n.u=t,q.__H.__h.push(n))}function zt(e,t){var n=Ye(Ie++,4);!V.__s&&qn(n.__H,t)&&(n.__=e,n.u=t,q.__h.push(n))}function te(e){return ct=5,xe(function(){return{current:e}},[])}function xe(e,t){var n=Ye(Ie++,7);return qn(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function I(e,t){return ct=8,xe(function(){return e},t)}function dt(e){var t=q.context[e.__c],n=Ye(Ie++,9);return n.c=e,t?(n.__==null&&(n.__=!0,t.sub(q)),t.props.value):e.__}function ci(){var e=Ye(Ie++,11);if(!e.__){for(var t=q.__v;t!==null&&!t.__m&&t.__!==null;)t=t.__;var n=t.__m||(t.__m=[0,0]);e.__="P"+n[0]+"-"+n[1]++}return e.__}function us(){for(var e;e=li.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(kt),e.__H.__h.forEach(xn),e.__H.__h=[]}catch(t){e.__H.__h=[],V.__e(t,e.__v)}}V.__b=function(e){q=null,ma&&ma(e)},V.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),_a&&_a(e,t)},V.__r=function(e){ya&&ya(e),Ie=0;var t=(q=e.__c).__H;t&&(hn===q?(t.__h=[],q.__h=[],t.__.forEach(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(t.__h.forEach(kt),t.__h.forEach(xn),t.__h=[],Ie=0)),hn=q},V.diffed=function(e){ba&&ba(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(li.push(t)!==1&&ga===V.requestAnimationFrame||((ga=V.requestAnimationFrame)||cs)(us)),t.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.u=void 0})),hn=q=null},V.__c=function(e,t){t.some(function(n){try{n.__h.forEach(kt),n.__h=n.__h.filter(function(a){return!a.__||xn(a)})}catch(a){t.some(function(i){i.__h&&(i.__h=[])}),t=[],V.__e(a,n.__v)}}),va&&va(e,t)},V.unmount=function(e){wa&&wa(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach(function(a){try{kt(a)}catch(i){t=i}}),n.__H=void 0,t&&V.__e(t,n.__v))};var xa=typeof requestAnimationFrame=="function";function cs(e){var t,n=function(){clearTimeout(a),xa&&cancelAnimationFrame(t),setTimeout(e)},a=setTimeout(n,100);xa&&(t=requestAnimationFrame(n))}function kt(e){var t=q,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),q=t}function xn(e){var t=q;e.__c=e.__(),q=t}function qn(e,t){return!e||e.length!==t.length||t.some(function(n,a){return n!==e[a]})}function hi(e,t){return typeof t=="function"?t(e):t}var hs=Symbol.for("preact-signals");function Wt(){if(Ce>1)Ce--;else{for(var e,t=!1;ot!==void 0;){var n=ot;for(ot=void 0,Sn++;n!==void 0;){var a=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&pi(n))try{n.c()}catch(i){t||(e=i,t=!0)}n=a}}if(Sn=0,Ce--,t)throw e}}function fi(e){if(Ce>0)return e();Ce++;try{return e()}finally{Wt()}}var D=void 0,ot=void 0,Ce=0,Sn=0,It=0;function di(e){if(D!==void 0){var t=e.n;if(t===void 0||t.t!==D)return t={i:0,S:e,p:D.s,n:void 0,t:D,e:void 0,x:void 0,r:t},D.s!==void 0&&(D.s.n=t),D.s=t,e.n=t,32&D.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=D.s,t.n=void 0,D.s.n=t,D.s=t),t}}function ne(e){this.v=e,this.i=0,this.n=void 0,this.t=void 0}ne.prototype.brand=hs;ne.prototype.h=function(){return!0};ne.prototype.S=function(e){this.t!==e&&e.e===void 0&&(e.x=this.t,this.t!==void 0&&(this.t.e=e),this.t=e)};ne.prototype.U=function(e){if(this.t!==void 0){var t=e.e,n=e.x;t!==void 0&&(t.x=n,e.e=void 0),n!==void 0&&(n.e=t,e.x=void 0),e===this.t&&(this.t=n)}};ne.prototype.subscribe=function(e){var t=this;return gt(function(){var n=t.value,a=D;D=void 0;try{e(n)}finally{D=a}})};ne.prototype.valueOf=function(){return this.value};ne.prototype.toString=function(){return this.value+""};ne.prototype.toJSON=function(){return this.value};ne.prototype.peek=function(){var e=D;D=void 0;try{return this.value}finally{D=e}};Object.defineProperty(ne.prototype,"value",{get:function(){var e=di(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(Sn>100)throw new Error("Cycle detected");this.v=e,this.i++,It++,Ce++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{Wt()}}}});function O(e){return new ne(e)}function pi(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function gi(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function mi(e){for(var t=e.s,n=void 0;t!==void 0;){var a=t.p;t.i===-1?(t.S.U(t),a!==void 0&&(a.n=t.n),t.n!==void 0&&(t.n.p=a)):n=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=a}e.s=n}function Ze(e){ne.call(this,void 0),this.x=e,this.s=void 0,this.g=It-1,this.f=4}(Ze.prototype=new ne).h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===It))return!0;if(this.g=It,this.f|=1,this.i>0&&!pi(this))return this.f&=-2,!0;var e=D;try{gi(this),D=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return D=e,mi(this),this.f&=-2,!0};Ze.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}ne.prototype.S.call(this,e)};Ze.prototype.U=function(e){if(this.t!==void 0&&(ne.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}};Ze.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}};Object.defineProperty(Ze.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var e=di(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function Mt(e){return new Ze(e)}function yi(e){var t=e.u;if(e.u=void 0,typeof t=="function"){Ce++;var n=D;D=void 0;try{t()}catch(a){throw e.f&=-2,e.f|=8,Bn(e),a}finally{D=n,Wt()}}}function Bn(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,yi(e)}function fs(e){if(D!==this)throw new Error("Out-of-order effect");mi(this),D=e,this.f&=-2,8&this.f&&Bn(this),Wt()}function pt(e){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}pt.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t=="function"&&(this.u=t)}finally{e()}};pt.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,yi(this),gi(this),Ce++;var e=D;return D=this,fs.bind(this,e)};pt.prototype.N=function(){2&this.f||(this.f|=2,this.o=ot,ot=this)};pt.prototype.d=function(){this.f|=8,1&this.f||Bn(this)};function gt(e){var t=new pt(e);try{t.c()}catch(n){throw t.d(),n}return t.d.bind(t)}var bi,Jt,fn,vi=[];gt(function(){bi=this.N})();function Qe(e,t){k[e]=t.bind(null,k[e]||function(){})}function jt(e){fn&&fn(),fn=e&&e.S()}function wi(e){var t=this,n=e.data,a=Ee(n);a.value=n;var i=xe(function(){for(var o=t,c=t.__v;c=c.__;)if(c.__c){c.__c.__$f|=4;break}var l=Mt(function(){var m=a.value.value;return m===0?0:m===!0?"":m||""}),u=Mt(function(){return!Array.isArray(l.value)&&!Ka(l.value)}),h=gt(function(){if(this.N=_i,u.value){var m=l.value;o.__v&&o.__v.__e&&o.__v.__e.nodeType===3&&(o.__v.__e.data=m)}}),g=t.__$u.d;return t.__$u.d=function(){h(),g.call(this)},[u,l]},[]),r=i[0],s=i[1];return r.value?s.peek():s.value}wi.displayName="_st";Object.defineProperties(ne.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:wi},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});Qe("__b",function(e,t){if(typeof t.type=="string"){var n,a=t.props;for(var i in a)if(i!=="children"){var r=a[i];r instanceof ne&&(n||(t.__np=n={}),n[i]=r,a[i]=r.peek())}}e(t)});Qe("__r",function(e,t){jt();var n,a=t.__c;a&&(a.__$f&=-2,(n=a.__$u)===void 0&&(a.__$u=n=function(i){var r;return gt(function(){r=this}),r.c=function(){a.__$f|=1,a.setState({})},r}())),Jt=a,jt(n),e(t)});Qe("__e",function(e,t,n,a){jt(),Jt=void 0,e(t,n,a)});Qe("diffed",function(e,t){jt(),Jt=void 0;var n;if(typeof t.type=="string"&&(n=t.__e)){var a=t.__np,i=t.props;if(a){var r=n.U;if(r)for(var s in r){var o=r[s];o!==void 0&&!(s in a)&&(o.d(),r[s]=void 0)}else r={},n.U=r;for(var c in a){var l=r[c],u=a[c];l===void 0?(l=ds(n,c,u,i),r[c]=l):l.o(u,i)}}}e(t)});function ds(e,t,n,a){var i=t in e&&e.ownerSVGElement===void 0,r=O(n);return{o:function(s,o){r.value=s,a=o},d:gt(function(){this.N=_i;var s=r.value.value;a[t]!==s&&(a[t]=s,i?e[t]=s:s?e.setAttribute(t,s):e.removeAttribute(t))})}}Qe("unmount",function(e,t){if(typeof t.type=="string"){var n=t.__e;if(n){var a=n.U;if(a){n.U=void 0;for(var i in a){var r=a[i];r&&r.d()}}}}else{var s=t.__c;if(s){var o=s.__$u;o&&(s.__$u=void 0,o.d())}}e(t)});Qe("__h",function(e,t,n,a){(a<3||a===9)&&(t.__$f|=2),e(t,n,a)});we.prototype.shouldComponentUpdate=function(e,t){var n=this.__$u,a=n&&n.s!==void 0;for(var i in t)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){var r=2&this.__$f;if(!(a||r||4&this.__$f)||1&this.__$f)return!0}else if(!(a||4&this.__$f)||3&this.__$f)return!0;for(var s in e)if(s!=="__source"&&e[s]!==this.props[s])return!0;for(var o in this.props)if(!(o in e))return!0;return!1};function Ee(e){return xe(function(){return O(e)},[])}function Ln(e){var t=te(e);return t.current=e,Jt.__$f|=4,xe(function(){return Mt(function(){return t.current()})},[])}var ps=function(e){queueMicrotask(function(){queueMicrotask(e)})};function gs(){fi(function(){for(var e;e=vi.shift();)bi.call(e)})}function _i(){vi.push(this)===1&&(k.requestAnimationFrame||ps)(gs)}function xi(e){var t,n,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=xi(e[t]))&&(a&&(a+=" "),a+=n)}else for(n in e)e[n]&&(a&&(a+=" "),a+=n);return a}function K(){for(var e,t,n=0,a="",i=arguments.length;n<i;n++)(e=arguments[n])&&(t=xi(e))&&(a&&(a+=" "),a+=t);return a}const Si=typeof Worker<"u"?Worker:void 0;class ki{constructor(t,n){this.sentMessageId=0,this.inflightRequests=0,this.deferClose=!1,this.worker=t,this.map=n}send(t,n,a){const i=this.sentMessageId++,r=this.worker,s={type:t,message:n,id:i};return r.postMessage(s,a),this.inflightRequests++,new Promise((o,c)=>{const l=new AbortController;r.addEventListener("message",u=>{const h=u.data;h.originId===i&&(this.inflightRequests--,this.inflightRequests===0&&this.deferClose&&this.worker.terminate(),h.type===this.map[t]?(l.abort(),o(h.message)):h.type==="error"&&(l.abort(),c(h.message)))},{signal:l.signal})})}sendAndForget(t,n,a){const i=this.sentMessageId++,r=this.worker,s={type:t,message:n,id:i};r.postMessage(s,a)}close(){this.inflightRequests===0?this.worker.terminate():this.deferClose=!0}}class ms{constructor(){this.state={destroyed:!1},this.fontWorker=new ki(new Si(new URL("/assets/font-worker.worker-D0ZdGAca.js",import.meta.url),{type:"module"}),{"update-fonts":"updated-fonts","subset-font":"subsetted-font","get-font-data":"got-font-data"}),this.fontFinalizationRegistry=new FinalizationRegistry(t=>{this.fontWorker.sendAndForget("update-fonts",{loadFonts:[],unloadFonts:[t]})})}async loadFonts(t,n=!0){if(this.state.destroyed)throw new DOMException("This GlyphtContext has been destroyed","InvalidStateError");return(await this.fontWorker.send("update-fonts",{loadFonts:t,unloadFonts:[]},n?t.map(a=>a.buffer):void 0)).fonts.map(a=>this.hydrateFont(a))}hydrateFont(t){const n=this.fontFinalizationRegistry,a=this.fontWorker,i=this.state,r=t.id;return t.destroy=async()=>{if(i.destroyed)return;const s=a.send("update-fonts",{loadFonts:[],unloadFonts:[r]});n.unregister(t),await s},n.register(t,r,t),t.subset=async s=>{if(i.destroyed)throw new DOMException("This font's GlyphtContext has been destroyed","InvalidStateError");if(s===null){const{data:o,format:c}=await a.send("get-font-data",r);return{familyName:t.familyName,subfamilyName:t.subfamilyName,format:c,data:o,styleValues:t.styleValues,axes:t.axes.map(l=>({type:"variable",tag:l.tag,name:l.name,value:{min:l.min,max:l.max,defaultValue:l.defaultValue}})),namedInstance:null,unicodeRanges:t.unicodeRanges}}return await a.send("subset-font",{font:r,settings:s})},t}destroy(){this.fontWorker.close(),this.state.destroyed=!0}}const ys=17,$n=e=>{const t=e.trim().split(/(?:,\s*)|(?:\s+)/);if(t.length===1&&t[0].length===0)return[];const n=[];for(const a of t){if(a.length>ys)return null;if(a.length===0)continue;const i=/^(?:u\+)?([0-9a-f]{1,6})(?:-(?:u\+)?([0-9a-f]{1,6}))?$/i.exec(a);if(!i){const s=/^(?:u\+)?([\da-f]{0,6})(\?{1,5})$/i.exec(a);if(!s)return null;const[,o,c]=s;if(o.length+c.length>6)return null;const l=o+"0".repeat(c.length),u=o+"f".repeat(c.length),h=Math.min(parseInt(l,16),1114111),g=Math.min(parseInt(u,16),1114111);if(!Number.isFinite(h)||!Number.isFinite(g))return null;n.push([h,g]);continue}const r=parseInt(i[1],16);if(!Number.isFinite(r))return null;if(typeof i[2]=="string"){const s=parseInt(i[2],16);if(!Number.isFinite(s))return null;n.push([r,s])}else n.push(r)}return n},Ti=e=>{const t=e.trim().split(/,\s*/);if(t.length===1&&t[0].length===0)return[];const n=[];for(const a of t){if(a.length===0)continue;const i=/(-?\d+(?:\.\d+)?)(?:-(-?\d+(?:\.\d+)?))?/.exec(a);if(!i)return null;const r=Number(i[1]);if(!Number.isFinite(r))return null;if(typeof i[2]=="string"){const s=Number(i[2]);if(!Number.isFinite(s))return null;n.push([r,s])}else n.push(r)}return n},bs=e=>{const t=[];for(let n=0;n<e.length;n++){const a=e[n];typeof a=="number"?t.push(`U+${a.toString(16)}`):t.push(`U+${a[0].toString(16)}-${a[1].toString(16)}`)}return t};var R;(function(e){e[e.Whitespace=0]="Whitespace",e[e.DefinitionKeyword=1]="DefinitionKeyword",e[e.OperatorKeyword=2]="OperatorKeyword",e[e.Keyword=3]="Keyword",e[e.PropertyName=4]="PropertyName",e[e.Paren=5]="Paren",e[e.Brace=6]="Brace",e[e.Punctuation=7]="Punctuation",e[e.String=8]="String",e[e.Number=9]="Number",e[e.Separator=10]="Separator"})(R||(R={}));class vs{constructor(t="  "){this.indent=0,this.listIndent=0,this.textLength=0,this.spans=[],this.indentString=t}pushSpan(t,n){this.spans.length>0&&this.spans[this.spans.length-1].type===n?this.spans[this.spans.length-1].text+=t:t.length>0&&this.spans.push({text:t,type:n}),this.textLength+=t.length}pushIndent(){this.pushSpan(this.indentString.repeat(this.indent),R.Whitespace)}pushSpace(){this.pushSpan(" ",R.Whitespace)}pushNewline(){this.pushSpan(`
`,R.Whitespace)}pushString(t){const n=t.includes('"'),a=n?t.replace(/(\\|'|\n)/g,"\\$1"):t.replace(/(\\|\n)/g,"\\$1");this.pushSpan(n?`'${a}'`:`"${a}"`,R.String)}atRule(t){this.pushSpan(t,R.DefinitionKeyword),this.pushSpace(),this.pushSpan("{",R.Brace),this.indent++,this.pushNewline()}endRule(){this.indent--,this.pushSpan("}",R.Brace),this.pushNewline(),this.pushNewline()}declaration(t){this.pushIndent(),this.pushSpan(t,R.PropertyName),this.pushSpan(":",R.Punctuation),this.pushSpace()}indentedList(){this.listIndent++,this.indent++,this.pushNewline(),this.pushIndent()}endIndentedList(){this.listIndent--,this.indent--}endDeclaration(){this.spans[this.spans.length-1].type===R.Whitespace&&this.spans.pop(),this.pushSpan(";",R.Separator),this.pushNewline()}keyword(t){this.pushSpan(t,R.Keyword),this.pushSpace()}number(t){this.pushSpan(String(t),R.Number),this.pushSpace()}string(t){this.pushString(t),this.pushSpace()}parenthesized(t){this.pushSpan(t,R.OperatorKeyword),this.pushSpan("(",R.Paren)}endParenthesized(){this.spans[this.spans.length-1].type===R.Whitespace&&this.spans.pop(),this.pushSpan(")",R.Paren),this.pushSpace()}comma(){this.spans[this.spans.length-1].type===R.Whitespace&&this.spans.pop(),this.pushSpan(",",R.Separator),this.listIndent>0?(this.pushNewline(),this.pushIndent()):this.pushSpace()}getString(){let t="";for(const n of this.spans)t+=n.text;return t}}const kn=(e,t)=>e.type==="single"&&t.type==="single"?e.value===t.value:e.type==="variable"&&t.type==="variable"?e.value.min===t.value.min&&e.value.max===t.value.max&&e.value.defaultValue===t.value.defaultValue:!1,ws=e=>{const t={};for(const i of e)Object.prototype.hasOwnProperty.call(t,i.familyName)?t[i.familyName].push(i):t[i.familyName]=[i];const n=(i,r)=>{if(i.tag!==r.tag)throw new Error(`Tried to union two different axes (${i.tag}, ${r.tag})`);return{tag:i.tag,name:i.name??r.name,min:Math.min(i.min,r.min),defaultValue:i.defaultValue,max:Math.max(i.max,r.max)}},a=[];for(const[i,r]of Object.entries(t)){const s=[];let o=null;const c=new Map,l=new Map,u=new Set,h=new Map;for(const d of r){const y={};if(o===null)o=Object.assign({},d.styleValues);else for(const p of["weight","width","italic","slant"])if(Object.prototype.hasOwnProperty.call(o,p)){if(!kn(o[p],d.styleValues[p])){for(const b of s)b.uniqueStyleValues[p]=o[p];delete o[p],y[p]=d.styleValues[p]}}else y[p]=d.styleValues[p];s.push({font:d,uniqueStyleValues:y});for(const p of d.axes){const b=l.get(p.tag);b?l.set(p.tag,n(p,b)):l.set(p.tag,Object.assign({},p))}for(const p of d.subsetCoverage)p.covered&&u.add(p.name);for(const p of d.features)h.has(p.tag)||h.set(p.tag,p);for(const p of d.namedInstances)for(const[b,w]of Object.entries(p.coords)){let _=c.get(b);_||(_=new Set,c.set(b,_)),_.add(w)}}const g={};for(const[d,y]of c){const p=Array.from(y);d==="slnt"?p.sort((b,w)=>w-b):p.sort((b,w)=>b-w),g[d]=p}const m=Array.from(u.values());m.sort((d,y)=>d.localeCompare(y));const v=[];for(const d of s)v.push({font:d.font,styleValues:d.uniqueStyleValues});v.sort((d,y)=>{const p=C=>{const N=d.styleValues[C]??o[C],j=y.styleValues[C]??o[C],W=N.type==="variable"?N.value.defaultValue:N.value,U=j.type==="variable"?j.value.defaultValue:j.value;return[W,U]},[b,w]=p("width");if(b!==w)return b-w;const[_,x]=p("weight");if(_!==x)return _-x;const[A,M]=p("italic");if(A!==M)return A-M;const[F,S]=p("slant");return F!==S?S-F:d.font.subfamilyName.localeCompare(y.font.subfamilyName)}),a.push({name:i,fonts:v,styleValues:o,axes:Array.from(l.values()),axisInstanceValues:g,features:Array.from(h.values()),namedSubsets:m})}return a},_s=e=>{if(e.length===0)return[];const t=[],n=[];for(let a=0;a<e.length;a++)t.push(0);e:for(;;){const a=[];for(let i=0;i<e.length;i++){const r=e[i];switch(r.type){case"single":case"variable":{a.push(r);break}case"multiple":{const s=r.value.ranges[t[i]];if(typeof s=="number")a.push({type:"single",tag:r.tag,value:s});else{if(typeof s>"u")throw new Error("Empty instanced range");a.push({type:"variable",tag:r.tag,value:{min:s[0],defaultValue:r.value.defaultValue,max:s[1]}})}break}}}n.push(a);for(let i=0;i<t.length;i++){const r=e[i],s=r.type==="multiple"?r.value.ranges.length:1;if(t[i]++,t[i]>=s){if(t[i]=0,i===t.length-1)break e}else break}}return n},xs=["Thin","Hairline","Extra(?:\\s|-)?Light","Ultra(?:\\s|-)?Light","Light","Normal","Regular","Book","Medium","Semi(?:\\s|-)?Bold","Demi(?:\\s|-)?Bold","Bold","Extra(?:\\s|-)?Bold","Ultra(?:\\s|-)?Bold","Black","Heavy","Extra(?:\\s|-)?Black","Ultra(?:\\s|-)?Black","Italic","Oblique","Ultra(?:\\s|-)?(?:Condensed|Narrow)","Extra(?:\\s|-)?(?:Condensed|Narrow)","(?:Condensed|Narrow)","Semi(?:\\s|-)?(?:Condensed|Narrow)","Semi(?:\\s|-)?(?:Expanded|Narrow)","Expanded","Extra(?:\\s|-)?Expanded","Ultra(?:\\s|-)?Expanded"],Ss=new RegExp(`(?:${xs.join("|")}\\s*)+$`,"g"),ks=new Map([[100,"Thin"],[200,"ExtraLight"],[300,"Light"],[400,"Regular"],[500,"Medium"],[600,"SemiBold"],[700,"Bold"],[800,"ExtraBold"],[900,"Black"],[950,"ExtraBlack"]]),Ts=new Map([[50,"UltraCondensed"],[62.5,"ExtraCondensed"],[75,"Condensed"],[87.5,"SemiCondensed"],[100,"Normal"],[112.5,"SemiExpanded"],[125,"Expanded"],[150,"ExtraExpanded"],[200,"UltraExpanded"]]),Fs=e=>{const t=new Map,n=a=>{switch(a){case"weight":return"wght";case"width":return"wdth";case"italic":return"ital";case"slant":return"slnt"}};for(const a of e)for(const i of a.fonts){if(!a.enableSubsetting){t.set(i.font.id,[null]);continue}const r=[];for(const[u,h]of Object.entries(a.axes))r.push({tag:u,...h});for(const[u,h]of Object.entries(a.styleValues))r.push({tag:n(u),...h});if(i.styleValues)for(const[u,h]of Object.entries(i.styleValues))r.push({tag:n(u),...h});let s=[];const o=a.includeCharacters;if(o==="all")s=["all"];else{const u=Array.isArray(o)?o:[o];for(const h of u){let g=h.name??null,m;if(typeof h.includeUnicodeRanges=="string"){if(m=$n(h.includeUnicodeRanges),!m)throw new Error(`Invalid Unicode ranges: ${h.includeUnicodeRanges}`)}else m=h.includeUnicodeRanges??[];(g===""||g===null)&&(m.length||(g=h.includeNamedSubsets.join("-"))),s.push({named:h.includeNamedSubsets,custom:m,charsetName:g})}}const c=_s(r),l=[];for(const u of c)for(let h=0;h<s.length;h++){const g=s[h];l.push({axisValues:u,features:a.features??{},unicodeRanges:g,charsetNameOrIndex:s.length===1?null:typeof g!="string"&&g.charsetName!==null?g.charsetName:h,preprocess:c.length*s.length>1})}t.set(i.font.id,l)}return t},As=e=>{const t=new Map,n=new Map;for(const a of e){let i=n.get(a.familyName);i||(i={axes:new Map,styleValues:{}},n.set(a.familyName,i));const{axes:r,styleValues:s}=i;let o=t.get(a.familyName);o||(o={varyingAxes:new Set,varyingStyleValues:{weight:!1,width:!1,italic:!1,slant:!1}},t.set(a.familyName,o));const{varyingAxes:c}=o;for(const l of a.axes){const u=r.get(l.tag);u?kn(u,l)||c.add(l.tag):r.set(l.tag,l)}for(const l of["italic","slant","weight","width"]){const u=a.styleValues[l];if(!((l==="italic"||l==="slant")&&u.type==="single"&&u.value===0)){if(!s[l]){s[l]=u;continue}kn(s[l],u)||(o.varyingStyleValues[l]=!0,s[l]=u)}}}return t},Cs=e=>{const t=As(e.map(a=>a.font)),n=new Map;for(const{font:a,charsetNameOrIndex:i,overrideName:r}of e){const s=t.get(a.familyName);n.set(a,Ns(a,s.varyingAxes,s.varyingStyleValues,i,r))}return n},L=e=>Math.round(e*1e3)/1e3,Ns=(e,t,n,a,i)=>{const{weight:r,width:s,italic:o,slant:c}=e.styleValues;let u=(i??e.familyName.replace(Ss,"").replaceAll(" ","")).replaceAll(" ","");if(e.namedInstance&&e.namedInstance.subfamilyName)u+=`-${e.namedInstance.subfamilyName.replaceAll(" ","-")}`;else{if(s.type==="single"){const g=Math.round(s.value*2)/2;g!==100&&(u+=`-${Ts.get(g)??g}`)}else n.width&&(u+=`-wdth${L(s.value.min)}_${L(s.value.max)}`);r.type==="single"?u+=`-${ks.get(L(r.value))??L(r.value)}`:n.weight&&(u+=`-wght${L(r.value.min)}_${L(r.value.max)}`);for(const g of e.axes)t.has(g.tag)&&(g.type==="single"?u+=`-${g.tag}${L(g.value)}`:u+=`-${g.tag}${L(g.value.min)}_${L(g.value.max)}`);let h="";c.type==="variable"?n.slant&&(h=`slnt${L(c.value.min)}_${L(c.value.max)}`):o.type==="variable"?n.italic&&(h=`ital${L(o.value.min)}_${L(o.value.max)}`):n.italic||n.slant?(n.italic&&(h+=`ital${L(o.value)}`),n.slant&&(h+=`slnt${L(c.value)}`)):o.value!==0?h="Italic":c.value!==0&&(h="Oblique"),h.length>0&&(u+=`-${h}`)}return typeof a=="string"?u+=`-${a}`:typeof a=="number"&&(u+=`-charset${a}`),u=u.replace(/[\x00-\x1f\x80-\x9f/\\?<>:*|"]/g,"_"),u},Hn=(e,t,n)=>{const a=new vs;t.length>0&&!t.endsWith("/")&&(t+="/");for(const{font:i,data:r,filename:s,charsetNameOrIndex:o,overrideName:c}of e){a.atRule("@font-face"),a.declaration("font-family"),a.string(c??i.familyName),a.endDeclaration(),a.declaration("font-display"),a.keyword("swap"),a.endDeclaration(),a.declaration("font-style");const{width:l,weight:u,italic:h,slant:g}=i.styleValues;g.type==="variable"?(a.keyword("oblique"),a.number(`${-L(g.value.min)}deg`),a.number(`${-L(g.value.max)}deg`)):h.type==="variable"?(a.keyword("oblique"),a.number("0deg"),a.number("14deg")):h.value!==0&&Math.abs(g.value+9.4)<1e-4?a.keyword("italic"):g.value!==0?(a.keyword("oblique"),a.number(`${-L(g.value)}deg`)):a.keyword("normal"),a.endDeclaration(),a.declaration("font-weight"),u.type==="variable"?(a.number(L(u.value.min)),a.number(L(u.value.max))):a.number(L(u.value)),a.endDeclaration(),a.declaration("font-stretch"),l.type==="variable"?(a.number(L(l.value.min)),a.number(L(l.value.max))):a.number(L(l.value)),a.endDeclaration(),a.declaration("src");const m=Number(r.opentype!==null&&n)+ +(r.woff!==null)+ +(r.woff2!==null);if(m>1&&a.indentedList(),m===1&&r.opentype&&!n)throw new Error("includeUncompressed is false, but there is no compressed font file to include instead");for(const v of["woff2","woff","opentype"])if(!(v==="opentype"&&!n)&&r[v]){a.parenthesized("url");let d=v;v==="opentype"&&(d=i.format==="opentype"?"otf":"ttf"),a.string(t+s+"."+d),a.endParenthesized(),a.parenthesized("format"),a.string(v==="opentype"?i.format:v),a.endParenthesized(),a.comma()}if(a.spans.pop(),a.spans.pop(),m>1&&a.endIndentedList(),a.endDeclaration(),o!==null){a.declaration("unicode-range");const v=bs(i.unicodeRanges);for(let d=0;d<v.length;d++)a.number(v[d]),d!==v.length-1&&a.comma();a.endDeclaration()}a.endRule()}return a},Is=async(e,t,{formats:n,woffCompression:a=15,woff2Compression:i=11,onProgress:r})=>{const s=[],o=Fs(t);for(const y of t)for(const p of y.fonts){const b=o.get(p.font.id);for(const w of b)s.push({font:p.font,overrideName:y.overrideName,settings:w})}const c=1,l=await(e==null?void 0:e.getParallelism())??1,u=2*a/Math.min(l,s.length),h=32/Math.min(l,s.length);let g=0;for(const y of s)y.settings&&(g+=c);n.woff&&(g+=u*s.length),n.woff2&&(g+=h*s.length);let m=0;r==null||r(0);let v=!1;const d=s.map(async({font:y,overrideName:p,settings:b})=>{const w=await y.subset(b);if(v)throw new Error("Aborted");const _={opentype:n.ttf?w.data:null,woff:null,woff2:null};m+=c,r==null||r(m/g);const x=[];if((n.woff||n.woff2)&&e===null)throw new Error("woff or woff2 formats enabled but no compression context provided");return n.woff&&x.push(e.compressFromTTF(w.data,"woff",a).then(A=>{if(v)throw new Error("Aborted");m+=u,r==null||r(m/g),_.woff=A})),n.woff2&&x.push(e.compressFromTTF(w.data,"woff2",i).then(A=>{if(v)throw new Error("Aborted");m+=h,r==null||r(m/g),_.woff2=A})),x.length>0&&await Promise.all(x),{font:w,overrideName:p,filename:"",data:_,charsetNameOrIndex:b?b.charsetNameOrIndex:null,extension:A=>A==="opentype"?w.format==="opentype"?"otf":"ttf":A}});return Promise.all(d).then(y=>{const p=Cs(y);for(const b of y){const w=p.get(b.font);b.filename=w}return y},y=>{throw v=!0,y})},Ms="modulepreload",js=function(e){return"/"+e},Sa={},Tn=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),o=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=Promise.allSettled(n.map(c=>{if(c=js(c),c in Sa)return;Sa[c]=!0;const l=c.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const h=document.createElement("link");if(h.rel=l?"stylesheet":Ms,l||(h.as="script"),h.crossOrigin="",h.href=c,o&&h.setAttribute("nonce",o),document.head.appendChild(h),l)return new Promise((g,m)=>{h.addEventListener("load",g),h.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(s){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s}return i.then(s=>{for(const o of s||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})};let Ue=null;const Os=async()=>{if(Ue!==null)return Ue;if(Ue=2,typeof navigator=="object"&&typeof navigator.hardwareConcurrency=="number")Ue=navigator.hardwareConcurrency;else try{const e=await Tn(()=>import("./__vite-browser-external-BIHI7g3E.js"),[]);typeof e.availableParallelism=="function"?Ue=e.availableParallelism():typeof e.cpus=="function"&&(Ue=e.cpus().length)}catch{}return Ue},Es=async e=>{let t,n;if(typeof e=="string")try{t=new URL(e)}catch{n=e}else t=e;if(t)try{t.protocol==="file:"&&(n=(await Tn(async()=>{const{fileURLToPath:a}=await import("./__vite-browser-external-BIHI7g3E.js");return{fileURLToPath:a}},[])).fileURLToPath(t))}catch{}if(n)try{const a=await(await Tn(async()=>{const{readFile:i}=await import("./__vite-browser-external-BIHI7g3E.js");return{readFile:i}},[])).readFile(n);return new Uint8Array(a.buffer,a.byteOffset,a.byteLength)}catch{}if(!t)throw new Error(`Your runtime does not support any loading strategy for ${e}.`);return new Uint8Array(await(await fetch(t)).arrayBuffer())};class Rs{constructor(t){this.queuedOperations=[],this.workers=t,this.allWorkers=t.slice(0)}doWork(){for(;this.workers.length>0&&this.queuedOperations.length>0;){const t=this.queuedOperations.pop(),n=this.workers.pop(),a=()=>{this.workers.push(n),queueMicrotask(()=>{this.doWork()})};t.fn(n).then(i=>{a(),t.resolve(i)},i=>{a(),t.reject(i)})}}enqueue(t){let n,a;const i=new Promise((r,s)=>{n=r,a=s});return this.queuedOperations.push({resolve:n,reject:a,fn:t}),this.doWork(),i}destroy(){for(const t of this.allWorkers)t.close();this.allWorkers.length=0}}class Kt{constructor(t){this.destroyed=!1;const n=t??Os();this.parallelism=n,this.pool=(async()=>{const a=[new URL("/assets/woff1-cIEDPCmM.wasm",import.meta.url),new URL("/assets/woff2-B-yPUfQi.wasm",import.meta.url)],[i,r]=await Promise.all(a.map(o=>Es(o))),s=[];for(let o=0,c=await n;o<c;o++){const l=new Si(new URL("/assets/compression-worker.worker-C8q3gMSN.js",import.meta.url),{type:"module"}),u=new ki(l,{"compress-font":"compressed-font","decompress-font":"decompressed-font"});u.sendAndForget("init-woff-wasm",{woff1:i,woff2:r}),s.push(u)}return new Rs(s)})()}async getParallelism(){return await this.parallelism}checkDestroyed(){if(this.destroyed)throw new DOMException("This WoffCompressionContext has been destroyed","InvalidStateError")}async compressFromTTF(t,n,a){return this.checkDestroyed(),await(await this.pool).enqueue(async r=>await r.send("compress-font",{data:t,algorithm:n,quality:a}))}async decompressToTTF(t){this.checkDestroyed();const n=Kt.compressionType(t);if(n===null)throw new Error("This font file is not compressed");return await(await this.pool).enqueue(async i=>await i.send("decompress-font",{data:t,algorithm:n}))}static compressionType(t){if(t.length<4)return null;const n=t[3]|t[2]<<8|t[1]<<16|t[0]<<24;return n===2001684038?"woff":n===2001684018?"woff2":null}destroy(){this.pool.then(t=>t.destroy()),this.destroyed=!0}}const ka={aalt:{title:"Access All Alternates",registered:"Adobe",done:!0,description:`Allows the end user to access glyphs which are either not available, or not
easily available, via other feature applications. The expectation is that this
feature will allow substituting a glyph with all possible "alternative" forms
of the glyph provided in the font: for example, for the glyph \`a\`, it will
provide a substitution to small capital forms, swash alternates, superior forms,
and so on. This is normally achieved through one-from-many (GSUB3) substitutions,
but where only a single alternate is provided, the use of a one-to-one (GSUB1)
substitution may be appropriate.


A layout application will not apply this feature in the ordinary course of layout,
but may use it to implement a "glyph picker" interface allowing the end user
to choose the desired substitution, or to cycle through the alternates available
for a glyph. Because of way that the layout application will apply this feature,
it is undefined what would happen to lookup types other than GSUB1 and GSUB3 if
placed inside an \`aalt\` feature.


*Note*: AFDKO feature syntax offers special handling of the \`aalt\` feature.
Within the context an \`aalt\` feature block, the \`feature\` keyword can be used
to reference the lookups of other features, arrange any GSUB1 or GSUB3 rules
within those lookups by glyph, and combine them into one-from-many rules.
This allows the engineer to more easily generate an \`aalt\` feature by
combining the effects of other features.


For example, given a feature \`smcp\` which contains the rule \`sub b by B.sc;\` and a
feature \`salt\` which contains the rule \`sub b by b.alt;\`, the effect of


\`\`\`fea
feature aalt {
  feature salt;
  feature smcp;
} aalt;
\`\`\`

would be to create the rule \`sub b from [b.alt B.sc];\`.
`,fea:`feature aalt {
  feature salt;
  feature smcp;
  feature swsh;
  sub quoteleft by quoteleft.fr;
  sub quoteright by quoteright.fr;
} aalt;
`,automatic:!0,state:"discretionary",ui:`In the OS X typography panel, this feature is accessed via "Glyph Variants".
`,status:null},abvf:{title:"Above-base Forms",registered:"Microsoft",group:"Orthographic",script:{INDIC:{order:5},khmr:{order:3},USE:{order:0}},description:`Replaces above-base forms with special forms. This feature is applied by
Indic, Khmer and USE complex shapers as part of the orthographic unit
shaping phase. The context of application is restricted to a syllabic cluster.


This feature was originally intended for a specific use case in Khmer, the
OE vowel sign (U+17BE, ◌ើ), which has pre-base and above-base components.
The shaping engine [decomposes](https://github.com/n8willis/opentype-shaping-documents/blob/master/opentype-shaping-khmer.md#22-matra-decomposition)
U+17BE into a pair of characters, U+17C1 (េ) and U+17BE (again). It then
reorders the syllable to put the pre-base vowel part before the base consonant,
leaving the U+17BE after the base. The font is responsible for turning the
remaining ◌ើ glyph into the above-base part (ី), hence the example
implementation below.


However, more generally, this feature is a good home for above-base
substitutions such as choosing alternate widths of an above-base vowel mark.


See also \`abvs\` which applies to the whole run, rather than per-cluster.
`,fea:`feature abvf {
  sub uni17BE by uni17B8;
} abvf;
`,state:"required",done:!0,example:{font:"Noto Sans Khmer",text:"យល់ឃើញ"},status:null},abvm:{title:"Above-base Mark Positioning",registered:"Microsoft",group:"Common",description:"This feature allows for mark positioning, similar to the `mark` feature; it\nwas intended for positioning marks which are placed over a base consonant in\na syllabic script, but while the OpenType Specification describes this feature\nas being used for Indic scripts, Harfbuzz applies the `abvm` feature as\npart of common feature processing for all scripts.\n\n\nThe only distinction between this feature and the `mark` feature is a subtle\none: in `abvm` processing, any ZWJ characters are skipped when matching input\nand any ZWNJ characters are skipped when matching context, whereas in `mark`\nprocessing, ZWJ/ZWNJ characters are not skipped. Other than that, the choice\nof `abvm` versus `mark` is a matter of notational convenience for the engineer.\n\n\nSee also `blwm`.\n",automatic:!0,done:!0,state:"required",example:{font:"Hind",text:"कंसं"},status:null},abvs:{title:"Above-base Substitutions",registered:"Microsoft",group:"Typographic",script:{INDIC:{order:0},khmr:{order:0},USE:{order:0},mym2:{order:0}},description:`This feature is intended for substituting base glyphs and above marks with ligature forms, but may be used for any standard typographic substitutions; engineers may wish to restrict its use to substitutions concerning above-base marks for organisational purposes. As a typographic substitution, it will be applied after the \`abvf\` feature.

This feature is applied by the shaper as part of the standard typographic presentation phase for Indic scripts, Khmer, Myanmar, and scripts using the Universal Shaping Engine. It is applied with a per-syllable context for Indic scripts, but applied across the whole run in other scripts.
`,fea:`feature abvs {
  sub eCandraMatra-gujarati candraBindu-gujarati by eCandraMatraCandraBindu-gujarati;
  sub eMatra-gujarati candraBindu-gujarati by eMatraCandraBindu-gujarati;
  sub aiMatra-gujarati candraBindu-gujarati by aiMatraCandraBindu-gujarati;
  # ...
} abvs;
`,done:!0,state:"required",example:{font:"Hind",text:"रृ"},status:null},afrc:{title:"Alternative Fractions",registered:"Microsoft",state:"discretionary",description:`This feature is intended to provide alternative forms of a fraction; the feature should match numerals surrounded by a slash, and substitute them with a nut fraction.
`,fea:`feature afrc {
  sub one slash two by onehalf.nut;
} afrc;
`,ui:`In the OS X typography panel, this feature is accessed via "Contextual Fractional Forms -> Vertical."
`,done:!0,example:{font:"Recursive",text:"1/2"},status:null},akhn:{group:"Preprocessing",script:{INDIC:{order:2},USE:{order:0}},title:"Akhand",registered:"Microsoft",state:"required",description:`This feature is intended to process ligatures of base characters in Indic scripts and scripts using the Universal Shaping Engine. It was designed for the processing of "Akhand" (unbreakable) character sequences in Devanagari, but may also be used for any substitutions which need to be applied early in the shaping process.
`,fea:`feature akhn {
  sub ka-deva halant-deva ssa-deva by kssa-deva;
  sub ja-deva halant-deva nya-deva by jnya-deva;

  sub ra-deva' halant-deva' zerowidthjoiner by eyelash-deva;
} akhn;
`,done:!0,example:{font:"Hind",text:"क्ष"},status:null},blwf:{title:"Below-base Forms",registered:"Microsoft",group:"Orthographic",script:{INDIC:{order:4},khmr:{order:2},USE:{order:0},mym2:{order:3}},description:`Replaces below-base forms with special forms. This feature is applied by
Indic, Khmer, Myanmar and USE complex shapers as part of the orthographic unit
shaping phase. The context of application is restricted to a syllabic cluster.


This is intended to be used for halant conjuncts, where consonant-virama-consonant
sequences cause the second consonant to be displayed below the first.


Note that in the Indic shaper, this feature is used as a "signal" to the shaping engine for reordering
purposes: that is, if a virama-consonant pair would be substituted by this feature,
then that consonant is placed in the below-base position when the syllable is reordered.


See also \`blws\` which applies to the whole run, rather than per-cluster.
`,fea:`feature blwf {
  sub virama-myanmar @consonant by @conjunct_consonant;
} blwf;
`,state:"required",done:!0,status:null},blwm:{title:"Below-base Mark Positioning",registered:"Microsoft",group:"Common",description:"This feature allows for mark positioning, similar to the `mark` feature; it\nwas intended for positioning marks which are placed below a base consonant in\na syllabic script, but while the OpenType Specification describes this feature\nas being used for Indic scripts, Harfbuzz applies the `blwm` feature as\npart of common feature processing for all scripts.\n\n\nThe only distinction between this feature and the `mark` feature is a subtle\none: in `blwm` processing, any ZWJ characters are skipped when matching input\nand any ZWNJ characters are skipped when matching context, whereas in `mark`\nprocessing, ZWJ/ZWNJ characters are not skipped. Other than that, the choice\nof `blwm` versus `mark` is a matter of notational convenience for the engineer.\n\n\nSee also `abvm`.\n",state:"required",automatic:!0,done:!0,status:null},blws:{title:"Below-base Substitutions",registered:"Microsoft",group:"Typographic",script:{INDIC:{order:0},khmr:{order:0},USE:{order:0},mym2:{order:0}},description:`This feature is intended for substituting base glyphs and below marks
with ligature forms, but may be used for any standard typographic
substitutions; engineers may wish to restrict its use to substitutions
concerning below-base marks for organisational purposes. As a typographic
substitution, it will be applied after the \`blwf\` feature.


This feature is applied by the shaper as part of the standard typographic
presentation phase for Indic scripts, Khmer, Myanmar, and scripts using the
Universal Shaping Engine. It is applied with a per-syllable context for
Indic scripts, but applied across the whole run in other scripts.
`,fea:`feature blws {
    sub dvRA dvmU  by dvRA_mU;
    sub dvRA dvmUU by dvRA_mUU;
    sub dvHA dvmU  by dvHA_mU;
    sub dvHA dvmUU by dvHA_mUU;
    sub dvDA  dvmvR by dvDA_mvR;
    sub dvSHA dvmvR by dvSHA_mvR;
    sub dvHA  dvmvR by dvHA_mvR;
} blws;
`,done:!0,state:"required",status:null},c2pc:{title:"Petite Capitals From Capitals",registered:"Tiro Typeworks / Emigre",state:"discretionary",description:"Substitutes capital characters for petite capitals. See the `pcap` feature for a description of petite capitals. See also `c2sc`.\n",fea:`feature c2pc {
  sub A by A.pc;
  sub B by B.pc;
  # ...
} c2pc;
`,ui:`In the OS X typography panel, this feature is accessed via "Uppercase ->
Petite Capitals."


In CSS, this feature can be set with \`font-variant-caps: all-petite-caps;\`
(although this also turns on \`pcap\`.)
`,example:{font:"EB Garamond",text:"NASA and the FBI"},done:!0,status:null},c2sc:{title:"Small Capitals From Capitals",registered:"Adobe",state:"discretionary",automatic:!0,description:"Substitutes capital characters for small capitals. Small capitals are often used to set acronyms. Compare with `smcp`, which substitutes lowercase letters for small capitals.\n",fea:`feature c2sc {
  sub A by A.sc;
  sub B by B.sc;
  # ...
} c2sc;
`,example:{font:"EB Garamond",text:"NASA and the FBI"},ui:`In the OS X typography panel, this feature is accessed via "Uppercase ->
Small Capitals." In Adobe applications, this feature is accessed via "All
Small Caps" in the OpenType panel (although this also turns on \`smcp\`).


In CSS, this feature can be set with \`font-variant-caps: all-small-caps;\`
(although this also turns on \`smcp\`).
`,done:!0,status:null},calt:{title:"Contextual Alternates",registered:"Adobe",state:"default",group:"Typographic",description:`This feature is used to substitute glyphs with alternate forms, generally on
a contextual basis. For example, a script font may wish to use joining forms
of the letter \`o\` when followed by another letter starting at the x-height.


This feature is processed as part of the standard typographic presentation group;
in the Indic and Arabic complex shapers, it is processed as part of the language
form group.
`,fea:`feature calt {
  sub T' @letter by T.wide;
  sub o' space by o.swash;
  sub o' [i k m n o] by o.join;
  sub [f o t v w] s' by s.noinstroke;
} calt;
`,example:{font:"Kristi",text:"Two hoots!"},done:!0,ui:`In the OS X typography panel, this feature is accessed via "Contextual Alternates -> Contextual Alternates." In Adobe applications, this feature is accessed via "Contextual Alternates" in the OpenType panel.
`,status:null},case:{title:"Case-Sensitive Forms",state:"discretionary",group:"Typographic",registered:"Adobe",automatic:!0,description:`This features is intended to reposition glyphs (either by substitution or
positioning), particularly punctuation glyphs, so that they are better
aligned within all-capital sequences or sequences of lining numerals.
It should also change oldstyle numerals to lining numerals.


Note that while it was hoped that layout engines would automatically apply
this feature within all-capital sequences, this is not currently known to
be automatically applied, and must be applied manually by the typesetter.
`,done:!0,fea:`feature case {
  sub [guillemotleft guillemotright hyphen] by [guillemotleft.cap guillemotright.cap hyphen.cap];
} case;
`,example:{font:"Zilla Slab",text:"«A-Za-z»"},ui:`In the OS X typography panel, this feature is accessed via "Case-Sensitive Layout -> Capital Forms."
`,status:null},ccmp:{state:"required",title:"Glyph Composition/Decomposition",registered:"Microsoft",group:"Common",order:0,description:`After OpenType normalization but before the processing of other features,
it may be useful to decompose single glyphs into sequences, or combine
sequences into a single glyph. For example:


* In Arabic fonts, treating the rasm letters and the nukta dots separately
allows for more flexible positioning and reduces the number of glyphs which
need to be drawn. Using rules such as \`sub beh-ar by behDotless-ar dotbelow;\`
in the \`ccmp\` feature decomposes the dots into separate glyphs.

* The i acute character (í, U+00ED) is normalized to U+0069 U+0301 (i acutecomb).
However, as the acute replaces the tittle on the \`i\`, it is useful to substitute
this for a dotless form: \`sub i' acutecomb by idotless;\`.

* Conversely, multiple glyphs may be combined into one. In Tibetan, stacked
letters such as གྷ (U+0F43) have their own Unicode codepoints, but can
alternatively be encoded in documents using the decomposed form U+0F42 (ག)
◌ྷ (U+0FB7). These two encodings can be unified in the font with a rule such
as \`sub uni0F42 uni0FB7 by uni0F43;\`.
`,fea:`feature ccmp {
  sub alefHamzaabove-ar by alef-ar hamzaabove-ar;
  sub alefHamzabelow-ar by alef-ar hamzabelow-ar;
  sub beh-ar by behDotless-ar dotbelow-ar;
  sub teh-ar by behDotless-ar twodotsabove-ar;
  sub theh-ar by behDotless-ar threedotsabove-ar;
  sub jeem-ar by hah-ar dotbelow-ar;
  sub khah-ar by hah-ar dotabove-ar;
  ...
} ccmp;
`,done:!0,status:null},cfar:{state:"required",script:{khmr:{order:5}},group:"Orthographic",title:"Conjunct Form After Ro",registered:"Microsoft",status:"discouraged",description:`This feature is only applied during orthographic unit shaping in the Khmer
complex shaper. In Khmer, the conjunct form of the letter ro (after a
coeng) is reordered to the left of the base consonant and displayed as a
deep letterform which can interact with below-base glyphs. This feature
was intended as offering an opportunity to fix up below-base glyphs to
avoid clashing with the coeng ro.


No examples of the use of this feature have been found. Consider using
\`blws\` instead.
`,done:!0},chws:{state:"discretionary",title:"Contextual Half-width Spacing",registered:"Adobe/W3C",description:`Layout engines which correctly support advanced typographic layout for CJK
(see [JLREQ](https://www.w3.org/TR/jlreq/), [CLREQ](https://www.w3.org/TR/clreq),
[KLREQ](https://www.w3.org/TR/klreq/)) will contain code to adjust the spacing
of glyphs in certain circumstances. For example, punctuation sequences such as
\`。」\` should be set with the full-stop taking up a half-em width instead of
a full em.

This feature is intended to improve the appearance of text set with software
which does *not* implement these spacing adjustments, by moving the spacing
logic into the font.

This feature is relatively new as of 2021, and no implementations have been
identified.
`,fea:`feature chws {
  pos [comma-han period-han] -500 @closing_bracket;
  pos @closing_bracket -500 [comma-han period_han];
  pos [comma-han period-han @closing_bracket] 500 @opening_bracket;
  pos @opening_bracket <500 0 0 0> @opening_bracket;
  pos @closing_bracket @closing_bracket <-500 0 0 0>;
} chws;
`,done:!0,status:null},cjct:{title:"Conjunct Forms",script:{INDIC:{order:9},USE:{order:7}},group:"Orthographic",registered:"Microsoft",state:"required",description:`This feature is applied to Indic scripts and scripts using the Universal
Shaping Engine as the final feature in the orthographic unit shaping phase,
before final reordering. It was intended for use in creating consonant
conjunct groups. (Consonant + Virama + Consonant.)  The context of application
is restricted to a syllabic cluster.


The difference between this feature and \`blwf\` is that the \`blwf\` feature
is intended for substituting the "tail" (virama + consonant) for a below-base
form, while this feature is intended for substituting the entire sequence
with a ligature.
`,fea:`feature cjct {
    # Actual implementation will depend on conjunct glyphs provided in your font.
    sub nga-deva virama-deva ga-deva by ngga-deva;
    sub nga-deva virama-deva ma-deva by ngma-deva;
    sub nga-deva virama-deva ya-deva by ngya-deva;
    sub tta-deva virama-deva tta-deva by tttta-deva;
    sub tta-deva virama-deva ya-deva by ttya-deva;
    # ...
} cjct;
`,done:!0,example:{font:"Noto Sans Devanagari",text:"ङ्म"},status:null},clig:{title:"Contextual Ligatures",registered:"Adobe",group:"Typographic",state:"default",script:{khmr:{order:5}},done:!0,description:`This feature has two distinct uses.


It was originally intended for ligature forms which are contextual in nature,
for example, for Latin script fonts, and typically made up of GSUB lookup 8 rules.
However, these rules may also be placed in other discretionary ligature
features, such as \`rlig\` or \`liga\`, and these should be used instead. As such
this use is relatively rare.


Separately, in the Khmer complex shaper, this is a mandatory feature used
for "ligatures that are desired for typographical correctness". It is
therefore used widely in Khmer fonts for general typographic shaping.
`,fea:`feature clig {
  sub kho-khmer.conjunct aaSign-khmer by kho-khmer.conjunct.aa;
  sub kho-khmer.conjunct auSign-khmer by kho-khmer.conjunct.au;
  # ...
  sub nyo-khmer' @conjuncts by nyo-khmer.alt;
  sub nyo-khmer.alt nyo-khmer.conjunct' by nyo-khmer.conjunct.alt;
  # ...
}
`,status:null},cpct:{title:"Centered CJK Punctuation",description:`This feature is intended to center punctuation (typically the ideographic
comma 、 and ideographic full stop 。) in Chinese fonts. Where presented, it
is often implemented as GPOS lookup 1 positioning rules to place these
glyphs within the center of the em square.
`,example:{text:"か、か",font:"Feature Sans"},registered:"Adobe",done:!0,fea:`feature cpct {
   pos comma-han <328 350 0 0>;
   pos period-han <359 350 0 0>;
} cpct;
`,state:null,status:null},cpsp:{title:"Capital Spacing",registered:"Adobe",state:"discretionary",description:`This feature inserts a small around of space (order of 5-10 units for a typical
font) around capital letters to improve the setting of all-capital runs.
`,example:{font:"Grenze",text:"AAWW"},fea:`feature cpsp {
  pos @capitals <5 0 10 0>;
} cpsp;
`,ui:`In the OS X typography panel, this feature is accessed via "Case-Sensitive
Layout > Capital Spacing".
`,done:!0,status:null},cswh:{title:"Contextual Swash",registered:"Adobe",state:"discretionary",description:"This feature is similar to the `swsh` (Swash) feature, but is intended to be\nused for contextual (conditional) swash substitutions. For example, while\nAdobe Garamond Pro Italic uses the `swsh` feature to substitute *all*\ncapitals for swash forms, it uses the `cswh` feature to conditionally change\nonly capitals preceding a lowercase into swash forms.\n",fea:`feature cswh {
  sub @capitals' @lowercase by @capitals.swsh;
} cswh;
`,example:{font:"Work Sans",text:"WOWSERS!"},ui:'In the OS X typography panel, this feature is accessed via "Contextual Alternates > Contextual Swash Alternates".',done:!0,status:null},curs:{automatic:!0,title:"Cursive Positioning",registered:"Microsoft",state:"required",group:"Positioning",description:`This feature is used to position glyphs with cursive connections.


Certain scripts, in particular Arabic, are "connected" scripts, where the
start of a character has its position adjusted relative to the end of the previous
character. In font editors, this is normally defined by setting "exit" and
"entry" anchor points. These are then converted to GPOS 3 cursive positioning
rules.


While this feature is not mandatory for designers - some styles of Arabic
are aligned along the baseline, and so glyphs do not need to be repositioned
- it is applied by default if present, and is not specific to Arabic script.
It is not impossible, but exceptionally uncommon, to use this feature for
connected "cursive" Latin fonts, and is often unnecessary because of the
presence of a fixed baseline in Latin.
`,example:{font:"Aref Ruqaa",text:"سمر"},done:!0,fea:`feature curs {
  pos cursive uni066F.medi <anchor 606 35> <anchor 0 35>;
  pos cursive uni0640 <anchor 250 35> <anchor 0 35>;
  pos cursive uni06A1.medi <anchor 606 35> <anchor 0 35>;
  # ...
} curs;
`,status:null},cv01:{title:"Character Variant 1 – Character Variant 99",registered:"Microsoft",state:"discretionary",automatic:!0,description:`These features - ranging from \`cv01\` to \`cv99\` - allow for stylistic variations
of individual characters.

They are similar to the Stylistic Set (\`ss01\`--\`ss20\`) features, but (as their)
name implies, stylistic sets are intended to allow a *set* of glyphs to
vary in a common way (for example, straightening the "leg" of glyphs such as
\`hnm\`, or overlining \`MCXLVI\`  characters to form Roman numerals).
Character variant features, on the other hand, do not imply any common
variations across a range of glyphs.


When this feature is coded manually, character variant features may be given
identifying names to be displayed in the user interface. See the
[Adobe feature file specification](http://adobe-type-tools.github.io/afdko/OpenTypeFeatureFileSpecification.html#8.d)
for the format of these names.
`,example:{font:"Source Code Pro",text:"Java"},fea:`feature cv01 {
  cvParameters {
      FeatUILabelNameID {
          name 3 1 0x0409 "single-storey a";
          name 1 0 0 "single-storey a";
      };
      Character 0x61;
  }
  sub a by a.cv01;
} cv01;
`,ui:'In the OS X typography panel, this feature is accessed via "Glyph Variants".\nIn CSS, this feature is accessed through the [`font-variant-alternates`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates) property.\n',done:!0,status:null},dist:{title:"Distances",registered:"Microsoft",state:"required",group:"Positioning",description:'This feature provides positional adjustments between glyphs. It is largely\nequivalent to the `kern` feature, but should be considered as "required"\nkerning in that no user interface is provided to disable it.',done:!0,example:{font:"Noto Sans Devanagari",text:"दॗकॗ"},status:null},dlig:{title:"Discretionary Ligatures",registered:"Adobe",state:"discretionary",description:`This feature is used for additional typographic ligatures which are selectable
by the end-user.
`,ui:`In the OS X typography panel, this feature is accessed via "Ligatures -> Rare
Ligatures." (Not to be confused with the \`rlig\` feature, which is for required
ligatures...) In Adobe applications, this feature is
accessed via "Discretionary Ligatures" in the OpenType panel.


In CSS, this feature can be accessed through the [\`font-variant-ligatures\`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures) property.
`,fea:`sub dlig {
  sub t h by t_h;
  sub p p by p_p;
} dlig;
`,example:{font:"Allura",text:"coppersmith"},done:!0,status:null},dnom:{title:"Denominators",automatic:!0,state:"discretionary",status:"deprecated",registered:"Adobe",description:'This deprecated feature replaces numeric glyphs with denominator forms. See also `numr`.\n\nNote that, despite the description of this feature in the OpenType specification,\nthe application of the `frac` feature is independent of this feature. It was\noriginally intended that applying the `frac` feature would "trigger" the\napplication of the `numr` feature for glyphs before the division slash and\nthe `dnom` feature for glyphs after it. This behavior was never implemented in\nOpenType shaping, and instead contextual rules are used within the `frac` feature\nto choose appropriate glyphs for numerator and denominator.\n\nNew fonts should use the `frac` feature in preference to this feature.\n',done:!0},dtls:{title:"Dotless Forms",script:{math:null},registered:"Microsoft",description:`This feature is used by a math layout handler to substitute glyphs by dotless
forms when accents are to be added to the base character.
`,fea:`feature dtls {
  sub i by i.dotless;
  sub j by j.dotless;
  sub uni2148 by uni2148.dotless;
  sub uni2149 by uni2149.dotless;
  sub u1D422 by u1D422.dotless;
  sub u1D423 by u1D423.dotless;
  # ...
} dtls;
`,example:{math:'<mover accent="true"><mi> i </mi> <mo> &#x0005E; </mo> </mover>'},done:!0,state:null,status:null},expt:{title:"Expert Forms",registered:"Adobe",description:`This feature is used to substitute Japanese kanji for alternative forms which
are considered more "typographical". This includes the use of JIS78 forms
(see \`jp78\`), but also a wide range of other substitutions.


The expected substitutions of the \`expt\` feature are defined in terms of the
[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.
Engineers creating Japanese fonts according to that glyphset should read the
information at the Adobe-Japan1 repository, and use the latest version of the
feature code provided there to implement this feature.


(Thanks to Ken Lunde for the information about implementing this feature.)
`,done:!0,example:{font:"Kiwi Maru",text:"曁堙僊"},state:null,status:null},falt:{title:"Final Glyph on Line Alternates",registered:"Microsoft",description:`This feature was intended to allow a justification system to substitute a
glyph for another form when the glyph is the final one on a line of text,
to improve the fitting of the line. (See also \`jalt\`.) No known layout
engine supports activating this and it is unclear whether any fonts
implemented the feature.
`,done:!0,status:"deprecated",state:null},fin2:{title:"Terminal Form #2",registered:"Microsoft",group:"Topographical",state:"required",script:{syrc:{order:3}},description:`This feature is used by the Arabic complex shaper when processing the Syriac
script. The Syriac letter alaph (U+0710) has multiple final forms: the first
final form, used when the preceding character is a joining
character, is selected using the \`fina\` feature, similar to an Arabic alif.


However, when the preceding character is a non-joining character, the selection
of the final form of alaph depends on whether the preceding character has
joining group \`Dalath_Rish\`. If the preceding character (skipping all characters
with a transparent joining group) is either U+0715 (dalath), U+0716 (dotless
dalath rish) or U+072A (rish), the \`fin3\` feature is applied. Otherwise,
this feature is applied.
`,example:{font:"Noto Sans Syriac",text:"ܒܐ"},fea:`feature fin2 {
  lookupflag RightToLeft IgnoreMarks;
  sub uni0710 by uni0710.Fina2;
  } fin2;
`,done:!0,status:null},fin3:{title:"Terminal Form #3",registered:"Microsoft",group:"Orthographic",state:"required",script:{syrc:{order:3}},description:`This feature is used by the Arabic complex shaper when processing the Syriac
script. The Syriac letter alaph (U+0710) has multiple final forms: the first
final form, used when the preceding character is a joining
character, is selected using the \`fina\` feature, similar to an Arabic alif.


However, when the preceding character is a non-joining character, the selection
of the final form of alaph depends on whether the preceding character has
joining group \`Dalath_Rish\`. If the preceding character (skipping all characters
with a transparent joining group) is either U+0715 (dalath), U+0716 (dotless
dalath rish) or U+072A (rish), this feature is applied. Otherwise,
the \`fin2\` feature is applied.
`,example:{font:"Noto Sans Syriac",text:"ܕܐ"},fea:`feature fin3 {
  lookupflag RightToLeft IgnoreMarks;
  sub uni0710 by uni0710.Fina3;
  } fin2;
`,done:!0,status:null},fina:{title:"Terminal Forms",registered:"Microsoft/Adobe",group:"Topographical",state:"required",script:{arab:{order:2},syrc:{order:2},USE:{order:4}},description:"This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is *not* appropriate for general end-of-word detection, but is\ndesigned to replace joining characters with final forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n",example:{font:"Aref Ruqaa",text:"جر"},automatic:!0,fea:`feature fina {
  lookupflag RightToLeft IgnoreMarks;
  sub alef-ar by alef-ar.fina;
  sub beh-ar by beh-ar.fina;
  # ...
}
`,done:!0,status:null},flac:{title:"Flattened accent forms",script:{math:null},example:{math:"x&#x00301; X&#x00301;"},registered:"Microsoft",description:`This feature replaces accents with flatter forms allowing them to fit within
the line when placed over a tall base character. This feature is automatically
applied by the math layout engine when an accent is placed over a base character
at a height of more than \`MATH.MathConstants.FlattenedAccentBaseHeight\`.
`,done:!0,fea:`feature flac {
  sub uni0300 by uni0300.mathcap;
  sub uni0301 by uni0301.mathcap;
  sub uni0302 by uni0302.mathcap;
  sub uni0303 by uni0303.mathcap;
  sub uni0304 by uni0304.mathcap;
  sub uni0306 by uni0306.mathcap;
  sub uni0307 by uni0307.mathcap;
  sub uni0308 by uni0308.mathcap;
  sub uni030A by uni030A.mathcap;
  sub uni030C by uni030C.mathcap;
} flac;
`,state:null,status:null},frac:{title:"Fractions",state:"discretionary",registered:"Microsoft/Adobe",description:"The feature is used to set fractions, both those fractions for which there is a precomposed glyph in the font (for example, `sub three slash four by threequarters;`) and those made up of numerator and denominator forms of numerals.",example:{font:"Recursive",text:"3/4 cup (145/793g)"},fea:`feature frac {
  sub one slash four by onequarter;
  sub three slash four by threequarters;
  # ...

  # This implementation due to Tal Leming and Ben Kiel
  lookup FractionBar {
      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures @figures slash;
      ignore sub slash @figures @figures @figures slash';
      ignore sub slash' @figures @figures @figures slash;
      ignore sub slash @figures @figures slash';
      ignore sub slash' @figures @figures slash;
      ignore sub slash @figures slash';
      ignore sub slash' @figures slash;
      ignore sub slash slash';
      ignore sub slash' slash;
      sub @figures slash' @figures by fraction;
  } FractionBar;

  lookup Numerator1 {
      sub @figures' fraction by @figuresNumerator;
  } Numerator1;

  lookup Numerator2 {
      sub @figures' @figuresNumerator fraction by @figuresNumerator;
  } Numerator2;

  lookup Numerator3 {
      sub @figures' @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator3;

  lookup Numerator4 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator4;

  lookup Numerator5 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator5;

  lookup Numerator6 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator6;

  lookup Numerator7 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator7;

  lookup Numerator8 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator8;

  lookup Numerator9 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator9;

  lookup Numerator10 {
      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;
  } Numerator10;

  lookup Denominator {
      sub [fraction @figuresDenominator] @figures' by @figuresDenominator;
  } Denominator;

  sub @figures space' @figuresNumerator by space.frac;
} frac;
`,ui:`In the OS X Typography panel, this feature is accessed via "Contextual Fraction
Forms -> Diagonal."

In Adobe applications, this feature is accessed via "Fractions" in the OpenType
panel.
`,done:!0,status:null},fwid:{title:"Full Widths",automatic:!0,state:"discretionary",registered:"Adobe",description:`This feature replaces glyphs with variants which fill the em square. This is
generally used with CJK fonts for setting text within an em-square grid (*hanmen*).
`,fea:`feature qwid {
  sub one by uniFF11;
  sub two by uniFF12;
  # ...
  sub a by uniFF41;
  sub b by uniFF42;
}
`,example:{font:"Shippori Mincho",text:"か12かab"},ui:'In the OS X typography panel, this feature is accessed via "Text spacing > Full Width".',done:!0,status:null},half:{title:"Half Forms",registered:"Microsoft",group:"Orthographic",script:{INDIC:{order:6},USE:{order:0}},description:`This feature produces half forms of conjuncts. It is processed in the Indic
and USE complex shapers as part of the orthographic shaping group.


Half forms are used in scripts such as Devanagari to display dead (unvoiced)
consonants after a virama in conjuncts which do not have a predetermined
conjunct form. Half forms should be provided for all base consonants. These
half forms can then be substituted into conjuncts later using the \`pres\`
feature. For example:

\`\`\`
feature half {
  sub ka-deva halant-deva by k-deva;
  ...
} half;
feature pres {
  sub k-deva sa-deva by ksa-deva;
  ...
} pres;
\`\`\`
`,example:{font:"Hind",text:"ग्त"},state:"required",done:!0,fea:`feature half {
  sub ka-deva halant-deva by k-deva;
  sub kha-deva halant-deva by kh-deva;
  sub ga-deva halant-deva by g-deva;
  sub gha-deva halant-deva by gh-deva;
  ...
} half;
`,status:null},haln:{title:"Halant Forms",registered:"Microsoft",state:"required",group:"Typographic",script:{INDIC:{order:6}},description:'This feature is applied by the Indic shaper during the typographic presentation\nphase, and is intended to "clean up" dead consonant sequences which have not\nbeen formed into conjuncts, by replacing them with correct dead consonant forms.\n\n\nFor example, consider the two sequences "tta nukta virama ra" and "tta nukta virama"\nwithout the final ra. In Noto Sans Devanagari, the "tta nukta virama" sequence is\nfirst composed into `ttanuktadeva` by the `nukt` feature, leaving\n`ttanuktadeva viramadeva radeva` and `ttanuktadeva viramadeva` respectively.\n\n\nWhen the final ra is present, the `rkrf` feature creates a conjunct form\n`ttanuktaradeva`. But without the final ra, we are left with `ttanuktadeva viramadeva`.\nIn this case, the default positioning of the nukta underneath the tta is\nincorrect, as it needs to move to the left to accommodate the virama. A\nprecomposed glyph `ttanuktaprehalfdeva` is substituted in the `haln`\nfeature to tidy up this dead consonant sequence.\n',example:{font:"Noto Sans Devanagari",text:"ट़्र ट़्"},done:!0,status:null},halt:{title:"Alternate Half Widths",automatic:!0,state:"discretionary",registered:"Adobe",description:`This feature is similar to the \`hwid\` feature, but instead of replacing half-width
glyphs with proportional equivalents, it re-spaces the glyphs using positioning
rules.
`,fea:`feature halt {
  pos [degree.full minute.full quotedblright.full quoteright.full second.full uni3001 uni3002 uni3009 uni300B uni300D uni300F uni3011 uni3015 uni301F uniFF09 uniFF0C uniFF0E uniFF3D uniFF5D] -500;
  pos [quotedblleft.full quoteleft.full uni3008 uni300A uni300C uni300E uni3010 uni3014 uni301D uniFF08 uniFF3B uniFF5B] <-500 0 -500 0>;
  pos [uni30FB uniFF01 uniFF1A uniFF1B] <-250 0 -500 0>;
} halt;
`,example:{font:"Reggae One",text:"か、が。さ"},ui:'In the OS X typography panel, this feature is accessed via "Text spacing > Alternative Half Width".',done:!0,status:null},hist:{title:"Historical Forms",registered:"Microsoft",state:"discretionary",description:'Substitutes forms of letters which are no longer commonly used, or which\ngive the text a "historical" feel. See also the `hlig` feature.\n',fea:`feature hist {
  sub J by J.hist;
  sub s by longs;
} hist;
`,example:{font:"EB Garamond",text:"Justice"},done:!0,status:null},hkna:{title:"Horizontal Kana Alternates",registered:"Adobe",state:"discretionary",description:`This feature replaces standard kana forms with glyphs which are designed
specifically for horizontal layout. For example, while "generic" kana may
have curving crossbars for characters such as さ and た, horizontal variants
may use straight crossbars.
`,example:{font:"Feature Sans",text:"か12か"},fea:`feature hkna {
  sub ka-hira by ka-hira.vkna;
  sub sa-hira by sa-hira.vkna;
  sub ta-hira by ta-hira.vkna;
  # ...
} hkna;
`,ui:`In the Mac OS X typography panel, this feature is accessed via "Optimized
Kana Alternatives -> Horizontal Alternatives".
`,done:!0,status:null},hlig:{title:"Historical Ligatures",registered:"Microsoft",state:"discretionary",description:`Substitutes ligature forms which are no longer commonly used, or which
give the text a "historical" feel: for example, the "st" ligature. See
also the \`hist\` feature.
`,fea:`feature hlig {
  sub s t by s_t;
} hlig;
`,example:{font:"EB Garamond",text:"aſſiſt"},done:!0,ui:`In the OS X typography panel, this feature is accessed via "Ligatures -> Historical
Ligatures."
`,status:null},hngl:{status:"deprecated",title:"Hangul",registered:"Adobe",description:`This feature is deprecated and should not be used. The idea of this
feature was to replace hanja (Chinese Han characters) with hangul
syllables. But such semantic behavior should be processed at the
input method environment level, not at the font level, meaning this
feature was never a good idea.
`,done:!0,state:null},hojo:{title:"Hojo Kanji Forms (JIS X 0212-1990 Kanji Forms)",registered:"Adobe",description:`The expected form of Japanese kanji characters in an OpenType font are the
forms specified in JIS X 0213 (which replaces the older standard, JIS X
0208). As well as JIS X 0208, an additional standard, JIS X 0212, defined
supplementary characters, including 5,801 kanji characters. 2,743 of those
characters were included in the JIS X 0213 standard, but in some cases,
the representative forms are different between the 1990 revision of JIS X
0212 and the current revision (2004) of JIS X 0213. This feature is used to
select the JIS X 0212-1990 representative forms of these characters.


The best source of information about which glyph forms differ, and how this
feature should be implemented, is the
[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) repository.
`,fea:`feature hojo {
  sub uni7462 by uni7462.hojo;
  sub uni7626 by uni7626.hojo;
  # ...
} jp83;
`,done:!0,example:{font:"Kiwi Maru",text:"瑢瘦"},ui:`In the Mac OS X typography panel, this feature is accessed via the "character
shape" radio buttons.

In Adobe InDesign with CJK functionality, this feature can be accessed via
the "Alternate Glyphs" dropdown in the Advanced Character Formats panel of
the character style options dialog.
`,state:null,status:null},hwid:{title:"Half Widths",automatic:!0,state:"discretionary",registered:"Adobe",description:"This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-half of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of two\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `qwid`, `twid`.\n",fea:`feature hwid {
  sub one by one.hwid;
  sub two by two.hwid;
  # ...
}
`,example:{font:"Feature Sans",text:"か12か"},ui:'In the OS X typography panel, this feature is accessed via "Text spacing > Half Width".',done:!0,status:null},init:{title:"Initial Forms",registered:"Microsoft/Adobe",group:"Topographical",state:"required",script:{arab:{order:7},syrc:{order:7},INDIC:{order:0},USE:{order:2}},description:`This feature is used by the Arabic, Indic, and USE complex shapers as part of topographic
shaping. It is *not* appropriate for general start-of-word detection, but is
designed to replace joining characters with initial forms. This means characters
which have the Unicode joining type \`Right_Joining\` or \`Dual_Joining\` in a
right-to-left script, and characters which have the Unicode joining type \`Left_Joining\`
or \`Dual_Joining\` in a left-to-right script. These joining type properties
can be found in [\`ArabicShaping.txt\`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)
in the Unicode Character Database.


In the Indic shaper, the feature is expected to apply in word-initial context
as identified by the shaping engine.
`,example:{font:"Aref Ruqaa",text:"جر"},automatic:!0,fea:`feature init {
  lookupflag RightToLeft IgnoreMarks;
  sub beh-ar by beh-ar.init;
  sub jeem-ar by jeem-ar.init;
  # ...
}
`,done:!0,status:null},isol:{title:"Isolated Forms",registered:"Microsoft/Adobe",group:"Topographical",state:"required",script:{arab:{order:1},syrc:{order:1},USE:{order:1}},description:"This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is designed to replace joining characters with isolated forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n",example:{font:"Aref Ruqaa",text:"یڽہ"},automatic:!0,fea:`feature isol {
  sub yehHamzaabove-ar by CH_YEu1 HAMZA_ABOVE;
  sub tehMarbutagoal-ar by HAYCu1 dda;
  sub hah-ar by JIMu1;
  sub noon-ar by NUNu1 sdi;
} isol;
`,done:!0,status:null},ital:{title:"Italics",registered:"Adobe",state:"discretionary",description:`This feature is used in *very particular circumstances*. Despite its name, it
is not a general mechanism for activating italic glyphs.


Historically CJK fonts, particular Japanese fonts, shipped with a glyphset
which contained the Latin alphabet (usually full-width but sometimes proportional).
As will as upright forms, these fonts *also* included Latin italic glyphs.


CJK fonts with both upright and italic Latin glyphs in the same font should use
this feature to select the italic forms
`,fea:`feature ital {
  sub a by a.ital;
  sub b by b.ital;
  # ...
} ital;
`,ui:`In the OS X typography panel, this feature is accessed via "Italics -> On".
In Adobe applications, this feature is accessed via "Roman Italics" in the OpenType panel.
Note that in neither case can the italic feature be accessed from the "Italicise"
button or the "Font Style" menu.
`,example:{font:"Feature Sans",text:"か123か"},done:!0,status:null},jalt:{title:"Justification Alternates",registered:"Microsoft",state:"discretionary",description:`This feature is intended to allow text layout engines to improve line justification
by selecting alternate glyphs. A layout engine can set a line of text, and then
try applying the \`jalt\` feature to the line to see if the resulting glyphs have
a better fit. It is rarely implemented in layout engines, with Adobe InDesign
and Photoshop being the only known implementations.
`,fea:`feature jalt {
  sub qaf-ar by qaf-ar.jalt;
  sub seen-ar by seen-ar.jalt;
  # ...
} jalt;
`,example:{font:"Aref Ruqaa",text:"سارق الغنم"},done:!0,ui:`In Adobe InDesign, this can be automatically applied at the paragraph level by choosing "Justification" from the paragraph panel menu and selecting "Justification Alternates (Naskh)" in the Justification dropdown. It can also be manually applied at the character level by choosing the Justification Alternate option from the character panel menu.
In Adobe Photoshop, it can be manually applied at the character level by choosing "Justification Alternates" from the character panel.`,status:null},jp04:{title:"JIS04 Forms",registered:"Adobe",description:`The expected form of Japanese kanji characters in an OpenType font are the
forms specified in JIS X 0213 (which replaces the older standard, JIS X
0208). In the course of revision of this standard, the expected forms of a
number of kanji characters have changed over time.


Fonts should target the most recent revision of the standard (currently the
2004 revision). However, features may be used to access forms specified in
earlier revisions. If the \`jp04\` feature is applied, kanji should be
replaced by variant forms representing those specified in the 2004 revision
of the standard. As 2004 is the current revision, this feature should only
be implemented when providing updates to older fonts or to provide remappings
for glyphs where both older and newer forms are encoded in Unicode and provided
in the font (for example, \`sub uni5516 by uni555E;\`).


A historical comparison between different character forms in JIS revisions
can be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).
`,done:!0,ui:`In the Mac OS X typography panel, this feature is accessed via the "character
shape" radio buttons.

In Adobe InDesign with CJK functionality, this feature can be accessed via
the "Alternate Glyphs" dropdown in the Advanced Character Formats panel of
the character style options dialog.
`,state:null,status:null},jp78:{title:"JIS78 Forms",registered:"Adobe",description:`The expected form of Japanese kanji characters in an OpenType font are the
forms specified in JIS X 0213 (which replaces the older standard, JIS X
0208). In the course of revision of this standard, the expected forms of a
number of kanji characters have changed over time. For example, between
the 1978 and 1983 revisions, the "road" radical (*shinnyō*) changed form
in some characters, moving from two initial dots to one dot. (This change
was reversed in the 2004 revision.)


Fonts should target the most recent revision of the standard (currently the
2004 revision). However, features may be used to access forms specified in
earlier revisions.


A historical comparison between different character forms in JIS revisions
can be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).


If the \`jp78\` feature is applied, kanji should be replaced by variant forms
representing those specified in the 1978 revision of the standard.
`,fea:`feature jp78 {
  sub uni5049 by uni5049.jp78;
  sub uni5275 by uni5275.jp78;
  sub uni8328 by uni8328.jp78;
  # ...
} jp83;
`,done:!0,example:{font:"Shippori Mincho",text:"偉茨創"},ui:`In the Mac OS X typography panel, this feature is accessed via the "character
shape" radio buttons.

In Adobe InDesign with CJK functionality, this feature can be accessed via
the "Alternate Glyphs" dropdown in the Advanced Character Formats panel of
the character style options dialog.
`,state:null,status:null},jp83:{title:"JIS83 Forms",registered:"Adobe",description:`The expected form of Japanese kanji characters in an OpenType font are the
forms specified in JIS X 0213 (which replaces the older standard, JIS X
0208). In the course of revision of this standard, the expected forms of a
number of kanji characters have changed over time. For example, between
the 1983 and 1990 revisions, the "eight" radical (*hachigashira*) changed form,
losing its top horizontal line.


Fonts should target the most recent revision of the standard (currently the
2004 revision). However, features may be used to access forms specified in
earlier revisions.


A historical comparison between different character forms in JIS revisions
can be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).


If the \`jp83\` feature is applied, kanji should be replaced by variant forms
representing those specified in the 1983 revision of the standard.
`,fea:`feature jp83 {
  sub uni82A6 by uni82A6.jp83;
  sub uni9022 by uni9022.jp83;
  # ...
} jp83;
`,done:!0,example:{font:"Shippori Mincho",text:"逢芦晦"},ui:`In the Mac OS X typography panel, this feature is accessed via the "character
shape" radio buttons.

In Adobe InDesign with CJK functionality, this feature can be accessed via
the "Alternate Glyphs" dropdown in the Advanced Character Formats panel of
the character style options dialog.
`,state:null,status:null},jp90:{title:"JIS90 Forms",registered:"Adobe",description:`The expected form of Japanese kanji characters in an OpenType font are the
forms specified in JIS X 0213 (which replaces the older standard, JIS X
0208). In the course of revision of this standard, the expected forms of a
number of kanji characters have changed over time. For example, between
the 1983 and 1990 revisions, the "long stride" radical (*innyō*) changed form
in some characters, losing the upstroke on the third stroke.


Fonts should target the most recent revision of the standard (currently the
2004 revision). However, features may be used to access forms specified in
earlier revisions.


A historical comparison between different character forms in JIS revisions
can be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).


If the \`jp90\` feature is applied, kanji should be replaced by variant forms
representing those specified in the 1990 revision of the standard.
`,fea:`feature jp90 {
  sub uni853D by uni853D.jp90;
  sub uni8AB9 by uni8AB9.jp90;
  sub uni990C by uni990C.jp90;
  # ...
} jp90;
`,ui:`In the Mac OS X typography panel, this feature is accessed via the "character
shape" radio buttons.

In Adobe InDesign with CJK functionality, this feature can be accessed via
the "Alternate Glyphs" dropdown in the Advanced Character Formats panel of
the character style options dialog.
`,done:!0,example:{font:"Kiwi Maru",text:"餌誹蔽"},state:null,status:null},kern:{title:"Kerning",registered:"Microsoft/Adobe",automatic:!0,state:"default",group:"Positioning",description:`This feature is one of the two facilities for kerning within OpenType.
The original TrueType \`kern\` *table* in the font implements simple,
non-contextual pair-based and class-based kerning, and a pair-based (format 0)
\`kern\` table was historically required for kerning to function in applications
such as Microsoft PowerPoint.


However, modern fonts tend to implement kerning through the use of
this feature instead (see [discussion](https://typedrawers.com/discussion/comment/15218)).
The standard implementation is to use GPOS 2 pair positioning rules to adjustment
the X advance of the first glyph in the pair, although note that when
generating a \`kern\` feature for right-to-left text, the adjustment is
generally made to both advance *and* placement:

\`\`\`
pos period parentheses <-30 0 -30 0>;
\`\`\`


See also the \`vkrn\` feature for kerning in vertical settings. Kerning may
be disabled based on user preference; for mandatory adjustments, use the
\`dist\` feature instead.
`,example:{font:"Vollkorn",text:"AVATAR"},ui:'In the OS X typography panel, this feature is *disabled* via "Text Spacing > No Kerning".',done:!0,status:null},lfbd:{title:"Left Bounds",registered:"Adobe",status:"deprecated",description:`This feature was intended as part of the implementation of character
protrusion (see \`opbd\`); the idea being that it would be applied to the initial
character on a line to alter the bounds of that character allowing it to
protrude into the right margin. However, this would require an interaction
between the line breaking engine and the shaping engine which has only once
been implemented, in the LuaTeX layout system.

This feature should therefore be regarded as prematurely specified and
hence deprecated.
`,done:!0,state:null},liga:{title:"Standard Ligatures",registered:"Microsoft/Adobe",state:"default",description:"Ligatures provide typographic refinement by replacing multiple glyphs with a\nsingle, ligated form. This feature is used for standard ligatures, which are\nto be applied by default; in Latin text, this is generally sequences such as\n`f f`, `f f l`, `f f`, `f i`, and `f f i`.\n\nLigature code is often automatically generated by the font editor based on\ndetecting sequences of glyph names combined with underscores; note, however,\nthat the common ligature glyph `fi` does *not* contain an underscore.\n",automatic:!0,fea:`feature liga {
  sub f f i by f_f_i;
  sub f f l by f_f_l;
  sub f f by f_f;
  sub f i by fi;
  sub f l by f_l;
}
`,example:{font:"EB Garamond",text:"Official"},done:!0,ui:`In the OS X typography panel, this feature is *disabled* via "Ligatures >
Common Ligatures".
`,status:null},ljmo:{title:"Leading Jamo Forms",registered:"Microsoft",group:"Topographical",state:"required",script:{hang:1},description:`The Korean Hangul script is encoded in Unicode in two ways: first, as a series
of precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as
a series of indivdual, conjoining *jamo*. Korean syllables form a LVT?
(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant
(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)
jamo are encoded between U+1160 and U+11A7, and the optional trailing consonant
(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul
Jamo Unicode block; other jamo are encoded in extension blocks.)


The Hangul shaper will first attempt to compose any sequences of conjoining jamo
into an encoded form in the precomposed syllable block. But where this is not
successful - for example, in an Old Korean form which is not encoded in Unicode
as a precomposed syllable - then the shaper will instead *decompose* any LV
syllables to break the syllable into separate L, V, and T? characters, and then
apply the Korean shaping features (\`ljmo\`, \`vjmo\`, \`tjmo\`) to select forms of
the jamo which are appropriately positioned and sized to combine into the correct
grapheme-image.


For example, the Old Korean syllable ᄒᆞᆯ is not encoded in Unicode as a precomposed
syllable, and so must be encoded with the three individual jamo. The Hangul
shaper applies the \`ljmo\` feature to the *choseong*, the \`vjmo\` feature to the
*jungseong* and the \`tjmo\` feature to the *jongseong*. The resulting sequence
produces a glyph which renders the syllable correctly, with the \`vjmo\` and
\`tjmo\` generally producing zero-width mark glyphs positioned appropriately. An
alternative to this technique is to use the \`ccmp\` feature to turn decomposed
jamo into a precomposed glyph.


For further information, see sections 3.12 and 18.6 of the Unicode Standard.
`,done:!0,status:null},lnum:{automatic:!0,state:"discretionary",title:"Lining Figures",registered:"Adobe",description:`This feature substitutes digits for lining forms. Lining figures are
designed to fit in all-capital settings.

In theory, this feature should not just substitute the default form
of figures (e.g. \`one\`, \`two\`) for lining forms, but also any alternate
non-lining forms (such as oldstyle figures) for lining forms. Where
lining forms are the default, implementing a substitution from oldstyle
figures to lining figures is not typographically necessary but will cause
the UI of layout programs to display lining figures as an option.

See also \`onum\`, \`pnum\`, \`tnum\`.
`,fea:`feature lnum {
  sub one by one.lf;
  sub two by two.lf;
  # ...
} lnum;
`,example:{font:"Baskervville",text:"ABC1234"},ui:`In the OS X typography panel, this feature is accessed via "Number Case >
Lining Figures". In Adobe applications, selecting "Tabular lining" from the
OpenType panel will apply this feature and the \`tnum\` feature, while selecting
"Proportional lining" will apply this feature and the \`pnum\` feature.


In CSS, this feature can be accessed through the \`font-variant-numeric: lining-nums\` property.
`,done:!0,status:null},locl:{title:"Localized Forms",registered:"Tiro Typeworks",state:"required",group:"Common",order:0,description:`This feature allows for localization of glyph forms by making substitutions
conditional on the script and language selected by the user. Typical uses
of this feature include:


* Substituting Cyrillic glyphs with Bulgarian and Serbian variants.

* In Turkish, Azeri, Kazakh, Tatar and Crimean Tartar, substituting the \`i\` by
an \`idotaccent\` glyph so that when uppercased through case conversion features
such as \`smcp\`, the dot can be preserved.
(See [this tutorial](https://glyphsapp.com/learn/localize-your-font-turkish).)

* In Romanian and Moldovan, substituting the \`scedilla\` (U+015E) with \`scommaaccent\`.

* Repositioning the ogonek to the center of the glyph in Navajo.

* In Dutch, substituting the j in an \`íj\` pair with \`íj́\` (see [thread](https://typedrawers.com/discussion/1294/how-do-you-implement-ijacute-and-ijacute).)

* Substituting the Catalan "punt volat" for \`ldot\` ([tutorial](https://glyphsapp.com/learn/localize-your-font-catalan-punt-volat))

* In a font which has multiple scripts with different spacing conventions,
  such as Latin and Urdu, conditionally resizing the advance width of the
  space character to meet the expectations of the script in use.
`,fea:`feature locl {
  script latn;
  language ROM;
  sub Scedilla by Scommaaccent;
  sub scedilla by scommaaccent;
  language MOL;
  sub Scedilla by Scommaaccent;
  sub scedilla by scommaaccent;
  language CAT;
  sub l' periodcentered' l by ldot;
  sub L' periodcentered' L by Ldot;
} locl;
`,done:!0,status:null},ltra:{title:"Left-to-right alternate forms",registered:"Adobe",group:"Preprocessing",order:2,description:`This feature - by analogy with the \`rtla\` feature - is intended for
right-to-left scripts which can also be expressed in a left-to-right line
layout, but which require glyph transformations such as mirroring when
written left-to-right. As detailed in the \`ltrm\` feature, such scripts
are extremely rare, and no implementations have been found.
`,done:!0,state:null,status:null},ltrm:{title:"Left-to-right mirrored forms",registered:"Adobe",group:"Preprocessing",order:3,description:`This feature - by analogy with the \`rtlm\` feature - was intended for
right-to-left scripts which can also be expressed in a left-to-right line
layout, but which require glyph transformations such as mirroring when
written left-to-right.


Such scripts are exceptionally rare. Noto Sans Old Hungarian uses this
feature to horizontally mirror the glyphs when laying out Old Hungarian
left-to-right, although it is disputed that Old Hungarian was ever written
left-to-right. The Old South Arabian script is usually written RTL but
can also be laid out LTR; but Noto Sans Old South Arabian does not include
mirroring substitutions. Oh well.
`,done:!0,state:null,status:null},mark:{title:"Mark Positioning",registered:"Microsoft",group:"Positioning",state:"required",automatic:!0,description:`This feature is used to position mark glyphs with respect to their base glyphs.


Generally speaking, this is automatically generated by font editing software
based on the positions of anchors in the base and mark glyphs. The editor will
emit mark-to-base (GPOS4) and mark-to-ligature (GPOS5) rules for this feature.
`,example:{font:"Markazi Text",text:"تَشْكِيل"},done:!0,status:null},med2:{title:"Medial Forms #2",registered:"Microsoft",group:"Topographical",state:"required",script:{syrc:{order:3}},description:`This feature is used by the Arabic complex shaper when processing the Syriac
script. The Syriac letter alaph (U+0710) is not normally a joining character
but can join to the right in the middle of a word if the preceding character
is right-joining.
`,example:{font:"Noto Sans Syriac",text:"ܒܐܬܪܐ"},fea:`feature fin2 {
  lookupflag RightToLeft IgnoreMarks;
  sub uni0710 by uni0710.Medi2;
  } fin2;
`,done:!0,status:null},medi:{title:"Medial Forms",registered:"Microsoft/Adobe",group:"Topographical",state:"required",script:{arab:{order:0},syrc:{order:0},USE:{order:0}},description:"This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is *not* appropriate for general middle-of-word detection, but is\ndesigned to replace joining characters with medial forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n",example:{font:"Aref Ruqaa",text:"جسر"},automatic:!0,fea:`feature medi {
  lookupflag RightToLeft IgnoreMarks;
  sub beh-ar by beh-ar.medi;
  sub jeem-ar by jeem-ar.medi;
  # ...
}
`,done:!0,status:null},mgrk:{title:"Mathematical Greek",registered:"Adobe",state:"discretionary",description:"This feature replaces Greek glyphs with mathematical symbols: for example,\n`Sigma` is replaced by the `summation` glyph.\n",fea:`feature mgrk {
  sub uni0394 by uni2206;
  sub Pi by product;
  sub Sigma by summation;
  sub uni03A9 by uni2126;
  sub uni03BC by uni00B5;
  sub phi by uni03D5;
} mgrk;
`,ui:`In the OS X typography panel, this feature is accessed via "Mathematical Extras
-> Mathematical Greek Letter Forms".
`,example:{font:"Vollkorn",text:"φ(n)=Σ Δn"},done:!0,status:null},mkmk:{title:"Mark-to-Mark Positioning",registered:"Microsoft",group:"Positioning",state:"required",automatic:!0,description:`This feature is used to position mark glyphs with respect to other mark glyphs.
This can be used for example to position arbitrary combinations of marks used
in scholarly transliteration systems, as well as positioning
Arabic secondary marks relative to primary marks, such as *fathah* over *shadda*
and vice versa.


Generally speaking, this is automatically generated by font editing software
based on the positions of anchors in the mark glyphs, if the mark glyphs have
both a "mark anchor" (e.g. \`_bottom\`) *and* an "attachment anchor" (\`bottom\`).
The editor will then emit mark-to-mark (GPOS6) rules for this feature.
`,example:{font:"Work Sans",text:"é̤̤̱̃̃"},done:!0,status:null},mset:{status:"deprecated",group:"Typographic",title:"Mark Positioning via substitution",script:{arab:{order:4}},registered:"Microsoft",description:"This feature is used by the Arabic shaping as the final phase of the typographic\nshaping group. It was intended for substitutions which combine marks and bases\ninto precomposed forms as an alternative to using positioning rules in the `mark`\nfeature; however, it is possible to use *substitution* rules in the `mark`\nfeature, making the `mset` feature redundant.\n\nIt was used in Microsoft's Windows 95 Arabic fonts, and practically no other font.\nNew fonts should use `mark`, `ccmp`, `rlig` or other features instead.\n",done:!0,state:null},nalt:{state:"discretionary",title:"Alternate Annotation Forms",registered:"Adobe",description:`This feature replaces glyphs with "notational" forms - glyphs in boxes,
circles, etc. It is often used in CJK fonts to access characters in the Unicode
"Enclosed CJK Letters and Months" block (for example, \`sub uni3131 by uni3200;\`),
but may also be used to access other enclosed forms (\`sub one by uni2460;\`).


Note that although the OT Specification describes this as implementable via
alternate substitution lookups, no interface supports this, and single substitutions
should be used instead.
`,ui:`No user interface to this feature has been found.
`,done:!0,example:{font:"Work Sans",text:12345},status:null},nlck:{title:"NLC Kanji Forms",registered:"Adobe",description:`In 2000, the Japanese National Language Council (now the Japanese language
division of the Agency for Cultural Affairs) prescribed new glyph forms for
Japanese kanji. In particular, the shape of the "father" and "long stride"
(*innyo*) radicals changed to remove a small stroke.


The expected substitutions of the \`nlck\` feature are defined in terms of the
[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.
Engineers creating Japanese fonts according to that glyphset should read the
information at the Adobe-Japan1 repository, and use the latest version of the
feature code provided there to implement this feature.
`,example:{text:"咬廻挺爺",font:"Shippori Mincho"},done:!0,state:null,status:null},nukt:{group:"Preprocessing",state:"required",script:{INDIC:{order:1},USE:{order:0}},title:"Nukta Forms",description:`This feature is used to replace \`consonant + nukta\` with a precombined nukta
form glyph in Indic and USE scripts. It is called during the preprocessing
group - after initial reordering in Indic scripts, but before processing in the
USE.


While nukta marks may be positioned using the normal mark positioning functionality
(\`mark\`), the font designer may choose to create specific precomposed nukta glyphs,
either for ease of positioning or to facilitate later lookups.
`,fea:`feature nukt {
  sub ka-deva   nukta-deva by ka-deva.nukt;
  sub kha-deva  nukta-deva by kha-deva.nukt;
  sub ga-deva   nukta-deva by ga-deva.nukt;
  sub ja-deva   nukta-deva by ja-deva.nukt;
  sub dda-deva  nukta-deva by dda-deva.nukt;
  sub ddha-deva nukta-deva by ddha-deva.nukt;
  sub pha-deva  nukta-deva by pha-deva.nukt;
  sub ra-deva   nukta-deva by ra-deva.nukt;
} nukt;
`,done:!0,status:null},numr:{title:"Numerators",automatic:!0,state:"discretionary",status:"deprecated",registered:"Adobe",description:'This deprecated feature replaces numeric glyphs with numerator forms. See also `dnom`.\n\nNote that, despite the description of this feature in the OpenType specification,\nthe application of the `frac` feature is independent of this feature. It was\noriginally intended that applying the `frac` feature would "trigger" the\napplication of the `numr` feature for glyphs before the division slash and\nthe `dnom` feature for glyphs after it. This behavior was never implemented in\nOpenType shaping, and instead contextual rules are used within the `frac` feature\nto choose appropriate glyphs for numerator and denominator.\n\nNew fonts should use the `frac` feature in preference to this feature.\n',done:!0},onum:{automatic:!0,state:"discretionary",title:"Oldstyle Figures",registered:"Adobe",description:`This feature substitutes digits for oldstyle forms. Oldstyle figures are
designed to fit in mixed case text settings.

In theory, this feature should not just substitute the default form
of figures (e.g. \`one\`, \`two\`) for oldstyle forms, but also any alternate
lining forms (such as lining figures) for oldstyle forms. Where
oldstyle forms are the default, implementing a substitution from lining
figures to oldstyle figures is not typographically necessary but will cause
the UI of layout programs to display oldstyle figures as an option.

See also \`onum\`, \`pnum\`, \`tnum\`.
`,fea:`feature lnum {
  sub one by one.osf;
  sub two by two.osf;
  # ...
} lnum;
`,example:{font:"Cardo",text:"ABC1234"},ui:`In the OS X typography panel, this feature is accessed via "Number Case >
Old-Style Figures". In Adobe applications, selecting "Tabular oldstyle" from the
OpenType panel will apply this feature and the \`tnum\` feature, while selecting
"Proportional oldstyle" will apply this feature and the \`pnum\` feature.


In CSS, this feature can be accessed through the \`font-variant-numeric: oldstyle-nums\` property.
`,done:!0,status:null},opbd:{title:"Optical Bounds",registered:"Adobe",status:"deprecated",description:`This feature was intended for implementing what TeX users call "character
protrusion" or "margin kerning": improving the fit of lines in a paragraph by
altering the apparent advance width or positioning of certain characters
based on their optical edges rather than bounding boxes.


Consider, for example, a serif letter D appearing at the beginning of a line.
By altering the positioning of the glyph, the serifs can be protruded outside
the margin so that the stem aligns with the left edge of the text, to give a
more visually "tight" justification.


This feature was originally intended to automatically "call" the \`lfbd\` and
\`rtbd\` features to achieve margin kerning; however, the OpenType feature
model did not develop as planned, and so this feature was never implemented.
`,done:!0,state:null},ordn:{title:"Ordinals",registered:"Adobe",state:"discretionary",description:`In some languages, alphabetic glyphs are used to abbreviate ordinal numerals.
For example, in Italian, the word for "second" is written 2º when referring
to a gramatically masculine noun and 2ª when referring to a gramatically
feminine noun. While this can be encoded with the Unicode FEMININE ORDINAL INDICATOR
(U+00AA) and MASCULINE ORDINAL INDICATOR (U+00BA) codepoints as in this
paragraph, it is more common to use the standard Latin \`a\` and \`o\` characters
and use a font feature to form the ordinal indicators.

Additionally, the numero sign (№, U+2116) is more commonly written with the
Latin sequence \`No.\`. This feature is applied to convert it to the numero
glyph.

Some fonts also use this feature to place other Latin glyphs in "ordinal
position".
`,fea:`feature ordn {
  sub @numeral [A a] by ordfeminine;
  sub @numeral [o o] by ordmasculine;

  sub N o period by numero;
} ordn;
`,example:{font:"Alegreya Sans",text:"No. 2a"},ui:`In the OS X typography panel, this feature is accessed via "Vertical Position
> Ordinals".
`,done:!0,status:null},ornm:{title:"Ornaments",description:`This feature has two uses, both of which are used to select ornament glyphs
from within the font's glyphset.


In the first use, all ornamental glyphs (fleurons, manicules, dingbats and
so on) are made available through a GSUB3 alternate substitution from the
bullet character (U+2022).


In the second use, ASCII characters are substituted for ornamental forms using
a GSUB1 substitution.
`,registered:"Adobe",state:"discretionary",fea:`feature ornm {
  sub bullet from @ornaments;


  sub less by arrowleft;
  sub greater by arrowright;
  sub plus by arrowup;
  # ...
} ornm;
`,example:{font:"Spectral",text:"+×=<>"},done:!0,status:null},palt:{title:"Proportional Alternate Widths",automatic:!0,state:"discretionary",registered:"Adobe",description:`This feature is similar to the \`pwid\` feature, but instead of replaces full-width
glyphs with proportional equivalents, it re-spaces the glyphs using positioning
rules.
`,fea:`feature palt {
  pos uniFF41 <-186 0 -373 0>;
  pos uniFF42 <-148 0 -346 0>;
  pos uniFF43 <-220 0 -441 0>;
  pos uniFF44 <-176 0 -353 0>;
  # ...
} palt;
`,example:{font:"Shippori Mincho",text:"かａｂｃか"},ui:'In the OS X typography panel, this feature is accessed via "Text spacing > Alternative Proportional Widths".',done:!0,status:null},pcap:{title:"Petite Capitals",registered:"Tiro Typeworks / Emigre",state:"discretionary",automatic:!0,description:'Substitutes lowercase characters for petite capitals. Petite capitals are an additional set of capital letters found in some founds which are smaller than the "small caps" set, designed to harmonize better with the lowercase letters. (See, for example, [Mrs Eaves](https://fonts.adobe.com/fonts/mrs-eaves) and [Filosophia](https://fonts.adobe.com/fonts/filosofia).)\n\nCompare with `c2pc`, which substitutes uppercase letters for petite capitals.\n\nNote that as this feature changes the case of the glyph, font engineers should ensure that any language-specific localisations are taken into account during case conversion - for example, when applying this feature to the letter `i` in Turkish, the returned form should appear with a dot above. (This is often achieved by replacing i with `idotless dotaccent` or similar in the `locl` feature.)\n',fea:`feature pcap {
  sub a by A.pc;
  sub b by B.pc;
  # ...
} pcap;
`,example:{font:"EB Garamond",text:"This"},ui:`In the OS X typography panel, this feature is accessed via "Lowercase ->
Petite Capitals."


In CSS, this feature can be set with \`font-variant-caps: petite-caps;\`
`,done:!0,status:null},pkna:{title:"Proportional Kana",registered:"Adobe",state:"discretionary",description:`Japanese characters are usually typeset on a fix-width em square grid. However,
for display purposes, it may be preferable to set the glyphs proportionally.
This feature either replaces the kana glyphs with alternate glyphs with reduced
sidebearings, or uses positioning rules to achieve the same effect. See also
\`pwid\`.
`,fea:`feature pkna {
  sub ka-hira by ka-hira.pkna;
  sub ki-hira by ki-hira.pkna;
  # ...
} pkna;

# OR

feature pkna {
  pos ka-hira <-75 0 -75 0>;
  pos ki-hira <-15 0 -35 0>;
  # ...
} pkna;
`,example:{font:"Feature Sans",text:"かりかり"},done:!0,status:null},pnum:{title:"Proportional Figures",registered:"Microsoft/Adobe",automatic:!0,description:"This feature replaces tabular (fixed-width) figures by proportional variants.\nSee also the `onum`, `lnum` and `tnum` features. Note that where the default\nform is proportional, this feature has no effect, although some font editors\nprovide rules for this feature in any case.\n",fea:`feature pnum {
  sub one.tf by one;
  sub two.tf by two;
  sub three.tf by three;
  #...
} pnum;
`,done:!0,ui:`In the OS X typography panel, this feature is accessed via "Number Spacing >
Proportional Numbers".


In CSS, this feature can be accessed through the \`font-variant-numeric: proportional-nums\` property.
`,state:null,status:null},pref:{title:"Pre-base Forms",registered:"Microsoft",group:"Orthographic",script:{INDIC:{order:2},USE:{order:2},mym2:{order:1},khmer:{order:0}},state:"required",description:`This feature is intended to form pre-base ligatures. In the Indic shaper, its
application is scoped to
the virama-consonant pair ordered before the base consonant. It is most often
used in Khmer fonts to replace the \`coeng ro\` sequence with a pre-base form
of the ra (see also \`cfar\`), or as a generic orthographic feature in Myanmar (Burmese).


Note that in the Indic shaper, this feature is also used as a "signal" to the shaping engine for reordering
purposes: that is, if a virama-consonant pair would be substituted by this feature,
then that consonant is placed in the *post*-base position when the syllable is reordered.
(Note: not the pre-base position, as one might expect!)
`,fea:`feature pref {
  sub coeng-khmer ro-khmer by coeng-ro;

  # This could alternately be in cfar
  sub coeng-ro @consonant @subjoined by coeng-ro.longer;
}
`,done:!0,status:null},pres:{title:"Pre-base Substitutions",registered:"Microsoft",state:"required",group:"Typographic",script:{INDIC:{order:0},khmr:{order:0},USE:{order:0},mym2:{order:0}},description:`This feature is used in Indic, Khmer, Myanmar and USE scripts to form pre-base
conjunct ligatures. For example, in Devanagari or Gujarati, the sequence
\`ka + virama + consonant\` is first substituted by the half form \`k + consonant\`
in the \`half\` feature, but then is further ligated to a conjunct form in this
feature.


The feature may also be used for other presentational adjustments
concerning pre-base forms, such as selecting the correct width of the i-matra.
`,fea:`feature pres {
    sub k-deva ka-deva by kka-deva;
    sub k-deva kha-deva by kkha-deva;
    # ...
    sub g-deva ga-deva by gga-deva;
    # ...
    sub iMatra-deva' @width1 by iMatra-deva.1;
    sub iMatra-deva' @width2 by iMatra-deva.2;
    # ...
} pres;
`,example:{font:"Hind",text:"त्ति"},done:!0,status:null},pstf:{title:"Post-base Forms",registered:"Microsoft",group:"Orthographic",script:{INDIC:{order:6},USE:{order:3},mym2:{order:3},khmer:{order:0}},state:"required",description:`This feature is intended to replace glyphs by their post-base forms. For example,
in Bengali and Gurmukhi, the ya consonant has a post-base form when followed
by a virama.

Note that in the Indic shaper, this feature is also used as a "signal" to the shaping engine for reordering
purposes: that is, if a virama-consonant pair would be substituted by this feature,
then that consonant is placed in the post-base position when the syllable is reordered.
`,fea:`feature pstf {
    sub viramabeng yabeng by yabeng_viramabeng.pstf;
} pstf;
`,example:{font:"Lohit Bengali",text:"ব্য্"},done:!0,status:null},psts:{title:"Post-base Substitutions",registered:"Microsoft",state:"required",group:"Typographic",script:{INDIC:{order:0},khmr:{order:0},USE:{order:0},mym2:{order:0}},description:`This feature is intended to replace base + post-base sequences with a ligature
glyph. It can also be used to perform any contextual post-base substitution
required (for example, in Devanagari or Bengali, replacing the ii-matra (ी)
with appropriate width glyphs to point to the stem of the consonant).
`,fea:`feature psts {
  sub ka-javanese cakra by ka_cakra;
  sub ta-javanese cakra by ta_cakra;
  # ...
} psts;
`,example:{font:"Noto Sans Javanese",text:"ꦏꦿꦛꦿ"},done:!0,status:null},pwid:{title:"Proportional Widths",automatic:!0,state:"discretionary",registered:"Adobe",description:`This feature replaces glyphs (normally figures and punctuation) sized to
the em-square with variants which are proportionally spaced. This is generally
used with CJK fonts. It is the opposite of the \`fwid\` feature.
`,fea:`feature pwid {
  sub uniFF11 by one;
  sub uniFF12 by two;
  # ...
  sub uniFF41 by a;
  sub uniFF42 by b;
  # ...
} pwid;
`,example:{font:"Kiwi Maru",text:"かａｂｃか"},ui:'In the OS X typography panel, this feature is accessed via "Text spacing > Proportional Widths".',done:!0,status:null},qwid:{title:"Quarter Widths",automatic:!0,state:"discretionary",registered:"Adobe",description:"This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-quarter of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of four\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `hwid`, `twid`.\n",fea:`feature qwid {
  sub one by one.qwid;
  sub two by two.qwid;
  # ...
}
`,example:{font:"Feature Sans",text:"か1231か"},ui:'In the OS X typography panel, this feature is accessed via "Text spacing > Quarter Width".',done:!0,status:null},rand:{title:"Randomize",registered:"Adobe",state:"default",description:`The randomize feature, which is *currently only implemented in the Harfbuzz shaping engine*,
allows font designers to randomly replace glyphs with variants from a selection,
using a GSUB3 alternate substitution. This can be useful for handwriting or
display style fonts. This feature is applied by default (at least in Harfbuzz),
and there is no user interface to disabling it; use tastefully.


Note that because of the limited implementation of this feature, it is still
recommended to use one of the other deterministic alternate selection strategies
described in the [OpenType Cookbook](http://opentypecookbook.com/common-techniques/#randomization)
in a \`calt\` feature. Also note that to avoid problems with reflowing text,
the Harfbuzz shaping engine applies the same random seed to each shaping run.
This means that while the glyphs within a run are chosen (pseudo)randomly, the
results will be consistent each time the same text is shaped.
`,fea:`feature rand {
  # But you probably want to use one of the OpenType Cookbook recipes
  # in a calt feature instead
  sub A from [A a.rand1 A.rand2 A.rand3];
} rand;
`,example:{font:"Feature Sans",text:"AAAA"},done:!0,status:null},rclt:{group:"Typographic",state:"required",script:{arab:{order:2},syrc:{order:2}},title:"Required Contextual Alternates",registered:"Microsoft",description:`This feature is intended for required contextual alternates (contextual
alternates which should not be subject to user control). Note that in the
Arabic shaper it is processed early in the typographic presentation phase;
in other shapers, it is processed along with the common feature group.


In the example, Reem Kufi uses the \`rclt\` feature to swap repeated *beh*
glyphs for glyphs with raised teeth.
`,fea:`feature rclt {
  lookupflag IgnoreMarks;
    sub [behDotless-ar.init behDotless-ar.medi]
         behDotless-ar.medi'
        [behDotless-ar.medi behDotless-ar.fina]
     by  behDotless-ar.medi.high;
    sub [seen-ar.init seen-ar.medi]
         behDotless-ar.medi'
     by  behDotless-ar.medi.high;
    sub  behDotless-ar.init
         behDotless-ar.medi'
         noonghunna-ar.fina
     by  behDotless-ar.medi.high;
} rclt;
`,example:{font:"Reem Kufi",text:"ببببب"},done:!0,status:null},rkrf:{title:"Rakar Forms",registered:"Microsoft",group:"Orthographic",script:{INDIC:{order:2},USE:{order:3}},state:"required",description:'This feature is used in the Indic and USE complex shapers to replace\nconsonant clusters involving "ra" with conjunct forms. For example, in Devanagari,\nthe sequence `ka virama ra` should be replaced by the conjunct form `kra`.\nWhile this substitution was previously achieved in the v1 shaper by the combination\nof the `bwlf` and `vatu` features, the v2 shaper allows for a simpler way to\nsubstitute the entire sequence.\n\n\nThe `half` feature is processed after this feature, so any conjuncts created\nin `rkrf` must also be included in the half-form rules in `half`.\n',fea:`sub rkrf {
    sub ka-deva   virama-deva ra-deva by   kra-deva;
    sub kha-deva  virama-deva ra-deva by  khra-deva;
    sub ga-deva   virama-deva ra-deva by   gra-deva;
    # ...
} rkrf;
`,done:!0,status:null},rlig:{group:"Typographic",state:"required",script:{arab:{order:1},syrc:{order:1}},title:"Required Ligatures",registered:"Microsoft",description:`This feature is intended for required ligatures (ligatures which should not
be subject to user control). Note that in the Arabic shaper it is processed
early in the typographic presentation phase; in other shapers, it is processed
along with the common feature group.
`,fea:`feature rlig {
  lookupflag IgnoreMarks RightToLeft;
  sub lam-ar.init alef-ar.fina by lam_alef-ar;
  sub lam-ar.medi alef-ar.fina by lam_alef-ar.fina;
  sub lam-ar.init alefHamzaabove-ar.fina by lam_alefHamzaabove-ar;
  sub lam-ar.medi alefHamzaabove-ar.fina by lam_alefHamzaabove-ar.fina;
  sub lam-ar.init alefHamzabelow-ar.fina by lam_alefHamzabelow-ar;
  sub lam-ar.medi alefHamzabelow-ar.fina by lam_alefHamzabelow-ar.fina;
  sub lam-ar.init alefMadda-ar.fina by lam_alefMadda-ar;
  sub lam-ar.medi alefMadda-ar.fina by lam_alefMadda-ar.fina;
  sub lam-ar.init alefWasla-ar.fina by lam_alefWasla-ar;
  sub lam-ar.medi alefWasla-ar.fina by lam_alefWasla-ar.fina;
} rlig;
`,example:{font:"El Messiri",text:"لا"},done:!0,status:null},rphf:{title:"Reph Form",registered:"Microsoft",group:"Orthographic",script:{INDIC:{order:8},USE:{order:0},mym2:{order:0}},state:"required",description:`This feature replaces consonant+virama with the reph form of the consonant.
In Devanagari, non-final ra+virama should be substituted by reph. The context
of application is restricted to a syllabic cluster.


Note that in the Universal Shaping Engine, this feature is also used as a
"signal" to the shaping engine for reordering purposes: after this feature
has been processed, any glyphs substituted in by this feature are considered
to have USE category \`R\`.
`,fea:`feature rphf {
  sub ra-deva halant-deva by reph-deva;
} rphf;
`,done:!0,status:null},rtbd:{title:"Right Bounds",registered:"Adobe",status:"deprecated",description:`This feature was intended as part of the implementation of character
protrusion (see \`opbd\`); the idea being that it would be applied to the final
character on a line to alter the bounds of that character allowing it to
protrude into the right margin. However, this would require an interaction
between the line breaking engine and the shaping engine which has only once
been implemented, in the LuaTeX layout system.


This feature should therefore be regarded as prematurely specified and
hence deprecated.
`,done:!0,state:null},rtla:{title:"Right-to-left alternates",registered:"Adobe",state:"required",group:"Preprocessing",order:2,description:`This feature is applied to right-to-left texts as part of the glyph preprocessing
stage. It is intended for substituting variants which are appropriate for
right-to-left text, but which are not mirrored substitutions. (Mirrored forms
of glyphs should be handled by the \`rtlm\` feature.)


No examples of this feature being used as described have been found; Noto
Sans Tifinagh uses the feature to mirror glyphs when Tifinagh is being set
right-to-left (e.g. when used to write Tuareg).
`,done:!0,example:{font:"Noto Sans Tifinagh",text:"ⵎⵉⴷⴷⵏ"},status:null},rtlm:{title:"Right-to-left mirrored forms",registered:"Adobe",group:"Preprocessing",order:3,state:"required",description:`When a bidirectional text is being laid out, any characters which have the
\`Bidi_Mirrored\` Unicode property and whose directionality is resolved to RTL
will be replaced by their mirrored equivalents. This mirroring is specified
by the [Unicode Bidirectional Algorithm](https://unicode.org/reports/tr9/#L4),
and is performed by the layout engine prior to shaping.


However, a font may contain mirrored glyphs for characters which do *not* have
the \`Bidi_Mirrored\` property (and thus are not handled by the Unicode bidirectional
algorithm), but which are required to be mirrored when displayed in right-to-left settings.
For example, mathematical characters such as the square root sign (√) and
intergral sign (∫) do not have mirrored forms encoded in Unicode, but should be
mirrored in right-to-left text.
`,done:!0,example:{font:"Noto Sans Math",text:"∫√x"},status:null},ruby:{title:"Ruby Notation Forms",registered:"Adobe",description:`In Japanese typesetting, words written in kanji may be superscripted by
the kana transliteration of the words to aid with reading. (In vertical
settings, the transliteration is placed to the right.) These subscripted
kana, called *furigana* or ruby, are scaled down to a reduced size relative
to the main text. Scaling and positioning is applied by the typesetting
engine, but the font may wish to provide alternate forms of the kana
when they are being used in a ruby context - for example, slightly bolder
forms such that they will maintain the correct weight when scaled down to
ruby size, or different forms that are more legible when displayed at a
smaller size.
`,fea:`feature ruby {
  sub ka-hira by ka-hira.ruby;
  sub sa-hira by sa-hira.ruby;
  # ...
} ruby;
`,done:!0,ui:`In the OS X typography panel, this feature is accessed via "Ruby Glyphs".
`,state:null,status:null},rvrn:{title:"Required Variation Alternates",group:"Preprocessing",order:0,registered:"Microsoft",state:"required",description:`OpenType Font Variations provides for the ability for different features to
apply at different point of the variation space. For example, consider a
font with a weight axis - when the weight is greater than 600, the designer
wants the \`dollar\` glyph to be substituted for a simplified form to avoid
crowding the internal counterspace. This facility is called "feature variation",
and because it is implemented by substitution, it allows for different portions
of the variation space to represent the same character using different glyphs
and therefore different outlines; this in turn means that designers can implement
variations without being forced to make the outlines compatible between
dramatically different forms.


According to the OpenType specification, feature variation can be applied to
*any* feature. However, Microsoft registered the \`rvrn\` feature specifically
for processing feature variations early in the shaping process. This may not
turn out to be the best approach, as future rules now need to take into account
not just the original glyph but any substitutions; it may be better to perform
design-specific substitutions *after* all orthographic substitutions have between
completed.


Both Harfbuzz and CoreText process feature variations in features other than
the \`rvrn\` feature. I have not been able to ascertain whether or not the Microsoft
shapers process feature variation tables in other features. If they do - and
if font creation tools allow for creating feature variation tables in other
features - then this feature could be considered technically redundant.
`,done:!0,status:null},salt:{title:"Stylistic Alternates",registered:"Adobe",state:"discretionary",status:"discouraged",automatic:!0,description:"Prior to the introduction of multiple stylistic sets (see the `ss01` feature),\nthis feature was used to select alternate aesthetic forms of glyphs which do\nnot correspond to the descriptions of other features. Currently, this feature\nis generally implemented by font editors either by replicating the rules of `ss01`\nor by combining *all* stylistic alternate substitutions.\n\n\nStylistic sets (`ss01`...`ss20`) should be used in current fonts in preference\nto this feature, as UI support for the `salt` feature is not always available.\n",done:!0},sinf:{title:"Scientific Inferiors",registered:"Microsoft/Adobe",state:"discretionary",automatic:!0,description:`This feature replaces glyphs with subscript forms, similar to the \`subs\` feature,
but in theory for a wider range of glyphs (including Latin letters),
generally for chemical or mathematical notation.


Also, in theory, subscript numerals should sit on the baseline, while scientific
inferiors should bisect the baseline

In practice, the same substitutions are often made as those in the \`subs\` feature.
`,example:{font:"Alegreya",text:"H2O"},ui:'In the OS X typography panel, this feature is accessed via "Vertical Position > Scientific Inferiors".',done:!0,status:null},size:{status:"deprecated",registered:"Adobe",title:"Optical size",description:`This feature was intended as a way to store information about the optical size of the font
and the font's relationship to other optical size variants in the same family. It has
been entirely superseded by the \`STAT\` table, and should not be used.
`,done:!0,state:null},smcp:{title:"Small Capitals",registered:"Adobe",state:"discretionary",automatic:!0,description:"Substitutes lowercase characters for small capitals. Small capitals are often used to set acronyms. Compare with `c2sc`, which substitutes uppercase letters for small capitals.\n\nNote that as this feature changes the case of the glyph, font engineers should ensure that any language-specific localisations are taken into account during case conversion - for example, when applying this feature to the letter `i` in Turkish, the returned form should appear with a dot above. (This is often achieved by replacing i with `idotless dotaccent` or similar in the `locl` feature.)\n",fea:`feature smcp {
  sub a by A.sc;
  sub b by B.sc;
  # ...
} smcp;
`,example:{font:"EB Garamond",text:"This"},ui:`In the OS X typography panel, this feature is accessed via "Lowercase ->
Small Capitals."


In CSS, this feature can be set with \`font-variant-caps: small-caps;\`
`,done:!0,status:null},smpl:{title:"Simplified Forms",registered:"Adobe",description:`This feature was intended for converting Chinese or Japanese glyphs to simplified forms.
No fonts implementing this feature have been identified and it is not
specified in the Adobe Japan1 glyph set. As with the \`hngl\` feature,
character semantics should be selected using the input method environment,
rather than the font, and hence this feature is discouraged.
`,status:"discouraged",done:!0,state:null},ss01:{title:"Stylistic Set 1 - Stylistic Set 20",registered:"Tiro Typeworks",state:"discretionary",automatic:!0,description:`These features - ranging from \`ss01\` to \`ss20\` - allow for stylistic variations
of *sets* of characters to vary in a common way. This is distinct from the
\`cv01\`-\`cv99\` features which allow characters to vary arbitrarily with no
implication of any common variations across a range of glyphs.


For example, in the font Cormorant, stylistic set 01 changes the terminals
of capital letters; stylistic set 02 opens the counters of glyphs with
counters; stylistic set 03 replaces double-storey glyphs (\`g\`, \`a\`) with
single-storey forms, and so on.


When this feature is coded manually, stylistic sets may be given
identifying names to be displayed in the user interface. See the
[Adobe feature file specification](http://adobe-type-tools.github.io/afdko/OpenTypeFeatureFileSpecification.html#8.c)
for the format of these names.


These features are an extension to (and repacement for) the \`salt\` feature,
which only provides access to a single stylistic set.
`,fea:`feature ss01 {
  featureNames {
    name "Alternate terminals";
  }
  sub A by A.ss01;
  sub B by A.ss01;
} ss01;
`,example:{font:"Cormorant",text:"QUACK"},done:!0,ui:'In the OS X typography panel, this feature is accessed via "Alternative Stylistic Sets".',status:null},ssty:{title:"Math script style alternates",registered:"Microsoft",script:{math:null},example:{math:"<msup> <mi>x</mi> <msup> <mi> x </mi> <mi>x</mi> </msup> </msup>"},description:`This feature is used by the math layout engine to select glyph variants
used in subscripts and superscripts. When the engine lays out a glyph as
a superscript or subscript, it will first determine the script level: 1
for first-level sub-/superscripts and 2 for higher levels. It will then
supply the script level as a parameter to a GSUB3 alternate substitution
rule in this feature to obtain the correct glyph variant.


The glyph variant will then be scaled by the math layout engine based on
the factor specified in the MATH table (\`MATH.MathConstants.scriptPercentScaleDown\`
for first-level sub-/superscripts and \`MATH.MathConstants.scriptScriptPercentScaleDown\`
for higher level scripts). As the scaling will be performed by the layout
engine, the form of the glyphs substituted in this feature should not be
scaled or repositioned. For example, the STIX Math Two font shown in the
example uses slightly bolder script alternates so that the glyph weights
appear consistent when scaled down.
`,done:!0,state:null,status:null},stch:{title:"Stretching Glyph Decomposition",registered:"Microsoft",state:"required",group:"Common",script:{arab:{order:0},syrc:{order:0}},description:`Right.


The \`stch\` feature is part of the Arabic complex shaper. (It is the first
feature processed in the glyph preprocessing phase). It was designed to
implement the Syriac Abbreviation Mark (U+070F), which stretches to fill the
width of the enclosed text.


The feature should be implemented by the font engineer as a multiple substitution,
replacing the glyph mapped to U+070F with an *odd number of glyphs*. When applying
the feature, the shaper performs the following actions:


  * The substitution rules specified in the \`stch\` feature are applied, and the
  sequence of glyphs returned by the rule applications are collected.

  * The first glyph in the returned sequence is placed at the start of the glyph stream.

  * The final glyph in the returned sequence is placed at the end of the glyph stream.

  * At the end of processing, after positioning rules have been applied, the
    width of the whole glyph stream is calculated.

  * Next, odd-numbered glyphs inside the returned sequence other than the
    first and final glyph are positioned such that they are distributed
    evenly across the glyph stream. (For example, if there are five glyphs in the
    sequence returned from \`stch\`, the third glyph is positioned horizontally
    to appear in the middle of the glyph stream. If there are seven glyphs, the
    third glyph is positioned to appear one-third of the way along the glyph
    stream, and the fifth to appear two-thirds of the way along.)

  * Finally, even-numbered glyphs inside the returned sequence are positioned
    and *repeated* such that their widths completely fill the spaces between
    the odd-numbered glyphs.

Further: the first and last glyphs in the returned sequence may be base glyphs
or mark glyphs, and should have a non-zero horizontal advance. The
remaining glyphs must be set as mark glyphs, but should also have a non-zero
horizontal advance.


Note that although the OpenType specification describes this feature as having
no "script/language sensitivity", and in theory can be applied to any situation
where a glyph is decomposed and repeated to stretch over an enclosed sequence
of glyphs (for example, enclosed numbers, Arabic year or end-of-aya marks, etc.),
it is only processed as part of the Arabic complex shaper.


Note also that as of macOS 11.4, the CoreText shaper does not apply this feature,
and even if the feature is manually applied, the CoreText shaper does not implement
the distribution and stretching algorithm required to make the feature operated
as expected. This has led some font engineers to create their own, manual
implementation inside the font; while this is an interesting engineering exercise,
adding in the repeated glyphs manually inside the \`stch\` feature leads to
erroneous results when such a font is used with a shaping engine which *does*
implement \`stch\` as specified, and cannot be recommended.
`,fea:`feature stch {
  sub abbreviation-syriac by
    abbreviation-syriac.start
    abbreviation-syriac.line
    abbreviation-syriac.linedot
    abbreviation-syriac.line
    abbreviation-syriac.end;
} stch;
`,done:!0,status:null},subs:{title:"Subscript",registered:"Microsoft/Adobe",state:"discretionary",automatic:!0,description:`This feature replaces glyphs, typically numerals, with subscript forms.
`,example:{font:"Alegreya",text:"H2O"},ui:'In the OS X typography panel, this feature is accessed via "Vertical Position > Inferiors/Subscripts".',done:!0,status:null},sups:{title:"Superscript",registered:"Microsoft/Adobe",state:"discretionary",automatic:!0,description:`This feature replaces glyphs with superscript forms, typically for use as footnote
references.
`,example:{font:"Alegreya",text:"2 HI. a,b,c"},ui:'In the OS X typography panel, this feature is accessed via "Vertical Position > Superiors/Superscripts".',done:!0,status:null},swsh:{title:"Swash",registered:"Microsoft/Adobe",state:"discretionary",automatic:!0,description:`This feature is used to replace glyphs with swash forms - typically, but not
exclusively, swash capitals. Although the OpenType standard suggests that
multiple swash alternates may be selected by providing a GSUB3 (\`sub ... from ...\`)
rule for this feature, in reality most implementations expect a single swash
alternate, and users may have difficulty accessing glyphs other than the first
alternate. For this reason, we recommend using GSUB1 (\`sub @chars by @chars.swsh\`)
rules for this feature.


See also the \`cswh\` feature for contextual swash forms.
`,example:{font:"Playball",text:"Fake It"},ui:'In the OS X typography panel, this feature is accessed via "Contextual Alternates > Swash Alternates".',done:!0,status:null},titl:{title:"Titling",registered:"Adobe",state:"discretionary",automatic:!0,description:`This feature substitutes glyphs for alternate forms designed for titling,
typically some or all capital letters.
`,example:{font:"Work Sans",text:"PÖW"},done:!0,ui:`In the Mac OS X typography panel, this feature is accessed via "Style Options >
Titling Capitals".
`,status:null},tjmo:{title:"Trailing Jamo Forms",registered:"Microsoft",group:"Topographical",state:"required",script:{hang:3},description:`The Korean Hangul script is encoded in Unicode in two ways: first, as a series
of precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as
a series of indivdual, conjoining *jamo*. Korean syllables form a LVT?
(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant
(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)
jamo are encoded between U+1160 and U+11A7, and the optional trailing consonant
(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul
Jamo Unicode block; other jamo are encoded in extension blocks.)


The Hangul shaper will first attempt to compose any sequences of conjoining jamo
into an encoded form in the precomposed syllable block. But where this is not
successful - for example, in an Old Korean form which is not encoded in Unicode
as a precomposed syllable - then the shaper will instead *decompose* any LV
syllables to break the syllable into separate L, V, and T? characters, and then
apply the Korean shaping features (\`ljmo\`, \`vjmo\`, \`tjmo\`) to select forms of
the jamo which are appropriately positioned and sized to combine into the correct
grapheme-image.


For example, the Old Korean syllable ᄒᆞᆯ is not encoded in Unicode as a precomposed
syllable, and so must be encoded with the three individual jamo. The Hangul
shaper applies the \`ljmo\` feature to the *choseong*, the \`vjmo\` feature to the
*jungseong* and the \`tjmo\` feature to the *jongseong*. The resulting sequence
produces a glyph which renders the syllable correctly, with the \`vjmo\` and
\`tjmo\` generally producing zero-width mark glyphs positioned appropriately. An
alternative to this technique is to use the \`ccmp\` feature to turn decomposed
jamo into a precomposed glyph.


For further information, see sections 3.12 and 18.6 of the Unicode Standard.
`,done:!0,status:null},tnam:{title:"Traditional Name Forms",registered:"Adobe",status:"discouraged",description:`This feature was intended for selecting traditional forms of kanji used in personal
names. No fonts implementing this feature have been identified and it is not
specified in the Adobe Japan1 glyph set; font developers should place any such
substitutions in the \`trad\` feature instead.
`,done:!0,state:null},tnum:{title:"Tabular Figures",registered:"Microsoft/Adobe",automatic:!0,description:"This feature replaces proportional figures by tabular (fixed-width) variants.\nSee also the `onum`, `lnum` and `pnum` features. Note that where the default\nform is tabular, this feature has no effect, although some font editors\nprovide rules for this feature in any case.\n",fea:`feature tnum {
  sub one by one.tf;
  sub two by two.tf;
  sub three by three.tf;
  #...
} tnum;
`,done:!0,example:{font:"Work Sans",text:"|1|2|3|4|"},ui:`In the OS X typography panel, this feature is accessed via "Number Spacing >
Monospaced Numbers".


In CSS, this feature can be accessed through the \`font-variant-numeric: tabular-nums\` property.
`,state:null,status:null},trad:{title:"Traditional Forms",registered:"Adobe",description:`The expected forms of Japanese kanji have evolved and simplified over time. However,
in particular situations - often in the display of personal names - older,
"traditional" forms (*kyujitai*) are still preferred. This feature allows a user to enter
text as normal (i.e. with the Unicode codepoint for a more common, simplified
form) but have it substituted typographically for the traditional glyph. For
example, to typeset the name Sakae as 榮 (a variant found in south west Japan),
the user would enter the reading さかえ in their input method environment, and
have it converted to 栄, the usual kanji for this word. Applying the \`trad\`
feature would replace 栄 with 榮.


Note that where traditional forms have their own Unicode codepoints, using these
codepoints directly is preferred, to avoid ambiguity and to preserve the distinction
in the source text. In some cases (for example, the traditional form of 朗),
*kyujitai* were not separately encoded in Unicode due to Han unification, and
so the \`trad\` feature is necessary to access these glyphs.


The expected substitutions of the \`trad\` feature are defined in terms of the
[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.
Engineers creating Japanese fonts according to that glyphset should read the
information at the Adobe-Japan1 repository, and use the latest version of the
feature code provided there to implement this feature.
`,fea:`feature trad {
  sub uni4E9C by uni4E9E;
  sub uni60AA by uni60E1;
  sub uni9BF5 by uni9C3A;
  sub uni5727 by uni58D3;
  sub uni56F2 by uni570D;
  sub uni7AC3 by uni7AC3.jp78;
  sub uni6717 by uni6717.trad;
  # ...
} trad;
`,example:{text:"朗栄圧",font:"Kiwi Maru"},done:!0,state:null,status:null},twid:{title:"Third Widths",automatic:!0,state:"discretionary",registered:"Adobe",description:"This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-third of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of three\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `hwid`, `qwid`.\n",fea:`feature twid {
  sub one by one.twid;
  sub two by two.twid;
  # ...
}
`,example:{font:"Feature Sans",text:"か123か"},ui:'In the OS X typography panel, this feature is accessed via "Text spacing > Third Width".',done:!0,status:null},unic:{title:"Unicase",registered:"Tiro Typeworks",description:`This feature was intended for mapping both upper- and lowercase letters
to a "unicase" alphabet, a set of glyphs with a common glyph height using
a mix of upper- and lowercase glyph forms. (For example, a font may use
the lowercase style of \`a\` but the uppercase style of \`B\`, but both glyphs
will have the same height; see Bradbury Thompson's [Alphabet 26](https://en.wikipedia.org/wiki/Bradbury_Thompson#Alphabet_26)
or Zuzana Licko's [Filosofia Unicase](https://www.emigre.com/Fonts/Filosofia).)
`,ui:"This feature can be activated using the CSS rule `font-variant-caps: unicase`,\nsubject to browser support.\n",done:!0,state:null,status:null},valt:{title:"Alternate Vertical Metrics",registered:"Adobe",status:"discouraged",description:`The intention behind this feature was to reposition full-width glyphs
(e.g. U+FF01-U+FF60) so that they would be visually
centered inside the em-square in vertical typesetting context.


However, a more appropriate way to achieve this visual repositioning is to
supply alternate metrics for these glyphs in the \`vmtx\` and \`VORG\` tables.
As such, this feature has only been implemented extremely rarely, and,
despite the description in the OpenType standard, Harfbuzz does not apply
it by default in vertical layout.
`,done:!0,state:null},vatu:{title:"Vattu Variants",registered:"Microsoft",group:"Orthographic",script:{INDIC:{order:8},USE:{order:0}},state:"required",description:`This feature is intended to replace consonant + below-base (vattu) sequences
with ligature forms for fonts supporting the legacy (v1) shaping engine.


For example, in Devanagari, the \`<virama> <ra>\` sequence is normally replaced
by a below-base Ra by the \`blwf\` feature. However, "for certain consonants,
the mark RAsub may graphically combine with the consonant to form a conjunct
ligature form." (Unicode Standard, [section 12.1](https://www.unicode.org/versions/Unicode13.0.0/ch12.pdf), "Rendering Rules", R7.)
This combination is performed by the \`vatu\` feature in the v1 shaping engine
(e.g. \`deva\` script).


For fonts using the new shaper (\`dev2\`), the \`rkrf\` feature is used instead to
substitute the whole \`<consonant> <virama> <ra>\` sequence for a ligature in one rule.
Fonts which wish to support both v1 and v2 shapers should provide both \`rkrf\`
(in the \`dev2\` script) and \`blwf\`/\`vatu\` (in \`deva\` script).


As an orthographic feature, the scope of application of this feature is
scoped to each syllabic cluster.


Note that this feature is also used as a "signal" to the shaping engine for reordering
purposes: that is, if a virama-consonant pair would be substituted by this feature,
then that consonant is placed in the below-base position when the syllable is reordered.
`,fea:`feature vatu {
  script deva;
  sub Ka.dv Vattu.dv by KaRa.dv;
  sub Kha.dv Vattu.dv by KhaRa.dv;
  sub Ga.dv Vattu.dv by GaRa.dv;
  # ...
} vatu;
`,done:!0,status:null},vchw:{state:"discretionary",title:"Vertical Contextual Half-width Spacing",registered:"Adobe/W3C",description:`This feature is the vertical equivalent of \`chws\`; it is intended to improve
the appearance of text set with software which does *not* implement the full
JLREQ spacing rules, but does implement vertical typesetting.

This feature is relatively new as of 2021, no implementations have been
identified, and to be honest, any layout engine which bothers to support
vertical typesetting correctly is probably also going to implement JLREQ
spacing as well.
`,done:!0,status:null},vert:{title:"Vertical Alternates",registered:"Microsoft/Adobe",state:"required",group:"Typographic",description:"This feature is applied automatically by the shaping engine at the end of\nrequired processing and before discretionary processing when the script\ndirection is set to vertical; it replaces the horizontal positioning and\ntypographic presentation group (`calt`/`clig`/`curs`/`dist`/`kern`/`liga`/`rclt`).\n\n\nIt should be used to replace any glyphs with forms which are more appropriate\nto vertical presentation. For example, punctuation such as ellipses and parenthesis\nshould be replaced with rotated forms, Japanese small kana should be positioned in the\nupper right quadrant of the em square, and Japanese ligature forms (U+32FF-33FF) should\nbe replaced with versions which preserve reading order when read vertically.\n\n\nNote that, aside from supporting CJK vertical presentation, this feature\nshould also be used for typographic presentation rules for fonts supporting\nother vertical writing systems, such as Mongolian.\n\n\nNot also that if the `vrt2` feature is present, this feature will be used instead\nby Microsoft shaping engines. Indeed, Windows 2000 and NT4.1 *require* the use\nof a `vrt2` feature for CFF-outline fonts. However, Harfbuzz and Adobe shapers\nuse `vert` exclusively. See discussion in `vrt2`.\n",fea:`feature vert {
  sub ellipsis by uniFE19;
  sub twodotenleader by twodotenleader.vert;
  sub uniFF08 by uniFE35;
  sub uniFF09 by uniFE36;

  sub uni32FF by uni32FF.vert;
  # ...
} vert;
`,example:{font:"Reggae One",text:"（㌀）"},done:!0,status:null},vhal:{title:"Alternate Vertical Half Widths",automatic:!0,state:"discretionary",registered:"Adobe",description:"This feature is similar to the `halt` feature, in that it re-spaces full-width\nglyphs to fit on a half-em, but `vhal` is used in vertical typesetting,\nre-spacing heights instead of widths.\n",fea:`feature vhal {
  pos [degree.full minute.full quotedblright.full quoteright.full second.full uni3001 uni3002 uni3009 uni300B uni300D uni300F uni3011 uni3015 uni301F uniFF09 uniFF0C uniFF0E uniFF3D uniFF5D] <0 -500 0 0>;
  pos [quotedblleft.full quoteleft.full uni3008 uni300A uni300C uni300E uni3010 uni3014 uni301D uniFF08 uniFF3B uniFF5B] <0 -500 0 -500>;
  pos [uni30FB uniFF01 uniFF1A uniFF1B] <0 -250 0 -500>;
} vhal;
`,done:!0,ui:"Unknown. Contributions welcome.",status:null},vjmo:{title:"Vowel Jamo Forms",registered:"Microsoft",group:"Topographical",state:"required",script:{hang:2},description:`The Korean Hangul script is encoded in Unicode in two ways: first, as a series
of precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as
a series of indivdual, conjoining *jamo*. Korean syllables form a LVT?
(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant
(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)
jamo are encoded between U+1160 and U+11A7, and the optional trailing consonant
(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul
Jamo Unicode block; other jamo are encoded in extension blocks.)


The Hangul shaper will first attempt to compose any sequences of conjoining jamo
into an encoded form in the precomposed syllable block. But where this is not
successful - for example, in an Old Korean form which is not encoded in Unicode
as a precomposed syllable - then the shaper will instead *decompose* any LV
syllables to break the syllable into separate L, V, and T? characters, and then
apply the Korean shaping features (\`ljmo\`, \`vjmo\`, \`tjmo\`) to select forms of
the jamo which are appropriately positioned and sized to combine into the correct
grapheme-image.


For example, the Old Korean syllable ᄒᆞᆯ is not encoded in Unicode as a precomposed
syllable, and so must be encoded with the three individual jamo. The Hangul
shaper applies the \`ljmo\` feature to the *choseong*, the \`vjmo\` feature to the
*jungseong* and the \`tjmo\` feature to the *jongseong*. The resulting sequence
produces a glyph which renders the syllable correctly, with the \`vjmo\` and
\`tjmo\` generally producing zero-width mark glyphs positioned appropriately. An
alternative to this technique is to use the \`ccmp\` feature to turn decomposed
jamo into a precomposed glyph.


For further information, see sections 3.12 and 18.6 of the Unicode Standard.
`,done:!0,status:null},vkna:{title:"Vertical Kana Alternates",registered:"Adobe",state:"discretionary",description:`This feature replaces standard kana forms with glyphs which are designed
specifically for vertical layout. This may take a variety of forms: fonts
designed with proportional kana might provide fixed-width em-square kana
glyphs; glyphs may be raised from the horizontal baseline and centered
within the em-square; or structural changes may be made analogous to the
\`hkna\` feature. In many fonts, vertical alternates are only provided for
the "small" kana.
`,example:{font:"Cherry Bomb One",text:"シャットアップ"},fea:`feature hkna {
  sub ka-hira by ka-hira.vkna;
  sub sa-hira by sa-hira.vkna;
  sub ta-hira by ta-hira.vkna;
  # ...
} hkna;
`,ui:`In the Mac OS X typography panel, this feature is accessed via "Optimized
Kana Alternatives -> Vertical Alternatives".
`,done:!0,status:null},vkrn:{title:"Vertical Kerning",registered:"Adobe",description:"This feature is the equivalent to kerning (see `kern`) for vertical layout, with\nthe exception of the fact that this is *not* necessarily applied by default.\nHarfbuzz and Adobe shapers do not apply it by default in vertical settings,\nand font designers should consider using the `vert` feature instead for maxium compatibility.\n",done:!0,state:null,status:null},vpal:{title:"Proportional Alternate Vertical Metrics",registered:"Adobe",description:`This feature is the vertical equivalent of the \`palt\` feature; it uses
positioning rules to convert full-em glyphs into proportional glyphs
by aftering their position and Y-advance.
`,fea:`feature vpal {
  pos uniFF41 <0 -186 0 -373>;
  pos uniFF42 <0 -148 0 -346>;
  pos uniFF43 <0 -220 0 -441>;
  pos uniFF44 <0 -176 0 -353>;
  # ...
} vpal;
`,done:!0,state:null,status:null},vrt2:{title:"Vertical Alternates and Rotation",status:"discouraged",registered:"Adobe",description:`This feature was intended as a replacement for the \`vert\` feature. The idea
was that this feature would contain rules for vertical alternates as per \`vert\`
and also rules which replace Latin glyphs by rotated forms; this would mean
that the layout process for vertical text would be greatly simplified:
the layout engine could simply apply the \`vrt2\` feature to both CJK and
Latin text, and not need to rotate any glyphs.


However, this model of layout [was not widely accepted](https://lists.freedesktop.org/archives/harfbuzz/2013-August/003490.html),
and the older \`vert\` feature continues to be the most compatible approach to
vertical typesetting. For that reason, the use of this feature is *discouraged*
in favour of \`vert\`.
`,done:!0,state:null},vrtr:{title:"Vertical Alternates for Rotation",registered:"Adobe/Microsoft/W3C",description:`This feature is intended to select alternate glyphs to be used in vertical
typesetting. When the \`writing-mode\` CSS property is set to \`vertical-lr\`
or \`vertical-rl\`, certain glyphs are rotated 90 degrees clockwise by the
rendering engine.

However, prior to rotation, the font may wish to substitute glyphs which
are designed for vertical settings. These glyphs will still be rotated by
the rendering engine, but will be visually distinct from the original forms.


This feature is relatively new as of 2021, and no implementations have been
identified.
`,done:!0,state:null,status:null},zero:{title:"Slashed Zero",registered:"Adobe",description:`This feature allows the user to change between the default form of zero
(without a slash) to a form with a slash through the counter.
`,automatic:!0,fea:`feature zero {
  sub zero by zero.zero;
}
`,example:{font:"Work Sans",text:2021},ui:`In the OS X typography panel, this feature is accessed via "Typographic
Extras > Slashed Zero".
`,done:!0,state:null,status:null}},Ta=new Map,Vn=e=>{const t=Ta.get(e);if(t)return t;const n=Object.prototype.hasOwnProperty.call(ka,e)?ka[e]:null;let a;switch(e.slice(0,2)){case"ss":{a=`Stylistic Set ${Number(e.slice(2))}`;break}case"cv":{a=`Character Variant ${Number(e.slice(2))}`;break}default:a=(n==null?void 0:n.title)??null}const i={name:a,description:(n==null?void 0:n.description)??"",required:(n==null?void 0:n.state)==="required"};return Ta.set(e,i),i},Fa=e=>{const t=(a,i)=>{if(Object.prototype.hasOwnProperty.call(i,a.tag)){const r=i[a.tag];if(r.length>0)return r.map(s=>dn(s)).join(", ")}return`${dn(a.min)}, ${dn(a.max)}`},n=(a,i)=>{const r={};for(const[s,o]of Object.entries(a)){let c;switch(o.type){case"single":{c={type:"single",value:o.value};break}case"variable":{const l={weight:"wght",width:"wdth",italic:"ital",slant:"slnt"}[s];c={type:"variable",value:{min:o.value.min,defaultValue:o.value.defaultValue,max:o.value.max,curMin:O(o.value.min),curMax:O(o.value.max),curSingle:O(o.value.defaultValue),curMultiValue:O(l?t({tag:l,...o.value},i):""),mode:O("range")}};break}}r[s]=c}return r};return ws(e).map(a=>{const i={features:[],stylisticSets:[],characterVariants:[]};for(const r of a.features){if(Vn(r.tag).required)continue;const s=/(?:ss|cv)\d{2}/.test(r.tag);(s&&r.tag.slice(0,2)==="ss"?i.stylisticSets:s&&r.tag.slice(0,2)==="cv"?i.characterVariants:i.features).push({feature:r,include:O(r.keepByDefault)})}return{name:a.name,fonts:a.fonts.map(({font:r,styleValues:s})=>({font:r,styleSettings:n(s,a.axisInstanceValues)})),settings:{styleSettings:n(a.styleValues,a.axisInstanceValues),axisSettings:a.axes.map(r=>({tag:r.tag,name:r.name??r.tag,range:{min:r.min,defaultValue:r.defaultValue,max:r.max,curMin:O(r.min),curMax:O(r.max),curSingle:O(r.defaultValue),curMultiValue:O(t(r,a.axisInstanceValues)),mode:O("range")}})),includeFeatures:i,includeCharacters:{includeAllCharacters:O(!1),characterSets:O([{includeNamedSubsets:a.namedSubsets.map(r=>({name:r,include:O(!0)})),includeUnicodeRanges:O(""),name:O("")}])}},enableSubsetting:O(!0)}})},dn=e=>Math.round(e*1e3)/1e3,zn=e=>({curMin:e.curMin.value,curMax:e.curMax.value,curSingle:e.curSingle.value,curMultiValue:e.curMultiValue.value,mode:e.mode.value}),Us=e=>e.type==="single"?e:{type:"variable",value:zn(e.value)},Wn=e=>{const t={};for(const n of["weight","width","italic","slant"])e[n]&&(t[n]=Us(e[n]));return t},Fi=e=>{const t=n=>n.map(({feature:a,include:i})=>({tag:a.tag,include:i.value}));return{styleSettings:Wn(e.styleSettings),axisSettings:e.axisSettings.map(({tag:n,name:a,range:i})=>({tag:n,name:a,range:zn(i)})),includeFeatures:{features:t(e.includeFeatures.features),stylisticSets:t(e.includeFeatures.stylisticSets),characterVariants:t(e.includeFeatures.characterVariants)},includeCharacters:{includeAllCharacters:e.includeCharacters.includeAllCharacters.value,characterSets:e.includeCharacters.characterSets.value.map(({includeNamedSubsets:n,includeUnicodeRanges:a,name:i})=>({includeNamedSubsets:n.map(({name:r,include:s})=>({name:r,include:s.value})),includeUnicodeRanges:a.value,name:i.value}))}}},pn=e=>{const t=[];for(const{font:n,styleSettings:a}of e.fonts)t.push({fontUid:n.uid,styleSettings:Wn(a)});return{name:e.name,fonts:t,settings:Fi(e.settings),enableSubsetting:e.enableSubsetting.value}},Ai=(e,t)=>{e.curMin.value=Math.max(t.curMin,e.min),e.curMax.value=Math.min(t.curMax,e.max),e.curSingle.value=Math.max(e.min,Math.min(t.curSingle,e.max)),e.curMultiValue.value=t.curMultiValue,e.mode.value=t.mode},Ot=(e,t)=>{for(const{tag:n,range:a}of t){const i=e.find(({tag:r})=>r===n);i&&Ai(i.range,a)}},Ps=(e,t)=>{e.type!=="single"&&(t.type==="single"?(e.value.curSingle.value=Math.max(e.value.min,Math.min(t.value,e.value.max)),e.value.mode.value="single"):Ai(e.value,t.value))},De=(e,t)=>{for(const n of["weight","width","italic","slant"])!e[n]||!t[n]||Ps(e[n],t[n])},he=(e,t)=>{for(const{tag:n,include:a}of t){const i=e.find(({feature:r})=>r.tag===n);!i||Vn(i.feature.tag).required||(i.include.value=a)}},Ds=(e,t)=>{for(const{name:n,include:a}of t){const i=e.find(({name:r})=>r===n);i&&(i.include.value=a)}},Aa=e=>{const t={includeNamedSubsets:[],includeUnicodeRanges:O(e.includeUnicodeRanges),name:O(e.name??"")};return Ds(t.includeNamedSubsets,e.includeNamedSubsets),t},Fn=(e,t)=>{e.includeAllCharacters.value=t.includeAllCharacters,"characterSets"in t?t.characterSets.map(n=>Aa(n)):e.characterSets.value=[Aa(t)]},Ci=(e,t)=>{De(e.styleSettings,t.styleSettings),Ot(e.axisSettings,t.axisSettings),he(e.includeFeatures.features,t.includeFeatures.features),he(e.includeFeatures.stylisticSets,t.includeFeatures.stylisticSets),he(e.includeFeatures.characterVariants,t.includeFeatures.characterVariants),Fn(e.includeCharacters,t.includeCharacters)},gn=(e,t)=>{Ci(e.settings,t.settings);for(const{font:n,styleSettings:a}of e.fonts){De(a,t.settings.styleSettings);const i=t.fonts.find(({fontUid:r})=>r===n.uid);i&&De(a,i.styleSettings)}e.enableSubsetting.value=t.enableSubsetting},qs=e=>({settings:Fi(e.settings),type:"subsetSettingsV1"}),Bs=e=>({settings:Wn(e),type:"styleSettingsV1"}),Ls=e=>({settings:e.map(({tag:t,name:n,range:a})=>({tag:t,name:n,range:zn(a)})),type:"axisSettingsV1"}),$s=e=>({settings:{features:e.features.map(({feature:t,include:n})=>({tag:t.tag,include:n.value})),stylisticSets:e.stylisticSets.map(({feature:t,include:n})=>({tag:t.tag,include:n.value})),characterVariants:e.characterVariants.map(({feature:t,include:n})=>({tag:t.tag,include:n.value}))},type:"featureSettingsV1"}),Hs=e=>({settings:{includeAllCharacters:e.includeAllCharacters.value,characterSets:e.characterSets.value.map(({includeNamedSubsets:t,includeUnicodeRanges:n,name:a})=>({includeNamedSubsets:t.map(({name:i,include:r})=>({name:i,include:r.value})),includeUnicodeRanges:n.value,name:a.value}))},type:"includeCharactersSettingsV2"}),Vs=(e,t)=>{switch(t.type){case"subsetSettingsV1":{Ci(e.settings,t.settings);break}case"styleSettingsV1":{De(e.settings.styleSettings,t.settings);for(const n of e.fonts)De(n.styleSettings,t.settings);break}case"axisSettingsV1":{Ot(e.settings.axisSettings,t.settings);break}case"featureSettingsV1":{he(e.settings.includeFeatures.features,t.settings.features),he(e.settings.includeFeatures.stylisticSets,t.settings.stylisticSets),he(e.settings.includeFeatures.characterVariants,t.settings.characterVariants);break}}},zs=(e,t)=>{switch(t.type){case"subsetSettingsV1":{De(e,t.settings.styleSettings);break}case"styleSettingsV1":{De(e,t.settings);break}}},Ws=(e,t)=>{switch(t.type){case"subsetSettingsV1":{Ot(e,t.settings.axisSettings);break}case"axisSettingsV1":{Ot(e,t.settings);break}}},Js=(e,t)=>{switch(t.type){case"subsetSettingsV1":{he(e.features,t.settings.includeFeatures.features),he(e.stylisticSets,t.settings.includeFeatures.stylisticSets),he(e.characterVariants,t.settings.includeFeatures.characterVariants);break}case"featureSettingsV1":{he(e.features,t.settings.features),he(e.stylisticSets,t.settings.stylisticSets),he(e.characterVariants,t.settings.characterVariants);break}}},Ks=(e,t)=>{switch(t.type){case"subsetSettingsV1":{Fn(e,t.settings.includeCharacters);break}case"includeCharactersSettingsV1":case"includeCharactersSettingsV2":{Fn(e,t.settings);break}}},Ca=new Kt,Xs=new ms;class Gs{constructor(){this.fonts=O([]),this.fontsBeingLoaded=O(0),this._exportedFonts=O({state:"not_loaded"}),this.exportedFonts=Mt(()=>this._exportedFonts.value),this.exportSettings={formats:{ttf:O(!0),woff:O(!1),woff2:O(!0)},woffCompression:O(1),woff2Compression:O(11),includeTTFinCSS:O(!0)},this.cssPathPrefix=O("")}async removeFontFamily(t){this.fonts.value=this.fonts.value.filter(n=>n!==t),await Promise.all(t.fonts.map(({font:n})=>n.destroy()))}async removeFont(t){const n=this.fonts.peek().findIndex(o=>o.fonts.some(c=>c.font.id===t.id));if(n===-1)return;const a=this.fonts.peek()[n],i=[];for(const o of a.fonts)o.font.id!==t.id&&i.push(o.font);if(i.length===0)return await this.removeFontFamily(a);const r=this.fonts.peek().slice(0),s=Fa(i);for(const o of s)gn(o,pn(a));return r.splice(n,1,...s),this.fonts.value=r,await t.destroy()}async addFonts(t){this.fontsBeingLoaded.value+=t.length;try{const n=await Promise.all(t.map(u=>u.arrayBuffer().then(h=>new Uint8Array(h)))),a=[];for(let u=0;u<n.length;u++)Kt.compressionType(n[u])!==null&&a.push(Ca.decompressToTTF(n[u]).then(g=>{n[u]=g}));a.length>0&&await Promise.all(a);const i=await Xs.loadFonts(n),r=this.fonts.peek().flatMap(u=>u.fonts.map(h=>h.font)),s=new Set(r.map(u=>u.uid)),o=[];for(const u of i)s.has(u.uid)?o.push(u):r.push(u);const c=new Map;for(const u of this.fonts.peek())c.set(u.name,pn(u));const l=Fa(r);for(const u of l){const h=c.get(u.name);h&&gn(u,h)}this.fonts.value=l,o.length>0&&await Promise.all(o.map(u=>u.destroy()))}finally{this.fontsBeingLoaded.value-=t.length}}addCharacterSet(t){const{characterSets:n}=t.settings.includeCharacters,i={includeNamedSubsets:n.value[0].includeNamedSubsets.map(({name:r})=>({name:r,include:O(!1)})),includeUnicodeRanges:O(""),name:O("")};n.value=[...n.value,i]}removeCharacterSet(t,n){const{characterSets:a}=t.settings.includeCharacters;a.value=a.value.filter(i=>i!==n)}exportFonts(){const t=r=>{switch(r.mode.value){case"single":return{type:"single",value:r.curSingle.value};case"range":return{type:"variable",value:{min:r.curMin.value,max:r.curMax.value,defaultValue:r.defaultValue}};case"multiple":{const s=Ti(r.curMultiValue.value);return s?{type:"multiple",value:{ranges:s,defaultValue:r.defaultValue}}:{type:"single",value:r.defaultValue}}}},n=r=>{const s={};for(const[o,c]of Object.entries(r))s[o]=c.type==="single"?c:t(c.value);return s},a=this.fonts.peek().map(r=>{const s=r.fonts.map(({font:u,styleSettings:h})=>({font:u,styleValues:n(h)}));if(!r.enableSubsetting.value)return{fonts:s,enableSubsetting:!1};const o={};for(const u of r.settings.axisSettings)o[u.tag]=t(u.range);const c={};for(const u of[r.settings.includeFeatures.characterVariants,r.settings.includeFeatures.stylisticSets,r.settings.includeFeatures.features])for(const h of u)c[h.feature.tag]=h.include.value;const l=r.settings.includeCharacters.includeAllCharacters.value?"all":r.settings.includeCharacters.characterSets.value.map(u=>{const h=[];for(const g of u.includeNamedSubsets)g.include.value&&h.push(g.name);return{includeNamedSubsets:h,includeUnicodeRanges:$n(u.includeUnicodeRanges.value)??[],name:u.name.value||void 0}});return{fonts:s,enableSubsetting:!0,styleValues:n(r.settings.styleSettings),axes:o,features:c,includeCharacters:l}}),i={ttf:this.exportSettings.formats.ttf.peek(),woff:this.exportSettings.formats.woff.peek(),woff2:this.exportSettings.formats.woff2.peek()};return Is(Ca,a,{formats:i,woffCompression:this.exportSettings.woffCompression.value,woff2Compression:this.exportSettings.woff2Compression.value,onProgress:r=>{this._exportedFonts.value={state:"loading",progress:r}}}).then(r=>{this._exportedFonts.value={state:"loaded",exportedFonts:r,exportedFormats:i}},r=>{this._exportedFonts.value={state:"error",error:r}})}saveAllSettings(){return{familySettings:this.fonts.value.map(n=>pn(n)),cssPathPrefix:this.cssPathPrefix.value,exportSettings:{formats:{ttf:this.exportSettings.formats.ttf.value,woff:this.exportSettings.formats.woff.value,woff2:this.exportSettings.formats.woff2.value},woffCompression:this.exportSettings.woffCompression.value,woff2Compression:this.exportSettings.woff2Compression.value,includeTTFinCSS:this.exportSettings.includeTTFinCSS.value},type:"AllSettingsV1"}}loadAllSettings(t){var a,i,r,s,o,c;if(typeof t!="object"||t===null||!("type"in t)||t.type!=="AllSettingsV1")return;const n=t;if(n.familySettings){const l=new Map;for(const u of n.familySettings)l.set(u.name,u);for(const u of this.fonts.value){const h=l.get(u.name);h&&gn(u,h)}}n.cssPathPrefix&&(this.cssPathPrefix.value=n.cssPathPrefix),(a=n.exportSettings)!=null&&a.formats.ttf&&(this.exportSettings.formats.ttf.value=n.exportSettings.formats.ttf),(i=n.exportSettings)!=null&&i.formats.woff&&(this.exportSettings.formats.woff.value=n.exportSettings.formats.woff),(r=n.exportSettings)!=null&&r.formats.woff2&&(this.exportSettings.formats.woff2.value=n.exportSettings.formats.woff2),(s=n.exportSettings)!=null&&s.woffCompression&&(this.exportSettings.woffCompression.value=n.exportSettings.woffCompression),(o=n.exportSettings)!=null&&o.woff2Compression&&(this.exportSettings.woff2Compression.value=n.exportSettings.woff2Compression),(c=n.exportSettings)!=null&&c.includeTTFinCSS&&(this.exportSettings.includeTTFinCSS.value=n.exportSettings.includeTTFinCSS)}}const Ni=Dn(void 0),Re=()=>{const e=dt(Ni);if(!e)throw new Error("No AppState provided");return e},Ys=()=>new Gs,Zs="_spinbox-wrapper_1knn6_249",Qs="_spinbox-display_1knn6_276",eo="_spinbox-field_1knn6_276",to="_spinbox-buttons_1knn6_299",no="_spinbox-button_1knn6_299",ao="_spinbox-button-divider_1knn6_320",io="_spinbox-up_1knn6_325",ro="_spinbox-down_1knn6_325",so="_icon-button_1knn6_342",oo="_toggle-icon_1knn6_355",lo="_toggledOn_1knn6_355",uo="_button-contents_1knn6_359",co="_checkbox-toggle_1knn6_366",ho="_disabled_1knn6_370",fo="_button_1knn6_359",po="_small_1knn6_443",z={spinboxWrapper:Zs,spinboxDisplay:Qs,spinboxField:eo,spinboxButtons:to,spinboxButton:no,spinboxButtonDivider:ao,spinboxUp:io,spinboxDown:ro,iconButton:so,toggleIcon:oo,toggledOn:lo,buttonContents:uo,checkboxToggle:co,disabled:ho,button:fo,small:po},go="_icon_1jahi_51",mo="_motif-monochrome_1jahi_58",yo="_motif-primary_1jahi_61",bo="_motif-success_1jahi_64",vo="_motif-warning_1jahi_67",wo="_motif-error_1jahi_70",_o="_clickable_1jahi_73",xo="_disabled_1jahi_84",So="_icon-button_1jahi_92",ko="_no-pointer_1jahi_136",To="_arrow-right_1jahi_140",Fo="_arrow-down_1jahi_145",Ao="_check_1jahi_155",Co="_close_1jahi_159",No="_copy_1jahi_163",Io="_download_1jahi_167",Mo="_error_1jahi_171",jo="_gear_1jahi_175",Oo="_github_1jahi_179",Eo="_paste_1jahi_183",Ro="_pin_1jahi_187",Uo="_plus_1jahi_191",Po="_range_1jahi_195",Do="_reset_1jahi_199",qo="_stack_1jahi_203",Bo="_upload_1jahi_207",Lo="_warning_1jahi_211",ie={icon:go,"motif-monochrome":"_motif-monochrome_1jahi_58",motifMonochrome:mo,"motif-primary":"_motif-primary_1jahi_61",motifPrimary:yo,"motif-success":"_motif-success_1jahi_64",motifSuccess:bo,"motif-warning":"_motif-warning_1jahi_67",motifWarning:vo,"motif-error":"_motif-error_1jahi_70",motifError:wo,clickable:_o,disabled:xo,"icon-button":"_icon-button_1jahi_92",iconButton:So,"no-pointer":"_no-pointer_1jahi_136",noPointer:ko,"arrow-right":"_arrow-right_1jahi_140",arrowRight:To,"arrow-down":"_arrow-down_1jahi_145",arrowDown:Fo,check:Ao,close:Co,copy:No,download:Io,error:Mo,gear:jo,github:Oo,paste:Eo,pin:Ro,plus:Uo,range:Po,reset:Do,stack:qo,upload:Bo,warning:Lo};var $=(e=>(e[e.PRIMARY=0]="PRIMARY",e[e.SUCCESS=1]="SUCCESS",e[e.WARNING=2]="WARNING",e[e.ERROR=3]="ERROR",e[e.MONOCHROME=4]="MONOCHROME",e))($||{});const de=({type:e,title:t,size:n,motif:a,className:i,noPointer:r,clickableStyle:s})=>{const o=typeof n=="string"?n:typeof n=="number"?`${n}px`:void 0,c=o?{width:o,height:o}:void 0;return f("div",{className:K(ie.icon,ie[e],{[ie.motifPrimary]:a===$.PRIMARY,[ie.motifSuccess]:a===$.SUCCESS,[ie.motifWarning]:a===$.WARNING,[ie.motifError]:a===$.ERROR,[ie.motifMonochrome]:a===$.MONOCHROME,[ie.noPointer]:r,[ie.clickable]:s},i),style:c,title:t??void 0})},fe=({type:e,title:t,size:n,onClick:a,disabled:i,motif:r,className:s})=>f("button",{className:K(ie.iconButton,{[ie.disabled]:i,[ie.motifPrimary]:r===$.PRIMARY,[ie.motifSuccess]:r===$.SUCCESS,[ie.motifWarning]:r===$.WARNING,[ie.motifError]:r===$.ERROR,[ie.motifMonochrome]:r===$.MONOCHROME},s),onClick:i?void 0:a,title:t,disabled:i,tabIndex:0,children:f(de,{type:e,title:null,size:n,motif:r,noPointer:!0})}),lt=({value:e,min:t,max:n,step:a=1,smartAim:i=0,className:r})=>{const s=I(x=>{const A=Number(x.target.value);e.value=A},[e]),o=I(x=>{x.preventDefault()},[]),c=I(()=>{e.value=Math.min(e.value+(a==="any"?1:a),n)},[e,a]),l=I(()=>{e.value=Math.max(e.value-(a==="any"?1:a),t)},[e,a]),u=ci(),h=Ee(!1),g=te(null);Nt(()=>()=>{g.current&&(window.removeEventListener("pointermove",g.current.move),window.removeEventListener("pointerup",g.current.up))},[]);const m=te({bottom:0,top:0}),v=te(0),d=te(!1),y=I(x=>{const M=x.currentTarget.getBoundingClientRect();m.current={bottom:M.bottom,top:M.top},v.current=e.value;const F=C=>{var G;let N=0;if(C.clientY<m.current.top?N=C.clientY-m.current.top:C.clientY>m.current.bottom&&(N=C.clientY-m.current.bottom),d.current=N!==0,!d.current)return;(G=document.getSelection())==null||G.empty();const j=N*(n-t)/200,W=v.current-j,U=Math.max(t,Math.min(W,n));let X=a==="any"?U:Math.round(U/a)*a;if(i>0){const P=Math.round(W/i)*i;Math.abs(P-W)<i/4&&(X=Math.max(t,Math.min(P,n)))}e.value=X},S=()=>{window.removeEventListener("pointermove",F),window.removeEventListener("pointerup",S)};g.current={move:F,up:S},window.addEventListener("pointermove",F),window.addEventListener("pointerup",S)},[]),p=I(()=>{h.value=!0},[h]),b=I(()=>{h.value=!1,e.value=Math.max(t,Math.min(e.value,n))},[h,e,t,n]),w=I(x=>{x==null||x.focus()},[]),_=Number(e.value.toFixed(12)).toString();return f("div",{className:K(z.spinboxWrapper,r),children:[h.value?f("input",{className:z.spinboxField,type:"number",min:t,max:n,step:a,value:Number(e.value.toFixed(12)),onInput:s,id:u,onBlur:b,ref:w}):f("div",{className:K(z.spinboxDisplay,"tabular-nums"),onInput:s,onDragCapture:o,id:u,onPointerDown:y,tabIndex:0,onFocus:p,"aria-valuemin":t,"aria-valuemax":n,"aria-valuenow":e.value,"aria-valuetext":_,role:"spinbutton",children:_}),f("div",{className:z.spinboxButtons,children:[f("div",{onClick:c,className:z.spinboxButton,role:"button","aria-controls":u,"aria-label":"Increment",children:f("div",{className:z.spinboxUp})}),f("div",{className:z.spinboxButtonDivider}),f("div",{onClick:l,className:z.spinboxButton,role:"button","aria-controls":u,"aria-label":"Decrement",children:f("div",{className:z.spinboxDown})})]})]})},$o=({type:e,title:t,toggled:n,innerRef:a})=>{const i=I(()=>{n.value=!n.value},[n]);return f("button",{className:K(z.iconButton,z.toggleIcon,{[z.toggledOn]:n.value}),onClick:i,role:"checkbox","aria-checked":n.value,title:t,ref:a,tabindex:0,children:f(de,{type:e,title:t})})},mn=({type:e,title:t,currentValue:n,value:a})=>{const i=I(()=>{n.value=a},[n]);return f("button",{className:K(z.iconButton,z.toggleIcon,{[z.toggledOn]:n.value===a}),onClick:i,role:"radio","aria-checked":n.value===a,title:t,tabindex:0,children:f(de,{type:e,title:t})})},Ne=({label:e,title:t,checked:n,disabled:a,indeterminate:i})=>{const r=I(o=>{o.preventDefault(),n.value=o.currentTarget.checked},[n]),s=I(o=>{o.preventDefault(),o.stopPropagation()},[]);return f("label",{className:K(z.checkboxToggle,{[z.disabled]:a}),title:t??void 0,"aria-disabled":a,children:[f("input",{type:"checkbox",checked:n.value,onInput:r,disabled:a,indeterminate:i}),f("span",{className:z.checkboxLabel,onMouseDown:s,children:e})]})},Xt=({value:e,small:t,className:n,...a})=>{const i=I(r=>{e.value=r.currentTarget.value},[e]);return f("input",{type:"text",className:K(n,t&&z.small),...a,value:e,onInput:i})},it=({children:e,className:t,...n})=>f("button",{...n,className:K(z.button,t),children:f("span",{className:z.buttonContents,children:e})}),Na=(e,t,n=!1)=>{let a,i=0;const r=(...s)=>{typeof a=="number"&&window.clearTimeout(a);const o=Date.now(),c=()=>{e(...s),i=o};o-i>=t&&!n?c():a=window.setTimeout(c,t)};return r.cancel=()=>{typeof a=="number"&&window.clearTimeout(a)},r},Jn=(e,t,n=!1)=>{const a=xe(()=>O(e.peek()),[e]),i=te();return Nt(()=>{const r=Na(s=>{a.value=s},t,n);return i.current=r,()=>{r.cancel()}},[e,t,n,Na]),Nt(()=>{i.current&&a.peek()!==e.value&&i.current(e.value)},[e,e.value]),a};let Ii="";const Mi=e=>(Ii=e,navigator.clipboard.writeText(e)),Ho=async()=>{try{return await navigator.clipboard.readText()}catch(e){if(e instanceof Error&&e.name==="NotAllowedError")return Ii;throw e}},Vo="_toast-container_sxaha_51",zo="_toast-wrapper_sxaha_67",Wo="_toast_sxaha_51",Jo="_success_sxaha_94",Ko="_warning_sxaha_99",Xo="_error_sxaha_105",Go="_toast-row_sxaha_111",Yo="_toast-icon_sxaha_119",Zo="_toast-contents_sxaha_123",Qo="_separate-contents_sxaha_127",el="_toast-title_sxaha_131",tl="_plain_sxaha_134",nl="_timeout-bar_sxaha_138",al="_toast-placeholder_sxaha_153",il="_error-message_sxaha_158",rl="_error-stack_sxaha_163",Z={toastContainer:Vo,toastWrapper:zo,toast:Wo,success:Jo,warning:Ko,error:Xo,toastRow:Go,toastIcon:Yo,toastContents:Zo,separateContents:Qo,toastTitle:el,plain:tl,timeoutBar:nl,toastPlaceholder:al,errorMessage:il,errorStack:rl};class Et{constructor(t){this.inner=t}static create(t){return new Et(t)}update(t){const n=t(this.inner);return typeof n>"u"?this:new Et(n)}get value(){return this.inner}}const Kn=Dn(void 0),ji=({children:e})=>{const t=dt(Kn);if(!t)return null;const n=te(e);return n.current!==e&&(n.current=e,t.generation.value++),zt(()=>(t.children.push(n),t.generation.value++,()=>{const a=t.children.indexOf(n);a!==-1&&(t.children.splice(a,1),t.generation.value++)}),[]),null},sl=()=>{const e=dt(Kn);return e?(e.generation.value,f(re,{children:e.children.map(t=>t.current)})):null},ol=({children:e})=>{const t=te();return t.current||(t.current={children:[],generation:O(0)}),f(Kn.Provider,{value:t.current,children:[e,f(sl,{})]})},Xn=Dn(void 0),ll=({children:e,toastRef:t,closeToast:n,showCloseButton:a,timeout:i,motif:r=$.PRIMARY,title:s})=>{let o,c;switch(r){case $.SUCCESS:o="check",c="Success";break;case $.WARNING:o="warning",c="Warning";break;case $.ERROR:o="error",c="Error";break}return zt(()=>{if(typeof i=="number"){const l=setTimeout(n,i);return()=>clearTimeout(l)}},[]),f("div",{className:Z.toastWrapper,ref:t,children:f("div",{className:K(Z.toast,{[Z.primary]:r===$.PRIMARY,[Z.success]:r===$.SUCCESS,[Z.warning]:r===$.WARNING,[Z.error]:r===$.ERROR}),children:[f("div",{className:Z.toastRow,children:[r===$.PRIMARY?null:f(de,{type:o,title:c,className:Z.toastIcon}),typeof s>"u"||s===null?f("div",{className:Z.toastContents,children:e}):f("div",{className:K(Z.toastTitle,typeof s!="object"&&Z.plain),children:s}),a&&f(fe,{type:"close",title:"Close",onClick:n,className:Z.toastIcon})]}),typeof s>"u"||s==="null"?null:f("div",{className:K(Z.toastContents,Z.separateContents),children:e}),typeof i=="number"&&f("div",{className:Z.timeoutBar,style:{animationDuration:`${i}ms`}})]})})},ul=()=>{const e=dt(Xn);if(!e)throw new Error("ToastDisplay must be placed under a ToastProvider");const t=Ln(()=>e.toasts.value.value.map(n=>n.inner));return f(ji,{children:f("div",{className:Z.toastContainer,children:t})})},cl=()=>{const e=dt(Xn);if(!e)throw new Error("useAddToast requires a ToastProvider");return I(t=>{e.addToast(t)},[e])},Gt=()=>{const e=cl();return I((t,n)=>{e({motif:$.ERROR,title:t,contents:f(re,{children:[f("div",{className:Z.errorMessage,children:String(n)}),typeof n=="object"&&n!==null&&"stack"in n?f("div",{className:Z.errorStack,children:n.stack}):null]})})},[])},hl=({height:e,onTransitionEnd:t})=>{const[n,a]=ui(`${e}px`),i=te(null);return zt(()=>{var r;(r=i.current)==null||r.scrollTop,a("0")},[]),f("div",{className:Z.toastPlaceholder,style:{minHeight:n},onTransitionEnd:t,ref:i})},fl=({children:e})=>{const t=Ee(Et.create([])),n=te(void 0),a=te(0),i=I(r=>{let s=null;const o=a.current++,c=v=>{s=v},l=O(0),u=()=>{t.value=t.value.update(v=>{var w;const d=v.indexOf(m);if(d===-1)return;const y=((w=s==null?void 0:s.getBoundingClientRect())==null?void 0:w.height)??0,b=f(hl,{height:y,onTransitionEnd:()=>{t.value=t.value.update(_=>{const x=_.indexOf(m);if(x!==-1)return _.splice(x,1),_})}},o);return v[d].inner=b,v})},h=r.title,g=r.contents,m={inner:f(ll,{toastRef:c,motif:r.motif,showCloseButton:r.showCloseButton??!0,timeout:r.timeout,closeToast:u,title:typeof h=="function"?f(h,{closeToast:u}):h,children:typeof g=="function"?f(g,{closeToast:u}):g},o),transformOffset:l};t.value=t.value.update(v=>(v.push(m),v))},[]);return n.current||(n.current={toasts:t,addToast:i}),f(Xn.Provider,{value:n.current,children:[f(ul,{}),e]})},Rt=({progress:e,size:t=100,className:n})=>{const a=Math.min(t/10,10),i=(t-a)*.5,r=2*Math.PI*i;let s,o;return typeof e=="number"?(e=Math.max(0,Math.min(1,e)),s=r,o=r-e*r):(s=r/2,o=0),f("svg",{xmlns:"http://www.w3.org/2000/svg",className:n,width:t,height:t,viewBox:`0 0 ${t} ${t}`,children:[typeof e=="number"&&t>=64&&f("text",{x:"50%",y:"50%","text-anchor":"middle",dy:".3em","font-size":`${t*.2}px`,"font-weight":600,fill:"currentColor",className:"tabular-nums",children:Math.round(e*100).toString().padStart(2,"0")+"%"}),f("circle",{cx:"50%",cy:"50%",r:i,"stroke-width":a,stroke:"currentColor",fill:"none","stroke-dasharray":s,"stroke-dashoffset":o,children:typeof e!="number"&&f(re,{children:f("animate",{attributeName:"stroke-dashoffset",from:r,to:"0",dur:"1.5s",repeatCount:"indefinite"})})})]})},Oi=async e=>{const t=document.createElement("input");return t.type="file",e.accept&&(t.accept=e.accept),e.multiple&&(t.multiple=!0),new Promise(n=>{t.onchange=()=>{n(t.files)},t.oncancel=()=>{n(null)},t.click()})},Ei=()=>Oi({accept:".ttf,.otf,.ttc,.otc,.woff,.woff2",multiple:!0}),Ia=[" bytes","KB","MB","GB"],Ma=1e3,Tt=e=>{let t=0,n=e;for(;n>Ma&&t<Ia.length;)n/=Ma,t++;return`${t<2?n.toFixed(0):n.toFixed(2)} ${Ia[t]}`},dl=e=>{const t=Ee(e);return t.peek()!==e&&(t.value=e),t},pl=({axis:e})=>{const t=e.max>=100?1:.25,n=e.max>=200?25:e.max>=50?12.5:0,a=I(()=>{e.curSingle.value=e.defaultValue},[e.curSingle,e.defaultValue]);let i;switch(e.mode.value){case"single":{i=f(re,{children:[f(lt,{min:e.min,max:e.max,value:e.curSingle,step:t,smartAim:n}),f(fe,{type:"reset",title:"Reset to default value",onClick:a,disabled:e.curSingle.value===e.defaultValue})]});break}case"range":{i=f("div",{className:T.spinboxRange,children:[f(lt,{min:e.min,max:e.max,value:e.curMin,step:t,smartAim:n}),f("span",{className:T.label,children:"to"}),f(lt,{min:e.min,max:e.max,value:e.curMax,step:t,smartAim:n})]});break}case"multiple":{i=f(yl,{ranges:e.curMultiValue});break}}return f("div",{className:T.axisSetting,children:[f("div",{className:T.axisSettingModes,role:"radiogroup","aria-label":"Axis modes",children:[f(mn,{type:"range",title:"Limit range of values",currentValue:e.mode,value:"range"}),f(mn,{type:"pin",title:"Pin to single value",currentValue:e.mode,value:"single"}),f(mn,{type:"stack",title:"Instance into multiple font files",currentValue:e.mode,value:"multiple"})]}),i]})},Te=({styleSetting:e,name:t,tag:n})=>f("div",{className:T.styleSetting,children:[f("div",{className:T.styleSettingName,title:n,children:t}),e.type==="single"?f("span",{className:T.staticSetting,children:(Math.round(e.value*1e3)/1e3).toString()}):f(pl,{axis:e.value})]}),gl=({font:e,styleSettings:t,enableSubsetting:n})=>{const a=Re(),i=Gt(),r=I(()=>{a.removeFont(e).catch(o=>{i("Failed to remove font",o)})},[e]),s=t.weight&&t.weight.type!=="single"||t.width&&t.width.type!=="single"||t.italic&&t.italic.type!=="single"||t.slant&&t.slant.type!=="single";return f("div",{className:T.singleFontSettings,children:[f("div",{className:T.singleFontHeader,children:[f("div",{className:T.singleFontName,children:[f("span",{className:T.singleFontFamily,children:[e.familyName," "]}),f("span",{className:T.singleFontSubfamily,children:[e.subfamilyName," "]}),f("span",{className:T.singleFontFileSize,children:Tt(e.fileSize)})]}),f(fe,{onClick:r,type:"close",title:"Remove this font",className:T.removeFont})]}),n&&(t.weight||t.width||t.italic||t.slant)?f("div",{className:K(T.singleFontSettingsBody,s&&T.settingsGrid,!s&&T.settingsList),children:[t.weight?f(Te,{styleSetting:t.weight,name:"Weight"}):null,t.width?f(Te,{styleSetting:t.width,name:"Width"}):null,t.italic?f(Te,{styleSetting:t.italic,name:"Italic"}):null,t.slant?f(Te,{styleSetting:t.slant,name:"Slant"}):null]}):null]})},ml=({ranges:e,disabled:t})=>{const n=Jn(e,500,!0),a=xe(()=>$n(n.value)!==null,[n,n.value]);return f(Xt,{value:e,placeholder:'Enter Unicode code points or ranges to include (e.g. "U+0020", "U+0025-U+00FF", "U+0025-00FF, U+0020, U+FFFD")',className:K(T.unicodeRangeTextbox,{[T.invalid]:!a}),disabled:t})},yl=({ranges:e,disabled:t})=>{const n=Jn(e,500,!0),a=xe(()=>Ti(n.value)!==null,[n,n.value]);return f(Xt,{value:e,placeholder:"400, 500, 600-700",className:K(T.axisRangeTextbox,{[T.invalid]:!a}),disabled:t})},An=({settings:e,name:t,mapping:n,disabled:a})=>{const i=dl(e),r=Ln(()=>i.value.reduce((o,c)=>o+(n(c).checked.value?1:0),0)),s=I(()=>{const o=r.value===e.length;fi(()=>{for(const c of e)n(c).checked.value=!o})},[e,r]);return f("div",{className:K(T.settingsSubSection,T.checkboxSection,{[T.disabled]:a}),children:[f("header",{children:f("label",{children:[f("input",{type:"checkbox",checked:r.value===e.length,indeterminate:r.value>0&&r.value<e.length,onInput:s,disabled:a})," ",t]})}),f("div",{className:T.checkboxes,children:e.map(o=>{const{label:c,checked:l,title:u}=n(o);return f(Ne,{label:c,checked:l,title:u,disabled:a})})})]})},Ri=e=>e.label??Vn(e.tag).name??e.tag,ja=e=>({label:Ri(e.feature),checked:e.include,title:e.feature.tag}),bl=e=>({label:e.name,checked:e.include}),Ui=({settings:e,copyFunction:t,pasteFunction:n})=>{const a=I(()=>{Mi(JSON.stringify(t(e)))},[e]),i=I(()=>{Ho().then(r=>{try{const s=JSON.parse(r);typeof s=="object"&&n(e,s)}catch(s){console.error("Failed to paste settings:",s)}})},[e]);return f("div",{className:T.copyPasteButtons,children:[f(fe,{onClick:a,type:"copy",title:"Copy settings to clipboard"}),f(fe,{onClick:i,type:"paste",title:"Paste settings from clipboard"})]})},at=({title:e,children:t,copyPasteFns:n,startCollapsed:a=!1})=>{const i=Ee(a),r=ci(),s=I(()=>{i.value=!i.value},[i]);return f("section",{className:T.settingsSection,children:[f("header",{children:[f("button",{className:T.settingsSectionTitle,"aria-expanded":i.value?"false":"true","aria-controls":r,onClick:s,children:[f(de,{type:i.value?"arrow-right":"arrow-down",title:null,motif:$.MONOCHROME}),f("span",{className:T.settingsSectionTitleText,children:e})]}),n&&f(Ui,{settings:n.settings,copyFunction:n.copy,pasteFunction:n.paste})]}),f("div",{className:T.settingsSectionBody,id:r,hidden:i.value,children:t})]})},vl=({settings:e,disabled:t,isMultiple:n,onRemove:a})=>{const i=I(()=>{a==null||a(e)},[a,e]),r=Ln(()=>{if(e.includeUnicodeRanges.value!=="")return"";let s="";for(const o of e.includeNamedSubsets)o.include.value&&(s+=`${o.name}-`);return s.slice(0,-1)});return f("div",{className:T.characterSet,children:[n?f("div",{className:T.characterSetHeader,children:[f(Xt,{value:e.name,small:!0,placeholder:r.value||"Name this character set (optional)",className:T.characterSetName}),f(fe,{type:"close",title:"Remove this character set",onClick:i})]}):null,f("div",{className:T.characterSetBody,children:[e.includeNamedSubsets.length>0?f(An,{name:"Named subsets",settings:e.includeNamedSubsets,mapping:bl,disabled:t}):null,f("div",{className:T.settingsSubSection,children:f(ml,{ranges:e.includeUnicodeRanges,disabled:t})})]})]})},wl=({familySettings:e})=>{const t=Re(),{name:n,fonts:a,settings:i}=e,r=Gt(),s=I(()=>{t.removeFontFamily(e).catch(l=>{r("Failed to remove font family",l)})},[e]),o=I(()=>{t.addCharacterSet(e)},[t,e]),c=I(l=>{t.removeCharacterSet(e,l)},[t,e]);return f("div",{className:T.familySettings,"aria-label":`Settings for ${n} font family`,children:[f("div",{className:T.familyHeader,children:[f("span",{className:T.familyName,children:n}),f(Ne,{label:"Subset",title:"Save space by reducing the number of glyphs, features, and variations in this font",checked:e.enableSubsetting}),f(Ui,{settings:e,copyFunction:qs,pasteFunction:Vs}),f(fe,{onClick:s,type:"close",title:"Remove this font family",className:T.removeFontFamily})]}),f("div",{className:T.familySettingsBody,children:[e.enableSubsetting.value&&f(re,{children:[i.styleSettings.weight||i.styleSettings.width||i.styleSettings.italic||i.styleSettings.slant?f(at,{title:"Style settings",copyPasteFns:{settings:i.styleSettings,copy:Bs,paste:zs},children:f("div",{className:T.settingsGrid,children:[i.styleSettings.weight?f(Te,{styleSetting:i.styleSettings.weight,name:"Weight"}):null,i.styleSettings.width?f(Te,{styleSetting:i.styleSettings.width,name:"Width"}):null,i.styleSettings.italic?f(Te,{styleSetting:i.styleSettings.italic,name:"Italic"}):null,i.styleSettings.slant?f(Te,{styleSetting:i.styleSettings.slant,name:"Slant"}):null]})}):null,i.axisSettings.length>0?f(at,{title:"Variation axis settings",copyPasteFns:{settings:i.axisSettings,copy:Ls,paste:Ws},children:f("div",{className:T.settingsGrid,children:i.axisSettings.map(({name:l,tag:u,range:h})=>f(Te,{styleSetting:{type:"variable",value:h},name:l,tag:u}))})}):null,f(at,{title:"Character sets",copyPasteFns:{settings:i.includeCharacters,copy:Hs,paste:Ks},children:[f("div",{className:T.characterSetsHeader,children:[f(fe,{type:"plus",title:"Add character set",onClick:o}),f("div",{className:T.headerDivider}),f(Ne,{label:"Include all characters",checked:i.includeCharacters.includeAllCharacters})]}),f("div",{className:T.characterSets,children:i.includeCharacters.characterSets.value.map(l=>f(vl,{settings:l,disabled:i.includeCharacters.includeAllCharacters.value,isMultiple:i.includeCharacters.characterSets.value.length>1,onRemove:c},l))})]}),i.includeFeatures.features.length>0||i.includeFeatures.characterVariants.length>0||i.includeFeatures.stylisticSets.length>0?f(at,{title:"Features",copyPasteFns:{settings:i.includeFeatures,copy:$s,paste:Js},children:[i.includeFeatures.features.length>0?f("div",{className:T.settingsSubSection,children:f("div",{className:T.checkboxes,children:i.includeFeatures.features.map(({feature:l,include:u})=>f(Ne,{label:Ri(l),checked:u,title:l.tag}))})}):null,i.includeFeatures.stylisticSets.length>0?f(An,{name:"Stylistic sets",settings:i.includeFeatures.stylisticSets,mapping:ja}):null,i.includeFeatures.characterVariants.length>0?f(An,{name:"Character variants",settings:i.includeFeatures.characterVariants,mapping:ja}):null]}):null]}),f(at,{title:["Fonts",f("span",{className:T.numFonts,children:a.length})],startCollapsed:a.length>6,children:a.map(({font:l,styleSettings:u})=>f(gl,{font:l,styleSettings:u,enableSubsetting:e.enableSubsetting.value}))})]})]})},wt=e=>{var t;if(!((t=e.dataTransfer)!=null&&t.items))return!1;for(const n of e.dataTransfer.items)if(n.kind==="file")return!0;return!1},_l=()=>{const e=Re(),{fonts:t,fontsBeingLoaded:n}=e,a=Gt(),i=I(l=>{wt(l)&&(l.preventDefault(),l.stopPropagation())},[]),r=I(l=>{wt(l)&&(l.preventDefault(),l.stopPropagation())},[]),s=I(l=>{if(!wt(l))return;l.preventDefault(),l.stopPropagation();const u=Array.from(l.dataTransfer.files);u.length>0&&e.addFonts(u.map(h=>h)).catch(h=>{a("Failed to add fonts",h)})},[]),o=I(l=>{wt(l)&&(l.preventDefault(),l.stopPropagation())},[]),c=I(()=>{Ei().then(async l=>{l&&await e.addFonts(Array.from(l))}).catch(l=>{a("Failed to upload fonts",l)})},[e]);return t.value.length===0?n.value>0?f("div",{className:T.loading,children:f(Rt,{size:320})}):f("div",{className:T.noFonts,onDragEnter:i,onDragOver:r,onDrop:s,onDragLeave:o,onClick:c,children:[f(de,{type:"upload",title:"",className:T.uploadIcon,size:"8rem"}),f("span",{className:T.uploadHeader,children:"Click to upload fonts"}),f("span",{className:T.uploadSub,children:"or drag and drop"})]}):f("div",{className:T.families,onDragEnter:i,onDragOver:r,onDrop:s,onDragLeave:o,children:t.value.map(l=>f(wl,{familySettings:l}))})},xl="_export-panel_1frda_210",Sl="_horizontal_1frda_217",kl="_spacer_1frda_221",Tl="_splitter_1frda_225",Fl="_vertical_1frda_239",Al="_row_1frda_284",Cl="_grow-button_1frda_290",Nl="_css-path-prefix-bar_1frda_294",Il="_css-path-prefix_1frda_294",Ml="_css-preview_1frda_310",jl="_export-buttons_1frda_318",Ol="_loader-wrapper_1frda_326",El="_export-formats_1frda_334",Rl="_save-load-settings_1frda_340",Ul="_upload-more_1frda_351",Pl="_export-results_1frda_357",Dl="_exported-fonts_1frda_364",ql="_exported-css_1frda_364",Bl="_exported-font-files_1frda_378",Ll="_font-file-table_1frda_386",$l="_font-name_1frda_402",Hl="_font-file-size_1frda_405",Vl="_more-settings_1frda_436",zl="_setting_1frda_452",Wl="_spinbox-setting_1frda_462",Jl="_footer_1frda_470",Kl="_github-link_1frda_478",E={exportPanel:xl,horizontal:Sl,spacer:kl,splitter:Tl,vertical:Fl,row:Al,growButton:Cl,cssPathPrefixBar:Nl,cssPathPrefix:Il,cssPreview:Ml,exportButtons:jl,loaderWrapper:Ol,exportFormats:El,saveLoadSettings:Rl,uploadMore:Ul,exportResults:Pl,exportedFonts:Dl,exportedCss:ql,exportedFontFiles:Bl,fontFileTable:Ll,fontName:$l,fontFileSize:Hl,moreSettings:Vl,setting:zl,spinboxSetting:Wl,footer:Jl,githubLink:Kl},Xe=Math.min,le=Math.max,Ut=Math.round,_t=Math.floor,_e=e=>({x:e,y:e}),Xl={left:"right",right:"left",bottom:"top",top:"bottom"},Gl={start:"end",end:"start"};function Oa(e,t,n){return le(e,Xe(t,n))}function mt(e,t){return typeof e=="function"?e(t):e}function Me(e){return e.split("-")[0]}function yt(e){return e.split("-")[1]}function Pi(e){return e==="x"?"y":"x"}function Di(e){return e==="y"?"height":"width"}function qe(e){return["top","bottom"].includes(Me(e))?"y":"x"}function qi(e){return Pi(qe(e))}function Yl(e,t,n){n===void 0&&(n=!1);const a=yt(e),i=qi(e),r=Di(i);let s=i==="x"?a===(n?"end":"start")?"right":"left":a==="start"?"bottom":"top";return t.reference[r]>t.floating[r]&&(s=Pt(s)),[s,Pt(s)]}function Zl(e){const t=Pt(e);return[Cn(e),t,Cn(t)]}function Cn(e){return e.replace(/start|end/g,t=>Gl[t])}function Ql(e,t,n){const a=["left","right"],i=["right","left"],r=["top","bottom"],s=["bottom","top"];switch(e){case"top":case"bottom":return n?t?i:a:t?a:i;case"left":case"right":return t?r:s;default:return[]}}function eu(e,t,n,a){const i=yt(e);let r=Ql(Me(e),n==="start",a);return i&&(r=r.map(s=>s+"-"+i),t&&(r=r.concat(r.map(Cn)))),r}function Pt(e){return e.replace(/left|right|bottom|top/g,t=>Xl[t])}function tu(e){return{top:0,right:0,bottom:0,left:0,...e}}function nu(e){return typeof e!="number"?tu(e):{top:e,right:e,bottom:e,left:e}}function Dt(e){const{x:t,y:n,width:a,height:i}=e;return{width:a,height:i,top:n,left:t,right:t+a,bottom:n+i,x:t,y:n}}function Ea(e,t,n){let{reference:a,floating:i}=e;const r=qe(t),s=qi(t),o=Di(s),c=Me(t),l=r==="y",u=a.x+a.width/2-i.width/2,h=a.y+a.height/2-i.height/2,g=a[o]/2-i[o]/2;let m;switch(c){case"top":m={x:u,y:a.y-i.height};break;case"bottom":m={x:u,y:a.y+a.height};break;case"right":m={x:a.x+a.width,y:h};break;case"left":m={x:a.x-i.width,y:h};break;default:m={x:a.x,y:a.y}}switch(yt(t)){case"start":m[s]-=g*(n&&l?-1:1);break;case"end":m[s]+=g*(n&&l?-1:1);break}return m}const au=async(e,t,n)=>{const{placement:a="bottom",strategy:i="absolute",middleware:r=[],platform:s}=n,o=r.filter(Boolean),c=await(s.isRTL==null?void 0:s.isRTL(t));let l=await s.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:h}=Ea(l,a,c),g=a,m={},v=0;for(let d=0;d<o.length;d++){const{name:y,fn:p}=o[d],{x:b,y:w,data:_,reset:x}=await p({x:u,y:h,initialPlacement:a,placement:g,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=b??u,h=w??h,m={...m,[y]:{...m[y],..._}},x&&v<=50&&(v++,typeof x=="object"&&(x.placement&&(g=x.placement),x.rects&&(l=x.rects===!0?await s.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:h}=Ea(l,g,c)),d=-1)}return{x:u,y:h,placement:g,strategy:i,middlewareData:m}};async function Gn(e,t){var n;t===void 0&&(t={});const{x:a,y:i,platform:r,rects:s,elements:o,strategy:c}=e,{boundary:l="clippingAncestors",rootBoundary:u="viewport",elementContext:h="floating",altBoundary:g=!1,padding:m=0}=mt(t,e),v=nu(m),y=o[g?h==="floating"?"reference":"floating":h],p=Dt(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(y)))==null||n?y:y.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(o.floating)),boundary:l,rootBoundary:u,strategy:c})),b=h==="floating"?{x:a,y:i,width:s.floating.width,height:s.floating.height}:s.reference,w=await(r.getOffsetParent==null?void 0:r.getOffsetParent(o.floating)),_=await(r.isElement==null?void 0:r.isElement(w))?await(r.getScale==null?void 0:r.getScale(w))||{x:1,y:1}:{x:1,y:1},x=Dt(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:b,offsetParent:w,strategy:c}):b);return{top:(p.top-x.top+v.top)/_.y,bottom:(x.bottom-p.bottom+v.bottom)/_.y,left:(p.left-x.left+v.left)/_.x,right:(x.right-p.right+v.right)/_.x}}const iu=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n,a;const{placement:i,middlewareData:r,rects:s,initialPlacement:o,platform:c,elements:l}=t,{mainAxis:u=!0,crossAxis:h=!0,fallbackPlacements:g,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:v="none",flipAlignment:d=!0,...y}=mt(e,t);if((n=r.arrow)!=null&&n.alignmentOffset)return{};const p=Me(i),b=qe(o),w=Me(o)===o,_=await(c.isRTL==null?void 0:c.isRTL(l.floating)),x=g||(w||!d?[Pt(o)]:Zl(o)),A=v!=="none";!g&&A&&x.push(...eu(o,d,v,_));const M=[o,...x],F=await Gn(t,y),S=[];let C=((a=r.flip)==null?void 0:a.overflows)||[];if(u&&S.push(F[p]),h){const U=Yl(i,s,_);S.push(F[U[0]],F[U[1]])}if(C=[...C,{placement:i,overflows:S}],!S.every(U=>U<=0)){var N,j;const U=(((N=r.flip)==null?void 0:N.index)||0)+1,X=M[U];if(X)return{data:{index:U,overflows:C},reset:{placement:X}};let G=(j=C.filter(P=>P.overflows[0]<=0).sort((P,J)=>P.overflows[1]-J.overflows[1])[0])==null?void 0:j.placement;if(!G)switch(m){case"bestFit":{var W;const P=(W=C.filter(J=>{if(A){const ee=qe(J.placement);return ee===b||ee==="y"}return!0}).map(J=>[J.placement,J.overflows.filter(ee=>ee>0).reduce((ee,tt)=>ee+tt,0)]).sort((J,ee)=>J[1]-ee[1])[0])==null?void 0:W[0];P&&(G=P);break}case"initialPlacement":G=o;break}if(i!==G)return{reset:{placement:G}}}return{}}}};async function ru(e,t){const{placement:n,platform:a,elements:i}=e,r=await(a.isRTL==null?void 0:a.isRTL(i.floating)),s=Me(n),o=yt(n),c=qe(n)==="y",l=["left","top"].includes(s)?-1:1,u=r&&c?-1:1,h=mt(t,e);let{mainAxis:g,crossAxis:m,alignmentAxis:v}=typeof h=="number"?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:h.mainAxis||0,crossAxis:h.crossAxis||0,alignmentAxis:h.alignmentAxis};return o&&typeof v=="number"&&(m=o==="end"?v*-1:v),c?{x:m*u,y:g*l}:{x:g*l,y:m*u}}const su=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var n,a;const{x:i,y:r,placement:s,middlewareData:o}=t,c=await ru(t,e);return s===((n=o.offset)==null?void 0:n.placement)&&(a=o.arrow)!=null&&a.alignmentOffset?{}:{x:i+c.x,y:r+c.y,data:{...c,placement:s}}}}},ou=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:a,placement:i}=t,{mainAxis:r=!0,crossAxis:s=!1,limiter:o={fn:y=>{let{x:p,y:b}=y;return{x:p,y:b}}},...c}=mt(e,t),l={x:n,y:a},u=await Gn(t,c),h=qe(Me(i)),g=Pi(h);let m=l[g],v=l[h];if(r){const y=g==="y"?"top":"left",p=g==="y"?"bottom":"right",b=m+u[y],w=m-u[p];m=Oa(b,m,w)}if(s){const y=h==="y"?"top":"left",p=h==="y"?"bottom":"right",b=v+u[y],w=v-u[p];v=Oa(b,v,w)}const d=o.fn({...t,[g]:m,[h]:v});return{...d,data:{x:d.x-n,y:d.y-a,enabled:{[g]:r,[h]:s}}}}}},lu=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var n,a;const{placement:i,rects:r,platform:s,elements:o}=t,{apply:c=()=>{},...l}=mt(e,t),u=await Gn(t,l),h=Me(i),g=yt(i),m=qe(i)==="y",{width:v,height:d}=r.floating;let y,p;h==="top"||h==="bottom"?(y=h,p=g===(await(s.isRTL==null?void 0:s.isRTL(o.floating))?"start":"end")?"left":"right"):(p=h,y=g==="end"?"top":"bottom");const b=d-u.top-u.bottom,w=v-u.left-u.right,_=Xe(d-u[y],b),x=Xe(v-u[p],w),A=!t.middlewareData.shift;let M=_,F=x;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(F=w),(a=t.middlewareData.shift)!=null&&a.enabled.y&&(M=b),A&&!g){const C=le(u.left,0),N=le(u.right,0),j=le(u.top,0),W=le(u.bottom,0);m?F=v-2*(C!==0||N!==0?C+N:le(u.left,u.right)):M=d-2*(j!==0||W!==0?j+W:le(u.top,u.bottom))}await c({...t,availableWidth:F,availableHeight:M});const S=await s.getDimensions(o.floating);return v!==S.width||d!==S.height?{reset:{rects:!0}}:{}}}};function Yt(){return typeof window<"u"}function et(e){return Bi(e)?(e.nodeName||"").toLowerCase():"#document"}function ue(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function ke(e){var t;return(t=(Bi(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Bi(e){return Yt()?e instanceof Node||e instanceof ue(e).Node:!1}function pe(e){return Yt()?e instanceof Element||e instanceof ue(e).Element:!1}function Se(e){return Yt()?e instanceof HTMLElement||e instanceof ue(e).HTMLElement:!1}function Ra(e){return!Yt()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof ue(e).ShadowRoot}function bt(e){const{overflow:t,overflowX:n,overflowY:a,display:i}=ge(e);return/auto|scroll|overlay|hidden|clip/.test(t+a+n)&&!["inline","contents"].includes(i)}function uu(e){return["table","td","th"].includes(et(e))}function Zt(e){return[":popover-open",":modal"].some(t=>{try{return e.matches(t)}catch{return!1}})}function Yn(e){const t=Zn(),n=pe(e)?ge(e):e;return["transform","translate","scale","rotate","perspective"].some(a=>n[a]?n[a]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!t&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!t&&(n.filter?n.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(a=>(n.willChange||"").includes(a))||["paint","layout","strict","content"].some(a=>(n.contain||"").includes(a))}function cu(e){let t=je(e);for(;Se(t)&&!Ge(t);){if(Yn(t))return t;if(Zt(t))return null;t=je(t)}return null}function Zn(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Ge(e){return["html","body","#document"].includes(et(e))}function ge(e){return ue(e).getComputedStyle(e)}function Qt(e){return pe(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function je(e){if(et(e)==="html")return e;const t=e.assignedSlot||e.parentNode||Ra(e)&&e.host||ke(e);return Ra(t)?t.host:t}function Li(e){const t=je(e);return Ge(t)?e.ownerDocument?e.ownerDocument.body:e.body:Se(t)&&bt(t)?t:Li(t)}function ht(e,t,n){var a;t===void 0&&(t=[]),n===void 0&&(n=!0);const i=Li(e),r=i===((a=e.ownerDocument)==null?void 0:a.body),s=ue(i);if(r){const o=Nn(s);return t.concat(s,s.visualViewport||[],bt(i)?i:[],o&&n?ht(o):[])}return t.concat(i,ht(i,[],n))}function Nn(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function $i(e){const t=ge(e);let n=parseFloat(t.width)||0,a=parseFloat(t.height)||0;const i=Se(e),r=i?e.offsetWidth:n,s=i?e.offsetHeight:a,o=Ut(n)!==r||Ut(a)!==s;return o&&(n=r,a=s),{width:n,height:a,$:o}}function Qn(e){return pe(e)?e:e.contextElement}function We(e){const t=Qn(e);if(!Se(t))return _e(1);const n=t.getBoundingClientRect(),{width:a,height:i,$:r}=$i(t);let s=(r?Ut(n.width):n.width)/a,o=(r?Ut(n.height):n.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!o||!Number.isFinite(o))&&(o=1),{x:s,y:o}}const hu=_e(0);function Hi(e){const t=ue(e);return!Zn()||!t.visualViewport?hu:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function fu(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==ue(e)?!1:t}function Be(e,t,n,a){t===void 0&&(t=!1),n===void 0&&(n=!1);const i=e.getBoundingClientRect(),r=Qn(e);let s=_e(1);t&&(a?pe(a)&&(s=We(a)):s=We(e));const o=fu(r,n,a)?Hi(r):_e(0);let c=(i.left+o.x)/s.x,l=(i.top+o.y)/s.y,u=i.width/s.x,h=i.height/s.y;if(r){const g=ue(r),m=a&&pe(a)?ue(a):a;let v=g,d=Nn(v);for(;d&&a&&m!==v;){const y=We(d),p=d.getBoundingClientRect(),b=ge(d),w=p.left+(d.clientLeft+parseFloat(b.paddingLeft))*y.x,_=p.top+(d.clientTop+parseFloat(b.paddingTop))*y.y;c*=y.x,l*=y.y,u*=y.x,h*=y.y,c+=w,l+=_,v=ue(d),d=Nn(v)}}return Dt({width:u,height:h,x:c,y:l})}function ea(e,t){const n=Qt(e).scrollLeft;return t?t.left+n:Be(ke(e)).left+n}function Vi(e,t,n){n===void 0&&(n=!1);const a=e.getBoundingClientRect(),i=a.left+t.scrollLeft-(n?0:ea(e,a)),r=a.top+t.scrollTop;return{x:i,y:r}}function du(e){let{elements:t,rect:n,offsetParent:a,strategy:i}=e;const r=i==="fixed",s=ke(a),o=t?Zt(t.floating):!1;if(a===s||o&&r)return n;let c={scrollLeft:0,scrollTop:0},l=_e(1);const u=_e(0),h=Se(a);if((h||!h&&!r)&&((et(a)!=="body"||bt(s))&&(c=Qt(a)),Se(a))){const m=Be(a);l=We(a),u.x=m.x+a.clientLeft,u.y=m.y+a.clientTop}const g=s&&!h&&!r?Vi(s,c,!0):_e(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+g.x,y:n.y*l.y-c.scrollTop*l.y+u.y+g.y}}function pu(e){return Array.from(e.getClientRects())}function gu(e){const t=ke(e),n=Qt(e),a=e.ownerDocument.body,i=le(t.scrollWidth,t.clientWidth,a.scrollWidth,a.clientWidth),r=le(t.scrollHeight,t.clientHeight,a.scrollHeight,a.clientHeight);let s=-n.scrollLeft+ea(e);const o=-n.scrollTop;return ge(a).direction==="rtl"&&(s+=le(t.clientWidth,a.clientWidth)-i),{width:i,height:r,x:s,y:o}}function mu(e,t){const n=ue(e),a=ke(e),i=n.visualViewport;let r=a.clientWidth,s=a.clientHeight,o=0,c=0;if(i){r=i.width,s=i.height;const l=Zn();(!l||l&&t==="fixed")&&(o=i.offsetLeft,c=i.offsetTop)}return{width:r,height:s,x:o,y:c}}function yu(e,t){const n=Be(e,!0,t==="fixed"),a=n.top+e.clientTop,i=n.left+e.clientLeft,r=Se(e)?We(e):_e(1),s=e.clientWidth*r.x,o=e.clientHeight*r.y,c=i*r.x,l=a*r.y;return{width:s,height:o,x:c,y:l}}function Ua(e,t,n){let a;if(t==="viewport")a=mu(e,n);else if(t==="document")a=gu(ke(e));else if(pe(t))a=yu(t,n);else{const i=Hi(e);a={x:t.x-i.x,y:t.y-i.y,width:t.width,height:t.height}}return Dt(a)}function zi(e,t){const n=je(e);return n===t||!pe(n)||Ge(n)?!1:ge(n).position==="fixed"||zi(n,t)}function bu(e,t){const n=t.get(e);if(n)return n;let a=ht(e,[],!1).filter(o=>pe(o)&&et(o)!=="body"),i=null;const r=ge(e).position==="fixed";let s=r?je(e):e;for(;pe(s)&&!Ge(s);){const o=ge(s),c=Yn(s);!c&&o.position==="fixed"&&(i=null),(r?!c&&!i:!c&&o.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||bt(s)&&!c&&zi(e,s))?a=a.filter(u=>u!==s):i=o,s=je(s)}return t.set(e,a),a}function vu(e){let{element:t,boundary:n,rootBoundary:a,strategy:i}=e;const s=[...n==="clippingAncestors"?Zt(t)?[]:bu(t,this._c):[].concat(n),a],o=s[0],c=s.reduce((l,u)=>{const h=Ua(t,u,i);return l.top=le(h.top,l.top),l.right=Xe(h.right,l.right),l.bottom=Xe(h.bottom,l.bottom),l.left=le(h.left,l.left),l},Ua(t,o,i));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function wu(e){const{width:t,height:n}=$i(e);return{width:t,height:n}}function _u(e,t,n){const a=Se(t),i=ke(t),r=n==="fixed",s=Be(e,!0,r,t);let o={scrollLeft:0,scrollTop:0};const c=_e(0);if(a||!a&&!r)if((et(t)!=="body"||bt(i))&&(o=Qt(t)),a){const g=Be(t,!0,r,t);c.x=g.x+t.clientLeft,c.y=g.y+t.clientTop}else i&&(c.x=ea(i));const l=i&&!a&&!r?Vi(i,o):_e(0),u=s.left+o.scrollLeft-c.x-l.x,h=s.top+o.scrollTop-c.y-l.y;return{x:u,y:h,width:s.width,height:s.height}}function yn(e){return ge(e).position==="static"}function Pa(e,t){if(!Se(e)||ge(e).position==="fixed")return null;if(t)return t(e);let n=e.offsetParent;return ke(e)===n&&(n=n.ownerDocument.body),n}function Wi(e,t){const n=ue(e);if(Zt(e))return n;if(!Se(e)){let i=je(e);for(;i&&!Ge(i);){if(pe(i)&&!yn(i))return i;i=je(i)}return n}let a=Pa(e,t);for(;a&&uu(a)&&yn(a);)a=Pa(a,t);return a&&Ge(a)&&yn(a)&&!Yn(a)?n:a||cu(e)||n}const xu=async function(e){const t=this.getOffsetParent||Wi,n=this.getDimensions,a=await n(e.floating);return{reference:_u(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:a.width,height:a.height}}};function Su(e){return ge(e).direction==="rtl"}const ku={convertOffsetParentRelativeRectToViewportRelativeRect:du,getDocumentElement:ke,getClippingRect:vu,getOffsetParent:Wi,getElementRects:xu,getClientRects:pu,getDimensions:wu,getScale:We,isElement:pe,isRTL:Su};function Ji(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Tu(e,t){let n=null,a;const i=ke(e);function r(){var o;clearTimeout(a),(o=n)==null||o.disconnect(),n=null}function s(o,c){o===void 0&&(o=!1),c===void 0&&(c=1),r();const l=e.getBoundingClientRect(),{left:u,top:h,width:g,height:m}=l;if(o||t(),!g||!m)return;const v=_t(h),d=_t(i.clientWidth-(u+g)),y=_t(i.clientHeight-(h+m)),p=_t(u),w={rootMargin:-v+"px "+-d+"px "+-y+"px "+-p+"px",threshold:le(0,Xe(1,c))||1};let _=!0;function x(A){const M=A[0].intersectionRatio;if(M!==c){if(!_)return s();M?s(!1,M):a=setTimeout(()=>{s(!1,1e-7)},1e3)}M===1&&!Ji(l,e.getBoundingClientRect())&&s(),_=!1}try{n=new IntersectionObserver(x,{...w,root:i.ownerDocument})}catch{n=new IntersectionObserver(x,w)}n.observe(e)}return s(!0),r}function Da(e,t,n,a){a===void 0&&(a={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:o=typeof IntersectionObserver=="function",animationFrame:c=!1}=a,l=Qn(e),u=i||r?[...l?ht(l):[],...ht(t)]:[];u.forEach(p=>{i&&p.addEventListener("scroll",n,{passive:!0}),r&&p.addEventListener("resize",n)});const h=l&&o?Tu(l,n):null;let g=-1,m=null;s&&(m=new ResizeObserver(p=>{let[b]=p;b&&b.target===l&&m&&(m.unobserve(t),cancelAnimationFrame(g),g=requestAnimationFrame(()=>{var w;(w=m)==null||w.observe(t)})),n()}),l&&!c&&m.observe(l),m.observe(t));let v,d=c?Be(e):null;c&&y();function y(){const p=Be(e);d&&!Ji(d,p)&&n(),d=p,v=requestAnimationFrame(y)}return n(),()=>{var p;u.forEach(b=>{i&&b.removeEventListener("scroll",n),r&&b.removeEventListener("resize",n)}),h==null||h(),(p=m)==null||p.disconnect(),m=null,c&&cancelAnimationFrame(v)}}const Fu=su,Au=ou,Cu=iu,Nu=lu,Iu=(e,t,n)=>{const a=new Map,i={platform:ku,...n},r={...i.platform,_c:a};return au(e,t,{...i,platform:r})};var qa={},Mu=function(e,t,n,a,i){var r=new Worker(qa[t]||(qa[t]=URL.createObjectURL(new Blob([e+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return r.onmessage=function(s){var o=s.data,c=o.$e$;if(c){var l=new Error(c[0]);l.code=c[1],l.stack=c[2],i(l,null)}else i(null,o)},r.postMessage(n,a),r},Q=Uint8Array,se=Uint16Array,en=Int32Array,tn=new Q([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),nn=new Q([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),In=new Q([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ki=function(e,t){for(var n=new se(31),a=0;a<31;++a)n[a]=t+=1<<e[a-1];for(var i=new en(n[30]),a=1;a<30;++a)for(var r=n[a];r<n[a+1];++r)i[r]=r-n[a]<<5|a;return{b:n,r:i}},Xi=Ki(tn,2),ju=Xi.b,qt=Xi.r;ju[28]=258,qt[258]=28;var Ou=Ki(nn,0),Mn=Ou.r,Bt=new se(32768);for(var B=0;B<32768;++B){var Ae=(B&43690)>>1|(B&21845)<<1;Ae=(Ae&52428)>>2|(Ae&13107)<<2,Ae=(Ae&61680)>>4|(Ae&3855)<<4,Bt[B]=((Ae&65280)>>8|(Ae&255)<<8)>>1}var Je=function(e,t,n){for(var a=e.length,i=0,r=new se(t);i<a;++i)e[i]&&++r[e[i]-1];var s=new se(t);for(i=1;i<t;++i)s[i]=s[i-1]+r[i-1]<<1;var o;if(n){o=new se(1<<t);var c=15-t;for(i=0;i<a;++i)if(e[i])for(var l=i<<4|e[i],u=t-e[i],h=s[e[i]-1]++<<u,g=h|(1<<u)-1;h<=g;++h)o[Bt[h]>>c]=l}else for(o=new se(a),i=0;i<a;++i)e[i]&&(o[i]=Bt[s[e[i]-1]++]>>15-e[i]);return o},Oe=new Q(288);for(var B=0;B<144;++B)Oe[B]=8;for(var B=144;B<256;++B)Oe[B]=9;for(var B=256;B<280;++B)Oe[B]=7;for(var B=280;B<288;++B)Oe[B]=8;var ft=new Q(32);for(var B=0;B<32;++B)ft[B]=5;var Gi=Je(Oe,9,0),Yi=Je(ft,5,0),ta=function(e){return(e+7)/8|0},na=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new Q(e.subarray(t,n))},Eu=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],oe=function(e,t,n){var a=new Error(t||Eu[e]);if(a.code=e,Error.captureStackTrace&&Error.captureStackTrace(a,oe),!n)throw a;return a},be=function(e,t,n){n<<=t&7;var a=t/8|0;e[a]|=n,e[a+1]|=n>>8},Ve=function(e,t,n){n<<=t&7;var a=t/8|0;e[a]|=n,e[a+1]|=n>>8,e[a+2]|=n>>16},Ft=function(e,t){for(var n=[],a=0;a<e.length;++a)e[a]&&n.push({s:a,f:e[a]});var i=n.length,r=n.slice();if(!i)return{t:ia,l:0};if(i==1){var s=new Q(n[0].s+1);return s[n[0].s]=1,{t:s,l:1}}n.sort(function(x,A){return x.f-A.f}),n.push({s:-1,f:25001});var o=n[0],c=n[1],l=0,u=1,h=2;for(n[0]={s:-1,f:o.f+c.f,l:o,r:c};u!=i-1;)o=n[n[l].f<n[h].f?l++:h++],c=n[l!=u&&n[l].f<n[h].f?l++:h++],n[u++]={s:-1,f:o.f+c.f,l:o,r:c};for(var g=r[0].s,a=1;a<i;++a)r[a].s>g&&(g=r[a].s);var m=new se(g+1),v=Lt(n[u-1],m,0);if(v>t){var a=0,d=0,y=v-t,p=1<<y;for(r.sort(function(A,M){return m[M.s]-m[A.s]||A.f-M.f});a<i;++a){var b=r[a].s;if(m[b]>t)d+=p-(1<<v-m[b]),m[b]=t;else break}for(d>>=y;d>0;){var w=r[a].s;m[w]<t?d-=1<<t-m[w]++-1:++a}for(;a>=0&&d;--a){var _=r[a].s;m[_]==t&&(--m[_],++d)}v=t}return{t:new Q(m),l:v}},Lt=function(e,t,n){return e.s==-1?Math.max(Lt(e.l,t,n+1),Lt(e.r,t,n+1)):t[e.s]=n},jn=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new se(++t),a=0,i=e[0],r=1,s=function(c){n[a++]=c},o=1;o<=t;++o)if(e[o]==i&&o!=t)++r;else{if(!i&&r>2){for(;r>138;r-=138)s(32754);r>2&&(s(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(s(i),--r;r>6;r-=6)s(8304);r>2&&(s(r-3<<5|8208),r=0)}for(;r--;)s(i);r=1,i=e[o]}return{c:n.subarray(0,a),n:t}},ze=function(e,t){for(var n=0,a=0;a<t.length;++a)n+=e[a]*t[a];return n},aa=function(e,t,n){var a=n.length,i=ta(t+2);e[i]=a&255,e[i+1]=a>>8,e[i+2]=e[i]^255,e[i+3]=e[i+1]^255;for(var r=0;r<a;++r)e[i+r+4]=n[r];return(i+4+a)*8},On=function(e,t,n,a,i,r,s,o,c,l,u){be(t,u++,n),++i[256];for(var h=Ft(i,15),g=h.t,m=h.l,v=Ft(r,15),d=v.t,y=v.l,p=jn(g),b=p.c,w=p.n,_=jn(d),x=_.c,A=_.n,M=new se(19),F=0;F<b.length;++F)++M[b[F]&31];for(var F=0;F<x.length;++F)++M[x[F]&31];for(var S=Ft(M,7),C=S.t,N=S.l,j=19;j>4&&!C[In[j-1]];--j);var W=l+5<<3,U=ze(i,Oe)+ze(r,ft)+s,X=ze(i,g)+ze(r,d)+s+14+3*j+ze(M,C)+2*M[16]+3*M[17]+7*M[18];if(c>=0&&W<=U&&W<=X)return aa(t,u,e.subarray(c,c+l));var G,P,J,ee;if(be(t,u,1+(X<U)),u+=2,X<U){G=Je(g,m,0),P=g,J=Je(d,y,0),ee=d;var tt=Je(C,N,0);be(t,u,w-257),be(t,u+5,A-1),be(t,u+10,j-4),u+=14;for(var F=0;F<j;++F)be(t,u+3*F,C[In[F]]);u+=3*j;for(var me=[b,x],nt=0;nt<2;++nt)for(var Le=me[nt],F=0;F<Le.length;++F){var ye=Le[F]&31;be(t,u,tt[ye]),u+=C[ye],ye>15&&(be(t,u,Le[F]>>5&127),u+=Le[F]>>12)}}else G=Gi,P=Oe,J=Yi,ee=ft;for(var F=0;F<o;++F){var ae=a[F];if(ae>255){var ye=ae>>18&31;Ve(t,u,G[ye+257]),u+=P[ye+257],ye>7&&(be(t,u,ae>>23&31),u+=tn[ye]);var $e=ae&31;Ve(t,u,J[$e]),u+=ee[$e],$e>3&&(Ve(t,u,ae>>5&8191),u+=nn[$e])}else Ve(t,u,G[ae]),u+=P[ae]}return Ve(t,u,G[256]),u+P[256]},Zi=new en([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ia=new Q(0),Qi=function(e,t,n,a,i,r){var s=r.z||e.length,o=new Q(a+s+5*(1+Math.ceil(s/7e3))+i),c=o.subarray(a,o.length-i),l=r.l,u=(r.r||0)&7;if(t){u&&(c[0]=r.r>>3);for(var h=Zi[t-1],g=h>>13,m=h&8191,v=(1<<n)-1,d=r.p||new se(32768),y=r.h||new se(v+1),p=Math.ceil(n/3),b=2*p,w=function(sn){return(e[sn]^e[sn+1]<<p^e[sn+2]<<b)&v},_=new en(25e3),x=new se(288),A=new se(32),M=0,F=0,S=r.i||0,C=0,N=r.w||0,j=0;S+2<s;++S){var W=w(S),U=S&32767,X=y[W];if(d[U]=X,y[W]=U,N<=S){var G=s-S;if((M>7e3||C>24576)&&(G>423||!l)){u=On(e,c,0,_,x,A,F,C,j,S-j,u),C=M=F=0,j=S;for(var P=0;P<286;++P)x[P]=0;for(var P=0;P<30;++P)A[P]=0}var J=2,ee=0,tt=m,me=U-X&32767;if(G>2&&W==w(S-me))for(var nt=Math.min(g,G)-1,Le=Math.min(32767,S),ye=Math.min(258,G);me<=Le&&--tt&&U!=X;){if(e[S+J]==e[S+J-me]){for(var ae=0;ae<ye&&e[S+ae]==e[S+ae-me];++ae);if(ae>J){if(J=ae,ee=me,ae>nt)break;for(var $e=Math.min(me,ae-2),sa=0,P=0;P<$e;++P){var an=S-me+P&32767,tr=d[an],oa=an-tr&32767;oa>sa&&(sa=oa,X=an)}}}U=X,X=d[U],me+=U-X&32767}if(ee){_[C++]=268435456|qt[J]<<18|Mn[ee];var la=qt[J]&31,ua=Mn[ee]&31;F+=tn[la]+nn[ua],++x[257+la],++A[ua],N=S+J,++M}else _[C++]=e[S],++x[e[S]]}}for(S=Math.max(S,N);S<s;++S)_[C++]=e[S],++x[e[S]];u=On(e,c,l,_,x,A,F,C,j,S-j,u),l||(r.r=u&7|c[u/8|0]<<3,u-=7,r.h=y,r.p=d,r.i=S,r.w=N)}else{for(var S=r.w||0;S<s+l;S+=65535){var rn=S+65535;rn>=s&&(c[u/8|0]=l,rn=s),u=aa(c,u+1,e.subarray(S,rn))}r.i=s}return na(o,0,a+ta(u)+i)},Ru=function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,a=9;--a;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e}(),Uu=function(){var e=-1;return{p:function(t){for(var n=e,a=0;a<t.length;++a)n=Ru[n&255^t[a]]^n>>>8;e=n},d:function(){return~e}}},ra=function(e,t,n,a,i){if(!i&&(i={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),s=new Q(r.length+e.length);s.set(r),s.set(e,r.length),e=s,i.w=r.length}return Qi(e,t.level==null?6:t.level,t.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,a,i)},er=function(e,t){var n={};for(var a in e)n[a]=e[a];for(var a in t)n[a]=t[a];return n},Ba=function(e,t,n){for(var a=e(),i=e.toString(),r=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),s=0;s<a.length;++s){var o=a[s],c=r[s];if(typeof o=="function"){t+=";"+c+"=";var l=o.toString();if(o.prototype)if(l.indexOf("[native code]")!=-1){var u=l.indexOf(" ",8)+1;t+=l.slice(u,l.indexOf("(",u))}else{t+=l;for(var h in o.prototype)t+=";"+c+".prototype."+h+"="+o.prototype[h].toString()}else t+=l}else n[c]=o}return t},xt=[],Pu=function(e){var t=[];for(var n in e)e[n].buffer&&t.push((e[n]=new e[n].constructor(e[n])).buffer);return t},Du=function(e,t,n,a){if(!xt[n]){for(var i="",r={},s=e.length-1,o=0;o<s;++o)i=Ba(e[o],i,r);xt[n]={c:Ba(e[s],i,r),e:r}}var c=er({},xt[n].e);return Mu(xt[n].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",n,c,Pu(c),a)},qu=function(){return[Q,se,en,tn,nn,In,qt,Mn,Gi,Oe,Yi,ft,Bt,Zi,ia,Je,be,Ve,Ft,Lt,jn,ze,aa,On,ta,na,Qi,ra,Vu,Bu]},Bu=function(e){return postMessage(e,[e.buffer])},La=function(e){return e.ondata=function(t,n){return postMessage([t,n],[t.buffer])},function(t){t.data.length?(e.push(t.data[0],t.data[1]),postMessage([t.data[0].length])):e.flush()}},Lu=function(e,t,n,a,i,r,s){var o,c=Du(e,a,i,function(l,u){l?(c.terminate(),t.ondata.call(t,l)):Array.isArray(u)?u.length==1?(t.queuedSize-=u[0],t.ondrain&&t.ondrain(u[0])):(u[1]&&c.terminate(),t.ondata.call(t,l,u[0],u[1])):s(u)});c.postMessage(n),t.queuedSize=0,t.push=function(l,u){t.ondata||oe(5),o&&t.ondata(oe(4,0,1),null,!!u),t.queuedSize+=l.length,c.postMessage([l,o=u],[l.buffer])},t.terminate=function(){c.terminate()},t.flush=function(){c.postMessage([])}},H=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function $u(e,t){return typeof e=="function"&&(t=e,e={}),this.ondata=t,e}var $a=function(){function e(t,n){if(typeof t=="function"&&(n=t,t={}),this.ondata=n,this.o=t||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new Q(98304),this.o.dictionary){var a=this.o.dictionary.subarray(-32768);this.b.set(a,32768-a.length),this.s.i=32768-a.length}}return e.prototype.p=function(t,n){this.ondata(ra(t,this.o,0,0,this.s),n)},e.prototype.push=function(t,n){this.ondata||oe(5),this.s.l&&oe(4);var a=t.length+this.s.z;if(a>this.b.length){if(a>2*this.b.length-32768){var i=new Q(a&-32768);i.set(this.b.subarray(0,this.s.z)),this.b=i}var r=this.b.length-this.s.z;this.b.set(t.subarray(0,r),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(t.subarray(r),32768),this.s.z=t.length-r+32768,this.s.i=32766,this.s.w=32768}else this.b.set(t,this.s.z),this.s.z+=t.length;this.s.l=n&1,(this.s.z>this.s.w+8191||n)&&(this.p(this.b,n||!1),this.s.w=this.s.i,this.s.i-=2)},e.prototype.flush=function(){this.ondata||oe(5),this.s.l&&oe(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2},e}(),Hu=function(){function e(t,n){Lu([qu,function(){return[La,$a]}],this,$u.call(this,t,n),function(a){var i=new $a(a.data);onmessage=La(i)},6)}return e}();function Vu(e,t){return ra(e,t||{},0,0)}var Ha=typeof TextEncoder<"u"&&new TextEncoder,zu=typeof TextDecoder<"u"&&new TextDecoder,Wu=0;try{zu.decode(ia,{stream:!0}),Wu=1}catch{}function Va(e,t){var n;if(Ha)return Ha.encode(e);for(var a=e.length,i=new Q(e.length+(e.length>>1)),r=0,s=function(l){i[r++]=l},n=0;n<a;++n){if(r+5>i.length){var o=new Q(r+8+(a-n<<1));o.set(i),i=o}var c=e.charCodeAt(n);c<128||t?s(c):c<2048?(s(192|c>>6),s(128|c&63)):c>55295&&c<57344?(c=65536+(c&1047552)|e.charCodeAt(++n)&1023,s(240|c>>18),s(128|c>>12&63),s(128|c>>6&63),s(128|c&63)):(s(224|c>>12),s(128|c>>6&63),s(128|c&63))}return na(i,0,r)}var Ju=function(e){return e==1?3:e<6?2:e==9?1:0},At=function(e){var t=0;if(e)for(var n in e){var a=e[n].length;a>65535&&oe(9),t+=a+4}return t},za=function(e,t,n,a,i,r,s,o){var c=a.length,l=n.extra,u=o&&o.length,h=At(l);H(e,t,s!=null?33639248:67324752),t+=4,s!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(r<0&&8),e[t++]=i&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var g=new Date(n.mtime==null?Date.now():n.mtime),m=g.getFullYear()-1980;if((m<0||m>119)&&oe(10),H(e,t,m<<25|g.getMonth()+1<<21|g.getDate()<<16|g.getHours()<<11|g.getMinutes()<<5|g.getSeconds()>>1),t+=4,r!=-1&&(H(e,t,n.crc),H(e,t+4,r<0?-r-2:r),H(e,t+8,n.size)),H(e,t+12,c),H(e,t+14,h),t+=16,s!=null&&(H(e,t,u),H(e,t+6,n.attrs),H(e,t+10,s),t+=14),e.set(a,t),t+=c,h)for(var v in l){var d=l[v],y=d.length;H(e,t,+v),H(e,t+2,y),e.set(d,t+4),t+=4+y}return u&&(e.set(o,t),t+=u),t},Ku=function(e,t,n,a,i){H(e,t,101010256),H(e,t+8,n),H(e,t+10,n),H(e,t+12,a),H(e,t+16,i)},$t=function(){function e(t){this.filename=t,this.c=Uu(),this.size=0,this.compression=0}return e.prototype.process=function(t,n){this.ondata(null,t,n)},e.prototype.push=function(t,n){this.ondata||oe(5),this.c.p(t),this.size+=t.length,n&&(this.crc=this.c.d()),this.process(t,n||!1)},e}(),Wa=function(){function e(t,n){var a=this;n||(n={}),$t.call(this,t),this.d=new Hu(n,function(i,r,s){a.ondata(i,r,s)}),this.compression=8,this.flag=Ju(n.level),this.terminate=this.d.terminate}return e.prototype.process=function(t,n){this.d.push(t,n)},e.prototype.push=function(t,n){$t.prototype.push.call(this,t,n)},e}(),Xu=function(){function e(t){this.ondata=t,this.u=[],this.d=1}return e.prototype.add=function(t){var n=this;if(this.ondata||oe(5),this.d&2)this.ondata(oe(4+(this.d&1)*8,0,1),null,!1);else{var a=Va(t.filename),i=a.length,r=t.comment,s=r&&Va(r),o=i!=t.filename.length||s&&r.length!=s.length,c=i+At(t.extra)+30;i>65535&&this.ondata(oe(11,0,1),null,!1);var l=new Q(c);za(l,0,t,a,o,-1);var u=[l],h=function(){for(var y=0,p=u;y<p.length;y++){var b=p[y];n.ondata(null,b,!1)}u=[]},g=this.d;this.d=0;var m=this.u.length,v=er(t,{f:a,u:o,o:s,t:function(){t.terminate&&t.terminate()},r:function(){if(h(),g){var y=n.u[m+1];y?y.r():n.d=1}g=1}}),d=0;t.ondata=function(y,p,b){if(y)n.ondata(y,p,b),n.terminate();else if(d+=p.length,u.push(p),b){var w=new Q(16);H(w,0,134695760),H(w,4,t.crc),H(w,8,d),H(w,12,t.size),u.push(w),v.c=d,v.b=c+d+16,v.crc=t.crc,v.size=t.size,g&&v.r(),g=1}else g&&h()},this.u.push(v)}},e.prototype.end=function(){var t=this;if(this.d&2){this.ondata(oe(4+(this.d&1)*8,0,1),null,!0);return}this.d?this.e():this.u.push({r:function(){t.d&1&&(t.u.splice(-1,1),t.e())},t:function(){}}),this.d=3},e.prototype.e=function(){for(var t=0,n=0,a=0,i=0,r=this.u;i<r.length;i++){var s=r[i];a+=46+s.f.length+At(s.extra)+(s.o?s.o.length:0)}for(var o=new Q(a+22),c=0,l=this.u;c<l.length;c++){var s=l[c];za(o,t,s,s.f,s.u,-s.c-2,n,s.o),t+=46+s.f.length+At(s.extra)+(s.o?s.o.length:0),n+=s.b}Ku(o,t,this.u.length,a,n),this.ondata(null,o,!0),this.d=2},e.prototype.terminate=function(){for(var t=0,n=this.u;t<n.length;t++){var a=n[t];a.t()}this.d=2},e}();const Gu=(e,t)=>{const n=[];let a,i;const r=new Promise((c,l)=>{a=c,i=l}),s=new Xu((c,l,u)=>{if(c){s.terminate(),i(c);return}if(n.push(l),u){const h=new Blob(n,{type:"application/zip"});a(h)}}),o=new Wa("fonts.css");s.add(o),o.push(new TextEncoder().encode(t),!0);for(const{filename:c,data:l,font:{format:u}}of e){if(l.opentype){const h=u==="opentype"?".otf":".ttf",g=new Wa(c+h);s.add(g),g.push(l.opentype.slice(),!0)}if(l.woff){const h=new $t(c+".woff");s.add(h),h.push(l.woff,!0)}if(l.woff2){const h=new $t(c+".woff2");s.add(h),h.push(l.woff2,!0)}}return s.end(),r},rt=(e,t)=>{const n=document.createElement("a"),a=URL.createObjectURL(t);n.href=a,n.download=e,n.click(),setTimeout(()=>{window.URL.revokeObjectURL(a)},0)},Yu=e=>{const t=te(()=>{}),n=te(null),a=I(o=>{n.current=o,t.current(),i.current!==null&&o!==null&&(t.current=Da(o,i.current,s))},[]),i=te(null),r=I(o=>{i.current=o,t.current(),o!==null&&n.current!==null&&(t.current=Da(n.current,o,s))},[]),s=I(()=>{if(!n.current||!i.current)return;const o=i.current;Iu(n.current,i.current,e==null?void 0:e()).then(({x:c,y:l})=>{o.style.left=`${c}px`,o.style.top=`${l}px`})},[]);return zt(()=>()=>t.current(),[]),{reference:a,floating:r}},Zu=(e,t,n,a)=>{const i=Ee(e),r=te(null),s=te(null),o=I(l=>{s.current=l},[i]);return{resizerRef:I(l=>{if(r.current&&(r.current.abort(),r.current=null),!l)return;const u=new AbortController;r.current=u;let h,g;const m=v=>{var b;v.preventDefault(),v.stopPropagation();const d=a==="vertical"?v.clientY:v.clientX,y=(b=s.current)==null?void 0:b.getBoundingClientRect();if(!y)return;const p=a==="vertical"?y.height:y.width;h=w=>{w.preventDefault(),w.stopPropagation();const _=(a==="vertical"?w.clientY:w.clientX)-d,x=p-_;x>=t&&x<=n&&(i.value=x)},g=()=>{document.removeEventListener("pointermove",h),document.removeEventListener("pointerup",g),document.removeEventListener("pointerleave",g)},document.addEventListener("pointermove",h,{signal:u.signal}),document.addEventListener("pointerup",g,{signal:u.signal}),document.addEventListener("pointerleave",g,{signal:u.signal})};l&&l.addEventListener("pointerdown",m,{signal:u.signal})},[t,n,i,a]),panelRef:o,panelSize:i}},Qu="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xml:space='preserve'%20width='128'%20height='128'%3e%3cpath%20fill='%23fcc21b'%20d='M125.74%2074.99c7.79-29.66-8.507-56.66-38.005-62.083C24.313%201.249-3.8%2053.67.83%2094.54c0%2013.63%2028.17%2024.69%2062.93%2024.69%2032.58%200%2059.37-9.73%2062.59-22.17q.33-1.245.33-2.52c.01-6.48-4.12-7.46-.94-19.55'/%3e%3cpath%20fill='%232f2f2f'%20d='M28.073%2042.118c2.28-4.54%207.2-6.69%2010.99-4.84%203.78%201.86%205.01%207.03%202.74%2011.56s-7.18%206.69-10.97%204.83c-3.78-1.86-5.02-7.04-2.76-11.55M93.541%2053.449c-1.09%205.07-5.41%208.47-9.65%207.59-4.27-.89-6.84-5.72-5.77-10.79%201.09-5.08%205.41-8.48%209.67-7.59%204.25.87%206.83%205.69%205.75%2010.79'/%3e%3cpath%20fill='%23fcc21b'%20d='M10.415%2046.678c1.349-9.29%201.124-28.397%202.622-35.664C14.536%203.746%2017.721.823%2025.1%206.594c6.955%205.439%2012.337%2010.322%2014.386%2011.528M102.41%2018.649c5.563-3.656%2014.517-8%2018.119-8.636%203.548-.626%207.682-.212%207.1%205.404-.678%206.53-3.391%2020.132-3.286%2027.338'/%3e%3cpath%20fill='none'%20stroke='%232f2f2f'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='6'%20d='M38.677%2063.99c1.309%204.264%204.257%2011.373%206.04%2013.249%202.967-2.225%209.093-8.665%209.94-9.725%202.506%202.594%205.863%208.868%208.59%2012.043%203.39-2.119%209.473-7.929%2011.28-9.673'/%3e%3cpath%20fill='%232f2f2f'%20d='M28.621%2061.813c.317%203.329-20.531%202.594-20.455%201.124.08-1.53%2020.224-3.549%2020.455-1.124M25.699%2070.3c2.007%202.675-19.201%2012.794-20.05%2010.383-.706-2.005%2019.418-11.226%2020.05-10.383M89.517%2069.914c.45-3.314%2020.957%202.485%2020.548%203.9-.426%201.472-20.875-1.486-20.548-3.9M88.278%2079.466c.905-.914%2019.818%2010.186%2018.207%2011.94-2.587%202.817-19.439-10.697-18.207-11.94'/%3e%3c/svg%3e",ec={[R.Whitespace]:null,[R.DefinitionKeyword]:"dk",[R.OperatorKeyword]:"ok",[R.Keyword]:"kw",[R.PropertyName]:"pn",[R.Paren]:"p",[R.Brace]:"b",[R.Punctuation]:"pu",[R.String]:"s",[R.Number]:"n",[R.Separator]:"se"},tc=({fonts:e})=>{const{cssPathPrefix:t,exportSettings:n}=Re(),a=Jn(t,500,!0),i=xe(()=>{const s=Hn(e,a.value,n.includeTTFinCSS.value);return s.spans.length>0&&s.spans[s.spans.length-1].type===R.Whitespace&&s.spans.pop(),s},[e,a.value,n.includeTTFinCSS.value]),r=s=>{if(!s)return;const o=new DocumentFragment;for(const c of i.spans){const l=document.createElement("span"),u=ec[c.type];u!==null&&l.setAttribute("class",`hl-${u}`),l.append(c.text),o.appendChild(l)}s.replaceChildren(o)};return xe(()=>f("pre",{className:E.cssPreview,ref:r}),[i])},nc=({fonts:e,exportedFormats:t})=>{const{cssPathPrefix:n,exportSettings:a}=Re(),i=Ee(!1),r=I(async()=>{i.value=!0;const s=await Gu(e,Hn(e,n.value,a.includeTTFinCSS.value).getString());rt("fonts.zip",s),i.value=!1},[e,n,a.includeTTFinCSS]);return f("div",{className:E.exportedFonts,children:[f("div",{className:E.exportedFontFiles,children:f("table",{className:K(E.fontFileTable,"fancy-table"),children:[f("thead",{children:f("tr",{children:[f("th",{scope:"col",children:"Filename"}),t.ttf&&f("th",{scope:"col",children:"TTF/OTF"}),t.woff&&f("th",{scope:"col",children:"WOFF"}),t.woff2&&f("th",{scope:"col",children:"WOFF2"})]})}),f("tbody",{children:e.map(({filename:s,data:o})=>f("tr",{children:[f("td",{className:E.fontName,children:s}),t.ttf&&f("td",{className:E.fontFileSize,children:o.opentype?f(re,{children:[f("span",{children:[Tt(o.opentype.length)," "]}),f(fe,{type:"download",title:"Download",onClick:()=>rt(s+".ttf",new Blob([o.opentype],{type:"font/ttf"}))})]}):null}),t.woff&&f("td",{className:E.fontFileSize,children:o.woff?f(re,{children:[f("span",{children:[Tt(o.woff.length)," "]}),f(fe,{type:"download",title:"Download",onClick:()=>rt(s+".woff",new Blob([o.woff],{type:"font/woff"}))})]}):null}),t.woff2&&f("td",{className:E.fontFileSize,children:o.woff2?f(re,{children:[f("span",{children:[Tt(o.woff2.length)," "]}),f(fe,{type:"download",title:"Download",onClick:()=>rt(s+".woff2",new Blob([o.woff2],{type:"font/woff2"}))})]}):null})]}))})]})}),f(it,{onClick:r,disabled:i.value,children:[i.value?f(Rt,{size:24}):f(de,{type:"download",title:""}),f("span",{children:"Download .zip"})]})]})},ac=({fonts:e})=>{const{cssPathPrefix:t,exportSettings:n}=Re(),a=I(()=>{Mi(Hn(e,t.value,n.includeTTFinCSS.value).getString())},[e,t,n.includeTTFinCSS]);return f("div",{className:E.exportedCss,children:[f("div",{className:E.cssPathPrefixBar,children:[f("label",{children:"CSS path prefix:"}),f(Xt,{className:E.cssPathPrefix,value:t}),f(fe,{type:"copy",title:"Copy CSS to clipboard",onClick:a})]}),f(tc,{fonts:e})]})},ic=({relativeTo:e,active:t})=>{const{reference:n,floating:a}=Yu(()=>({placement:"bottom",middleware:[Fu(4),Au({padding:8}),Nu({apply({availableWidth:o,availableHeight:c,elements:l}){const{floating:u}=l;u.style.maxWidth=`${o}px`,u.style.maxHeight=`${c}px`},padding:8}),Cu()]}));n(e.current);const i=o=>{a(o),o==null||o.focus()},r=I(o=>{var c;(!o.relatedTarget||o.relatedTarget!==e.current&&((c=o.currentTarget)==null?void 0:c.contains(o.relatedTarget))===!1)&&(t.value=!1)},[]),{exportSettings:s}=Re();return t.value?f(ji,{children:f("div",{className:E.moreSettings,tabIndex:0,ref:i,onBlur:r,children:[f("div",{className:K(E.setting,E.spinboxSetting),children:[f("label",{children:"WOFF compression level"}),f(lt,{min:1,max:100,step:1,value:s.woffCompression})]}),f("div",{className:K(E.setting,E.spinboxSetting),children:[f("label",{children:"WOFF2 compression level"}),f(lt,{min:1,max:11,step:1,value:s.woff2Compression})]}),f("div",{className:E.setting,children:f(Ne,{label:"Include .ttf/.otf in CSS",checked:s.includeTTFinCSS})})]})}):null},rc=()=>{const e=Re(),{fonts:t,fontsBeingLoaded:n,exportSettings:a}=e,i=Gt(),r=I(()=>{e.exportFonts().catch(p=>{i("Failed to export fonts",p)})},[e]),s=I(()=>{Ei().then(async p=>{p&&await e.addFonts(Array.from(p))}).catch(p=>{i("Failed to upload fonts",p)})},[e,i]),o=I(()=>{const p=e.saveAllSettings(),b=new Blob([new TextEncoder().encode(JSON.stringify(p))],{type:"application/json"});rt("settings.json",b)},[e]),c=I(()=>{Oi({accept:".json"}).then(async p=>{if(p&&p.length>0){const w=await p[0].text(),_=JSON.parse(w);e.loadAllSettings(_)}}).catch(p=>{i("Failed to load settings",p)})},[e,i]),l=Ee(!1),u=te(null),[h,g]=ui(()=>window.matchMedia("(orientation: portrait)").matches);Nt(()=>{const p=window.matchMedia("(orientation: portrait)"),b=w=>{g(w.matches)};return p.addEventListener("change",b),()=>{p.removeEventListener("change",b)}},[h]);const{resizerRef:m,panelRef:v,panelSize:d}=Zu(500,h?200:400,1e4,h?"vertical":"horizontal");if(t.value.length===0)return null;let y=null;if(e.exportedFonts.value.state==="loaded"){const{exportedFonts:p,exportedFormats:b}=e.exportedFonts.value;y=f("div",{className:E.exportResults,children:[f(nc,{fonts:p,exportedFormats:b}),f(ac,{fonts:p})]})}else if(e.exportedFonts.value.state==="loading"){const{progress:p}=e.exportedFonts.value;y=f("div",{className:E.loaderWrapper,children:f(Rt,{size:128,className:E.exportLoader,progress:p})})}return f("div",{className:K(E.exportPanel,h?E.vertical:E.horizontal),ref:v,style:{[h?"height":"width"]:`${d.value}px`},children:[f("div",{className:E.splitter,ref:m}),f("div",{className:E.exportButtons,children:[f("div",{className:E.row,children:[f(it,{onClick:r,disabled:e.exportedFonts.value.state==="loading",className:E.growButton,children:"Export"}),f("div",{className:E.exportFormats,children:[f(Ne,{label:"TTF/OTF",checked:a.formats.ttf}),f(Ne,{label:"WOFF",checked:a.formats.woff}),f(Ne,{label:"WOFF2",checked:a.formats.woff2}),f($o,{type:"gear",title:"More settings",toggled:l,innerRef:u})]})]}),f(ic,{relativeTo:u,active:l}),f("div",{className:E.saveLoadSettings,children:[f(it,{onClick:o,children:[f(de,{type:"download",title:""}),"Save settings"]}),f(it,{onClick:c,children:[f(de,{type:"upload",title:""}),"Load settings"]})]}),f("div",{className:E.uploadMore,children:f(it,{onClick:s,className:E.growButton,children:[n.value>0?f(Rt,{size:24}):f(de,{type:"upload",title:""}),"Upload more fonts"]})})]}),y,f("div",{className:E.spacer}),f("div",{className:E.footer,children:[f("span",{children:["Made with ",f("img",{src:Qu,alt:"blobCat",width:"128",height:"128",style:"width: 1em; height: 1em; vertical-align: middle"})," by ",f("a",{href:"https://github.com/valadaptive",children:"valadaptive"})]}),f("div",{className:E.spacer}),f("a",{href:"https://github.com/valadaptive/glypht",className:E.githubLink,children:f(de,{type:"github",title:"View this project on GitHub",clickableStyle:!0,size:"1rem"})})]})]})},sc=()=>f("div",{className:cn.app,children:f("div",{className:cn.displayPane,children:[f("div",{className:cn.mainPane,children:f(_l,{})}),f(rc,{})]})}),oc=Ys();function lc(){return f(Ni.Provider,{value:oc,children:f(ol,{children:f(fl,{children:f(sc,{})})})})}document.body.className="";lr(f(lc,{}),document.body);
