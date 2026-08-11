var ht=Object.defineProperty;var ut=Object.getOwnPropertyDescriptor;var o=(s,t,e,i)=>{for(var r=i>1?void 0:i?ut(t,e):t,n=s.length-1,a;n>=0;n--)(a=s[n])&&(r=(i?a(t,e,r):a(r))||r);return i&&r&&ht(t,e,r),r};var le=globalThis,pe=le.ShadowRoot&&(le.ShadyCSS===void 0||le.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ee=Symbol(),Ue=new WeakMap,te=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(pe&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Ue.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ue.set(e,t))}return t}toString(){return this.cssText}},He=s=>new te(typeof s=="string"?s:s+"",void 0,Ee),b=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((i,r,n)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1],s[0]);return new te(e,s,Ee)},Ne=(s,t)=>{if(pe)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=le.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},ke=pe?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return He(e)})(s):s;var{is:mt,defineProperty:gt,getOwnPropertyDescriptor:ft,getOwnPropertyNames:vt,getOwnPropertySymbols:bt,getPrototypeOf:xt}=Object,ce=globalThis,Oe=ce.trustedTypes,yt=Oe?Oe.emptyScript:"",$t=ce.reactiveElementPolyfillSupport,ie=(s,t)=>s,re={toAttribute(s,t){switch(t){case Boolean:s=s?yt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},de=(s,t)=>!mt(s,t),De={attribute:!0,type:String,converter:re,reflect:!1,useDefault:!1,hasChanged:de};Symbol.metadata??=Symbol("metadata"),ce.litPropertyMetadata??=new WeakMap;var C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=De){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&gt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:n}=ft(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:r,set(a){let c=r?.call(this);n?.call(this,a),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??De}static _$Ei(){if(this.hasOwnProperty(ie("elementProperties")))return;let t=xt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ie("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ie("properties"))){let e=this.properties,i=[...vt(e),...bt(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(ke(r))}else t!==void 0&&e.push(ke(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ne(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:re).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let n=i.getPropertyOptions(r),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:re;this._$Em=r;let c=a.fromAttribute(e,n.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(t,e,i,r=!1,n){if(t!==void 0){let a=this.constructor;if(r===!1&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??de)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),n!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,n]of i){let{wrapped:a}=n,c=this[r];a!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[ie("elementProperties")]=new Map,C[ie("finalized")]=new Map,$t?.({ReactiveElement:C}),(ce.reactiveElementVersions??=[]).push("2.1.2");var Se=globalThis,Fe=s=>s,he=Se.trustedTypes,Be=he?he.createPolicy("lit-html",{createHTML:s=>s}):void 0,Ae="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,Le="?"+R,wt=`<${Le}>`,j=document,ne=()=>j.createComment(""),oe=s=>s===null||typeof s!="object"&&typeof s!="function",Te=Array.isArray,Ve=s=>Te(s)||typeof s?.[Symbol.iterator]=="function",_e=`[ 	
\f\r]`,se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,je=/-->/g,Ge=/>/g,F=RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qe=/'/g,We=/"/g,Ke=/^(?:script|style|textarea|title)$/i,Ie=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),l=Ie(1),Dt=Ie(2),Ft=Ie(3),M=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Ye=new WeakMap,B=j.createTreeWalker(j,129);function Qe(s,t){if(!Te(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Be!==void 0?Be.createHTML(t):t}var Je=(s,t)=>{let e=s.length-1,i=[],r,n=t===2?"<svg>":t===3?"<math>":"",a=se;for(let c=0;c<e;c++){let p=s[c],x,w,u=-1,$=0;for(;$<p.length&&(a.lastIndex=$,w=a.exec(p),w!==null);)$=a.lastIndex,a===se?w[1]==="!--"?a=je:w[1]!==void 0?a=Ge:w[2]!==void 0?(Ke.test(w[2])&&(r=RegExp("</"+w[2],"g")),a=F):w[3]!==void 0&&(a=F):a===F?w[0]===">"?(a=r??se,u=-1):w[1]===void 0?u=-2:(u=a.lastIndex-w[2].length,x=w[1],a=w[3]===void 0?F:w[3]==='"'?We:qe):a===We||a===qe?a=F:a===je||a===Ge?a=se:(a=F,r=void 0);let y=a===F&&s[c+1].startsWith("/>")?" ":"";n+=a===se?p+wt:u>=0?(i.push(x),p.slice(0,u)+Ae+p.slice(u)+R+y):p+R+(u===-2?c:y)}return[Qe(s,n+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},ae=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,a=0,c=t.length-1,p=this.parts,[x,w]=Je(t,e);if(this.el=s.createElement(x,i),B.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=B.nextNode())!==null&&p.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let u of r.getAttributeNames())if(u.endsWith(Ae)){let $=w[a++],y=r.getAttribute(u).split(R),k=/([.?@])?(.*)/.exec($);p.push({type:1,index:n,name:k[2],strings:y,ctor:k[1]==="."?me:k[1]==="?"?ge:k[1]==="@"?fe:q}),r.removeAttribute(u)}else u.startsWith(R)&&(p.push({type:6,index:n}),r.removeAttribute(u));if(Ke.test(r.tagName)){let u=r.textContent.split(R),$=u.length-1;if($>0){r.textContent=he?he.emptyScript:"";for(let y=0;y<$;y++)r.append(u[y],ne()),B.nextNode(),p.push({type:2,index:++n});r.append(u[$],ne())}}}else if(r.nodeType===8)if(r.data===Le)p.push({type:2,index:n});else{let u=-1;for(;(u=r.data.indexOf(R,u+1))!==-1;)p.push({type:7,index:n}),u+=R.length-1}n++}}static createElement(t,e){let i=j.createElement("template");return i.innerHTML=t,i}};function G(s,t,e=s,i){if(t===M)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl,n=oe(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=G(s,r._$AS(s,t.values),r,i)),t}var ue=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??j).importNode(e,!0);B.currentNode=r;let n=B.nextNode(),a=0,c=0,p=i[0];for(;p!==void 0;){if(a===p.index){let x;p.type===2?x=new V(n,n.nextSibling,this,t):p.type===1?x=new p.ctor(n,p.name,p.strings,this,t):p.type===6&&(x=new ve(n,this,t)),this._$AV.push(x),p=i[++c]}a!==p?.index&&(n=B.nextNode(),a++)}return B.currentNode=j,r}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},V=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),oe(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==M&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ve(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==g&&oe(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=ae.createElement(Qe(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new ue(r,this),a=n.u(this.options);n.p(e),this.T(a),this._$AH=n}}_$AC(t){let e=Ye.get(t.strings);return e===void 0&&Ye.set(t.strings,e=new ae(t)),e}k(t){Te(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let n of t)r===e.length?e.push(i=new s(this.O(ne()),this.O(ne()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Fe(t).nextSibling;Fe(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(t,e=this,i,r){let n=this.strings,a=!1;if(n===void 0)t=G(this,t,e,0),a=!oe(t)||t!==this._$AH&&t!==M,a&&(this._$AH=t);else{let c=t,p,x;for(t=n[0],p=0;p<n.length-1;p++)x=G(this,c[i+p],e,p),x===M&&(x=this._$AH[p]),a||=!oe(x)||x!==this._$AH[p],x===g?t=g:t!==g&&(t+=(x??"")+n[p+1]),this._$AH[p]=x}a&&!r&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},me=class extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}},ge=class extends q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}},fe=class extends q{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??g)===M)return;let i=this._$AH,r=t===g&&i!==g||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==g&&(i===g||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ve=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}},Ze={M:Ae,P:R,A:Le,C:1,L:Je,R:ue,D:Ve,V:G,I:V,H:q,N:ge,U:fe,B:me,F:ve},Et=Se.litHtmlPolyfillSupport;Et?.(ae,V),(Se.litHtmlVersions??=[]).push("3.3.3");var Xe=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let n=e?.renderBefore??null;i._$litPart$=r=new V(t.insertBefore(ne(),n),n,void 0,e??{})}return r._$AI(s),r};var Ce=globalThis,f=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Xe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};f._$litElement$=!0,f.finalized=!0,Ce.litElementHydrateSupport?.({LitElement:f});var kt=Ce.litElementPolyfillSupport;kt?.({LitElement:f});(Ce.litElementVersions??=[]).push("4.2.2");var v=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};var _t={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:de},St=(s=_t,t,e)=>{let{kind:i,metadata:r}=e,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(e.name,s),i==="accessor"){let{name:a}=e;return{set(c){let p=t.get.call(this);t.set.call(this,c),this.requestUpdate(a,p,s,!0,c)},init(c){return c!==void 0&&this.C(a,void 0,s,c),c}}}if(i==="setter"){let{name:a}=e;return function(c){let p=this[a];t.call(this,c),this.requestUpdate(a,p,s,!0,c)}}throw Error("Unsupported decorator location: "+i)};function d(s){return(t,e)=>typeof e=="object"?St(s,t,e):((i,r,n)=>{let a=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),a?Object.getOwnPropertyDescriptor(r,n):void 0})(s,t,e)}function h(s){return d({...s,state:!0,attribute:!1})}var xe=class{constructor(t){this.hass=t}async searchRecipes(t={}){let e=new URLSearchParams;e.set("page",String(t.page??1)),e.set("perPage",String(t.perPage??24)),t.search&&e.set("search",t.search),t.cookbook&&e.set("cookbook",t.cookbook);for(let i of t.categories??[])e.append("categories",i);for(let i of t.tags??[])e.append("tags",i);return this.hass.callApi("GET",`mealie_recipe_panel/recipes?${e.toString()}`)}async getCookbooks(){return this.hass.callApi("GET","mealie_recipe_panel/cookbooks")}async getRecipe(t){return this.hass.callApi("GET",`mealie_recipe_panel/recipes/${t}`)}async getCategories(){return this.hass.callApi("GET","mealie_recipe_panel/categories")}async getTags(){return this.hass.callApi("GET","mealie_recipe_panel/tags")}recipeImageUrl(t,e="min-original"){return`/api/mealie_recipe_panel/image/${t}/${e}`}async setFavorite(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${t}/favorite`,{favorite:e})}async setMyRecipe(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${t}/my-recipe`,{my_recipe:e})}async addToMealplan(t,e,i){return this.hass.callApi("POST","mealie_recipe_panel/mealplans",{recipeId:t,date:e,entryType:i})}async setLastMade(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${t}/last-made`,{date:e})}async getShoppingLists(){return this.hass.callApi("GET","mealie_recipe_panel/shopping-lists")}async createShoppingList(t){return this.hass.callApi("POST","mealie_recipe_panel/shopping-lists",{name:t})}async addToShoppingList(t,e){return this.hass.callApi("POST","mealie_recipe_panel/shopping-items",{shoppingListId:t,items:e})}async getMealplans(t,e){return this.hass.callApi("GET",`mealie_recipe_panel/mealplans?start_date=${t}&end_date=${e}`)}async getRandomRecipe(t){return this.hass.callApi("GET",`mealie_recipe_panel/recipes/random?mode=${t}`)}async deleteRecipe(t){return this.hass.callApi("DELETE",`mealie_recipe_panel/recipes/${t}`)}async getShoppingListDetail(t){return this.hass.callApi("GET",`mealie_recipe_panel/shopping-lists/${t}`)}async setShoppingItemChecked(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/shopping-items/${t}/checked`,{checked:e})}async deleteShoppingList(t){return this.hass.callApi("DELETE",`mealie_recipe_panel/shopping-lists/${t}`)}async generateRecipe(t,e){return this.hass.callApi("POST","mealie_recipe_panel/ai/generate-recipe",{prompt:t,generateImage:e})}async saveGeneratedRecipe(t,e,i){return this.hass.callApi("POST","mealie_recipe_panel/ai/save-recipe",{recipe:t,imageBase64:e,imageMime:i})}async importRecipe(t,e,i){let r=null,n=null;return e&&(r=await At(e),n=e.type||"image/jpeg"),this.hass.callApi("POST","mealie_recipe_panel/ai/import-recipe",{text:t,imageBase64:r,imageMime:n,generateImage:i})}};function At(s){return new Promise((t,e)=>{let i=new FileReader;i.onload=()=>{let r=i.result;t(r.slice(r.indexOf(",")+1))},i.onerror=()=>e(i.error),i.readAsDataURL(s)})}async function E(s,t){if(s instanceof Error&&s.message)return s.message;if(s&&typeof s=="object"){let e=s;if(typeof e.text=="function")try{let n=await e.text();if(n)return n}catch{}let i=s.message;if(typeof i=="string"&&i)return i;let r=s.status;if(typeof r=="number")return`Request failed (HTTP ${r})`}return t}var Lt="Favorite",Tt="My Recipe";function et(s,t){return!!s?.some(e=>e.name.toLowerCase()===t.toLowerCase())}function K(s){return et(s,Lt)}function Re(s){return et(s,Tt)}var W=class extends f{constructor(){super(...arguments);this.title="Recipes";this.showBack=!1}render(){return l`
      <header>
        ${this.showBack?l`<button class="back" aria-label="Back" @click=${()=>this.dispatchEvent(new CustomEvent("back"))}>‹</button>`:null}
        <h1>${this.title}</h1>
        <div class="header-extra"><slot name="header-extra"></slot></div>
      </header>
      <main><slot></slot></main>
    `}};W.styles=b`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
    }
    header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--app-header-background-color, #fff);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      flex-shrink: 0;
    }
    button.back {
      border: none;
      background: transparent;
      font-size: 28px;
      line-height: 1;
      padding: 8px;
      min-width: 48px;
      min-height: 48px;
      cursor: pointer;
      color: inherit;
      border-radius: 50%;
    }
    button.back:active {
      background: var(--divider-color, #e0e0e0);
    }
    h1 {
      font-size: 22px;
      margin: 0;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header-extra {
      display: flex;
      align-items: center;
    }
    main {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  `,o([d({type:String})],W.prototype,"title",2),o([d({type:Boolean})],W.prototype,"showBack",2),W=o([v("panel-shell")],W);var Q=class extends f{constructor(){super(...arguments);this.value=""}onInput(e){let i=e.target.value;this.value=i,window.clearTimeout(this.debounceHandle),this.debounceHandle=window.setTimeout(()=>{this.dispatchEvent(new CustomEvent("search-change",{detail:{value:i}}))},300)}render(){return l`
      <input
        type="search"
        placeholder="Search recipes…"
        .value=${this.value}
        @input=${this.onInput}
      />
    `}};Q.styles=b`
    :host {
      display: block;
      flex: 2;
      min-width: 200px;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      font-size: 18px;
      padding: 12px 16px;
      min-height: 48px;
      border-radius: 24px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
    }
    input:focus {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
  `,o([d({type:String})],Q.prototype,"value",2),Q=o([v("recipe-search-bar")],Q);var Y=class extends f{constructor(){super(...arguments);this.cookbooks=[];this.value=""}onChange(e){let i=e.target.value;this.value=i,this.dispatchEvent(new CustomEvent("cookbook-change",{detail:{value:i}}))}render(){return l`
      <select .value=${this.value} @change=${this.onChange}>
        <option value="">All cookbooks</option>
        ${this.cookbooks.map(e=>l`<option value=${e.id} ?selected=${e.id===this.value}>${e.name}</option>`)}
      </select>
    `}};Y.styles=b`
    :host {
      display: block;
      flex: 1;
      min-width: 140px;
    }
    select {
      width: 100%;
      box-sizing: border-box;
      font-size: 16px;
      padding: 12px 14px;
      min-height: 48px;
      border-radius: 24px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
    }
    select:focus {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
  `,o([d({attribute:!1})],Y.prototype,"cookbooks",2),o([d({type:String})],Y.prototype,"value",2),Y=o([v("cookbook-select")],Y);var H=class extends f{constructor(){super(...arguments);this.recipes=[];this.imageUrl=()=>"";this.loading=!1}onSelect(e){this.dispatchEvent(new CustomEvent("recipe-select",{detail:{slug:e.slug}}))}onToggleFavorite(e,i){e.stopPropagation(),this.dispatchEvent(new CustomEvent("favorite-toggle",{detail:{slug:i.slug,favorite:!K(i.tags)}}))}render(){return this.loading?l`<div class="empty">Loading recipes…</div>`:this.recipes.length?l`
      <div class="grid">
        ${this.recipes.map(e=>{let i=K(e.tags);return l`
            <div class="card" @click=${()=>this.onSelect(e)}>
              <div class="thumb-wrap">
                ${e.image?l`<img class="thumb" loading="lazy" src=${this.imageUrl(e)} alt="" />`:l`<div class="thumb"></div>`}
                <button
                  class="favorite ${i?"active":""}"
                  aria-label="Toggle favorite"
                  @click=${r=>this.onToggleFavorite(r,e)}
                >
                  ${i?"\u2665":"\u2661"}
                </button>
              </div>
              <div class="info">
                <p class="name">${e.name}</p>
                <div class="meta">
                  ${e.totalTime?l`<span>⏱ ${e.totalTime}</span>`:g}
                  ${e.recipeServings?l`<span>🍽 ${e.recipeServings}</span>`:g}
                </div>
              </div>
            </div>
          `})}
      </div>
    `:l`<div class="empty">No recipes found.</div>`}};H.styles=b`
    :host {
      display: block;
      padding: 8px 16px 24px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
    .card {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      min-height: 48px;
    }
    .card:active {
      transform: scale(0.98);
    }
    .thumb-wrap {
      position: relative;
    }
    .thumb {
      width: 100%;
      aspect-ratio: 4 / 3;
      background: var(--divider-color, #e0e0e0);
      object-fit: cover;
      display: block;
    }
    .favorite {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.45);
      color: #fff;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .favorite.active {
      color: #ff5a5f;
    }
    .favorite:active {
      background: rgba(0, 0, 0, 0.6);
    }
    .info {
      padding: 12px;
    }
    .name {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 4px;
    }
    .meta {
      font-size: 13px;
      color: var(--secondary-text-color, #757575);
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .empty {
      padding: 48px 16px;
      text-align: center;
      color: var(--secondary-text-color, #757575);
      font-size: 18px;
    }
  `,o([d({attribute:!1})],H.prototype,"recipes",2),o([d({attribute:!1})],H.prototype,"imageUrl",2),o([d({type:Boolean})],H.prototype,"loading",2),H=o([v("recipe-grid")],H);var P=class extends f{constructor(){super(...arguments);this.recipe=null;this.imageUrl="";this.completedSteps=new Set;this.checkedIngredients=new Set}willUpdate(e){e.has("recipe")&&e.get("recipe")?.slug!==this.recipe?.slug&&(this.completedSteps=new Set,this.checkedIngredients=new Set)}onToggleFavorite(){this.recipe&&this.dispatchEvent(new CustomEvent("favorite-toggle",{detail:{slug:this.recipe.slug,favorite:!K(this.recipe.tags)}}))}onToggleMyRecipe(){this.recipe&&this.dispatchEvent(new CustomEvent("my-recipe-toggle",{detail:{slug:this.recipe.slug,myRecipe:!Re(this.recipe.tags)}}))}onAddToMealplan(){this.recipe&&this.dispatchEvent(new CustomEvent("open-mealplan"))}onOpenLastMade(){this.recipe&&this.dispatchEvent(new CustomEvent("open-lastmade"))}onDelete(){this.recipe&&this.dispatchEvent(new CustomEvent("open-delete-confirm"))}toggleIngredient(e){let i=new Set(this.checkedIngredients);i.has(e)?i.delete(e):i.add(e),this.checkedIngredients=i}onAddToShoppingList(){if(!this.recipe)return;let e=this.recipe.recipeIngredient.filter((i,r)=>this.checkedIngredients.has(r)).map(i=>i.display);e.length&&this.dispatchEvent(new CustomEvent("open-shopping-list",{detail:{items:e}}))}toggleStep(e){let i=new Set(this.completedSteps);i.has(e)?i.delete(e):i.add(e),this.completedSteps=i}render(){let e=this.recipe;if(!e)return l`<p>Loading…</p>`;let i=K(e.tags),r=Re(e.tags);return l`
      ${e.image?l`<img class="hero" src=${this.imageUrl} alt="" />`:g}
      <div class="meta-row">
        ${e.prepTime?l`<span>Prep: ${e.prepTime}</span>`:g}
        ${e.cookTime?l`<span>Cook: ${e.cookTime}</span>`:g}
        ${e.totalTime?l`<span>Total: ${e.totalTime}</span>`:g}
        ${e.recipeServings?l`<span>Servings: ${e.recipeServings}</span>`:g}
        <button class="favorite ${i?"active":""}" aria-label="Toggle favorite" @click=${this.onToggleFavorite}>
          ${i?"\u2665":"\u2661"}
        </button>
      </div>
      <div class="action-row">
        <button class="pill-button ${r?"active":""}" @click=${this.onToggleMyRecipe}>
          ${r?"\u2713 My Recipe":"+ My Recipe"}
        </button>
        <button class="pill-button" @click=${this.onAddToMealplan}>📅 Add to Meal Plan</button>
        <button class="pill-button" @click=${this.onOpenLastMade}>
          ${e.lastMade?`\u2713 Last made ${e.lastMade.slice(0,10)}`:"\u{1F37D} Mark as Made"}
        </button>
        <button class="pill-button danger" @click=${this.onDelete}>🗑 Delete</button>
      </div>
      ${e.description?l`<p>${e.description}</p>`:g}

      <div class="ingredients-header">
        <h2>Ingredients</h2>
        <button
          class="pill-button"
          ?disabled=${!this.checkedIngredients.size}
          @click=${this.onAddToShoppingList}
        >
          🛒 Add ${this.checkedIngredients.size||""} to Shopping List
        </button>
      </div>
      <ul class="ingredients">
        ${e.recipeIngredient.map((n,a)=>l`<li>
            <input type="checkbox" .checked=${this.checkedIngredients.has(a)} @change=${()=>this.toggleIngredient(a)} />${n.display}
          </li>`)}
      </ul>

      <h2>Instructions</h2>
      <ol class="instructions">
        ${e.recipeInstructions.map((n,a)=>{let c=this.completedSteps.has(a);return l`
            <li class=${c?"done":""} @click=${()=>this.toggleStep(a)}>
              ${c?l`<span class="step-done-label">Step ${a+1} done</span>`:l`${n.title?l`<strong>${n.title}</strong><br />`:g}${n.text}`}
            </li>
          `})}
      </ol>
    `}};P.styles=b`
    :host {
      display: block;
      padding: 10px 16px 24px;
      font-size: 16px;
      line-height: 1.3;
    }
    img.hero {
      width: 100%;
      max-height: 220px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 10px;
    }
    .meta-row {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      margin-bottom: 10px;
      font-size: 14px;
      color: var(--secondary-text-color, #757575);
    }
    .favorite {
      margin-left: auto;
      border: none;
      background: transparent;
      font-size: 26px;
      line-height: 1;
      padding: 4px;
      min-width: 40px;
      min-height: 40px;
      cursor: pointer;
      color: var(--secondary-text-color, #757575);
    }
    .favorite.active {
      color: #ff5a5f;
    }
    .action-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .pill-button {
      min-height: 44px;
      padding: 0 16px;
      border-radius: 22px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      cursor: pointer;
    }
    .pill-button.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .pill-button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .pill-button.danger {
      color: #db4437;
      border-color: #db4437;
      margin-left: auto;
    }
    .ingredients-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    h2 {
      font-size: 18px;
      margin: 14px 0 6px;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      padding-bottom: 4px;
    }
    ul.ingredients {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul.ingredients li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 4px;
      min-height: 38px;
      border-bottom: 1px solid var(--divider-color, #f0f0f0);
    }
    ul.ingredients input[type="checkbox"] {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
    }
    ol.instructions {
      padding-left: 0;
      list-style: none;
      counter-reset: step;
    }
    ol.instructions li {
      counter-increment: step;
      padding: 8px 4px 8px 36px;
      position: relative;
      border-bottom: 1px solid var(--divider-color, #f0f0f0);
      cursor: pointer;
      user-select: none;
    }
    ol.instructions li::before {
      content: counter(step);
      position: absolute;
      left: 0;
      top: 8px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 13px;
    }
    ol.instructions li.done {
      color: var(--secondary-text-color, #757575);
    }
    ol.instructions li.done::before {
      content: "✓";
      background: #2e7d32;
    }
    .step-done-label {
      font-style: italic;
    }
  `,o([d({attribute:!1})],P.prototype,"recipe",2),o([d({type:String})],P.prototype,"imageUrl",2),o([h()],P.prototype,"completedSteps",2),o([h()],P.prototype,"checkedIngredients",2),P=o([v("recipe-detail-view")],P);function tt(s){let t=s.getFullYear(),e=String(s.getMonth()+1).padStart(2,"0"),i=String(s.getDate()).padStart(2,"0");return`${t}-${e}-${i}`}function A(){return tt(new Date)}function J(s,t){let e=new Date(`${s}T00:00:00`);return e.setDate(e.getDate()+t),tt(e)}function Me(s){let e=new Date(`${s}T00:00:00`).getDay();return J(s,e===0?-6:1-e)}var It=["breakfast","lunch","dinner","side","snack","drink","dessert"],z=class extends f{constructor(){super(...arguments);this.open=!1;this.recipeName="";this.date=A();this.entryType="dinner"}willUpdate(e){e.has("open")&&this.open&&(this.date=A(),this.entryType="dinner")}confirm(){this.dispatchEvent(new CustomEvent("mealplan-confirm",{detail:{date:this.date,entryType:this.entryType}}))}cancel(){this.dispatchEvent(new CustomEvent("mealplan-cancel"))}render(){return this.open?l`
      <div class="card">
        <h2>Add to Meal Plan</h2>
        <p class="subtitle">${this.recipeName}</p>

        <label for="date">Day</label>
        <input id="date" type="date" .value=${this.date} @change=${e=>this.date=e.target.value} />

        <label for="entry-type">Meal</label>
        <select id="entry-type" .value=${this.entryType} @change=${e=>this.entryType=e.target.value}>
          ${It.map(e=>l`<option value=${e} ?selected=${e===this.entryType}>${e[0].toUpperCase()}${e.slice(1)}</option>`)}
        </select>

        <div class="actions">
          <button class="cancel" @click=${this.cancel}>Cancel</button>
          <button class="confirm" @click=${this.confirm}>Add</button>
        </div>
      </div>
    `:null}};z.styles=b`
    :host {
      display: none;
    }
    :host([open]) {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
    }
    .card {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      padding: 20px;
      width: min(92vw, 380px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    h2 {
      margin: 0 0 4px;
      font-size: 20px;
    }
    p.subtitle {
      margin: 0 0 16px;
      color: var(--secondary-text-color, #757575);
      font-size: 14px;
    }
    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      margin: 12px 0 6px;
    }
    input[type="date"],
    select {
      width: 100%;
      box-sizing: border-box;
      font-size: 18px;
      padding: 12px 14px;
      min-height: 48px;
      border-radius: 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--primary-background-color, #fafafa);
      color: inherit;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      min-height: 48px;
      padding: 0 20px;
      border-radius: 24px;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }
    button.cancel {
      background: transparent;
      color: var(--primary-text-color, #212121);
    }
    button.confirm {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-weight: 600;
    }
  `,o([d({type:Boolean,reflect:!0})],z.prototype,"open",2),o([d({type:String})],z.prototype,"recipeName",2),o([h()],z.prototype,"date",2),o([h()],z.prototype,"entryType",2),z=o([v("mealplan-dialog")],z);var N=class extends f{constructor(){super(...arguments);this.open=!1;this.recipeName="";this.date=A()}willUpdate(e){e.has("open")&&this.open&&(this.date=A())}confirm(){this.dispatchEvent(new CustomEvent("lastmade-confirm",{detail:{date:this.date}}))}cancel(){this.dispatchEvent(new CustomEvent("lastmade-cancel"))}render(){return this.open?l`
      <div class="card">
        <h2>Mark as Made</h2>
        <p class="subtitle">${this.recipeName}</p>

        <label for="date">Date</label>
        <input id="date" type="date" .value=${this.date} @change=${e=>this.date=e.target.value} />

        <div class="actions">
          <button class="cancel" @click=${this.cancel}>Cancel</button>
          <button class="confirm" @click=${this.confirm}>Save</button>
        </div>
      </div>
    `:null}};N.styles=b`
    :host {
      display: none;
    }
    :host([open]) {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
    }
    .card {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      padding: 20px;
      width: min(92vw, 380px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    h2 {
      margin: 0 0 4px;
      font-size: 20px;
    }
    p.subtitle {
      margin: 0 0 16px;
      color: var(--secondary-text-color, #757575);
      font-size: 14px;
    }
    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      margin: 12px 0 6px;
    }
    input[type="date"] {
      width: 100%;
      box-sizing: border-box;
      font-size: 18px;
      padding: 12px 14px;
      min-height: 48px;
      border-radius: 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--primary-background-color, #fafafa);
      color: inherit;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      min-height: 48px;
      padding: 0 20px;
      border-radius: 24px;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }
    button.cancel {
      background: transparent;
      color: var(--primary-text-color, #212121);
    }
    button.confirm {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-weight: 600;
    }
  `,o([d({type:Boolean,reflect:!0})],N.prototype,"open",2),o([d({type:String})],N.prototype,"recipeName",2),o([h()],N.prototype,"date",2),N=o([v("lastmade-dialog")],N);var Z="__new__",L=class extends f{constructor(){super(...arguments);this.open=!1;this.itemCount=0;this.lists=[];this.selection="";this.newListName=""}willUpdate(e){e.has("open")&&this.open&&(this.selection=this.lists[0]?.id??Z,this.newListName="")}get canConfirm(){return this.selection===Z?this.newListName.trim().length>0:!!this.selection}confirm(){if(!this.canConfirm)return;let e=this.selection===Z?{newListName:this.newListName.trim()}:{listId:this.selection};this.dispatchEvent(new CustomEvent("shopping-confirm",{detail:e}))}cancel(){this.dispatchEvent(new CustomEvent("shopping-cancel"))}render(){return this.open?l`
      <div class="card">
        <h2>Add to Shopping List</h2>
        <p class="subtitle">${this.itemCount} ingredient${this.itemCount===1?"":"s"} selected</p>

        <label for="list">List</label>
        <select id="list" .value=${this.selection} @change=${e=>this.selection=e.target.value}>
          ${this.lists.map(e=>l`<option value=${e.id} ?selected=${e.id===this.selection}>${e.name}</option>`)}
          <option value=${Z} ?selected=${this.selection===Z}>+ New list…</option>
        </select>

        ${this.selection===Z?l`
              <label for="new-list-name">New list name</label>
              <input
                id="new-list-name"
                type="text"
                placeholder="e.g. Weekly Shop"
                .value=${this.newListName}
                @input=${e=>this.newListName=e.target.value}
              />
            `:g}

        <div class="actions">
          <button class="cancel" @click=${this.cancel}>Cancel</button>
          <button class="confirm" ?disabled=${!this.canConfirm} @click=${this.confirm}>Add</button>
        </div>
      </div>
    `:null}};L.styles=b`
    :host {
      display: none;
    }
    :host([open]) {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
    }
    .card {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      padding: 20px;
      width: min(92vw, 380px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    h2 {
      margin: 0 0 4px;
      font-size: 20px;
    }
    p.subtitle {
      margin: 0 0 16px;
      color: var(--secondary-text-color, #757575);
      font-size: 14px;
    }
    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      margin: 12px 0 6px;
    }
    select,
    input[type="text"] {
      width: 100%;
      box-sizing: border-box;
      font-size: 18px;
      padding: 12px 14px;
      min-height: 48px;
      border-radius: 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--primary-background-color, #fafafa);
      color: inherit;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      min-height: 48px;
      padding: 0 20px;
      border-radius: 24px;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }
    button.cancel {
      background: transparent;
      color: var(--primary-text-color, #212121);
    }
    button.confirm {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-weight: 600;
    }
    button.confirm:disabled {
      opacity: 0.5;
      cursor: default;
    }
  `,o([d({type:Boolean,reflect:!0})],L.prototype,"open",2),o([d({type:Number})],L.prototype,"itemCount",2),o([d({attribute:!1})],L.prototype,"lists",2),o([h()],L.prototype,"selection",2),o([h()],L.prototype,"newListName",2),L=o([v("shopping-list-dialog")],L);var it=["breakfast","lunch","dinner","side","snack","drink","dessert"],Ct=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];function Pe(s){return new Date(`${s}T00:00:00`).toLocaleDateString(void 0,{month:"short",day:"numeric"})}var O=class extends f{constructor(){super(...arguments);this.weekStart="";this.entries=[];this.loading=!1}onSelect(e){e.recipe&&this.dispatchEvent(new CustomEvent("recipe-select",{detail:{slug:e.recipe.slug}}))}render(){let e=Array.from({length:7},(r,n)=>J(this.weekStart,n)),i=A();return l`
      <div class="nav">
        <button @click=${()=>this.dispatchEvent(new CustomEvent("prev-week"))}>‹ Prev</button>
        <button @click=${()=>this.dispatchEvent(new CustomEvent("next-week"))}>Next ›</button>
        <button @click=${()=>this.dispatchEvent(new CustomEvent("today"))}>Today</button>
        <span class="range">${Pe(e[0])} – ${Pe(e[6])}</span>
      </div>
      ${this.loading?l`<p>Loading…</p>`:l`
            <div class="week">
              ${e.map((r,n)=>{let a=this.entries.filter(c=>c.date===r).sort((c,p)=>it.indexOf(c.entryType)-it.indexOf(p.entryType));return l`
                  <div class="day ${r===i?"today":""}">
                    <div class="day-header">${Ct[n]} ${Pe(r)}</div>
                    ${a.length?a.map(c=>l`
                            <button class="entry" @click=${()=>this.onSelect(c)}>
                              <span class="type">${c.entryType}</span>
                              <span class="name">${c.recipe?.name??(c.title||"Untitled")}</span>
                            </button>
                          `):l`<span class="empty">Nothing planned</span>`}
                  </div>
                `})}
            </div>
          `}
    `}};O.styles=b`
    :host {
      display: block;
      padding: 8px 16px 24px;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .nav button {
      min-height: 44px;
      padding: 0 16px;
      border-radius: 22px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      cursor: pointer;
    }
    .nav .range {
      font-weight: 600;
      font-size: 16px;
      margin-right: auto;
    }
    .week {
      display: grid;
      grid-template-columns: repeat(7, minmax(160px, 1fr));
      gap: 10px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .day {
      background: var(--card-background-color, #fff);
      border-radius: 12px;
      padding: 10px;
      min-height: 120px;
    }
    .day.today {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
    .day-header {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 8px;
      color: var(--secondary-text-color, #757575);
    }
    .entry {
      display: block;
      width: 100%;
      text-align: left;
      background: var(--primary-background-color, #fafafa);
      border: none;
      border-radius: 8px;
      padding: 8px;
      margin-bottom: 6px;
      cursor: pointer;
      font-size: 13px;
    }
    .entry .type {
      display: block;
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 0.03em;
      color: var(--secondary-text-color, #757575);
      margin-bottom: 2px;
    }
    .entry .name {
      display: block;
      font-weight: 600;
    }
    .empty {
      color: var(--secondary-text-color, #757575);
      font-size: 12px;
    }
  `,o([d({type:String})],O.prototype,"weekStart",2),o([d({attribute:!1})],O.prototype,"entries",2),o([d({type:Boolean})],O.prototype,"loading",2),O=o([v("mealplan-view")],O);var Rt=[{mode:"all",label:"All Recipes",icon:"\u{1F37D}"},{mode:"my-recipes",label:"My Recipes",icon:"\u270D\uFE0F"},{mode:"favorites",label:"Favorites",icon:"\u2764\uFE0F"},{mode:"made-before",label:"Made Before",icon:"\u{1F551}"}],X=class extends f{constructor(){super(...arguments);this.open=!1}select(e){this.dispatchEvent(new CustomEvent("mode-select",{detail:{mode:e}}))}render(){return this.open?l`
      <div class="card">
        <h2>Surprise Me</h2>
        <div class="grid">
          ${Rt.map(e=>l`
              <button class="option" @click=${()=>this.select(e.mode)}>
                <span class="icon">${e.icon}</span>
                <span>${e.label}</span>
              </button>
            `)}
        </div>
        <div class="cancel-row">
          <button class="cancel" @click=${()=>this.dispatchEvent(new CustomEvent("cancel"))}>Cancel</button>
        </div>
      </div>
    `:null}};X.styles=b`
    :host {
      display: none;
    }
    :host([open]) {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
    }
    .card {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      padding: 20px;
      width: min(92vw, 380px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    h2 {
      margin: 0 0 16px;
      font-size: 20px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    button.option {
      min-height: 72px;
      border-radius: 14px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--primary-background-color, #fafafa);
      color: inherit;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
    button.option .icon {
      font-size: 22px;
    }
    .cancel-row {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
    button.cancel {
      min-height: 44px;
      padding: 0 20px;
      border-radius: 22px;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #212121);
      font-size: 16px;
      cursor: pointer;
    }
  `,o([d({type:Boolean,reflect:!0})],X.prototype,"open",2),X=o([v("random-picker-dialog")],X);var T=class extends f{constructor(){super(...arguments);this.open=!1;this.heading="Are you sure?";this.message="";this.confirmLabel="Confirm";this.destructive=!1}render(){return this.open?l`
      <div class="card">
        <h2>${this.heading}</h2>
        <p>${this.message}</p>
        <div class="actions">
          <button class="cancel" @click=${()=>this.dispatchEvent(new CustomEvent("cancel"))}>Cancel</button>
          <button
            class="confirm ${this.destructive?"destructive":""}"
            @click=${()=>this.dispatchEvent(new CustomEvent("confirm"))}
          >
            ${this.confirmLabel}
          </button>
        </div>
      </div>
    `:null}};T.styles=b`
    :host {
      display: none;
    }
    :host([open]) {
      position: fixed;
      inset: 0;
      z-index: 1100;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
    }
    .card {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      padding: 20px;
      width: min(92vw, 380px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    h2 {
      margin: 0 0 8px;
      font-size: 20px;
    }
    p {
      margin: 0;
      color: var(--secondary-text-color, #757575);
      font-size: 15px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      min-height: 48px;
      padding: 0 20px;
      border-radius: 24px;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }
    button.cancel {
      background: transparent;
      color: var(--primary-text-color, #212121);
    }
    button.confirm {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-weight: 600;
    }
    button.confirm.destructive {
      background: #db4437;
    }
  `,o([d({type:Boolean,reflect:!0})],T.prototype,"open",2),o([d({type:String})],T.prototype,"heading",2),o([d({type:String})],T.prototype,"message",2),o([d({type:String})],T.prototype,"confirmLabel",2),o([d({type:Boolean})],T.prototype,"destructive",2),T=o([v("confirm-dialog")],T);var U=class extends f{constructor(){super(...arguments);this.lists=[];this.selectedListId="";this.items=[];this.loading=!1}toggle(e){this.dispatchEvent(new CustomEvent("toggle-item",{detail:{itemId:e.id,checked:!e.checked}}))}render(){if(!this.lists.length)return l`<div class="empty">No shopping lists yet.</div>`;let e=[...this.items].sort((i,r)=>Number(i.checked)-Number(r.checked));return l`
      <div class="list-tabs">
        ${this.lists.map(i=>l`
            <button
              class=${i.id===this.selectedListId?"active":""}
              @click=${()=>this.dispatchEvent(new CustomEvent("select-list",{detail:{listId:i.id}}))}
            >
              ${i.name}
            </button>
          `)}
        <button
          class="delete-list"
          ?disabled=${!this.selectedListId}
          @click=${()=>this.dispatchEvent(new CustomEvent("delete-list",{detail:{listId:this.selectedListId}}))}
        >
          🗑 Delete List
        </button>
      </div>
      ${this.loading?l`<p>Loading…</p>`:e.length?l`
              <ul class="items">
                ${e.map(i=>l`
                    <li class=${i.checked?"checked":""}>
                      <input type="checkbox" .checked=${i.checked} @change=${()=>this.toggle(i)} />
                      ${i.display}
                    </li>
                  `)}
              </ul>
            `:l`<div class="empty">This list is empty.</div>`}
    `}};U.styles=b`
    :host {
      display: block;
      padding: 8px 16px 24px;
    }
    .list-tabs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .delete-list {
      margin-left: auto;
      min-height: 44px;
      padding: 0 16px;
      border-radius: 22px;
      border: 1px solid #db4437;
      background: transparent;
      color: #db4437;
      font-size: 14px;
      cursor: pointer;
    }
    .delete-list:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .list-tabs button {
      min-height: 44px;
      padding: 0 16px;
      border-radius: 22px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      cursor: pointer;
    }
    .list-tabs button.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }
    ul.items {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul.items li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 4px;
      min-height: 48px;
      border-bottom: 1px solid var(--divider-color, #f0f0f0);
      font-size: 16px;
    }
    ul.items li.checked {
      color: var(--secondary-text-color, #757575);
      text-decoration: line-through;
    }
    ul.items input[type="checkbox"] {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }
    .empty {
      padding: 32px 4px;
      text-align: center;
      color: var(--secondary-text-color, #757575);
    }
  `,o([d({attribute:!1})],U.prototype,"lists",2),o([d({type:String})],U.prototype,"selectedListId",2),o([d({attribute:!1})],U.prototype,"items",2),o([d({type:Boolean})],U.prototype,"loading",2),U=o([v("shopping-view")],U);var _=class extends f{constructor(){super(...arguments);this.prompt="";this.generating=!1;this.importing=!1;this.error="";this.tab="generate";this.importText="";this.importImage=null;this.importImagePreview=null}disconnectedCallback(){super.disconnectedCallback(),this.clearImagePreview()}clearImagePreview(){this.importImagePreview&&URL.revokeObjectURL(this.importImagePreview),this.importImagePreview=null}onPromptInput(e){this.dispatchEvent(new CustomEvent("prompt-change",{detail:{value:e.target.value}}))}onGenerate(){!this.prompt.trim()||this.generating||this.dispatchEvent(new CustomEvent("generate"))}onImportTextInput(e){this.importText=e.target.value}onImageSelected(e){let i=e.target.files?.[0]??null;this.clearImagePreview(),this.importImage=i,this.importImagePreview=i?URL.createObjectURL(i):null}onRemoveImage(){this.clearImagePreview(),this.importImage=null}onImport(){this.importing||!this.importImage&&!this.importText.trim()||this.dispatchEvent(new CustomEvent("import",{detail:{text:this.importText.trim(),image:this.importImage}}))}renderGenerateTab(){return l`
      <p class="intro">Describe what you're after — as specific as you like.</p>
      <textarea
        placeholder="e.g. a thick and crispy pizza dough recipe"
        .value=${this.prompt}
        @input=${this.onPromptInput}
      ></textarea>
      <button class="generate" ?disabled=${this.generating||!this.prompt.trim()} @click=${this.onGenerate}>
        ${this.generating?"Generating\u2026":"\u2728 Generate Recipe"}
      </button>
    `}renderImportTab(){let e=!this.importing&&(!!this.importImage||!!this.importText.trim());return l`
      <p class="intro">Snap or upload a photo of a recipe, paste in the text, or both.</p>
      ${this.importImagePreview?l`
            <div class="photo-preview">
              <img src=${this.importImagePreview} alt="Selected recipe photo" />
              <button aria-label="Remove photo" @click=${this.onRemoveImage}>✕</button>
            </div>
          `:l`
            <label class="photo-picker">
              <input type="file" accept="image/*" capture="environment" @change=${this.onImageSelected} />
              📷 Tap to take or choose a photo
            </label>
          `}
      <p class="or-divider">— and/or —</p>
      <textarea
        placeholder="Paste recipe text here"
        .value=${this.importText}
        @input=${this.onImportTextInput}
      ></textarea>
      <button class="generate" ?disabled=${!e} @click=${this.onImport}>
        ${this.importing?"Importing\u2026":"\u{1F4E5} Import Recipe"}
      </button>
    `}render(){return l`
      <div class="tabs">
        <button class=${this.tab==="generate"?"active":""} @click=${()=>this.tab="generate"}>
          ✨ Generate
        </button>
        <button class=${this.tab==="import"?"active":""} @click=${()=>this.tab="import"}>
          📷 Import
        </button>
      </div>
      ${this.tab==="generate"?this.renderGenerateTab():this.renderImportTab()}
      ${this.error?l`<p class="error">${this.error}</p>`:g}
    `}};_.styles=b`
    :host {
      display: block;
      padding: 16px;
    }
    .tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    .tabs button {
      flex: 1;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      border-radius: 20px;
      padding: 10px 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
    .tabs button.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }
    p.intro {
      color: var(--secondary-text-color, #757575);
      font-size: 15px;
      line-height: 1.5;
      margin: 0 0 16px;
    }
    textarea {
      width: 100%;
      box-sizing: border-box;
      font-family: inherit;
      font-size: 17px;
      padding: 14px 16px;
      min-height: 100px;
      border-radius: 14px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      resize: vertical;
    }
    textarea:focus {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
    button.generate {
      margin-top: 14px;
      width: 100%;
      min-height: 52px;
      border-radius: 26px;
      border: none;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 17px;
      font-weight: 600;
      cursor: pointer;
    }
    button.generate:disabled {
      opacity: 0.6;
      cursor: default;
    }
    p.error {
      color: var(--error-color, #db4437);
      font-size: 14px;
      margin-top: 12px;
    }
    .photo-picker {
      display: block;
      border: 2px dashed var(--divider-color, #e0e0e0);
      border-radius: 14px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      color: var(--secondary-text-color, #757575);
    }
    .photo-picker input {
      display: none;
    }
    .photo-preview {
      position: relative;
      margin-bottom: 14px;
    }
    .photo-preview img {
      width: 100%;
      max-height: 220px;
      object-fit: cover;
      border-radius: 14px;
      display: block;
    }
    .photo-preview button {
      position: absolute;
      top: 8px;
      right: 8px;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }
    .or-divider {
      text-align: center;
      color: var(--secondary-text-color, #757575);
      font-size: 13px;
      margin: 14px 0;
    }
  `,o([d({type:String})],_.prototype,"prompt",2),o([d({type:Boolean})],_.prototype,"generating",2),o([d({type:Boolean})],_.prototype,"importing",2),o([d({type:String})],_.prototype,"error",2),o([h()],_.prototype,"tab",2),o([h()],_.prototype,"importText",2),o([h()],_.prototype,"importImage",2),o([h()],_.prototype,"importImagePreview",2),_=o([v("ai-recipe-view")],_);var rt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},st=s=>(...t)=>({_$litDirective$:s,values:t}),ye=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Mt}=Ze,nt=s=>s;var ot=()=>document.createComment(""),ee=(s,t,e)=>{let i=s._$AA.parentNode,r=t===void 0?s._$AB:t._$AA;if(e===void 0){let n=i.insertBefore(ot(),r),a=i.insertBefore(ot(),r);e=new Mt(n,a,s,s.options)}else{let n=e._$AB.nextSibling,a=e._$AM,c=a!==s;if(c){let p;e._$AQ?.(s),e._$AM=s,e._$AP!==void 0&&(p=s._$AU)!==a._$AU&&e._$AP(p)}if(n!==r||c){let p=e._$AA;for(;p!==n;){let x=nt(p).nextSibling;nt(i).insertBefore(p,r),p=x}}}return e},D=(s,t,e=s)=>(s._$AI(t,e),s),Pt={},at=(s,t=Pt)=>s._$AH=t,lt=s=>s._$AH,$e=s=>{s._$AR(),s._$AA.remove()};var pt=(s,t,e)=>{let i=new Map;for(let r=t;r<=e;r++)i.set(s[r],r);return i},ct=st(class extends ye{constructor(s){if(super(s),s.type!==rt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let r=[],n=[],a=0;for(let c of s)r[a]=i?i(c,a):a,n[a]=e(c,a),a++;return{values:n,keys:r}}render(s,t,e){return this.dt(s,t,e).values}update(s,[t,e,i]){let r=lt(s),{values:n,keys:a}=this.dt(t,e,i);if(!Array.isArray(r))return this.ut=a,n;let c=this.ut??=[],p=[],x,w,u=0,$=r.length-1,y=0,k=n.length-1;for(;u<=$&&y<=k;)if(r[u]===null)u++;else if(r[$]===null)$--;else if(c[u]===a[y])p[y]=D(r[u],n[y]),u++,y++;else if(c[$]===a[k])p[k]=D(r[$],n[k]),$--,k--;else if(c[u]===a[k])p[k]=D(r[u],n[k]),ee(s,p[k+1],r[u]),u++,k--;else if(c[$]===a[y])p[y]=D(r[$],n[y]),ee(s,r[u],r[$]),$--,y++;else if(x===void 0&&(x=pt(a,y,k),w=pt(c,u,$)),x.has(c[u]))if(x.has(c[$])){let I=w.get(a[y]),we=I!==void 0?r[I]:null;if(we===null){let ze=ee(s,r[u]);D(ze,n[y]),p[y]=ze}else p[y]=D(we,n[y]),ee(s,r[u],we),r[I]=null;y++}else $e(r[$]),$--;else $e(r[u]),u++;for(;y<=k;){let I=ee(s,p[k+1]);D(I,n[y]),p[y++]=I}for(;u<=$;){let I=r[u++];I!==null&&$e(I)}return this.ut=a,at(s,p),M}});var S=class extends f{constructor(){super(...arguments);this.recipe=null;this.imageBase64=null;this.imageMime=null;this.imageError=null;this.saving=!1;this.draft=null;this.lastRecipeRef=null;this.instructionIds=[];this.nextInstructionId=0;this.dragId=null;this.dragStartY=0;this.dragEl=null;this.onDragMove=e=>{if(this.dragId===null||!this.dragEl)return;let i=e.clientY-this.dragStartY;this.dragEl.style.transform=`translateY(${i}px)`;let r=this.dragEl.getBoundingClientRect(),n=r.top+r.height/2,a=this.instructionIds.indexOf(this.dragId),c=Array.from(this.renderRoot.querySelectorAll(".instructions-list li[data-id]"));for(let p of c){let x=Number(p.dataset.id);if(x===this.dragId)continue;let w=p.getBoundingClientRect();if(n<w.top||n>w.bottom)continue;let u=this.instructionIds.indexOf(x);if(u!==a){this.dragStartY+=u>a?w.height:-w.height,this.swapInstructions(a,u),this.dragEl.style.transform=`translateY(${e.clientY-this.dragStartY}px)`;break}}};this.onDragEnd=e=>{let i=e.currentTarget;i.removeEventListener("pointermove",this.onDragMove),i.removeEventListener("pointerup",this.onDragEnd),i.removeEventListener("pointercancel",this.onDragEnd),this.dragEl&&(this.dragEl.classList.remove("dragging"),this.dragEl.style.transform=""),this.dragId=null,this.dragEl=null}}willUpdate(e){e.has("recipe")&&this.recipe!==this.lastRecipeRef&&(this.lastRecipeRef=this.recipe,this.draft=this.recipe?{...this.recipe,ingredients:[...this.recipe.ingredients],instructions:[...this.recipe.instructions]}:null,this.instructionIds=this.recipe?this.recipe.instructions.map(()=>this.nextInstructionId++):[])}updateField(e,i){this.draft&&(this.draft={...this.draft,[e]:i})}updateIngredient(e,i){if(!this.draft)return;let r=[...this.draft.ingredients];r[e]=i,this.draft={...this.draft,ingredients:r}}removeIngredient(e){this.draft&&(this.draft={...this.draft,ingredients:this.draft.ingredients.filter((i,r)=>r!==e)})}addIngredient(){this.draft&&(this.draft={...this.draft,ingredients:[...this.draft.ingredients,""]})}updateInstruction(e,i){if(!this.draft)return;let r=[...this.draft.instructions];r[e]=i,this.draft={...this.draft,instructions:r}}removeInstruction(e){this.draft&&(this.draft={...this.draft,instructions:this.draft.instructions.filter((i,r)=>r!==e)},this.instructionIds=this.instructionIds.filter((i,r)=>r!==e))}addInstruction(){this.draft&&(this.draft={...this.draft,instructions:[...this.draft.instructions,""]},this.instructionIds=[...this.instructionIds,this.nextInstructionId++])}swapInstructions(e,i){if(!this.draft)return;let r=[...this.draft.instructions],[n]=r.splice(e,1);r.splice(i,0,n);let a=[...this.instructionIds],[c]=a.splice(e,1);a.splice(i,0,c),this.draft={...this.draft,instructions:r},this.instructionIds=a}onDragStart(e,i){e.preventDefault();let r=e.currentTarget,n=r.closest("li");n&&(this.dragId=i,this.dragStartY=e.clientY,this.dragEl=n,n.classList.add("dragging"),r.setPointerCapture(e.pointerId),r.addEventListener("pointermove",this.onDragMove),r.addEventListener("pointerup",this.onDragEnd),r.addEventListener("pointercancel",this.onDragEnd))}onSave(){!this.draft||!this.draft.name.trim()||this.saving||this.dispatchEvent(new CustomEvent("save",{detail:{recipe:this.draft}}))}render(){let e=this.draft;if(!e)return l`<p>Loading…</p>`;let i=!this.saving&&!!e.name.trim();return l`
      ${this.imageBase64?l`<img class="hero" src="data:${this.imageMime||"image/png"};base64,${this.imageBase64}" alt="" />`:g}
      ${!this.imageBase64&&this.imageError?l`<p class="image-notice">No image generated: ${this.imageError}</p>`:g}

      <div class="action-row">
        <button class="pill-button save" ?disabled=${!i} @click=${this.onSave}>
          ${this.saving?"Saving\u2026":"\u{1F4BE} Save to Mealie"}
        </button>
        <button class="pill-button" ?disabled=${this.saving} @click=${()=>this.dispatchEvent(new CustomEvent("regenerate"))}>
          🔄 Regenerate
        </button>
      </div>

      <label class="field-label">Recipe name</label>
      <input
        class="name-input"
        type="text"
        placeholder="Recipe name"
        .value=${e.name}
        @input=${r=>this.updateField("name",r.target.value)}
      />

      <div class="meta-grid">
        <label>
          Servings
          <input
            type="number"
            min="1"
            .value=${String(e.recipeServings)}
            @input=${r=>this.updateField("recipeServings",Number(r.target.value)||0)}
          />
        </label>
        <label>
          Prep time
          <input
            type="text"
            .value=${e.prepTime??""}
            @input=${r=>this.updateField("prepTime",r.target.value||null)}
          />
        </label>
        <label>
          Cook time
          <input
            type="text"
            .value=${e.cookTime??""}
            @input=${r=>this.updateField("cookTime",r.target.value||null)}
          />
        </label>
        <label>
          Total time
          <input
            type="text"
            .value=${e.totalTime??""}
            @input=${r=>this.updateField("totalTime",r.target.value||null)}
          />
        </label>
      </div>

      <label class="field-label">Description</label>
      <textarea .value=${e.description} @input=${r=>this.updateField("description",r.target.value)}></textarea>

      <h2>Ingredients</h2>
      <ul class="edit-list">
        ${e.ingredients.map((r,n)=>l`
            <li>
              <input type="text" .value=${r} @input=${a=>this.updateIngredient(n,a.target.value)} />
              <button class="remove-btn" aria-label="Remove ingredient" @click=${()=>this.removeIngredient(n)}>✕</button>
            </li>
          `)}
      </ul>
      <button class="add-btn" @click=${()=>this.addIngredient()}>+ Add ingredient</button>

      <h2>Instructions</h2>
      <ol class="edit-list instructions-list">
        ${ct(e.instructions,(r,n)=>this.instructionIds[n],(r,n)=>l`
            <li data-id=${this.instructionIds[n]}>
              <div class="step-number">${n+1}</div>
              <textarea .value=${r} @input=${a=>this.updateInstruction(n,a.target.value)}></textarea>
              <button
                class="drag-handle"
                aria-label="Drag to reorder step"
                @pointerdown=${a=>this.onDragStart(a,this.instructionIds[n])}
              >
                ⠿
              </button>
              <button class="remove-btn" aria-label="Remove step" @click=${()=>this.removeInstruction(n)}>✕</button>
            </li>
          `)}
      </ol>
      <button class="add-btn" @click=${()=>this.addInstruction()}>+ Add step</button>
    `}};S.styles=b`
    :host {
      display: block;
      padding: 10px 16px 24px;
      font-size: 16px;
      line-height: 1.3;
    }
    img.hero {
      width: 100%;
      max-height: 240px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 12px;
    }
    p.image-notice {
      color: var(--secondary-text-color, #757575);
      font-size: 13px;
      margin: 0 0 12px;
    }
    .action-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .pill-button {
      min-height: 44px;
      padding: 0 16px;
      border-radius: 22px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      cursor: pointer;
    }
    .pill-button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .pill-button.save {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
      font-weight: 600;
    }
    label.field-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color, #757575);
      margin: 14px 0 6px;
    }
    input[type="text"],
    input[type="number"],
    textarea,
    .name-input {
      width: 100%;
      box-sizing: border-box;
      font-family: inherit;
      font-size: 16px;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
    }
    .name-input {
      font-size: 20px;
      font-weight: 700;
      padding: 12px 14px;
    }
    textarea {
      resize: vertical;
      min-height: 60px;
    }
    input:focus,
    textarea:focus {
      outline: 2px solid var(--primary-color, #03a9f4);
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px 12px;
      margin-top: 12px;
    }
    .meta-grid label {
      display: block;
      font-size: 13px;
      color: var(--secondary-text-color, #757575);
    }
    .meta-grid input {
      margin-top: 4px;
    }
    h2 {
      font-size: 18px;
      margin: 18px 0 6px;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      padding-bottom: 4px;
    }
    ul.edit-list,
    ol.edit-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul.edit-list li,
    ol.edit-list li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 6px 0;
    }
    ul.edit-list li input,
    ol.edit-list li textarea {
      flex: 1;
    }
    .remove-btn {
      flex: none;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      background: var(--divider-color, #e0e0e0);
      color: inherit;
      font-size: 15px;
      cursor: pointer;
    }
    .step-number {
      flex: none;
      width: 28px;
      height: 28px;
      margin-top: 6px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 13px;
    }
    .instructions-list li {
      background: var(--card-background-color, #fff);
      touch-action: pan-y;
    }
    .instructions-list li.dragging {
      position: relative;
      z-index: 5;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      touch-action: none;
      user-select: none;
    }
    .drag-handle {
      flex: none;
      border: none;
      border-radius: 8px;
      width: 40px;
      height: 40px;
      margin-top: 2px;
      background: var(--divider-color, #e0e0e0);
      color: var(--secondary-text-color, #757575);
      font-size: 20px;
      line-height: 1;
      cursor: grab;
      touch-action: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .drag-handle:active {
      cursor: grabbing;
    }
    .add-btn {
      margin-top: 8px;
      border: 1px dashed var(--divider-color, #e0e0e0);
      background: transparent;
      color: var(--primary-color, #03a9f4);
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
    }
  `,o([d({attribute:!1})],S.prototype,"recipe",2),o([d({type:String})],S.prototype,"imageBase64",2),o([d({type:String})],S.prototype,"imageMime",2),o([d({type:String})],S.prototype,"imageError",2),o([d({type:Boolean})],S.prototype,"saving",2),o([h()],S.prototype,"draft",2),o([h()],S.prototype,"instructionIds",2),S=o([v("ai-recipe-preview")],S);function dt(s,t,e){let i=s.some(r=>r.name.toLowerCase()===t.toLowerCase());return e?i?s:[...s,{id:"",name:t,slug:t.toLowerCase().replace(/\s+/g,"-")}]:s.filter(r=>r.name.toLowerCase()!==t.toLowerCase())}var m=class extends f{constructor(){super(...arguments);this.narrow=!1;this.recipes=[];this.loading=!0;this.selectedRecipe=null;this.searchQuery="";this.cookbooks=[];this.selectedCookbook="";this.error="";this.showMealplanDialog=!1;this.showLastmadeDialog=!1;this.showShoppingListDialog=!1;this.shoppingLists=[];this.pendingShoppingItems=[];this.showMealplanView=!1;this.cameFromMealplan=!1;this.weekStart=Me(A());this.mealplanEntries=[];this.mealplanLoading=!1;this.showRandomPicker=!1;this.showDeleteConfirm=!1;this.showShoppingView=!1;this.selectedShoppingListId="";this.shoppingListItems=[];this.shoppingListItemsLoading=!1;this.showDeleteListConfirm=!1;this.showAiView=!1;this.aiPrompt="";this.aiGenerating=!1;this.aiError="";this.aiGeneratedRecipe=null;this.aiImageBase64=null;this.aiImageMime=null;this.aiImageError=null;this.aiSaving=!1;this.aiImporting=!1;this.aiLastAction="generate";this.aiLastImportText="";this.aiLastImportImage=null}createRenderRoot(){return this}willUpdate(){!this.client&&this.hass&&(this.client=new xe(this.hass),this.loadRecipes(),this.loadCookbooks())}async loadCookbooks(){if(this.client)try{let e=await this.client.getCookbooks();this.cookbooks=e.items}catch{}}async loadRecipes(e=""){if(this.client){this.loading=!0,this.error="";try{let i=await this.client.searchRecipes({search:e,cookbook:this.selectedCookbook||void 0});this.recipes=i.items}catch(i){this.error=await E(i,"Failed to load recipes")}finally{this.loading=!1}}}async openRecipe(e,i=!1){if(this.client){this.selectedRecipe=null,this.cameFromMealplan=i,this.showMealplanView=!1;try{this.selectedRecipe=await this.client.getRecipe(e)}catch(r){this.error=await E(r,"Failed to load recipe")}}}closeDetail(){this.selectedRecipe=null,this.cameFromMealplan&&(this.showMealplanView=!0,this.cameFromMealplan=!1)}async openMealplanView(){this.showMealplanView=!0,await this.loadMealplanWeek()}async loadMealplanWeek(){if(this.client){this.mealplanLoading=!0;try{let e=await this.client.getMealplans(this.weekStart,J(this.weekStart,6));this.mealplanEntries=e.items}catch(e){this.error=await E(e,"Failed to load meal plan")}finally{this.mealplanLoading=!1}}}changeWeek(e){this.weekStart=J(this.weekStart,e),this.loadMealplanWeek()}goToCurrentWeek(){this.weekStart=Me(A()),this.loadMealplanWeek()}onSearchChange(e){this.searchQuery=e.detail.value,this.loadRecipes(this.searchQuery)}onCookbookChange(e){this.selectedCookbook=e.detail.value,this.loadRecipes(this.searchQuery)}updateRecipeTags(e,i,r){this.recipes=this.recipes.map(n=>n.slug===e?{...n,tags:dt(n.tags,i,r)}:n),this.selectedRecipe?.slug===e&&(this.selectedRecipe={...this.selectedRecipe,tags:dt(this.selectedRecipe.tags,i,r)})}async onFavoriteToggle(e){if(!this.client)return;let{slug:i,favorite:r}=e.detail;try{await this.client.setFavorite(i,r)}catch(n){this.error=await E(n,"Failed to update favorite");return}this.updateRecipeTags(i,"Favorite",r),this.loadCookbooks()}async onMyRecipeToggle(e){if(!this.client)return;let{slug:i,myRecipe:r}=e.detail;try{await this.client.setMyRecipe(i,r)}catch(n){this.error=await E(n,"Failed to update My Recipe");return}this.updateRecipeTags(i,"My Recipe",r),this.loadCookbooks()}async onMealplanConfirm(e){if(!(!this.client||!this.selectedRecipe)){try{await this.client.addToMealplan(this.selectedRecipe.id,e.detail.date,e.detail.entryType)}catch(i){this.error=await E(i,"Failed to add to meal plan")}this.showMealplanDialog=!1}}async onLastmadeConfirm(e){if(!this.client||!this.selectedRecipe)return;let i=this.selectedRecipe.slug;try{await this.client.setLastMade(i,e.detail.date);let r=`${e.detail.date}T00:00:00`;this.recipes=this.recipes.map(n=>n.slug===i?{...n,lastMade:r}:n),this.selectedRecipe?.slug===i&&(this.selectedRecipe={...this.selectedRecipe,lastMade:r})}catch(r){this.error=await E(r,"Failed to record last made date")}this.showLastmadeDialog=!1}async onOpenShoppingList(e){if(this.client){this.pendingShoppingItems=e.detail.items,this.showShoppingListDialog=!0;try{let i=await this.client.getShoppingLists();this.shoppingLists=i.items}catch(i){this.error=await E(i,"Failed to load shopping lists")}}}async onShoppingConfirm(e){if(this.client){try{let i=e.detail.listId??(await this.client.createShoppingList(e.detail.newListName)).id;await this.client.addToShoppingList(i,this.pendingShoppingItems)}catch(i){this.error=await E(i,"Failed to add items to shopping list")}this.showShoppingListDialog=!1,this.pendingShoppingItems=[]}}async onRandomModeSelect(e){if(this.client){this.showRandomPicker=!1;try{let{recipe:i}=await this.client.getRandomRecipe(e.detail.mode);i?this.openRecipe(i.slug):this.error="No recipes found for that category yet."}catch(i){this.error=await E(i,"Failed to pick a random recipe")}}}async openShoppingView(){if(this.showShoppingView=!0,!this.shoppingLists.length)try{let i=await this.client.getShoppingLists();this.shoppingLists=i.items}catch(i){this.error=await E(i,"Failed to load shopping lists");return}let e=this.selectedShoppingListId||this.shoppingLists[0]?.id;e&&this.loadShoppingList(e)}async loadShoppingList(e){if(this.client){this.selectedShoppingListId=e,this.shoppingListItemsLoading=!0;try{let i=await this.client.getShoppingListDetail(e);this.shoppingListItems=i.listItems}catch(i){this.error=await E(i,"Failed to load shopping list")}finally{this.shoppingListItemsLoading=!1}}}async onToggleShoppingItem(e){if(!this.client)return;let{itemId:i,checked:r}=e.detail;this.shoppingListItems=this.shoppingListItems.map(n=>n.id===i?{...n,checked:r}:n);try{await this.client.setShoppingItemChecked(i,r)}catch(n){this.error=await E(n,"Failed to update item")}}async onDeleteListConfirm(){if(!this.client||!this.selectedShoppingListId)return;let e=this.selectedShoppingListId;try{await this.client.deleteShoppingList(e),this.shoppingLists=this.shoppingLists.filter(r=>r.id!==e),this.selectedShoppingListId="",this.shoppingListItems=[];let i=this.shoppingLists[0]?.id;i&&this.loadShoppingList(i)}catch(i){this.error=await E(i,"Failed to delete shopping list")}this.showDeleteListConfirm=!1}openAiView(){this.showAiView=!0,this.aiGeneratedRecipe=null,this.aiError=""}closeAiView(){this.showAiView=!1,this.aiGeneratedRecipe=null,this.aiPrompt="",this.aiError="",this.aiLastAction="generate",this.aiLastImportText="",this.aiLastImportImage=null}closeAiPreview(){this.aiGeneratedRecipe=null,this.aiImageBase64=null,this.aiImageMime=null,this.aiImageError=null}async onAiGenerate(){if(!(!this.client||!this.aiPrompt.trim())){this.aiGenerating=!0,this.aiError="",this.aiLastAction="generate";try{let e=await this.client.generateRecipe(this.aiPrompt.trim(),!0);this.aiGeneratedRecipe=e.recipe,this.aiImageBase64=e.imageBase64,this.aiImageMime=e.imageMime,this.aiImageError=e.imageError}catch(e){this.aiError=await E(e,"Failed to generate a recipe")}finally{this.aiGenerating=!1}}}async onAiImport(e){if(!this.client)return;let{text:i,image:r}=e.detail;if(!(!i.trim()&&!r)){this.aiLastAction="import",this.aiLastImportText=i,this.aiLastImportImage=r,this.aiImporting=!0,this.aiError="";try{let n=await this.client.importRecipe(i,r,!0);this.aiGeneratedRecipe=n.recipe,this.aiImageBase64=n.imageBase64,this.aiImageMime=n.imageMime,this.aiImageError=n.imageError}catch(n){this.aiError=await E(n,"Failed to import recipe")}finally{this.aiImporting=!1}}}onAiRegenerate(){this.aiLastAction==="import"?this.onAiImport(new CustomEvent("import",{detail:{text:this.aiLastImportText,image:this.aiLastImportImage}})):this.onAiGenerate()}async onAiSaveRecipe(e){if(this.client){this.aiSaving=!0;try{let{slug:i}=await this.client.saveGeneratedRecipe(e.detail.recipe,this.aiImageBase64,this.aiImageMime);this.closeAiView(),this.loadRecipes(this.searchQuery),this.openRecipe(i)}catch(i){this.aiError=await E(i,"Failed to save recipe to Mealie")}finally{this.aiSaving=!1}}}async onDeleteConfirm(){if(!this.client||!this.selectedRecipe)return;let e=this.selectedRecipe.slug;try{await this.client.deleteRecipe(e),this.recipes=this.recipes.filter(i=>i.slug!==e),this.selectedRecipe=null,this.cameFromMealplan=!1}catch(i){this.error=await E(i,"Failed to delete recipe")}this.showDeleteConfirm=!1}render(){if(!this.client)return l`<panel-shell title="Recipes"><p style="padding:16px">Loading…</p></panel-shell>`;if(this.selectedRecipe){let e=this.client.recipeImageUrl(this.selectedRecipe.id,"original");return l`
        <panel-shell title=${this.selectedRecipe.name} showBack @back=${()=>this.closeDetail()}>
          <recipe-detail-view
            .recipe=${this.selectedRecipe}
            .imageUrl=${e}
            @favorite-toggle=${this.onFavoriteToggle}
            @my-recipe-toggle=${this.onMyRecipeToggle}
            @open-mealplan=${()=>this.showMealplanDialog=!0}
            @open-lastmade=${()=>this.showLastmadeDialog=!0}
            @open-shopping-list=${this.onOpenShoppingList}
            @open-delete-confirm=${()=>this.showDeleteConfirm=!0}
          ></recipe-detail-view>
        </panel-shell>
        <confirm-dialog
          .open=${this.showDeleteConfirm}
          heading="Delete recipe?"
          message="\"${this.selectedRecipe.name}\" will be permanently deleted from Mealie. This can't be undone."
          confirmLabel="Delete"
          destructive
          @confirm=${this.onDeleteConfirm}
          @cancel=${()=>this.showDeleteConfirm=!1}
        ></confirm-dialog>
        <mealplan-dialog
          .open=${this.showMealplanDialog}
          .recipeName=${this.selectedRecipe.name}
          @mealplan-confirm=${this.onMealplanConfirm}
          @mealplan-cancel=${()=>this.showMealplanDialog=!1}
        ></mealplan-dialog>
        <lastmade-dialog
          .open=${this.showLastmadeDialog}
          .recipeName=${this.selectedRecipe.name}
          @lastmade-confirm=${this.onLastmadeConfirm}
          @lastmade-cancel=${()=>this.showLastmadeDialog=!1}
        ></lastmade-dialog>
        <shopping-list-dialog
          .open=${this.showShoppingListDialog}
          .lists=${this.shoppingLists}
          .itemCount=${this.pendingShoppingItems.length}
          @shopping-confirm=${this.onShoppingConfirm}
          @shopping-cancel=${()=>this.showShoppingListDialog=!1}
        ></shopping-list-dialog>
      `}if(this.showMealplanView)return l`
        <panel-shell title="Meal Plan" showBack @back=${()=>this.showMealplanView=!1}>
          <mealplan-view
            .weekStart=${this.weekStart}
            .entries=${this.mealplanEntries}
            .loading=${this.mealplanLoading}
            @prev-week=${()=>this.changeWeek(-7)}
            @next-week=${()=>this.changeWeek(7)}
            @today=${()=>this.goToCurrentWeek()}
            @recipe-select=${e=>this.openRecipe(e.detail.slug,!0)}
          ></mealplan-view>
        </panel-shell>
      `;if(this.showShoppingView){let e=this.shoppingLists.find(i=>i.id===this.selectedShoppingListId)?.name??"";return l`
        <panel-shell title="Shopping List" showBack @back=${()=>this.showShoppingView=!1}>
          <shopping-view
            .lists=${this.shoppingLists}
            .selectedListId=${this.selectedShoppingListId}
            .items=${this.shoppingListItems}
            .loading=${this.shoppingListItemsLoading}
            @select-list=${i=>this.loadShoppingList(i.detail.listId)}
            @toggle-item=${this.onToggleShoppingItem}
            @delete-list=${()=>this.showDeleteListConfirm=!0}
          ></shopping-view>
        </panel-shell>
        <confirm-dialog
          .open=${this.showDeleteListConfirm}
          heading="Delete shopping list?"
          message="\"${e}\" and all its items will be permanently deleted from Mealie. This can't be undone."
          confirmLabel="Delete"
          destructive
          @confirm=${this.onDeleteListConfirm}
          @cancel=${()=>this.showDeleteListConfirm=!1}
        ></confirm-dialog>
      `}return this.showAiView?this.aiGeneratedRecipe?l`
          <panel-shell title="AI Recipe" showBack @back=${()=>this.closeAiPreview()}>
            <ai-recipe-preview
              .recipe=${this.aiGeneratedRecipe}
              .imageBase64=${this.aiImageBase64}
              .imageMime=${this.aiImageMime}
              .imageError=${this.aiImageError}
              .saving=${this.aiSaving}
              @save=${e=>this.onAiSaveRecipe(e)}
              @regenerate=${()=>this.onAiRegenerate()}
            ></ai-recipe-preview>
          </panel-shell>
        `:l`
        <panel-shell title="AI Recipe Finder" showBack @back=${()=>this.closeAiView()}>
          <ai-recipe-view
            .prompt=${this.aiPrompt}
            .generating=${this.aiGenerating}
            .importing=${this.aiImporting}
            .error=${this.aiError}
            @prompt-change=${e=>this.aiPrompt=e.detail.value}
            @generate=${()=>this.onAiGenerate()}
            @import=${e=>this.onAiImport(e)}
          ></ai-recipe-view>
        </panel-shell>
      `:l`
      <panel-shell title="Recipes">
        <span slot="header-extra" style="display:flex;">
          <button
            style="border:none;background:transparent;font-size:24px;padding:8px;min-width:44px;min-height:44px;cursor:pointer;"
            aria-label="Meal Plan"
            @click=${()=>this.openMealplanView()}
          >
            📅
          </button>
          <button
            style="border:none;background:transparent;font-size:24px;padding:8px;min-width:44px;min-height:44px;cursor:pointer;"
            aria-label="Random Recipe"
            @click=${()=>this.showRandomPicker=!0}
          >
            🎲
          </button>
          <button
            style="border:none;background:transparent;font-size:24px;padding:8px;min-width:44px;min-height:44px;cursor:pointer;"
            aria-label="Shopping List"
            @click=${()=>this.openShoppingView()}
          >
            🛒
          </button>
          <button
            style="border:none;background:transparent;font-size:24px;padding:8px;min-width:44px;min-height:44px;cursor:pointer;"
            aria-label="AI Recipe Finder"
            @click=${()=>this.openAiView()}
          >
            ✨
          </button>
        </span>
        <random-picker-dialog
          .open=${this.showRandomPicker}
          @mode-select=${this.onRandomModeSelect}
          @cancel=${()=>this.showRandomPicker=!1}
        ></random-picker-dialog>
        <div style="display:flex;flex-wrap:wrap;gap:12px;padding:8px 16px;">
          <recipe-search-bar .value=${this.searchQuery} @search-change=${this.onSearchChange}></recipe-search-bar>
          <cookbook-select
            .cookbooks=${this.cookbooks}
            .value=${this.selectedCookbook}
            @cookbook-change=${this.onCookbookChange}
          ></cookbook-select>
        </div>
        ${this.error?l`<p style="padding:0 16px;color:var(--error-color,#db4437)">${this.error}</p>`:null}
        <recipe-grid
          .recipes=${this.recipes}
          .loading=${this.loading}
          .imageUrl=${e=>this.client.recipeImageUrl(e.id)}
          @recipe-select=${e=>this.openRecipe(e.detail.slug)}
          @favorite-toggle=${this.onFavoriteToggle}
        ></recipe-grid>
      </panel-shell>
    `}};o([d({attribute:!1})],m.prototype,"hass",2),o([d({type:Boolean})],m.prototype,"narrow",2),o([h()],m.prototype,"recipes",2),o([h()],m.prototype,"loading",2),o([h()],m.prototype,"selectedRecipe",2),o([h()],m.prototype,"searchQuery",2),o([h()],m.prototype,"cookbooks",2),o([h()],m.prototype,"selectedCookbook",2),o([h()],m.prototype,"error",2),o([h()],m.prototype,"showMealplanDialog",2),o([h()],m.prototype,"showLastmadeDialog",2),o([h()],m.prototype,"showShoppingListDialog",2),o([h()],m.prototype,"shoppingLists",2),o([h()],m.prototype,"pendingShoppingItems",2),o([h()],m.prototype,"showMealplanView",2),o([h()],m.prototype,"cameFromMealplan",2),o([h()],m.prototype,"weekStart",2),o([h()],m.prototype,"mealplanEntries",2),o([h()],m.prototype,"mealplanLoading",2),o([h()],m.prototype,"showRandomPicker",2),o([h()],m.prototype,"showDeleteConfirm",2),o([h()],m.prototype,"showShoppingView",2),o([h()],m.prototype,"selectedShoppingListId",2),o([h()],m.prototype,"shoppingListItems",2),o([h()],m.prototype,"shoppingListItemsLoading",2),o([h()],m.prototype,"showDeleteListConfirm",2),o([h()],m.prototype,"showAiView",2),o([h()],m.prototype,"aiPrompt",2),o([h()],m.prototype,"aiGenerating",2),o([h()],m.prototype,"aiError",2),o([h()],m.prototype,"aiGeneratedRecipe",2),o([h()],m.prototype,"aiImageBase64",2),o([h()],m.prototype,"aiImageMime",2),o([h()],m.prototype,"aiImageError",2),o([h()],m.prototype,"aiSaving",2),o([h()],m.prototype,"aiImporting",2),o([h()],m.prototype,"aiLastAction",2),o([h()],m.prototype,"aiLastImportText",2),o([h()],m.prototype,"aiLastImportImage",2),m=o([v("mealie-recipe-panel")],m);export{m as MealieRecipePanel};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
