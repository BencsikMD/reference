function createNode(text) {
    const node = document.createElement('pre');
    node.style.width = '1px';
    node.style.height = '1px';
    node.style.position = 'fixed';
    node.style.top = '5px';
    node.textContent = text;
    return node;
  }
  
  function copyNode(node) {
    if ('clipboard' in navigator) {
      // eslint-disable-next-line flowtype/no-flow-fix-me-comments
      // $FlowFixMe Clipboard is not defined in Flow yet.
      return navigator.clipboard.writeText(node.textContent);
    }
  
    const selection = getSelection();
  
    if (selection == null) {
      return Promise.reject(new Error());
    }
  
    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    return Promise.resolve();
  }
  function copyText(text) {
    if ('clipboard' in navigator) {
      // eslint-disable-next-line flowtype/no-flow-fix-me-comments
      // $FlowFixMe Clipboard is not defined in Flow yet.
      return navigator.clipboard.writeText(text);
    }
  
    const body = document.body;
  
    if (!body) {
      return Promise.reject(new Error());
    }
  
    const node = createNode(text);
    body.appendChild(node);
    copyNode(node);
    body.removeChild(node);
    return Promise.resolve();
  }
  
  function copy(button) {
    const id = button.getAttribute('for');
    const text = button.getAttribute('value');
  
    function trigger() {
      button.dispatchEvent(new CustomEvent('clipboard-copy', {
        bubbles: true
      }));
    }
  
    if (text) {
      copyText(text).then(trigger);
    } else if (id) {
      const root = 'getRootNode' in Element.prototype ? button.getRootNode() : button.ownerDocument;
      if (!(root instanceof Document || 'ShadowRoot' in window && root instanceof ShadowRoot)) return;
      const node = root.getElementById(id);
      if (node) copyTarget(node).then(trigger);
    }
  }
  
  function copyTarget(content) {
    if (content instanceof HTMLInputElement || content instanceof HTMLTextAreaElement) {
      return copyText(content.value);
    } else if (content instanceof HTMLAnchorElement && content.hasAttribute('href')) {
      return copyText(content.href);
    } else {
      return copyNode(content);
    }
  }
  
  function clicked(event) {
    const button = event.currentTarget;
  
    if (button instanceof HTMLElement) {
      copy(button);
    }
  }
  
  function keydown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      const button = event.currentTarget;
  
      if (button instanceof HTMLElement) {
        event.preventDefault();
        copy(button);
      }
    }
  }
  
  function focused(event) {
    event.currentTarget.addEventListener('keydown', keydown);
  }
  
  function blurred(event) {
    event.currentTarget.removeEventListener('keydown', keydown);
  }
  
  class ClipboardCopyElement extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('click', clicked);
      this.addEventListener('focus', focused);
      this.addEventListener('blur', blurred);
    }
  
    connectedCallback() {
      if (!this.hasAttribute('tabindex')) {
        this.setAttribute('tabindex', '0');
      }
  
      if (!this.hasAttribute('role')) {
        this.setAttribute('role', 'button');
      }
    }
  
    get value() {
      return this.getAttribute('value') || '';
    }
  
    set value(text) {
      this.setAttribute('value', text);
    }
  
  }
  
  if (!window.customElements.get('clipboard-copy')) {
    window.ClipboardCopyElement = ClipboardCopyElement;
    window.customElements.define('clipboard-copy', ClipboardCopyElement);
  }
  
  export default ClipboardCopyElement;
  













"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["vendors-node_modules_github_clipboard-copy-element_dist_index_esm_js-node_modules_delegated-e-b37f7d","vendors-node_modules_delegated-events_dist_index_js-node_modules_github_catalyst_lib_index_js-06ff530","vendors-node_modules_delegated-events_dist_index_js-node_modules_github_catalyst_lib_index_js-06ff531","vendors-node_modules_delegated-events_dist_index_js-node_modules_github_catalyst_lib_index_js-06ff532"],{76745(a,b,c){function d(a){if("clipboard"in navigator)return navigator.clipboard.writeText(a.textContent);let b=getSelection();if(null==b)return Promise.reject(Error());b.removeAllRanges();let c=document.createRange();return c.selectNodeContents(a),b.addRange(c),document.execCommand("copy"),b.removeAllRanges(),Promise.resolve()}function e(a){if("clipboard"in navigator)return navigator.clipboard.writeText(a);let b=document.body;if(!b)return Promise.reject(Error());let c=function(a){let b=document.createElement("pre");return b.style.width="1px",b.style.height="1px",b.style.position="fixed",b.style.top="5px",b.textContent=a,b}(a);return b.appendChild(c),d(c),b.removeChild(c),Promise.resolve()}function f(a){let b=a.getAttribute("for"),c=a.getAttribute("value");function d(){a.dispatchEvent(new CustomEvent("clipboard-copy",{bubbles:!0}))}if(c)e(c).then(d);else if(b){let f="getRootNode"in Element.prototype?a.getRootNode():a.ownerDocument;if(!(f instanceof Document||"ShadowRoot"in window&&f instanceof ShadowRoot))return;let h=f.getElementById(b);h&&g(h).then(d)}}function g(a){return a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement?e(a.value):a instanceof HTMLAnchorElement&&a.hasAttribute("href")?e(a.href):d(a)}function h(a){if(" "===a.key||"Enter"===a.key){let b=a.currentTarget;b instanceof HTMLElement&&(a.preventDefault(),f(b))}}c.d(b,{Z:()=>i});class ClipboardCopyElement extends HTMLElement{constructor(){super(),this.addEventListener("click",function(a){let b=a.currentTarget;b instanceof HTMLElement&&f(b)}),this.addEventListener("focus",function(a){a.currentTarget.addEventListener("keydown",h)}),this.addEventListener("blur",function(a){a.currentTarget.removeEventListener("keydown",h)})}connectedCallback(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.hasAttribute("role")||this.setAttribute("role","button")}get value(){return this.getAttribute("value")||""}set value(a){this.setAttribute("value",a)}}window.customElements.get("clipboard-copy")||(window.ClipboardCopyElement=ClipboardCopyElement,window.customElements.define("clipboard-copy",ClipboardCopyElement));let i=ClipboardCopyElement},59753(a,b,c){function d(){if(!(this instanceof d))return new d;this.size=0,this.uid=0,this.selectors=[],this.selectorObjects={},this.indexes=Object.create(this.indexes),this.activeIndexes=[]}c.d(b,{f:()=>B,on:()=>A});var e,f=window.document.documentElement,g=f.matches||f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector;d.prototype.matchesSelector=function(a,b){return g.call(a,b)},d.prototype.querySelectorAll=function(a,b){return b.querySelectorAll(a)},d.prototype.indexes=[];var h=/^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;d.prototype.indexes.push({name:"ID",selector:function(a){var b;if(b=a.match(h))return b[0].slice(1)},element:function(a){if(a.id)return[a.id]}});var i=/^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;d.prototype.indexes.push({name:"CLASS",selector:function(a){var b;if(b=a.match(i))return b[0].slice(1)},element:function(a){var b=a.className;if(b){if("string"==typeof b)return b.split(/\s/);if("object"==typeof b&&"baseVal"in b)return b.baseVal.split(/\s/)}}});var j=/^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;d.prototype.indexes.push({name:"TAG",selector:function(a){var b;if(b=a.match(j))return b[0].toUpperCase()},element:function(a){return[a.nodeName.toUpperCase()]}}),d.prototype.indexes.default={name:"UNIVERSAL",selector:function(){return!0},element:function(){return[!0]}},e="function"==typeof window.Map?window.Map:function(){function a(){this.map={}}return a.prototype.get=function(a){return this.map[a+" "]},a.prototype.set=function(a,b){this.map[a+" "]=b},a}();var k=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;function l(a,b){var c,d,e,f,g,h,i=(a=a.slice(0).concat(a.default)).length,j=b,l=[];do if(k.exec(""),(e=k.exec(j))&&(j=e[3],e[2]||!j)){for(c=0;c<i;c++)if(g=(h=a[c]).selector(e[1])){for(d=l.length,f=!1;d--;)if(l[d].index===h&&l[d].key===g){f=!0;break}f||l.push({index:h,key:g});break}}while(e)return l}function m(a,b){var c,d,e;for(c=0,d=a.length;c<d;c++)if(e=a[c],b.isPrototypeOf(e))return e}function n(a,b){return a.id-b.id}d.prototype.logDefaultIndexUsed=function(){},d.prototype.add=function(a,b){var c,d,f,g,h,i,j,k,n=this.activeIndexes,o=this.selectors,p=this.selectorObjects;if("string"==typeof a){for(d=0,p[(c={id:this.uid++,selector:a,data:b}).id]=c,j=l(this.indexes,a);d<j.length;d++)g=(k=j[d]).key,f=k.index,h=m(n,f),h||((h=Object.create(f)).map=new e,n.push(h)),f===this.indexes.default&&this.logDefaultIndexUsed(c),i=h.map.get(g),i||(i=[],h.map.set(g,i)),i.push(c);this.size++,o.push(a)}},d.prototype.remove=function(a,b){if("string"==typeof a){var c,d,e,f,g,h,i,j,k=this.activeIndexes,m=this.selectors=[],n=this.selectorObjects,o={},p=1===arguments.length;for(e=0,c=l(this.indexes,a);e<c.length;e++)for(d=c[e],f=k.length;f--;)if(h=k[f],d.index.isPrototypeOf(h)){if(i=h.map.get(d.key))for(g=i.length;g--;)(j=i[g]).selector===a&&(p||j.data===b)&&(i.splice(g,1),o[j.id]=!0);break}for(e in o)delete n[e],this.size--;for(e in n)m.push(n[e].selector)}},d.prototype.queryAll=function(a){if(!this.selectors.length)return[];var b,c,d,e,f,g,h,i,j={},k=[],l=this.querySelectorAll(this.selectors.join(", "),a);for(b=0,d=l.length;b<d;b++)for(c=0,f=l[b],e=(g=this.matches(f)).length;c<e;c++)j[(i=g[c]).id]?h=j[i.id]:(h={id:i.id,selector:i.selector,data:i.data,elements:[]},j[i.id]=h,k.push(h)),h.elements.push(f);return k.sort(n)},d.prototype.matches=function(a){if(!a)return[];var b,c,d,e,f,g,h,i,j,k,l,m=this.activeIndexes,o={},p=[];for(b=0,e=m.length;b<e;b++)if(i=(h=m[b]).element(a)){for(c=0,f=i.length;c<f;c++)if(j=h.map.get(i[c]))for(d=0,g=j.length;d<g;d++)!o[l=(k=j[d]).id]&&this.matchesSelector(a,k.selector)&&(o[l]=!0,p.push(k))}return p.sort(n)};var o={},p={},q=new WeakMap,r=new WeakMap,s=new WeakMap,t=Object.getOwnPropertyDescriptor(Event.prototype,"currentTarget");function u(a,b,c){var d=a[b];return a[b]=function(){return c.apply(a,arguments),d.apply(a,arguments)},a}function v(){q.set(this,!0)}function w(){q.set(this,!0),r.set(this,!0)}function x(){return s.get(this)||null}function y(a,b){t&&Object.defineProperty(a,"currentTarget",{configurable:!0,enumerable:!0,get:b||t.get})}function z(a){if(function(a){try{return a.eventPhase,!0}catch(b){return!1}}(a)){var b=(1===a.eventPhase?p:o)[a.type];if(b){var c=function(a,b,c){var d=[],e=b;do{if(1!==e.nodeType)break;var f=a.matches(e);if(f.length){var g={node:e,observers:f};c?d.unshift(g):d.push(g)}}while(e=e.parentElement)return d}(b,a.target,1===a.eventPhase);if(c.length){u(a,"stopPropagation",v),u(a,"stopImmediatePropagation",w),y(a,x);for(var d=0,e=c.length;d<e&&!q.get(a);d++){var f=c[d];s.set(a,f.node);for(var g=0,h=f.observers.length;g<h&&!r.get(a);g++)f.observers[g].data.call(f.node,a)}s.delete(a),y(a)}}}}function A(a,b,c){var e=arguments.length>3&& void 0!==arguments[3]?arguments[3]:{},f=!!e.capture,g=f?p:o,h=g[a];h||(h=new d,g[a]=h,document.addEventListener(a,z,f)),h.add(b,c)}function B(a,b,c){return a.dispatchEvent(new CustomEvent(b,{bubbles:!0,cancelable:!0,detail:c}))}},76006(a,b,c){c.d(b,{Lj:()=>p,Ih:()=>w,P4:()=>l,nW:()=>E,fA:()=>u,GO:()=>v});let d=new WeakSet;function e(a){h(a),g(a)}let f=new WeakMap;function g(a=document){if(f.has(a))return f.get(a);let b=!1,c=new MutationObserver(a=>{for(let b of a)if("attributes"===b.type&&b.target instanceof Element)k(b.target);else if("childList"===b.type&&b.addedNodes.length)for(let c of b.addedNodes)c instanceof Element&&h(c)});c.observe(a,{childList:!0,subtree:!0,attributeFilter:["data-action"]});let d={get closed(){return b},unsubscribe(){b=!0,f.delete(a),c.disconnect()}};return f.set(a,d),d}function h(a){for(let b of a.querySelectorAll("[data-action]"))k(b);a instanceof Element&&a.hasAttribute("data-action")&&k(a)}function i(a){let b=a.currentTarget;for(let c of j(b))if(a.type===c.type){let e=b.closest(c.tag);d.has(e)&&"function"==typeof e[c.method]&&e[c.method](a);let f=b.getRootNode();if(f instanceof ShadowRoot&&d.has(f.host)&&f.host.matches(c.tag)){let g=f.host;"function"==typeof g[c.method]&&g[c.method](a)}}}function*j(a){for(let b of(a.getAttribute("data-action")||"").trim().split(/\s+/)){let c=b.lastIndexOf(":"),d=Math.max(0,b.lastIndexOf("#"))||b.length;yield{type:b.slice(0,c),tag:b.slice(c+1,d),method:b.slice(d+1)||"handleEvent"}}}function k(a){for(let b of j(a))a.addEventListener(b.type,i)}function l(a,b){let c=a.tagName.toLowerCase();if(a.shadowRoot){for(let d of a.shadowRoot.querySelectorAll(`[data-target~="${c}.${b}"]`))if(!d.closest(c))return d}for(let e of a.querySelectorAll(`[data-target~="${c}.${b}"]`))if(e.closest(c)===a)return e}let m=a=>String("symbol"==typeof a?a.description:a).replace(/([A-Z]($|[a-z]))/g,"-$1").replace(/--/g,"-").replace(/^-|-$/,"").toLowerCase(),n=(a,b="property")=>{let c=m(a);if(!c.includes("-"))throw new DOMException(`${b}: ${String(a)} is not a valid ${b} name`,"SyntaxError");return c},o="attr";function p(a,b){t(a,o).add(b)}let q=new WeakSet;function r(a,b){if(q.has(a))return;q.add(a);let c=Object.getPrototypeOf(a),d=c?.constructor?.attrPrefix??"data-";for(let e of(b||(b=t(c,o)),b)){let f=a[e],g=n(`${d}${e}`),h={configurable:!0,get(){return this.getAttribute(g)||""},set(a){this.setAttribute(g,a||"")}};"number"==typeof f?h={configurable:!0,get(){return Number(this.getAttribute(g)||0)},set(a){this.setAttribute(g,a)}}:"boolean"==typeof f&&(h={configurable:!0,get(){return this.hasAttribute(g)},set(a){this.toggleAttribute(g,a)}}),Object.defineProperty(a,e,h),e in a&&!a.hasAttribute(g)&&h.set.call(a,f)}}let s=Symbol.for("catalyst");class CatalystDelegate{constructor(a){let b=this,c=a.prototype.connectedCallback;a.prototype.connectedCallback=function(){b.connectedCallback(this,c)};let d=a.prototype.disconnectedCallback;a.prototype.disconnectedCallback=function(){b.disconnectedCallback(this,d)};let e=a.prototype.attributeChangedCallback;a.prototype.attributeChangedCallback=function(a,c,d){b.attributeChangedCallback(this,a,c,d,e)};let f=a.observedAttributes||[];Object.defineProperty(a,"observedAttributes",{configurable:!0,get(){return b.observedAttributes(this,f)},set(a){f=a}}),function(a){let b=a.observedAttributes||[],c=a.attrPrefix??"data-",d=a=>n(`${c}${a}`);Object.defineProperty(a,"observedAttributes",{configurable:!0,get:()=>[...t(a.prototype,o)].map(d).concat(b),set(a){b=a}})}(a),function(a){let b=m(a.name).replace(/-element$/,"");try{window.customElements.define(b,a),window[a.name]=customElements.get(b)}catch(c){if(!(c instanceof DOMException&&"NotSupportedError"===c.name))throw c}}(a)}observedAttributes(a,b){return b}connectedCallback(a,b){var c;a.toggleAttribute("data-catalyst",!0),customElements.upgrade(a),function(a){for(let b of a.querySelectorAll("template[data-shadowroot]"))b.parentElement===a&&a.attachShadow({mode:"closed"===b.getAttribute("data-shadowroot")?"closed":"open"}).append(b.content.cloneNode(!0))}(a),r(a),c=a,d.add(c),c.shadowRoot&&e(c.shadowRoot),h(c),g(c.ownerDocument),b?.call(a),a.shadowRoot&&e(a.shadowRoot)}disconnectedCallback(a,b){b?.call(a)}attributeChangedCallback(a,b,c,d,e){r(a),"data-catalyst"!==b&&e&&e.call(a,b,c,d)}}function t(a,b){if(!Object.prototype.hasOwnProperty.call(a,s)){let c=a[s],d=a[s]=new Map;if(c)for(let[e,f]of c)d.set(e,new Set(f))}let g=a[s];return g.has(b)||g.set(b,new Set),g.get(b)}function u(a,b){t(a,"target").add(b),Object.defineProperty(a,b,{configurable:!0,get(){return l(this,b)}})}function v(a,b){t(a,"targets").add(b),Object.defineProperty(a,b,{configurable:!0,get(){return function(a,b){let c=a.tagName.toLowerCase(),d=[];if(a.shadowRoot)for(let e of a.shadowRoot.querySelectorAll(`[data-targets~="${c}.${b}"]`))e.closest(c)||d.push(e);for(let f of a.querySelectorAll(`[data-targets~="${c}.${b}"]`))f.closest(c)===a&&d.push(f);return d}(this,b)}})}function w(a){new CatalystDelegate(a)}let x=new Map,y=new Promise(a=>{"loading"!==document.readyState?a():document.addEventListener("readystatechange",()=>a(),{once:!0})}),z=new Promise(a=>{let b=new AbortController;b.signal.addEventListener("abort",()=>a());let c={once:!0,passive:!0,signal:b.signal},d=()=>b.abort();document.addEventListener("mousedown",d,c),document.addEventListener("touchstart",d,c),document.addEventListener("keydown",d,c),document.addEventListener("pointerdown",d,c)}),A={ready:()=>y,firstInteraction:()=>z,visible:a=>new Promise(b=>{let c=new IntersectionObserver(a=>{for(let d of a)if(d.isIntersecting){b(),c.disconnect();return}},{rootMargin:"0px 0px 256px 0px",threshold:.01});for(let d of document.querySelectorAll(a))c.observe(d)})},B=new WeakMap;function C(a){cancelAnimationFrame(B.get(a)||0),B.set(a,requestAnimationFrame(()=>{for(let b of x.keys()){let c=a.matches(b)?a:a.querySelector(b);if(customElements.get(b)||c){let d=c?.getAttribute("data-load-on")||"ready",e=d in A?A[d]:A.ready;for(let f of x.get(b)||[])e(b).then(f);x.delete(b),B.delete(a)}}}))}let D;function E(a,b){x.has(a)||x.set(a,new Set),x.get(a).add(b),C(document.body),D||(D=new MutationObserver(a=>{if(x.size)for(let b of a)for(let c of b.addedNodes)c instanceof Element&&C(c)})).observe(document,{subtree:!0,childList:!0})}},11793(a,b,c){c.d(b,{EL:()=>e,N9:()=>o,Tz:()=>p});class Leaf{constructor(a){this.children=[],this.parent=a}delete(a){let b=this.children.indexOf(a);return -1!==b&&(this.children=this.children.slice(0,b).concat(this.children.slice(b+1)),0===this.children.length&&this.parent.delete(this),!0)}add(a){return this.children.push(a),this}}class RadixTrie{constructor(a){this.parent=null,this.children={},this.parent=a||null}get(a){return this.children[a]}insert(a){let b=this;for(let c=0;c<a.length;c+=1){let d=a[c],e=b.get(d);if(c===a.length-1)return e instanceof RadixTrie&&(b.delete(e),e=null),e||(e=new Leaf(b),b.children[d]=e),e;e instanceof Leaf&&(e=null),e||(e=new RadixTrie(b),b.children[d]=e),b=e}return b}delete(a){for(let b in this.children){let c=this.children[b];if(c===a){let d=delete this.children[b];return 0===Object.keys(this.children).length&&this.parent&&this.parent.delete(this),d}}return!1}}function d(a){if(!(a instanceof HTMLElement))return!1;let b=a.nodeName.toLowerCase(),c=(a.getAttribute("type")||"").toLowerCase();return"select"===b||"textarea"===b||"input"===b&&"submit"!==c&&"reset"!==c&&"checkbox"!==c&&"radio"!==c&&"file"!==c||a.isContentEditable}function e(a){let{ctrlKey:b,altKey:c,metaKey:d,key:e}=a,h=[],i=[b,c,d,g(a)];for(let[j,k]of i.entries())k&&h.push(f[j]);return f.includes(e)||h.push(e),h.join("+")}let f=["Control","Alt","Meta","Shift"];function g(a){let{shiftKey:b,code:c,key:d}=a;return b&&!(c.startsWith("Key")&&d.toUpperCase()===d)}let h=new RadixTrie,i=new WeakMap,j=h,k=null,l=[];function m(){l=[],k=null,j=h}function n(a){if(a.defaultPrevented||!(a.target instanceof Node))return;if(d(a.target)){let b=a.target;if(!b.id||!b.ownerDocument.querySelector(`[data-hotkey-scope="${b.id}"]`))return}null!=k&&window.clearTimeout(k),k=window.setTimeout(m,1500);let c=j.get(e(a));if(!c){m();return}if(l.push(e(a)),j=c,c instanceof Leaf){let f=a.target,g=!1,h,i=d(f);for(let n=c.children.length-1;n>=0;n-=1){h=c.children[n];let o=h.getAttribute("data-hotkey-scope");if(!i&&!o||i&&f.id===o){g=!0;break}}h&&g&&(function(a,b){let c=new CustomEvent("hotkey-fire",{cancelable:!0,detail:{path:b}}),e=!a.dispatchEvent(c);e||(d(a)?a.focus():a.click())}(h,l),a.preventDefault()),m()}}function o(a,b){0===Object.keys(h.children).length&&document.addEventListener("keydown",n);let c=function(a){let b=[],c=[""],d=!1;for(let e=0;e<a.length;e++){if(d&&","===a[e]){b.push(c),c=[""],d=!1;continue}if(" "===a[e]){c.push(""),d=!1;continue}d="+"!==a[e],c[c.length-1]+=a[e]}return b.push(c),b.map(a=>a.filter(a=>""!==a)).filter(a=>a.length>0)}(b||a.getAttribute("data-hotkey")||""),d=c.map(b=>h.insert(b).add(a));i.set(a,d)}function p(a){let b=i.get(a);if(b&&b.length)for(let c of b)c&&c.delete(a);0===Object.keys(h.children).length&&document.removeEventListener("keydown",n)}}}])
//# sourceMappingURL=vendors-node_modules_github_clipboard-copy-element_dist_index_esm_js-node_modules_delegated-e-b37f7d-9ec64f368bd2.js.map


"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["vendors-node_modules_github_clipboard-copy-element_dist_index_esm_js-node_modules_github_remo-8e6bec"],{76745(a,b,c){function d(a){if("clipboard"in navigator)return navigator.clipboard.writeText(a.textContent);let b=getSelection();if(null==b)return Promise.reject(Error());b.removeAllRanges();let c=document.createRange();return c.selectNodeContents(a),b.addRange(c),document.execCommand("copy"),b.removeAllRanges(),Promise.resolve()}function e(a){if("clipboard"in navigator)return navigator.clipboard.writeText(a);let b=document.body;if(!b)return Promise.reject(Error());let c=function(a){let b=document.createElement("pre");return b.style.width="1px",b.style.height="1px",b.style.position="fixed",b.style.top="5px",b.textContent=a,b}(a);return b.appendChild(c),d(c),b.removeChild(c),Promise.resolve()}function f(a){let b=a.getAttribute("for"),c=a.getAttribute("value");function d(){a.dispatchEvent(new CustomEvent("clipboard-copy",{bubbles:!0}))}if(c)e(c).then(d);else if(b){let f="getRootNode"in Element.prototype?a.getRootNode():a.ownerDocument;if(!(f instanceof Document||"ShadowRoot"in window&&f instanceof ShadowRoot))return;let h=f.getElementById(b);h&&g(h).then(d)}}function g(a){return a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement?e(a.value):a instanceof HTMLAnchorElement&&a.hasAttribute("href")?e(a.href):d(a)}function h(a){if(" "===a.key||"Enter"===a.key){let b=a.currentTarget;b instanceof HTMLElement&&(a.preventDefault(),f(b))}}c.d(b,{Z:()=>i});class ClipboardCopyElement extends HTMLElement{constructor(){super(),this.addEventListener("click",function(a){let b=a.currentTarget;b instanceof HTMLElement&&f(b)}),this.addEventListener("focus",function(a){a.currentTarget.addEventListener("keydown",h)}),this.addEventListener("blur",function(a){a.currentTarget.removeEventListener("keydown",h)})}connectedCallback(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.hasAttribute("role")||this.setAttribute("role","button")}get value(){return this.getAttribute("value")||""}set value(a){this.setAttribute("value",a)}}window.customElements.get("clipboard-copy")||(window.ClipboardCopyElement=ClipboardCopyElement,window.customElements.define("clipboard-copy",ClipboardCopyElement));let i=ClipboardCopyElement},65935(a,b,c){c.d(b,{AC:()=>j,rK:()=>i,uT:()=>h});class ErrorWithResponse extends Error{constructor(a,b){super(a),this.response=b}}function d(){let a,b,c=new Promise(function(c,d){a=c,b=d});return[c,a,b]}let e,f=[],g=[];function h(a){f.push(a)}function i(a){g.push(a)}function j(a,b){e||(e=new Map,document.addEventListener("submit",k));let c=e.get(a)||[];e.set(a,[...c,b])}function k(a){if(!(a.target instanceof HTMLFormElement)||a.defaultPrevented)return;let b=a.target,c=function(a){let b=[];for(let c of e.keys())if(a.matches(c)){let d=e.get(c)||[];b.push(...d)}return b}(b);if(0===c.length)return;let h=m(b),[i,j,k]=d();a.preventDefault(),l(c,b,h,i).then(async a=>{if(a){for(let c of g)await c(b);n(h).then(j,k).catch(()=>{}).then(()=>{for(let a of f)a(b)})}else b.submit()},a=>{b.submit(),setTimeout(()=>{throw a})})}async function l(a,b,c,e){let f=!1;for(let g of a){let[h,i]=d(),j=()=>(f=!0,i(),e),k={text:j,json:()=>(c.headers.set("Accept","application/json"),j()),html:()=>(c.headers.set("Accept","text/html"),j())};await Promise.race([h,g(b,k,c)])}return f}function m(a){let b={method:a.method||"GET",url:a.action,headers:new Headers({"X-Requested-With":"XMLHttpRequest"}),body:null};if("GET"===b.method.toUpperCase()){let c=function(a){let b=new URLSearchParams,c=new FormData(a).entries();for(let[d,e]of[...c])b.append(d,e.toString());return b.toString()}(a);c&&(b.url+=(~b.url.indexOf("?")?"&":"?")+c)}else b.body=new FormData(a);return b}async function n(a){let b=await window.fetch(a.url,{method:a.method,body:null!==a.body?a.body:void 0,headers:a.headers,credentials:"same-origin"}),c={url:b.url,status:b.status,statusText:b.statusText,headers:b.headers,text:"",get json(){let d=this,e=JSON.parse(d.text);return delete d.json,d.json=e,d.json},get html(){let f=this;return delete f.html,f.html=function(a,b){let c=a.createElement("template");return c.innerHTML=b,a.importNode(c.content,!0)}(document,f.text),f.html}},g=await b.text();if(c.text=g,b.ok)return c;throw new ErrorWithResponse("request failed",c)}},11793(a,b,c){c.d(b,{EL:()=>e,N9:()=>o,Tz:()=>p});class Leaf{constructor(a){this.children=[],this.parent=a}delete(a){let b=this.children.indexOf(a);return -1!==b&&(this.children=this.children.slice(0,b).concat(this.children.slice(b+1)),0===this.children.length&&this.parent.delete(this),!0)}add(a){return this.children.push(a),this}}class RadixTrie{constructor(a){this.parent=null,this.children={},this.parent=a||null}get(a){return this.children[a]}insert(a){let b=this;for(let c=0;c<a.length;c+=1){let d=a[c],e=b.get(d);if(c===a.length-1)return e instanceof RadixTrie&&(b.delete(e),e=null),e||(e=new Leaf(b),b.children[d]=e),e;e instanceof Leaf&&(e=null),e||(e=new RadixTrie(b),b.children[d]=e),b=e}return b}delete(a){for(let b in this.children){let c=this.children[b];if(c===a){let d=delete this.children[b];return 0===Object.keys(this.children).length&&this.parent&&this.parent.delete(this),d}}return!1}}function d(a){if(!(a instanceof HTMLElement))return!1;let b=a.nodeName.toLowerCase(),c=(a.getAttribute("type")||"").toLowerCase();return"select"===b||"textarea"===b||"input"===b&&"submit"!==c&&"reset"!==c&&"checkbox"!==c&&"radio"!==c&&"file"!==c||a.isContentEditable}function e(a){let{ctrlKey:b,altKey:c,metaKey:d,key:e}=a,h=[],i=[b,c,d,g(a)];for(let[j,k]of i.entries())k&&h.push(f[j]);return f.includes(e)||h.push(e),h.join("+")}let f=["Control","Alt","Meta","Shift"];function g(a){let{shiftKey:b,code:c,key:d}=a;return b&&!(c.startsWith("Key")&&d.toUpperCase()===d)}let h=new RadixTrie,i=new WeakMap,j=h,k=null,l=[];function m(){l=[],k=null,j=h}function n(a){if(a.defaultPrevented||!(a.target instanceof Node))return;if(d(a.target)){let b=a.target;if(!b.id||!b.ownerDocument.querySelector(`[data-hotkey-scope="${b.id}"]`))return}null!=k&&window.clearTimeout(k),k=window.setTimeout(m,1500);let c=j.get(e(a));if(!c){m();return}if(l.push(e(a)),j=c,c instanceof Leaf){let f=a.target,g=!1,h,i=d(f);for(let n=c.children.length-1;n>=0;n-=1){h=c.children[n];let o=h.getAttribute("data-hotkey-scope");if(!i&&!o||i&&f.id===o){g=!0;break}}h&&g&&(function(a,b){let c=new CustomEvent("hotkey-fire",{cancelable:!0,detail:{path:b}}),e=!a.dispatchEvent(c);e||(d(a)?a.focus():a.click())}(h,l),a.preventDefault()),m()}}function o(a,b){0===Object.keys(h.children).length&&document.addEventListener("keydown",n);let c=function(a){let b=[],c=[""],d=!1;for(let e=0;e<a.length;e++){if(d&&","===a[e]){b.push(c),c=[""],d=!1;continue}if(" "===a[e]){c.push(""),d=!1;continue}d="+"!==a[e],c[c.length-1]+=a[e]}return b.push(c),b.map(a=>a.filter(a=>""!==a)).filter(a=>a.length>0)}(b||a.getAttribute("data-hotkey")||""),d=c.map(b=>h.insert(b).add(a));i.set(a,d)}function p(a){let b=i.get(a);if(b&&b.length)for(let c of b)c&&c.delete(a);0===Object.keys(h.children).length&&document.removeEventListener("keydown",n)}},86058(a,b,c){c.d(b,{R:()=>AnalyticsClient});var d=c(82918);class AnalyticsClient{constructor(a){this.options=a}get collectorUrl(){return this.options.collectorUrl}get clientId(){return this.options.clientId?this.options.clientId:(0,d.b)()}createEvent(a){return{page:location.href,title:document.title,context:{...this.options.baseContext,...a}}}sendPageView(a){let b=this.createEvent(a);this.send({page_views:[b]})}sendEvent(a,b){let c={...this.createEvent(b),type:a};this.send({events:[c]})}send({page_views:a,events:b}){let c={client_id:this.clientId,page_views:a,events:b,request_context:{referrer:function(){let a;try{a=window.top.document.referrer}catch(b){if(window.parent)try{a=window.parent.document.referrer}catch(c){}}return""===a&&(a=document.referrer),a}(),user_agent:navigator.userAgent,screen_resolution:function(){try{return`${screen.width}x${screen.height}`}catch(a){return"unknown"}}(),browser_resolution:function(){let a=0,b=0;try{return"number"==typeof window.innerWidth?(b=window.innerWidth,a=window.innerHeight):null!=document.documentElement&&null!=document.documentElement.clientWidth?(b=document.documentElement.clientWidth,a=document.documentElement.clientHeight):null!=document.body&&null!=document.body.clientWidth&&(b=document.body.clientWidth,a=document.body.clientHeight),`${b}x${a}`}catch(c){return"unknown"}}(),browser_languages:navigator.languages?navigator.languages.join(","):navigator.language||"",pixel_ratio:window.devicePixelRatio,timestamp:Date.now(),tz_seconds:-60*new Date().getTimezoneOffset()}},d=JSON.stringify(c);try{if(navigator.sendBeacon){navigator.sendBeacon(this.collectorUrl,d);return}}catch{}fetch(this.collectorUrl,{method:"POST",cache:"no-cache",headers:{"Content-Type":"application/json"},body:d,keepalive:!1})}}},82918(a,b,c){c.d(b,{b:()=>f});let d;function e(){return`${Math.round(2147483647*Math.random())}.${Math.round(Date.now()/1e3)}`}function f(){try{let a=function(){let a,b=document.cookie,c=b.match(/_octo=([^;]+)/g);if(!c)return;let d=[0,0];for(let e of c){let[,f]=e.split("="),[,g,...h]=f.split("."),i=g.split("-").map(Number);i>d&&(d=i,a=h.join("."))}return a}();if(a)return a;let b=e();return!function(a){let b=`GH1.1.${a}`,c=Date.now(),d=new Date(c+31536e6).toUTCString(),{domain:e}=document;e.endsWith(".github.com")&&(e="github.com"),document.cookie=`_octo=${b}; expires=${d}; path=/; domain=${e}; secure; samesite=lax`}(b),b}catch(c){return d||(d=e()),d}}},88149(a,b,c){c.d(b,{n:()=>d});function d(a="ha"){let b,c={},d=document.head.querySelectorAll(`meta[name^="${a}-"]`);for(let e of Array.from(d)){let{name:f,content:g}=e,h=f.replace(`${a}-`,"").replace(/-/g,"_");"url"===h?b=g:c[h]=g}if(!b)throw Error(`AnalyticsClient ${a}-url meta tag not found`);return{collectorUrl:b,...Object.keys(c).length>0?{baseContext:c}:{}}}}}])
//# sourceMappingURL=vendors-node_modules_github_clipboard-copy-element_dist_index_esm_js-node_modules_github_remo-8e6bec-5359c08bcdf9.js.map