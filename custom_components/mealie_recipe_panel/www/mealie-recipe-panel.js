var ht=Object.defineProperty;var ut=Object.getOwnPropertyDescriptor;var a=(s,i,e,t)=>{for(var r=t>1?void 0:t?ut(i,e):i,n=s.length-1,o;n>=0;n--)(o=s[n])&&(r=(t?o(i,e,r):o(r))||r);return t&&r&&ht(i,e,r),r};var pe=globalThis,ce=pe.ShadowRoot&&(pe.ShadyCSS===void 0||pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ie=Symbol(),Fe=new WeakMap,te=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==Ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(ce&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=Fe.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&Fe.set(e,i))}return i}toString(){return this.cssText}},He=s=>new te(typeof s=="string"?s:s+"",void 0,Ie),b=(s,...i)=>{let e=s.length===1?s[0]:i.reduce((t,r,n)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1],s[0]);return new te(e,s,Ie)},Be=(s,i)=>{if(ce)s.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),r=pe.litNonce;r!==void 0&&t.setAttribute("nonce",r),t.textContent=e.cssText,s.appendChild(t)}},Te=ce?s=>s:s=>s instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return He(e)})(s):s;var{is:mt,defineProperty:gt,getOwnPropertyDescriptor:ft,getOwnPropertyNames:vt,getOwnPropertySymbols:xt,getPrototypeOf:bt}=Object,de=globalThis,Ne=de.trustedTypes,yt=Ne?Ne.emptyScript:"",$t=de.reactiveElementPolyfillSupport,ie=(s,i)=>s,re={toAttribute(s,i){switch(i){case Boolean:s=s?yt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,i){let e=s;switch(i){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},he=(s,i)=>!mt(s,i),Ge={attribute:!0,type:String,converter:re,reflect:!1,useDefault:!1,hasChanged:he};Symbol.metadata??=Symbol("metadata"),de.litPropertyMetadata??=new WeakMap;var M=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=Ge){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),r=this.getPropertyDescriptor(i,t,e);r!==void 0&&gt(this.prototype,i,r)}}static getPropertyDescriptor(i,e,t){let{get:r,set:n}=ft(this.prototype,i)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let h=r?.call(this);n?.call(this,o),this.requestUpdate(i,h,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Ge}static _$Ei(){if(this.hasOwnProperty(ie("elementProperties")))return;let i=bt(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(ie("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ie("properties"))){let e=this.properties,t=[...vt(e),...xt(e)];for(let r of t)this.createProperty(r,e[r])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let r=this._$Eu(e,t);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let r of t)e.unshift(Te(r))}else i!==void 0&&e.push(Te(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Be(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),r=this.constructor._$Eu(i,t);if(r!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:re).toAttribute(e,t.type);this._$Em=i,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(i,e){let t=this.constructor,r=t._$Eh.get(i);if(r!==void 0&&this._$Em!==r){let n=t.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:re;this._$Em=r;let h=o.fromAttribute(e,n.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(i,e,t,r=!1,n){if(i!==void 0){let o=this.constructor;if(r===!1&&(n=this[i]),t??=o.getPropertyOptions(i),!((t.hasChanged??he)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:r,wrapped:n},o){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,o??e??this[i]),n!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),r===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[r,n]of t){let{wrapped:o}=n,h=this[r];o!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,n,h)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[ie("elementProperties")]=new Map,M[ie("finalized")]=new Map,$t?.({ReactiveElement:M}),(de.reactiveElementVersions??=[]).push("2.1.2");var _e=globalThis,Oe=s=>s,ue=_e.trustedTypes,je=ue?ue.createPolicy("lit-html",{createHTML:s=>s}):void 0,Ae="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,Ce="?"+z,Et=`<${Ce}>`,j=document,ne=()=>j.createComment(""),ae=s=>s===null||typeof s!="object"&&typeof s!="function",Le=Array.isArray,Je=s=>Le(s)||typeof s?.[Symbol.iterator]=="function",Se=`[ 	
\f\r]`,se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qe=/-->/g,Ye=/>/g,G=RegExp(`>|${Se}(?:([^\\s"'>=/]+)(${Se}*=${Se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),We=/'/g,Ke=/"/g,Ze=/^(?:script|style|textarea|title)$/i,Re=s=>(i,...e)=>({_$litType$:s,strings:i,values:e}),l=Re(1),Bt=Re(2),Nt=Re(3),D=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Qe=new WeakMap,O=j.createTreeWalker(j,129);function Xe(s,i){if(!Le(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return je!==void 0?je.createHTML(i):i}var Ve=(s,i)=>{let e=s.length-1,t=[],r,n=i===2?"<svg>":i===3?"<math>":"",o=se;for(let h=0;h<e;h++){let d=s[h],x,y,u=-1,E=0;for(;E<d.length&&(o.lastIndex=E,y=o.exec(d),y!==null);)E=o.lastIndex,o===se?y[1]==="!--"?o=qe:y[1]!==void 0?o=Ye:y[2]!==void 0?(Ze.test(y[2])&&(r=RegExp("</"+y[2],"g")),o=G):y[3]!==void 0&&(o=G):o===G?y[0]===">"?(o=r??se,u=-1):y[1]===void 0?u=-2:(u=o.lastIndex-y[2].length,x=y[1],o=y[3]===void 0?G:y[3]==='"'?Ke:We):o===Ke||o===We?o=G:o===qe||o===Ye?o=se:(o=G,r=void 0);let $=o===G&&s[h+1].startsWith("/>")?" ":"";n+=o===se?d+Et:u>=0?(t.push(x),d.slice(0,u)+Ae+d.slice(u)+z+$):d+z+(u===-2?h:$)}return[Xe(s,n+(s[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},oe=class s{constructor({strings:i,_$litType$:e},t){let r;this.parts=[];let n=0,o=0,h=i.length-1,d=this.parts,[x,y]=Ve(i,e);if(this.el=s.createElement(x,t),O.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=O.nextNode())!==null&&d.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(let u of r.getAttributeNames())if(u.endsWith(Ae)){let E=y[o++],$=r.getAttribute(u).split(z),I=/([.?@])?(.*)/.exec(E);d.push({type:1,index:n,name:I[2],strings:$,ctor:I[1]==="."?ge:I[1]==="?"?fe:I[1]==="@"?ve:Y}),r.removeAttribute(u)}else u.startsWith(z)&&(d.push({type:6,index:n}),r.removeAttribute(u));if(Ze.test(r.tagName)){let u=r.textContent.split(z),E=u.length-1;if(E>0){r.textContent=ue?ue.emptyScript:"";for(let $=0;$<E;$++)r.append(u[$],ne()),O.nextNode(),d.push({type:2,index:++n});r.append(u[E],ne())}}}else if(r.nodeType===8)if(r.data===Ce)d.push({type:2,index:n});else{let u=-1;for(;(u=r.data.indexOf(z,u+1))!==-1;)d.push({type:7,index:n}),u+=z.length-1}n++}}static createElement(i,e){let t=j.createElement("template");return t.innerHTML=i,t}};function q(s,i,e=s,t){if(i===D)return i;let r=t!==void 0?e._$Co?.[t]:e._$Cl,n=ae(i)?void 0:i._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,e,t)),t!==void 0?(e._$Co??=[])[t]=r:e._$Cl=r),r!==void 0&&(i=q(s,r._$AS(s,i.values),r,t)),i}var me=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,r=(i?.creationScope??j).importNode(e,!0);O.currentNode=r;let n=O.nextNode(),o=0,h=0,d=t[0];for(;d!==void 0;){if(o===d.index){let x;d.type===2?x=new Q(n,n.nextSibling,this,i):d.type===1?x=new d.ctor(n,d.name,d.strings,this,i):d.type===6&&(x=new xe(n,this,i)),this._$AV.push(x),d=t[++h]}o!==d?.index&&(n=O.nextNode(),o++)}return O.currentNode=j,r}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},Q=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,r){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=q(this,i,e),ae(i)?i===g||i==null||i===""?(this._$AH!==g&&this._$AR(),this._$AH=g):i!==this._$AH&&i!==D&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Je(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==g&&ae(this._$AH)?this._$AA.nextSibling.data=i:this.T(j.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,r=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=oe.createElement(Xe(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new me(r,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(i){let e=Qe.get(i.strings);return e===void 0&&Qe.set(i.strings,e=new oe(i)),e}k(i){Le(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,r=0;for(let n of i)r===e.length?e.push(t=new s(this.O(ne()),this.O(ne()),this,this.options)):t=e[r],t._$AI(n),r++;r<e.length&&(this._$AR(t&&t._$AB.nextSibling,r),e.length=r)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=Oe(i).nextSibling;Oe(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},Y=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,r,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=i,this.name=e,this._$AM=r,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=g}_$AI(i,e=this,t,r){let n=this.strings,o=!1;if(n===void 0)i=q(this,i,e,0),o=!ae(i)||i!==this._$AH&&i!==D,o&&(this._$AH=i);else{let h=i,d,x;for(i=n[0],d=0;d<n.length-1;d++)x=q(this,h[t+d],e,d),x===D&&(x=this._$AH[d]),o||=!ae(x)||x!==this._$AH[d],x===g?i=g:i!==g&&(i+=(x??"")+n[d+1]),this._$AH[d]=x}o&&!r&&this.j(i)}j(i){i===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},ge=class extends Y{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===g?void 0:i}},fe=class extends Y{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==g)}},ve=class extends Y{constructor(i,e,t,r,n){super(i,e,t,r,n),this.type=5}_$AI(i,e=this){if((i=q(this,i,e,0)??g)===D)return;let t=this._$AH,r=i===g&&t!==g||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,n=i!==g&&(t===g||r);r&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},xe=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){q(this,i)}},et={M:Ae,P:z,A:Ce,C:1,L:Ve,R:me,D:Je,V:q,I:Q,H:Y,N:fe,U:ve,B:ge,F:xe},wt=_e.litHtmlPolyfillSupport;wt?.(oe,Q),(_e.litHtmlVersions??=[]).push("3.3.3");var tt=(s,i,e)=>{let t=e?.renderBefore??i,r=t._$litPart$;if(r===void 0){let n=e?.renderBefore??null;t._$litPart$=r=new Q(i.insertBefore(ne(),n),n,void 0,e??{})}return r._$AI(s),r};var Pe=globalThis,f=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=tt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}};f._$litElement$=!0,f.finalized=!0,Pe.litElementHydrateSupport?.({LitElement:f});var kt=Pe.litElementPolyfillSupport;kt?.({LitElement:f});(Pe.litElementVersions??=[]).push("4.2.2");var v=s=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,i)}):customElements.define(s,i)};var It={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:he},Tt=(s=It,i,e)=>{let{kind:t,metadata:r}=e,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),t==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(e.name,s),t==="accessor"){let{name:o}=e;return{set(h){let d=i.get.call(this);i.set.call(this,h),this.requestUpdate(o,d,s,!0,h)},init(h){return h!==void 0&&this.C(o,void 0,s,h),h}}}if(t==="setter"){let{name:o}=e;return function(h){let d=this[o];i.call(this,h),this.requestUpdate(o,d,s,!0,h)}}throw Error("Unsupported decorator location: "+t)};function c(s){return(i,e)=>typeof e=="object"?Tt(s,i,e):((t,r,n)=>{let o=r.hasOwnProperty(n);return r.constructor.createProperty(n,t),o?Object.getOwnPropertyDescriptor(r,n):void 0})(s,i,e)}function p(s){return c({...s,state:!0,attribute:!1})}var ye=class{constructor(i){this.hass=i}async searchRecipes(i={}){let e=new URLSearchParams;e.set("page",String(i.page??1)),e.set("perPage",String(i.perPage??24)),i.search&&e.set("search",i.search),i.cookbook&&e.set("cookbook",i.cookbook);for(let t of i.categories??[])e.append("categories",t);for(let t of i.tags??[])e.append("tags",t);return this.hass.callApi("GET",`mealie_recipe_panel/recipes?${e.toString()}`)}async getCookbooks(){return this.hass.callApi("GET","mealie_recipe_panel/cookbooks")}async getConfig(){return this.hass.callApi("GET","mealie_recipe_panel/config")}async getRecipe(i){return this.hass.callApi("GET",`mealie_recipe_panel/recipes/${i}`)}async updateRecipe(i,e){return this.hass.callApi("POST",`mealie_recipe_panel/recipes/${i}`,e)}async getCategories(){return this.hass.callApi("GET","mealie_recipe_panel/categories")}async getTags(){return this.hass.callApi("GET","mealie_recipe_panel/tags")}recipeImageUrl(i,e="min-original"){return`/api/mealie_recipe_panel/image/${i}/${e}`}async setFavorite(i,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${i}/favorite`,{favorite:e})}async setMyRecipe(i,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${i}/my-recipe`,{my_recipe:e})}async addToMealplan(i,e,t){return this.hass.callApi("POST","mealie_recipe_panel/mealplans",{recipeId:i,date:e,entryType:t})}async addFreeformMealplanEntry(i,e,t){return this.hass.callApi("POST","mealie_recipe_panel/mealplans",{date:i,entryType:e,title:t})}async deleteMealplanEntry(i){return this.hass.callApi("DELETE",`mealie_recipe_panel/mealplans/${i}`)}async setLastMade(i,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${i}/last-made`,{date:e})}async getShoppingLists(){return this.hass.callApi("GET","mealie_recipe_panel/shopping-lists")}async createShoppingList(i){return this.hass.callApi("POST","mealie_recipe_panel/shopping-lists",{name:i})}async addToShoppingList(i,e){return this.hass.callApi("POST","mealie_recipe_panel/shopping-items",{shoppingListId:i,items:e})}async getMealplans(i,e){return this.hass.callApi("GET",`mealie_recipe_panel/mealplans?start_date=${i}&end_date=${e}`)}async getRandomRecipe(i){return this.hass.callApi("GET",`mealie_recipe_panel/recipes/random?mode=${i}`)}async getRandomRecipes(i,e){let{recipes:t}=await this.hass.callApi("GET",`mealie_recipe_panel/recipes/random?mode=${i}&count=${e}`);return t}async deleteRecipe(i){return this.hass.callApi("DELETE",`mealie_recipe_panel/recipes/${i}`)}async getShoppingListDetail(i){return this.hass.callApi("GET",`mealie_recipe_panel/shopping-lists/${i}`)}async setShoppingItemChecked(i,e){return this.hass.callApi("PUT",`mealie_recipe_panel/shopping-items/${i}/checked`,{checked:e})}async deleteShoppingList(i){return this.hass.callApi("DELETE",`mealie_recipe_panel/shopping-lists/${i}`)}async generateRecipe(i){let{recipe:e}=await this.hass.callApi("POST","mealie_recipe_panel/ai/generate-recipe",{prompt:i});return e}async saveGeneratedRecipe(i,e,t){return this.hass.callApi("POST","mealie_recipe_panel/ai/save-recipe",{recipe:i,imageBase64:e,imageMime:t})}async importRecipe(i,e){let t=null,r=null;e&&(t=await St(e),r=e.type||"image/jpeg");let{recipe:n}=await this.hass.callApi("POST","mealie_recipe_panel/ai/import-recipe",{text:i,imageBase64:t,imageMime:r});return n}async generateRecipeImage(i,e){return this.hass.callApi("POST","mealie_recipe_panel/ai/generate-recipe-image",{subject:i,guidance:e})}async attachRecipeImage(i,e,t){return this.hass.callApi("POST",`mealie_recipe_panel/recipes/${i}/ai-image`,{imageBase64:e,imageMime:t})}};function St(s){return new Promise((i,e)=>{let t=new FileReader;t.onload=()=>{let r=t.result;i(r.slice(r.indexOf(",")+1))},t.onerror=()=>e(t.error),t.readAsDataURL(s)})}async function w(s,i){if(s instanceof Error&&s.message)return s.message;if(s&&typeof s=="object"){let e=s;if(typeof e.text=="function")try{let n=await e.text();if(n)return n}catch{}let t=s.message;if(typeof t=="string"&&t)return t;let r=s.status;if(typeof r=="number")return`Request failed (HTTP ${r})`}return i}var _t="Favorite",At="My Recipe";function it(s,i){return!!s?.some(e=>e.name.toLowerCase()===i.toLowerCase())}function J(s){return it(s,_t)}function Me(s){return it(s,At)}var W=class extends f{constructor(){super(...arguments);this.title="Recipes";this.showBack=!1}render(){return l`
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
  `,a([c({type:String})],W.prototype,"title",2),a([c({type:Boolean})],W.prototype,"showBack",2),W=a([v("panel-shell")],W);var Z=class extends f{constructor(){super(...arguments);this.value=""}onInput(e){let t=e.target.value;this.value=t,window.clearTimeout(this.debounceHandle),this.debounceHandle=window.setTimeout(()=>{this.dispatchEvent(new CustomEvent("search-change",{detail:{value:t}}))},300)}render(){return l`
      <input
        type="search"
        placeholder="Search recipes…"
        .value=${this.value}
        @input=${this.onInput}
      />
    `}};Z.styles=b`
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
  `,a([c({type:String})],Z.prototype,"value",2),Z=a([v("recipe-search-bar")],Z);var K=class extends f{constructor(){super(...arguments);this.cookbooks=[];this.value=""}onChange(e){let t=e.target.value;this.value=t,this.dispatchEvent(new CustomEvent("cookbook-change",{detail:{value:t}}))}render(){return l`
      <select .value=${this.value} @change=${this.onChange}>
        <option value="">All cookbooks</option>
        ${this.cookbooks.map(e=>l`<option value=${e.id} ?selected=${e.id===this.value}>${e.name}</option>`)}
      </select>
    `}};K.styles=b`
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
  `,a([c({attribute:!1})],K.prototype,"cookbooks",2),a([c({type:String})],K.prototype,"value",2),K=a([v("cookbook-select")],K);var C=class extends f{constructor(){super(...arguments);this.recipes=[];this.imageUrl=()=>"";this.loading=!1;this.searchQuery="";this.aiEnabled=!0}onSelect(e){this.dispatchEvent(new CustomEvent("recipe-select",{detail:{slug:e.slug}}))}onToggleFavorite(e,t){e.stopPropagation(),this.dispatchEvent(new CustomEvent("favorite-toggle",{detail:{slug:t.slug,favorite:!J(t.tags)}}))}onAiGenerateFromSearch(){this.dispatchEvent(new CustomEvent("ai-generate-from-search",{detail:{query:this.searchQuery.trim()}}))}renderAiCard(){return l`
      <button class="card ai-card" @click=${()=>this.onAiGenerateFromSearch()}>
        <span class="icon">✨</span>
        <span>Generate "${this.searchQuery.trim()}" recipe with AI</span>
      </button>
    `}render(){let e=this.aiEnabled?this.searchQuery.trim():"";return this.loading?l`<div class="empty">Loading recipes…</div>`:this.recipes.length?l`
      <div class="grid">
        ${this.recipes.map(t=>{let r=J(t.tags);return l`
            <div class="card" @click=${()=>this.onSelect(t)}>
              <div class="thumb-wrap">
                ${t.image?l`<img class="thumb" loading="lazy" src=${this.imageUrl(t)} alt="" />`:l`<div class="thumb"></div>`}
                <button
                  class="favorite ${r?"active":""}"
                  aria-label="Toggle favorite"
                  @click=${n=>this.onToggleFavorite(n,t)}
                >
                  ${r?"\u2665":"\u2661"}
                </button>
              </div>
              <div class="info">
                <p class="name">${t.name}</p>
                <div class="meta">
                  ${t.totalTime?l`<span>⏱ ${t.totalTime}</span>`:g}
                  ${t.recipeServings?l`<span>🍽 ${t.recipeServings}</span>`:g}
                </div>
              </div>
            </div>
          `})}
        ${e?this.renderAiCard():g}
      </div>
    `:l`
        <div class="empty">
          No recipes found.
          ${e?l`<div class="empty-ai">${this.renderAiCard()}</div>`:g}
        </div>
      `}};C.styles=b`
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
    .empty-ai {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
    .ai-card {
      font-family: inherit;
      background: var(--card-background-color, #fff);
      border: 2px dashed var(--primary-color, #03a9f4);
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-align: center;
      padding: 20px 12px;
      min-height: 48px;
      color: var(--primary-color, #03a9f4);
      font-size: 15px;
      font-weight: 600;
    }
    .ai-card:active {
      transform: scale(0.98);
    }
    .ai-card .icon {
      font-size: 30px;
    }
  `,a([c({attribute:!1})],C.prototype,"recipes",2),a([c({attribute:!1})],C.prototype,"imageUrl",2),a([c({type:Boolean})],C.prototype,"loading",2),a([c({type:String})],C.prototype,"searchQuery",2),a([c({type:Boolean})],C.prototype,"aiEnabled",2),C=a([v("recipe-grid")],C);var U=class extends f{constructor(){super(...arguments);this.recipe=null;this.imageUrl="";this.completedSteps=new Set;this.checkedIngredients=new Set}willUpdate(e){e.has("recipe")&&e.get("recipe")?.slug!==this.recipe?.slug&&(this.completedSteps=new Set,this.checkedIngredients=new Set)}onToggleFavorite(){this.recipe&&this.dispatchEvent(new CustomEvent("favorite-toggle",{detail:{slug:this.recipe.slug,favorite:!J(this.recipe.tags)}}))}onToggleMyRecipe(){this.recipe&&this.dispatchEvent(new CustomEvent("my-recipe-toggle",{detail:{slug:this.recipe.slug,myRecipe:!Me(this.recipe.tags)}}))}onAddToMealplan(){this.recipe&&this.dispatchEvent(new CustomEvent("open-mealplan"))}onOpenLastMade(){this.recipe&&this.dispatchEvent(new CustomEvent("open-lastmade"))}onDelete(){this.recipe&&this.dispatchEvent(new CustomEvent("open-delete-confirm"))}onEdit(){this.recipe&&this.dispatchEvent(new CustomEvent("edit"))}toggleIngredient(e){let t=new Set(this.checkedIngredients);t.has(e)?t.delete(e):t.add(e),this.checkedIngredients=t}onAddToShoppingList(){if(!this.recipe)return;let e=this.recipe.recipeIngredient.filter((t,r)=>this.checkedIngredients.has(r)).map(t=>t.display);e.length&&this.dispatchEvent(new CustomEvent("open-shopping-list",{detail:{items:e}}))}toggleStep(e){let t=new Set(this.completedSteps);t.has(e)?t.delete(e):t.add(e),this.completedSteps=t}render(){let e=this.recipe;if(!e)return l`<p>Loading…</p>`;let t=J(e.tags),r=Me(e.tags);return l`
      ${e.image?l`<img class="hero" src=${this.imageUrl} alt="" />`:g}
      <div class="meta-row">
        ${e.prepTime?l`<span>Prep: ${e.prepTime}</span>`:g}
        ${e.cookTime?l`<span>Cook: ${e.cookTime}</span>`:g}
        ${e.totalTime?l`<span>Total: ${e.totalTime}</span>`:g}
        ${e.recipeServings?l`<span>Servings: ${e.recipeServings}</span>`:g}
        <button class="favorite ${t?"active":""}" aria-label="Toggle favorite" @click=${this.onToggleFavorite}>
          ${t?"\u2665":"\u2661"}
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
        <button class="pill-button edit" @click=${this.onEdit}>✏️ Edit</button>
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
        ${e.recipeIngredient.map((n,o)=>l`<li>
            <input type="checkbox" .checked=${this.checkedIngredients.has(o)} @change=${()=>this.toggleIngredient(o)} />${n.display}
          </li>`)}
      </ul>

      <h2>Instructions</h2>
      <ol class="instructions">
        ${e.recipeInstructions.map((n,o)=>{let h=this.completedSteps.has(o);return l`
            <li class=${h?"done":""} @click=${()=>this.toggleStep(o)}>
              ${h?l`<span class="step-done-label">Step ${o+1} done</span>`:l`${n.title?l`<strong>${n.title}</strong><br />`:g}${n.text}`}
            </li>
          `})}
      </ol>
    `}};U.styles=b`
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
    }
    .pill-button.edit {
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
  `,a([c({attribute:!1})],U.prototype,"recipe",2),a([c({type:String})],U.prototype,"imageUrl",2),a([p()],U.prototype,"completedSteps",2),a([p()],U.prototype,"checkedIngredients",2),U=a([v("recipe-detail-view")],U);var rt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},st=s=>(...i)=>({_$litDirective$:s,values:i}),$e=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,t){this._$Ct=i,this._$AM=e,this._$Ci=t}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var{I:Ct}=et,nt=s=>s;var at=()=>document.createComment(""),X=(s,i,e)=>{let t=s._$AA.parentNode,r=i===void 0?s._$AB:i._$AA;if(e===void 0){let n=t.insertBefore(at(),r),o=t.insertBefore(at(),r);e=new Ct(n,o,s,s.options)}else{let n=e._$AB.nextSibling,o=e._$AM,h=o!==s;if(h){let d;e._$AQ?.(s),e._$AM=s,e._$AP!==void 0&&(d=s._$AU)!==o._$AU&&e._$AP(d)}if(n!==r||h){let d=e._$AA;for(;d!==n;){let x=nt(d).nextSibling;nt(t).insertBefore(d,r),d=x}}}return e},B=(s,i,e=s)=>(s._$AI(i,e),s),Lt={},ot=(s,i=Lt)=>s._$AH=i,lt=s=>s._$AH,Ee=s=>{s._$AR(),s._$AA.remove()};var pt=(s,i,e)=>{let t=new Map;for(let r=i;r<=e;r++)t.set(s[r],r);return t},we=st(class extends $e{constructor(s){if(super(s),s.type!==rt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,i,e){let t;e===void 0?e=i:i!==void 0&&(t=i);let r=[],n=[],o=0;for(let h of s)r[o]=t?t(h,o):o,n[o]=e(h,o),o++;return{values:n,keys:r}}render(s,i,e){return this.dt(s,i,e).values}update(s,[i,e,t]){let r=lt(s),{values:n,keys:o}=this.dt(i,e,t);if(!Array.isArray(r))return this.ut=o,n;let h=this.ut??=[],d=[],x,y,u=0,E=r.length-1,$=0,I=n.length-1;for(;u<=E&&$<=I;)if(r[u]===null)u++;else if(r[E]===null)E--;else if(h[u]===o[$])d[$]=B(r[u],n[$]),u++,$++;else if(h[E]===o[I])d[I]=B(r[E],n[I]),E--,I--;else if(h[u]===o[I])d[I]=B(r[u],n[I]),X(s,d[I+1],r[u]),u++,I--;else if(h[E]===o[$])d[$]=B(r[E],n[$]),X(s,r[u],r[E]),E--,$++;else if(x===void 0&&(x=pt(o,$,I),y=pt(h,u,E)),x.has(h[u]))if(x.has(h[E])){let P=y.get(o[$]),ke=P!==void 0?r[P]:null;if(ke===null){let Ue=X(s,r[u]);B(Ue,n[$]),d[$]=Ue}else d[$]=B(ke,n[$]),X(s,r[u],ke),r[P]=null;$++}else Ee(r[E]),E--;else Ee(r[u]),u++;for(;$<=I;){let P=X(s,d[I+1]);B(P,n[$]),d[$++]=P}for(;u<=E;){let P=r[u++];P!==null&&Ee(P)}return this.ut=o,ot(s,d),D}});var k=class extends f{constructor(){super(...arguments);this.recipe=null;this.imageUrl="";this.saving=!1;this.imageGenerating=!1;this.draftName="";this.draftDescription="";this.draftServings=1;this.draftPrepTime=null;this.draftCookTime=null;this.draftTotalTime=null;this.ingredients=[];this.instructions=[];this.showImagePrompt=!1;this.imageGuidance="";this.lastSlug=void 0;this.nextKey=0;this.dragKey=null;this.dragStartY=0;this.dragEl=null;this.onDragMove=e=>{if(this.dragKey===null||!this.dragEl)return;let t=e.clientY-this.dragStartY;this.dragEl.style.transform=`translateY(${t}px)`;let r=this.dragEl.getBoundingClientRect(),n=r.top+r.height/2,o=this.instructions.findIndex(d=>d.key===this.dragKey),h=Array.from(this.renderRoot.querySelectorAll(".instructions-list li[data-key]"));for(let d of h){let x=Number(d.dataset.key);if(x===this.dragKey)continue;let y=d.getBoundingClientRect();if(n<y.top||n>y.bottom)continue;let u=this.instructions.findIndex(E=>E.key===x);if(u!==o){this.dragStartY+=u>o?y.height:-y.height,this.swapInstructions(o,u),this.dragEl.style.transform=`translateY(${e.clientY-this.dragStartY}px)`;break}}};this.onDragEnd=e=>{let t=e.currentTarget;t.removeEventListener("pointermove",this.onDragMove),t.removeEventListener("pointerup",this.onDragEnd),t.removeEventListener("pointercancel",this.onDragEnd),this.dragEl&&(this.dragEl.classList.remove("dragging"),this.dragEl.style.transform=""),this.dragKey=null,this.dragEl=null}}willUpdate(e){if(e.has("recipe")&&this.recipe?.slug!==this.lastSlug){this.lastSlug=this.recipe?.slug??null;let t=this.recipe;this.draftName=t?.name??"",this.draftDescription=t?.description??"",this.draftServings=t?.recipeServings??1,this.draftPrepTime=t?.prepTime??null,this.draftCookTime=t?.cookTime??null,this.draftTotalTime=t?.totalTime??null,this.ingredients=t?.recipeIngredient.map(r=>{let n=r.display||r.note||"";return{key:this.nextKey++,original:r,initialText:n,text:n}})??[],this.instructions=t?.recipeInstructions.map(r=>({key:this.nextKey++,original:r,initialText:r.text,text:r.text}))??[]}}updateIngredientText(e,t){this.ingredients=this.ingredients.map(r=>r.key===e?{...r,text:t}:r)}removeIngredient(e){this.ingredients=this.ingredients.filter(t=>t.key!==e)}addIngredient(){this.ingredients=[...this.ingredients,{key:this.nextKey++,original:null,initialText:"",text:""}]}updateInstructionText(e,t){this.instructions=this.instructions.map(r=>r.key===e?{...r,text:t}:r)}removeInstruction(e){this.instructions=this.instructions.filter(t=>t.key!==e)}addInstruction(){this.instructions=[...this.instructions,{key:this.nextKey++,original:null,initialText:"",text:""}]}swapInstructions(e,t){let r=[...this.instructions],[n]=r.splice(e,1);r.splice(t,0,n),this.instructions=r}onDragStart(e,t){e.preventDefault();let r=e.currentTarget,n=r.closest("li");n&&(this.dragKey=t,this.dragStartY=e.clientY,this.dragEl=n,n.classList.add("dragging"),r.setPointerCapture(e.pointerId),r.addEventListener("pointermove",this.onDragMove),r.addEventListener("pointerup",this.onDragEnd),r.addEventListener("pointercancel",this.onDragEnd))}onSave(){if(this.saving)return;let e=this.draftName.trim();if(!e)return;let t=this.ingredients.filter(o=>o.text.trim()).map(o=>o.original&&o.text===o.initialText?o.original:{note:o.text.trim()}),r=this.instructions.filter(o=>o.text.trim()).map(o=>o.original&&o.text===o.initialText?o.original:{text:o.text.trim()}),n={name:e,description:this.draftDescription,recipeServings:this.draftServings,prepTime:this.draftPrepTime,cookTime:this.draftCookTime,totalTime:this.draftTotalTime,recipeIngredient:t,recipeInstructions:r};this.dispatchEvent(new CustomEvent("save",{detail:{body:n}}))}onRegenerateImage(){!this.recipe||this.imageGenerating||(this.dispatchEvent(new CustomEvent("regenerate-image",{detail:{guidance:this.imageGuidance.trim()}})),this.showImagePrompt=!1,this.imageGuidance="")}render(){if(!this.recipe)return l`<p>Loading…</p>`;let e=!this.saving&&!!this.draftName.trim();return l`
      ${this.recipe.image?l`<img class="hero" src=${this.imageUrl} alt="" />`:g}

      <div class="action-row">
        <button class="pill-button save" ?disabled=${!e} @click=${this.onSave}>
          ${this.saving?"Saving\u2026":"\u{1F4BE} Save Changes"}
        </button>
        <button class="pill-button" ?disabled=${this.saving} @click=${()=>this.dispatchEvent(new CustomEvent("cancel"))}>
          Cancel
        </button>
        <button
          class="pill-button"
          ?disabled=${this.imageGenerating}
          @click=${()=>this.showImagePrompt=!this.showImagePrompt}
        >
          ${this.imageGenerating?"\u{1F4F7} Generating\u2026":"\u{1F4F7} New AI Photo"}
        </button>
      </div>

      ${this.showImagePrompt&&!this.imageGenerating?l`
            <div class="image-prompt-panel">
              <p>Optional: describe what you want the new photo to show, or leave blank to just try again.</p>
              <div class="image-prompt-row">
                <input
                  type="text"
                  placeholder="e.g. uncooked pizza dough resting on a wooden paddle"
                  .value=${this.imageGuidance}
                  @keydown=${t=>{t.key==="Enter"&&this.onRegenerateImage()}}
                  @input=${t=>this.imageGuidance=t.target.value}
                />
                <button class="pill-button save" @click=${this.onRegenerateImage}>Generate</button>
                <button class="pill-button" @click=${()=>this.showImagePrompt=!1}>Cancel</button>
              </div>
            </div>
          `:g}

      <label class="field-label">Recipe name</label>
      <input
        class="name-input"
        type="text"
        placeholder="Recipe name"
        .value=${this.draftName}
        @input=${t=>this.draftName=t.target.value}
      />

      <div class="meta-grid">
        <label>
          Servings
          <input
            type="number"
            min="1"
            .value=${String(this.draftServings)}
            @input=${t=>this.draftServings=Number(t.target.value)||0}
          />
        </label>
        <label>
          Prep time
          <input
            type="text"
            .value=${this.draftPrepTime??""}
            @input=${t=>this.draftPrepTime=t.target.value||null}
          />
        </label>
        <label>
          Cook time
          <input
            type="text"
            .value=${this.draftCookTime??""}
            @input=${t=>this.draftCookTime=t.target.value||null}
          />
        </label>
        <label>
          Total time
          <input
            type="text"
            .value=${this.draftTotalTime??""}
            @input=${t=>this.draftTotalTime=t.target.value||null}
          />
        </label>
      </div>

      <label class="field-label">Description</label>
      <textarea
        .value=${this.draftDescription}
        @input=${t=>this.draftDescription=t.target.value}
      ></textarea>

      <h2>Ingredients</h2>
      <ul class="edit-list">
        ${this.ingredients.map(t=>l`
            <li>
              <input
                type="text"
                .value=${t.text}
                @input=${r=>this.updateIngredientText(t.key,r.target.value)}
              />
              <button class="remove-btn" aria-label="Remove ingredient" @click=${()=>this.removeIngredient(t.key)}>✕</button>
            </li>
          `)}
      </ul>
      <button class="add-btn" @click=${()=>this.addIngredient()}>+ Add ingredient</button>

      <h2>Instructions</h2>
      <ol class="edit-list instructions-list">
        ${we(this.instructions,t=>t.key,(t,r)=>l`
            <li data-key=${t.key}>
              <div class="step-number">${r+1}</div>
              <textarea
                .value=${t.text}
                @input=${n=>this.updateInstructionText(t.key,n.target.value)}
              ></textarea>
              <button
                class="drag-handle"
                aria-label="Drag to reorder step"
                @pointerdown=${n=>this.onDragStart(n,t.key)}
              >
                ⠿
              </button>
              <button class="remove-btn" aria-label="Remove step" @click=${()=>this.removeInstruction(t.key)}>✕</button>
            </li>
          `)}
      </ol>
      <button class="add-btn" @click=${()=>this.addInstruction()}>+ Add step</button>
    `}};k.styles=b`
    :host {
      display: block;
      padding: 10px 16px 24px;
      font-size: 16px;
      line-height: 1.3;
    }
    img.hero {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 12px;
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
    .image-prompt-panel {
      margin: -8px 0 18px;
      padding: 12px;
      border-radius: 12px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .image-prompt-panel p {
      margin: 0 0 8px;
      font-size: 13px;
      color: var(--secondary-text-color, #757575);
    }
    .image-prompt-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .image-prompt-row input {
      flex: 1 1 220px;
    }
  `,a([c({attribute:!1})],k.prototype,"recipe",2),a([c({type:String})],k.prototype,"imageUrl",2),a([c({type:Boolean})],k.prototype,"saving",2),a([c({type:Boolean})],k.prototype,"imageGenerating",2),a([p()],k.prototype,"draftName",2),a([p()],k.prototype,"draftDescription",2),a([p()],k.prototype,"draftServings",2),a([p()],k.prototype,"draftPrepTime",2),a([p()],k.prototype,"draftCookTime",2),a([p()],k.prototype,"draftTotalTime",2),a([p()],k.prototype,"ingredients",2),a([p()],k.prototype,"instructions",2),a([p()],k.prototype,"showImagePrompt",2),a([p()],k.prototype,"imageGuidance",2),k=a([v("recipe-edit-view")],k);function ct(s){let i=s.getFullYear(),e=String(s.getMonth()+1).padStart(2,"0"),t=String(s.getDate()).padStart(2,"0");return`${i}-${e}-${t}`}function _(){return ct(new Date)}function le(s,i){let e=new Date(`${s}T00:00:00`);return e.setDate(e.getDate()+i),ct(e)}var Rt=["breakfast","lunch","dinner","side","snack","drink","dessert"],F=class extends f{constructor(){super(...arguments);this.open=!1;this.recipeName="";this.date=_();this.entryType="dinner"}willUpdate(e){e.has("open")&&this.open&&(this.date=_(),this.entryType="dinner")}confirm(){this.dispatchEvent(new CustomEvent("mealplan-confirm",{detail:{date:this.date,entryType:this.entryType}}))}cancel(){this.dispatchEvent(new CustomEvent("mealplan-cancel"))}render(){return this.open?l`
      <div class="card">
        <h2>Add to Meal Plan</h2>
        <p class="subtitle">${this.recipeName}</p>

        <label for="date">Day</label>
        <input id="date" type="date" .value=${this.date} @change=${e=>this.date=e.target.value} />

        <label for="entry-type">Meal</label>
        <select id="entry-type" .value=${this.entryType} @change=${e=>this.entryType=e.target.value}>
          ${Rt.map(e=>l`<option value=${e} ?selected=${e===this.entryType}>${e[0].toUpperCase()}${e.slice(1)}</option>`)}
        </select>

        <div class="actions">
          <button class="cancel" @click=${this.cancel}>Cancel</button>
          <button class="confirm" @click=${this.confirm}>Add</button>
        </div>
      </div>
    `:null}};F.styles=b`
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
  `,a([c({type:Boolean,reflect:!0})],F.prototype,"open",2),a([c({type:String})],F.prototype,"recipeName",2),a([p()],F.prototype,"date",2),a([p()],F.prototype,"entryType",2),F=a([v("mealplan-dialog")],F);var N=class extends f{constructor(){super(...arguments);this.open=!1;this.recipeName="";this.date=_()}willUpdate(e){e.has("open")&&this.open&&(this.date=_())}confirm(){this.dispatchEvent(new CustomEvent("lastmade-confirm",{detail:{date:this.date}}))}cancel(){this.dispatchEvent(new CustomEvent("lastmade-cancel"))}render(){return this.open?l`
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
  `,a([c({type:Boolean,reflect:!0})],N.prototype,"open",2),a([c({type:String})],N.prototype,"recipeName",2),a([p()],N.prototype,"date",2),N=a([v("lastmade-dialog")],N);var V="__new__",L=class extends f{constructor(){super(...arguments);this.open=!1;this.itemCount=0;this.lists=[];this.selection="";this.newListName=""}willUpdate(e){e.has("open")&&this.open&&(this.selection=this.lists[0]?.id??V,this.newListName="")}get canConfirm(){return this.selection===V?this.newListName.trim().length>0:!!this.selection}confirm(){if(!this.canConfirm)return;let e=this.selection===V?{newListName:this.newListName.trim()}:{listId:this.selection};this.dispatchEvent(new CustomEvent("shopping-confirm",{detail:e}))}cancel(){this.dispatchEvent(new CustomEvent("shopping-cancel"))}render(){return this.open?l`
      <div class="card">
        <h2>Add to Shopping List</h2>
        <p class="subtitle">${this.itemCount} ingredient${this.itemCount===1?"":"s"} selected</p>

        <label for="list">List</label>
        <select id="list" .value=${this.selection} @change=${e=>this.selection=e.target.value}>
          ${this.lists.map(e=>l`<option value=${e.id} ?selected=${e.id===this.selection}>${e.name}</option>`)}
          <option value=${V} ?selected=${this.selection===V}>+ New list…</option>
        </select>

        ${this.selection===V?l`
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
  `,a([c({type:Boolean,reflect:!0})],L.prototype,"open",2),a([c({type:Number})],L.prototype,"itemCount",2),a([c({attribute:!1})],L.prototype,"lists",2),a([p()],L.prototype,"selection",2),a([p()],L.prototype,"newListName",2),L=a([v("shopping-list-dialog")],L);var ze=["breakfast","lunch","dinner","side","snack","drink","dessert"];function De(s){return new Date(`${s}T00:00:00`).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Pt(s){return new Date(`${s}T00:00:00`).toLocaleDateString(void 0,{weekday:"short"})}var A=class extends f{constructor(){super(...arguments);this.weekStart="";this.entries=[];this.loading=!1;this.addFreeformDate=null;this.freeformText="";this.freeformEntryType="dinner"}onSelect(e){e.recipe&&this.dispatchEvent(new CustomEvent("recipe-select",{detail:{slug:e.recipe.slug}}))}onDeleteClick(e){this.dispatchEvent(new CustomEvent("delete-entry",{detail:{entry:e}}))}openFreeformAdd(e){this.addFreeformDate=e,this.freeformText="",this.freeformEntryType="dinner"}cancelFreeformAdd(){this.addFreeformDate=null,this.freeformText=""}submitFreeformAdd(){!this.addFreeformDate||!this.freeformText.trim()||(this.dispatchEvent(new CustomEvent("freeform-add",{detail:{date:this.addFreeformDate,entryType:this.freeformEntryType,title:this.freeformText.trim()}})),this.addFreeformDate=null,this.freeformText="")}renderFreeformForm(){return l`
      <div class="freeform-form">
        <input
          type="text"
          placeholder="e.g. Leftovers, Takeout, Eating out"
          .value=${this.freeformText}
          @input=${e=>this.freeformText=e.target.value}
          @keydown=${e=>{e.key==="Enter"&&this.submitFreeformAdd()}}
        />
        <select
          .value=${this.freeformEntryType}
          @change=${e=>this.freeformEntryType=e.target.value}
        >
          ${ze.map(e=>l`<option value=${e}>${e}</option>`)}
        </select>
        <div class="freeform-actions">
          <button class="cancel-small" @click=${()=>this.cancelFreeformAdd()}>Cancel</button>
          <button class="add-small" ?disabled=${!this.freeformText.trim()} @click=${()=>this.submitFreeformAdd()}>
            Add
          </button>
        </div>
      </div>
    `}render(){let e=Array.from({length:7},(r,n)=>le(this.weekStart,n)),t=_();return l`
      <div class="nav">
        <button @click=${()=>this.dispatchEvent(new CustomEvent("prev-week"))}>‹ Prev</button>
        <button @click=${()=>this.dispatchEvent(new CustomEvent("next-week"))}>Next ›</button>
        <button @click=${()=>this.dispatchEvent(new CustomEvent("today"))}>Today</button>
        <span class="range">${De(e[0])} – ${De(e[6])}</span>
      </div>
      ${this.loading?l`<p>Loading…</p>`:l`
            <div class="week">
              ${e.map(r=>{let n=this.entries.filter(o=>o.date===r).sort((o,h)=>ze.indexOf(o.entryType)-ze.indexOf(h.entryType));return l`
                  <div class="day ${r===t?"today":""}">
                    <div class="day-header">${Pt(r)} ${De(r)}</div>
                    ${n.length?n.map(o=>l`
                            <div class="entry-row">
                              <button class="entry" ?disabled=${!o.recipe} @click=${()=>this.onSelect(o)}>
                                <span class="type">${o.entryType}</span>
                                <span class="name">${o.recipe?.name??(o.title||"Untitled")}</span>
                              </button>
                              <button
                                class="entry-delete"
                                aria-label="Remove from plan"
                                @click=${()=>this.onDeleteClick(o)}
                              >
                                ✕
                              </button>
                            </div>
                          `):l`<span class="empty">Nothing planned</span>`}
                    ${this.addFreeformDate===r?this.renderFreeformForm():l`<button class="add-freeform" @click=${()=>this.openFreeformAdd(r)}>+ Add</button>`}
                  </div>
                `})}
            </div>
          `}
    `}};A.styles=b`
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
    .entry-row {
      position: relative;
      margin-bottom: 6px;
    }
    .entry {
      display: block;
      width: 100%;
      box-sizing: border-box;
      text-align: left;
      background: var(--primary-background-color, #fafafa);
      border: none;
      border-radius: 8px;
      padding: 8px 26px 8px 8px;
      cursor: pointer;
      font-size: 13px;
      color: inherit;
      font-family: inherit;
    }
    .entry:disabled {
      cursor: default;
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
    .entry-delete {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 20px;
      height: 20px;
      border: none;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.15);
      color: inherit;
      font-size: 11px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .entry-delete:hover {
      background: var(--error-color, #db4437);
      color: #fff;
    }
    .empty {
      color: var(--secondary-text-color, #757575);
      font-size: 12px;
    }
    .add-freeform {
      width: 100%;
      box-sizing: border-box;
      border: 1px dashed var(--divider-color, #e0e0e0);
      background: transparent;
      color: var(--secondary-text-color, #757575);
      border-radius: 8px;
      padding: 8px;
      font-size: 13px;
      cursor: pointer;
    }
    .freeform-form {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .freeform-form input[type="text"],
    .freeform-form select {
      width: 100%;
      box-sizing: border-box;
      font-size: 13px;
      padding: 8px 10px;
      min-height: 36px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--primary-background-color, #fafafa);
      color: inherit;
    }
    .freeform-actions {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
    }
    .freeform-actions button {
      min-height: 32px;
      padding: 0 12px;
      border-radius: 16px;
      border: none;
      font-size: 12px;
      cursor: pointer;
    }
    .freeform-actions .cancel-small {
      background: transparent;
      color: var(--secondary-text-color, #757575);
    }
    .freeform-actions .add-small {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-weight: 600;
    }
    .freeform-actions .add-small:disabled {
      opacity: 0.6;
      cursor: default;
    }
  `,a([c({type:String})],A.prototype,"weekStart",2),a([c({attribute:!1})],A.prototype,"entries",2),a([c({type:Boolean})],A.prototype,"loading",2),a([p()],A.prototype,"addFreeformDate",2),a([p()],A.prototype,"freeformText",2),a([p()],A.prototype,"freeformEntryType",2),A=a([v("mealplan-view")],A);var Mt=[{mode:"all",label:"All Recipes",icon:"\u{1F37D}"},{mode:"my-recipes",label:"My Recipes",icon:"\u270D\uFE0F"},{mode:"favorites",label:"Favorites",icon:"\u2764\uFE0F"},{mode:"made-before",label:"Made Before",icon:"\u{1F551}"}],ee=class extends f{constructor(){super(...arguments);this.open=!1}select(e){this.dispatchEvent(new CustomEvent("mode-select",{detail:{mode:e}}))}render(){return this.open?l`
      <div class="card">
        <h2>Surprise Me</h2>
        <div class="grid">
          ${Mt.map(e=>l`
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
    `:null}};ee.styles=b`
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
  `,a([c({type:Boolean,reflect:!0})],ee.prototype,"open",2),ee=a([v("random-picker-dialog")],ee);var R=class extends f{constructor(){super(...arguments);this.open=!1;this.heading="Are you sure?";this.message="";this.confirmLabel="Confirm";this.destructive=!1}render(){return this.open?l`
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
    `:null}};R.styles=b`
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
  `,a([c({type:Boolean,reflect:!0})],R.prototype,"open",2),a([c({type:String})],R.prototype,"heading",2),a([c({type:String})],R.prototype,"message",2),a([c({type:String})],R.prototype,"confirmLabel",2),a([c({type:Boolean})],R.prototype,"destructive",2),R=a([v("confirm-dialog")],R);var H=class extends f{constructor(){super(...arguments);this.lists=[];this.selectedListId="";this.items=[];this.loading=!1}toggle(e){this.dispatchEvent(new CustomEvent("toggle-item",{detail:{itemId:e.id,checked:!e.checked}}))}render(){if(!this.lists.length)return l`<div class="empty">No shopping lists yet.</div>`;let e=[...this.items].sort((t,r)=>Number(t.checked)-Number(r.checked));return l`
      <div class="list-tabs">
        ${this.lists.map(t=>l`
            <button
              class=${t.id===this.selectedListId?"active":""}
              @click=${()=>this.dispatchEvent(new CustomEvent("select-list",{detail:{listId:t.id}}))}
            >
              ${t.name}
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
                ${e.map(t=>l`
                    <li class=${t.checked?"checked":""}>
                      <input type="checkbox" .checked=${t.checked} @change=${()=>this.toggle(t)} />
                      ${t.display}
                    </li>
                  `)}
              </ul>
            `:l`<div class="empty">This list is empty.</div>`}
    `}};H.styles=b`
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
  `,a([c({attribute:!1})],H.prototype,"lists",2),a([c({type:String})],H.prototype,"selectedListId",2),a([c({attribute:!1})],H.prototype,"items",2),a([c({type:Boolean})],H.prototype,"loading",2),H=a([v("shopping-view")],H);var T=class extends f{constructor(){super(...arguments);this.prompt="";this.generating=!1;this.importing=!1;this.error="";this.aiConfigured=!0;this.tab="generate";this.importText="";this.importImage=null;this.importImagePreview=null}disconnectedCallback(){super.disconnectedCallback(),this.clearImagePreview()}clearImagePreview(){this.importImagePreview&&URL.revokeObjectURL(this.importImagePreview),this.importImagePreview=null}onPromptInput(e){this.dispatchEvent(new CustomEvent("prompt-change",{detail:{value:e.target.value}}))}onGenerate(){!this.prompt.trim()||this.generating||this.dispatchEvent(new CustomEvent("generate"))}onImportTextInput(e){this.importText=e.target.value}onImageSelected(e){let t=e.target.files?.[0]??null;this.clearImagePreview(),this.importImage=t,this.importImagePreview=t?URL.createObjectURL(t):null}onRemoveImage(){this.clearImagePreview(),this.importImage=null}onImport(){this.importing||!this.importImage&&!this.importText.trim()||this.dispatchEvent(new CustomEvent("import",{detail:{text:this.importText.trim(),image:this.importImage}}))}renderGenerateTab(){return l`
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
    `}renderSetupNeeded(){return l`
      <div class="setup-needed">
        <span class="icon">✨</span>
        <p class="title">AI Recipe Finder needs to be set up</p>
        <p class="body">
          Choose an AI Task entity for this integration under
          <strong>Settings → Devices &amp; Services → Mealie Kitchen Display → Configure</strong>
          to start generating and importing recipes with AI.
        </p>
      </div>
    `}render(){return this.aiConfigured?l`
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
    `:this.renderSetupNeeded()}};T.styles=b`
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
    .setup-needed {
      text-align: center;
      padding: 32px 16px;
    }
    .setup-needed .icon {
      font-size: 40px;
      display: block;
      margin-bottom: 8px;
    }
    .setup-needed .title {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 8px;
    }
    .setup-needed .body {
      color: var(--secondary-text-color, #757575);
      font-size: 15px;
      line-height: 1.5;
      max-width: 340px;
      margin: 0 auto;
    }
  `,a([c({type:String})],T.prototype,"prompt",2),a([c({type:Boolean})],T.prototype,"generating",2),a([c({type:Boolean})],T.prototype,"importing",2),a([c({type:String})],T.prototype,"error",2),a([c({type:Boolean})],T.prototype,"aiConfigured",2),a([p()],T.prototype,"tab",2),a([p()],T.prototype,"importText",2),a([p()],T.prototype,"importImage",2),a([p()],T.prototype,"importImagePreview",2),T=a([v("ai-recipe-view")],T);var S=class extends f{constructor(){super(...arguments);this.recipe=null;this.imageBase64=null;this.imageMime=null;this.imageError=null;this.imageLoading=!1;this.saving=!1;this.draft=null;this.lastRecipeRef=null;this.instructionIds=[];this.nextInstructionId=0;this.dragId=null;this.dragStartY=0;this.dragEl=null;this.onDragMove=e=>{if(this.dragId===null||!this.dragEl)return;let t=e.clientY-this.dragStartY;this.dragEl.style.transform=`translateY(${t}px)`;let r=this.dragEl.getBoundingClientRect(),n=r.top+r.height/2,o=this.instructionIds.indexOf(this.dragId),h=Array.from(this.renderRoot.querySelectorAll(".instructions-list li[data-id]"));for(let d of h){let x=Number(d.dataset.id);if(x===this.dragId)continue;let y=d.getBoundingClientRect();if(n<y.top||n>y.bottom)continue;let u=this.instructionIds.indexOf(x);if(u!==o){this.dragStartY+=u>o?y.height:-y.height,this.swapInstructions(o,u),this.dragEl.style.transform=`translateY(${e.clientY-this.dragStartY}px)`;break}}};this.onDragEnd=e=>{let t=e.currentTarget;t.removeEventListener("pointermove",this.onDragMove),t.removeEventListener("pointerup",this.onDragEnd),t.removeEventListener("pointercancel",this.onDragEnd),this.dragEl&&(this.dragEl.classList.remove("dragging"),this.dragEl.style.transform=""),this.dragId=null,this.dragEl=null}}willUpdate(e){e.has("recipe")&&this.recipe!==this.lastRecipeRef&&(this.lastRecipeRef=this.recipe,this.draft=this.recipe?{...this.recipe,ingredients:[...this.recipe.ingredients],instructions:[...this.recipe.instructions]}:null,this.instructionIds=this.recipe?this.recipe.instructions.map(()=>this.nextInstructionId++):[])}updateField(e,t){this.draft&&(this.draft={...this.draft,[e]:t})}updateIngredient(e,t){if(!this.draft)return;let r=[...this.draft.ingredients];r[e]=t,this.draft={...this.draft,ingredients:r}}removeIngredient(e){this.draft&&(this.draft={...this.draft,ingredients:this.draft.ingredients.filter((t,r)=>r!==e)})}addIngredient(){this.draft&&(this.draft={...this.draft,ingredients:[...this.draft.ingredients,""]})}updateInstruction(e,t){if(!this.draft)return;let r=[...this.draft.instructions];r[e]=t,this.draft={...this.draft,instructions:r}}removeInstruction(e){this.draft&&(this.draft={...this.draft,instructions:this.draft.instructions.filter((t,r)=>r!==e)},this.instructionIds=this.instructionIds.filter((t,r)=>r!==e))}addInstruction(){this.draft&&(this.draft={...this.draft,instructions:[...this.draft.instructions,""]},this.instructionIds=[...this.instructionIds,this.nextInstructionId++])}swapInstructions(e,t){if(!this.draft)return;let r=[...this.draft.instructions],[n]=r.splice(e,1);r.splice(t,0,n);let o=[...this.instructionIds],[h]=o.splice(e,1);o.splice(t,0,h),this.draft={...this.draft,instructions:r},this.instructionIds=o}onDragStart(e,t){e.preventDefault();let r=e.currentTarget,n=r.closest("li");n&&(this.dragId=t,this.dragStartY=e.clientY,this.dragEl=n,n.classList.add("dragging"),r.setPointerCapture(e.pointerId),r.addEventListener("pointermove",this.onDragMove),r.addEventListener("pointerup",this.onDragEnd),r.addEventListener("pointercancel",this.onDragEnd))}onSave(){!this.draft||!this.draft.name.trim()||this.saving||this.dispatchEvent(new CustomEvent("save",{detail:{recipe:this.draft}}))}render(){let e=this.draft;if(!e)return l`<p>Loading…</p>`;let t=!this.saving&&!!e.name.trim();return l`
      ${this.imageBase64?l`<img class="hero" src="data:${this.imageMime||"image/png"};base64,${this.imageBase64}" alt="" />`:this.imageLoading?l`<div class="image-placeholder">📷 Generating photo…</div>`:g}
      ${!this.imageBase64&&!this.imageLoading&&this.imageError?l`<p class="image-notice">No image generated: ${this.imageError}</p>`:g}

      <div class="action-row">
        <button class="pill-button save" ?disabled=${!t} @click=${this.onSave}>
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
              <input type="text" .value=${r} @input=${o=>this.updateIngredient(n,o.target.value)} />
              <button class="remove-btn" aria-label="Remove ingredient" @click=${()=>this.removeIngredient(n)}>✕</button>
            </li>
          `)}
      </ul>
      <button class="add-btn" @click=${()=>this.addIngredient()}>+ Add ingredient</button>

      <h2>Instructions</h2>
      <ol class="edit-list instructions-list">
        ${we(e.instructions,(r,n)=>this.instructionIds[n],(r,n)=>l`
            <li data-id=${this.instructionIds[n]}>
              <div class="step-number">${n+1}</div>
              <textarea .value=${r} @input=${o=>this.updateInstruction(n,o.target.value)}></textarea>
              <button
                class="drag-handle"
                aria-label="Drag to reorder step"
                @pointerdown=${o=>this.onDragStart(o,this.instructionIds[n])}
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
    .image-placeholder {
      width: 100%;
      height: 160px;
      border-radius: 12px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: var(--divider-color, #e0e0e0);
      color: var(--secondary-text-color, #757575);
      font-size: 14px;
      animation: image-placeholder-pulse 1.6s ease-in-out infinite;
    }
    @keyframes image-placeholder-pulse {
      0%,
      100% {
        opacity: 0.6;
      }
      50% {
        opacity: 1;
      }
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
  `,a([c({attribute:!1})],S.prototype,"recipe",2),a([c({type:String})],S.prototype,"imageBase64",2),a([c({type:String})],S.prototype,"imageMime",2),a([c({type:String})],S.prototype,"imageError",2),a([c({type:Boolean})],S.prototype,"imageLoading",2),a([c({type:Boolean})],S.prototype,"saving",2),a([p()],S.prototype,"draft",2),a([p()],S.prototype,"instructionIds",2),S=a([v("ai-recipe-preview")],S);function dt(s,i,e){let t=s.some(r=>r.name.toLowerCase()===i.toLowerCase());return e?t?s:[...s,{id:"",name:i,slug:i.toLowerCase().replace(/\s+/g,"-")}]:s.filter(r=>r.name.toLowerCase()!==i.toLowerCase())}var m=class extends f{constructor(){super(...arguments);this.narrow=!1;this.recipes=[];this.loading=!0;this.selectedRecipe=null;this.editingRecipe=!1;this.recipeSaving=!1;this.recipeImageGenerating=!1;this.recipeImageCacheBust=0;this.searchQuery="";this.cookbooks=[];this.panelConfig={aiEnabled:!0,aiConfigured:!0};this.selectedCookbook="";this.error="";this.showMealplanDialog=!1;this.showLastmadeDialog=!1;this.showShoppingListDialog=!1;this.shoppingLists=[];this.pendingShoppingItems=[];this.showMealplanView=!1;this.cameFromMealplan=!1;this.weekStart=_();this.mealplanEntries=[];this.mealplanLoading=!1;this.pendingDeleteMealplanEntry=null;this.showRandomPicker=!1;this.showDeleteConfirm=!1;this.showShoppingView=!1;this.selectedShoppingListId="";this.shoppingListItems=[];this.shoppingListItemsLoading=!1;this.showDeleteListConfirm=!1;this.showAiView=!1;this.aiPrompt="";this.aiGenerating=!1;this.aiError="";this.aiGeneratedRecipe=null;this.aiImageBase64=null;this.aiImageMime=null;this.aiImageError=null;this.aiImageLoading=!1;this.aiImageRequest=null;this.aiSaving=!1;this.aiImporting=!1;this.aiLastAction="generate";this.aiLastImportText="";this.aiLastImportImage=null}createRenderRoot(){return this}willUpdate(){!this.client&&this.hass&&(this.client=new ye(this.hass),this.loadRecipes(),this.loadCookbooks(),this.loadConfig().then(()=>this.handleDeepLink()))}handleDeepLink(){let e=new URLSearchParams(location.search),t=e.get("recipe"),r=e.get("ai_prompt"),n=e.get("search");!t&&!r&&!n||(history.replaceState(null,"",location.pathname),t?this.openRecipe(t):r?(this.aiPrompt=r,this.openAiView(),this.panelConfig.aiConfigured&&this.onAiGenerate()):n&&(this.searchQuery=n,this.loadRecipes(n)))}async loadConfig(){if(this.client)try{this.panelConfig=await this.client.getConfig()}catch{}}async loadCookbooks(){if(this.client)try{let e=await this.client.getCookbooks();this.cookbooks=e.items}catch{}}async loadRecipes(e=""){if(this.client){this.loading=!0,this.error="";try{let t=await this.client.searchRecipes({search:e,cookbook:this.selectedCookbook||void 0});this.recipes=t.items}catch(t){this.error=await w(t,"Failed to load recipes")}finally{this.loading=!1}}}async openRecipe(e,t=!1){if(this.client){this.selectedRecipe=null,this.cameFromMealplan=t,this.showMealplanView=!1;try{this.selectedRecipe=await this.client.getRecipe(e)}catch(r){this.error=await w(r,"Failed to load recipe")}}}closeDetail(){this.selectedRecipe=null,this.editingRecipe=!1,this.cameFromMealplan&&(this.showMealplanView=!0,this.cameFromMealplan=!1)}async onSaveRecipeEdit(e){if(!(!this.client||!this.selectedRecipe)){this.recipeSaving=!0;try{let t=await this.client.updateRecipe(this.selectedRecipe.slug,e.detail.body);this.selectedRecipe=t,this.editingRecipe=!1,this.loadRecipes(this.searchQuery)}catch(t){this.error=await w(t,"Failed to save recipe changes")}finally{this.recipeSaving=!1}}}async onRegenerateImage(e){if(!this.client||!this.selectedRecipe)return;let t=this.selectedRecipe.slug;this.recipeImageGenerating=!0;try{let r=await this.client.generateRecipeImage(this.selectedRecipe.name,e);if(!r.imageBase64){this.error=r.imageError??"Failed to generate an image";return}await this.client.attachRecipeImage(t,r.imageBase64,r.imageMime),this.selectedRecipe?.slug===t&&(this.selectedRecipe=await this.client.getRecipe(t)),this.recipeImageCacheBust=Date.now(),this.loadRecipes(this.searchQuery)}catch(r){this.error=await w(r,"Failed to generate an image")}finally{this.recipeImageGenerating=!1}}async openMealplanView(){this.showMealplanView=!0,await this.loadMealplanWeek()}async loadMealplanWeek(){if(this.client){this.mealplanLoading=!0;try{let e=await this.client.getMealplans(this.weekStart,le(this.weekStart,6));this.mealplanEntries=e.items}catch(e){this.error=await w(e,"Failed to load meal plan")}finally{this.mealplanLoading=!1}}}changeWeek(e){this.weekStart=le(this.weekStart,e),this.loadMealplanWeek()}goToCurrentWeek(){this.weekStart=_(),this.loadMealplanWeek()}onSearchChange(e){this.searchQuery=e.detail.value,this.loadRecipes(this.searchQuery)}onCookbookChange(e){this.selectedCookbook=e.detail.value,this.loadRecipes(this.searchQuery)}updateRecipeTags(e,t,r){this.recipes=this.recipes.map(n=>n.slug===e?{...n,tags:dt(n.tags,t,r)}:n),this.selectedRecipe?.slug===e&&(this.selectedRecipe={...this.selectedRecipe,tags:dt(this.selectedRecipe.tags,t,r)})}async onFavoriteToggle(e){if(!this.client)return;let{slug:t,favorite:r}=e.detail;try{await this.client.setFavorite(t,r)}catch(n){this.error=await w(n,"Failed to update favorite");return}this.updateRecipeTags(t,"Favorite",r),this.loadCookbooks()}async onMyRecipeToggle(e){if(!this.client)return;let{slug:t,myRecipe:r}=e.detail;try{await this.client.setMyRecipe(t,r)}catch(n){this.error=await w(n,"Failed to update My Recipe");return}this.updateRecipeTags(t,"My Recipe",r),this.loadCookbooks()}async onMealplanConfirm(e){if(!(!this.client||!this.selectedRecipe)){try{await this.client.addToMealplan(this.selectedRecipe.id,e.detail.date,e.detail.entryType)}catch(t){this.error=await w(t,"Failed to add to meal plan")}this.showMealplanDialog=!1}}async onFreeformAdd(e){if(this.client)try{await this.client.addFreeformMealplanEntry(e.detail.date,e.detail.entryType,e.detail.title),this.loadMealplanWeek()}catch(t){this.error=await w(t,"Failed to add to meal plan")}}onRequestDeleteMealplanEntry(e){this.pendingDeleteMealplanEntry=e}async onConfirmDeleteMealplanEntry(){if(!this.client||!this.pendingDeleteMealplanEntry)return;let e=this.pendingDeleteMealplanEntry;this.pendingDeleteMealplanEntry=null;try{await this.client.deleteMealplanEntry(e.id),this.mealplanEntries=this.mealplanEntries.filter(t=>t.id!==e.id)}catch(t){this.error=await w(t,"Failed to remove meal plan entry")}}async onLastmadeConfirm(e){if(!this.client||!this.selectedRecipe)return;let t=this.selectedRecipe.slug;try{await this.client.setLastMade(t,e.detail.date);let r=`${e.detail.date}T00:00:00`;this.recipes=this.recipes.map(n=>n.slug===t?{...n,lastMade:r}:n),this.selectedRecipe?.slug===t&&(this.selectedRecipe={...this.selectedRecipe,lastMade:r})}catch(r){this.error=await w(r,"Failed to record last made date")}this.showLastmadeDialog=!1}async onOpenShoppingList(e){if(this.client){this.pendingShoppingItems=e.detail.items,this.showShoppingListDialog=!0;try{let t=await this.client.getShoppingLists();this.shoppingLists=t.items}catch(t){this.error=await w(t,"Failed to load shopping lists")}}}async onShoppingConfirm(e){if(this.client){try{let t=e.detail.listId??(await this.client.createShoppingList(e.detail.newListName)).id;await this.client.addToShoppingList(t,this.pendingShoppingItems)}catch(t){this.error=await w(t,"Failed to add items to shopping list")}this.showShoppingListDialog=!1,this.pendingShoppingItems=[]}}async onRandomModeSelect(e){if(this.client){this.showRandomPicker=!1;try{let{recipe:t}=await this.client.getRandomRecipe(e.detail.mode);t?this.openRecipe(t.slug):this.error="No recipes found for that category yet."}catch(t){this.error=await w(t,"Failed to pick a random recipe")}}}async openShoppingView(){if(this.showShoppingView=!0,!this.shoppingLists.length)try{let t=await this.client.getShoppingLists();this.shoppingLists=t.items}catch(t){this.error=await w(t,"Failed to load shopping lists");return}let e=this.selectedShoppingListId||this.shoppingLists[0]?.id;e&&this.loadShoppingList(e)}async loadShoppingList(e){if(this.client){this.selectedShoppingListId=e,this.shoppingListItemsLoading=!0;try{let t=await this.client.getShoppingListDetail(e);this.shoppingListItems=t.listItems}catch(t){this.error=await w(t,"Failed to load shopping list")}finally{this.shoppingListItemsLoading=!1}}}async onToggleShoppingItem(e){if(!this.client)return;let{itemId:t,checked:r}=e.detail;this.shoppingListItems=this.shoppingListItems.map(n=>n.id===t?{...n,checked:r}:n);try{await this.client.setShoppingItemChecked(t,r)}catch(n){this.error=await w(n,"Failed to update item")}}async onDeleteListConfirm(){if(!this.client||!this.selectedShoppingListId)return;let e=this.selectedShoppingListId;try{await this.client.deleteShoppingList(e),this.shoppingLists=this.shoppingLists.filter(r=>r.id!==e),this.selectedShoppingListId="",this.shoppingListItems=[];let t=this.shoppingLists[0]?.id;t&&this.loadShoppingList(t)}catch(t){this.error=await w(t,"Failed to delete shopping list")}this.showDeleteListConfirm=!1}openAiView(){this.showAiView=!0,this.aiGeneratedRecipe=null,this.aiError=""}onAiGenerateFromSearch(e){e.detail.query&&(this.aiPrompt=e.detail.query,this.openAiView(),this.panelConfig.aiConfigured&&this.onAiGenerate())}closeAiView(){this.showAiView=!1,this.aiGeneratedRecipe=null,this.aiPrompt="",this.aiError="",this.aiLastAction="generate",this.aiLastImportText="",this.aiLastImportImage=null}closeAiPreview(){this.aiGeneratedRecipe=null,this.aiImageBase64=null,this.aiImageMime=null,this.aiImageError=null,this.aiImageLoading=!1}async onAiGenerate(){if(!(!this.client||!this.aiPrompt.trim())){this.aiGenerating=!0,this.aiError="",this.aiLastAction="generate";try{let e=await this.client.generateRecipe(this.aiPrompt.trim());this.aiGeneratedRecipe=e,this.aiImageBase64=null,this.aiImageMime=null,this.aiImageError=null,this.startAiImageGeneration(e.name)}catch(e){this.aiError=await w(e,"Failed to generate a recipe")}finally{this.aiGenerating=!1}}}async onAiImport(e){if(!this.client)return;let{text:t,image:r}=e.detail;if(!(!t.trim()&&!r)){this.aiLastAction="import",this.aiLastImportText=t,this.aiLastImportImage=r,this.aiImporting=!0,this.aiError="";try{let n=await this.client.importRecipe(t,r);this.aiGeneratedRecipe=n,this.aiImageBase64=null,this.aiImageMime=null,this.aiImageError=null,this.startAiImageGeneration(n.name)}catch(n){this.aiError=await w(n,"Failed to import recipe")}finally{this.aiImporting=!1}}}startAiImageGeneration(e){if(!this.client)return;this.aiImageLoading=!0;let t=this.client.generateRecipeImage(e);this.aiImageRequest=t,t.then(r=>{this.aiImageBase64=r.imageBase64,this.aiImageMime=r.imageMime,this.aiImageError=r.imageError}).catch(async r=>{this.aiImageError=await w(r,"Failed to generate an image")}).finally(()=>{this.aiImageLoading=!1})}async attachImageWhenReady(e,t){if(this.client)try{let r=await t;r.imageBase64&&await this.client.attachRecipeImage(e,r.imageBase64,r.imageMime)}catch{}}onAiRegenerate(){this.aiLastAction==="import"?this.onAiImport(new CustomEvent("import",{detail:{text:this.aiLastImportText,image:this.aiLastImportImage}})):this.onAiGenerate()}async onAiSaveRecipe(e){if(!this.client)return;let t=this.aiImageLoading?this.aiImageRequest:null;this.aiSaving=!0;try{let{slug:r}=await this.client.saveGeneratedRecipe(e.detail.recipe,this.aiImageBase64,this.aiImageMime);t&&this.attachImageWhenReady(r,t),this.closeAiView(),this.loadRecipes(this.searchQuery),this.openRecipe(r)}catch(r){this.aiError=await w(r,"Failed to save recipe to Mealie")}finally{this.aiSaving=!1}}async onDeleteConfirm(){if(!this.client||!this.selectedRecipe)return;let e=this.selectedRecipe.slug;try{await this.client.deleteRecipe(e),this.recipes=this.recipes.filter(t=>t.slug!==e),this.selectedRecipe=null,this.cameFromMealplan=!1}catch(t){this.error=await w(t,"Failed to delete recipe")}this.showDeleteConfirm=!1}render(){if(!this.client)return l`<panel-shell title="Recipes"><p style="padding:16px">Loading…</p></panel-shell>`;if(this.selectedRecipe&&this.editingRecipe){let e=this.client.recipeImageUrl(this.selectedRecipe.id,"original")+(this.recipeImageCacheBust?`?v=${this.recipeImageCacheBust}`:"");return l`
        <panel-shell title="Edit Recipe" showBack @back=${()=>this.editingRecipe=!1}>
          <recipe-edit-view
            .recipe=${this.selectedRecipe}
            .imageUrl=${e}
            .saving=${this.recipeSaving}
            .imageGenerating=${this.recipeImageGenerating}
            @save=${t=>this.onSaveRecipeEdit(t)}
            @cancel=${()=>this.editingRecipe=!1}
            @regenerate-image=${t=>this.onRegenerateImage(t.detail.guidance)}
          ></recipe-edit-view>
        </panel-shell>
      `}if(this.selectedRecipe){let e=this.client.recipeImageUrl(this.selectedRecipe.id,"original")+(this.recipeImageCacheBust?`?v=${this.recipeImageCacheBust}`:"");return l`
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
            @edit=${()=>this.editingRecipe=!0}
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
            @freeform-add=${e=>this.onFreeformAdd(e)}
            @delete-entry=${e=>this.onRequestDeleteMealplanEntry(e.detail.entry)}
          ></mealplan-view>
        </panel-shell>
        <confirm-dialog
          .open=${!!this.pendingDeleteMealplanEntry}
          heading="Remove from meal plan?"
          message=${`"${this.pendingDeleteMealplanEntry?.recipe?.name??this.pendingDeleteMealplanEntry?.title??"This item"}" will be removed from the meal plan.`}
          confirmLabel="Remove"
          destructive
          @confirm=${()=>this.onConfirmDeleteMealplanEntry()}
          @cancel=${()=>this.pendingDeleteMealplanEntry=null}
        ></confirm-dialog>
      `;if(this.showShoppingView){let e=this.shoppingLists.find(t=>t.id===this.selectedShoppingListId)?.name??"";return l`
        <panel-shell title="Shopping List" showBack @back=${()=>this.showShoppingView=!1}>
          <shopping-view
            .lists=${this.shoppingLists}
            .selectedListId=${this.selectedShoppingListId}
            .items=${this.shoppingListItems}
            .loading=${this.shoppingListItemsLoading}
            @select-list=${t=>this.loadShoppingList(t.detail.listId)}
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
              .imageLoading=${this.aiImageLoading}
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
            .aiConfigured=${this.panelConfig.aiConfigured}
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
          ${this.panelConfig.aiEnabled?l`
                <button
                  style="border:none;background:transparent;font-size:24px;padding:8px;min-width:44px;min-height:44px;cursor:pointer;"
                  aria-label="AI Recipe Finder"
                  @click=${()=>this.openAiView()}
                >
                  ✨
                </button>
              `:null}
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
          .searchQuery=${this.searchQuery}
          .aiEnabled=${this.panelConfig.aiEnabled}
          .imageUrl=${e=>this.client.recipeImageUrl(e.id)}
          @recipe-select=${e=>this.openRecipe(e.detail.slug)}
          @favorite-toggle=${this.onFavoriteToggle}
          @ai-generate-from-search=${e=>this.onAiGenerateFromSearch(e)}
        ></recipe-grid>
      </panel-shell>
    `}};a([c({attribute:!1})],m.prototype,"hass",2),a([c({type:Boolean})],m.prototype,"narrow",2),a([p()],m.prototype,"recipes",2),a([p()],m.prototype,"loading",2),a([p()],m.prototype,"selectedRecipe",2),a([p()],m.prototype,"editingRecipe",2),a([p()],m.prototype,"recipeSaving",2),a([p()],m.prototype,"recipeImageGenerating",2),a([p()],m.prototype,"recipeImageCacheBust",2),a([p()],m.prototype,"searchQuery",2),a([p()],m.prototype,"cookbooks",2),a([p()],m.prototype,"panelConfig",2),a([p()],m.prototype,"selectedCookbook",2),a([p()],m.prototype,"error",2),a([p()],m.prototype,"showMealplanDialog",2),a([p()],m.prototype,"showLastmadeDialog",2),a([p()],m.prototype,"showShoppingListDialog",2),a([p()],m.prototype,"shoppingLists",2),a([p()],m.prototype,"pendingShoppingItems",2),a([p()],m.prototype,"showMealplanView",2),a([p()],m.prototype,"cameFromMealplan",2),a([p()],m.prototype,"weekStart",2),a([p()],m.prototype,"mealplanEntries",2),a([p()],m.prototype,"mealplanLoading",2),a([p()],m.prototype,"pendingDeleteMealplanEntry",2),a([p()],m.prototype,"showRandomPicker",2),a([p()],m.prototype,"showDeleteConfirm",2),a([p()],m.prototype,"showShoppingView",2),a([p()],m.prototype,"selectedShoppingListId",2),a([p()],m.prototype,"shoppingListItems",2),a([p()],m.prototype,"shoppingListItemsLoading",2),a([p()],m.prototype,"showDeleteListConfirm",2),a([p()],m.prototype,"showAiView",2),a([p()],m.prototype,"aiPrompt",2),a([p()],m.prototype,"aiGenerating",2),a([p()],m.prototype,"aiError",2),a([p()],m.prototype,"aiGeneratedRecipe",2),a([p()],m.prototype,"aiImageBase64",2),a([p()],m.prototype,"aiImageMime",2),a([p()],m.prototype,"aiImageError",2),a([p()],m.prototype,"aiImageLoading",2),a([p()],m.prototype,"aiSaving",2),a([p()],m.prototype,"aiImporting",2),a([p()],m.prototype,"aiLastAction",2),a([p()],m.prototype,"aiLastImportText",2),a([p()],m.prototype,"aiLastImportImage",2),m=a([v("mealie-recipe-panel")],m);export{m as MealieRecipePanel};
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
