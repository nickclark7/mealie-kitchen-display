var We=Object.defineProperty;var Ye=Object.getOwnPropertyDescriptor;var n=(o,t,e,i)=>{for(var s=i>1?void 0:i?Ye(t,e):t,r=o.length-1,a;r>=0;r--)(a=o[r])&&(s=(i?a(t,e,s):a(s))||s);return i&&s&&We(t,e,s),s};var ie=globalThis,se=ie.ShadowRoot&&(ie.ShadyCSS===void 0||ie.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pe=Symbol(),Ee=new WeakMap,Q=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==pe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(se&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Ee.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ee.set(e,t))}return t}toString(){return this.cssText}},_e=o=>new Q(typeof o=="string"?o:o+"",void 0,pe),v=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,r)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new Q(e,o,pe)},Se=(o,t)=>{if(se)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=ie.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},ce=se?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return _e(e)})(o):o;var{is:Qe,defineProperty:Ge,getOwnPropertyDescriptor:Ke,getOwnPropertyNames:Je,getOwnPropertySymbols:Ve,getPrototypeOf:Ze}=Object,oe=globalThis,Ae=oe.trustedTypes,Xe=Ae?Ae.emptyScript:"",et=oe.reactiveElementPolyfillSupport,G=(o,t)=>o,K={toAttribute(o,t){switch(t){case Boolean:o=o?Xe:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},re=(o,t)=>!Qe(o,t),Le={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??=Symbol("metadata"),oe.litPropertyMetadata??=new WeakMap;var _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Le){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Ge(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=Ke(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let c=s?.call(this);r?.call(this,a),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Le}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;let t=Ze(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){let e=this.properties,i=[...Je(e),...Ve(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(ce(s))}else t!==void 0&&e.push(ce(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Se(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:K).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:K;this._$Em=s;let c=a.fromAttribute(e,r.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let a=this.constructor;if(s===!1&&(r=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??re)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:a}=r,c=this[s];a!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,r,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[G("elementProperties")]=new Map,_[G("finalized")]=new Map,et?.({ReactiveElement:_}),(oe.reactiveElementVersions??=[]).push("2.1.2");var ve=globalThis,Ce=o=>o,ne=ve.trustedTypes,Te=ne?ne.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ue="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,Ne="?"+T,tt=`<${Ne}>`,U=document,V=()=>U.createComment(""),Z=o=>o===null||typeof o!="object"&&typeof o!="function",ye=Array.isArray,it=o=>ye(o)||typeof o?.[Symbol.iterator]=="function",de=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Re=/-->/g,Ie=/>/g,P=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,Pe=/"/g,Oe=/^(?:script|style|textarea|title)$/i,be=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),l=be(1),yt=be(2),bt=be(3),N=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ze=new WeakMap,z=U.createTreeWalker(U,129);function He(o,t){if(!ye(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Te!==void 0?Te.createHTML(t):t}var st=(o,t)=>{let e=o.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",a=J;for(let c=0;c<e;c++){let d=o[c],b,x,y=-1,E=0;for(;E<d.length&&(a.lastIndex=E,x=a.exec(d),x!==null);)E=a.lastIndex,a===J?x[1]==="!--"?a=Re:x[1]!==void 0?a=Ie:x[2]!==void 0?(Oe.test(x[2])&&(s=RegExp("</"+x[2],"g")),a=P):x[3]!==void 0&&(a=P):a===P?x[0]===">"?(a=s??J,y=-1):x[1]===void 0?y=-2:(y=a.lastIndex-x[2].length,b=x[1],a=x[3]===void 0?P:x[3]==='"'?Pe:Me):a===Pe||a===Me?a=P:a===Re||a===Ie?a=J:(a=P,s=void 0);let C=a===P&&o[c+1].startsWith("/>")?" ":"";r+=a===J?d+tt:y>=0?(i.push(b),d.slice(0,y)+Ue+d.slice(y)+T+C):d+T+(y===-2?c:C)}return[He(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},X=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0,c=t.length-1,d=this.parts,[b,x]=st(t,e);if(this.el=o.createElement(b,i),z.currentNode=this.el.content,e===2||e===3){let y=this.el.content.firstChild;y.replaceWith(...y.childNodes)}for(;(s=z.nextNode())!==null&&d.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let y of s.getAttributeNames())if(y.endsWith(Ue)){let E=x[a++],C=s.getAttribute(y).split(T),te=/([.?@])?(.*)/.exec(E);d.push({type:1,index:r,name:te[2],strings:C,ctor:te[1]==="."?me:te[1]==="?"?ue:te[1]==="@"?ge:F}),s.removeAttribute(y)}else y.startsWith(T)&&(d.push({type:6,index:r}),s.removeAttribute(y));if(Oe.test(s.tagName)){let y=s.textContent.split(T),E=y.length-1;if(E>0){s.textContent=ne?ne.emptyScript:"";for(let C=0;C<E;C++)s.append(y[C],V()),z.nextNode(),d.push({type:2,index:++r});s.append(y[E],V())}}}else if(s.nodeType===8)if(s.data===Ne)d.push({type:2,index:r});else{let y=-1;for(;(y=s.data.indexOf(T,y+1))!==-1;)d.push({type:7,index:r}),y+=T.length-1}r++}}static createElement(t,e){let i=U.createElement("template");return i.innerHTML=t,i}};function D(o,t,e=o,i){if(t===N)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=Z(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=D(o,s._$AS(o,t.values),s,i)),t}var he=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);z.currentNode=s;let r=z.nextNode(),a=0,c=0,d=i[0];for(;d!==void 0;){if(a===d.index){let b;d.type===2?b=new ee(r,r.nextSibling,this,t):d.type===1?b=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(b=new fe(r,this,t)),this._$AV.push(b),d=i[++c]}a!==d?.index&&(r=z.nextNode(),a++)}return z.currentNode=U,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},ee=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),Z(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==N&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):it(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&Z(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=X.createElement(He(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new he(s,this),a=r.u(this.options);r.p(e),this.T(a),this._$AH=r}}_$AC(t){let e=ze.get(t.strings);return e===void 0&&ze.set(t.strings,e=new X(t)),e}k(t){ye(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new o(this.O(V()),this.O(V()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Ce(t).nextSibling;Ce(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},F=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(t,e=this,i,s){let r=this.strings,a=!1;if(r===void 0)t=D(this,t,e,0),a=!Z(t)||t!==this._$AH&&t!==N,a&&(this._$AH=t);else{let c=t,d,b;for(t=r[0],d=0;d<r.length-1;d++)b=D(this,c[i+d],e,d),b===N&&(b=this._$AH[d]),a||=!Z(b)||b!==this._$AH[d],b===u?t=u:t!==u&&(t+=(b??"")+r[d+1]),this._$AH[d]=b}a&&!s&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},me=class extends F{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},ue=class extends F{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},ge=class extends F{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=D(this,t,e,0)??u)===N)return;let i=this._$AH,s=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==u&&(i===u||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},fe=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}};var ot=ve.litHtmlPolyfillSupport;ot?.(X,ee),(ve.litHtmlVersions??=[]).push("3.3.3");var De=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new ee(t.insertBefore(V(),r),r,void 0,e??{})}return s._$AI(o),s};var xe=globalThis,m=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=De(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}};m._$litElement$=!0,m.finalized=!0,xe.litElementHydrateSupport?.({LitElement:m});var rt=xe.litElementPolyfillSupport;rt?.({LitElement:m});(xe.litElementVersions??=[]).push("4.2.2");var f=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var nt={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:re},at=(o=nt,t,e)=>{let{kind:i,metadata:s}=e,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(e.name,o),i==="accessor"){let{name:a}=e;return{set(c){let d=t.get.call(this);t.set.call(this,c),this.requestUpdate(a,d,o,!0,c)},init(c){return c!==void 0&&this.C(a,void 0,o,c),c}}}if(i==="setter"){let{name:a}=e;return function(c){let d=this[a];t.call(this,c),this.requestUpdate(a,d,o,!0,c)}}throw Error("Unsupported decorator location: "+i)};function p(o){return(t,e)=>typeof e=="object"?at(o,t,e):((i,s,r)=>{let a=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),a?Object.getOwnPropertyDescriptor(s,r):void 0})(o,t,e)}function h(o){return p({...o,state:!0,attribute:!1})}var le=class{constructor(t){this.hass=t}async searchRecipes(t={}){let e=new URLSearchParams;e.set("page",String(t.page??1)),e.set("perPage",String(t.perPage??24)),t.search&&e.set("search",t.search),t.cookbook&&e.set("cookbook",t.cookbook);for(let i of t.categories??[])e.append("categories",i);for(let i of t.tags??[])e.append("tags",i);return this.hass.callApi("GET",`mealie_recipe_panel/recipes?${e.toString()}`)}async getCookbooks(){return this.hass.callApi("GET","mealie_recipe_panel/cookbooks")}async getRecipe(t){return this.hass.callApi("GET",`mealie_recipe_panel/recipes/${t}`)}async getCategories(){return this.hass.callApi("GET","mealie_recipe_panel/categories")}async getTags(){return this.hass.callApi("GET","mealie_recipe_panel/tags")}recipeImageUrl(t,e="min-original"){return`/api/mealie_recipe_panel/image/${t}/${e}`}async setFavorite(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${t}/favorite`,{favorite:e})}async setMyRecipe(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${t}/my-recipe`,{my_recipe:e})}async addToMealplan(t,e,i){return this.hass.callApi("POST","mealie_recipe_panel/mealplans",{recipeId:t,date:e,entryType:i})}async setLastMade(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${t}/last-made`,{date:e})}async getShoppingLists(){return this.hass.callApi("GET","mealie_recipe_panel/shopping-lists")}async createShoppingList(t){return this.hass.callApi("POST","mealie_recipe_panel/shopping-lists",{name:t})}async addToShoppingList(t,e){return this.hass.callApi("POST","mealie_recipe_panel/shopping-items",{shoppingListId:t,items:e})}async getMealplans(t,e){return this.hass.callApi("GET",`mealie_recipe_panel/mealplans?start_date=${t}&end_date=${e}`)}async getRandomRecipe(t){return this.hass.callApi("GET",`mealie_recipe_panel/recipes/random?mode=${t}`)}async deleteRecipe(t){return this.hass.callApi("DELETE",`mealie_recipe_panel/recipes/${t}`)}async getShoppingListDetail(t){return this.hass.callApi("GET",`mealie_recipe_panel/shopping-lists/${t}`)}async setShoppingItemChecked(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/shopping-items/${t}/checked`,{checked:e})}async deleteShoppingList(t){return this.hass.callApi("DELETE",`mealie_recipe_panel/shopping-lists/${t}`)}},lt="Favorite",pt="My Recipe";function Fe(o,t){return!!o?.some(e=>e.name.toLowerCase()===t.toLowerCase())}function j(o){return Fe(o,lt)}function $e(o){return Fe(o,pt)}var O=class extends m{constructor(){super(...arguments);this.title="Recipes";this.showBack=!1}render(){return l`
      <header>
        ${this.showBack?l`<button class="back" aria-label="Back" @click=${()=>this.dispatchEvent(new CustomEvent("back"))}>‹</button>`:null}
        <h1>${this.title}</h1>
        <div class="header-extra"><slot name="header-extra"></slot></div>
      </header>
      <main><slot></slot></main>
    `}};O.styles=v`
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
  `,n([p({type:String})],O.prototype,"title",2),n([p({type:Boolean})],O.prototype,"showBack",2),O=n([f("panel-shell")],O);var B=class extends m{constructor(){super(...arguments);this.value=""}onInput(e){let i=e.target.value;this.value=i,window.clearTimeout(this.debounceHandle),this.debounceHandle=window.setTimeout(()=>{this.dispatchEvent(new CustomEvent("search-change",{detail:{value:i}}))},300)}render(){return l`
      <input
        type="search"
        placeholder="Search recipes…"
        .value=${this.value}
        @input=${this.onInput}
      />
    `}};B.styles=v`
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
  `,n([p({type:String})],B.prototype,"value",2),B=n([f("recipe-search-bar")],B);var H=class extends m{constructor(){super(...arguments);this.cookbooks=[];this.value=""}onChange(e){let i=e.target.value;this.value=i,this.dispatchEvent(new CustomEvent("cookbook-change",{detail:{value:i}}))}render(){return l`
      <select .value=${this.value} @change=${this.onChange}>
        <option value="">All cookbooks</option>
        ${this.cookbooks.map(e=>l`<option value=${e.id} ?selected=${e.id===this.value}>${e.name}</option>`)}
      </select>
    `}};H.styles=v`
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
  `,n([p({attribute:!1})],H.prototype,"cookbooks",2),n([p({type:String})],H.prototype,"value",2),H=n([f("cookbook-select")],H);var R=class extends m{constructor(){super(...arguments);this.recipes=[];this.imageUrl=()=>"";this.loading=!1}onSelect(e){this.dispatchEvent(new CustomEvent("recipe-select",{detail:{slug:e.slug}}))}onToggleFavorite(e,i){e.stopPropagation(),this.dispatchEvent(new CustomEvent("favorite-toggle",{detail:{slug:i.slug,favorite:!j(i.tags)}}))}render(){return this.loading?l`<div class="empty">Loading recipes…</div>`:this.recipes.length?l`
      <div class="grid">
        ${this.recipes.map(e=>{let i=j(e.tags);return l`
            <div class="card" @click=${()=>this.onSelect(e)}>
              <div class="thumb-wrap">
                ${e.image?l`<img class="thumb" loading="lazy" src=${this.imageUrl(e)} alt="" />`:l`<div class="thumb"></div>`}
                <button
                  class="favorite ${i?"active":""}"
                  aria-label="Toggle favorite"
                  @click=${s=>this.onToggleFavorite(s,e)}
                >
                  ${i?"\u2665":"\u2661"}
                </button>
              </div>
              <div class="info">
                <p class="name">${e.name}</p>
                <div class="meta">
                  ${e.totalTime?l`<span>⏱ ${e.totalTime}</span>`:u}
                  ${e.recipeServings?l`<span>🍽 ${e.recipeServings}</span>`:u}
                </div>
              </div>
            </div>
          `})}
      </div>
    `:l`<div class="empty">No recipes found.</div>`}};R.styles=v`
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
  `,n([p({attribute:!1})],R.prototype,"recipes",2),n([p({attribute:!1})],R.prototype,"imageUrl",2),n([p({type:Boolean})],R.prototype,"loading",2),R=n([f("recipe-grid")],R);var S=class extends m{constructor(){super(...arguments);this.recipe=null;this.imageUrl="";this.completedSteps=new Set;this.checkedIngredients=new Set}willUpdate(e){e.has("recipe")&&e.get("recipe")?.slug!==this.recipe?.slug&&(this.completedSteps=new Set,this.checkedIngredients=new Set)}onToggleFavorite(){this.recipe&&this.dispatchEvent(new CustomEvent("favorite-toggle",{detail:{slug:this.recipe.slug,favorite:!j(this.recipe.tags)}}))}onToggleMyRecipe(){this.recipe&&this.dispatchEvent(new CustomEvent("my-recipe-toggle",{detail:{slug:this.recipe.slug,myRecipe:!$e(this.recipe.tags)}}))}onAddToMealplan(){this.recipe&&this.dispatchEvent(new CustomEvent("open-mealplan"))}onOpenLastMade(){this.recipe&&this.dispatchEvent(new CustomEvent("open-lastmade"))}onDelete(){this.recipe&&this.dispatchEvent(new CustomEvent("open-delete-confirm"))}toggleIngredient(e){let i=new Set(this.checkedIngredients);i.has(e)?i.delete(e):i.add(e),this.checkedIngredients=i}onAddToShoppingList(){if(!this.recipe)return;let e=this.recipe.recipeIngredient.filter((i,s)=>this.checkedIngredients.has(s)).map(i=>i.display);e.length&&this.dispatchEvent(new CustomEvent("open-shopping-list",{detail:{items:e}}))}toggleStep(e){let i=new Set(this.completedSteps);i.has(e)?i.delete(e):i.add(e),this.completedSteps=i}render(){let e=this.recipe;if(!e)return l`<p>Loading…</p>`;let i=j(e.tags),s=$e(e.tags);return l`
      ${e.image?l`<img class="hero" src=${this.imageUrl} alt="" />`:u}
      <div class="meta-row">
        ${e.prepTime?l`<span>Prep: ${e.prepTime}</span>`:u}
        ${e.cookTime?l`<span>Cook: ${e.cookTime}</span>`:u}
        ${e.totalTime?l`<span>Total: ${e.totalTime}</span>`:u}
        ${e.recipeServings?l`<span>Servings: ${e.recipeServings}</span>`:u}
        <button class="favorite ${i?"active":""}" aria-label="Toggle favorite" @click=${this.onToggleFavorite}>
          ${i?"\u2665":"\u2661"}
        </button>
      </div>
      <div class="action-row">
        <button class="pill-button ${s?"active":""}" @click=${this.onToggleMyRecipe}>
          ${s?"\u2713 My Recipe":"+ My Recipe"}
        </button>
        <button class="pill-button" @click=${this.onAddToMealplan}>📅 Add to Meal Plan</button>
        <button class="pill-button" @click=${this.onOpenLastMade}>
          ${e.lastMade?`\u2713 Last made ${e.lastMade.slice(0,10)}`:"\u{1F37D} Mark as Made"}
        </button>
        <button class="pill-button danger" @click=${this.onDelete}>🗑 Delete</button>
      </div>
      ${e.description?l`<p>${e.description}</p>`:u}

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
        ${e.recipeIngredient.map((r,a)=>l`<li>
            <input type="checkbox" .checked=${this.checkedIngredients.has(a)} @change=${()=>this.toggleIngredient(a)} />${r.display}
          </li>`)}
      </ul>

      <h2>Instructions</h2>
      <ol class="instructions">
        ${e.recipeInstructions.map((r,a)=>{let c=this.completedSteps.has(a);return l`
            <li class=${c?"done":""} @click=${()=>this.toggleStep(a)}>
              ${c?l`<span class="step-done-label">Step ${a+1} done</span>`:l`${r.title?l`<strong>${r.title}</strong><br />`:u}${r.text}`}
            </li>
          `})}
      </ol>
    `}};S.styles=v`
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
  `,n([p({attribute:!1})],S.prototype,"recipe",2),n([p({type:String})],S.prototype,"imageUrl",2),n([h()],S.prototype,"completedSteps",2),n([h()],S.prototype,"checkedIngredients",2),S=n([f("recipe-detail-view")],S);function je(o){let t=o.getFullYear(),e=String(o.getMonth()+1).padStart(2,"0"),i=String(o.getDate()).padStart(2,"0");return`${t}-${e}-${i}`}function $(){return je(new Date)}function q(o,t){let e=new Date(`${o}T00:00:00`);return e.setDate(e.getDate()+t),je(e)}function we(o){let e=new Date(`${o}T00:00:00`).getDay();return q(o,e===0?-6:1-e)}var ct=["breakfast","lunch","dinner","side","snack","drink","dessert"],A=class extends m{constructor(){super(...arguments);this.open=!1;this.recipeName="";this.date=$();this.entryType="dinner"}willUpdate(e){e.has("open")&&this.open&&(this.date=$(),this.entryType="dinner")}confirm(){this.dispatchEvent(new CustomEvent("mealplan-confirm",{detail:{date:this.date,entryType:this.entryType}}))}cancel(){this.dispatchEvent(new CustomEvent("mealplan-cancel"))}render(){return this.open?l`
      <div class="card">
        <h2>Add to Meal Plan</h2>
        <p class="subtitle">${this.recipeName}</p>

        <label for="date">Day</label>
        <input id="date" type="date" .value=${this.date} @change=${e=>this.date=e.target.value} />

        <label for="entry-type">Meal</label>
        <select id="entry-type" .value=${this.entryType} @change=${e=>this.entryType=e.target.value}>
          ${ct.map(e=>l`<option value=${e} ?selected=${e===this.entryType}>${e[0].toUpperCase()}${e.slice(1)}</option>`)}
        </select>

        <div class="actions">
          <button class="cancel" @click=${this.cancel}>Cancel</button>
          <button class="confirm" @click=${this.confirm}>Add</button>
        </div>
      </div>
    `:null}};A.styles=v`
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
  `,n([p({type:Boolean,reflect:!0})],A.prototype,"open",2),n([p({type:String})],A.prototype,"recipeName",2),n([h()],A.prototype,"date",2),n([h()],A.prototype,"entryType",2),A=n([f("mealplan-dialog")],A);var I=class extends m{constructor(){super(...arguments);this.open=!1;this.recipeName="";this.date=$()}willUpdate(e){e.has("open")&&this.open&&(this.date=$())}confirm(){this.dispatchEvent(new CustomEvent("lastmade-confirm",{detail:{date:this.date}}))}cancel(){this.dispatchEvent(new CustomEvent("lastmade-cancel"))}render(){return this.open?l`
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
    `:null}};I.styles=v`
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
  `,n([p({type:Boolean,reflect:!0})],I.prototype,"open",2),n([p({type:String})],I.prototype,"recipeName",2),n([h()],I.prototype,"date",2),I=n([f("lastmade-dialog")],I);var W="__new__",w=class extends m{constructor(){super(...arguments);this.open=!1;this.itemCount=0;this.lists=[];this.selection="";this.newListName=""}willUpdate(e){e.has("open")&&this.open&&(this.selection=this.lists[0]?.id??W,this.newListName="")}get canConfirm(){return this.selection===W?this.newListName.trim().length>0:!!this.selection}confirm(){if(!this.canConfirm)return;let e=this.selection===W?{newListName:this.newListName.trim()}:{listId:this.selection};this.dispatchEvent(new CustomEvent("shopping-confirm",{detail:e}))}cancel(){this.dispatchEvent(new CustomEvent("shopping-cancel"))}render(){return this.open?l`
      <div class="card">
        <h2>Add to Shopping List</h2>
        <p class="subtitle">${this.itemCount} ingredient${this.itemCount===1?"":"s"} selected</p>

        <label for="list">List</label>
        <select id="list" .value=${this.selection} @change=${e=>this.selection=e.target.value}>
          ${this.lists.map(e=>l`<option value=${e.id} ?selected=${e.id===this.selection}>${e.name}</option>`)}
          <option value=${W} ?selected=${this.selection===W}>+ New list…</option>
        </select>

        ${this.selection===W?l`
              <label for="new-list-name">New list name</label>
              <input
                id="new-list-name"
                type="text"
                placeholder="e.g. Weekly Shop"
                .value=${this.newListName}
                @input=${e=>this.newListName=e.target.value}
              />
            `:u}

        <div class="actions">
          <button class="cancel" @click=${this.cancel}>Cancel</button>
          <button class="confirm" ?disabled=${!this.canConfirm} @click=${this.confirm}>Add</button>
        </div>
      </div>
    `:null}};w.styles=v`
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
  `,n([p({type:Boolean,reflect:!0})],w.prototype,"open",2),n([p({type:Number})],w.prototype,"itemCount",2),n([p({attribute:!1})],w.prototype,"lists",2),n([h()],w.prototype,"selection",2),n([h()],w.prototype,"newListName",2),w=n([f("shopping-list-dialog")],w);var Be=["breakfast","lunch","dinner","side","snack","drink","dessert"],dt=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];function ke(o){return new Date(`${o}T00:00:00`).toLocaleDateString(void 0,{month:"short",day:"numeric"})}var M=class extends m{constructor(){super(...arguments);this.weekStart="";this.entries=[];this.loading=!1}onSelect(e){e.recipe&&this.dispatchEvent(new CustomEvent("recipe-select",{detail:{slug:e.recipe.slug}}))}render(){let e=Array.from({length:7},(s,r)=>q(this.weekStart,r)),i=$();return l`
      <div class="nav">
        <button @click=${()=>this.dispatchEvent(new CustomEvent("prev-week"))}>‹ Prev</button>
        <button @click=${()=>this.dispatchEvent(new CustomEvent("next-week"))}>Next ›</button>
        <button @click=${()=>this.dispatchEvent(new CustomEvent("today"))}>Today</button>
        <span class="range">${ke(e[0])} – ${ke(e[6])}</span>
      </div>
      ${this.loading?l`<p>Loading…</p>`:l`
            <div class="week">
              ${e.map((s,r)=>{let a=this.entries.filter(c=>c.date===s).sort((c,d)=>Be.indexOf(c.entryType)-Be.indexOf(d.entryType));return l`
                  <div class="day ${s===i?"today":""}">
                    <div class="day-header">${dt[r]} ${ke(s)}</div>
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
    `}};M.styles=v`
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
  `,n([p({type:String})],M.prototype,"weekStart",2),n([p({attribute:!1})],M.prototype,"entries",2),n([p({type:Boolean})],M.prototype,"loading",2),M=n([f("mealplan-view")],M);var ht=[{mode:"all",label:"All Recipes",icon:"\u{1F37D}"},{mode:"my-recipes",label:"My Recipes",icon:"\u270D\uFE0F"},{mode:"favorites",label:"Favorites",icon:"\u2764\uFE0F"},{mode:"made-before",label:"Made Before",icon:"\u{1F551}"}],Y=class extends m{constructor(){super(...arguments);this.open=!1}select(e){this.dispatchEvent(new CustomEvent("mode-select",{detail:{mode:e}}))}render(){return this.open?l`
      <div class="card">
        <h2>Surprise Me</h2>
        <div class="grid">
          ${ht.map(e=>l`
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
    `:null}};Y.styles=v`
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
  `,n([p({type:Boolean,reflect:!0})],Y.prototype,"open",2),Y=n([f("random-picker-dialog")],Y);var k=class extends m{constructor(){super(...arguments);this.open=!1;this.heading="Are you sure?";this.message="";this.confirmLabel="Confirm";this.destructive=!1}render(){return this.open?l`
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
    `:null}};k.styles=v`
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
  `,n([p({type:Boolean,reflect:!0})],k.prototype,"open",2),n([p({type:String})],k.prototype,"heading",2),n([p({type:String})],k.prototype,"message",2),n([p({type:String})],k.prototype,"confirmLabel",2),n([p({type:Boolean})],k.prototype,"destructive",2),k=n([f("confirm-dialog")],k);var L=class extends m{constructor(){super(...arguments);this.lists=[];this.selectedListId="";this.items=[];this.loading=!1}toggle(e){this.dispatchEvent(new CustomEvent("toggle-item",{detail:{itemId:e.id,checked:!e.checked}}))}render(){if(!this.lists.length)return l`<div class="empty">No shopping lists yet.</div>`;let e=[...this.items].sort((i,s)=>Number(i.checked)-Number(s.checked));return l`
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
    `}};L.styles=v`
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
  `,n([p({attribute:!1})],L.prototype,"lists",2),n([p({type:String})],L.prototype,"selectedListId",2),n([p({attribute:!1})],L.prototype,"items",2),n([p({type:Boolean})],L.prototype,"loading",2),L=n([f("shopping-view")],L);function qe(o,t,e){let i=o.some(s=>s.name.toLowerCase()===t.toLowerCase());return e?i?o:[...o,{id:"",name:t,slug:t.toLowerCase().replace(/\s+/g,"-")}]:o.filter(s=>s.name.toLowerCase()!==t.toLowerCase())}var g=class extends m{constructor(){super(...arguments);this.narrow=!1;this.recipes=[];this.loading=!0;this.selectedRecipe=null;this.searchQuery="";this.cookbooks=[];this.selectedCookbook="";this.error="";this.showMealplanDialog=!1;this.showLastmadeDialog=!1;this.showShoppingListDialog=!1;this.shoppingLists=[];this.pendingShoppingItems=[];this.showMealplanView=!1;this.cameFromMealplan=!1;this.weekStart=we($());this.mealplanEntries=[];this.mealplanLoading=!1;this.showRandomPicker=!1;this.showDeleteConfirm=!1;this.showShoppingView=!1;this.selectedShoppingListId="";this.shoppingListItems=[];this.shoppingListItemsLoading=!1;this.showDeleteListConfirm=!1}createRenderRoot(){return this}willUpdate(){!this.client&&this.hass&&(this.client=new le(this.hass),this.loadRecipes(),this.loadCookbooks())}async loadCookbooks(){if(this.client)try{let e=await this.client.getCookbooks();this.cookbooks=e.items}catch{}}async loadRecipes(e=""){if(this.client){this.loading=!0,this.error="";try{let i=await this.client.searchRecipes({search:e,cookbook:this.selectedCookbook||void 0});this.recipes=i.items}catch(i){this.error=i instanceof Error?i.message:"Failed to load recipes"}finally{this.loading=!1}}}async openRecipe(e,i=!1){if(this.client){this.selectedRecipe=null,this.cameFromMealplan=i,this.showMealplanView=!1;try{this.selectedRecipe=await this.client.getRecipe(e)}catch(s){this.error=s instanceof Error?s.message:"Failed to load recipe"}}}closeDetail(){this.selectedRecipe=null,this.cameFromMealplan&&(this.showMealplanView=!0,this.cameFromMealplan=!1)}async openMealplanView(){this.showMealplanView=!0,await this.loadMealplanWeek()}async loadMealplanWeek(){if(this.client){this.mealplanLoading=!0;try{let e=await this.client.getMealplans(this.weekStart,q(this.weekStart,6));this.mealplanEntries=e.items}catch(e){this.error=e instanceof Error?e.message:"Failed to load meal plan"}finally{this.mealplanLoading=!1}}}changeWeek(e){this.weekStart=q(this.weekStart,e),this.loadMealplanWeek()}goToCurrentWeek(){this.weekStart=we($()),this.loadMealplanWeek()}onSearchChange(e){this.searchQuery=e.detail.value,this.loadRecipes(this.searchQuery)}onCookbookChange(e){this.selectedCookbook=e.detail.value,this.loadRecipes(this.searchQuery)}updateRecipeTags(e,i,s){this.recipes=this.recipes.map(r=>r.slug===e?{...r,tags:qe(r.tags,i,s)}:r),this.selectedRecipe?.slug===e&&(this.selectedRecipe={...this.selectedRecipe,tags:qe(this.selectedRecipe.tags,i,s)})}async onFavoriteToggle(e){if(!this.client)return;let{slug:i,favorite:s}=e.detail;try{await this.client.setFavorite(i,s)}catch(r){this.error=r instanceof Error?r.message:"Failed to update favorite";return}this.updateRecipeTags(i,"Favorite",s),this.loadCookbooks()}async onMyRecipeToggle(e){if(!this.client)return;let{slug:i,myRecipe:s}=e.detail;try{await this.client.setMyRecipe(i,s)}catch(r){this.error=r instanceof Error?r.message:"Failed to update My Recipe";return}this.updateRecipeTags(i,"My Recipe",s),this.loadCookbooks()}async onMealplanConfirm(e){if(!(!this.client||!this.selectedRecipe)){try{await this.client.addToMealplan(this.selectedRecipe.id,e.detail.date,e.detail.entryType)}catch(i){this.error=i instanceof Error?i.message:"Failed to add to meal plan"}this.showMealplanDialog=!1}}async onLastmadeConfirm(e){if(!this.client||!this.selectedRecipe)return;let i=this.selectedRecipe.slug;try{await this.client.setLastMade(i,e.detail.date);let s=`${e.detail.date}T00:00:00`;this.recipes=this.recipes.map(r=>r.slug===i?{...r,lastMade:s}:r),this.selectedRecipe?.slug===i&&(this.selectedRecipe={...this.selectedRecipe,lastMade:s})}catch(s){this.error=s instanceof Error?s.message:"Failed to record last made date"}this.showLastmadeDialog=!1}async onOpenShoppingList(e){if(this.client){this.pendingShoppingItems=e.detail.items,this.showShoppingListDialog=!0;try{let i=await this.client.getShoppingLists();this.shoppingLists=i.items}catch(i){this.error=i instanceof Error?i.message:"Failed to load shopping lists"}}}async onShoppingConfirm(e){if(this.client){try{let i=e.detail.listId??(await this.client.createShoppingList(e.detail.newListName)).id;await this.client.addToShoppingList(i,this.pendingShoppingItems)}catch(i){this.error=i instanceof Error?i.message:"Failed to add items to shopping list"}this.showShoppingListDialog=!1,this.pendingShoppingItems=[]}}async onRandomModeSelect(e){if(this.client){this.showRandomPicker=!1;try{let{recipe:i}=await this.client.getRandomRecipe(e.detail.mode);i?this.openRecipe(i.slug):this.error="No recipes found for that category yet."}catch(i){this.error=i instanceof Error?i.message:"Failed to pick a random recipe"}}}async openShoppingView(){if(this.showShoppingView=!0,!this.shoppingLists.length)try{let i=await this.client.getShoppingLists();this.shoppingLists=i.items}catch(i){this.error=i instanceof Error?i.message:"Failed to load shopping lists";return}let e=this.selectedShoppingListId||this.shoppingLists[0]?.id;e&&this.loadShoppingList(e)}async loadShoppingList(e){if(this.client){this.selectedShoppingListId=e,this.shoppingListItemsLoading=!0;try{let i=await this.client.getShoppingListDetail(e);this.shoppingListItems=i.listItems}catch(i){this.error=i instanceof Error?i.message:"Failed to load shopping list"}finally{this.shoppingListItemsLoading=!1}}}async onToggleShoppingItem(e){if(!this.client)return;let{itemId:i,checked:s}=e.detail;this.shoppingListItems=this.shoppingListItems.map(r=>r.id===i?{...r,checked:s}:r);try{await this.client.setShoppingItemChecked(i,s)}catch(r){this.error=r instanceof Error?r.message:"Failed to update item"}}async onDeleteListConfirm(){if(!this.client||!this.selectedShoppingListId)return;let e=this.selectedShoppingListId;try{await this.client.deleteShoppingList(e),this.shoppingLists=this.shoppingLists.filter(s=>s.id!==e),this.selectedShoppingListId="",this.shoppingListItems=[];let i=this.shoppingLists[0]?.id;i&&this.loadShoppingList(i)}catch(i){this.error=i instanceof Error?i.message:"Failed to delete shopping list"}this.showDeleteListConfirm=!1}async onDeleteConfirm(){if(!this.client||!this.selectedRecipe)return;let e=this.selectedRecipe.slug;try{await this.client.deleteRecipe(e),this.recipes=this.recipes.filter(i=>i.slug!==e),this.selectedRecipe=null,this.cameFromMealplan=!1}catch(i){this.error=i instanceof Error?i.message:"Failed to delete recipe"}this.showDeleteConfirm=!1}render(){if(!this.client)return l`<panel-shell title="Recipes"><p style="padding:16px">Loading…</p></panel-shell>`;if(this.selectedRecipe){let e=this.client.recipeImageUrl(this.selectedRecipe.id,"original");return l`
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
      `}return l`
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
    `}};n([p({attribute:!1})],g.prototype,"hass",2),n([p({type:Boolean})],g.prototype,"narrow",2),n([h()],g.prototype,"recipes",2),n([h()],g.prototype,"loading",2),n([h()],g.prototype,"selectedRecipe",2),n([h()],g.prototype,"searchQuery",2),n([h()],g.prototype,"cookbooks",2),n([h()],g.prototype,"selectedCookbook",2),n([h()],g.prototype,"error",2),n([h()],g.prototype,"showMealplanDialog",2),n([h()],g.prototype,"showLastmadeDialog",2),n([h()],g.prototype,"showShoppingListDialog",2),n([h()],g.prototype,"shoppingLists",2),n([h()],g.prototype,"pendingShoppingItems",2),n([h()],g.prototype,"showMealplanView",2),n([h()],g.prototype,"cameFromMealplan",2),n([h()],g.prototype,"weekStart",2),n([h()],g.prototype,"mealplanEntries",2),n([h()],g.prototype,"mealplanLoading",2),n([h()],g.prototype,"showRandomPicker",2),n([h()],g.prototype,"showDeleteConfirm",2),n([h()],g.prototype,"showShoppingView",2),n([h()],g.prototype,"selectedShoppingListId",2),n([h()],g.prototype,"shoppingListItems",2),n([h()],g.prototype,"shoppingListItemsLoading",2),n([h()],g.prototype,"showDeleteListConfirm",2),g=n([f("mealie-recipe-panel")],g);export{g as MealieRecipePanel};
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
