var Ue=Object.defineProperty;var He=Object.getOwnPropertyDescriptor;var c=(s,t,e,i)=>{for(var r=i>1?void 0:i?He(t,e):t,n=s.length-1,a;n>=0;n--)(a=s[n])&&(r=(i?a(t,e,r):a(r))||r);return i&&r&&Ue(t,e,r),r};var G=globalThis,B=G.ShadowRoot&&(G.ShadyCSS===void 0||G.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),me=new WeakMap,H=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(B&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=me.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&me.set(e,t))}return t}toString(){return this.cssText}},ge=s=>new H(typeof s=="string"?s:s+"",void 0,Y),b=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((i,r,n)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1],s[0]);return new H(e,s,Y)},fe=(s,t)=>{if(B)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=G.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},Z=B?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return ge(e)})(s):s;var{is:Oe,defineProperty:De,getOwnPropertyDescriptor:Ie,getOwnPropertyNames:ze,getOwnPropertySymbols:Ne,getPrototypeOf:Fe}=Object,W=globalThis,ye=W.trustedTypes,je=ye?ye.emptyScript:"",qe=W.reactiveElementPolyfillSupport,O=(s,t)=>s,D={toAttribute(s,t){switch(t){case Boolean:s=s?je:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},J=(s,t)=>!Oe(s,t),ve={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??=Symbol("metadata"),W.litPropertyMetadata??=new WeakMap;var $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ve){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&De(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:n}=Ie(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:r,set(a){let d=r?.call(this);n?.call(this,a),this.requestUpdate(t,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ve}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let t=Fe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let e=this.properties,i=[...ze(e),...Ne(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(Z(r))}else t!==void 0&&e.push(Z(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fe(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:D).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let n=i.getPropertyOptions(r),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:D;this._$Em=r;let d=a.fromAttribute(e,n.type);this[r]=d??this._$Ej?.get(r)??d,this._$Em=null}}requestUpdate(t,e,i,r=!1,n){if(t!==void 0){let a=this.constructor;if(r===!1&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??J)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),n!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,n]of i){let{wrapped:a}=n,d=this[r];a!==!0||this._$AL.has(r)||d===void 0||this.C(r,void 0,n,d)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[O("elementProperties")]=new Map,$[O("finalized")]=new Map,qe?.({ReactiveElement:$}),(W.reactiveElementVersions??=[]).push("2.1.2");var ne=globalThis,be=s=>s,V=ne.trustedTypes,xe=V?V.createPolicy("lit-html",{createHTML:s=>s}):void 0,Se="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,ke="?"+A,Ge=`<${ke}>`,P=document,z=()=>P.createComment(""),N=s=>s===null||typeof s!="object"&&typeof s!="function",ae=Array.isArray,Be=s=>ae(s)||typeof s?.[Symbol.iterator]=="function",X=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$e=/-->/g,_e=/>/g,k=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ee=/'/g,we=/"/g,Re=/^(?:script|style|textarea|title)$/i,oe=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),o=oe(1),lt=oe(2),ct=oe(3),T=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Ae=new WeakMap,R=P.createTreeWalker(P,129);function Pe(s,t){if(!ae(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return xe!==void 0?xe.createHTML(t):t}var We=(s,t)=>{let e=s.length-1,i=[],r,n=t===2?"<svg>":t===3?"<math>":"",a=I;for(let d=0;d<e;d++){let l=s[d],f,y,h=-1,x=0;for(;x<l.length&&(a.lastIndex=x,y=a.exec(l),y!==null);)x=a.lastIndex,a===I?y[1]==="!--"?a=$e:y[1]!==void 0?a=_e:y[2]!==void 0?(Re.test(y[2])&&(r=RegExp("</"+y[2],"g")),a=k):y[3]!==void 0&&(a=k):a===k?y[0]===">"?(a=r??I,h=-1):y[1]===void 0?h=-2:(h=a.lastIndex-y[2].length,f=y[1],a=y[3]===void 0?k:y[3]==='"'?we:Ee):a===we||a===Ee?a=k:a===$e||a===_e?a=I:(a=k,r=void 0);let w=a===k&&s[d+1].startsWith("/>")?" ":"";n+=a===I?l+Ge:h>=0?(i.push(f),l.slice(0,h)+Se+l.slice(h)+A+w):l+A+(h===-2?d:w)}return[Pe(s,n+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},F=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,a=0,d=t.length-1,l=this.parts,[f,y]=We(t,e);if(this.el=s.createElement(f,i),R.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=R.nextNode())!==null&&l.length<d;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(Se)){let x=y[a++],w=r.getAttribute(h).split(A),q=/([.?@])?(.*)/.exec(x);l.push({type:1,index:n,name:q[2],strings:w,ctor:q[1]==="."?te:q[1]==="?"?ie:q[1]==="@"?re:L}),r.removeAttribute(h)}else h.startsWith(A)&&(l.push({type:6,index:n}),r.removeAttribute(h));if(Re.test(r.tagName)){let h=r.textContent.split(A),x=h.length-1;if(x>0){r.textContent=V?V.emptyScript:"";for(let w=0;w<x;w++)r.append(h[w],z()),R.nextNode(),l.push({type:2,index:++n});r.append(h[x],z())}}}else if(r.nodeType===8)if(r.data===ke)l.push({type:2,index:n});else{let h=-1;for(;(h=r.data.indexOf(A,h+1))!==-1;)l.push({type:7,index:n}),h+=A.length-1}n++}}static createElement(t,e){let i=P.createElement("template");return i.innerHTML=t,i}};function M(s,t,e=s,i){if(t===T)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl,n=N(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=M(s,r._$AS(s,t.values),r,i)),t}var ee=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??P).importNode(e,!0);R.currentNode=r;let n=R.nextNode(),a=0,d=0,l=i[0];for(;l!==void 0;){if(a===l.index){let f;l.type===2?f=new j(n,n.nextSibling,this,t):l.type===1?f=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(f=new se(n,this,t)),this._$AV.push(f),l=i[++d]}a!==l?.index&&(n=R.nextNode(),a++)}return R.currentNode=P,r}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},j=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),N(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Be(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=F.createElement(Pe(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new ee(r,this),a=n.u(this.options);n.p(e),this.T(a),this._$AH=n}}_$AC(t){let e=Ae.get(t.strings);return e===void 0&&Ae.set(t.strings,e=new F(t)),e}k(t){ae(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let n of t)r===e.length?e.push(i=new s(this.O(z()),this.O(z()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=be(t).nextSibling;be(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},L=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,r){let n=this.strings,a=!1;if(n===void 0)t=M(this,t,e,0),a=!N(t)||t!==this._$AH&&t!==T,a&&(this._$AH=t);else{let d=t,l,f;for(t=n[0],l=0;l<n.length-1;l++)f=M(this,d[i+l],e,l),f===T&&(f=this._$AH[l]),a||=!N(f)||f!==this._$AH[l],f===p?t=p:t!==p&&(t+=(f??"")+n[l+1]),this._$AH[l]=f}a&&!r&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},te=class extends L{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},ie=class extends L{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},re=class extends L{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??p)===T)return;let i=this._$AH,r=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==p&&(i===p||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},se=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}};var Je=ne.litHtmlPolyfillSupport;Je?.(F,j),(ne.litHtmlVersions??=[]).push("3.3.3");var Te=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let n=e?.renderBefore??null;i._$litPart$=r=new j(t.insertBefore(z(),n),n,void 0,e??{})}return r._$AI(s),r};var le=globalThis,v=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Te(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};v._$litElement$=!0,v.finalized=!0,le.litElementHydrateSupport?.({LitElement:v});var Ve=le.litElementPolyfillSupport;Ve?.({LitElement:v});(le.litElementVersions??=[]).push("4.2.2");var Ke={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:J},Qe=(s=Ke,t,e)=>{let{kind:i,metadata:r}=e,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(e.name,s),i==="accessor"){let{name:a}=e;return{set(d){let l=t.get.call(this);t.set.call(this,d),this.requestUpdate(a,l,s,!0,d)},init(d){return d!==void 0&&this.C(a,void 0,s,d),d}}}if(i==="setter"){let{name:a}=e;return function(d){let l=this[a];t.call(this,d),this.requestUpdate(a,l,s,!0,d)}}throw Error("Unsupported decorator location: "+i)};function g(s){return(t,e)=>typeof e=="object"?Qe(s,t,e):((i,r,n)=>{let a=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),a?Object.getOwnPropertyDescriptor(r,n):void 0})(s,t,e)}function u(s){return g({...s,state:!0,attribute:!1})}var Q=class{constructor(t){this.hass=t}async searchRecipes(t={}){let e=new URLSearchParams;e.set("page",String(t.page??1)),e.set("perPage",String(t.perPage??24)),t.search&&e.set("search",t.search),t.cookbook&&e.set("cookbook",t.cookbook);for(let i of t.categories??[])e.append("categories",i);for(let i of t.tags??[])e.append("tags",i);return this.hass.callApi("GET",`mealie_recipe_panel/recipes?${e.toString()}`)}async getCookbooks(){return this.hass.callApi("GET","mealie_recipe_panel/cookbooks")}async getConfig(){return this.hass.callApi("GET","mealie_recipe_panel/config")}async getRecipe(t){return this.hass.callApi("GET",`mealie_recipe_panel/recipes/${t}`)}async updateRecipe(t,e){return this.hass.callApi("POST",`mealie_recipe_panel/recipes/${t}`,e)}async getCategories(){return this.hass.callApi("GET","mealie_recipe_panel/categories")}async getTags(){return this.hass.callApi("GET","mealie_recipe_panel/tags")}recipeImageUrl(t,e="min-original"){return`/api/mealie_recipe_panel/image/${t}/${e}`}async setFavorite(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${t}/favorite`,{favorite:e})}async setMyRecipe(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${t}/my-recipe`,{my_recipe:e})}async addToMealplan(t,e,i){return this.hass.callApi("POST","mealie_recipe_panel/mealplans",{recipeId:t,date:e,entryType:i})}async addFreeformMealplanEntry(t,e,i){return this.hass.callApi("POST","mealie_recipe_panel/mealplans",{date:t,entryType:e,title:i})}async deleteMealplanEntry(t){return this.hass.callApi("DELETE",`mealie_recipe_panel/mealplans/${t}`)}async setLastMade(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/recipes/${t}/last-made`,{date:e})}async getShoppingLists(){return this.hass.callApi("GET","mealie_recipe_panel/shopping-lists")}async createShoppingList(t){return this.hass.callApi("POST","mealie_recipe_panel/shopping-lists",{name:t})}async addToShoppingList(t,e){return this.hass.callApi("POST","mealie_recipe_panel/shopping-items",{shoppingListId:t,items:e})}async getMealplans(t,e){return this.hass.callApi("GET",`mealie_recipe_panel/mealplans?start_date=${t}&end_date=${e}`)}async getRandomRecipe(t){return this.hass.callApi("GET",`mealie_recipe_panel/recipes/random?mode=${t}`)}async getRandomRecipes(t,e){let{recipes:i}=await this.hass.callApi("GET",`mealie_recipe_panel/recipes/random?mode=${t}&count=${e}`);return i}async deleteRecipe(t){return this.hass.callApi("DELETE",`mealie_recipe_panel/recipes/${t}`)}async getShoppingListDetail(t){return this.hass.callApi("GET",`mealie_recipe_panel/shopping-lists/${t}`)}async setShoppingItemChecked(t,e){return this.hass.callApi("PUT",`mealie_recipe_panel/shopping-items/${t}/checked`,{checked:e})}async deleteShoppingList(t){return this.hass.callApi("DELETE",`mealie_recipe_panel/shopping-lists/${t}`)}async generateRecipe(t){return this.hass.callApi("POST","mealie_recipe_panel/ai/generate-recipe",{prompt:t})}async saveGeneratedRecipe(t,e,i,r){return this.hass.callApi("POST","mealie_recipe_panel/ai/save-recipe",{recipe:t,imageBase64:e,imageMime:i,historyId:r})}async getAiHistory(){return this.hass.callApi("GET","mealie_recipe_panel/ai/history")}async deleteAiHistoryEntry(t){return this.hass.callApi("DELETE",`mealie_recipe_panel/ai/history/${t}`)}aiHistoryImageUrl(t){return`/api/mealie_recipe_panel/ai/history/${t}/image`}async importRecipe(t,e){let i=null,r=null;return e&&(i=await Ye(e),r=e.type||"image/jpeg"),this.hass.callApi("POST","mealie_recipe_panel/ai/import-recipe",{text:t,imageBase64:i,imageMime:r})}async generateRecipeImage(t,e,i){return this.hass.callApi("POST","mealie_recipe_panel/ai/generate-recipe-image",{subject:t,guidance:e,historyId:i})}async attachRecipeImage(t,e,i){return this.hass.callApi("POST",`mealie_recipe_panel/recipes/${t}/ai-image`,{imageBase64:e,imageMime:i})}};function Ye(s){return new Promise((t,e)=>{let i=new FileReader;i.onload=()=>{let r=i.result;t(r.slice(r.indexOf(",")+1))},i.onerror=()=>e(i.error),i.readAsDataURL(s)})}async function C(s,t){if(s instanceof Error&&s.message)return s.message;if(s&&typeof s=="object"){let e=s;if(typeof e.text=="function")try{let n=await e.text();if(n)return n}catch{}let i=s.message;if(typeof i=="string"&&i)return i;let r=s.status;if(typeof r=="number")return`Request failed (HTTP ${r})`}return t}function Ce(s){let t=s.getFullYear(),e=String(s.getMonth()+1).padStart(2,"0"),i=String(s.getDate()).padStart(2,"0");return`${t}-${e}-${i}`}function ce(){return Ce(new Date)}function pe(s,t){let e=new Date(`${s}T00:00:00`);return e.setDate(e.getDate()+t),Ce(e)}var _=class extends v{constructor(){super(...arguments);this.open=!1;this.heading="Are you sure?";this.message="";this.confirmLabel="Confirm";this.destructive=!1}render(){return this.open?o`
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
    `:null}};_.styles=b`
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
  `,c([g({type:Boolean,reflect:!0})],_.prototype,"open",2),c([g({type:String})],_.prototype,"heading",2),c([g({type:String})],_.prototype,"message",2),c([g({type:String})],_.prototype,"confirmLabel",2),c([g({type:Boolean})],_.prototype,"destructive",2);customElements.get("confirm-dialog")||customElements.define("confirm-dialog",_);var S=class extends v{constructor(){super(...arguments);this.panelJsUrl="";this.deepLink="";this.error=null}connectedCallback(){super.connectedCallback(),this.loadPanel()}async loadPanel(){try{await import(new URL(this.panelJsUrl,window.location.href).href),this.deepLink&&history.replaceState(null,"",location.pathname+this.deepLink);let i=document.createElement("mealie-recipe-panel");i.hass=this.hass,i.narrow=window.innerWidth<870,i.style.display="block",i.style.height="100%",this.panelEl=i,this.requestUpdate()}catch(e){this.error=e instanceof Error?e.message:String(e)}}updated(){this.panelEl&&(this.panelEl.hass=this.hass)}close(){this.dispatchEvent(new CustomEvent("overlay-close",{bubbles:!0,composed:!0}))}render(){return o`
      <div class="bar">
        <button class="close" aria-label="Close" @click=${()=>this.close()}>✕</button>
      </div>
      ${this.error?o`<div class="status error">Couldn't load the recipe panel: ${this.error}</div>`:this.panelEl?o`<div class="panel-host">${this.panelEl}</div>`:o`<div class="status">Loading…</div>`}
    `}};S.styles=b`
    :host {
      position: fixed;
      inset: 0;
      z-index: 1000000;
      display: flex;
      flex-direction: column;
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
    }
    /* A dedicated strip above the panel's own header, rather than floating
       over it — the panel's header buttons differ (and shift position) per
       view, so anything overlaid on top of it risks sitting on a real button. */
    .bar {
      flex-shrink: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: max(env(safe-area-inset-top, 0px), 4px) 8px 4px;
      background: var(--app-header-background-color, #fff);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .close {
      border: none;
      background: transparent;
      color: inherit;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .close:active {
      background: var(--divider-color, #e0e0e0);
    }
    .panel-host {
      flex: 1;
      min-height: 0;
    }
    .panel-host mealie-recipe-panel {
      display: block;
      height: 100%;
    }
    .status {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      padding: 24px;
      text-align: center;
    }
    .status.error {
      color: var(--error-color, #db4437);
    }
  `,c([g({attribute:!1})],S.prototype,"hass",2),c([g({attribute:!1})],S.prototype,"panelJsUrl",2),c([g({attribute:!1})],S.prototype,"deepLink",2),c([u()],S.prototype,"error",2);customElements.get("mealie-launcher-overlay")||customElements.define("mealie-launcher-overlay",S);var Ze=`
class MealieRecorderProcessor extends AudioWorkletProcessor {
  process(inputList) {
    const input = inputList[0];
    if (!input || input.length < 1) return true;
    const float32Data = input[0];
    const int16Data = new Int16Array(float32Data.length);
    for (let i = 0; i < float32Data.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Data[i]));
      int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    this.port.postMessage(int16Data);
    return true;
  }
}
registerProcessor("mealie-recorder", MealieRecorderProcessor);
`;function Xe(s){return s.trim().replace(/[\s.,!?;:]+$/,"")}function et(s){switch(s instanceof DOMException?s.name:""){case"NotAllowedError":case"SecurityError":return"Microphone access was blocked. Allow it for this page, then try again.";case"NotFoundError":case"OverconstrainedError":return"No microphone was found on this device.";case"NotReadableError":return"The microphone is already in use by something else.";default:return s instanceof Error?s.message:String(s)}}var E=class E extends v{constructor(){super(...arguments);this.pipelineId=null;this.disabled=!1;this.label="Dictate";this.status="idle";this.pending=[];this.level=0;this.awaitingHaIcon=!1}static get isSupported(){return window.isSecureContext&&!!navigator.mediaDevices?.getUserMedia&&typeof AudioContext<"u"}disconnectedCallback(){super.disconnectedCallback(),this.teardown()}setStatus(e){if(this.status===e)return;this.status=e;let i=e==="starting"?"listening":e;this.dispatchEvent(new CustomEvent("voice-state",{detail:{state:i},bubbles:!0,composed:!0}))}startLevelLoop(){let e=()=>{this.status!=="listening"&&this.status!=="starting"||(this.style.setProperty("--level",this.level.toFixed(3)),this.level*=.82,this.levelFrame=requestAnimationFrame(e))};this.levelFrame=requestAnimationFrame(e)}stopLevelLoop(){this.levelFrame!==void 0&&cancelAnimationFrame(this.levelFrame),this.levelFrame=void 0,this.level=0,this.style.setProperty("--level","0")}measureLevel(e){if(!e.length)return;let i=0;for(let a=0;a<e.length;a+=4){let d=e[a]/32768;i+=d*d}let r=Math.sqrt(i/Math.ceil(e.length/4)),n=Math.min(1,r*6);this.level=Math.max(this.level,n)}fail(e){this.teardown(),this.dispatchEvent(new CustomEvent("voice-error",{detail:{message:e},bubbles:!0,composed:!0}))}async onClick(){this.status==="idle"?await this.start():this.teardown()}async start(){if(this.hass){this.setStatus("starting"),this.pending=[],this.handlerId=void 0;try{await this.openMicrophone()}catch(e){this.fail(et(e));return}try{this.unsub=await this.hass.connection.subscribeMessage(e=>this.onPipelineEvent(e),{type:"assist_pipeline/run",start_stage:"stt",end_stage:"stt",input:{sample_rate:this.context.sampleRate},...this.pipelineId?{pipeline:this.pipelineId}:{}}),this.setStatus("listening"),this.startLevelLoop()}catch(e){this.fail(e instanceof Error?e.message:String(e))}}}async openMicrophone(){let e=new AudioContext;this.context=e,this.stream=await navigator.mediaDevices.getUserMedia({audio:!0});let i=URL.createObjectURL(new Blob([Ze],{type:"text/javascript"}));try{await e.audioWorklet.addModule(i)}finally{URL.revokeObjectURL(i)}this.source=e.createMediaStreamSource(this.stream),this.recorder=new AudioWorkletNode(e,"mealie-recorder"),this.recorder.port.onmessage=r=>{let n=r.data;this.measureLevel(n),this.sendChunk(n)},this.source.connect(this.recorder)}onPipelineEvent(e){switch(e.type){case"run-start":this.handlerId=e.data?.runner_data?.stt_binary_handler_id??void 0;for(let i of this.pending)this.sendChunk(i);this.pending=[];break;case"stt-vad-end":this.stopLevelLoop(),this.setStatus("transcribing");break;case"stt-end":{let i=Xe(e.data?.stt_output?.text??"");this.stopRecording(),this.setStatus("idle"),i?this.dispatchEvent(new CustomEvent("voice-text",{detail:{text:i},bubbles:!0,composed:!0})):this.fail("Didn't catch that \u2014 try again.");break}case"run-end":this.teardown();break;case"error":this.fail(e.data?.message||"Speech recognition failed");break;default:break}}sendChunk(e){if(this.handlerId===void 0){this.pending.push(e);return}let i=this.hass?.connection.socket;if(!i)return;i.binaryType="arraybuffer";let r=new Uint8Array(1+e.length*2);r[0]=this.handlerId,r.set(new Uint8Array(e.buffer,e.byteOffset,e.length*2),1),i.send(r)}stopRecording(){this.recorder&&(this.recorder.port.onmessage=null,this.recorder.disconnect()),this.source?.disconnect(),this.stream?.getTracks().forEach(e=>e.stop()),this.handlerId!==void 0&&(this.sendChunk(new Int16Array),this.handlerId=void 0),this.context?.close(),this.recorder=void 0,this.source=void 0,this.stream=void 0,this.context=void 0,this.pending=[]}teardown(){this.stopRecording(),this.stopLevelLoop(),this.unsub?.(),this.unsub=void 0,this.setStatus("idle")}renderIcon(){return customElements.get("ha-icon")?o`<ha-icon icon="mdi:microphone"></ha-icon>`:(this.awaitingHaIcon||(this.awaitingHaIcon=!0,customElements.whenDefined("ha-icon").then(()=>this.requestUpdate())),o`🎤`)}render(){if(!E.isSupported||!this.hass)return p;let e=this.status==="listening"||this.status==="starting",i={idle:this.label,starting:"Starting\u2026",listening:"Listening \u2014 tap to cancel",transcribing:"Transcribing\u2026"};return o`
      <button
        class=${e?"listening":""}
        ?disabled=${this.disabled||this.status==="transcribing"}
        aria-label=${i[this.status]}
        aria-pressed=${e?"true":"false"}
        title=${i[this.status]}
        @click=${this.onClick}
      >
        ${this.status==="transcribing"?o`<div class="spinner"></div>`:o`${e?o`<div class="halo"></div>`:p}${this.renderIcon()}`}
      </button>
    `}};E.styles=b`
    :host {
      display: inline-flex;
      /* Written once per animation frame while listening. */
      --level: 0;
    }
    button {
      position: relative;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--secondary-text-color, #757575);
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-tap-highlight-color: transparent;
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    button:active:not(:disabled) {
      background: var(--divider-color, #e0e0e0);
    }
    button.listening {
      color: var(--primary-color, #03a9f4);
    }
    ha-icon {
      --mdc-icon-size: 22px;
      display: flex;
    }
    /* Sits behind the icon and tracks the speaker's voice: a slow base
       breath so it's alive during silence, scaled out by --level as the
       room gets louder. */
    .halo {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      opacity: calc(0.12 + var(--level) * 0.28);
      transform: scale(calc(0.78 + var(--level) * 0.3));
      transition:
        transform 90ms ease-out,
        opacity 90ms ease-out;
      animation: breathe 2.4s ease-in-out infinite;
      pointer-events: none;
    }
    .spinner {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid var(--divider-color, #e0e0e0);
      border-top-color: var(--primary-color, #03a9f4);
      animation: spin 0.8s linear infinite;
    }
    @keyframes breathe {
      0%,
      100% {
        box-shadow: 0 0 0 0 transparent;
      }
      50% {
        box-shadow: 0 0 0 4px rgba(3, 169, 244, 0.12);
      }
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .halo {
        animation: none;
        transition: none;
      }
      .spinner {
        animation: none;
      }
    }
  `,c([g({attribute:!1})],E.prototype,"hass",2),c([g({attribute:!1})],E.prototype,"pipelineId",2),c([g({type:Boolean})],E.prototype,"disabled",2),c([g({type:String})],E.prototype,"label",2),c([u()],E.prototype,"status",2);var de=E;customElements.get("mealie-voice-button")||customElements.define("mealie-voice-button",de);var he=["breakfast","lunch","dinner","side","snack","drink","dessert"],Me={all:"All Recipes","my-recipes":"My Recipes",favorites:"Favorites","made-before":"Made Before"},ue={mealplan:"This Week's Meals",random:"Random Recipes","random-finder":"Surprise Me","ai-generate":"Generate a Recipe with AI",search:"Find a Recipe"},Le={mealplan:"\u{1F4C5}",random:"\u{1F37D}","random-finder":"\u{1F3B2}","ai-generate":"\u2728",search:"\u{1F50E}"};function tt(s){return new Date(`${s}T00:00:00`).toLocaleDateString(void 0,{weekday:"short"})}function it(s){return new Date(`${s}T00:00:00`).toLocaleDateString(void 0,{month:"short",day:"numeric"})}var m=class extends v{constructor(){super(...arguments);this.config={type:"custom:mealie-dashboard-card",mode:"mealplan"};this.panelConfig={aiEnabled:!0,aiConfigured:!0,voiceEnabled:!1,voicePipeline:null};this.loading=!1;this.error="";this.mealplanEntries=[];this.addFreeformDate=null;this.freeformText="";this.freeformEntryType="dinner";this.freeformSaving=!1;this.pendingDeleteEntry=null;this.randomRecipes=[];this.pickedRecipe=null;this.pickerMode="all";this.aiPrompt="";this.voiceState="idle";this.searchQuery="";this.searchResults=[];this.overlayJsUrl=null}setConfig(e){if(!e.mode)throw new Error("mealie-dashboard-card: 'mode' is required (mealplan, random, random-finder, ai-generate, search)");let i=this.config.mode;this.config={panel_path:"/mealie-recipes",overlay:!1,count:4,random_mode:"all",days:7,show_thumbnails:!1,...e},this.pickerMode=this.config.random_mode??"all",this.client&&this.config.mode!==i&&this.loadModeData()}static getStubConfig(){return{mode:"mealplan"}}static getConfigElement(){return document.createElement("mealie-dashboard-card-editor")}getCardSize(){return this.config.mode==="mealplan"?this.config.show_thumbnails?5:4:3}willUpdate(){!this.client&&this.hass&&(this.client=new Q(this.hass),this.loadConfig(),this.loadModeData())}async loadConfig(){if(this.client)try{this.panelConfig=await this.client.getConfig()}catch{}}loadModeData(){this.client&&(this.error="",this.config.mode==="mealplan"?this.loadMealplan():this.config.mode==="random"?this.loadRandomRecipes():this.config.mode==="random-finder"&&(this.pickedRecipe=null))}async loadMealplan(){if(this.client){this.loading=!0;try{let e=ce(),i=pe(e,(this.config.days??7)-1),r=await this.client.getMealplans(e,i);this.mealplanEntries=r.items}catch(e){this.error=await C(e,"Failed to load meal plan")}finally{this.loading=!1}}}openFreeformAdd(e){this.addFreeformDate=e,this.freeformText="",this.freeformEntryType="dinner"}cancelFreeformAdd(){this.addFreeformDate=null,this.freeformText=""}async submitFreeformAdd(){if(!(!this.client||!this.addFreeformDate||!this.freeformText.trim())){this.freeformSaving=!0;try{await this.client.addFreeformMealplanEntry(this.addFreeformDate,this.freeformEntryType,this.freeformText.trim()),this.addFreeformDate=null,this.freeformText="",await this.loadMealplan()}catch(e){this.error=await C(e,"Failed to add meal plan entry")}finally{this.freeformSaving=!1}}}requestDeleteEntry(e){this.pendingDeleteEntry=e}cancelDeleteEntry(){this.pendingDeleteEntry=null}async confirmDeleteEntry(){if(!this.client||!this.pendingDeleteEntry)return;let e=this.pendingDeleteEntry;this.pendingDeleteEntry=null;try{await this.client.deleteMealplanEntry(e.id),this.mealplanEntries=this.mealplanEntries.filter(i=>i.id!==e.id)}catch(i){this.error=await C(i,"Failed to remove meal plan entry")}}async loadRandomRecipes(){if(this.client){this.loading=!0;try{let e=this.config.random_mode??"all",i=this.config.count??4;this.randomRecipes=await this.client.getRandomRecipes(e,i)}catch(e){this.error=await C(e,"Failed to load random recipes")}finally{this.loading=!1}}}async pickRandom(){if(this.client){this.loading=!0,this.error="";try{let{recipe:e}=await this.client.getRandomRecipe(this.pickerMode);this.pickedRecipe=e,e||(this.error="No recipes found for that filter.")}catch(e){this.error=await C(e,"Failed to pick a recipe")}finally{this.loading=!1}}}onSearchInput(e){this.searchQuery=e.target.value,window.clearTimeout(this.searchTimer),this.searchTimer=window.setTimeout(()=>this.runSearch(),350)}onVoiceSearch(e){this.searchQuery=e.detail.text,window.clearTimeout(this.searchTimer),this.runSearch()}onVoiceError(e){this.error=e.detail.message}voicePlaceholder(e){return this.voiceState==="listening"?"Listening\u2026":this.voiceState==="transcribing"?"Transcribing\u2026":e}renderVoiceButton(e,i){return this.panelConfig.voiceEnabled?o`<mealie-voice-button
      .hass=${this.hass}
      .pipelineId=${this.panelConfig.voicePipeline}
      label=${e}
      @voice-text=${i}
      @voice-error=${this.onVoiceError}
      @voice-state=${r=>this.voiceState=r.detail.state}
    ></mealie-voice-button>`:p}async runSearch(){if(!this.client)return;let e=this.searchQuery.trim();if(!e){this.searchResults=[];return}this.loading=!0,this.error="";try{let i=await this.client.searchRecipes({search:e,perPage:6});this.searchResults=i.items}catch(i){this.error=await C(i,"Search failed")}finally{this.loading=!1}}navigate(e){if(this.config.overlay){let i=e.indexOf("?");this.openOverlay(i>=0?e.slice(i):"");return}history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}async openOverlay(e){if(!this.hass)return;if(!this.overlayJsUrl){let r=await this.hass.callApi("GET","mealie_recipe_panel/panel-asset-url");this.overlayJsUrl=r.url}let i=document.createElement("mealie-launcher-overlay");i.hass=this.hass,i.panelJsUrl=this.overlayJsUrl,i.deepLink=e,i.addEventListener("overlay-close",()=>i.remove(),{once:!0}),document.body.appendChild(i)}openRecipe(e){e&&this.navigate(`${this.config.panel_path}?recipe=${encodeURIComponent(e.slug)}`)}openAiPrompt(){let e=this.aiPrompt.trim();e&&this.navigate(`${this.config.panel_path}?ai_prompt=${encodeURIComponent(e)}`)}openSearchInApp(){let e=this.searchQuery.trim();e&&this.navigate(`${this.config.panel_path}?search=${encodeURIComponent(e)}`)}imageUrl(e){return this.client.recipeImageUrl(e.id)}renderHeader(){let e=this.config.mode;return o`
      <div class="header">
        <span class="icon">${Le[e]}</span>
        <span class="title">${this.config.title||ue[e]}</span>
        ${e==="random"?o`<button class="shuffle" aria-label="Shuffle" @click=${()=>this.loadRandomRecipes()}>🔄</button>`:p}
      </div>
    `}renderMealplanEntry(e){let i=e.recipe?.name??(e.title||"Untitled");return this.config.show_thumbnails?o`
      <div class="entry-thumb">
        <div class="entry-thumb-img-wrap">
          <button
            class="entry-thumb-img-btn"
            ?disabled=${!e.recipe}
            @click=${()=>this.openRecipe(e.recipe)}
          >
            ${e.recipe?.image?o`<img src=${this.imageUrl(e.recipe)} alt="" />`:o`<div class="thumb"></div>`}
          </button>
          <button class="entry-thumb-del" aria-label="Remove from plan" @click=${()=>this.requestDeleteEntry(e)}>
            ✕
          </button>
        </div>
        <span class="entry-thumb-name">${i}</span>
      </div>
    `:o`
        <span class="entry-chip-group">
          <button class="entry-chip" ?disabled=${!e.recipe} @click=${()=>this.openRecipe(e.recipe)}>
            ${i}
          </button>
          <button class="entry-chip-del" aria-label="Remove from plan" @click=${()=>this.requestDeleteEntry(e)}>
            ✕
          </button>
        </span>
      `}renderFreeformForm(){return o`
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
          ${he.map(e=>o`<option value=${e}>${e}</option>`)}
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
    `}renderMealplan(){if(this.loading&&!this.mealplanEntries.length)return o`<p class="muted">Loading…</p>`;let e=Array.from({length:this.config.days??7},(i,r)=>pe(ce(),r));return o`
      ${e.map(i=>{let r=this.mealplanEntries.filter(n=>n.date===i).sort((n,a)=>he.indexOf(n.entryType)-he.indexOf(a.entryType));return o`
          <div class="day-row">
            <div class="day-label">${tt(i)}<br />${it(i)}</div>
            <div class="day-col">
              <div class="day-entries">
                ${r.length?r.map(n=>this.renderMealplanEntry(n)):p}
                ${!r.length&&this.addFreeformDate!==i?o`<span class="muted">Nothing planned</span>`:p}
                ${this.addFreeformDate!==i?o`<button class="add-freeform" @click=${()=>this.openFreeformAdd(i)}>+ Add</button>`:p}
              </div>
              ${this.addFreeformDate===i?this.renderFreeformForm():p}
            </div>
          </div>
        `})}
    `}renderRandom(){return this.loading&&!this.randomRecipes.length?o`<p class="muted">Loading…</p>`:this.randomRecipes.length?o`
      <div class="tiles">
        ${this.randomRecipes.map(e=>o`
            <button class="tile" @click=${()=>this.openRecipe(e)}>
              ${e.image?o`<img src=${this.imageUrl(e)} alt="" />`:o`<div class="thumb"></div>`}
              <div class="name">${e.name}</div>
            </button>
          `)}
      </div>
    `:o`<p class="muted">No recipes found.</p>`}renderRandomFinder(){return o`
      <div class="finder-controls">
        <select
          .value=${this.pickerMode}
          @change=${e=>this.pickerMode=e.target.value}
        >
          ${Object.entries(Me).map(([e,i])=>o`<option value=${e}>${i}</option>`)}
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
          `:p}
    `}renderAiGenerate(){return this.panelConfig.aiEnabled?this.panelConfig.aiConfigured?o`
      <div class="voice-wrap multiline">
        <textarea
          placeholder=${this.voicePlaceholder("e.g. a thick and crispy pizza dough recipe")}
          .value=${this.aiPrompt}
          @input=${e=>this.aiPrompt=e.target.value}
        ></textarea>
        ${this.renderVoiceButton("Dictate a recipe request",e=>this.aiPrompt=e.detail.text)}
      </div>
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
      `:o`<p class="setup-needed">AI recipe features are disabled in this integration's settings.</p>`}renderSearch(){let e=this.searchQuery.trim(),i=this.panelConfig.aiEnabled&&e.length>0;return o`
      <div class="search-row">
        <div class="voice-wrap single">
          <input
            type="text"
            placeholder=${this.voicePlaceholder("Search recipes\u2026")}
            .value=${this.searchQuery}
            @input=${this.onSearchInput}
          />
          ${this.renderVoiceButton("Dictate a recipe search",this.onVoiceSearch)}
        </div>
      </div>
      ${this.loading?o`<p class="muted">Searching…</p>`:p}
      ${!this.loading&&e&&!this.searchResults.length?o`<p class="muted">No recipes found.</p>`:p}
      ${this.searchResults.map(r=>o`
          <button class="result-row" @click=${()=>this.openRecipe(r)}>
            ${r.image?o`<img src=${this.imageUrl(r)} alt="" />`:o`<div class="thumb"></div>`}
            <span class="name">${r.name}</span>
          </button>
        `)}
      ${this.searchResults.length?o`<button class="see-all" @click=${()=>this.openSearchInApp()}>See all results in app →</button>`:p}
      ${i?o`
            <button class="ai-cta" @click=${()=>this.navigate(`${this.config.panel_path}?ai_prompt=${encodeURIComponent(e)}`)}>
              ✨ Generate "${e}" recipe with AI
            </button>
          `:p}
    `}render(){let e;switch(this.config.mode){case"mealplan":e=this.renderMealplan();break;case"random":e=this.renderRandom();break;case"random-finder":e=this.renderRandomFinder();break;case"ai-generate":e=this.renderAiGenerate();break;case"search":e=this.renderSearch();break}return o`
      <ha-card>
        ${this.renderHeader()}
        ${e}
        ${this.error?o`<p class="error">${this.error}</p>`:p}
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
    `}};m.styles=b`
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
    /* The mic sits inside the field; the padding keeps text clear of it. */
    .voice-wrap {
      position: relative;
      flex: 1;
      min-width: 0;
    }
    .voice-wrap input[type="text"] {
      padding-right: 46px;
    }
    .voice-wrap textarea {
      padding-right: 46px;
    }
    .voice-wrap mealie-voice-button {
      position: absolute;
      right: 6px;
    }
    .voice-wrap.single mealie-voice-button {
      top: 50%;
      transform: translateY(-50%);
    }
    .voice-wrap.multiline mealie-voice-button {
      top: 6px;
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
  `,c([g({attribute:!1})],m.prototype,"hass",2),c([u()],m.prototype,"config",2),c([u()],m.prototype,"panelConfig",2),c([u()],m.prototype,"loading",2),c([u()],m.prototype,"error",2),c([u()],m.prototype,"mealplanEntries",2),c([u()],m.prototype,"addFreeformDate",2),c([u()],m.prototype,"freeformText",2),c([u()],m.prototype,"freeformEntryType",2),c([u()],m.prototype,"freeformSaving",2),c([u()],m.prototype,"pendingDeleteEntry",2),c([u()],m.prototype,"randomRecipes",2),c([u()],m.prototype,"pickedRecipe",2),c([u()],m.prototype,"pickerMode",2),c([u()],m.prototype,"aiPrompt",2),c([u()],m.prototype,"voiceState",2),c([u()],m.prototype,"searchQuery",2),c([u()],m.prototype,"searchResults",2);var U=class extends v{setConfig(t){this._config=t}updateConfig(t){this._config&&(this._config={...this._config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0})))}render(){if(!this._config)return p;let t=this._config.mode;return o`
      <div class="row">
        <label>Mode</label>
        <select
          .value=${t}
          @change=${e=>this.updateConfig({mode:e.target.value})}
        >
          ${Object.entries(ue).map(([e,i])=>o`<option value=${e}>${Le[e]} ${i}</option>`)}
        </select>
      </div>

      <div class="row">
        <label>Title</label>
        <input
          type="text"
          placeholder=${ue[t]}
          .value=${this._config.title??""}
          @input=${e=>this.updateConfig({title:e.target.value})}
        />
        <span class="hint">Leave blank to use the default title for this mode.</span>
      </div>

      ${t==="random"?o`
            <div class="row">
              <label>Number of recipes</label>
              <input
                type="number"
                min="1"
                max="12"
                .value=${String(this._config.count??4)}
                @input=${e=>this.updateConfig({count:Number(e.target.value)||4})}
              />
            </div>
          `:p}
      ${t==="mealplan"?o`
            <div class="row">
              <label>Number of days</label>
              <input
                type="number"
                min="1"
                max="14"
                .value=${String(this._config.days??7)}
                @input=${e=>this.updateConfig({days:Number(e.target.value)||7})}
              />
              <span class="hint">Rolling window starting today.</span>
            </div>
            <div class="row checkbox-row">
              <label>
                <input
                  type="checkbox"
                  .checked=${this._config.show_thumbnails??!1}
                  @change=${e=>this.updateConfig({show_thumbnails:e.target.checked})}
                />
                Show recipe thumbnails
              </label>
            </div>
          `:p}
      ${t==="random"||t==="random-finder"?o`
            <div class="row">
              <label>Recipe pool</label>
              <select
                .value=${this._config.random_mode??"all"}
                @change=${e=>this.updateConfig({random_mode:e.target.value})}
              >
                ${Object.entries(Me).map(([e,i])=>o`<option value=${e}>${i}</option>`)}
              </select>
            </div>
          `:p}

      <div class="row checkbox-row">
        <label>
          <input
            type="checkbox"
            .checked=${this._config.overlay??!1}
            @change=${e=>this.updateConfig({overlay:e.target.checked})}
          />
          Open as overlay
        </label>
        <span class="hint"
          >When on, selecting a recipe (or generating/searching) opens the panel full-screen on top of the current
          dashboard instead of navigating away — a close button returns you to exactly where you were.</span
        >
      </div>

      <div class="row">
        <label>Panel path</label>
        <input
          type="text"
          placeholder="/mealie-recipes"
          .value=${this._config.panel_path??""}
          @input=${e=>this.updateConfig({panel_path:e.target.value})}
        />
        <span class="hint">Only needed if you've registered the panel under a different URL.</span>
      </div>
    `}};U.styles=b`
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
  `,c([g({attribute:!1})],U.prototype,"hass",2),c([u()],U.prototype,"_config",2);window.customCards=window.customCards||[];window.customCards.push({type:"mealie-dashboard-card",name:"Mealie Recipe Card",description:"Meal plan, random recipes, AI recipe generator, surprise-me picker, or recipe search \u2014 pick a mode in the card config. Selecting a recipe opens it in the full Mealie panel."});customElements.get("mealie-dashboard-card")||customElements.define("mealie-dashboard-card",m);customElements.get("mealie-dashboard-card-editor")||customElements.define("mealie-dashboard-card-editor",U);export{m as MealieDashboardCard,U as MealieDashboardCardEditor};
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
