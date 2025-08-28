(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();var Mn,W,js,Ps,_t,Xa,Ds,Us,Ls,ya,aa,sa,Bs,Jt={},qs=[],Ki=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Rn=Array.isArray;function at(e,t){for(var n in t)e[n]=t[n];return e}function va(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function Gi(e,t,n){var a,s,i,r={};for(i in t)i=="key"?a=t[i]:i=="ref"?s=t[i]:r[i]=t[i];if(arguments.length>2&&(r.children=arguments.length>3?Mn.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(i in e.defaultProps)r[i]==null&&(r[i]=e.defaultProps[i]);return fn(e,r,a,s,null)}function fn(e,t,n,a,s){var i={type:e,props:t,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:s??++js,__i:-1,__u:0};return s==null&&W.vnode!=null&&W.vnode(i),i}function Je(e){return e.children}function Ht(e,t){this.props=e,this.context=t}function Ot(e,t){if(t==null)return e.__?Ot(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?Ot(e):null}function zs(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=e.__c.base=n.__e;break}return zs(e)}}function ia(e){(!e.__d&&(e.__d=!0)&&_t.push(e)&&!yn.__r++||Xa!=W.debounceRendering)&&((Xa=W.debounceRendering)||Ds)(yn)}function yn(){for(var e,t,n,a,s,i,r,o=1;_t.length;)_t.length>o&&_t.sort(Us),e=_t.shift(),o=_t.length,e.__d&&(n=void 0,s=(a=(t=e).__v).__e,i=[],r=[],t.__P&&((n=at({},a)).__v=a.__v+1,W.vnode&&W.vnode(n),wa(t.__P,n,a,t.__n,t.__P.namespaceURI,32&a.__u?[s]:null,i,s??Ot(a),!!(32&a.__u),r),n.__v=a.__v,n.__.__k[n.__i]=n,Vs(i,n,r),n.__e!=s&&zs(n)));yn.__r=0}function $s(e,t,n,a,s,i,r,o,c,u,l){var h,f,p,g,y,v,m=a&&a.__k||qs,b=t.length;for(c=Xi(n,t,m,c,b),h=0;h<b;h++)(p=n.__k[h])!=null&&(f=p.__i==-1?Jt:m[p.__i]||Jt,p.__i=h,v=wa(e,p,f,s,i,r,o,c,u,l),g=p.__e,p.ref&&f.ref!=p.ref&&(f.ref&&_a(f.ref,null,p),l.push(p.ref,p.__c||g,p)),y==null&&g!=null&&(y=g),4&p.__u||f.__k===p.__k?c=Hs(p,c,e):typeof p.type=="function"&&v!==void 0?c=v:g&&(c=g.nextSibling),p.__u&=-7);return n.__e=y,c}function Xi(e,t,n,a,s){var i,r,o,c,u,l=n.length,h=l,f=0;for(e.__k=new Array(s),i=0;i<s;i++)(r=t[i])!=null&&typeof r!="boolean"&&typeof r!="function"?(c=i+f,(r=e.__k[i]=typeof r=="string"||typeof r=="number"||typeof r=="bigint"||r.constructor==String?fn(null,r,null,null,null):Rn(r)?fn(Je,{children:r},null,null,null):r.constructor==null&&r.__b>0?fn(r.type,r.props,r.key,r.ref?r.ref:null,r.__v):r).__=e,r.__b=e.__b+1,o=null,(u=r.__i=Zi(r,n,c,h))!=-1&&(h--,(o=n[u])&&(o.__u|=2)),o==null||o.__v==null?(u==-1&&(s>l?f--:s<l&&f++),typeof r.type!="function"&&(r.__u|=4)):u!=c&&(u==c-1?f--:u==c+1?f++:(u>c?f--:f++,r.__u|=4))):e.__k[i]=null;if(h)for(i=0;i<l;i++)(o=n[i])!=null&&(2&o.__u)==0&&(o.__e==a&&(a=Ot(o)),Js(o,o));return a}function Hs(e,t,n){var a,s;if(typeof e.type=="function"){for(a=e.__k,s=0;a&&s<a.length;s++)a[s]&&(a[s].__=e,t=Hs(a[s],t,n));return t}e.__e!=t&&(t&&e.type&&!n.contains(t)&&(t=Ot(e)),n.insertBefore(e.__e,t||null),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Zi(e,t,n,a){var s,i,r=e.key,o=e.type,c=t[n];if(c===null&&e.key==null||c&&r==c.key&&o==c.type&&(2&c.__u)==0)return n;if(a>(c!=null&&(2&c.__u)==0?1:0))for(s=n-1,i=n+1;s>=0||i<t.length;){if(s>=0){if((c=t[s])&&(2&c.__u)==0&&r==c.key&&o==c.type)return s;s--}if(i<t.length){if((c=t[i])&&(2&c.__u)==0&&r==c.key&&o==c.type)return i;i++}}return-1}function Za(e,t,n){t[0]=="-"?e.setProperty(t,n??""):e[t]=n==null?"":typeof n!="number"||Ki.test(t)?n:n+"px"}function ln(e,t,n,a,s){var i;e:if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof a=="string"&&(e.style.cssText=a=""),a)for(t in a)n&&t in n||Za(e.style,t,"");if(n)for(t in n)a&&n[t]==a[t]||Za(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")i=t!=(t=t.replace(Ls,"$1")),t=t.toLowerCase()in e||t=="onFocusOut"||t=="onFocusIn"?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?a?n.u=a.u:(n.u=ya,e.addEventListener(t,i?sa:aa,i)):e.removeEventListener(t,i?sa:aa,i);else{if(s=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n))}}function Ya(e){return function(t){if(this.l){var n=this.l[t.type+e];if(t.t==null)t.t=ya++;else if(t.t<n.u)return;return n(W.event?W.event(t):t)}}}function wa(e,t,n,a,s,i,r,o,c,u){var l,h,f,p,g,y,v,m,b,w,_,S,x,A,F,T,E,U=t.type;if(t.constructor!=null)return null;128&n.__u&&(c=!!(32&n.__u),i=[o=t.__e=n.__e]),(l=W.__b)&&l(t);e:if(typeof U=="function")try{if(m=t.props,b="prototype"in U&&U.prototype.render,w=(l=U.contextType)&&a[l.__c],_=l?w?w.props.value:l.__:a,n.__c?v=(h=t.__c=n.__c).__=h.__E:(b?t.__c=h=new U(m,_):(t.__c=h=new Ht(m,_),h.constructor=U,h.render=Qi),w&&w.sub(h),h.props=m,h.state||(h.state={}),h.context=_,h.__n=a,f=h.__d=!0,h.__h=[],h._sb=[]),b&&h.__s==null&&(h.__s=h.state),b&&U.getDerivedStateFromProps!=null&&(h.__s==h.state&&(h.__s=at({},h.__s)),at(h.__s,U.getDerivedStateFromProps(m,h.__s))),p=h.props,g=h.state,h.__v=t,f)b&&U.getDerivedStateFromProps==null&&h.componentWillMount!=null&&h.componentWillMount(),b&&h.componentDidMount!=null&&h.__h.push(h.componentDidMount);else{if(b&&U.getDerivedStateFromProps==null&&m!==p&&h.componentWillReceiveProps!=null&&h.componentWillReceiveProps(m,_),!h.__e&&h.shouldComponentUpdate!=null&&h.shouldComponentUpdate(m,h.__s,_)===!1||t.__v==n.__v){for(t.__v!=n.__v&&(h.props=m,h.state=h.__s,h.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(B){B&&(B.__=t)}),S=0;S<h._sb.length;S++)h.__h.push(h._sb[S]);h._sb=[],h.__h.length&&r.push(h);break e}h.componentWillUpdate!=null&&h.componentWillUpdate(m,h.__s,_),b&&h.componentDidUpdate!=null&&h.__h.push(function(){h.componentDidUpdate(p,g,y)})}if(h.context=_,h.props=m,h.__P=e,h.__e=!1,x=W.__r,A=0,b){for(h.state=h.__s,h.__d=!1,x&&x(t),l=h.render(h.props,h.state,h.context),F=0;F<h._sb.length;F++)h.__h.push(h._sb[F]);h._sb=[]}else do h.__d=!1,x&&x(t),l=h.render(h.props,h.state,h.context),h.state=h.__s;while(h.__d&&++A<25);h.state=h.__s,h.getChildContext!=null&&(a=at(at({},a),h.getChildContext())),b&&!f&&h.getSnapshotBeforeUpdate!=null&&(y=h.getSnapshotBeforeUpdate(p,g)),T=l,l!=null&&l.type===Je&&l.key==null&&(T=Ws(l.props.children)),o=$s(e,Rn(T)?T:[T],t,n,a,s,i,r,o,c,u),h.base=t.__e,t.__u&=-161,h.__h.length&&r.push(h),v&&(h.__E=h.__=null)}catch(B){if(t.__v=null,c||i!=null)if(B.then){for(t.__u|=c?160:128;o&&o.nodeType==8&&o.nextSibling;)o=o.nextSibling;i[i.indexOf(o)]=null,t.__e=o}else for(E=i.length;E--;)va(i[E]);else t.__e=n.__e,t.__k=n.__k;W.__e(B,t,n)}else i==null&&t.__v==n.__v?(t.__k=n.__k,t.__e=n.__e):o=t.__e=Yi(n.__e,t,n,a,s,i,r,c,u);return(l=W.diffed)&&l(t),128&t.__u?void 0:o}function Vs(e,t,n){for(var a=0;a<n.length;a++)_a(n[a],n[++a],n[++a]);W.__c&&W.__c(t,e),e.some(function(s){try{e=s.__h,s.__h=[],e.some(function(i){i.call(s)})}catch(i){W.__e(i,s.__v)}})}function Ws(e){return typeof e!="object"||e==null||e.__b&&e.__b>0?e:Rn(e)?e.map(Ws):at({},e)}function Yi(e,t,n,a,s,i,r,o,c){var u,l,h,f,p,g,y,v=n.props,m=t.props,b=t.type;if(b=="svg"?s="http://www.w3.org/2000/svg":b=="math"?s="http://www.w3.org/1998/Math/MathML":s||(s="http://www.w3.org/1999/xhtml"),i!=null){for(u=0;u<i.length;u++)if((p=i[u])&&"setAttribute"in p==!!b&&(b?p.localName==b:p.nodeType==3)){e=p,i[u]=null;break}}if(e==null){if(b==null)return document.createTextNode(m);e=document.createElementNS(s,b,m.is&&m),o&&(W.__m&&W.__m(t,i),o=!1),i=null}if(b==null)v===m||o&&e.data==m||(e.data=m);else{if(i=i&&Mn.call(e.childNodes),v=n.props||Jt,!o&&i!=null)for(v={},u=0;u<e.attributes.length;u++)v[(p=e.attributes[u]).name]=p.value;for(u in v)if(p=v[u],u!="children"){if(u=="dangerouslySetInnerHTML")h=p;else if(!(u in m)){if(u=="value"&&"defaultValue"in m||u=="checked"&&"defaultChecked"in m)continue;ln(e,u,null,p,s)}}for(u in m)p=m[u],u=="children"?f=p:u=="dangerouslySetInnerHTML"?l=p:u=="value"?g=p:u=="checked"?y=p:o&&typeof p!="function"||v[u]===p||ln(e,u,p,v[u],s);if(l)o||h&&(l.__html==h.__html||l.__html==e.innerHTML)||(e.innerHTML=l.__html),t.__k=[];else if(h&&(e.innerHTML=""),$s(t.type=="template"?e.content:e,Rn(f)?f:[f],t,n,a,b=="foreignObject"?"http://www.w3.org/1999/xhtml":s,i,r,i?i[0]:n.__k&&Ot(n,0),o,c),i!=null)for(u=i.length;u--;)va(i[u]);o||(u="value",b=="progress"&&g==null?e.removeAttribute("value"):g!=null&&(g!==e[u]||b=="progress"&&!g||b=="option"&&g!=v[u])&&ln(e,u,g,v[u],s),u="checked",y!=null&&y!=e[u]&&ln(e,u,y,v[u],s))}return e}function _a(e,t,n){try{if(typeof e=="function"){var a=typeof e.__u=="function";a&&e.__u(),a&&t==null||(e.__u=e(t))}else e.current=t}catch(s){W.__e(s,n)}}function Js(e,t,n){var a,s;if(W.unmount&&W.unmount(e),(a=e.ref)&&(a.current&&a.current!=e.__e||_a(a,null,t)),(a=e.__c)!=null){if(a.componentWillUnmount)try{a.componentWillUnmount()}catch(i){W.__e(i,t)}a.base=a.__P=null}if(a=e.__k)for(s=0;s<a.length;s++)a[s]&&Js(a[s],t,n||typeof e.type!="function");n||va(e.__e),e.__c=e.__=e.__e=void 0}function Qi(e,t,n){return this.constructor(e,n)}function er(e,t,n){var a,s,i,r;t==document&&(t=document.documentElement),W.__&&W.__(e,t),s=(a=!1)?null:t.__k,i=[],r=[],wa(t,e=t.__k=Gi(Je,null,[e]),s||Jt,Jt,t.namespaceURI,s?null:t.firstChild?Mn.call(t.childNodes):null,i,s?s.__e:t.firstChild,a,r),Vs(i,e,r)}function xa(e){function t(n){var a,s;return this.getChildContext||(a=new Set,(s={})[t.__c]=this,this.getChildContext=function(){return s},this.componentWillUnmount=function(){a=null},this.shouldComponentUpdate=function(i){this.props.value!=i.value&&a.forEach(function(r){r.__e=!0,ia(r)})},this.sub=function(i){a.add(i);var r=i.componentWillUnmount;i.componentWillUnmount=function(){a&&a.delete(i),r&&r.call(i)}}),n.children}return t.__c="__cC"+Bs++,t.__=e,t.Provider=t.__l=(t.Consumer=function(n,a){return n.children(a)}).contextType=t,t}Mn=qs.slice,W={__e:function(e,t,n,a){for(var s,i,r;t=t.__;)if((s=t.__c)&&!s.__)try{if((i=s.constructor)&&i.getDerivedStateFromError!=null&&(s.setState(i.getDerivedStateFromError(e)),r=s.__d),s.componentDidCatch!=null&&(s.componentDidCatch(e,a||{}),r=s.__d),r)return s.__E=s}catch(o){e=o}throw e}},js=0,Ps=function(e){return e!=null&&e.constructor==null},Ht.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=at({},this.state),typeof e=="function"&&(e=e(at({},n),this.props)),e&&at(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),ia(this))},Ht.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),ia(this))},Ht.prototype.render=Je,_t=[],Ds=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Us=function(e,t){return e.__v.__b-t.__v.__b},yn.__r=0,Ls=/(PointerCapture)$|Capture$/i,ya=0,aa=Ya(!1),sa=Ya(!0),Bs=0;var tr=0;function d(e,t,n,a,s,i){t||(t={});var r,o,c=t;if("ref"in c)for(o in c={},t)o=="ref"?r=t[o]:c[o]=t[o];var u={type:e,props:c,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--tr,__i:-1,__u:0,__source:s,__self:i};if(typeof e=="function"&&(r=e.defaultProps))for(o in r)c[o]===void 0&&(c[o]=r[o]);return W.vnode&&W.vnode(u),u}const nr="_app_od0zq_51",ar="_display-pane_od0zq_58",sr="_main-pane_od0zq_69",Jn={app:nr,displayPane:ar,mainPane:sr},ir="_loading_1293z_132",rr="_no-fonts_1293z_222",or="_upload-header_1293z_234",lr="_upload-sub_1293z_239",cr="_upload-icon_1293z_244",ur="_families_1293z_256",hr="_family-settings_1293z_262",dr="_family-header_1293z_272",fr="_family-name_1293z_280",pr="_copy-paste-buttons_1293z_285",gr="_remove-font_1293z_289",mr="_remove-font-family_1293z_289",br="_num-fonts_1293z_293",yr="_single-font-settings_1293z_299",vr="_single-font-header_1293z_310",wr="_single-font-file-size_1293z_316",_r="_single-font-subfamily_1293z_321",xr="_family-settings-body_1293z_325",Sr="_settings-section_1293z_330",kr="_settings-section-body_1293z_359",Tr="_settings-grid_1293z_364",Fr="_single-font-settings-body_1293z_371",Ar="_settings-sub-section_1293z_376",Cr="_checkbox-section_1293z_387",Nr="_checkboxes_1293z_387",Ir="_disabled_1293z_390",Mr="_style-setting_1293z_394",Rr="_style-setting-name_1293z_398",Or="_settings-list_1293z_406",Er="_static-setting_1293z_415",jr="_axis-setting_1293z_419",Pr="_axis-setting-modes_1293z_427",Dr="_spinbox-range_1293z_431",Ur="_label_1293z_437",Lr="_character-sets-header_1293z_448",Br="_header-divider_1293z_454",qr="_character-set_1293z_448",zr="_character-set-header_1293z_469",$r="_character-set-body_1293z_476",Hr="_character-set-name_1293z_480",Vr="_unicode-range-textbox_1293z_484",Wr="_axis-range-textbox_1293z_489",Jr="_invalid_1293z_493",N={loading:ir,noFonts:rr,uploadHeader:or,uploadSub:lr,uploadIcon:cr,families:ur,familySettings:hr,familyHeader:dr,familyName:fr,copyPasteButtons:pr,removeFont:gr,removeFontFamily:mr,numFonts:br,singleFontSettings:yr,singleFontHeader:vr,singleFontFileSize:wr,singleFontSubfamily:_r,familySettingsBody:xr,settingsSection:Sr,settingsSectionBody:kr,settingsGrid:Tr,singleFontSettingsBody:Fr,settingsSubSection:Ar,checkboxSection:Cr,checkboxes:Nr,disabled:Ir,styleSetting:Mr,styleSettingName:Rr,settingsList:Or,staticSetting:Er,axisSetting:jr,axisSettingModes:Pr,spinboxRange:Dr,label:Ur,characterSetsHeader:Lr,headerDivider:Br,characterSet:qr,characterSetHeader:zr,characterSetBody:$r,characterSetName:Hr,unicodeRangeTextbox:Vr,axisRangeTextbox:Wr,invalid:Jr};var ht,Q,Kn,Qa,Kt=0,Ks=[],he=W,es=he.__b,ts=he.__r,ns=he.diffed,as=he.__c,ss=he.unmount,is=he.__;function Dt(e,t){he.__h&&he.__h(Q,e,Kt||t),Kt=0;var n=Q.__H||(Q.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function Gs(e){return Kt=1,Kr(Zs,e)}function Kr(e,t,n){var a=Dt(ht++,2);if(a.t=e,!a.__c&&(a.__=[Zs(void 0,t),function(o){var c=a.__N?a.__N[0]:a.__[0],u=a.t(c,o);c!==u&&(a.__N=[u,a.__[1]],a.__c.setState({}))}],a.__c=Q,!Q.__f)){var s=function(o,c,u){if(!a.__c.__H)return!0;var l=a.__c.__H.__.filter(function(f){return!!f.__c});if(l.every(function(f){return!f.__N}))return!i||i.call(this,o,c,u);var h=a.__c.props!==o;return l.forEach(function(f){if(f.__N){var p=f.__[0];f.__=f.__N,f.__N=void 0,p!==f.__[0]&&(h=!0)}}),i&&i.call(this,o,c,u)||h};Q.__f=!0;var i=Q.shouldComponentUpdate,r=Q.componentWillUpdate;Q.componentWillUpdate=function(o,c,u){if(this.__e){var l=i;i=void 0,s(o,c,u),i=l}r&&r.call(this,o,c,u)},Q.shouldComponentUpdate=s}return a.__N||a.__}function Gt(e,t){var n=Dt(ht++,3);!he.__s&&Sa(n.__H,t)&&(n.__=e,n.u=t,Q.__H.__h.push(n))}function Qt(e,t){var n=Dt(ht++,4);!he.__s&&Sa(n.__H,t)&&(n.__=e,n.u=t,Q.__h.push(n))}function be(e){return Kt=5,Le(function(){return{current:e}},[])}function Le(e,t){var n=Dt(ht++,7);return Sa(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function C(e,t){return Kt=8,Le(function(){return e},t)}function en(e){var t=Q.context[e.__c],n=Dt(ht++,9);return n.c=e,t?(n.__==null&&(n.__=!0,t.sub(Q)),t.props.value):e.__}function Xs(){var e=Dt(ht++,11);if(!e.__){for(var t=Q.__v;t!==null&&!t.__m&&t.__!==null;)t=t.__;var n=t.__m||(t.__m=[0,0]);e.__="P"+n[0]+"-"+n[1]++}return e.__}function Gr(){for(var e;e=Ks.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(pn),e.__H.__h.forEach(ra),e.__H.__h=[]}catch(t){e.__H.__h=[],he.__e(t,e.__v)}}he.__b=function(e){Q=null,es&&es(e)},he.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),is&&is(e,t)},he.__r=function(e){ts&&ts(e),ht=0;var t=(Q=e.__c).__H;t&&(Kn===Q?(t.__h=[],Q.__h=[],t.__.forEach(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(t.__h.forEach(pn),t.__h.forEach(ra),t.__h=[],ht=0)),Kn=Q},he.diffed=function(e){ns&&ns(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(Ks.push(t)!==1&&Qa===he.requestAnimationFrame||((Qa=he.requestAnimationFrame)||Xr)(Gr)),t.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.u=void 0})),Kn=Q=null},he.__c=function(e,t){t.some(function(n){try{n.__h.forEach(pn),n.__h=n.__h.filter(function(a){return!a.__||ra(a)})}catch(a){t.some(function(s){s.__h&&(s.__h=[])}),t=[],he.__e(a,n.__v)}}),as&&as(e,t)},he.unmount=function(e){ss&&ss(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach(function(a){try{pn(a)}catch(s){t=s}}),n.__H=void 0,t&&he.__e(t,n.__v))};var rs=typeof requestAnimationFrame=="function";function Xr(e){var t,n=function(){clearTimeout(a),rs&&cancelAnimationFrame(t),setTimeout(e)},a=setTimeout(n,100);rs&&(t=requestAnimationFrame(n))}function pn(e){var t=Q,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),Q=t}function ra(e){var t=Q;e.__c=e.__(),Q=t}function Sa(e,t){return!e||e.length!==t.length||t.some(function(n,a){return n!==e[a]})}function Zs(e,t){return typeof t=="function"?t(e):t}var Zr=Symbol.for("preact-signals");function On(){if(ct>1)ct--;else{for(var e,t=!1;Vt!==void 0;){var n=Vt;for(Vt=void 0,oa++;n!==void 0;){var a=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&ei(n))try{n.c()}catch(s){t||(e=s,t=!0)}n=a}}if(oa=0,ct--,t)throw e}}function Ys(e){if(ct>0)return e();ct++;try{return e()}finally{On()}}var Z=void 0,Vt=void 0,ct=0,oa=0,vn=0;function Qs(e){if(Z!==void 0){var t=e.n;if(t===void 0||t.t!==Z)return t={i:0,S:e,p:Z.s,n:void 0,t:Z,e:void 0,x:void 0,r:t},Z.s!==void 0&&(Z.s.n=t),Z.s=t,e.n=t,32&Z.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=Z.s,t.n=void 0,Z.s.n=t,Z.s=t),t}}function xe(e){this.v=e,this.i=0,this.n=void 0,this.t=void 0}xe.prototype.brand=Zr;xe.prototype.h=function(){return!0};xe.prototype.S=function(e){this.t!==e&&e.e===void 0&&(e.x=this.t,this.t!==void 0&&(this.t.e=e),this.t=e)};xe.prototype.U=function(e){if(this.t!==void 0){var t=e.e,n=e.x;t!==void 0&&(t.x=n,e.e=void 0),n!==void 0&&(n.e=t,e.x=void 0),e===this.t&&(this.t=n)}};xe.prototype.subscribe=function(e){var t=this;return nn(function(){var n=t.value,a=Z;Z=void 0;try{e(n)}finally{Z=a}})};xe.prototype.valueOf=function(){return this.value};xe.prototype.toString=function(){return this.value+""};xe.prototype.toJSON=function(){return this.value};xe.prototype.peek=function(){var e=Z;Z=void 0;try{return this.value}finally{Z=e}};Object.defineProperty(xe.prototype,"value",{get:function(){var e=Qs(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(oa>100)throw new Error("Cycle detected");this.v=e,this.i++,vn++,ct++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{On()}}}});function I(e){return new xe(e)}function ei(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function ti(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function ni(e){for(var t=e.s,n=void 0;t!==void 0;){var a=t.p;t.i===-1?(t.S.U(t),a!==void 0&&(a.n=t.n),t.n!==void 0&&(t.n.p=a)):n=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=a}e.s=n}function Ut(e){xe.call(this,void 0),this.x=e,this.s=void 0,this.g=vn-1,this.f=4}(Ut.prototype=new xe).h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===vn))return!0;if(this.g=vn,this.f|=1,this.i>0&&!ei(this))return this.f&=-2,!0;var e=Z;try{ti(this),Z=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return Z=e,ni(this),this.f&=-2,!0};Ut.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}xe.prototype.S.call(this,e)};Ut.prototype.U=function(e){if(this.t!==void 0&&(xe.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}};Ut.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}};Object.defineProperty(Ut.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var e=Qs(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function Et(e){return new Ut(e)}function ai(e){var t=e.u;if(e.u=void 0,typeof t=="function"){ct++;var n=Z;Z=void 0;try{t()}catch(a){throw e.f&=-2,e.f|=8,ka(e),a}finally{Z=n,On()}}}function ka(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,ai(e)}function Yr(e){if(Z!==this)throw new Error("Out-of-order effect");ni(this),Z=e,this.f&=-2,8&this.f&&ka(this),On()}function tn(e){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}tn.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t=="function"&&(this.u=t)}finally{e()}};tn.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,ai(this),ti(this),ct++;var e=Z;return Z=this,Yr.bind(this,e)};tn.prototype.N=function(){2&this.f||(this.f|=2,this.o=Vt,Vt=this)};tn.prototype.d=function(){this.f|=8,1&this.f||ka(this)};function nn(e){var t=new tn(e);try{t.c()}catch(n){throw t.d(),n}return t.d.bind(t)}var si,En,Gn,ii=[];nn(function(){si=this.N})();function Lt(e,t){W[e]=t.bind(null,W[e]||function(){})}function wn(e){Gn&&Gn(),Gn=e&&e.S()}function ri(e){var t=this,n=e.data,a=Ge(n);a.value=n;var s=Le(function(){for(var o=t,c=t.__v;c=c.__;)if(c.__c){c.__c.__$f|=4;break}var u=Et(function(){var p=a.value.value;return p===0?0:p===!0?"":p||""}),l=Et(function(){return!Array.isArray(u.value)&&!Ps(u.value)}),h=nn(function(){if(this.N=oi,l.value){var p=u.value;o.__v&&o.__v.__e&&o.__v.__e.nodeType===3&&(o.__v.__e.data=p)}}),f=t.__$u.d;return t.__$u.d=function(){h(),f.call(this)},[l,u]},[]),i=s[0],r=s[1];return i.value?r.peek():r.value}ri.displayName="_st";Object.defineProperties(xe.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:ri},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});Lt("__b",function(e,t){if(typeof t.type=="string"){var n,a=t.props;for(var s in a)if(s!=="children"){var i=a[s];i instanceof xe&&(n||(t.__np=n={}),n[s]=i,a[s]=i.peek())}}e(t)});Lt("__r",function(e,t){wn();var n,a=t.__c;a&&(a.__$f&=-2,(n=a.__$u)===void 0&&(a.__$u=n=function(s){var i;return nn(function(){i=this}),i.c=function(){a.__$f|=1,a.setState({})},i}())),En=a,wn(n),e(t)});Lt("__e",function(e,t,n,a){wn(),En=void 0,e(t,n,a)});Lt("diffed",function(e,t){wn(),En=void 0;var n;if(typeof t.type=="string"&&(n=t.__e)){var a=t.__np,s=t.props;if(a){var i=n.U;if(i)for(var r in i){var o=i[r];o!==void 0&&!(r in a)&&(o.d(),i[r]=void 0)}else i={},n.U=i;for(var c in a){var u=i[c],l=a[c];u===void 0?(u=Qr(n,c,l,s),i[c]=u):u.o(l,s)}}}e(t)});function Qr(e,t,n,a){var s=t in e&&e.ownerSVGElement===void 0,i=I(n);return{o:function(r,o){i.value=r,a=o},d:nn(function(){this.N=oi;var r=i.value.value;a[t]!==r&&(a[t]=r,s?e[t]=r:r?e.setAttribute(t,r):e.removeAttribute(t))})}}Lt("unmount",function(e,t){if(typeof t.type=="string"){var n=t.__e;if(n){var a=n.U;if(a){n.U=void 0;for(var s in a){var i=a[s];i&&i.d()}}}}else{var r=t.__c;if(r){var o=r.__$u;o&&(r.__$u=void 0,o.d())}}e(t)});Lt("__h",function(e,t,n,a){(a<3||a===9)&&(t.__$f|=2),e(t,n,a)});Ht.prototype.shouldComponentUpdate=function(e,t){var n=this.__$u,a=n&&n.s!==void 0;for(var s in t)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){var i=2&this.__$f;if(!(a||i||4&this.__$f)||1&this.__$f)return!0}else if(!(a||4&this.__$f)||3&this.__$f)return!0;for(var r in e)if(r!=="__source"&&e[r]!==this.props[r])return!0;for(var o in this.props)if(!(o in e))return!0;return!1};function Ge(e){return Le(function(){return I(e)},[])}function Ta(e){var t=be(e);return t.current=e,En.__$f|=4,Le(function(){return Et(function(){return t.current()})},[])}var eo=function(e){queueMicrotask(function(){queueMicrotask(e)})};function to(){Ys(function(){for(var e;e=ii.shift();)si.call(e)})}function oi(){ii.push(this)===1&&(W.requestAnimationFrame||eo)(to)}function li(e){var t,n,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(t=0;t<s;t++)e[t]&&(n=li(e[t]))&&(a&&(a+=" "),a+=n)}else for(n in e)e[n]&&(a&&(a+=" "),a+=n);return a}function te(){for(var e,t,n=0,a="",s=arguments.length;n<s;n++)(e=arguments[n])&&(t=li(e))&&(a&&(a+=" "),a+=t);return a}const ci=typeof Worker<"u"?Worker:void 0;class ui{constructor(t,n){this.sentMessageId=0,this.inflightRequests=0,this.deferClose=!1,this.worker=t,this.map=n}send(t,n,a){const s=this.sentMessageId++,i=this.worker,r={type:t,message:n,id:s};return i.postMessage(r,a),this.inflightRequests++,new Promise((o,c)=>{const u=new AbortController;i.addEventListener("message",l=>{const h=l.data;h.originId===s&&(this.inflightRequests--,this.inflightRequests===0&&this.deferClose&&this.worker.terminate(),h.type===this.map[t]?(u.abort(),o(h.message)):h.type==="error"&&(u.abort(),c(h.message)))},{signal:u.signal})})}sendAndForget(t,n,a){const s=this.sentMessageId++,i=this.worker,r={type:t,message:n,id:s};i.postMessage(r,a)}close(){this.inflightRequests===0?this.worker.terminate():this.deferClose=!0}}class no{constructor(){this.state={destroyed:!1},this.fontWorker=new ui(new ci(new URL("/assets/font-worker.worker-BbtQK1Xj.js",import.meta.url),{type:"module"}),{"update-fonts":"updated-fonts","subset-font":"subsetted-font","get-font-data":"got-font-data"}),this.fontFinalizationRegistry=new FinalizationRegistry(t=>{this.fontWorker.sendAndForget("update-fonts",{loadFonts:[],unloadFonts:[t]})})}async loadFonts(t,n=!0){if(this.state.destroyed)throw new DOMException("This GlyphtContext has been destroyed","InvalidStateError");return(await this.fontWorker.send("update-fonts",{loadFonts:t,unloadFonts:[]},n?t.map(a=>a.buffer):void 0)).fonts.map(a=>this.hydrateFont(a))}hydrateFont(t){const n=this.fontFinalizationRegistry,a=this.fontWorker,s=this.state,i=t.id;return t.destroy=async()=>{if(s.destroyed)return;const r=a.send("update-fonts",{loadFonts:[],unloadFonts:[i]});n.unregister(t),await r},n.register(t,i,t),t.subset=async r=>{if(s.destroyed)throw new DOMException("This font's GlyphtContext has been destroyed","InvalidStateError");if(r===null){const{data:o,format:c}=await a.send("get-font-data",i);return{familyName:t.familyName,subfamilyName:t.subfamilyName,format:c,data:o,styleValues:t.styleValues,axes:t.axes.map(u=>({type:"variable",tag:u.tag,name:u.name,value:{min:u.min,max:u.max,defaultValue:u.defaultValue}})),namedInstance:null,unicodeRanges:t.unicodeRanges}}return await a.send("subset-font",{font:i,settings:r})},t}destroy(){this.fontWorker.close(),this.state.destroyed=!0}}const ao=17,Fa=e=>{const t=e.trim().split(/(?:,\s*)|(?:\s+)/);if(t.length===1&&t[0].length===0)return[];const n=[];for(const a of t){if(a.length>ao)return null;if(a.length===0)continue;const s=/^(?:u\+)?([0-9a-f]{1,6})(?:-(?:u\+)?([0-9a-f]{1,6}))?$/i.exec(a);if(!s){const r=/^(?:u\+)?([\da-f]{0,6})(\?{1,5})$/i.exec(a);if(!r)return null;const[,o,c]=r;if(o.length+c.length>6)return null;const u=o+"0".repeat(c.length),l=o+"f".repeat(c.length),h=Math.min(parseInt(u,16),1114111),f=Math.min(parseInt(l,16),1114111);if(!Number.isFinite(h)||!Number.isFinite(f))return null;n.push([h,f]);continue}const i=parseInt(s[1],16);if(!Number.isFinite(i))return null;if(typeof s[2]=="string"){const r=parseInt(s[2],16);if(!Number.isFinite(r))return null;n.push([i,r])}else n.push(i)}return n},hi=e=>{const t=e.trim().split(/,\s*/);if(t.length===1&&t[0].length===0)return[];const n=[];for(const a of t){if(a.length===0)continue;const s=/(-?\d+(?:\.\d+)?)(?:-(-?\d+(?:\.\d+)?))?/.exec(a);if(!s)return null;const i=Number(s[1]);if(!Number.isFinite(i))return null;if(typeof s[2]=="string"){const r=Number(s[2]);if(!Number.isFinite(r))return null;n.push([i,r])}else n.push(i)}return n},so=e=>{const t=[];for(let n=0;n<e.length;n++){const a=e[n];typeof a=="number"?t.push(`U+${a.toString(16)}`):t.push(`U+${a[0].toString(16)}-${a[1].toString(16)}`)}return t};var q;(function(e){e[e.Whitespace=0]="Whitespace",e[e.DefinitionKeyword=1]="DefinitionKeyword",e[e.OperatorKeyword=2]="OperatorKeyword",e[e.Keyword=3]="Keyword",e[e.PropertyName=4]="PropertyName",e[e.Paren=5]="Paren",e[e.Brace=6]="Brace",e[e.Punctuation=7]="Punctuation",e[e.String=8]="String",e[e.Number=9]="Number",e[e.Separator=10]="Separator"})(q||(q={}));class io{constructor(t="  "){this.indent=0,this.listIndent=0,this.textLength=0,this.spans=[],this.indentString=t}pushSpan(t,n){this.spans.length>0&&this.spans[this.spans.length-1].type===n?this.spans[this.spans.length-1].text+=t:t.length>0&&this.spans.push({text:t,type:n}),this.textLength+=t.length}pushIndent(){this.pushSpan(this.indentString.repeat(this.indent),q.Whitespace)}pushSpace(){this.pushSpan(" ",q.Whitespace)}pushNewline(){this.pushSpan(`
`,q.Whitespace)}pushString(t){const n=t.includes('"'),a=n?t.replace(/(\\|'|\n)/g,"\\$1"):t.replace(/(\\|\n)/g,"\\$1");this.pushSpan(n?`'${a}'`:`"${a}"`,q.String)}atRule(t){this.pushSpan(t,q.DefinitionKeyword),this.pushSpace(),this.pushSpan("{",q.Brace),this.indent++,this.pushNewline()}endRule(){this.indent--,this.pushSpan("}",q.Brace),this.pushNewline(),this.pushNewline()}declaration(t){this.pushIndent(),this.pushSpan(t,q.PropertyName),this.pushSpan(":",q.Punctuation),this.pushSpace()}indentedList(){this.listIndent++,this.indent++,this.pushNewline(),this.pushIndent()}endIndentedList(){this.listIndent--,this.indent--}endDeclaration(){this.spans[this.spans.length-1].type===q.Whitespace&&this.spans.pop(),this.pushSpan(";",q.Separator),this.pushNewline()}keyword(t){this.pushSpan(t,q.Keyword),this.pushSpace()}number(t){this.pushSpan(String(t),q.Number),this.pushSpace()}string(t){this.pushString(t),this.pushSpace()}parenthesized(t){this.pushSpan(t,q.OperatorKeyword),this.pushSpan("(",q.Paren)}endParenthesized(){this.spans[this.spans.length-1].type===q.Whitespace&&this.spans.pop(),this.pushSpan(")",q.Paren),this.pushSpace()}comma(){this.spans[this.spans.length-1].type===q.Whitespace&&this.spans.pop(),this.pushSpan(",",q.Separator),this.listIndent>0?(this.pushNewline(),this.pushIndent()):this.pushSpace()}getString(){let t="";for(const n of this.spans)t+=n.text;return t}}const la=(e,t)=>e.type==="single"&&t.type==="single"?e.value===t.value:e.type==="variable"&&t.type==="variable"?e.value.min===t.value.min&&e.value.max===t.value.max&&e.value.defaultValue===t.value.defaultValue:!1,ro=e=>{const t={};for(const s of e)Object.prototype.hasOwnProperty.call(t,s.familyName)?t[s.familyName].push(s):t[s.familyName]=[s];const n=(s,i)=>{if(s.tag!==i.tag)throw new Error(`Tried to union two different axes (${s.tag}, ${i.tag})`);return{tag:s.tag,name:s.name??i.name,min:Math.min(s.min,i.min),defaultValue:s.defaultValue,max:Math.max(s.max,i.max)}},a=[];for(const[s,i]of Object.entries(t)){const r=[];let o=null;const c=new Map,u=new Map,l=new Set,h=new Map;for(const y of i){const v={};if(o===null)o=Object.assign({},y.styleValues);else for(const m of["weight","width","italic","slant"])if(Object.prototype.hasOwnProperty.call(o,m)){if(!la(o[m],y.styleValues[m])){for(const b of r)b.uniqueStyleValues[m]=o[m];delete o[m],v[m]=y.styleValues[m]}}else v[m]=y.styleValues[m];r.push({font:y,uniqueStyleValues:v});for(const m of y.axes){const b=u.get(m.tag);b?u.set(m.tag,n(m,b)):u.set(m.tag,Object.assign({},m))}for(const m of y.subsetCoverage)m.covered&&l.add(m.name);for(const m of y.features)h.has(m.tag)||h.set(m.tag,m);for(const m of y.namedInstances)for(const[b,w]of Object.entries(m.coords)){let _=c.get(b);_||(_=new Set,c.set(b,_)),_.add(w)}}const f={};for(const[y,v]of c){const m=Array.from(v);y==="slnt"?m.sort((b,w)=>w-b):m.sort((b,w)=>b-w),f[y]=m}const p=Array.from(l.values());p.sort((y,v)=>y.localeCompare(v));const g=[];for(const y of r)g.push({font:y.font,styleValues:y.uniqueStyleValues});g.sort((y,v)=>{const m=E=>{const U=y.styleValues[E]??o[E],B=v.styleValues[E]??o[E],de=U.type==="variable"?U.value.defaultValue:U.value,H=B.type==="variable"?B.value.defaultValue:B.value;return[de,H]},[b,w]=m("width");if(b!==w)return b-w;const[_,S]=m("weight");if(_!==S)return _-S;const[x,A]=m("italic");if(x!==A)return x-A;const[F,T]=m("slant");return F!==T?T-F:y.font.subfamilyName.localeCompare(v.font.subfamilyName)}),a.push({name:s,fonts:g,styleValues:o,axes:Array.from(u.values()),axisInstanceValues:f,features:Array.from(h.values()),namedSubsets:p})}return a},oo=e=>{if(e.length===0)return[];const t=[],n=[];for(let a=0;a<e.length;a++)t.push(0);e:for(;;){const a=[];for(let s=0;s<e.length;s++){const i=e[s];switch(i.type){case"single":case"variable":{a.push(i);break}case"multiple":{const r=i.value.ranges[t[s]];if(typeof r=="number")a.push({type:"single",tag:i.tag,value:r});else{if(typeof r>"u")throw new Error("Empty instanced range");a.push({type:"variable",tag:i.tag,value:{min:r[0],defaultValue:i.value.defaultValue,max:r[1]}})}break}}}n.push(a);for(let s=0;s<t.length;s++){const i=e[s],r=i.type==="multiple"?i.value.ranges.length:1;if(t[s]++,t[s]>=r){if(t[s]=0,s===t.length-1)break e}else break}}return n},lo=["Thin","Hairline","Extra(?:\\s|-)?Light","Ultra(?:\\s|-)?Light","Light","Normal","Regular","Book","Medium","Semi(?:\\s|-)?Bold","Demi(?:\\s|-)?Bold","Bold","Extra(?:\\s|-)?Bold","Ultra(?:\\s|-)?Bold","Black","Heavy","Extra(?:\\s|-)?Black","Ultra(?:\\s|-)?Black","Italic","Oblique","Ultra(?:\\s|-)?(?:Condensed|Narrow)","Extra(?:\\s|-)?(?:Condensed|Narrow)","(?:Condensed|Narrow)","Semi(?:\\s|-)?(?:Condensed|Narrow)","Semi(?:\\s|-)?(?:Expanded|Narrow)","Expanded","Extra(?:\\s|-)?Expanded","Ultra(?:\\s|-)?Expanded"],co=new RegExp(`(?:${lo.join("|")}\\s*)+$`,"g"),uo=new Map([[100,"Thin"],[200,"ExtraLight"],[300,"Light"],[400,"Regular"],[500,"Medium"],[600,"SemiBold"],[700,"Bold"],[800,"ExtraBold"],[900,"Black"],[950,"ExtraBlack"]]),ho=new Map([[50,"UltraCondensed"],[62.5,"ExtraCondensed"],[75,"Condensed"],[87.5,"SemiCondensed"],[100,"Normal"],[112.5,"SemiExpanded"],[125,"Expanded"],[150,"ExtraExpanded"],[200,"UltraExpanded"]]),fo=e=>{const t=new Map,n=a=>{switch(a){case"weight":return"wght";case"width":return"wdth";case"italic":return"ital";case"slant":return"slnt"}};for(const a of e)for(const s of a.fonts){if(!a.enableSubsetting){t.set(s.font.id,[null]);continue}const i=[];for(const[l,h]of Object.entries(a.axes))i.push({tag:l,...h});for(const[l,h]of Object.entries(a.styleValues))i.push({tag:n(l),...h});if(s.styleValues)for(const[l,h]of Object.entries(s.styleValues))i.push({tag:n(l),...h});let r=[];const o=a.includeCharacters;if(o==="all")r=["all"];else{const l=Array.isArray(o)?o:[o];for(const h of l){let f=h.name??null,p;if(typeof h.includeUnicodeRanges=="string"){if(p=Fa(h.includeUnicodeRanges),!p)throw new Error(`Invalid Unicode ranges: ${h.includeUnicodeRanges}`)}else p=h.includeUnicodeRanges??[];(f===""||f===null)&&(p.length||(f=h.includeNamedSubsets.join("-"))),r.push({named:h.includeNamedSubsets,custom:p,charsetName:f})}}const c=oo(i),u=[];for(const l of c)for(let h=0;h<r.length;h++){const f=r[h];u.push({axisValues:l,features:a.features??{},unicodeRanges:f,charsetNameOrIndex:r.length===1?null:typeof f!="string"&&f.charsetName!==null?f.charsetName:h,preprocess:c.length*r.length>1})}t.set(s.font.id,u)}return t},po=e=>{const t=new Map,n=new Map;for(const a of e){let s=n.get(a.familyName);s||(s={axes:new Map,styleValues:{}},n.set(a.familyName,s));const{axes:i,styleValues:r}=s;let o=t.get(a.familyName);o||(o={varyingAxes:new Set,varyingStyleValues:{weight:!1,width:!1,italic:!1,slant:!1}},t.set(a.familyName,o));const{varyingAxes:c}=o;for(const u of a.axes){const l=i.get(u.tag);l?la(l,u)||c.add(u.tag):i.set(u.tag,u)}for(const u of["italic","slant","weight","width"]){const l=a.styleValues[u];if(!((u==="italic"||u==="slant")&&l.type==="single"&&l.value===0)){if(!r[u]){r[u]=l;continue}la(r[u],l)||(o.varyingStyleValues[u]=!0,r[u]=l)}}}return t},go=e=>{const t=po(e.map(a=>a.font)),n=new Map;for(const{font:a,charsetNameOrIndex:s,overrideName:i}of e){const r=t.get(a.familyName);n.set(a,mo(a,r.varyingAxes,r.varyingStyleValues,s,i))}return n},ne=e=>Math.round(e*1e3)/1e3,mo=(e,t,n,a,s)=>{const{weight:i,width:r,italic:o,slant:c}=e.styleValues;let l=(s??e.familyName.replace(co,"").replaceAll(" ","")).replaceAll(" ","");if(e.namedInstance&&e.namedInstance.subfamilyName)l+=`-${e.namedInstance.subfamilyName.replaceAll(" ","-")}`;else{if(r.type==="single"){const f=Math.round(r.value*2)/2;f!==100&&(l+=`-${ho.get(f)??f}`)}else n.width&&(l+=`-wdth${ne(r.value.min)}_${ne(r.value.max)}`);i.type==="single"?l+=`-${uo.get(ne(i.value))??ne(i.value)}`:n.weight&&(l+=`-wght${ne(i.value.min)}_${ne(i.value.max)}`);for(const f of e.axes)t.has(f.tag)&&(f.type==="single"?l+=`-${f.tag}${ne(f.value)}`:l+=`-${f.tag}${ne(f.value.min)}_${ne(f.value.max)}`);let h="";c.type==="variable"?n.slant&&(h=`slnt${ne(c.value.min)}_${ne(c.value.max)}`):o.type==="variable"?n.italic&&(h=`ital${ne(o.value.min)}_${ne(o.value.max)}`):n.italic||n.slant?(n.italic&&(h+=`ital${ne(o.value)}`),n.slant&&(h+=`slnt${ne(c.value)}`)):o.value!==0?h="Italic":c.value!==0&&(h="Oblique"),h.length>0&&(l+=`-${h}`)}return typeof a=="string"?l+=`-${a}`:typeof a=="number"&&(l+=`-charset${a}`),l=l.replace(/[\x00-\x1f\x80-\x9f/\\?<>:*|"]/g,"_"),l},Aa=(e,t,n)=>{const a=new io;t.length>0&&!t.endsWith("/")&&(t+="/");for(const{font:s,data:i,filename:r,charsetNameOrIndex:o,overrideName:c}of e){a.atRule("@font-face"),a.declaration("font-family"),a.string(c??s.familyName),a.endDeclaration(),a.declaration("font-display"),a.keyword("swap"),a.endDeclaration(),a.declaration("font-style");const{width:u,weight:l,italic:h,slant:f}=s.styleValues;f.type==="variable"?(a.keyword("oblique"),a.number(`${-ne(f.value.min)}deg`),a.number(`${-ne(f.value.max)}deg`)):h.type==="variable"?(a.keyword("oblique"),a.number("0deg"),a.number("14deg")):h.value!==0&&Math.abs(f.value+9.4)<1e-4?a.keyword("italic"):f.value!==0?(a.keyword("oblique"),a.number(`${-ne(f.value)}deg`)):a.keyword("normal"),a.endDeclaration(),a.declaration("font-weight"),l.type==="variable"?(a.number(ne(l.value.min)),a.number(ne(l.value.max))):a.number(ne(l.value)),a.endDeclaration(),a.declaration("font-stretch"),u.type==="variable"?(a.number(ne(u.value.min)),a.number(ne(u.value.max))):a.number(ne(u.value)),a.endDeclaration(),a.declaration("src");const p=Number(i.opentype!==null&&n)+ +(i.woff!==null)+ +(i.woff2!==null);if(p>1&&a.indentedList(),p===1&&i.opentype&&!n)throw new Error("includeUncompressed is false, but there is no compressed font file to include instead");for(const g of["woff2","woff","opentype"])if(!(g==="opentype"&&!n)&&i[g]){a.parenthesized("url");let y=g;g==="opentype"&&(y=s.format==="opentype"?"otf":"ttf"),a.string(t+r+"."+y),a.endParenthesized(),a.parenthesized("format"),a.string(g==="opentype"?s.format:g),a.endParenthesized(),a.comma()}if(a.spans.pop(),a.spans.pop(),p>1&&a.endIndentedList(),a.endDeclaration(),o!==null){a.declaration("unicode-range");const g=so(s.unicodeRanges);for(let y=0;y<g.length;y++)a.number(g[y]),y!==g.length-1&&a.comma();a.endDeclaration()}a.endRule()}return a},bo=async(e,t,{formats:n,woffCompression:a=15,woff2Compression:s=11,onProgress:i})=>{const r=[],o=fo(t);for(const v of t)for(const m of v.fonts){const b=o.get(m.font.id);for(const w of b)r.push({font:m.font,overrideName:v.overrideName,settings:w})}const c=1,u=await(e==null?void 0:e.getParallelism())??1,l=2*a/Math.min(u,r.length),h=32/Math.min(u,r.length);let f=0;for(const v of r)v.settings&&(f+=c);n.woff&&(f+=l*r.length),n.woff2&&(f+=h*r.length);let p=0;i==null||i(0);let g=!1;const y=r.map(async({font:v,overrideName:m,settings:b})=>{const w=await v.subset(b);if(g)throw new Error("Aborted");const _={opentype:n.ttf?w.data:null,woff:null,woff2:null};p+=c,i==null||i(p/f);const S=[];if((n.woff||n.woff2)&&e===null)throw new Error("woff or woff2 formats enabled but no compression context provided");return n.woff&&S.push(e.compressFromTTF(w.data,"woff",a).then(x=>{if(g)throw new Error("Aborted");p+=l,i==null||i(p/f),_.woff=x})),n.woff2&&S.push(e.compressFromTTF(w.data,"woff2",s).then(x=>{if(g)throw new Error("Aborted");p+=h,i==null||i(p/f),_.woff2=x})),S.length>0&&await Promise.all(S),{font:w,overrideName:m,filename:"",data:_,charsetNameOrIndex:b?b.charsetNameOrIndex:null,extension:x=>x==="opentype"?w.format==="opentype"?"otf":"ttf":x}});return Promise.all(y).then(v=>{const m=go(v);for(const b of v){const w=m.get(b.font);b.filename=w}return v},v=>{throw g=!0,v})},yo="modulepreload",vo=function(e){return"/"+e},os={},_n=function(t,n,a){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),o=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=Promise.allSettled(n.map(c=>{if(c=vo(c),c in os)return;os[c]=!0;const u=c.endsWith(".css"),l=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${l}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":yo,u||(h.as="script"),h.crossOrigin="",h.href=c,o&&h.setAttribute("nonce",o),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(r){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r}return s.then(r=>{for(const o of r||[])o.status==="rejected"&&i(o.reason);return t().catch(i)})};let wt=null;const wo=async()=>{if(wt!==null)return wt;if(wt=2,typeof navigator=="object"&&typeof navigator.hardwareConcurrency=="number")wt=navigator.hardwareConcurrency;else try{const e=await _n(()=>import("./__vite-browser-external-BIHI7g3E.js"),[]);typeof e.availableParallelism=="function"?wt=e.availableParallelism():typeof e.cpus=="function"&&(wt=e.cpus().length)}catch{}return wt},_o=async e=>{let t,n;if(typeof e=="string")try{t=new URL(e)}catch{n=e}else t=e;if(t)try{t.protocol==="file:"&&(n=(await _n(async()=>{const{fileURLToPath:a}=await import("./__vite-browser-external-BIHI7g3E.js");return{fileURLToPath:a}},[])).fileURLToPath(t))}catch{}if(n){let a;try{a=await _n(()=>import("./__vite-browser-external-BIHI7g3E.js"),[])}catch{}if(a){const s=await a.readFile(n);return new Uint8Array(s.buffer,s.byteOffset,s.byteLength)}}if(!t)throw new Error(`Your runtime does not support any loading strategy for ${e}.`);return new Uint8Array(await(await fetch(t)).arrayBuffer())},xo=(e,t)=>{let n=0;for(let a=0;a<e.length;a++){const s=e[a];t(s)&&(e[n]=s,n++)}e.length=n};class So{constructor(t){this.queuedOperations=[],this.backpressureCallbacks=[],this.workers=t,this.allWorkers=t.slice(0)}doWork(){for(;this.workers.length>0&&this.queuedOperations.length>0;){const t=this.queuedOperations.pop(),n=this.workers.pop();xo(this.backpressureCallbacks,({n:s,cb:i})=>this.queuedOperations.length<=s?(i(),!1):!0);const a=()=>{this.workers.push(n),queueMicrotask(()=>{this.doWork()})};t.fn(n).then(s=>{a(),t.resolve(s)},s=>{a(),t.reject(s)})}}enqueue(t){let n,a;const s=new Promise((i,r)=>{n=i,a=r});return this.queuedOperations.push({resolve:n,reject:a,fn:t}),this.doWork(),s}destroy(){for(const t of this.allWorkers)t.close();this.allWorkers.length=0}backpressure(t){return this.queuedOperations.length<=t?Promise.resolve():new Promise(n=>{this.backpressureCallbacks.push({n:t,cb:n})})}}class jn{constructor(t){this.destroyed=!1;const n=t??wo();this.parallelism=n,this.pool=(async()=>{const a=[new URL("/assets/woff1-B3aYjtk8.wasm",import.meta.url),new URL("/assets/woff2-koKwhiIF.wasm",import.meta.url)],[s,i]=await Promise.all(a.map(o=>_o(o))),r=[];for(let o=0,c=await n;o<c;o++){const u=new ci(new URL("/assets/compression-worker.worker-tEYl9LaX.js",import.meta.url),{type:"module"}),l=new ui(u,{"compress-font":"compressed-font","decompress-font":"decompressed-font"});l.sendAndForget("init-woff-wasm",{woff1:s,woff2:i}),r.push(l)}return new So(r)})()}async getParallelism(){return await this.parallelism}checkDestroyed(){if(this.destroyed)throw new DOMException("This WoffCompressionContext has been destroyed","InvalidStateError")}async compressFromTTF(t,n,a){return this.checkDestroyed(),await(await this.pool).enqueue(async i=>await i.send("compress-font",{data:t,algorithm:n,quality:a}))}async decompressToTTF(t){this.checkDestroyed();const n=jn.compressionType(t);if(n===null)throw new Error("This font file is not compressed");return await(await this.pool).enqueue(async s=>await s.send("decompress-font",{data:t,algorithm:n}))}static compressionType(t){if(t.length<4)return null;const n=t[3]|t[2]<<8|t[1]<<16|t[0]<<24;return n===2001684038?"woff":n===2001684018?"woff2":null}destroy(){this.pool.then(t=>t.destroy()),this.destroyed=!0}}const ls={aalt:{title:"Access All Alternates",registered:"Adobe",done:!0,description:`Allows the end user to access glyphs which are either not available, or not
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
`,done:!0,state:null,status:null}},cs=new Map,Ca=e=>{const t=cs.get(e);if(t)return t;const n=Object.prototype.hasOwnProperty.call(ls,e)?ls[e]:null;let a;switch(e.slice(0,2)){case"ss":{a=`Stylistic Set ${Number(e.slice(2))}`;break}case"cv":{a=`Character Variant ${Number(e.slice(2))}`;break}default:a=(n==null?void 0:n.title)??null}const s={name:a,description:(n==null?void 0:n.description)??"",required:(n==null?void 0:n.state)==="required"};return cs.set(e,s),s},us=e=>{const t=(a,s)=>{if(Object.prototype.hasOwnProperty.call(s,a.tag)){const i=s[a.tag];if(i.length>0)return i.map(r=>Xn(r)).join(", ")}return`${Xn(a.min)}, ${Xn(a.max)}`},n=(a,s)=>{const i={};for(const[r,o]of Object.entries(a)){let c;switch(o.type){case"single":{c={type:"single",value:o.value};break}case"variable":{const u={weight:"wght",width:"wdth",italic:"ital",slant:"slnt"}[r];c={type:"variable",value:{min:o.value.min,defaultValue:o.value.defaultValue,max:o.value.max,curMin:I(o.value.min),curMax:I(o.value.max),curSingle:I(o.value.defaultValue),curMultiValue:I(u?t({tag:u,...o.value},s):""),mode:I("range")}};break}}i[r]=c}return i};return ro(e).map(a=>{const s={features:[],stylisticSets:[],characterVariants:[]};for(const i of a.features){if(Ca(i.tag).required)continue;const r=/(?:ss|cv)\d{2}/.test(i.tag);(r&&i.tag.slice(0,2)==="ss"?s.stylisticSets:r&&i.tag.slice(0,2)==="cv"?s.characterVariants:s.features).push({feature:i,include:I(i.keepByDefault)})}return{name:a.name,fonts:a.fonts.map(({font:i,styleValues:r})=>({font:i,styleSettings:n(r,a.axisInstanceValues)})),settings:{styleSettings:n(a.styleValues,a.axisInstanceValues),axisSettings:a.axes.map(i=>({tag:i.tag,name:i.name??i.tag,range:{min:i.min,defaultValue:i.defaultValue,max:i.max,curMin:I(i.min),curMax:I(i.max),curSingle:I(i.defaultValue),curMultiValue:I(t(i,a.axisInstanceValues)),mode:I("range")}})),includeFeatures:s,includeCharacters:{includeAllCharacters:I(!1),characterSets:I([{includeNamedSubsets:a.namedSubsets.map(i=>({name:i,include:I(!0)})),includeUnicodeRanges:I(""),name:I("")}])}},enableSubsetting:I(!0)}})},Xn=e=>Math.round(e*1e3)/1e3,Na=e=>({curMin:e.curMin.value,curMax:e.curMax.value,curSingle:e.curSingle.value,curMultiValue:e.curMultiValue.value,mode:e.mode.value}),ko=e=>e.type==="single"?e:{type:"variable",value:Na(e.value)},Ia=e=>{const t={};for(const n of["weight","width","italic","slant"])e[n]&&(t[n]=ko(e[n]));return t},di=e=>{const t=n=>n.map(({feature:a,include:s})=>({tag:a.tag,include:s.value}));return{styleSettings:Ia(e.styleSettings),axisSettings:e.axisSettings.map(({tag:n,name:a,range:s})=>({tag:n,name:a,range:Na(s)})),includeFeatures:{features:t(e.includeFeatures.features),stylisticSets:t(e.includeFeatures.stylisticSets),characterVariants:t(e.includeFeatures.characterVariants)},includeCharacters:{includeAllCharacters:e.includeCharacters.includeAllCharacters.value,characterSets:e.includeCharacters.characterSets.value.map(({includeNamedSubsets:n,includeUnicodeRanges:a,name:s})=>({includeNamedSubsets:n.map(({name:i,include:r})=>({name:i,include:r.value})),includeUnicodeRanges:a.value,name:s.value}))}}},Zn=e=>{const t=[];for(const{font:n,styleSettings:a}of e.fonts)t.push({fontUid:n.uid,styleSettings:Ia(a)});return{name:e.name,fonts:t,settings:di(e.settings),enableSubsetting:e.enableSubsetting.value}},fi=(e,t)=>{e.curMin.value=Math.max(t.curMin,e.min),e.curMax.value=Math.min(t.curMax,e.max),e.curSingle.value=Math.max(e.min,Math.min(t.curSingle,e.max)),e.curMultiValue.value=t.curMultiValue,e.mode.value=t.mode},xn=(e,t)=>{for(const{tag:n,range:a}of t){const s=e.find(({tag:i})=>i===n);s&&fi(s.range,a)}},To=(e,t)=>{e.type!=="single"&&(t.type==="single"?(e.value.curSingle.value=Math.max(e.value.min,Math.min(t.value,e.value.max)),e.value.mode.value="single"):fi(e.value,t.value))},St=(e,t)=>{for(const n of["weight","width","italic","slant"])!e[n]||!t[n]||To(e[n],t[n])},ze=(e,t)=>{for(const{tag:n,include:a}of t){const s=e.find(({feature:i})=>i.tag===n);!s||Ca(s.feature.tag).required||(s.include.value=a)}},Fo=(e,t)=>{for(const{name:n,include:a}of t){const s=e.find(({name:i})=>i===n);s&&(s.include.value=a)}},hs=e=>{const t={includeNamedSubsets:[],includeUnicodeRanges:I(e.includeUnicodeRanges),name:I(e.name??"")};return Fo(t.includeNamedSubsets,e.includeNamedSubsets),t},ca=(e,t)=>{e.includeAllCharacters.value=t.includeAllCharacters,"characterSets"in t?t.characterSets.map(n=>hs(n)):e.characterSets.value=[hs(t)]},pi=(e,t)=>{St(e.styleSettings,t.styleSettings),xn(e.axisSettings,t.axisSettings),ze(e.includeFeatures.features,t.includeFeatures.features),ze(e.includeFeatures.stylisticSets,t.includeFeatures.stylisticSets),ze(e.includeFeatures.characterVariants,t.includeFeatures.characterVariants),ca(e.includeCharacters,t.includeCharacters)},Yn=(e,t)=>{pi(e.settings,t.settings);for(const{font:n,styleSettings:a}of e.fonts){St(a,t.settings.styleSettings);const s=t.fonts.find(({fontUid:i})=>i===n.uid);s&&St(a,s.styleSettings)}e.enableSubsetting.value=t.enableSubsetting},Ao=e=>({settings:di(e.settings),type:"subsetSettingsV1"}),Co=e=>({settings:Ia(e),type:"styleSettingsV1"}),No=e=>({settings:e.map(({tag:t,name:n,range:a})=>({tag:t,name:n,range:Na(a)})),type:"axisSettingsV1"}),Io=e=>({settings:{features:e.features.map(({feature:t,include:n})=>({tag:t.tag,include:n.value})),stylisticSets:e.stylisticSets.map(({feature:t,include:n})=>({tag:t.tag,include:n.value})),characterVariants:e.characterVariants.map(({feature:t,include:n})=>({tag:t.tag,include:n.value}))},type:"featureSettingsV1"}),Mo=e=>({settings:{includeAllCharacters:e.includeAllCharacters.value,characterSets:e.characterSets.value.map(({includeNamedSubsets:t,includeUnicodeRanges:n,name:a})=>({includeNamedSubsets:t.map(({name:s,include:i})=>({name:s,include:i.value})),includeUnicodeRanges:n.value,name:a.value}))},type:"includeCharactersSettingsV2"}),Ro=(e,t)=>{switch(t.type){case"subsetSettingsV1":{pi(e.settings,t.settings);break}case"styleSettingsV1":{St(e.settings.styleSettings,t.settings);for(const n of e.fonts)St(n.styleSettings,t.settings);break}case"axisSettingsV1":{xn(e.settings.axisSettings,t.settings);break}case"featureSettingsV1":{ze(e.settings.includeFeatures.features,t.settings.features),ze(e.settings.includeFeatures.stylisticSets,t.settings.stylisticSets),ze(e.settings.includeFeatures.characterVariants,t.settings.characterVariants);break}}},Oo=(e,t)=>{switch(t.type){case"subsetSettingsV1":{St(e,t.settings.styleSettings);break}case"styleSettingsV1":{St(e,t.settings);break}}},Eo=(e,t)=>{switch(t.type){case"subsetSettingsV1":{xn(e,t.settings.axisSettings);break}case"axisSettingsV1":{xn(e,t.settings);break}}},jo=(e,t)=>{switch(t.type){case"subsetSettingsV1":{ze(e.features,t.settings.includeFeatures.features),ze(e.stylisticSets,t.settings.includeFeatures.stylisticSets),ze(e.characterVariants,t.settings.includeFeatures.characterVariants);break}case"featureSettingsV1":{ze(e.features,t.settings.features),ze(e.stylisticSets,t.settings.stylisticSets),ze(e.characterVariants,t.settings.characterVariants);break}}},Po=(e,t)=>{switch(t.type){case"subsetSettingsV1":{ca(e,t.settings.includeCharacters);break}case"includeCharactersSettingsV1":case"includeCharactersSettingsV2":{ca(e,t.settings);break}}},ds=new jn,Do=new no;class Uo{constructor(){this.fonts=I([]),this.loadedFamilies=Et(()=>new Set(this.fonts.value.map(t=>t.name))),this.fontsBeingLoaded=I(0),this._exportedFonts=I({state:"not_loaded"}),this.exportedFonts=Et(()=>this._exportedFonts.value),this.exportSettings={formats:{ttf:I(!0),woff:I(!1),woff2:I(!0)},woffCompression:I(1),woff2Compression:I(11),includeTTFinCSS:I(!0)},this.cssPathPrefix=I(""),this.googleFontsModalState={open:I(!1),state:I({state:"not_loaded"}),searchValue:I(""),previewedFamily:I(null),customPreviewText:I(""),searchFilters:{monospace:I(!0),proportional:I(!0),sansSerif:I(!0),serif:I(!0),noClassification:I(!0),display:I(!0),handwriting:I(!0),symbols:I(!0)}}}async removeFontFamily(t){this.fonts.value=this.fonts.value.filter(n=>n!==t),await Promise.all(t.fonts.map(({font:n})=>n.destroy()))}async removeFont(t){const n=this.fonts.peek().findIndex(o=>o.fonts.some(c=>c.font.id===t.id));if(n===-1)return;const a=this.fonts.peek()[n],s=[];for(const o of a.fonts)o.font.id!==t.id&&s.push(o.font);if(s.length===0)return await this.removeFontFamily(a);const i=this.fonts.peek().slice(0),r=us(s);for(const o of r)Yn(o,Zn(a));return i.splice(n,1,...r),this.fonts.value=i,await t.destroy()}async addFonts(t){this.fontsBeingLoaded.value+=t.length;try{const n=await Promise.all(t.map(l=>l.arrayBuffer().then(h=>new Uint8Array(h)))),a=[];for(let l=0;l<n.length;l++)jn.compressionType(n[l])!==null&&a.push(ds.decompressToTTF(n[l]).then(f=>{n[l]=f}));a.length>0&&await Promise.all(a);const s=await Do.loadFonts(n),i=this.fonts.peek().flatMap(l=>l.fonts.map(h=>h.font)),r=new Set(i.map(l=>l.uid)),o=[];for(const l of s)r.has(l.uid)?o.push(l):i.push(l);const c=new Map;for(const l of this.fonts.peek())c.set(l.name,Zn(l));const u=us(i);for(const l of u){const h=c.get(l.name);h&&Yn(l,h)}this.fonts.value=u,o.length>0&&await Promise.all(o.map(l=>l.destroy()))}finally{this.fontsBeingLoaded.value-=t.length}}addCharacterSet(t){const{characterSets:n}=t.settings.includeCharacters,s={includeNamedSubsets:n.value[0].includeNamedSubsets.map(({name:i})=>({name:i,include:I(!1)})),includeUnicodeRanges:I(""),name:I("")};n.value=[...n.value,s]}removeCharacterSet(t,n){const{characterSets:a}=t.settings.includeCharacters;a.value=a.value.filter(s=>s!==n)}exportFonts(){const t=i=>{switch(i.mode.value){case"single":return{type:"single",value:i.curSingle.value};case"range":return{type:"variable",value:{min:i.curMin.value,max:i.curMax.value,defaultValue:i.defaultValue}};case"multiple":{const r=hi(i.curMultiValue.value);return r?{type:"multiple",value:{ranges:r,defaultValue:i.defaultValue}}:{type:"single",value:i.defaultValue}}}},n=i=>{const r={};for(const[o,c]of Object.entries(i))r[o]=c.type==="single"?c:t(c.value);return r},a=this.fonts.peek().map(i=>{const r=i.fonts.map(({font:l,styleSettings:h})=>({font:l,styleValues:n(h)}));if(!i.enableSubsetting.value)return{fonts:r,enableSubsetting:!1};const o={};for(const l of i.settings.axisSettings)o[l.tag]=t(l.range);const c={};for(const l of[i.settings.includeFeatures.characterVariants,i.settings.includeFeatures.stylisticSets,i.settings.includeFeatures.features])for(const h of l)c[h.feature.tag]=h.include.value;const u=i.settings.includeCharacters.includeAllCharacters.value?"all":i.settings.includeCharacters.characterSets.value.map(l=>{const h=[];for(const f of l.includeNamedSubsets)f.include.value&&h.push(f.name);return{includeNamedSubsets:h,includeUnicodeRanges:Fa(l.includeUnicodeRanges.value)??[],name:l.name.value||void 0}});return{fonts:r,enableSubsetting:!0,styleValues:n(i.settings.styleSettings),axes:o,features:c,includeCharacters:u}}),s={ttf:this.exportSettings.formats.ttf.peek(),woff:this.exportSettings.formats.woff.peek(),woff2:this.exportSettings.formats.woff2.peek()};return bo(ds,a,{formats:s,woffCompression:this.exportSettings.woffCompression.value,woff2Compression:this.exportSettings.woff2Compression.value,onProgress:i=>{this._exportedFonts.value={state:"loading",progress:i}}}).then(i=>{this._exportedFonts.value={state:"loaded",exportedFonts:i,exportedFormats:s}},i=>{this._exportedFonts.value={state:"error",error:i}})}saveAllSettings(){return{familySettings:this.fonts.value.map(n=>Zn(n)),cssPathPrefix:this.cssPathPrefix.value,exportSettings:{formats:{ttf:this.exportSettings.formats.ttf.value,woff:this.exportSettings.formats.woff.value,woff2:this.exportSettings.formats.woff2.value},woffCompression:this.exportSettings.woffCompression.value,woff2Compression:this.exportSettings.woff2Compression.value,includeTTFinCSS:this.exportSettings.includeTTFinCSS.value},type:"AllSettingsV1"}}loadAllSettings(t){var a,s,i,r,o,c;if(typeof t!="object"||t===null||!("type"in t)||t.type!=="AllSettingsV1")return;const n=t;if(n.familySettings){const u=new Map;for(const l of n.familySettings)u.set(l.name,l);for(const l of this.fonts.value){const h=u.get(l.name);h&&Yn(l,h)}}n.cssPathPrefix&&(this.cssPathPrefix.value=n.cssPathPrefix),(a=n.exportSettings)!=null&&a.formats.ttf&&(this.exportSettings.formats.ttf.value=n.exportSettings.formats.ttf),(s=n.exportSettings)!=null&&s.formats.woff&&(this.exportSettings.formats.woff.value=n.exportSettings.formats.woff),(i=n.exportSettings)!=null&&i.formats.woff2&&(this.exportSettings.formats.woff2.value=n.exportSettings.formats.woff2),(r=n.exportSettings)!=null&&r.woffCompression&&(this.exportSettings.woffCompression.value=n.exportSettings.woffCompression),(o=n.exportSettings)!=null&&o.woff2Compression&&(this.exportSettings.woff2Compression.value=n.exportSettings.woff2Compression),(c=n.exportSettings)!=null&&c.includeTTFinCSS&&(this.exportSettings.includeTTFinCSS.value=n.exportSettings.includeTTFinCSS)}}const gi=xa(void 0),Ze=()=>{const e=en(gi);if(!e)throw new Error("No AppState provided");return e},Lo=()=>new Uo,Bo="_select-wrapper_tfdos_225",qo="_select_tfdos_225",zo="_spinbox-wrapper_tfdos_249",$o="_spinbox-display_tfdos_276",Ho="_spinbox-field_tfdos_276",Vo="_spinbox-buttons_tfdos_299",Wo="_spinbox-button_tfdos_299",Jo="_spinbox-button-divider_tfdos_320",Ko="_spinbox-up_tfdos_325",Go="_spinbox-down_tfdos_325",Xo="_icon-button_tfdos_342",Zo="_toggle-icon_tfdos_355",Yo="_toggledOn_tfdos_355",Qo="_button-contents_tfdos_359",el="_checkbox-toggle_tfdos_366",tl="_disabled_tfdos_370",nl="_button_tfdos_359",al="_small_tfdos_443",sl="_collapsible-header-title_tfdos_448",il="_collapsible-header-title-text_tfdos_456",rl="_searchable-dropdown-wrapper_tfdos_460",ol="_searchable-dropdown-button_tfdos_464",ll="_open_tfdos_495",cl="_searchable-dropdown-button-text_tfdos_499",ul="_searchable-dropdown-arrow_tfdos_508",hl="_searchable-dropdown-panel_tfdos_512",dl="_searchable-dropdown-search_tfdos_523",fl="_searchable-dropdown-search-input_tfdos_530",pl="_searchable-dropdown-options_tfdos_558",gl="_searchable-dropdown-option_tfdos_558",ml="_searchable-dropdown-checkbox_tfdos_575",bl="_searchable-dropdown-option-text_tfdos_581",yl="_searchable-dropdown-no-results_tfdos_586",P={selectWrapper:Bo,select:qo,spinboxWrapper:zo,spinboxDisplay:$o,spinboxField:Ho,spinboxButtons:Vo,spinboxButton:Wo,spinboxButtonDivider:Jo,spinboxUp:Ko,spinboxDown:Go,iconButton:Xo,toggleIcon:Zo,toggledOn:Yo,buttonContents:Qo,checkboxToggle:el,disabled:tl,button:nl,small:al,collapsibleHeaderTitle:sl,collapsibleHeaderTitleText:il,searchableDropdownWrapper:rl,searchableDropdownButton:ol,open:ll,searchableDropdownButtonText:cl,searchableDropdownArrow:ul,searchableDropdownPanel:hl,searchableDropdownSearch:dl,searchableDropdownSearchInput:fl,searchableDropdownOptions:pl,searchableDropdownOption:gl,searchableDropdownCheckbox:ml,searchableDropdownOptionText:bl,searchableDropdownNoResults:yl},vl="_slider_783jt_51",wl={slider:vl},_l="_icon_bdlwt_51",xl="_motif-monochrome_bdlwt_58",Sl="_motif-primary_bdlwt_61",kl="_motif-success_bdlwt_64",Tl="_motif-warning_bdlwt_67",Fl="_motif-error_bdlwt_70",Al="_clickable_bdlwt_73",Cl="_disabled_bdlwt_84",Nl="_icon-button_bdlwt_92",Il="_no-pointer_bdlwt_136",Ml="_arrow-right_bdlwt_140",Rl="_arrow-up_bdlwt_144",Ol="_arrow-left_bdlwt_148",El="_arrow-down_bdlwt_152",jl="_check_bdlwt_163",Pl="_close_bdlwt_167",Dl="_copy_bdlwt_171",Ul="_download_bdlwt_175",Ll="_error_bdlwt_179",Bl="_funnel_bdlwt_183",ql="_gear_bdlwt_187",zl="_github_bdlwt_191",$l="_globe_bdlwt_195",Hl="_paste_bdlwt_199",Vl="_pin_bdlwt_203",Wl="_plus_bdlwt_207",Jl="_range_bdlwt_211",Kl="_reset_bdlwt_215",Gl="_stack_bdlwt_219",Xl="_upload_bdlwt_223",Zl="_warning_bdlwt_227",Te={icon:_l,"motif-monochrome":"_motif-monochrome_bdlwt_58",motifMonochrome:xl,"motif-primary":"_motif-primary_bdlwt_61",motifPrimary:Sl,"motif-success":"_motif-success_bdlwt_64",motifSuccess:kl,"motif-warning":"_motif-warning_bdlwt_67",motifWarning:Tl,"motif-error":"_motif-error_bdlwt_70",motifError:Fl,clickable:Al,disabled:Cl,"icon-button":"_icon-button_bdlwt_92",iconButton:Nl,"no-pointer":"_no-pointer_bdlwt_136",noPointer:Il,"arrow-right":"_arrow-right_bdlwt_140",arrowRight:Ml,"arrow-up":"_arrow-up_bdlwt_144",arrowUp:Rl,"arrow-left":"_arrow-left_bdlwt_148",arrowLeft:Ol,"arrow-down":"_arrow-down_bdlwt_152",arrowDown:El,check:jl,close:Pl,copy:Dl,download:Ul,error:Ll,funnel:Bl,gear:ql,github:zl,globe:$l,paste:Hl,pin:Vl,plus:Wl,range:Jl,reset:Kl,stack:Gl,upload:Xl,warning:Zl};var re=(e=>(e[e.PRIMARY=0]="PRIMARY",e[e.SUCCESS=1]="SUCCESS",e[e.WARNING=2]="WARNING",e[e.ERROR=3]="ERROR",e[e.MONOCHROME=4]="MONOCHROME",e))(re||{});const Ee=({type:e,title:t,size:n,motif:a,className:s,noPointer:i,clickableStyle:r})=>{const o=typeof n=="string"?n:typeof n=="number"?`${n}px`:void 0,c=o?{width:o,height:o}:void 0;return d("div",{className:te(Te.icon,Te[e],{[Te.motifPrimary]:a===re.PRIMARY,[Te.motifSuccess]:a===re.SUCCESS,[Te.motifWarning]:a===re.WARNING,[Te.motifError]:a===re.ERROR,[Te.motifMonochrome]:a===re.MONOCHROME,[Te.noPointer]:i,[Te.clickable]:r},s),style:c,title:t??void 0})},$e=({type:e,title:t,size:n,onClick:a,disabled:s,motif:i,className:r})=>d("button",{className:te(Te.iconButton,{[Te.disabled]:s,[Te.motifPrimary]:i===re.PRIMARY,[Te.motifSuccess]:i===re.SUCCESS,[Te.motifWarning]:i===re.WARNING,[Te.motifError]:i===re.ERROR,[Te.motifMonochrome]:i===re.MONOCHROME},r),onClick:s?void 0:a,title:t,disabled:s,tabIndex:0,children:d(Ee,{type:e,title:null,size:n,motif:i,noPointer:!0})}),jt=Math.min,Ue=Math.max,Sn=Math.round,cn=Math.floor,Ke=e=>({x:e,y:e}),Yl={left:"right",right:"left",bottom:"top",top:"bottom"},Ql={start:"end",end:"start"};function fs(e,t,n){return Ue(e,jt(t,n))}function an(e,t){return typeof e=="function"?e(t):e}function dt(e){return e.split("-")[0]}function sn(e){return e.split("-")[1]}function mi(e){return e==="x"?"y":"x"}function bi(e){return e==="y"?"height":"width"}function kt(e){return["top","bottom"].includes(dt(e))?"y":"x"}function yi(e){return mi(kt(e))}function ec(e,t,n){n===void 0&&(n=!1);const a=sn(e),s=yi(e),i=bi(s);let r=s==="x"?a===(n?"end":"start")?"right":"left":a==="start"?"bottom":"top";return t.reference[i]>t.floating[i]&&(r=kn(r)),[r,kn(r)]}function tc(e){const t=kn(e);return[ua(e),t,ua(t)]}function ua(e){return e.replace(/start|end/g,t=>Ql[t])}function nc(e,t,n){const a=["left","right"],s=["right","left"],i=["top","bottom"],r=["bottom","top"];switch(e){case"top":case"bottom":return n?t?s:a:t?a:s;case"left":case"right":return t?i:r;default:return[]}}function ac(e,t,n,a){const s=sn(e);let i=nc(dt(e),n==="start",a);return s&&(i=i.map(r=>r+"-"+s),t&&(i=i.concat(i.map(ua)))),i}function kn(e){return e.replace(/left|right|bottom|top/g,t=>Yl[t])}function sc(e){return{top:0,right:0,bottom:0,left:0,...e}}function ic(e){return typeof e!="number"?sc(e):{top:e,right:e,bottom:e,left:e}}function Tn(e){const{x:t,y:n,width:a,height:s}=e;return{width:a,height:s,top:n,left:t,right:t+a,bottom:n+s,x:t,y:n}}function ps(e,t,n){let{reference:a,floating:s}=e;const i=kt(t),r=yi(t),o=bi(r),c=dt(t),u=i==="y",l=a.x+a.width/2-s.width/2,h=a.y+a.height/2-s.height/2,f=a[o]/2-s[o]/2;let p;switch(c){case"top":p={x:l,y:a.y-s.height};break;case"bottom":p={x:l,y:a.y+a.height};break;case"right":p={x:a.x+a.width,y:h};break;case"left":p={x:a.x-s.width,y:h};break;default:p={x:a.x,y:a.y}}switch(sn(t)){case"start":p[r]-=f*(n&&u?-1:1);break;case"end":p[r]+=f*(n&&u?-1:1);break}return p}const rc=async(e,t,n)=>{const{placement:a="bottom",strategy:s="absolute",middleware:i=[],platform:r}=n,o=i.filter(Boolean),c=await(r.isRTL==null?void 0:r.isRTL(t));let u=await r.getElementRects({reference:e,floating:t,strategy:s}),{x:l,y:h}=ps(u,a,c),f=a,p={},g=0;for(let y=0;y<o.length;y++){const{name:v,fn:m}=o[y],{x:b,y:w,data:_,reset:S}=await m({x:l,y:h,initialPlacement:a,placement:f,strategy:s,middlewareData:p,rects:u,platform:r,elements:{reference:e,floating:t}});l=b??l,h=w??h,p={...p,[v]:{...p[v],..._}},S&&g<=50&&(g++,typeof S=="object"&&(S.placement&&(f=S.placement),S.rects&&(u=S.rects===!0?await r.getElementRects({reference:e,floating:t,strategy:s}):S.rects),{x:l,y:h}=ps(u,f,c)),y=-1)}return{x:l,y:h,placement:f,strategy:s,middlewareData:p}};async function Ma(e,t){var n;t===void 0&&(t={});const{x:a,y:s,platform:i,rects:r,elements:o,strategy:c}=e,{boundary:u="clippingAncestors",rootBoundary:l="viewport",elementContext:h="floating",altBoundary:f=!1,padding:p=0}=an(t,e),g=ic(p),v=o[f?h==="floating"?"reference":"floating":h],m=Tn(await i.getClippingRect({element:(n=await(i.isElement==null?void 0:i.isElement(v)))==null||n?v:v.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:u,rootBoundary:l,strategy:c})),b=h==="floating"?{x:a,y:s,width:r.floating.width,height:r.floating.height}:r.reference,w=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),_=await(i.isElement==null?void 0:i.isElement(w))?await(i.getScale==null?void 0:i.getScale(w))||{x:1,y:1}:{x:1,y:1},S=Tn(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:b,offsetParent:w,strategy:c}):b);return{top:(m.top-S.top+g.top)/_.y,bottom:(S.bottom-m.bottom+g.bottom)/_.y,left:(m.left-S.left+g.left)/_.x,right:(S.right-m.right+g.right)/_.x}}const oc=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n,a;const{placement:s,middlewareData:i,rects:r,initialPlacement:o,platform:c,elements:u}=t,{mainAxis:l=!0,crossAxis:h=!0,fallbackPlacements:f,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:y=!0,...v}=an(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};const m=dt(s),b=kt(o),w=dt(o)===o,_=await(c.isRTL==null?void 0:c.isRTL(u.floating)),S=f||(w||!y?[kn(o)]:tc(o)),x=g!=="none";!f&&x&&S.push(...ac(o,y,g,_));const A=[o,...S],F=await Ma(t,v),T=[];let E=((a=i.flip)==null?void 0:a.overflows)||[];if(l&&T.push(F[m]),h){const H=ec(s,r,_);T.push(F[H[0]],F[H[1]])}if(E=[...E,{placement:s,overflows:T}],!T.every(H=>H<=0)){var U,B;const H=(((U=i.flip)==null?void 0:U.index)||0)+1,ge=A[H];if(ge)return{data:{index:H,overflows:E},reset:{placement:ge}};let ae=(B=E.filter(z=>z.overflows[0]<=0).sort((z,se)=>z.overflows[1]-se.overflows[1])[0])==null?void 0:B.placement;if(!ae)switch(p){case"bestFit":{var de;const z=(de=E.filter(se=>{if(x){const oe=kt(se.placement);return oe===b||oe==="y"}return!0}).map(se=>[se.placement,se.overflows.filter(oe=>oe>0).reduce((oe,Qe)=>oe+Qe,0)]).sort((se,oe)=>se[1]-oe[1])[0])==null?void 0:de[0];z&&(ae=z);break}case"initialPlacement":ae=o;break}if(s!==ae)return{reset:{placement:ae}}}return{}}}};async function lc(e,t){const{placement:n,platform:a,elements:s}=e,i=await(a.isRTL==null?void 0:a.isRTL(s.floating)),r=dt(n),o=sn(n),c=kt(n)==="y",u=["left","top"].includes(r)?-1:1,l=i&&c?-1:1,h=an(t,e);let{mainAxis:f,crossAxis:p,alignmentAxis:g}=typeof h=="number"?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:h.mainAxis||0,crossAxis:h.crossAxis||0,alignmentAxis:h.alignmentAxis};return o&&typeof g=="number"&&(p=o==="end"?g*-1:g),c?{x:p*l,y:f*u}:{x:f*u,y:p*l}}const cc=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var n,a;const{x:s,y:i,placement:r,middlewareData:o}=t,c=await lc(t,e);return r===((n=o.offset)==null?void 0:n.placement)&&(a=o.arrow)!=null&&a.alignmentOffset?{}:{x:s+c.x,y:i+c.y,data:{...c,placement:r}}}}},uc=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:a,placement:s}=t,{mainAxis:i=!0,crossAxis:r=!1,limiter:o={fn:v=>{let{x:m,y:b}=v;return{x:m,y:b}}},...c}=an(e,t),u={x:n,y:a},l=await Ma(t,c),h=kt(dt(s)),f=mi(h);let p=u[f],g=u[h];if(i){const v=f==="y"?"top":"left",m=f==="y"?"bottom":"right",b=p+l[v],w=p-l[m];p=fs(b,p,w)}if(r){const v=h==="y"?"top":"left",m=h==="y"?"bottom":"right",b=g+l[v],w=g-l[m];g=fs(b,g,w)}const y=o.fn({...t,[f]:p,[h]:g});return{...y,data:{x:y.x-n,y:y.y-a,enabled:{[f]:i,[h]:r}}}}}},hc=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var n,a;const{placement:s,rects:i,platform:r,elements:o}=t,{apply:c=()=>{},...u}=an(e,t),l=await Ma(t,u),h=dt(s),f=sn(s),p=kt(s)==="y",{width:g,height:y}=i.floating;let v,m;h==="top"||h==="bottom"?(v=h,m=f===(await(r.isRTL==null?void 0:r.isRTL(o.floating))?"start":"end")?"left":"right"):(m=h,v=f==="end"?"top":"bottom");const b=y-l.top-l.bottom,w=g-l.left-l.right,_=jt(y-l[v],b),S=jt(g-l[m],w),x=!t.middlewareData.shift;let A=_,F=S;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(F=w),(a=t.middlewareData.shift)!=null&&a.enabled.y&&(A=b),x&&!f){const E=Ue(l.left,0),U=Ue(l.right,0),B=Ue(l.top,0),de=Ue(l.bottom,0);p?F=g-2*(E!==0||U!==0?E+U:Ue(l.left,l.right)):A=y-2*(B!==0||de!==0?B+de:Ue(l.top,l.bottom))}await c({...t,availableWidth:F,availableHeight:A});const T=await r.getDimensions(o.floating);return g!==T.width||y!==T.height?{reset:{rects:!0}}:{}}}};function Pn(){return typeof window<"u"}function Bt(e){return vi(e)?(e.nodeName||"").toLowerCase():"#document"}function Be(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function Ye(e){var t;return(t=(vi(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function vi(e){return Pn()?e instanceof Node||e instanceof Be(e).Node:!1}function He(e){return Pn()?e instanceof Element||e instanceof Be(e).Element:!1}function Xe(e){return Pn()?e instanceof HTMLElement||e instanceof Be(e).HTMLElement:!1}function gs(e){return!Pn()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof Be(e).ShadowRoot}function rn(e){const{overflow:t,overflowX:n,overflowY:a,display:s}=Ve(e);return/auto|scroll|overlay|hidden|clip/.test(t+a+n)&&!["inline","contents"].includes(s)}function dc(e){return["table","td","th"].includes(Bt(e))}function Dn(e){return[":popover-open",":modal"].some(t=>{try{return e.matches(t)}catch{return!1}})}function Ra(e){const t=Oa(),n=He(e)?Ve(e):e;return["transform","translate","scale","rotate","perspective"].some(a=>n[a]?n[a]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!t&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!t&&(n.filter?n.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(a=>(n.willChange||"").includes(a))||["paint","layout","strict","content"].some(a=>(n.contain||"").includes(a))}function fc(e){let t=ft(e);for(;Xe(t)&&!Pt(t);){if(Ra(t))return t;if(Dn(t))return null;t=ft(t)}return null}function Oa(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Pt(e){return["html","body","#document"].includes(Bt(e))}function Ve(e){return Be(e).getComputedStyle(e)}function Un(e){return He(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function ft(e){if(Bt(e)==="html")return e;const t=e.assignedSlot||e.parentNode||gs(e)&&e.host||Ye(e);return gs(t)?t.host:t}function wi(e){const t=ft(e);return Pt(t)?e.ownerDocument?e.ownerDocument.body:e.body:Xe(t)&&rn(t)?t:wi(t)}function Xt(e,t,n){var a;t===void 0&&(t=[]),n===void 0&&(n=!0);const s=wi(e),i=s===((a=e.ownerDocument)==null?void 0:a.body),r=Be(s);if(i){const o=ha(r);return t.concat(r,r.visualViewport||[],rn(s)?s:[],o&&n?Xt(o):[])}return t.concat(s,Xt(s,[],n))}function ha(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function _i(e){const t=Ve(e);let n=parseFloat(t.width)||0,a=parseFloat(t.height)||0;const s=Xe(e),i=s?e.offsetWidth:n,r=s?e.offsetHeight:a,o=Sn(n)!==i||Sn(a)!==r;return o&&(n=i,a=r),{width:n,height:a,$:o}}function Ea(e){return He(e)?e:e.contextElement}function Mt(e){const t=Ea(e);if(!Xe(t))return Ke(1);const n=t.getBoundingClientRect(),{width:a,height:s,$:i}=_i(t);let r=(i?Sn(n.width):n.width)/a,o=(i?Sn(n.height):n.height)/s;return(!r||!Number.isFinite(r))&&(r=1),(!o||!Number.isFinite(o))&&(o=1),{x:r,y:o}}const pc=Ke(0);function xi(e){const t=Be(e);return!Oa()||!t.visualViewport?pc:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function gc(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==Be(e)?!1:t}function Tt(e,t,n,a){t===void 0&&(t=!1),n===void 0&&(n=!1);const s=e.getBoundingClientRect(),i=Ea(e);let r=Ke(1);t&&(a?He(a)&&(r=Mt(a)):r=Mt(e));const o=gc(i,n,a)?xi(i):Ke(0);let c=(s.left+o.x)/r.x,u=(s.top+o.y)/r.y,l=s.width/r.x,h=s.height/r.y;if(i){const f=Be(i),p=a&&He(a)?Be(a):a;let g=f,y=ha(g);for(;y&&a&&p!==g;){const v=Mt(y),m=y.getBoundingClientRect(),b=Ve(y),w=m.left+(y.clientLeft+parseFloat(b.paddingLeft))*v.x,_=m.top+(y.clientTop+parseFloat(b.paddingTop))*v.y;c*=v.x,u*=v.y,l*=v.x,h*=v.y,c+=w,u+=_,g=Be(y),y=ha(g)}}return Tn({width:l,height:h,x:c,y:u})}function ja(e,t){const n=Un(e).scrollLeft;return t?t.left+n:Tt(Ye(e)).left+n}function Si(e,t,n){n===void 0&&(n=!1);const a=e.getBoundingClientRect(),s=a.left+t.scrollLeft-(n?0:ja(e,a)),i=a.top+t.scrollTop;return{x:s,y:i}}function mc(e){let{elements:t,rect:n,offsetParent:a,strategy:s}=e;const i=s==="fixed",r=Ye(a),o=t?Dn(t.floating):!1;if(a===r||o&&i)return n;let c={scrollLeft:0,scrollTop:0},u=Ke(1);const l=Ke(0),h=Xe(a);if((h||!h&&!i)&&((Bt(a)!=="body"||rn(r))&&(c=Un(a)),Xe(a))){const p=Tt(a);u=Mt(a),l.x=p.x+a.clientLeft,l.y=p.y+a.clientTop}const f=r&&!h&&!i?Si(r,c,!0):Ke(0);return{width:n.width*u.x,height:n.height*u.y,x:n.x*u.x-c.scrollLeft*u.x+l.x+f.x,y:n.y*u.y-c.scrollTop*u.y+l.y+f.y}}function bc(e){return Array.from(e.getClientRects())}function yc(e){const t=Ye(e),n=Un(e),a=e.ownerDocument.body,s=Ue(t.scrollWidth,t.clientWidth,a.scrollWidth,a.clientWidth),i=Ue(t.scrollHeight,t.clientHeight,a.scrollHeight,a.clientHeight);let r=-n.scrollLeft+ja(e);const o=-n.scrollTop;return Ve(a).direction==="rtl"&&(r+=Ue(t.clientWidth,a.clientWidth)-s),{width:s,height:i,x:r,y:o}}function vc(e,t){const n=Be(e),a=Ye(e),s=n.visualViewport;let i=a.clientWidth,r=a.clientHeight,o=0,c=0;if(s){i=s.width,r=s.height;const u=Oa();(!u||u&&t==="fixed")&&(o=s.offsetLeft,c=s.offsetTop)}return{width:i,height:r,x:o,y:c}}function wc(e,t){const n=Tt(e,!0,t==="fixed"),a=n.top+e.clientTop,s=n.left+e.clientLeft,i=Xe(e)?Mt(e):Ke(1),r=e.clientWidth*i.x,o=e.clientHeight*i.y,c=s*i.x,u=a*i.y;return{width:r,height:o,x:c,y:u}}function ms(e,t,n){let a;if(t==="viewport")a=vc(e,n);else if(t==="document")a=yc(Ye(e));else if(He(t))a=wc(t,n);else{const s=xi(e);a={x:t.x-s.x,y:t.y-s.y,width:t.width,height:t.height}}return Tn(a)}function ki(e,t){const n=ft(e);return n===t||!He(n)||Pt(n)?!1:Ve(n).position==="fixed"||ki(n,t)}function _c(e,t){const n=t.get(e);if(n)return n;let a=Xt(e,[],!1).filter(o=>He(o)&&Bt(o)!=="body"),s=null;const i=Ve(e).position==="fixed";let r=i?ft(e):e;for(;He(r)&&!Pt(r);){const o=Ve(r),c=Ra(r);!c&&o.position==="fixed"&&(s=null),(i?!c&&!s:!c&&o.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||rn(r)&&!c&&ki(e,r))?a=a.filter(l=>l!==r):s=o,r=ft(r)}return t.set(e,a),a}function xc(e){let{element:t,boundary:n,rootBoundary:a,strategy:s}=e;const r=[...n==="clippingAncestors"?Dn(t)?[]:_c(t,this._c):[].concat(n),a],o=r[0],c=r.reduce((u,l)=>{const h=ms(t,l,s);return u.top=Ue(h.top,u.top),u.right=jt(h.right,u.right),u.bottom=jt(h.bottom,u.bottom),u.left=Ue(h.left,u.left),u},ms(t,o,s));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Sc(e){const{width:t,height:n}=_i(e);return{width:t,height:n}}function kc(e,t,n){const a=Xe(t),s=Ye(t),i=n==="fixed",r=Tt(e,!0,i,t);let o={scrollLeft:0,scrollTop:0};const c=Ke(0);if(a||!a&&!i)if((Bt(t)!=="body"||rn(s))&&(o=Un(t)),a){const f=Tt(t,!0,i,t);c.x=f.x+t.clientLeft,c.y=f.y+t.clientTop}else s&&(c.x=ja(s));const u=s&&!a&&!i?Si(s,o):Ke(0),l=r.left+o.scrollLeft-c.x-u.x,h=r.top+o.scrollTop-c.y-u.y;return{x:l,y:h,width:r.width,height:r.height}}function Qn(e){return Ve(e).position==="static"}function bs(e,t){if(!Xe(e)||Ve(e).position==="fixed")return null;if(t)return t(e);let n=e.offsetParent;return Ye(e)===n&&(n=n.ownerDocument.body),n}function Ti(e,t){const n=Be(e);if(Dn(e))return n;if(!Xe(e)){let s=ft(e);for(;s&&!Pt(s);){if(He(s)&&!Qn(s))return s;s=ft(s)}return n}let a=bs(e,t);for(;a&&dc(a)&&Qn(a);)a=bs(a,t);return a&&Pt(a)&&Qn(a)&&!Ra(a)?n:a||fc(e)||n}const Tc=async function(e){const t=this.getOffsetParent||Ti,n=this.getDimensions,a=await n(e.floating);return{reference:kc(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:a.width,height:a.height}}};function Fc(e){return Ve(e).direction==="rtl"}const Ac={convertOffsetParentRelativeRectToViewportRelativeRect:mc,getDocumentElement:Ye,getClippingRect:xc,getOffsetParent:Ti,getElementRects:Tc,getClientRects:bc,getDimensions:Sc,getScale:Mt,isElement:He,isRTL:Fc};function Fi(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Cc(e,t){let n=null,a;const s=Ye(e);function i(){var o;clearTimeout(a),(o=n)==null||o.disconnect(),n=null}function r(o,c){o===void 0&&(o=!1),c===void 0&&(c=1),i();const u=e.getBoundingClientRect(),{left:l,top:h,width:f,height:p}=u;if(o||t(),!f||!p)return;const g=cn(h),y=cn(s.clientWidth-(l+f)),v=cn(s.clientHeight-(h+p)),m=cn(l),w={rootMargin:-g+"px "+-y+"px "+-v+"px "+-m+"px",threshold:Ue(0,jt(1,c))||1};let _=!0;function S(x){const A=x[0].intersectionRatio;if(A!==c){if(!_)return r();A?r(!1,A):a=setTimeout(()=>{r(!1,1e-7)},1e3)}A===1&&!Fi(u,e.getBoundingClientRect())&&r(),_=!1}try{n=new IntersectionObserver(S,{...w,root:s.ownerDocument})}catch{n=new IntersectionObserver(S,w)}n.observe(e)}return r(!0),i}function ys(e,t,n,a){a===void 0&&(a={});const{ancestorScroll:s=!0,ancestorResize:i=!0,elementResize:r=typeof ResizeObserver=="function",layoutShift:o=typeof IntersectionObserver=="function",animationFrame:c=!1}=a,u=Ea(e),l=s||i?[...u?Xt(u):[],...Xt(t)]:[];l.forEach(m=>{s&&m.addEventListener("scroll",n,{passive:!0}),i&&m.addEventListener("resize",n)});const h=u&&o?Cc(u,n):null;let f=-1,p=null;r&&(p=new ResizeObserver(m=>{let[b]=m;b&&b.target===u&&p&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var w;(w=p)==null||w.observe(t)})),n()}),u&&!c&&p.observe(u),p.observe(t));let g,y=c?Tt(e):null;c&&v();function v(){const m=Tt(e);y&&!Fi(y,m)&&n(),y=m,g=requestAnimationFrame(v)}return n(),()=>{var m;l.forEach(b=>{s&&b.removeEventListener("scroll",n),i&&b.removeEventListener("resize",n)}),h==null||h(),(m=p)==null||m.disconnect(),p=null,c&&cancelAnimationFrame(g)}}const Ai=cc,Ci=uc,Ni=oc,Ii=hc,Nc=(e,t,n)=>{const a=new Map,s={platform:Ac,...n},i={...s.platform,_c:a};return rc(e,t,{...s,platform:i})},Mi=e=>{const t=be(()=>{}),n=be(null),a=C(o=>{n.current=o,t.current(),s.current!==null&&o!==null&&(t.current=ys(o,s.current,r))},[]),s=be(null),i=C(o=>{s.current=o,t.current(),o!==null&&n.current!==null&&(t.current=ys(n.current,o,r))},[]),r=C(()=>{if(!n.current||!s.current)return;const o=s.current;Nc(n.current,s.current,e==null?void 0:e()).then(({x:c,y:u})=>{o.style.left=`${c}px`,o.style.top=`${u}px`})},[]);return Qt(()=>()=>t.current(),[]),{reference:a,floating:i}},Ri=(e,t)=>e>t?1:e<t?-1:0,da=1/0,ea=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),vs="eexxaacctt",Ic=new RegExp("\\p{P}","gu"),Mc="A-Z",Rc="a-z",Oc=["en",{numeric:!0,sensitivity:"base"}],Ct=(e,t,n)=>e.replace(Mc,t).replace(Rc,n),ws={unicode:!1,alpha:null,interSplit:"[^A-Za-z\\d']+",intraSplit:"[a-z][A-Z]",interBound:"[^A-Za-z\\d]",intraBound:"[A-Za-z]\\d|\\d[A-Za-z]|[a-z][A-Z]",interLft:0,interRgt:0,interChars:".",interIns:da,intraChars:"[a-z\\d']",intraIns:null,intraContr:"'[a-z]{1,2}\\b",intraMode:0,intraSlice:[1,da],intraSub:null,intraTrn:null,intraDel:null,intraFilt:(e,t,n)=>!0,toUpper:e=>e.toLocaleUpperCase(),toLower:e=>e.toLocaleLowerCase(),compare:null,sort:(e,t,n,a=Ri)=>{let{idx:s,chars:i,terms:r,interLft2:o,interLft1:c,start:u,intraIns:l,interIns:h,cases:f}=e;return s.map((p,g)=>g).sort((p,g)=>i[g]-i[p]||l[p]-l[g]||r[g]+o[g]+.5*c[g]-(r[p]+o[p]+.5*c[p])||h[p]-h[g]||u[p]-u[g]||f[g]-f[p]||a(t[s[p]],t[s[g]]))}},ta=(e,t)=>t==0?"":t==1?e+"??":t==da?e+"*?":e+`{0,${t}}?`,_s="(?:\\b|_)";function Ln(e){e=Object.assign({},ws,e);let{unicode:t,interLft:n,interRgt:a,intraMode:s,intraSlice:i,intraIns:r,intraSub:o,intraTrn:c,intraDel:u,intraContr:l,intraSplit:h,interSplit:f,intraBound:p,interBound:g,intraChars:y,toUpper:v,toLower:m,compare:b}=e;r??(r=s),o??(o=s),c??(c=s),u??(u=s),b??(b=typeof Intl>"u"?Ri:new Intl.Collator(...Oc).compare);let w=e.letters??e.alpha;if(w!=null){let k=v(w),O=m(w);f=Ct(f,k,O),h=Ct(h,k,O),g=Ct(g,k,O),p=Ct(p,k,O),y=Ct(y,k,O),l=Ct(l,k,O)}let _=t?"u":"";const S='".+?"',x=new RegExp(S,"gi"+_),A=new RegExp(`(?:\\s+|^)-(?:${y}+|${S})`,"gi"+_);let{intraRules:F}=e;F==null&&(F=k=>{let O=ws.intraSlice,$=0,G=0,R=0,j=0;if(/[^\d]/.test(k)){let K=k.length;K<=4?K>=3&&(R=Math.min(c,1),K==4&&($=Math.min(r,1))):(O=i,$=r,G=o,R=c,j=u)}return{intraSlice:O,intraIns:$,intraSub:G,intraTrn:R,intraDel:j}});let T=!!h,E=new RegExp(h,"g"+_),U=new RegExp(f,"g"+_),B=new RegExp("^"+f+"|"+f+"$","g"+_),de=new RegExp(l,"gi"+_);const H=(k,O=!1)=>{let $=[];k=k.replace(x,R=>($.push(R),vs)),k=k.replace(B,""),O||(k=m(k)),T&&(k=k.replace(E,R=>R[0]+" "+R[1]));let G=0;return k.split(U).filter(R=>R!="").map(R=>R===vs?$[G++]:R)},ge=/[^\d]+|\d+/g,ae=(k,O=0,$=!1)=>{let G=H(k);if(G.length==0)return[];let R=Array(G.length).fill("");G=G.map((fe,Se)=>fe.replace(de,_e=>(R[Se]=_e,"")));let j;if(s==1)j=G.map((fe,Se)=>{if(fe[0]==='"')return ea(fe.slice(1,-1));let _e="";for(let ve of fe.matchAll(ge)){let M=ve[0],{intraSlice:J,intraIns:Y,intraSub:D,intraTrn:X,intraDel:V}=F(M);if(Y+D+X+V==0)_e+=M+R[Se];else{let[Ce,ke]=J,Ne=M.slice(0,Ce),it=M.slice(ke),we=M.slice(Ce,ke);Y==1&&Ne.length==1&&Ne!=we[0]&&(Ne+="(?!"+Ne+")");let gt=we.length,rt=[M];if(D)for(let ie=0;ie<gt;ie++)rt.push(Ne+we.slice(0,ie)+y+we.slice(ie+1)+it);if(X)for(let ie=0;ie<gt-1;ie++)we[ie]!=we[ie+1]&&rt.push(Ne+we.slice(0,ie)+we[ie+1]+we[ie]+we.slice(ie+2)+it);if(V)for(let ie=0;ie<gt;ie++)rt.push(Ne+we.slice(0,ie+1)+"?"+we.slice(ie+1)+it);if(Y){let ie=ta(y,1);for(let mt=0;mt<gt;mt++)rt.push(Ne+we.slice(0,mt)+ie+we.slice(mt)+it)}_e+="(?:"+rt.join("|")+")"+R[Se]}}return _e});else{let fe=ta(y,r);O==2&&r>0&&(fe=")("+fe+")("),j=G.map((Se,_e)=>Se[0]==='"'?ea(Se.slice(1,-1)):Se.split("").map((ve,M,J)=>(r==1&&M==0&&J.length>1&&ve!=J[M+1]&&(ve+="(?!"+ve+")"),ve)).join(fe)+R[_e])}let K=n==2?_s:"",Fe=a==2?_s:"",Ae=Fe+ta(e.interChars,e.interIns)+K;return O>0?$?j=K+"("+j.join(")"+Fe+"|"+K+"(")+")"+Fe:(j="("+j.join(")("+Ae+")(")+")",j="(.??"+K+")"+j+"("+Fe+".*)"):(j=j.join(Ae),j=K+j+Fe),[new RegExp(j,"i"+_),G,R]},z=(k,O,$)=>{let[G]=ae(O);if(G==null)return null;let R=[];if($!=null)for(let j=0;j<$.length;j++){let K=$[j];G.test(k[K])&&R.push(K)}else for(let j=0;j<k.length;j++)G.test(k[j])&&R.push(j);return R};let se=!!p,oe=new RegExp(g,_),Qe=new RegExp(p,_);const De=(k,O,$)=>{let[G,R,j]=ae($,1),K=H($,!0),[Fe]=ae($,2),Ae=R.length,fe=Array(Ae),Se=Array(Ae);for(let D=0;D<Ae;D++){let X=R[D],V=K[D],Ce=X[0]=='"'?X.slice(1,-1):X+j[D],ke=V[0]=='"'?V.slice(1,-1):V+j[D];fe[D]=Ce,Se[D]=ke}let _e=k.length,ve=Array(_e).fill(0),M={idx:Array(_e),start:ve.slice(),chars:ve.slice(),cases:ve.slice(),terms:ve.slice(),interIns:ve.slice(),intraIns:ve.slice(),interLft2:ve.slice(),interRgt2:ve.slice(),interLft1:ve.slice(),interRgt1:ve.slice(),ranges:Array(_e)},J=n==1||a==1,Y=0;for(let D=0;D<k.length;D++){let X=O[k[D]],V=X.match(G),Ce=V.index+V[1].length,ke=Ce,Ne=!1,it=0,we=0,gt=0,rt=0,ie=0,mt=0,Va=0,Wa=0,Ja=0,bt=[];for(let le=0,pe=2;le<Ae;le++,pe+=2){let ot=m(V[pe]),Me=fe[le],Vn=Se[le],Re=Me.length,Oe=ot.length,Ie=ot==Me;if(V[pe]==Vn&&Va++,!Ie&&V[pe+1].length>=Re){let ce=m(V[pe+1]).indexOf(Me);ce>-1&&(bt.push(ke,Oe,ce,Re),ke+=et(V,pe,ce,Re),ot=Me,Oe=Re,Ie=!0,le==0&&(Ce=ke))}if(J||Ie){let ce=ke-1,tt=ke+Oe,yt=!1,qt=!1;if(ce==-1||oe.test(X[ce]))Ie&&it++,yt=!0;else{if(n==2){Ne=!0;break}if(se&&Qe.test(X[ce]+X[ce+1]))Ie&&we++,yt=!0;else if(n==1){let on=V[pe+1],Ft=ke+Oe;if(on.length>=Re){let vt=0,At=!1,Ji=new RegExp(Me,"ig"+_),Ka;for(;Ka=Ji.exec(on);){vt=Ka.index;let Ga=Ft+vt,Wn=Ga-1;if(Wn==-1||oe.test(X[Wn])){it++,At=!0;break}else if(Qe.test(X[Wn]+X[Ga])){we++,At=!0;break}}At&&(yt=!0,bt.push(ke,Oe,vt,Re),ke+=et(V,pe,vt,Re),ot=Me,Oe=Re,Ie=!0,le==0&&(Ce=ke))}if(!yt){Ne=!0;break}}}if(tt==X.length||oe.test(X[tt]))Ie&&gt++,qt=!0;else{if(a==2){Ne=!0;break}if(se&&Qe.test(X[tt-1]+X[tt]))Ie&&rt++,qt=!0;else if(a==1){Ne=!0;break}}Ie&&(ie+=Re,yt&&qt&&mt++)}if(Oe>Re&&(Ja+=Oe-Re),le>0&&(Wa+=V[pe-1].length),!e.intraFilt(Me,ot,ke)){Ne=!0;break}le<Ae-1&&(ke+=Oe+V[pe+1].length)}if(!Ne){M.idx[Y]=k[D],M.interLft2[Y]=it,M.interLft1[Y]=we,M.interRgt2[Y]=gt,M.interRgt1[Y]=rt,M.chars[Y]=ie,M.terms[Y]=mt,M.cases[Y]=Va,M.interIns[Y]=Wa,M.intraIns[Y]=Ja,M.start[Y]=Ce;let le=X.match(Fe),pe=le.index+le[1].length,ot=bt.length,Me=ot>0?0:1/0,Vn=ot-4;for(let ce=2;ce<le.length;){let tt=le[ce].length;if(Me<=Vn&&bt[Me]==pe){let yt=bt[Me+1],qt=bt[Me+2],on=bt[Me+3],Ft=ce,vt="";for(let At=0;At<yt;Ft++)vt+=le[Ft],At+=le[Ft].length;le.splice(ce,Ft-ce,vt),pe+=et(le,ce,qt,on),Me+=4}else pe+=tt,ce++}pe=le.index+le[1].length;let Re=M.ranges[Y]=[],Oe=pe,Ie=pe;for(let ce=2;ce<le.length;ce++){let tt=le[ce].length;pe+=tt,ce%2==0?Ie=pe:tt>0&&(Re.push(Oe,Ie),Oe=Ie=pe)}Ie>Oe&&Re.push(Oe,Ie),Y++}}if(Y<k.length)for(let D in M)M[D]=M[D].slice(0,Y);return M},et=(k,O,$,G)=>{let R=k[O]+k[O+1].slice(0,$);return k[O-1]+=R,k[O]=k[O+1].slice($,$+G),k[O+1]=k[O+1].slice($+G),R.length},st=5,qe=(k,O,$,G=1e3,R)=>{$=$?$===!0?st:$:0;let j=null,K=null,Fe=[];O=O.replace(A,M=>{let J=M.trim().slice(1);return J=J[0]==='"'?ea(J.slice(1,-1)):J.replace(Ic,""),J!=""&&Fe.push(J),""});let Ae=H(O),fe;if(Fe.length>0){if(fe=new RegExp(Fe.join("|"),"i"+_),Ae.length==0){let M=[];for(let J=0;J<k.length;J++)fe.test(k[J])||M.push(J);return[M,null,null]}}else if(Ae.length==0)return[null,null,null];if($>0){let M=H(O);if(M.length>1){let J=M.slice().sort((D,X)=>X.length-D.length);for(let D=0;D<J.length;D++){if((R==null?void 0:R.length)==0)return[[],null,null];R=z(k,J[D],R)}if(M.length>$)return[R,null,null];j=Oi(M).map(D=>D.join(" ")),K=[];let Y=new Set;for(let D=0;D<j.length;D++)if(Y.size<R.length){let X=R.filter(Ce=>!Y.has(Ce)),V=z(k,j[D],X);for(let Ce=0;Ce<V.length;Ce++)Y.add(V[Ce]);K.push(V)}else K.push([])}}j==null&&(j=[O],K=[(R==null?void 0:R.length)>0?R:z(k,O)]);let Se=null,_e=null;if(Fe.length>0&&(K=K.map(M=>M.filter(J=>!fe.test(k[J])))),K.reduce((M,J)=>M+J.length,0)<=G){Se={},_e=[];for(let M=0;M<K.length;M++){let J=K[M];if(J==null||J.length==0)continue;let Y=j[M],D=De(J,k,Y),X=e.sort(D,k,Y,b);if(M>0)for(let V=0;V<X.length;V++)X[V]+=_e.length;for(let V in D)Se[V]=(Se[V]??[]).concat(D[V]);_e=_e.concat(X)}}return[[].concat(...K),Se,_e]};return{search:(...k)=>qe(...k),split:H,filter:z,info:De,sort:e.sort}}const Ec=(()=>{let e={A:"ÁÀÃÂÄĄ",a:"áàãâäą",E:"ÉÈÊËĖ",e:"éèêëę",I:"ÍÌÎÏĮ",i:"íìîïį",O:"ÓÒÔÕÖ",o:"óòôõö",U:"ÚÙÛÜŪŲ",u:"úùûüūų",C:"ÇČĆ",c:"çčć",L:"Ł",l:"ł",N:"ÑŃ",n:"ñń",S:"ŠŚ",s:"šś",Z:"ŻŹ",z:"żź"},t=new Map,n="";for(let i in e)e[i].split("").forEach(r=>{n+=r,t.set(r,i)});let a=new RegExp(`[${n}]`,"g"),s=i=>t.get(i);return i=>{if(typeof i=="string")return i.replace(a,s);let r=Array(i.length);for(let o=0;o<i.length;o++)r[o]=i[o].replace(a,s);return r}})();function Oi(e){e=e.slice();let t=e.length,n=[e.slice()],a=new Array(t).fill(0),s=1,i,r;for(;s<t;)a[s]<s?(i=s%2&&a[s],r=e[s],e[s]=e[i],e[i]=r,++a[s],s=1,n.push(e.slice())):(a[s]=0,++s);return n}const jc=(e,t)=>t?`<mark>${e}</mark>`:e,Pc=(e,t)=>e+t;function Dc(e,t,n=jc,a="",s=Pc){a=s(a,n(e.substring(0,t[0]),!1))??a;for(let i=0;i<t.length;i+=2){let r=t[i],o=t[i+1];a=s(a,n(e.substring(r,o),!0))??a,i<t.length-3&&(a=s(a,n(e.substring(t[i+1],t[i+2]),!1))??a)}return a=s(a,n(e.substring(t[t.length-1]),!1))??a,a}Ln.latinize=Ec;Ln.permute=e=>Oi([...Array(e.length).keys()]).sort((n,a)=>{for(let s=0;s<n.length;s++)if(n[s]!=a[s])return n[s]-a[s];return 0}).map(n=>n.map(a=>e[a]));Ln.highlight=Dc;const Uc="_overlays_1ovwj_1",Lc={overlays:Uc},Pa=xa(void 0),Da=({children:e})=>{const t=en(Pa);if(!t)return null;const n=be(e);return n.current!==e&&(n.current=e,t.generation.value++),Qt(()=>(t.children.push(n),t.generation.value++,()=>{const a=t.children.indexOf(n);a!==-1&&(t.children.splice(a,1),t.generation.value++)}),[]),null},Bc=()=>{const e=en(Pa);return!e||(e.generation.value,e.children.length===0)?null:d("div",{className:Lc.overlays,children:e.children.map(t=>t.current)})},qc=({children:e})=>{const t=be();return t.current||(t.current={children:[],generation:I(0)}),d(Pa.Provider,{value:t.current,children:[e,d(Bc,{})]})},qd=({value:e,options:t,className:n,disabled:a})=>{const s=C(i=>{const r=i.target;r.selectedIndex!==-1&&(e.value=t[r.selectedIndex].id)},[e,t]);return d("div",{className:te(P.selectWrapper,n),children:d("select",{className:P.select,onChange:s,disabled:a,children:t.map(({id:i,name:r})=>d("option",{value:i,selected:i===e.value,children:r},i))})})},Wt=({value:e,min:t,max:n,step:a=1,smartAim:s=0,className:i})=>{const r=C(S=>{const x=Number(S.target.value);e.value=x},[e]),o=C(S=>{S.preventDefault()},[]),c=C(()=>{e.value=Math.min(e.value+(a==="any"?1:a),n)},[e,a]),u=C(()=>{e.value=Math.max(e.value-(a==="any"?1:a),t)},[e,a]),l=Xs(),h=Ge(!1),f=be(null);Gt(()=>()=>{f.current&&(window.removeEventListener("pointermove",f.current.move),window.removeEventListener("pointerup",f.current.up))},[]);const p=be({bottom:0,top:0}),g=be(0),y=be(!1),v=C(S=>{const A=S.currentTarget.getBoundingClientRect();p.current={bottom:A.bottom,top:A.top},g.current=e.value;const F=E=>{var ae;let U=0;if(E.clientY<p.current.top?U=E.clientY-p.current.top:E.clientY>p.current.bottom&&(U=E.clientY-p.current.bottom),y.current=U!==0,!y.current)return;(ae=document.getSelection())==null||ae.empty();const B=U*(n-t)/200,de=g.current-B,H=Math.max(t,Math.min(de,n));let ge=a==="any"?H:Math.round(H/a)*a;if(s>0){const z=Math.round(de/s)*s;Math.abs(z-de)<s/4&&(ge=Math.max(t,Math.min(z,n)))}e.value=ge},T=()=>{window.removeEventListener("pointermove",F),window.removeEventListener("pointerup",T)};f.current={move:F,up:T},window.addEventListener("pointermove",F),window.addEventListener("pointerup",T)},[t,n,e]),m=C(()=>{h.value=!0},[h]),b=C(()=>{h.value=!1,e.value=Math.max(t,Math.min(e.value,n))},[h,e,t,n]),w=C(S=>{S==null||S.focus()},[]),_=Number(e.value.toFixed(12)).toString();return d("div",{className:te(P.spinboxWrapper,i),children:[h.value?d("input",{className:P.spinboxField,type:"number",min:t,max:n,step:a,value:Number(e.value.toFixed(12)),onInput:r,id:l,onBlur:b,ref:w}):d("div",{className:te(P.spinboxDisplay,"tabular-nums"),onInput:r,onDragCapture:o,id:l,onPointerDown:v,tabIndex:0,onFocus:m,"aria-valuemin":t,"aria-valuemax":n,"aria-valuenow":e.value,"aria-valuetext":_,role:"spinbutton",children:_}),d("div",{className:P.spinboxButtons,children:[d("div",{onClick:c,className:P.spinboxButton,role:"button","aria-controls":l,"aria-label":"Increment",children:d("div",{className:P.spinboxUp})}),d("div",{className:P.spinboxButtonDivider}),d("div",{onClick:u,className:P.spinboxButton,role:"button","aria-controls":l,"aria-label":"Decrement",children:d("div",{className:P.spinboxDown})})]})]})},zd=({value:e,min:t,max:n,step:a=1,className:s})=>{const i=be(null),r=C(o=>{const c=Number(o.target.value);e.value=c},[e]);return Qt(()=>{const o=i.current;o.style.setProperty("--min",String(t)),o.style.setProperty("--max",String(n)),o.style.setProperty("--val",String(e.value))},[e.value,t,n]),d("input",{className:te(wl.slider,s),type:"range",min:t,max:n,step:a,value:e.value,onInput:r,ref:i})},zc=({type:e,title:t,toggled:n,innerRef:a,className:s})=>{const i=C(()=>{n.value=!n.value},[n]);return d("button",{className:te(P.iconButton,P.toggleIcon,n.value&&P.toggledOn,s),onClick:i,role:"checkbox","aria-checked":n.value,title:t,ref:a,tabindex:0,children:d(Ee,{type:e,title:t})})},na=({type:e,title:t,currentValue:n,value:a})=>{const s=C(()=>{n.value=a},[n]);return d("button",{className:te(P.iconButton,P.toggleIcon,{[P.toggledOn]:n.value===a}),onClick:s,role:"radio","aria-checked":n.value===a,title:t,tabindex:0,children:d(Ee,{type:e,title:t})})},ut=({label:e,title:t,checked:n,disabled:a,indeterminate:s,className:i})=>{const r=C(c=>{c.preventDefault(),n.value=c.currentTarget.checked},[n]),o=C(c=>{c.preventDefault(),c.stopPropagation()},[]);return d("label",{className:te(P.checkboxToggle,a&&P.disabled,i),title:t??void 0,"aria-disabled":a,children:[d("input",{type:"checkbox",checked:n.value,onInput:r,disabled:a,indeterminate:s}),d("span",{className:P.checkboxLabel,onMouseDown:o,children:e})]})},Bn=({value:e,small:t,className:n,...a})=>{const s=C(i=>{e.value=i.currentTarget.value},[e]);return d("input",{type:"text",className:te(n,t&&P.small),...a,value:e,onInput:s})},xt=({children:e,className:t,...n})=>d("button",{...n,className:te(P.button,t),children:d("span",{className:P.buttonContents,children:e})}),$c=({collapsed:e,bodyId:t,children:n,auxiliaryItems:a,className:s})=>{const i=C(()=>{e.value=!e.value},[e]);return d("header",{className:s,children:[d("button",{className:P.collapsibleHeaderTitle,"aria-expanded":e.value?"false":"true","aria-controls":t,onClick:i,children:[d(Ee,{type:e.value?"arrow-right":"arrow-down",title:null,motif:re.MONOCHROME}),d("span",{className:P.collapsibleHeaderTitleText,children:n})]}),a]})},Hc=new Ln({}),$d=({options:e,selectedOptions:t,placeholder:n="Search...",className:a,id:s,renderOption:i})=>{const r=Ge(!1),o=Ge(""),c=be(null),{reference:u,floating:l}=Mi(()=>({placement:"bottom-start",middleware:[Ai(4),Ci({padding:8}),Ii({apply({availableHeight:x,elements:A}){const{floating:F,reference:T}=A;F.style.width=`${T.getBoundingClientRect().width}px`,F.style.maxHeight=`${Math.max(x-8,320)}px`},padding:8}),Ni()]})),h=C(x=>{u(x),c.current=x},[]),f=Le(()=>e.map(x=>x.searchable??x.name),[e]),p=Le(()=>{if(!o.value)return e;const[x,A,F]=Hc.search(f,o.value);return A?F.map(E=>e[x[E]]):e},[e,o.value]),g=Le(()=>Et(()=>{const x=[];for(const A of e)t[A.id].value&&x.push(A.name);return x.length===0?null:x.join(", ")}),[e,t]),y=C(x=>{x&&x.focus()},[]),v=C(()=>{r.value=!r.value,r.value||(o.value="")},[r,o]),m=C(x=>{const A=x.currentTarget;o.value=A.value},[o]),b=C(x=>{const A=t[x];A.value=!A.value},[t]),w=C(x=>{var A;(!x.relatedTarget||x.relatedTarget!==c.current&&((A=x.currentTarget)==null?void 0:A.contains(x.relatedTarget))===!1)&&(r.value=!1,o.value="")},[]),_=C(x=>{var A;x.key==="Escape"&&(r.value=!1,o.value="",(A=c.current)==null||A.focus())},[r,o]);Gt(()=>{if(r.value)return document.addEventListener("keydown",_),()=>{document.removeEventListener("keydown",_)}},[r.value,_]);const S=g.value??n;return d("div",{className:te(P.searchableDropdownWrapper,a),id:s,children:[d("button",{ref:h,className:te(P.searchableDropdownButton,r.value&&P.open),onClick:v,type:"button",role:"select",children:[d("span",{className:P.searchableDropdownButtonText,title:g.value??void 0,children:S}),d(Ee,{type:r.value?"arrow-up":"arrow-down",title:"",className:P.searchableDropdownArrow})]}),r.value&&d(Da,{children:d("div",{ref:l,className:P.searchableDropdownPanel,onFocusOut:w,tabIndex:0,role:"menu",children:[d("div",{className:P.searchableDropdownSearch,children:d("input",{ref:y,type:"text",placeholder:"Search...",role:"searchbox",value:o.value,onInput:m,className:P.searchableDropdownSearchInput})}),d("div",{className:P.searchableDropdownOptions,children:[p.map(x=>{var A;return d("label",{className:P.searchableDropdownOption,onClick:F=>F.stopPropagation(),role:"menuitem",children:[d("input",{type:"checkbox",checked:((A=t[x.id])==null?void 0:A.value)||!1,onChange:()=>b(x.id),className:P.searchableDropdownCheckbox}),d("span",{className:P.searchableDropdownOptionText,children:i?i(x):x.name})]},x.id)}),p.length===0&&d("div",{className:P.searchableDropdownNoResults,children:"No results found"})]})]})})]})},xs=(e,t,n=!1)=>{let a,s=0;const i=(...r)=>{typeof a=="number"&&window.clearTimeout(a);const o=Date.now(),c=()=>{e(...r),s=o};o-s>=t&&!n?c():a=window.setTimeout(c,t)};return i.cancel=()=>{typeof a=="number"&&window.clearTimeout(a)},i},Ua=(e,t,n=!1)=>{const a=Le(()=>I(e.peek()),[e]),s=be();return Gt(()=>{const i=xs(r=>{a.value=r},t,n);return s.current=i,()=>{i.cancel()}},[e,t,n,xs]),Gt(()=>{s.current&&a.peek()!==e.value&&s.current(e.value)},[e,e.value]),a};let Ei="";const ji=e=>(Ei=e,navigator.clipboard.writeText(e)),Vc=async()=>{try{return await navigator.clipboard.readText()}catch(e){if(e instanceof Error&&e.name==="NotAllowedError")return Ei;throw e}},Wc="_toast-container_sxaha_51",Jc="_toast-wrapper_sxaha_67",Kc="_toast_sxaha_51",Gc="_success_sxaha_94",Xc="_warning_sxaha_99",Zc="_error_sxaha_105",Yc="_toast-row_sxaha_111",Qc="_toast-icon_sxaha_119",eu="_toast-contents_sxaha_123",tu="_separate-contents_sxaha_127",nu="_toast-title_sxaha_131",au="_plain_sxaha_134",su="_timeout-bar_sxaha_138",iu="_toast-placeholder_sxaha_153",ru="_error-message_sxaha_158",ou="_error-stack_sxaha_163",me={toastContainer:Wc,toastWrapper:Jc,toast:Kc,success:Gc,warning:Xc,error:Zc,toastRow:Yc,toastIcon:Qc,toastContents:eu,separateContents:tu,toastTitle:nu,plain:au,timeoutBar:su,toastPlaceholder:iu,errorMessage:ru,errorStack:ou};class Fn{constructor(t){this.inner=t}static create(t){return new Fn(t)}update(t){const n=t(this.inner);return typeof n>"u"?this:new Fn(n)}get value(){return this.inner}}const La=xa(void 0),lu=({children:e,toastRef:t,closeToast:n,showCloseButton:a,timeout:s,motif:i=re.PRIMARY,title:r})=>{let o,c;switch(i){case re.SUCCESS:o="check",c="Success";break;case re.WARNING:o="warning",c="Warning";break;case re.ERROR:o="error",c="Error";break}return Qt(()=>{if(typeof s=="number"){const u=setTimeout(n,s);return()=>clearTimeout(u)}},[]),d("div",{className:me.toastWrapper,ref:t,children:d("div",{className:te(me.toast,{[me.primary]:i===re.PRIMARY,[me.success]:i===re.SUCCESS,[me.warning]:i===re.WARNING,[me.error]:i===re.ERROR}),children:[d("div",{className:me.toastRow,children:[i===re.PRIMARY?null:d(Ee,{type:o,title:c,className:me.toastIcon}),typeof r>"u"||r===null?d("div",{className:me.toastContents,children:e}):d("div",{className:te(me.toastTitle,typeof r!="object"&&me.plain),children:r}),a&&d($e,{type:"close",title:"Close",onClick:n,className:me.toastIcon})]}),typeof r>"u"||r==="null"?null:d("div",{className:te(me.toastContents,me.separateContents),children:e}),typeof s=="number"&&d("div",{className:me.timeoutBar,style:{animationDuration:`${s}ms`}})]})})},cu=()=>{const e=en(La);if(!e)throw new Error("ToastDisplay must be placed under a ToastProvider");const t=Ta(()=>e.toasts.value.value.map(n=>n.inner));return d(Da,{children:d("div",{className:me.toastContainer,children:t})})},uu=()=>{const e=en(La);if(!e)throw new Error("useAddToast requires a ToastProvider");return C(t=>{e.addToast(t)},[e])},qn=()=>{const e=uu();return C((t,n)=>{e({motif:re.ERROR,title:t,contents:d(Je,{children:[d("div",{className:me.errorMessage,children:String(n)}),typeof n=="object"&&n!==null&&"stack"in n?d("div",{className:me.errorStack,children:n.stack}):null]})})},[])},hu=({height:e,onTransitionEnd:t})=>{const[n,a]=Gs(`${e}px`),s=be(null);return Qt(()=>{var i;(i=s.current)==null||i.scrollTop,a("0")},[]),d("div",{className:me.toastPlaceholder,style:{minHeight:n},onTransitionEnd:t,ref:s})},du=({children:e})=>{const t=Ge(Fn.create([])),n=be(void 0),a=be(0),s=C(i=>{let r=null;const o=a.current++,c=g=>{r=g},u=I(0),l=()=>{t.value=t.value.update(g=>{var w;const y=g.indexOf(p);if(y===-1)return;const v=((w=r==null?void 0:r.getBoundingClientRect())==null?void 0:w.height)??0,b=d(hu,{height:v,onTransitionEnd:()=>{t.value=t.value.update(_=>{const S=_.indexOf(p);if(S!==-1)return _.splice(S,1),_})}},o);return g[y].inner=b,g})},h=i.title,f=i.contents,p={inner:d(lu,{toastRef:c,motif:i.motif,showCloseButton:i.showCloseButton??!0,timeout:i.timeout,closeToast:l,title:typeof h=="function"?d(h,{closeToast:l}):h,children:typeof f=="function"?d(f,{closeToast:l}):f},o),transformOffset:u};t.value=t.value.update(g=>(g.push(p),g))},[]);return n.current||(n.current={toasts:t,addToast:s}),d(La.Provider,{value:n.current,children:[d(cu,{}),e]})},Zt=({progress:e,size:t=100,className:n})=>{const a=Math.min(t/10,10),s=(t-a)*.5,i=2*Math.PI*s;let r,o;typeof e=="number"?(e=Math.max(0,Math.min(1,e)),r=i,o=i-e*i):(r=i/2,o=0);const c=typeof e!="number"?{animation:"spin 1.5s linear infinite"}:void 0;return d("svg",{xmlns:"http://www.w3.org/2000/svg",className:n,width:t,height:t,viewBox:`0 0 ${t} ${t}`,children:[d("style",{children:`
                @keyframes spin {
                    from {
                        stroke-dashoffset: ${i};
                    }
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            `}),typeof e=="number"&&t>=64&&d("text",{x:"50%",y:"50%","text-anchor":"middle",dy:".3em","font-size":`${t*.2}px`,"font-weight":600,fill:"currentColor",className:"tabular-nums",children:Math.round(e*100).toString().padStart(2,"0")+"%"}),d("circle",{cx:"50%",cy:"50%",r:s,"stroke-width":a,stroke:"currentColor",fill:"none","stroke-dasharray":r,"stroke-dashoffset":o,style:c})]})},Pi=async e=>{const t=document.createElement("input");return t.type="file",e.accept&&(t.accept=e.accept),e.multiple&&(t.multiple=!0),new Promise(n=>{t.onchange=()=>{n(t.files)},t.oncancel=()=>{n(null)},t.click()})},Di=()=>Pi({accept:".ttf,.otf,.ttc,.otc,.woff,.woff2",multiple:!0}),Ss=[" bytes","KB","MB","GB"],ks=1e3,gn=e=>{let t=0,n=e;for(;n>ks&&t<Ss.length;)n/=ks,t++;return`${t<2?n.toFixed(0):n.toFixed(2)} ${Ss[t]}`},fu=e=>{const t=Ge(e);return t.peek()!==e&&(t.value=e),t},pu=e=>{const t=e>=200?1:e>1?.25:.01,n=e>=200?25:e>=50?12.5:0;return{step:t,smartAim:n}},gu=({axis:e})=>{const{step:t,smartAim:n}=pu(e.max),a=C(()=>{e.curSingle.value=e.defaultValue},[e.curSingle,e.defaultValue]);let s;switch(e.mode.value){case"single":{s=d(Je,{children:[d(Wt,{min:e.min,max:e.max,value:e.curSingle,step:t,smartAim:n}),d($e,{type:"reset",title:"Reset to default value",onClick:a,disabled:e.curSingle.value===e.defaultValue})]});break}case"range":{s=d("div",{className:N.spinboxRange,children:[d(Wt,{min:e.min,max:e.max,value:e.curMin,step:t,smartAim:n}),d("span",{className:N.label,children:"to"}),d(Wt,{min:e.min,max:e.max,value:e.curMax,step:t,smartAim:n})]});break}case"multiple":{s=d(yu,{ranges:e.curMultiValue});break}}return d("div",{className:N.axisSetting,children:[d("div",{className:N.axisSettingModes,role:"radiogroup","aria-label":"Axis modes",children:[d(na,{type:"range",title:"Limit range of values",currentValue:e.mode,value:"range"}),d(na,{type:"pin",title:"Pin to single value",currentValue:e.mode,value:"single"}),d(na,{type:"stack",title:"Instance into multiple font files",currentValue:e.mode,value:"multiple"})]}),s]})},nt=({styleSetting:e,name:t,tag:n})=>d("div",{className:N.styleSetting,children:[d("div",{className:N.styleSettingName,title:n,children:t}),e.type==="single"?d("span",{className:N.staticSetting,children:(Math.round(e.value*1e3)/1e3).toString()}):d(gu,{axis:e.value})]}),mu=({font:e,styleSettings:t,enableSubsetting:n})=>{const a=Ze(),s=qn(),i=C(()=>{a.removeFont(e).catch(o=>{s("Failed to remove font",o)})},[e]),r=t.weight&&t.weight.type!=="single"||t.width&&t.width.type!=="single"||t.italic&&t.italic.type!=="single"||t.slant&&t.slant.type!=="single";return d("div",{className:N.singleFontSettings,children:[d("div",{className:N.singleFontHeader,children:[d("div",{className:N.singleFontName,children:[d("span",{className:N.singleFontFamily,children:[e.familyName," "]}),d("span",{className:N.singleFontSubfamily,children:[e.subfamilyName," "]}),d("span",{className:N.singleFontFileSize,children:gn(e.fileSize)})]}),d($e,{onClick:i,type:"close",title:"Remove this font",className:N.removeFont})]}),n&&(t.weight||t.width||t.italic||t.slant)?d("div",{className:te(N.singleFontSettingsBody,r&&N.settingsGrid,!r&&N.settingsList),children:[t.weight?d(nt,{styleSetting:t.weight,name:"Weight"}):null,t.width?d(nt,{styleSetting:t.width,name:"Width"}):null,t.italic?d(nt,{styleSetting:t.italic,name:"Italic"}):null,t.slant?d(nt,{styleSetting:t.slant,name:"Slant"}):null]}):null]})},bu=({ranges:e,disabled:t})=>{const n=Ua(e,500,!0),a=Le(()=>Fa(n.value)!==null,[n,n.value]);return d(Bn,{value:e,placeholder:'Enter Unicode code points or ranges to include (e.g. "U+0020", "U+0025-U+00FF", "U+0025-00FF, U+0020, U+FFFD")',className:te(N.unicodeRangeTextbox,{[N.invalid]:!a}),disabled:t})},yu=({ranges:e,disabled:t})=>{const n=Ua(e,500,!0),a=Le(()=>hi(n.value)!==null,[n,n.value]);return d(Bn,{value:e,placeholder:"400, 500, 600-700",className:te(N.axisRangeTextbox,{[N.invalid]:!a}),disabled:t})},fa=({settings:e,name:t,mapping:n,disabled:a})=>{const s=fu(e),i=Ta(()=>s.value.reduce((o,c)=>o+(n(c).checked.value?1:0),0)),r=C(()=>{const o=i.value===e.length;Ys(()=>{for(const c of e)n(c).checked.value=!o})},[e,i]);return d("div",{className:te(N.settingsSubSection,N.checkboxSection,{[N.disabled]:a}),children:[d("header",{children:d("label",{children:[d("input",{type:"checkbox",checked:i.value===e.length,indeterminate:i.value>0&&i.value<e.length,onInput:r,disabled:a})," ",t]})}),d("div",{className:N.checkboxes,children:e.map(o=>{const{label:c,checked:u,title:l}=n(o);return d(ut,{label:c,checked:u,title:l,disabled:a})})})]})},Ui=e=>e.label??Ca(e.tag).name??e.tag,Ts=e=>({label:Ui(e.feature),checked:e.include,title:e.feature.tag}),vu=e=>({label:e.name,checked:e.include}),Li=({settings:e,copyFunction:t,pasteFunction:n})=>{const a=C(()=>{ji(JSON.stringify(t(e)))},[e]),s=C(()=>{Vc().then(i=>{try{const r=JSON.parse(i);typeof r=="object"&&n(e,r)}catch(r){console.error("Failed to paste settings:",r)}})},[e]);return d("div",{className:N.copyPasteButtons,children:[d($e,{onClick:a,type:"copy",title:"Copy settings to clipboard"}),d($e,{onClick:s,type:"paste",title:"Paste settings from clipboard"})]})},zt=({title:e,children:t,copyPasteFns:n,startCollapsed:a=!1})=>{const s=Ge(a),i=Xs();return d("section",{className:N.settingsSection,children:[d($c,{bodyId:i,auxiliaryItems:n&&d(Li,{settings:n.settings,copyFunction:n.copy,pasteFunction:n.paste}),collapsed:s,children:e}),d("div",{className:N.settingsSectionBody,id:i,hidden:s.value,children:t})]})},wu=({settings:e,disabled:t,isMultiple:n,onRemove:a})=>{const s=C(()=>{a==null||a(e)},[a,e]),i=Ta(()=>{if(e.includeUnicodeRanges.value!=="")return"";let r="";for(const o of e.includeNamedSubsets)o.include.value&&(r+=`${o.name}-`);return r.slice(0,-1)});return d("div",{className:N.characterSet,children:[n?d("div",{className:N.characterSetHeader,children:[d(Bn,{value:e.name,small:!0,placeholder:i.value||"Name this character set (optional)",className:N.characterSetName}),d($e,{type:"close",title:"Remove this character set",onClick:s})]}):null,d("div",{className:N.characterSetBody,children:[e.includeNamedSubsets.length>0?d(fa,{name:"Named subsets",settings:e.includeNamedSubsets,mapping:vu,disabled:t}):null,d("div",{className:N.settingsSubSection,children:d(bu,{ranges:e.includeUnicodeRanges,disabled:t})})]})]})},_u=({familySettings:e})=>{const t=Ze(),{name:n,fonts:a,settings:s}=e,i=qn(),r=C(()=>{t.removeFontFamily(e).catch(u=>{i("Failed to remove font family",u)})},[e]),o=C(()=>{t.addCharacterSet(e)},[t,e]),c=C(u=>{t.removeCharacterSet(e,u)},[t,e]);return d("div",{className:N.familySettings,"aria-label":`Settings for ${n} font family`,children:[d("div",{className:N.familyHeader,children:[d("span",{className:N.familyName,children:n}),d(ut,{label:"Subset",title:"Save space by reducing the number of glyphs, features, and variations in this font",checked:e.enableSubsetting}),d(Li,{settings:e,copyFunction:Ao,pasteFunction:Ro}),d($e,{onClick:r,type:"close",title:"Remove this font family",className:N.removeFontFamily})]}),d("div",{className:N.familySettingsBody,children:[e.enableSubsetting.value&&d(Je,{children:[s.styleSettings.weight||s.styleSettings.width||s.styleSettings.italic||s.styleSettings.slant?d(zt,{title:"Style settings",copyPasteFns:{settings:s.styleSettings,copy:Co,paste:Oo},children:d("div",{className:N.settingsGrid,children:[s.styleSettings.weight?d(nt,{styleSetting:s.styleSettings.weight,name:"Weight"}):null,s.styleSettings.width?d(nt,{styleSetting:s.styleSettings.width,name:"Width"}):null,s.styleSettings.italic?d(nt,{styleSetting:s.styleSettings.italic,name:"Italic"}):null,s.styleSettings.slant?d(nt,{styleSetting:s.styleSettings.slant,name:"Slant"}):null]})}):null,s.axisSettings.length>0?d(zt,{title:"Variation axis settings",copyPasteFns:{settings:s.axisSettings,copy:No,paste:Eo},children:d("div",{className:N.settingsGrid,children:s.axisSettings.map(({name:u,tag:l,range:h})=>d(nt,{styleSetting:{type:"variable",value:h},name:u,tag:l}))})}):null,d(zt,{title:"Character sets",copyPasteFns:{settings:s.includeCharacters,copy:Mo,paste:Po},children:[d("div",{className:N.characterSetsHeader,children:[d($e,{type:"plus",title:"Add character set",onClick:o}),d("div",{className:N.headerDivider}),d(ut,{label:"Include all characters",checked:s.includeCharacters.includeAllCharacters})]}),d("div",{className:N.characterSets,children:s.includeCharacters.characterSets.value.map(u=>d(wu,{settings:u,disabled:s.includeCharacters.includeAllCharacters.value,isMultiple:s.includeCharacters.characterSets.value.length>1,onRemove:c},u))})]}),s.includeFeatures.features.length>0||s.includeFeatures.characterVariants.length>0||s.includeFeatures.stylisticSets.length>0?d(zt,{title:"Features",copyPasteFns:{settings:s.includeFeatures,copy:Io,paste:jo},children:[s.includeFeatures.features.length>0?d("div",{className:N.settingsSubSection,children:d("div",{className:N.checkboxes,children:s.includeFeatures.features.map(({feature:u,include:l})=>d(ut,{label:Ui(u),checked:l,title:u.tag}))})}):null,s.includeFeatures.stylisticSets.length>0?d(fa,{name:"Stylistic sets",settings:s.includeFeatures.stylisticSets,mapping:Ts}):null,s.includeFeatures.characterVariants.length>0?d(fa,{name:"Character variants",settings:s.includeFeatures.characterVariants,mapping:Ts}):null]}):null]}),d(zt,{title:["Fonts",d("span",{className:N.numFonts,children:a.length})],startCollapsed:a.length>6,children:a.map(({font:u,styleSettings:l})=>d(mu,{font:u,styleSettings:l,enableSubsetting:e.enableSubsetting.value}))})]})]})},un=e=>{var t;if(!((t=e.dataTransfer)!=null&&t.items))return!1;for(const n of e.dataTransfer.items)if(n.kind==="file")return!0;return!1},xu=()=>{const e=Ze(),{fonts:t,fontsBeingLoaded:n}=e,a=qn(),s=C(l=>{un(l)&&(l.preventDefault(),l.stopPropagation())},[]),i=C(l=>{un(l)&&(l.preventDefault(),l.stopPropagation())},[]),r=C(l=>{if(!un(l))return;l.preventDefault(),l.stopPropagation();const h=Array.from(l.dataTransfer.files);h.length>0&&e.addFonts(h.map(f=>f)).catch(f=>{a("Failed to add fonts",f)})},[]),o=C(l=>{un(l)&&(l.preventDefault(),l.stopPropagation())},[]),c=C(()=>{Di().then(async l=>{l&&await e.addFonts(Array.from(l))}).catch(l=>{a("Failed to upload fonts",l)})},[e]),u=C(l=>{e.googleFontsModalState.open.value=!0,l.stopPropagation()},[e]);return t.value.length===0?n.value>0?d("div",{className:N.loading,children:d(Zt,{size:320})}):d("div",{className:N.noFonts,onDragEnter:s,onDragOver:i,onDrop:r,onDragLeave:o,onClick:c,children:[d("div",{className:N.uploadFonts,children:[d(Ee,{type:"upload",title:"",className:N.uploadIcon,size:"8rem"}),d("div",{className:N.uploadHeader,children:"Click to upload fonts"}),d("div",{className:N.uploadSub,children:"or drag and drop"})]}),d(xt,{onClick:u,children:[d(Ee,{type:"globe",title:""}),"Browse Google Fonts"]})]}):d("div",{className:N.families,onDragEnter:s,onDragOver:i,onDrop:r,onDragLeave:o,children:t.value.map(l=>d(_u,{familySettings:l}))})},Su="_export-panel_qxa1t_210",ku="_horizontal_qxa1t_217",Tu="_spacer_qxa1t_221",Fu="_splitter_qxa1t_225",Au="_vertical_qxa1t_239",Cu="_row_qxa1t_284",Nu="_grow-button_qxa1t_290",Iu="_css-path-prefix-bar_qxa1t_294",Mu="_css-path-prefix_qxa1t_294",Ru="_css-preview_qxa1t_310",Ou="_export-buttons_qxa1t_318",Eu="_loader-wrapper_qxa1t_326",ju="_export-formats_qxa1t_334",Pu="_button-row_qxa1t_340",Du="_export-results_qxa1t_352",Uu="_exported-fonts_qxa1t_359",Lu="_exported-css_qxa1t_359",Bu="_exported-font-files_qxa1t_373",qu="_font-file-table_qxa1t_381",zu="_font-name_qxa1t_397",$u="_font-file-size_qxa1t_400",Hu="_more-settings_qxa1t_431",Vu="_setting_qxa1t_447",Wu="_spinbox-setting_qxa1t_457",Ju="_footer_qxa1t_465",Ku="_github-link_qxa1t_473",L={exportPanel:Su,horizontal:ku,spacer:Tu,splitter:Fu,vertical:Au,row:Cu,growButton:Nu,cssPathPrefixBar:Iu,cssPathPrefix:Mu,cssPreview:Ru,exportButtons:Ou,loaderWrapper:Eu,exportFormats:ju,buttonRow:Pu,exportResults:Du,exportedFonts:Uu,exportedCss:Lu,exportedFontFiles:Bu,fontFileTable:qu,fontName:zu,fontFileSize:$u,moreSettings:Hu,setting:Vu,spinboxSetting:Wu,footer:Ju,githubLink:Ku};var Fs={},Gu=function(e,t,n,a,s){var i=new Worker(Fs[t]||(Fs[t]=URL.createObjectURL(new Blob([e+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return i.onmessage=function(r){var o=r.data,c=o.$e$;if(c){var u=new Error(c[0]);u.code=c[1],u.stack=c[2],s(u,null)}else s(null,o)},i.postMessage(n,a),i},ye=Uint8Array,je=Uint16Array,zn=Int32Array,$n=new ye([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Hn=new ye([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),pa=new ye([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Bi=function(e,t){for(var n=new je(31),a=0;a<31;++a)n[a]=t+=1<<e[a-1];for(var s=new zn(n[30]),a=1;a<30;++a)for(var i=n[a];i<n[a+1];++i)s[i]=i-n[a]<<5|a;return{b:n,r:s}},qi=Bi($n,2),Xu=qi.b,An=qi.r;Xu[28]=258,An[258]=28;var Zu=Bi(Hn,0),ga=Zu.r,Cn=new je(32768);for(var ee=0;ee<32768;++ee){var lt=(ee&43690)>>1|(ee&21845)<<1;lt=(lt&52428)>>2|(lt&13107)<<2,lt=(lt&61680)>>4|(lt&3855)<<4,Cn[ee]=((lt&65280)>>8|(lt&255)<<8)>>1}var Rt=function(e,t,n){for(var a=e.length,s=0,i=new je(t);s<a;++s)e[s]&&++i[e[s]-1];var r=new je(t);for(s=1;s<t;++s)r[s]=r[s-1]+i[s-1]<<1;var o;if(n){o=new je(1<<t);var c=15-t;for(s=0;s<a;++s)if(e[s])for(var u=s<<4|e[s],l=t-e[s],h=r[e[s]-1]++<<l,f=h|(1<<l)-1;h<=f;++h)o[Cn[h]>>c]=u}else for(o=new je(a),s=0;s<a;++s)e[s]&&(o[s]=Cn[r[e[s]-1]++]>>15-e[s]);return o},pt=new ye(288);for(var ee=0;ee<144;++ee)pt[ee]=8;for(var ee=144;ee<256;++ee)pt[ee]=9;for(var ee=256;ee<280;++ee)pt[ee]=7;for(var ee=280;ee<288;++ee)pt[ee]=8;var Yt=new ye(32);for(var ee=0;ee<32;++ee)Yt[ee]=5;var zi=Rt(pt,9,0),$i=Rt(Yt,5,0),Ba=function(e){return(e+7)/8|0},qa=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new ye(e.subarray(t,n))},Yu=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Pe=function(e,t,n){var a=new Error(t||Yu[e]);if(a.code=e,Error.captureStackTrace&&Error.captureStackTrace(a,Pe),!n)throw a;return a},We=function(e,t,n){n<<=t&7;var a=t/8|0;e[a]|=n,e[a+1]|=n>>8},Nt=function(e,t,n){n<<=t&7;var a=t/8|0;e[a]|=n,e[a+1]|=n>>8,e[a+2]|=n>>16},mn=function(e,t){for(var n=[],a=0;a<e.length;++a)e[a]&&n.push({s:a,f:e[a]});var s=n.length,i=n.slice();if(!s)return{t:$a,l:0};if(s==1){var r=new ye(n[0].s+1);return r[n[0].s]=1,{t:r,l:1}}n.sort(function(S,x){return S.f-x.f}),n.push({s:-1,f:25001});var o=n[0],c=n[1],u=0,l=1,h=2;for(n[0]={s:-1,f:o.f+c.f,l:o,r:c};l!=s-1;)o=n[n[u].f<n[h].f?u++:h++],c=n[u!=l&&n[u].f<n[h].f?u++:h++],n[l++]={s:-1,f:o.f+c.f,l:o,r:c};for(var f=i[0].s,a=1;a<s;++a)i[a].s>f&&(f=i[a].s);var p=new je(f+1),g=Nn(n[l-1],p,0);if(g>t){var a=0,y=0,v=g-t,m=1<<v;for(i.sort(function(x,A){return p[A.s]-p[x.s]||x.f-A.f});a<s;++a){var b=i[a].s;if(p[b]>t)y+=m-(1<<g-p[b]),p[b]=t;else break}for(y>>=v;y>0;){var w=i[a].s;p[w]<t?y-=1<<t-p[w]++-1:++a}for(;a>=0&&y;--a){var _=i[a].s;p[_]==t&&(--p[_],++y)}g=t}return{t:new ye(p),l:g}},Nn=function(e,t,n){return e.s==-1?Math.max(Nn(e.l,t,n+1),Nn(e.r,t,n+1)):t[e.s]=n},ma=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new je(++t),a=0,s=e[0],i=1,r=function(c){n[a++]=c},o=1;o<=t;++o)if(e[o]==s&&o!=t)++i;else{if(!s&&i>2){for(;i>138;i-=138)r(32754);i>2&&(r(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(r(s),--i;i>6;i-=6)r(8304);i>2&&(r(i-3<<5|8208),i=0)}for(;i--;)r(s);i=1,s=e[o]}return{c:n.subarray(0,a),n:t}},It=function(e,t){for(var n=0,a=0;a<t.length;++a)n+=e[a]*t[a];return n},za=function(e,t,n){var a=n.length,s=Ba(t+2);e[s]=a&255,e[s+1]=a>>8,e[s+2]=e[s]^255,e[s+3]=e[s+1]^255;for(var i=0;i<a;++i)e[s+i+4]=n[i];return(s+4+a)*8},ba=function(e,t,n,a,s,i,r,o,c,u,l){We(t,l++,n),++s[256];for(var h=mn(s,15),f=h.t,p=h.l,g=mn(i,15),y=g.t,v=g.l,m=ma(f),b=m.c,w=m.n,_=ma(y),S=_.c,x=_.n,A=new je(19),F=0;F<b.length;++F)++A[b[F]&31];for(var F=0;F<S.length;++F)++A[S[F]&31];for(var T=mn(A,7),E=T.t,U=T.l,B=19;B>4&&!E[pa[B-1]];--B);var de=u+5<<3,H=It(s,pt)+It(i,Yt)+r,ge=It(s,f)+It(i,y)+r+14+3*B+It(A,E)+2*A[16]+3*A[17]+7*A[18];if(c>=0&&de<=H&&de<=ge)return za(t,l,e.subarray(c,c+u));var ae,z,se,oe;if(We(t,l,1+(ge<H)),l+=2,ge<H){ae=Rt(f,p,0),z=f,se=Rt(y,v,0),oe=y;var Qe=Rt(E,U,0);We(t,l,w-257),We(t,l+5,x-1),We(t,l+10,B-4),l+=14;for(var F=0;F<B;++F)We(t,l+3*F,E[pa[F]]);l+=3*B;for(var De=[b,S],et=0;et<2;++et)for(var st=De[et],F=0;F<st.length;++F){var qe=st[F]&31;We(t,l,Qe[qe]),l+=E[qe],qe>15&&(We(t,l,st[F]>>5&127),l+=st[F]>>12)}}else ae=zi,z=pt,se=$i,oe=Yt;for(var F=0;F<o;++F){var k=a[F];if(k>255){var qe=k>>18&31;Nt(t,l,ae[qe+257]),l+=z[qe+257],qe>7&&(We(t,l,k>>23&31),l+=$n[qe]);var O=k&31;Nt(t,l,se[O]),l+=oe[O],O>3&&(Nt(t,l,k>>5&8191),l+=Hn[O])}else Nt(t,l,ae[k]),l+=z[k]}return Nt(t,l,ae[256]),l+z[256]},Hi=new zn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),$a=new ye(0),Vi=function(e,t,n,a,s,i){var r=i.z||e.length,o=new ye(a+r+5*(1+Math.ceil(r/7e3))+s),c=o.subarray(a,o.length-s),u=i.l,l=(i.r||0)&7;if(t){l&&(c[0]=i.r>>3);for(var h=Hi[t-1],f=h>>13,p=h&8191,g=(1<<n)-1,y=i.p||new je(32768),v=i.h||new je(g+1),m=Math.ceil(n/3),b=2*m,w=function(fe){return(e[fe]^e[fe+1]<<m^e[fe+2]<<b)&g},_=new zn(25e3),S=new je(288),x=new je(32),A=0,F=0,T=i.i||0,E=0,U=i.w||0,B=0;T+2<r;++T){var de=w(T),H=T&32767,ge=v[de];if(y[H]=ge,v[de]=H,U<=T){var ae=r-T;if((A>7e3||E>24576)&&(ae>423||!u)){l=ba(e,c,0,_,S,x,F,E,B,T-B,l),E=A=F=0,B=T;for(var z=0;z<286;++z)S[z]=0;for(var z=0;z<30;++z)x[z]=0}var se=2,oe=0,Qe=p,De=H-ge&32767;if(ae>2&&de==w(T-De))for(var et=Math.min(f,ae)-1,st=Math.min(32767,T),qe=Math.min(258,ae);De<=st&&--Qe&&H!=ge;){if(e[T+se]==e[T+se-De]){for(var k=0;k<qe&&e[T+k]==e[T+k-De];++k);if(k>se){if(se=k,oe=De,k>et)break;for(var O=Math.min(De,k-2),$=0,z=0;z<O;++z){var G=T-De+z&32767,R=y[G],j=G-R&32767;j>$&&($=j,ge=G)}}}H=ge,ge=y[H],De+=H-ge&32767}if(oe){_[E++]=268435456|An[se]<<18|ga[oe];var K=An[se]&31,Fe=ga[oe]&31;F+=$n[K]+Hn[Fe],++S[257+K],++x[Fe],U=T+se,++A}else _[E++]=e[T],++S[e[T]]}}for(T=Math.max(T,U);T<r;++T)_[E++]=e[T],++S[e[T]];l=ba(e,c,u,_,S,x,F,E,B,T-B,l),u||(i.r=l&7|c[l/8|0]<<3,l-=7,i.h=v,i.p=y,i.i=T,i.w=U)}else{for(var T=i.w||0;T<r+u;T+=65535){var Ae=T+65535;Ae>=r&&(c[l/8|0]=u,Ae=r),l=za(c,l+1,e.subarray(T,Ae))}i.i=r}return qa(o,0,a+Ba(l)+s)},Qu=function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,a=9;--a;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e}(),eh=function(){var e=-1;return{p:function(t){for(var n=e,a=0;a<t.length;++a)n=Qu[n&255^t[a]]^n>>>8;e=n},d:function(){return~e}}},Ha=function(e,t,n,a,s){if(!s&&(s={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),r=new ye(i.length+e.length);r.set(i),r.set(e,i.length),e=r,s.w=i.length}return Vi(e,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,a,s)},Wi=function(e,t){var n={};for(var a in e)n[a]=e[a];for(var a in t)n[a]=t[a];return n},As=function(e,t,n){for(var a=e(),s=e.toString(),i=s.slice(s.indexOf("[")+1,s.lastIndexOf("]")).replace(/\s+/g,"").split(","),r=0;r<a.length;++r){var o=a[r],c=i[r];if(typeof o=="function"){t+=";"+c+"=";var u=o.toString();if(o.prototype)if(u.indexOf("[native code]")!=-1){var l=u.indexOf(" ",8)+1;t+=u.slice(l,u.indexOf("(",l))}else{t+=u;for(var h in o.prototype)t+=";"+c+".prototype."+h+"="+o.prototype[h].toString()}else t+=u}else n[c]=o}return t},hn=[],th=function(e){var t=[];for(var n in e)e[n].buffer&&t.push((e[n]=new e[n].constructor(e[n])).buffer);return t},nh=function(e,t,n,a){if(!hn[n]){for(var s="",i={},r=e.length-1,o=0;o<r;++o)s=As(e[o],s,i);hn[n]={c:As(e[r],s,i),e:i}}var c=Wi({},hn[n].e);return Gu(hn[n].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",n,c,th(c),a)},ah=function(){return[ye,je,zn,$n,Hn,pa,An,ga,zi,pt,$i,Yt,Cn,Hi,$a,Rt,We,Nt,mn,Nn,ma,It,za,ba,Ba,qa,Vi,Ha,lh,sh]},sh=function(e){return postMessage(e,[e.buffer])},Cs=function(e){return e.ondata=function(t,n){return postMessage([t,n],[t.buffer])},function(t){t.data.length?(e.push(t.data[0],t.data[1]),postMessage([t.data[0].length])):e.flush()}},ih=function(e,t,n,a,s,i,r){var o,c=nh(e,a,s,function(u,l){u?(c.terminate(),t.ondata.call(t,u)):Array.isArray(l)?l.length==1?(t.queuedSize-=l[0],t.ondrain&&t.ondrain(l[0])):(l[1]&&c.terminate(),t.ondata.call(t,u,l[0],l[1])):r(l)});c.postMessage(n),t.queuedSize=0,t.push=function(u,l){t.ondata||Pe(5),o&&t.ondata(Pe(4,0,1),null,!!l),t.queuedSize+=u.length,c.postMessage([u,o=l],[u.buffer])},t.terminate=function(){c.terminate()},t.flush=function(){c.postMessage([])}},ue=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function rh(e,t){return typeof e=="function"&&(t=e,e={}),this.ondata=t,e}var Ns=function(){function e(t,n){if(typeof t=="function"&&(n=t,t={}),this.ondata=n,this.o=t||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new ye(98304),this.o.dictionary){var a=this.o.dictionary.subarray(-32768);this.b.set(a,32768-a.length),this.s.i=32768-a.length}}return e.prototype.p=function(t,n){this.ondata(Ha(t,this.o,0,0,this.s),n)},e.prototype.push=function(t,n){this.ondata||Pe(5),this.s.l&&Pe(4);var a=t.length+this.s.z;if(a>this.b.length){if(a>2*this.b.length-32768){var s=new ye(a&-32768);s.set(this.b.subarray(0,this.s.z)),this.b=s}var i=this.b.length-this.s.z;this.b.set(t.subarray(0,i),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(t.subarray(i),32768),this.s.z=t.length-i+32768,this.s.i=32766,this.s.w=32768}else this.b.set(t,this.s.z),this.s.z+=t.length;this.s.l=n&1,(this.s.z>this.s.w+8191||n)&&(this.p(this.b,n||!1),this.s.w=this.s.i,this.s.i-=2)},e.prototype.flush=function(){this.ondata||Pe(5),this.s.l&&Pe(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2},e}(),oh=function(){function e(t,n){ih([ah,function(){return[Cs,Ns]}],this,rh.call(this,t,n),function(a){var s=new Ns(a.data);onmessage=Cs(s)},6)}return e}();function lh(e,t){return Ha(e,t||{},0,0)}var Is=typeof TextEncoder<"u"&&new TextEncoder,ch=typeof TextDecoder<"u"&&new TextDecoder,uh=0;try{ch.decode($a,{stream:!0}),uh=1}catch{}function Ms(e,t){var n;if(Is)return Is.encode(e);for(var a=e.length,s=new ye(e.length+(e.length>>1)),i=0,r=function(u){s[i++]=u},n=0;n<a;++n){if(i+5>s.length){var o=new ye(i+8+(a-n<<1));o.set(s),s=o}var c=e.charCodeAt(n);c<128||t?r(c):c<2048?(r(192|c>>6),r(128|c&63)):c>55295&&c<57344?(c=65536+(c&1047552)|e.charCodeAt(++n)&1023,r(240|c>>18),r(128|c>>12&63),r(128|c>>6&63),r(128|c&63)):(r(224|c>>12),r(128|c>>6&63),r(128|c&63))}return qa(s,0,i)}var hh=function(e){return e==1?3:e<6?2:e==9?1:0},bn=function(e){var t=0;if(e)for(var n in e){var a=e[n].length;a>65535&&Pe(9),t+=a+4}return t},Rs=function(e,t,n,a,s,i,r,o){var c=a.length,u=n.extra,l=o&&o.length,h=bn(u);ue(e,t,r!=null?33639248:67324752),t+=4,r!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(i<0&&8),e[t++]=s&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var f=new Date(n.mtime==null?Date.now():n.mtime),p=f.getFullYear()-1980;if((p<0||p>119)&&Pe(10),ue(e,t,p<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),t+=4,i!=-1&&(ue(e,t,n.crc),ue(e,t+4,i<0?-i-2:i),ue(e,t+8,n.size)),ue(e,t+12,c),ue(e,t+14,h),t+=16,r!=null&&(ue(e,t,l),ue(e,t+6,n.attrs),ue(e,t+10,r),t+=14),e.set(a,t),t+=c,h)for(var g in u){var y=u[g],v=y.length;ue(e,t,+g),ue(e,t+2,v),e.set(y,t+4),t+=4+v}return l&&(e.set(o,t),t+=l),t},dh=function(e,t,n,a,s){ue(e,t,101010256),ue(e,t+8,n),ue(e,t+10,n),ue(e,t+12,a),ue(e,t+16,s)},In=function(){function e(t){this.filename=t,this.c=eh(),this.size=0,this.compression=0}return e.prototype.process=function(t,n){this.ondata(null,t,n)},e.prototype.push=function(t,n){this.ondata||Pe(5),this.c.p(t),this.size+=t.length,n&&(this.crc=this.c.d()),this.process(t,n||!1)},e}(),Os=function(){function e(t,n){var a=this;n||(n={}),In.call(this,t),this.d=new oh(n,function(s,i,r){a.ondata(s,i,r)}),this.compression=8,this.flag=hh(n.level),this.terminate=this.d.terminate}return e.prototype.process=function(t,n){this.d.push(t,n)},e.prototype.push=function(t,n){In.prototype.push.call(this,t,n)},e}(),fh=function(){function e(t){this.ondata=t,this.u=[],this.d=1}return e.prototype.add=function(t){var n=this;if(this.ondata||Pe(5),this.d&2)this.ondata(Pe(4+(this.d&1)*8,0,1),null,!1);else{var a=Ms(t.filename),s=a.length,i=t.comment,r=i&&Ms(i),o=s!=t.filename.length||r&&i.length!=r.length,c=s+bn(t.extra)+30;s>65535&&this.ondata(Pe(11,0,1),null,!1);var u=new ye(c);Rs(u,0,t,a,o,-1);var l=[u],h=function(){for(var v=0,m=l;v<m.length;v++){var b=m[v];n.ondata(null,b,!1)}l=[]},f=this.d;this.d=0;var p=this.u.length,g=Wi(t,{f:a,u:o,o:r,t:function(){t.terminate&&t.terminate()},r:function(){if(h(),f){var v=n.u[p+1];v?v.r():n.d=1}f=1}}),y=0;t.ondata=function(v,m,b){if(v)n.ondata(v,m,b),n.terminate();else if(y+=m.length,l.push(m),b){var w=new ye(16);ue(w,0,134695760),ue(w,4,t.crc),ue(w,8,y),ue(w,12,t.size),l.push(w),g.c=y,g.b=c+y+16,g.crc=t.crc,g.size=t.size,f&&g.r(),f=1}else f&&h()},this.u.push(g)}},e.prototype.end=function(){var t=this;if(this.d&2){this.ondata(Pe(4+(this.d&1)*8,0,1),null,!0);return}this.d?this.e():this.u.push({r:function(){t.d&1&&(t.u.splice(-1,1),t.e())},t:function(){}}),this.d=3},e.prototype.e=function(){for(var t=0,n=0,a=0,s=0,i=this.u;s<i.length;s++){var r=i[s];a+=46+r.f.length+bn(r.extra)+(r.o?r.o.length:0)}for(var o=new ye(a+22),c=0,u=this.u;c<u.length;c++){var r=u[c];Rs(o,t,r,r.f,r.u,-r.c-2,n,r.o),t+=46+r.f.length+bn(r.extra)+(r.o?r.o.length:0),n+=r.b}dh(o,t,this.u.length,a,n),this.ondata(null,o,!0),this.d=2},e.prototype.terminate=function(){for(var t=0,n=this.u;t<n.length;t++){var a=n[t];a.t()}this.d=2},e}();const ph=(e,t)=>{const n=[];let a,s;const i=new Promise((c,u)=>{a=c,s=u}),r=new fh((c,u,l)=>{if(c){r.terminate(),s(c);return}if(n.push(u),l){const h=new Blob(n,{type:"application/zip"});a(h)}}),o=new Os("fonts.css");r.add(o),o.push(new TextEncoder().encode(t),!0);for(const{filename:c,data:u,font:{format:l}}of e){if(u.opentype){const h=l==="opentype"?".otf":".ttf",f=new Os(c+h);r.add(f),f.push(u.opentype.slice(),!0)}if(u.woff){const h=new In(c+".woff");r.add(h),h.push(u.woff,!0)}if(u.woff2){const h=new In(c+".woff2");r.add(h),h.push(u.woff2,!0)}}return r.end(),i},$t=(e,t)=>{const n=document.createElement("a"),a=URL.createObjectURL(t);n.href=a,n.download=e,n.click(),setTimeout(()=>{window.URL.revokeObjectURL(a)},0)},gh=(e,t,n,a)=>{const s=Ge(e),i=be(null),r=be(null),o=C(u=>{r.current=u},[s]);return{resizerRef:C(u=>{if(i.current&&(i.current.abort(),i.current=null),!u)return;const l=new AbortController;i.current=l;let h,f;const p=g=>{var b;g.preventDefault(),g.stopPropagation();const y=a==="vertical"?g.clientY:g.clientX,v=(b=r.current)==null?void 0:b.getBoundingClientRect();if(!v)return;const m=a==="vertical"?v.height:v.width;h=w=>{w.preventDefault(),w.stopPropagation();const _=(a==="vertical"?w.clientY:w.clientX)-y,S=m-_;S>=t&&S<=n&&(s.value=S)},f=()=>{document.removeEventListener("pointermove",h),document.removeEventListener("pointerup",f),document.removeEventListener("pointerleave",f)},document.addEventListener("pointermove",h,{signal:l.signal}),document.addEventListener("pointerup",f,{signal:l.signal}),document.addEventListener("pointerleave",f,{signal:l.signal})};u&&u.addEventListener("pointerdown",p,{signal:l.signal})},[t,n,s,a]),panelRef:o,panelSize:s}},mh="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xml:space='preserve'%20width='128'%20height='128'%3e%3cpath%20fill='%23fcc21b'%20d='M125.74%2074.99c7.79-29.66-8.507-56.66-38.005-62.083C24.313%201.249-3.8%2053.67.83%2094.54c0%2013.63%2028.17%2024.69%2062.93%2024.69%2032.58%200%2059.37-9.73%2062.59-22.17q.33-1.245.33-2.52c.01-6.48-4.12-7.46-.94-19.55'/%3e%3cpath%20fill='%232f2f2f'%20d='M28.073%2042.118c2.28-4.54%207.2-6.69%2010.99-4.84%203.78%201.86%205.01%207.03%202.74%2011.56s-7.18%206.69-10.97%204.83c-3.78-1.86-5.02-7.04-2.76-11.55M93.541%2053.449c-1.09%205.07-5.41%208.47-9.65%207.59-4.27-.89-6.84-5.72-5.77-10.79%201.09-5.08%205.41-8.48%209.67-7.59%204.25.87%206.83%205.69%205.75%2010.79'/%3e%3cpath%20fill='%23fcc21b'%20d='M10.415%2046.678c1.349-9.29%201.124-28.397%202.622-35.664C14.536%203.746%2017.721.823%2025.1%206.594c6.955%205.439%2012.337%2010.322%2014.386%2011.528M102.41%2018.649c5.563-3.656%2014.517-8%2018.119-8.636%203.548-.626%207.682-.212%207.1%205.404-.678%206.53-3.391%2020.132-3.286%2027.338'/%3e%3cpath%20fill='none'%20stroke='%232f2f2f'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='6'%20d='M38.677%2063.99c1.309%204.264%204.257%2011.373%206.04%2013.249%202.967-2.225%209.093-8.665%209.94-9.725%202.506%202.594%205.863%208.868%208.59%2012.043%203.39-2.119%209.473-7.929%2011.28-9.673'/%3e%3cpath%20fill='%232f2f2f'%20d='M28.621%2061.813c.317%203.329-20.531%202.594-20.455%201.124.08-1.53%2020.224-3.549%2020.455-1.124M25.699%2070.3c2.007%202.675-19.201%2012.794-20.05%2010.383-.706-2.005%2019.418-11.226%2020.05-10.383M89.517%2069.914c.45-3.314%2020.957%202.485%2020.548%203.9-.426%201.472-20.875-1.486-20.548-3.9M88.278%2079.466c.905-.914%2019.818%2010.186%2018.207%2011.94-2.587%202.817-19.439-10.697-18.207-11.94'/%3e%3c/svg%3e",bh={[q.Whitespace]:null,[q.DefinitionKeyword]:"dk",[q.OperatorKeyword]:"ok",[q.Keyword]:"kw",[q.PropertyName]:"pn",[q.Paren]:"p",[q.Brace]:"b",[q.Punctuation]:"pu",[q.String]:"s",[q.Number]:"n",[q.Separator]:"se"},yh=({fonts:e})=>{const{cssPathPrefix:t,exportSettings:n}=Ze(),a=Ua(t,500,!0),s=Le(()=>{const r=Aa(e,a.value,n.includeTTFinCSS.value);return r.spans.length>0&&r.spans[r.spans.length-1].type===q.Whitespace&&r.spans.pop(),r},[e,a.value,n.includeTTFinCSS.value]),i=r=>{if(!r)return;const o=new DocumentFragment;for(const c of s.spans){const u=document.createElement("span"),l=bh[c.type];l!==null&&u.setAttribute("class",`hl-${l}`),u.append(c.text),o.appendChild(u)}r.replaceChildren(o)};return Le(()=>d("pre",{className:L.cssPreview,ref:i}),[s])},vh=({fonts:e,exportedFormats:t})=>{const{cssPathPrefix:n,exportSettings:a}=Ze(),s=Ge(!1),i=C(async()=>{s.value=!0;const r=await ph(e,Aa(e,n.value,a.includeTTFinCSS.value).getString());$t("fonts.zip",r),s.value=!1},[e,n,a.includeTTFinCSS]);return d("div",{className:L.exportedFonts,children:[d("div",{className:L.exportedFontFiles,children:d("table",{className:te(L.fontFileTable,"fancy-table"),children:[d("thead",{children:d("tr",{children:[d("th",{scope:"col",children:"Filename"}),t.ttf&&d("th",{scope:"col",children:"TTF/OTF"}),t.woff&&d("th",{scope:"col",children:"WOFF"}),t.woff2&&d("th",{scope:"col",children:"WOFF2"})]})}),d("tbody",{children:e.map(({filename:r,data:o})=>d("tr",{children:[d("td",{className:L.fontName,children:r}),t.ttf&&d("td",{className:L.fontFileSize,children:o.opentype?d(Je,{children:[d("span",{children:[gn(o.opentype.length)," "]}),d($e,{type:"download",title:"Download",onClick:()=>$t(r+".ttf",new Blob([o.opentype],{type:"font/ttf"}))})]}):null}),t.woff&&d("td",{className:L.fontFileSize,children:o.woff?d(Je,{children:[d("span",{children:[gn(o.woff.length)," "]}),d($e,{type:"download",title:"Download",onClick:()=>$t(r+".woff",new Blob([o.woff],{type:"font/woff"}))})]}):null}),t.woff2&&d("td",{className:L.fontFileSize,children:o.woff2?d(Je,{children:[d("span",{children:[gn(o.woff2.length)," "]}),d($e,{type:"download",title:"Download",onClick:()=>$t(r+".woff2",new Blob([o.woff2],{type:"font/woff2"}))})]}):null})]}))})]})}),d(xt,{onClick:i,disabled:s.value,children:[s.value?d(Zt,{size:24}):d(Ee,{type:"download",title:""}),d("span",{children:"Download .zip"})]})]})},wh=({fonts:e})=>{const{cssPathPrefix:t,exportSettings:n}=Ze(),a=C(()=>{ji(Aa(e,t.value,n.includeTTFinCSS.value).getString())},[e,t,n.includeTTFinCSS]);return d("div",{className:L.exportedCss,children:[d("div",{className:L.cssPathPrefixBar,children:[d("label",{children:"CSS path prefix:"}),d(Bn,{className:L.cssPathPrefix,value:t}),d($e,{type:"copy",title:"Copy CSS to clipboard",onClick:a})]}),d(yh,{fonts:e})]})},_h=({relativeTo:e,active:t})=>{const{reference:n,floating:a}=Mi(()=>({placement:"bottom",middleware:[Ai(4),Ci({padding:8}),Ii({apply({availableWidth:o,availableHeight:c,elements:u}){const{floating:l}=u;l.style.maxWidth=`${o}px`,l.style.maxHeight=`${c}px`},padding:8}),Ni()]}));n(e.current);const s=o=>{a(o),o==null||o.focus()},i=C(o=>{var c;(!o.relatedTarget||o.relatedTarget!==e.current&&((c=o.currentTarget)==null?void 0:c.contains(o.relatedTarget))===!1)&&(t.value=!1)},[]),{exportSettings:r}=Ze();return t.value?d(Da,{children:d("div",{className:L.moreSettings,tabIndex:0,ref:s,onBlur:i,children:[d("div",{className:te(L.setting,L.spinboxSetting),children:[d("label",{children:"WOFF compression level"}),d(Wt,{min:1,max:100,step:1,value:r.woffCompression})]}),d("div",{className:te(L.setting,L.spinboxSetting),children:[d("label",{children:"WOFF2 compression level"}),d(Wt,{min:1,max:11,step:1,value:r.woff2Compression})]}),d("div",{className:L.setting,children:d(ut,{label:"Include .ttf/.otf in CSS",checked:r.includeTTFinCSS})})]})}):null},xh=()=>{const e=Ze(),{fonts:t,fontsBeingLoaded:n,exportSettings:a}=e,s=qn(),i=C(()=>{e.exportFonts().catch(b=>{s("Failed to export fonts",b)})},[e]),r=C(()=>{Di().then(async b=>{b&&await e.addFonts(Array.from(b))}).catch(b=>{s("Failed to upload fonts",b)})},[e,s]),o=C(()=>{e.googleFontsModalState.open.value=!0},[e.googleFontsModalState.open]),c=C(()=>{const b=e.saveAllSettings(),w=new Blob([new TextEncoder().encode(JSON.stringify(b))],{type:"application/json"});$t("settings.json",w)},[e]),u=C(()=>{Pi({accept:".json"}).then(async b=>{if(b&&b.length>0){const _=await b[0].text(),S=JSON.parse(_);e.loadAllSettings(S)}}).catch(b=>{s("Failed to load settings",b)})},[e,s]),l=Ge(!1),h=be(null),[f,p]=Gs(()=>window.matchMedia("(orientation: portrait)").matches);Gt(()=>{const b=window.matchMedia("(orientation: portrait)"),w=_=>{p(_.matches)};return b.addEventListener("change",w),()=>{b.removeEventListener("change",w)}},[f]);const{resizerRef:g,panelRef:y,panelSize:v}=gh(500,f?200:400,1e4,f?"vertical":"horizontal");if(t.value.length===0)return null;let m=null;if(e.exportedFonts.value.state==="loaded"){const{exportedFonts:b,exportedFormats:w}=e.exportedFonts.value;m=d("div",{className:L.exportResults,children:[d(vh,{fonts:b,exportedFormats:w}),d(wh,{fonts:b})]})}else if(e.exportedFonts.value.state==="loading"){const{progress:b}=e.exportedFonts.value;m=d("div",{className:L.loaderWrapper,children:d(Zt,{size:128,className:L.exportLoader,progress:b})})}return d("div",{className:te(L.exportPanel,f?L.vertical:L.horizontal),ref:y,style:{[f?"height":"width"]:`${v.value}px`},children:[d("div",{className:L.splitter,ref:g}),d("div",{className:L.exportButtons,children:[d("div",{className:L.row,children:[d(xt,{onClick:i,disabled:e.exportedFonts.value.state==="loading",className:L.growButton,children:"Export"}),d("div",{className:L.exportFormats,children:[d(ut,{label:"TTF/OTF",checked:a.formats.ttf}),d(ut,{label:"WOFF",checked:a.formats.woff}),d(ut,{label:"WOFF2",checked:a.formats.woff2})]}),d(zc,{type:"gear",title:"More settings",toggled:l,innerRef:h})]}),d(_h,{relativeTo:h,active:l}),d("div",{className:L.buttonRow,children:[d(xt,{onClick:c,children:[d(Ee,{type:"download",title:""}),"Save settings"]}),d(xt,{onClick:u,children:[d(Ee,{type:"upload",title:""}),"Load settings"]})]}),d("div",{className:L.buttonRow,children:[d(xt,{onClick:r,children:[n.value>0?d(Zt,{size:24}):d(Ee,{type:"plus",title:""}),"Upload more fonts"]}),d(xt,{onClick:o,children:[d(Ee,{type:"globe",title:""}),"Browse Google Fonts"]})]})]}),m,d("div",{className:L.spacer}),d("div",{className:L.footer,children:[d("span",{children:["Made with ",d("img",{src:mh,alt:"blobCat",width:"128",height:"128",style:"width: 1em; height: 1em; vertical-align: middle"})," by ",d("a",{href:"https://github.com/valadaptive",children:"valadaptive"})]}),d("div",{className:L.spacer}),d("a",{href:"https://github.com/valadaptive/glypht",className:L.githubLink,children:d(Ee,{type:"github",title:"View this project on GitHub",clickableStyle:!0,size:"1rem"})})]})]})},Sh="_tabular-nums_18hlm_81",kh="_loading_18hlm_132",Th="_loader_18hlm_219",Fh="_spin_18hlm_1",Ah="_fancy-table_18hlm_155",Ch="_hl-dk_18hlm_174",Nh="_hl-ok_18hlm_178",Ih="_hl-kw_18hlm_182",Mh="_hl-p_18hlm_186",Rh="_hl-b_18hlm_190",Oh="_hl-pu_18hlm_194",Eh="_hl-s_18hlm_198",jh="_hl-n_18hlm_202",Ph="_hl-se_18hlm_206",Dh="_fonts-modal_18hlm_210",Uh="_loader-positioner_18hlm_219",Lh="_top-bar_18hlm_226",Bh="_search-box_18hlm_235",qh="_panes_18hlm_239",zh="_mobile-back-button_18hlm_245",$h="_mobile-filters-button_18hlm_246",Hh="_list-and-preview_18hlm_250",Vh="_fonts-list_18hlm_254",Wh="_fonts-list-sort_18hlm_263",Jh="_fonts-list-fonts_18hlm_270",Kh="_fonts-list-fonts-inner_18hlm_275",Gh="_font-item_18hlm_279",Xh="_selected_18hlm_292",Zh="_add-font-button_18hlm_295",Yh="_font-name_18hlm_299",Qh="_add-font-loader_18hlm_309",ed="_font-preview-header_18hlm_317",td="_font-meta_18hlm_328",nd="_font-meta-line_18hlm_334",ad="_font-preview_18hlm_317",sd="_filters-pane_18hlm_347",id="_filter-group_18hlm_354",rd="_filter-group-title_18hlm_361",od="_filter-toggle_18hlm_368",ld="_preview-controls_18hlm_372",cd="_preview-text-input_18hlm_378",ud="_preview-font-size_18hlm_387",hd="_preview-font-size-slider_18hlm_397",dd="_preview-content_18hlm_401",fd="_preview-samples_18hlm_408",pd="_font-sample_18hlm_414",gd="_font-style-name_18hlm_421",md="_font-style-preview_18hlm_429",bd="_section-header_18hlm_434",yd="_supported-languages_18hlm_439",vd="_script-langs_18hlm_444",wd="_supported-lang_18hlm_439",_d="_script-title_18hlm_458",xd="_axis-controls_18hlm_462",Sd="_axis-controls-body_18hlm_470",kd="_axis-controls-title_18hlm_476",Td="_axis-label_18hlm_483",Fd="_axis-inputs_18hlm_490",Ad="_axis-slider_18hlm_496",Cd="_axis-spin-box_18hlm_500",Nd="_hide_18hlm_504",Id="_mobile-preview_18hlm_520",Md="_filters-expanded_18hlm_540",Es={"tabular-nums":"_tabular-nums_18hlm_81",tabularNums:Sh,loading:kh,loader:Th,spin:Fh,"fancy-table":"_fancy-table_18hlm_155",fancyTable:Ah,"hl-dk":"_hl-dk_18hlm_174",hlDk:Ch,"hl-ok":"_hl-ok_18hlm_178",hlOk:Nh,"hl-kw":"_hl-kw_18hlm_182",hlKw:Ih,"hl-p":"_hl-p_18hlm_186",hlP:Mh,"hl-b":"_hl-b_18hlm_190",hlB:Rh,"hl-pu":"_hl-pu_18hlm_194",hlPu:Oh,"hl-s":"_hl-s_18hlm_198",hlS:Eh,"hl-n":"_hl-n_18hlm_202",hlN:jh,"hl-se":"_hl-se_18hlm_206",hlSe:Ph,"fonts-modal":"_fonts-modal_18hlm_210",fontsModal:Dh,"loader-positioner":"_loader-positioner_18hlm_219",loaderPositioner:Uh,"top-bar":"_top-bar_18hlm_226",topBar:Lh,"search-box":"_search-box_18hlm_235",searchBox:Bh,panes:qh,"mobile-back-button":"_mobile-back-button_18hlm_245",mobileBackButton:zh,"mobile-filters-button":"_mobile-filters-button_18hlm_246",mobileFiltersButton:$h,"list-and-preview":"_list-and-preview_18hlm_250",listAndPreview:Hh,"fonts-list":"_fonts-list_18hlm_254",fontsList:Vh,"fonts-list-sort":"_fonts-list-sort_18hlm_263",fontsListSort:Wh,"fonts-list-fonts":"_fonts-list-fonts_18hlm_270",fontsListFonts:Jh,"fonts-list-fonts-inner":"_fonts-list-fonts-inner_18hlm_275",fontsListFontsInner:Kh,"font-item":"_font-item_18hlm_279",fontItem:Gh,selected:Xh,"add-font-button":"_add-font-button_18hlm_295",addFontButton:Zh,"font-name":"_font-name_18hlm_299",fontName:Yh,"add-font-loader":"_add-font-loader_18hlm_309",addFontLoader:Qh,"font-preview-header":"_font-preview-header_18hlm_317",fontPreviewHeader:ed,"font-meta":"_font-meta_18hlm_328",fontMeta:td,"font-meta-line":"_font-meta-line_18hlm_334",fontMetaLine:nd,"font-preview":"_font-preview_18hlm_317",fontPreview:ad,"filters-pane":"_filters-pane_18hlm_347",filtersPane:sd,"filter-group":"_filter-group_18hlm_354",filterGroup:id,"filter-group-title":"_filter-group-title_18hlm_361",filterGroupTitle:rd,"filter-toggle":"_filter-toggle_18hlm_368",filterToggle:od,"preview-controls":"_preview-controls_18hlm_372",previewControls:ld,"preview-text-input":"_preview-text-input_18hlm_378",previewTextInput:cd,"preview-font-size":"_preview-font-size_18hlm_387",previewFontSize:ud,"preview-font-size-slider":"_preview-font-size-slider_18hlm_397",previewFontSizeSlider:hd,"preview-content":"_preview-content_18hlm_401",previewContent:dd,"preview-samples":"_preview-samples_18hlm_408",previewSamples:fd,"font-sample":"_font-sample_18hlm_414",fontSample:pd,"font-style-name":"_font-style-name_18hlm_421",fontStyleName:gd,"font-style-preview":"_font-style-preview_18hlm_429",fontStylePreview:md,"section-header":"_section-header_18hlm_434",sectionHeader:bd,"supported-languages":"_supported-languages_18hlm_439",supportedLanguages:yd,"script-langs":"_script-langs_18hlm_444",scriptLangs:vd,"supported-lang":"_supported-lang_18hlm_439",supportedLang:wd,"script-title":"_script-title_18hlm_458",scriptTitle:_d,"axis-controls":"_axis-controls_18hlm_462",axisControls:xd,"axis-controls-body":"_axis-controls-body_18hlm_470",axisControlsBody:Sd,"axis-controls-title":"_axis-controls-title_18hlm_476",axisControlsTitle:kd,"axis-label":"_axis-label_18hlm_483",axisLabel:Td,"axis-inputs":"_axis-inputs_18hlm_490",axisInputs:Fd,"axis-slider":"_axis-slider_18hlm_496",axisSlider:Ad,"axis-spin-box":"_axis-spin-box_18hlm_500",axisSpinBox:Cd,hide:Nd,"mobile-preview":"_mobile-preview_18hlm_520",mobilePreview:Id,"filters-expanded":"_filters-expanded_18hlm_540",filtersExpanded:Md},Rd="_modal-wrapper_1dxnj_51",Od="_modal-bg_1dxnj_60",Ed="_modal-positioner_1dxnj_69",jd="_modal_1dxnj_51",dn={modalWrapper:Rd,modalBg:Od,modalPositioner:Ed,modal:jd},Pd=({onClose:e,children:t,className:n})=>d("div",{className:dn.modalWrapper,children:[d("div",{className:dn.modalBg,onClick:e}),d("div",{className:dn.modalPositioner,children:d("div",{className:te(dn.modal,n),children:t})})]}),Dd=()=>{const e=Ze(),{googleFontsModalState:t}=e,n=t.state.value;n.state==="not_loaded"&&_n(async()=>{const{default:i,axesList:r,langList:o}=await import("./GoogleFontsModalInner-CGqE_oFq.js");return{default:i,axesList:r,langList:o}},[]).then(({default:i,axesList:r,langList:o})=>{r.sort((l,h)=>h.popularity-l.popularity);const c={};for(const l of r)c[l.tag]=I(!1);const u={};for(const l of o.languages)u[l.id]=I(!1);t.state.value={state:"loaded",selectedAxes:c,selectedLanguages:u,ModalComponent:i}},i=>{t.state.value={state:"error",error:i}});let a;switch(n.state){case"loading":case"not_loaded":a=d("div",{className:Es.loaderPositioner,children:d(Zt,{})});break;case"error":a=String(n.error);break;case"loaded":{const{ModalComponent:i}=n;a=d(i,{fontsListState:n});break}}const s=C(()=>{t.open.value=!1},[t.open]);return d(Pd,{onClose:s,className:Es.fontsModal,children:a})},Ud=()=>{const e=Ze();return d("div",{className:Jn.app,children:[d("div",{className:Jn.displayPane,children:[d("div",{className:Jn.mainPane,children:d(xu,{})}),d(xh,{})]}),e.googleFontsModalState.open.value?d(Dd,{}):null]})},Ld=Lo();function Bd(){return d(gi.Provider,{value:Ld,children:d(qc,{children:d(du,{children:d(Ud,{})})})})}document.body.className="";er(d(Bd,{}),document.body);export{ut as C,qd as D,$e as I,Zt as L,zd as S,Le as T,Ze as a,Ta as b,Ua as c,Ln as d,d as e,te as f,Bn as g,zc as h,I as i,pu as j,Je as k,Wt as l,$d as m,qn as n,Xs as o,$c as p,C as q,Es as s,Ge as u};
