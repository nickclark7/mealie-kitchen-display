var Ce=Object.defineProperty;var Me=Object.getOwnPropertyDescriptor;var d=(n,e,t,i)=>{for(var r=i>1?void 0:i?Me(e,t):e,s=n.length-1,a;s>=0;s--)(a=n[s])&&(r=(i?a(e,t,r):a(r))||r);return i&&r&&Ce(e,t,r),r};var j=globalThis,q=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),de=new WeakMap,L=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(q&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=de.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&de.set(t,e))}return e}toString(){return this.cssText}},he=n=>new L(typeof n=="string"?n:n+"",void 0,Q),P=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,r,s)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[s+1],n[0]);return new L(t,n,Q)},ue=(n,e)=>{if(q)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),r=j.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,n.appendChild(i)}},Y=q?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return he(t)})(n):n;var{is:Le,defineProperty:Ue,getOwnPropertyDescriptor:Oe,getOwnPropertyNames:He,getOwnPropertySymbols:De,getPrototypeOf:ze}=Object,G=globalThis,me=G.trustedTypes,Ne=me?me.emptyScript:"",Ie=G.reactiveElementPolyfillSupport,U=(n,e)=>n,O={toAttribute(n,e){switch(e){case Boolean:n=n?Ne:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},B=(n,e)=>!Le(n,e),ge={attribute:!0,type:String,converter:O,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??=Symbol("metadata"),G.litPropertyMetadata??=new WeakMap;var $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ge){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Ue(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:s}=Oe(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:r,set(a){let p=r?.call(this);s?.call(this,a),this.requestUpdate(e,p,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ge}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;let e=ze(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){let t=this.properties,i=[...He(t),...De(t)];for(let r of i)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let r of i)t.unshift(Y(r))}else e!==void 0&&t.push(Y(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ue(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){let s=(i.converter?.toAttribute!==void 0?i.converter:O).toAttribute(t,i.type);this._$Em=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){let i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let s=i.getPropertyOptions(r),a=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:O;this._$Em=r;let p=a.fromAttribute(t,s.type);this[r]=p??this._$Ej?.get(r)??p,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(e!==void 0){let a=this.constructor;if(r===!1&&(s=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??B)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),s!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,s]of i){let{wrapped:a}=s,p=this[r];a!==!0||this._$AL.has(r)||p===void 0||this.C(r,void 0,s,p)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[U("elementProperties")]=new Map,$[U("finalized")]=new Map,Ie?.({ReactiveElement:$}),(G.reactiveElementVersions??=[]).push("2.1.2");var re=globalThis,fe=n=>n,W=re.trustedTypes,ye=W?W.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ee="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,Ae="?"+E,Fe=`<${Ae}>`,S=document,D=()=>S.createComment(""),z=n=>n===null||typeof n!="object"&&typeof n!="function",ne=Array.isArray,je=n=>ne(n)||typeof n?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,be=/-->/g,ve=/>/g,A=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$e=/'/g,xe=/"/g,we=/^(?:script|style|textarea|title)$/i,se=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),o=se(1),it=se(2),rt=se(3),R=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),_e=new WeakMap,w=S.createTreeWalker(S,129);function Se(n,e){if(!ne(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ye!==void 0?ye.createHTML(e):e}var qe=(n,e)=>{let t=n.length-1,i=[],r,s=e===2?"<svg>":e===3?"<math>":"",a=H;for(let p=0;p<t;p++){let l=n[p],m,f,h=-1,v=0;for(;v<l.length&&(a.lastIndex=v,f=a.exec(l),f!==null);)v=a.lastIndex,a===H?f[1]==="!--"?a=be:f[1]!==void 0?a=ve:f[2]!==void 0?(we.test(f[2])&&(r=RegExp("</"+f[2],"g")),a=A):f[3]!==void 0&&(a=A):a===A?f[0]===">"?(a=r??H,h=-1):f[1]===void 0?h=-2:(h=a.lastIndex-f[2].length,m=f[1],a=f[3]===void 0?A:f[3]==='"'?xe:$e):a===xe||a===$e?a=A:a===be||a===ve?a=H:(a=A,r=void 0);let _=a===A&&n[p+1].startsWith("/>")?" ":"";s+=a===H?l+Fe:h>=0?(i.push(m),l.slice(0,h)+Ee+l.slice(h)+E+_):l+E+(h===-2?p:_)}return[Se(n,s+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},N=class n{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,a=0,p=e.length-1,l=this.parts,[m,f]=qe(e,t);if(this.el=n.createElement(m,i),w.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=w.nextNode())!==null&&l.length<p;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(Ee)){let v=f[a++],_=r.getAttribute(h).split(E),F=/([.?@])?(.*)/.exec(v);l.push({type:1,index:s,name:F[2],strings:_,ctor:F[1]==="."?X:F[1]==="?"?ee:F[1]==="@"?te:C}),r.removeAttribute(h)}else h.startsWith(E)&&(l.push({type:6,index:s}),r.removeAttribute(h));if(we.test(r.tagName)){let h=r.textContent.split(E),v=h.length-1;if(v>0){r.textContent=W?W.emptyScript:"";for(let _=0;_<v;_++)r.append(h[_],D()),w.nextNode(),l.push({type:2,index:++s});r.append(h[v],D())}}}else if(r.nodeType===8)if(r.data===Ae)l.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(E,h+1))!==-1;)l.push({type:7,index:s}),h+=E.length-1}s++}}static createElement(e,t){let i=S.createElement("template");return i.innerHTML=e,i}};function T(n,e,t=n,i){if(e===R)return e;let r=i!==void 0?t._$Co?.[i]:t._$Cl,s=z(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(n),r._$AT(n,t,i)),i!==void 0?(t._$Co??=[])[i]=r:t._$Cl=r),r!==void 0&&(e=T(n,r._$AS(n,e.values),r,i)),e}var Z=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??S).importNode(t,!0);w.currentNode=r;let s=w.nextNode(),a=0,p=0,l=i[0];for(;l!==void 0;){if(a===l.index){let m;l.type===2?m=new I(s,s.nextSibling,this,e):l.type===1?m=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(m=new ie(s,this,e)),this._$AV.push(m),l=i[++p]}a!==l?.index&&(s=w.nextNode(),a++)}return w.currentNode=S,r}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},I=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=T(this,e,t),z(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==R&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):je(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=N.createElement(Se(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{let s=new Z(r,this),a=s.u(this.options);s.p(t),this.T(a),this._$AH=s}}_$AC(e){let t=_e.get(e.strings);return t===void 0&&_e.set(e.strings,t=new N(e)),t}k(e){ne(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let s of e)r===t.length?t.push(i=new n(this.O(D()),this.O(D()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=fe(e).nextSibling;fe(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(e,t=this,i,r){let s=this.strings,a=!1;if(s===void 0)e=T(this,e,t,0),a=!z(e)||e!==this._$AH&&e!==R,a&&(this._$AH=e);else{let p=e,l,m;for(e=s[0],l=0;l<s.length-1;l++)m=T(this,p[i+l],t,l),m===R&&(m=this._$AH[l]),a||=!z(m)||m!==this._$AH[l],m===c?e=c:e!==c&&(e+=(m??"")+s[l+1]),this._$AH[l]=m}a&&!r&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},X=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}},ee=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}},te=class extends C{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=T(this,e,t,0)??c)===R)return;let i=this._$AH,r=e===c&&i!==c||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==c&&(i===c||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ie=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){T(this,e)}};var Ge=re.litHtmlPolyfillSupport;Ge?.(N,I),(re.litHtmlVersions??=[]).push("3.3.3");var Re=(n,e,t)=>{let i=t?.renderBefore??e,r=i._$litPart$;if(r===void 0){let s=t?.renderBefore??null;i._$litPart$=r=new I(e.insertBefore(D(),s),s,void 0,t??{})}return r._$AI(n),r};var ae=globalThis,y=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Re(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};y._$litElement$=!0,y.finalized=!0,ae.litElementHydrateSupport?.({LitElement:y});var Be=ae.litElementPolyfillSupport;Be?.({LitElement:y});(ae.litElementVersions??=[]).push("4.2.2");var We={attribute:!0,type:String,converter:O,reflect:!1,hasChanged:B},Ve=(n=We,e,t)=>{let{kind:i,metadata:r}=t,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),s.set(t.name,n),i==="accessor"){let{name:a}=t;return{set(p){let l=e.get.call(this);e.set.call(this,p),this.requestUpdate(a,l,n,!0,p)},init(p){return p!==void 0&&this.C(a,void 0,n,p),p}}}if(i==="setter"){let{name:a}=t;return function(p){let l=this[a];e.call(this,p),this.requestUpdate(a,l,n,!0,p)}}throw Error("Unsupported decorator location: "+i)};function b(n){return(e,t)=>typeof t=="object"?Ve(n,e,t):((i,r,s)=>{let a=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),a?Object.getOwnPropertyDescriptor(r,s):void 0})(n,e,t)}function g(n){return b({...n,state:!0,attribute:!1})}var K=class{constructor(e){this.hass=e}async searchRecipes(e={}){let t=new URLSearchParams;t.set("page",String(e.page??1)),t.set("perPage",String(e.perPage??24)),e.search&&t.set("search",e.search),e.cookbook&&t.set("cookbook",e.cookbook);for(let i of e.categories??[])t.append("categories",i);for(let i of e.tags??[])t.append("tags",i);return this.hass.callApi("GET",`mealie_recipe_panel/recipes?${t.toString()}`)}async getCookbooks(){return this.hass.callApi("GET","mealie_recipe_panel/cookbooks")}async getConfig(){return this.hass.callApi("GET","mealie_recipe_panel/config")}async getRecipe(e){return this.hass.callApi("GET",`mealie_recipe_panel/recipes/${e}`)}async updateRecipe(e,t){return this.hass.callApi("POST",`mealie_recipe_panel/recipes/${e}`,t)}async getCategories(){return this.hass.callApi("GET","mealie_recipe_panel/categories")}async getTags(){return this.hass.callApi("GET","mealie_recipe_panel/tags")}recipeImageUrl(e,t="min-original"){return`/api/mealie_recipe_panel/image/${e}/${t}`}async setFavorite(e,t){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${e}/favorite`,{favorite:t})}async setMyRecipe(e,t){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${e}/my-recipe`,{my_recipe:t})}async addToMealplan(e,t,i){return this.hass.callApi("POST","mealie_recipe_panel/mealplans",{recipeId:e,date:t,entryType:i})}async addFreeformMealplanEntry(e,t,i){return this.hass.callApi("POST","mealie_recipe_panel/mealplans",{date:e,entryType:t,title:i})}async deleteMealplanEntry(e){return this.hass.callApi("DELETE",`mealie_recipe_panel/mealplans/${e}`)}async setLastMade(e,t){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${e}/last-made`,{date:t})}async getShoppingLists(){return this.hass.callApi("GET","mealie_recipe_panel/shopping-lists")}async createShoppingList(e){return this.hass.callApi("POST","mealie_recipe_panel/shopping-lists",{name:e})}async addToShoppingList(e,t){return this.hass.callApi("POST","mealie_recipe_panel/shopping-items",{shoppingListId:e,items:t})}async getMealplans(e,t){return this.hass.callApi("GET",`mealie_recipe_panel/mealplans?start_date=${e}&end_date=${t}`)}async getRandomRecipe(e){return this.hass.callApi("GET",`mealie_recipe_panel/recipes/random?mode=${e}`)}async getRandomRecipes(e,t){let{recipes:i}=await this.hass.callApi("GET",`mealie_recipe_panel/recipes/random?mode=${e}&count=${t}`);return i}async deleteRecipe(e){return this.hass.callApi("DELETE",`mealie_recipe_panel/recipes/${e}`)}async getShoppingListDetail(e){return this.hass.callApi("GET",`mealie_recipe_panel/shopping-lists/${e}`)}async setShoppingItemChecked(e,t){return this.hass.callApi("PUT",`mealie_recipe_panel/shopping-items/${e}/checked`,{checked:t})}async deleteShoppingList(e){return this.hass.callApi("DELETE",`mealie_recipe_panel/shopping-lists/${e}`)}async generateRecipe(e){let{recipe:t}=await this.hass.callApi("POST","mealie_recipe_panel/ai/generate-recipe",{prompt:e});return t}async saveGeneratedRecipe(e,t,i){return this.hass.callApi("POST","mealie_recipe_panel/ai/save-recipe",{recipe:e,imageBase64:t,imageMime:i})}async importRecipe(e,t){let i=null,r=null;t&&(i=await Ke(t),r=t.type||"image/jpeg");let{recipe:s}=await this.hass.callApi("POST","mealie_recipe_panel/ai/import-recipe",{text:e,imageBase64:i,imageMime:r});return s}async generateRecipeImage(e,t){return this.hass.callApi("POST","mealie_recipe_panel/ai/generate-recipe-image",{subject:e,guidance:t})}async attachRecipeImage(e,t,i){return this.hass.callApi("POST",`mealie_recipe_panel/recipes/${e}/ai-image`,{imageBase64:t,imageMime:i})}};function Ke(n){return new Promise((e,t)=>{let i=new FileReader;i.onload=()=>{let r=i.result;e(r.slice(r.indexOf(",")+1))},i.onerror=()=>t(i.error),i.readAsDataURL(n)})}async function k(n,e){if(n instanceof Error&&n.message)return n.message;if(n&&typeof n=="object"){let t=n;if(typeof t.text=="function")try{let s=await t.text();if(s)return s}catch{}let i=n.message;if(typeof i=="string"&&i)return i;let r=n.status;if(typeof r=="number")return`Request failed (HTTP ${r})`}return e}function ke(n){let e=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),i=String(n.getDate()).padStart(2,"0");return`${e}-${t}-${i}`}function oe(){return ke(new Date)}function le(n,e){let t=new Date(`${n}T00:00:00`);return t.setDate(t.getDate()+e),ke(t)}var x=class extends y{constructor(){super(...arguments);this.open=!1;this.heading="Are you sure?";this.message="";this.confirmLabel="Confirm";this.destructive=!1}render(){return this.open?o`
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
    `:null}};x.styles=P`
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
  `,d([b({type:Boolean,reflect:!0})],x.prototype,"open",2),d([b({type:String})],x.prototype,"heading",2),d([b({type:String})],x.prototype,"message",2),d([b({type:String})],x.prototype,"confirmLabel",2),d([b({type:Boolean})],x.prototype,"destructive",2);customElements.get("confirm-dialog")||customElements.define("confirm-dialog",x);var ce=["breakfast","lunch","dinner","side","snack","drink","dessert"],Pe={all:"All Recipes","my-recipes":"My Recipes",favorites:"Favorites","made-before":"Made Before"},pe={mealplan:"This Week's Meals",random:"Random Recipes","random-finder":"Surprise Me","ai-generate":"Generate a Recipe with AI",search:"Find a Recipe"},Te={mealplan:"\u{1F4C5}",random:"\u{1F37D}","random-finder":"\u{1F3B2}","ai-generate":"\u2728",search:"\u{1F50E}"};function Qe(n){return new Date(`${n}T00:00:00`).toLocaleDateString(void 0,{weekday:"short"})}function Ye(n){return new Date(`${n}T00:00:00`).toLocaleDateString(void 0,{month:"short",day:"numeric"})}var u=class extends y{constructor(){super(...arguments);this.config={type:"custom:mealie-dashboard-card",mode:"mealplan"};this.panelConfig={aiEnabled:!0,aiConfigured:!0};this.loading=!1;this.error="";this.mealplanEntries=[];this.addFreeformDate=null;this.freeformText="";this.freeformEntryType="dinner";this.freeformSaving=!1;this.pendingDeleteEntry=null;this.randomRecipes=[];this.pickedRecipe=null;this.pickerMode="all";this.aiPrompt="";this.searchQuery="";this.searchResults=[]}setConfig(t){if(!t.mode)throw new Error("mealie-dashboard-card: 'mode' is required (mealplan, random, random-finder, ai-generate, search)");let i=this.config.mode;this.config={panel_path:"/mealie-recipes",count:4,random_mode:"all",days:7,show_thumbnails:!1,...t},this.pickerMode=this.config.random_mode??"all",this.client&&this.config.mode!==i&&this.loadModeData()}static getStubConfig(){return{mode:"mealplan"}}static getConfigElement(){return document.createElement("mealie-dashboard-card-editor")}getCardSize(){return this.config.mode==="mealplan"?this.config.show_thumbnails?5:4:3}willUpdate(){!this.client&&this.hass&&(this.client=new K(this.hass),this.loadConfig(),this.loadModeData())}async loadConfig(){if(this.client)try{this.panelConfig=await this.client.getConfig()}catch{}}loadModeData(){this.client&&(this.error="",this.config.mode==="mealplan"?this.loadMealplan():this.config.mode==="random"?this.loadRandomRecipes():this.config.mode==="random-finder"&&(this.pickedRecipe=null))}async loadMealplan(){if(this.client){this.loading=!0;try{let t=oe(),i=le(t,(this.config.days??7)-1),r=await this.client.getMealplans(t,i);this.mealplanEntries=r.items}catch(t){this.error=await k(t,"Failed to load meal plan")}finally{this.loading=!1}}}openFreeformAdd(t){this.addFreeformDate=t,this.freeformText="",this.freeformEntryType="dinner"}cancelFreeformAdd(){this.addFreeformDate=null,this.freeformText=""}async submitFreeformAdd(){if(!(!this.client||!this.addFreeformDate||!this.freeformText.trim())){this.freeformSaving=!0;try{await this.client.addFreeformMealplanEntry(this.addFreeformDate,this.freeformEntryType,this.freeformText.trim()),this.addFreeformDate=null,this.freeformText="",await this.loadMealplan()}catch(t){this.error=await k(t,"Failed to add meal plan entry")}finally{this.freeformSaving=!1}}}requestDeleteEntry(t){this.pendingDeleteEntry=t}cancelDeleteEntry(){this.pendingDeleteEntry=null}async confirmDeleteEntry(){if(!this.client||!this.pendingDeleteEntry)return;let t=this.pendingDeleteEntry;this.pendingDeleteEntry=null;try{await this.client.deleteMealplanEntry(t.id),this.mealplanEntries=this.mealplanEntries.filter(i=>i.id!==t.id)}catch(i){this.error=await k(i,"Failed to remove meal plan entry")}}async loadRandomRecipes(){if(this.client){this.loading=!0;try{let t=this.config.random_mode??"all",i=this.config.count??4;this.randomRecipes=await this.client.getRandomRecipes(t,i)}catch(t){this.error=await k(t,"Failed to load random recipes")}finally{this.loading=!1}}}async pickRandom(){if(this.client){this.loading=!0,this.error="";try{let{recipe:t}=await this.client.getRandomRecipe(this.pickerMode);this.pickedRecipe=t,t||(this.error="No recipes found for that filter.")}catch(t){this.error=await k(t,"Failed to pick a recipe")}finally{this.loading=!1}}}onSearchInput(t){this.searchQuery=t.target.value,window.clearTimeout(this.searchTimer),this.searchTimer=window.setTimeout(()=>this.runSearch(),350)}async runSearch(){if(!this.client)return;let t=this.searchQuery.trim();if(!t){this.searchResults=[];return}this.loading=!0,this.error="";try{let i=await this.client.searchRecipes({search:t,perPage:6});this.searchResults=i.items}catch(i){this.error=await k(i,"Search failed")}finally{this.loading=!1}}navigate(t){history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}openRecipe(t){t&&this.navigate(`${this.config.panel_path}?recipe=${encodeURIComponent(t.slug)}`)}openAiPrompt(){let t=this.aiPrompt.trim();t&&this.navigate(`${this.config.panel_path}?ai_prompt=${encodeURIComponent(t)}`)}openSearchInApp(){let t=this.searchQuery.trim();t&&this.navigate(`${this.config.panel_path}?search=${encodeURIComponent(t)}`)}imageUrl(t){return this.client.recipeImageUrl(t.id)}renderHeader(){let t=this.config.mode;return o`
      <div class="header">
        <span class="icon">${Te[t]}</span>
        <span class="title">${this.config.title||pe[t]}</span>
        ${t==="random"?o`<button class="shuffle" aria-label="Shuffle" @click=${()=>this.loadRandomRecipes()}>🔄</button>`:c}
      </div>
    `}renderMealplanEntry(t){let i=t.recipe?.name??(t.title||"Untitled");return this.config.show_thumbnails?o`
      <div class="entry-thumb">
        <div class="entry-thumb-img-wrap">
          <button
            class="entry-thumb-img-btn"
            ?disabled=${!t.recipe}
            @click=${()=>this.openRecipe(t.recipe)}
          >
            ${t.recipe?.image?o`<img src=${this.imageUrl(t.recipe)} alt="" />`:o`<div class="thumb"></div>`}
          </button>
          <button class="entry-thumb-del" aria-label="Remove from plan" @click=${()=>this.requestDeleteEntry(t)}>
            ✕
          </button>
        </div>
        <span class="entry-thumb-name">${i}</span>
      </div>
    `:o`
        <span class="entry-chip-group">
          <button class="entry-chip" ?disabled=${!t.recipe} @click=${()=>this.openRecipe(t.recipe)}>
            ${i}
          </button>
          <button class="entry-chip-del" aria-label="Remove from plan" @click=${()=>this.requestDeleteEntry(t)}>
            ✕
          </button>
        </span>
      `}renderFreeformForm(){return o`
      <div class="freeform-form">
        <input
          type="text"
          placeholder="e.g. Leftovers, Takeout, Eating out"
          .value=${this.freeformText}
          @input=${t=>this.freeformText=t.target.value}
          @keydown=${t=>{t.key==="Enter"&&this.submitFreeformAdd()}}
        />
        <select
          .value=${this.freeformEntryType}
          @change=${t=>this.freeformEntryType=t.target.value}
        >
          ${ce.map(t=>o`<option value=${t}>${t}</option>`)}
        </select>
        <button
          class="primary small"
          ?disabled=${this.freeformSaving||!this.freeformText.trim()}
          @click=${()=>this.submitFreeformAdd()}
        >
          ${this.freeformSaving?"Adding\u2026":"Add"}
        </button>
        <button class="cancel-small" @click=${()=>this.cancelFreeformAdd()}>Cancel</button>
      </div>
    `}renderMealplan(){if(this.loading&&!this.mealplanEntries.length)return o`<p class="muted">Loading…</p>`;let t=Array.from({length:this.config.days??7},(i,r)=>le(oe(),r));return o`
      ${t.map(i=>{let r=this.mealplanEntries.filter(s=>s.date===i).sort((s,a)=>ce.indexOf(s.entryType)-ce.indexOf(a.entryType));return o`
          <div class="day-row">
            <div class="day-label">${Qe(i)}<br />${Ye(i)}</div>
            <div class="day-col">
              <div class="day-entries">
                ${r.length?r.map(s=>this.renderMealplanEntry(s)):c}
                ${!r.length&&this.addFreeformDate!==i?o`<span class="muted">Nothing planned</span>`:c}
                ${this.addFreeformDate!==i?o`<button class="add-freeform" @click=${()=>this.openFreeformAdd(i)}>+ Add</button>`:c}
              </div>
              ${this.addFreeformDate===i?this.renderFreeformForm():c}
            </div>
          </div>
        `})}
    `}renderRandom(){return this.loading&&!this.randomRecipes.length?o`<p class="muted">Loading…</p>`:this.randomRecipes.length?o`
      <div class="tiles">
        ${this.randomRecipes.map(t=>o`
            <button class="tile" @click=${()=>this.openRecipe(t)}>
              ${t.image?o`<img src=${this.imageUrl(t)} alt="" />`:o`<div class="thumb"></div>`}
              <div class="name">${t.name}</div>
            </button>
          `)}
      </div>
    `:o`<p class="muted">No recipes found.</p>`}renderRandomFinder(){return o`
      <div class="finder-controls">
        <select
          .value=${this.pickerMode}
          @change=${t=>this.pickerMode=t.target.value}
        >
          ${Object.entries(Pe).map(([t,i])=>o`<option value=${t}>${i}</option>`)}
        </select>
        <button class="primary" ?disabled=${this.loading} @click=${()=>this.pickRandom()}>
          ${this.loading?"Picking\u2026":"\u{1F3B2} Surprise Me"}
        </button>
      </div>
      ${this.pickedRecipe?o`
            <div class="picked-card" @click=${()=>this.openRecipe(this.pickedRecipe)}>
              ${this.pickedRecipe.image?o`<img src=${this.imageUrl(this.pickedRecipe)} alt="" />`:o`<div class="thumb"></div>`}
              <div>
                <div class="name">${this.pickedRecipe.name}</div>
                <div class="hint">Tap to open</div>
              </div>
            </div>
            <button class="try-again" @click=${()=>this.pickRandom()}>🔄 Try Again</button>
          `:c}
    `}renderAiGenerate(){return this.panelConfig.aiEnabled?this.panelConfig.aiConfigured?o`
      <textarea
        placeholder="e.g. a thick and crispy pizza dough recipe"
        .value=${this.aiPrompt}
        @input=${t=>this.aiPrompt=t.target.value}
      ></textarea>
      <button
        class="primary"
        style="margin-top: 10px; width: 100%;"
        ?disabled=${!this.aiPrompt.trim()}
        @click=${()=>this.openAiPrompt()}
      >
        ✨ Generate Recipe
      </button>
    `:o`
        <p class="setup-needed">
          Choose an AI Task entity for this integration under
          <strong>Settings → Devices &amp; Services → Mealie Kitchen Display → Configure</strong>
          to start generating recipes with AI.
        </p>
      `:o`<p class="setup-needed">AI recipe features are disabled in this integration's settings.</p>`}renderSearch(){let t=this.searchQuery.trim(),i=this.panelConfig.aiEnabled&&t.length>0;return o`
      <div class="search-row">
        <input
          type="text"
          placeholder="Search recipes…"
          .value=${this.searchQuery}
          @input=${this.onSearchInput}
        />
      </div>
      ${this.loading?o`<p class="muted">Searching…</p>`:c}
      ${!this.loading&&t&&!this.searchResults.length?o`<p class="muted">No recipes found.</p>`:c}
      ${this.searchResults.map(r=>o`
          <button class="result-row" @click=${()=>this.openRecipe(r)}>
            ${r.image?o`<img src=${this.imageUrl(r)} alt="" />`:o`<div class="thumb"></div>`}
            <span class="name">${r.name}</span>
          </button>
        `)}
      ${this.searchResults.length?o`<button class="see-all" @click=${()=>this.openSearchInApp()}>See all results in app →</button>`:c}
      ${i?o`
            <button class="ai-cta" @click=${()=>this.navigate(`${this.config.panel_path}?ai_prompt=${encodeURIComponent(t)}`)}>
              ✨ Generate "${t}" recipe with AI
            </button>
          `:c}
    `}render(){let t;switch(this.config.mode){case"mealplan":t=this.renderMealplan();break;case"random":t=this.renderRandom();break;case"random-finder":t=this.renderRandomFinder();break;case"ai-generate":t=this.renderAiGenerate();break;case"search":t=this.renderSearch();break}return o`
      <ha-card>
        ${this.renderHeader()}
        ${t}
        ${this.error?o`<p class="error">${this.error}</p>`:c}
      </ha-card>
      <confirm-dialog
        .open=${!!this.pendingDeleteEntry}
        heading="Remove from meal plan?"
        message=${`"${this.pendingDeleteEntry?.recipe?.name??this.pendingDeleteEntry?.title??"This item"}" will be removed from the meal plan.`}
        confirmLabel="Remove"
        destructive
        @confirm=${()=>this.confirmDeleteEntry()}
        @cancel=${()=>this.cancelDeleteEntry()}
      ></confirm-dialog>
    `}};u.styles=P`
    :host {
      display: block;
    }
    ha-card {
      padding: 16px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
    }
    .header .icon {
      font-size: 22px;
    }
    .header .title {
      font-size: 17px;
      font-weight: 600;
      flex: 1;
    }
    .header button.shuffle {
      border: none;
      background: transparent;
      color: var(--secondary-text-color, #757575);
      font-size: 18px;
      cursor: pointer;
      padding: 4px 6px;
    }
    .muted {
      color: var(--secondary-text-color, #757575);
      font-size: 14px;
    }
    .error {
      color: var(--error-color, #db4437);
      font-size: 14px;
      margin-top: 8px;
    }

    /* mealplan */
    .day-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 0;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .day-row:first-of-type {
      border-top: none;
    }
    .day-label {
      width: 64px;
      flex-shrink: 0;
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color, #757575);
      padding-top: 6px;
    }
    .day-col {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      min-width: 0;
    }
    .day-entries {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
    }
    .add-freeform {
      border: 1px dashed var(--divider-color, #e0e0e0);
      background: transparent;
      color: var(--secondary-text-color, #757575);
      border-radius: 16px;
      padding: 6px 12px;
      font-size: 13px;
      cursor: pointer;
    }
    .freeform-form {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
    }
    .freeform-form input[type="text"] {
      flex: 1;
      min-width: 140px;
    }
    .freeform-form select {
      min-height: 36px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 13px;
    }
    button.primary.small {
      min-height: 36px;
      padding: 0 14px;
      font-size: 13px;
    }
    button.cancel-small {
      border: none;
      background: transparent;
      color: var(--secondary-text-color, #757575);
      font-size: 13px;
      cursor: pointer;
      padding: 0 6px;
    }
    .entry-chip-group {
      display: inline-flex;
      align-items: stretch;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 16px;
      overflow: hidden;
      background: var(--primary-background-color, #fafafa);
    }
    .entry-chip {
      border: none;
      background: transparent;
      color: inherit;
      padding: 6px 10px 6px 12px;
      font-size: 13px;
      cursor: pointer;
    }
    .entry-chip:disabled {
      cursor: default;
      opacity: 0.7;
    }
    .entry-chip-del {
      border: none;
      border-left: 1px solid var(--divider-color, #e0e0e0);
      background: transparent;
      color: var(--secondary-text-color, #757575);
      font-size: 11px;
      padding: 0 10px;
      cursor: pointer;
    }
    .entry-chip-del:hover {
      background: var(--error-color, #db4437);
      color: #fff;
    }
    .entry-thumb {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      width: 72px;
    }
    .entry-thumb-img-wrap {
      position: relative;
      width: 72px;
      height: 72px;
    }
    .entry-thumb-img-btn {
      width: 72px;
      height: 72px;
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      display: block;
    }
    .entry-thumb-img-btn:disabled {
      cursor: default;
    }
    .entry-thumb-img-btn img,
    .entry-thumb-img-btn .thumb {
      width: 72px;
      height: 72px;
      border-radius: 10px;
      object-fit: cover;
      background: var(--divider-color, #e0e0e0);
      display: block;
    }
    .entry-thumb-del {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 20px;
      height: 20px;
      border: none;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 11px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .entry-thumb-del:hover {
      background: var(--error-color, #db4437);
    }
    .entry-thumb-name {
      font-size: 12px;
      text-align: center;
      line-height: 1.25;
    }

    /* random tiles */
    .tiles {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 10px;
    }
    .tile {
      background: var(--primary-background-color, #fafafa);
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      border: none;
      padding: 0;
      text-align: left;
      color: inherit;
      font: inherit;
    }
    .tile img,
    .tile .thumb {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      display: block;
      background: var(--divider-color, #e0e0e0);
    }
    .tile .name {
      padding: 8px;
      font-size: 13px;
      font-weight: 600;
      line-height: 1.3;
    }

    /* random-finder */
    .finder-controls {
      display: flex;
      gap: 8px;
      margin-bottom: 14px;
    }
    .finder-controls select {
      flex: 1;
      min-height: 40px;
      border-radius: 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      padding: 0 8px;
    }
    button.primary {
      min-height: 44px;
      padding: 0 18px;
      border-radius: 22px;
      border: none;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
    button.primary:disabled {
      opacity: 0.6;
      cursor: default;
    }
    .picked-card {
      display: flex;
      gap: 12px;
      align-items: center;
      cursor: pointer;
      background: var(--primary-background-color, #fafafa);
      border-radius: 12px;
      padding: 10px;
      margin-top: 12px;
    }
    .picked-card img,
    .picked-card .thumb {
      width: 84px;
      height: 84px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
      background: var(--divider-color, #e0e0e0);
    }
    .picked-card .name {
      font-size: 16px;
      font-weight: 600;
    }
    .picked-card .hint {
      font-size: 13px;
      color: var(--secondary-text-color, #757575);
      margin-top: 4px;
    }
    .try-again {
      margin-top: 10px;
      background: transparent;
      border: none;
      color: var(--primary-color, #03a9f4);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      padding: 4px 0;
    }

    /* ai-generate */
    textarea,
    input[type="text"] {
      width: 100%;
      box-sizing: border-box;
      font-family: inherit;
      font-size: 15px;
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
    }
    textarea {
      min-height: 72px;
      resize: vertical;
    }
    .setup-needed {
      font-size: 14px;
      color: var(--secondary-text-color, #757575);
      line-height: 1.5;
    }

    /* search */
    .search-row {
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
    }
    .result-row {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      text-align: left;
      border: none;
      background: transparent;
      color: inherit;
      font: inherit;
      cursor: pointer;
      padding: 8px 0;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .result-row:first-of-type {
      border-top: none;
    }
    .result-row img,
    .result-row .thumb {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
      background: var(--divider-color, #e0e0e0);
    }
    .ai-cta {
      margin-top: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
      border: 2px dashed var(--primary-color, #03a9f4);
      border-radius: 12px;
      background: transparent;
      color: var(--primary-color, #03a9f4);
      font-size: 14px;
      font-weight: 600;
      padding: 10px 12px;
      cursor: pointer;
    }
    .see-all {
      margin-top: 6px;
      background: transparent;
      border: none;
      color: var(--primary-color, #03a9f4);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      padding: 4px 0;
    }
  `,d([b({attribute:!1})],u.prototype,"hass",2),d([g()],u.prototype,"config",2),d([g()],u.prototype,"panelConfig",2),d([g()],u.prototype,"loading",2),d([g()],u.prototype,"error",2),d([g()],u.prototype,"mealplanEntries",2),d([g()],u.prototype,"addFreeformDate",2),d([g()],u.prototype,"freeformText",2),d([g()],u.prototype,"freeformEntryType",2),d([g()],u.prototype,"freeformSaving",2),d([g()],u.prototype,"pendingDeleteEntry",2),d([g()],u.prototype,"randomRecipes",2),d([g()],u.prototype,"pickedRecipe",2),d([g()],u.prototype,"pickerMode",2),d([g()],u.prototype,"aiPrompt",2),d([g()],u.prototype,"searchQuery",2),d([g()],u.prototype,"searchResults",2);var M=class extends y{setConfig(e){this._config=e}updateConfig(e){this._config&&(this._config={...this._config,...e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0})))}render(){if(!this._config)return c;let e=this._config.mode;return o`
      <div class="row">
        <label>Mode</label>
        <select
          .value=${e}
          @change=${t=>this.updateConfig({mode:t.target.value})}
        >
          ${Object.entries(pe).map(([t,i])=>o`<option value=${t}>${Te[t]} ${i}</option>`)}
        </select>
      </div>

      <div class="row">
        <label>Title</label>
        <input
          type="text"
          placeholder=${pe[e]}
          .value=${this._config.title??""}
          @input=${t=>this.updateConfig({title:t.target.value})}
        />
        <span class="hint">Leave blank to use the default title for this mode.</span>
      </div>

      ${e==="random"?o`
            <div class="row">
              <label>Number of recipes</label>
              <input
                type="number"
                min="1"
                max="12"
                .value=${String(this._config.count??4)}
                @input=${t=>this.updateConfig({count:Number(t.target.value)||4})}
              />
            </div>
          `:c}
      ${e==="mealplan"?o`
            <div class="row">
              <label>Number of days</label>
              <input
                type="number"
                min="1"
                max="14"
                .value=${String(this._config.days??7)}
                @input=${t=>this.updateConfig({days:Number(t.target.value)||7})}
              />
              <span class="hint">Rolling window starting today.</span>
            </div>
            <div class="row checkbox-row">
              <label>
                <input
                  type="checkbox"
                  .checked=${this._config.show_thumbnails??!1}
                  @change=${t=>this.updateConfig({show_thumbnails:t.target.checked})}
                />
                Show recipe thumbnails
              </label>
            </div>
          `:c}
      ${e==="random"||e==="random-finder"?o`
            <div class="row">
              <label>Recipe pool</label>
              <select
                .value=${this._config.random_mode??"all"}
                @change=${t=>this.updateConfig({random_mode:t.target.value})}
              >
                ${Object.entries(Pe).map(([t,i])=>o`<option value=${t}>${i}</option>`)}
              </select>
            </div>
          `:c}

      <div class="row">
        <label>Panel path</label>
        <input
          type="text"
          placeholder="/mealie-recipes"
          .value=${this._config.panel_path??""}
          @input=${t=>this.updateConfig({panel_path:t.target.value})}
        />
        <span class="hint">Only needed if you've registered the panel under a different URL.</span>
      </div>
    `}};M.styles=P`
    .row {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }
    label {
      font-size: 14px;
      font-weight: 600;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
      margin-top: -2px;
    }
    select,
    input:not([type="checkbox"]) {
      min-height: 40px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: inherit;
      font-size: 14px;
      padding: 0 10px;
      box-sizing: border-box;
      font-family: inherit;
    }
    .checkbox-row label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 400;
    }
    .checkbox-row input[type="checkbox"] {
      width: 18px;
      height: 18px;
    }
  `,d([b({attribute:!1})],M.prototype,"hass",2),d([g()],M.prototype,"_config",2);window.customCards=window.customCards||[];window.customCards.push({type:"mealie-dashboard-card",name:"Mealie Recipe Card",description:"Meal plan, random recipes, AI recipe generator, surprise-me picker, or recipe search \u2014 pick a mode in the card config. Selecting a recipe opens it in the full Mealie panel."});customElements.get("mealie-dashboard-card")||customElements.define("mealie-dashboard-card",u);customElements.get("mealie-dashboard-card-editor")||customElements.define("mealie-dashboard-card-editor",M);export{u as MealieDashboardCard,M as MealieDashboardCardEditor};
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
*/
