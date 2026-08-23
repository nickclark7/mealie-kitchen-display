var bt=Object.defineProperty;var Et=Object.getOwnPropertyDescriptor;var g=(r,t,e,s)=>{for(var i=s>1?void 0:s?Et(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&bt(t,e,i),i};var q=globalThis,z=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),rt=new WeakMap,U=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(z&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=rt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&rt.set(e,t))}return t}toString(){return this.cssText}},ot=r=>new U(typeof r=="string"?r:r+"",void 0,V),H=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new U(e,r,V)},nt=(r,t)=>{if(z)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=q.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},K=z?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ot(e)})(r):r;var{is:xt,defineProperty:St,getOwnPropertyDescriptor:wt,getOwnPropertyNames:Ct,getOwnPropertySymbols:Pt,getPrototypeOf:Ut}=Object,D=globalThis,at=D.trustedTypes,Ht=at?at.emptyScript:"",Rt=D.reactiveElementPolyfillSupport,R=(r,t)=>r,T={toAttribute(r,t){switch(t){case Boolean:r=r?Ht:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},B=(r,t)=>!xt(r,t),lt={attribute:!0,type:String,converter:T,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&St(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=wt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let l=i?.call(this);o?.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let t=Ut(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let e=this.properties,s=[...Ct(e),...Pt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(K(i))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:T).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:T;this._$Em=i;let l=n.fromAttribute(e,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let n=this.constructor;if(i===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??B)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:n}=o,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[R("elementProperties")]=new Map,f[R("finalized")]=new Map,Rt?.({ReactiveElement:f}),(D.reactiveElementVersions??=[]).push("2.1.2");var tt=globalThis,ht=r=>r,I=tt.trustedTypes,ct=I?I.createPolicy("lit-html",{createHTML:r=>r}):void 0,$t="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+_,Tt=`<${gt}>`,b=document,k=()=>b.createComment(""),N=r=>r===null||typeof r!="object"&&typeof r!="function",et=Array.isArray,Ot=r=>et(r)||typeof r?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,dt=/>/g,v=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ut=/'/g,mt=/"/g,_t=/^(?:script|style|textarea|title)$/i,st=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),x=st(1),Jt=st(2),Wt=st(3),E=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ft=new WeakMap,A=b.createTreeWalker(b,129);function yt(r,t){if(!et(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}var kt=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=O;for(let l=0;l<e;l++){let a=r[l],c,d,h=-1,m=0;for(;m<a.length&&(n.lastIndex=m,d=n.exec(a),d!==null);)m=n.lastIndex,n===O?d[1]==="!--"?n=pt:d[1]!==void 0?n=dt:d[2]!==void 0?(_t.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=v):d[3]!==void 0&&(n=v):n===v?d[0]===">"?(n=i??O,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,c=d[1],n=d[3]===void 0?v:d[3]==='"'?mt:ut):n===mt||n===ut?n=v:n===pt||n===dt?n=O:(n=v,i=void 0);let $=n===v&&r[l+1].startsWith("/>")?" ":"";o+=n===O?a+Tt:h>=0?(s.push(c),a.slice(0,h)+$t+a.slice(h)+_+$):a+_+(h===-2?l:$)}return[yt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},M=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,l=t.length-1,a=this.parts,[c,d]=kt(t,e);if(this.el=r.createElement(c,s),A.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=A.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith($t)){let m=d[n++],$=i.getAttribute(h).split(_),L=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:L[2],strings:$,ctor:L[1]==="."?Z:L[1]==="?"?Q:L[1]==="@"?X:C}),i.removeAttribute(h)}else h.startsWith(_)&&(a.push({type:6,index:o}),i.removeAttribute(h));if(_t.test(i.tagName)){let h=i.textContent.split(_),m=h.length-1;if(m>0){i.textContent=I?I.emptyScript:"";for(let $=0;$<m;$++)i.append(h[$],k()),A.nextNode(),a.push({type:2,index:++o});i.append(h[m],k())}}}else if(i.nodeType===8)if(i.data===gt)a.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(_,h+1))!==-1;)a.push({type:7,index:o}),h+=_.length-1}o++}}static createElement(t,e){let s=b.createElement("template");return s.innerHTML=t,s}};function w(r,t,e=r,s){if(t===E)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=N(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=w(r,i._$AS(r,t.values),i,s)),t}var G=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??b).importNode(e,!0);A.currentNode=i;let o=A.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new j(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new Y(o,this,t)),this._$AV.push(c),a=s[++l]}n!==a?.index&&(o=A.nextNode(),n++)}return A.currentNode=b,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},j=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),N(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ot(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=M.createElement(yt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new G(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new M(t)),e}k(t){et(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new r(this.O(k()),this.O(k()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ht(t).nextSibling;ht(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=w(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==E,n&&(this._$AH=t);else{let l=t,a,c;for(t=o[0],a=0;a<o.length-1;a++)c=w(this,l[s+a],e,a),c===E&&(c=this._$AH[a]),n||=!N(c)||c!==this._$AH[a],c===p?t=p:t!==p&&(t+=(c??"")+o[a+1]),this._$AH[a]=c}n&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Z=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},Q=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},X=class extends C{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??p)===E)return;let s=this._$AH,i=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==p&&(s===p||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Y=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}};var Nt=tt.litHtmlPolyfillSupport;Nt?.(M,j),(tt.litHtmlVersions??=[]).push("3.3.3");var vt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new j(t.insertBefore(k(),o),o,void 0,e??{})}return i._$AI(r),i};var it=globalThis,u=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};u._$litElement$=!0,u.finalized=!0,it.litElementHydrateSupport?.({LitElement:u});var Mt=it.litElementPolyfillSupport;Mt?.({LitElement:u});(it.litElementVersions??=[]).push("4.2.2");var At=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var jt={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:B},Lt=(r=jt,t,e)=>{let{kind:s,metadata:i}=e,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(e.name,r),s==="accessor"){let{name:n}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,r,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,r,l),l}}}if(s==="setter"){let{name:n}=e;return function(l){let a=this[n];t.call(this,l),this.requestUpdate(n,a,r,!0,l)}}throw Error("Unsupported decorator location: "+s)};function S(r){return(t,e)=>typeof e=="object"?Lt(r,t,e):((s,i,o)=>{let n=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(r,t,e)}function J(r){return S({...r,state:!0,attribute:!1})}var y=class extends u{constructor(){super(...arguments);this.panelJsUrl="";this.error=null}connectedCallback(){super.connectedCallback(),this.loadPanel()}async loadPanel(){try{await import(this.panelJsUrl);let e=document.createElement("mealie-recipe-panel");e.hass=this.hass,e.narrow=window.innerWidth<870,e.style.display="block",e.style.height="100%",this.panelEl=e,this.requestUpdate()}catch(e){this.error=e instanceof Error?e.message:String(e)}}updated(){this.panelEl&&(this.panelEl.hass=this.hass)}close(){this.dispatchEvent(new CustomEvent("overlay-close",{bubbles:!0,composed:!0}))}render(){return x`
      <div class="bar">
        <button class="close" aria-label="Close" @click=${()=>this.close()}>✕</button>
      </div>
      ${this.error?x`<div class="status error">Couldn't load the recipe panel: ${this.error}</div>`:this.panelEl?x`<div class="panel-host">${this.panelEl}</div>`:x`<div class="status">Loading…</div>`}
    `}};y.styles=H`
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
  `,g([S({attribute:!1})],y.prototype,"hass",2),g([S({attribute:!1})],y.prototype,"panelJsUrl",2),g([J()],y.prototype,"error",2),y=g([At("mealie-launcher-overlay")],y);var P=class extends u{constructor(){super(...arguments);this.config={type:"custom:mealie-launcher-card"};this.overlayJsUrl=null}setConfig(e){this.config={panel_path:"/mealie-recipes",title:"Recipes",overlay:!1,...e}}getCardSize(){return 2}onClick(){if(this.config.overlay){this.openOverlay();return}let e=this.config.panel_path??"/mealie-recipes";history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0}))}async openOverlay(){if(!this.hass)return;if(!this.overlayJsUrl){let s=await this.hass.callApi("GET","mealie_recipe_panel/panel-asset-url");this.overlayJsUrl=s.url}let e=document.createElement("mealie-launcher-overlay");e.hass=this.hass,e.panelJsUrl=this.overlayJsUrl,e.addEventListener("overlay-close",()=>e.remove(),{once:!0}),document.body.appendChild(e)}render(){return x`
      <ha-card @click=${this.onClick}>
        <span class="icon">🍲</span>
        <span class="title">${this.config.title}</span>
      </ha-card>
    `}};P.styles=H`
    ha-card {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      min-height: 48px;
    }
    ha-card:active {
      opacity: 0.8;
    }
    .icon {
      font-size: 32px;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
    }
  `,g([S({attribute:!1})],P.prototype,"hass",2),g([J()],P.prototype,"config",2);window.customCards=window.customCards||[];window.customCards.push({type:"mealie-launcher-card",name:"Mealie Recipe Launcher",description:"Launches the full-screen Mealie recipe browser panel."});customElements.get("mealie-launcher-card")||customElements.define("mealie-launcher-card",P);export{P as MealieLauncherCard};
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
