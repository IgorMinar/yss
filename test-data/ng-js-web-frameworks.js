function getClosureSafeProperty(objWithPropertyToExtract) {
  for (let key in objWithPropertyToExtract)
    if (objWithPropertyToExtract[key] === getClosureSafeProperty) return key;
  throw Error('Could not find renamed property on target object.');
}
function stringify(token) {
  if ('string' == typeof token) return token;
  if (Array.isArray(token)) return '[' + token.map(stringify).join(', ') + ']';
  if (null == token) return '' + token;
  if (token.overriddenName) return `${token.overriddenName}`;
  if (token.name) return `${token.name}`;
  const res = token.toString();
  if (null == res) return '' + res;
  const newLineIndex = res.indexOf('\n');
  return -1 === newLineIndex ? res : res.substring(0, newLineIndex);
}
function concatStringsWithSpace(before, after) {
  return null == before || '' === before
    ? null === after
      ? ''
      : after
    : null == after || '' === after
    ? before
    : before + ' ' + after;
}
const __forward_ref__ = getClosureSafeProperty({
  __forward_ref__: getClosureSafeProperty,
});
function forwardRef(forwardRefFn) {
  return (
    (forwardRefFn.__forward_ref__ = forwardRef),
    (forwardRefFn.toString = function () {
      return stringify(this());
    }),
    forwardRefFn
  );
}
function resolveForwardRef(type) {
  return 'function' == typeof (fn = type) &&
    fn.hasOwnProperty(__forward_ref__) &&
    fn.__forward_ref__ === forwardRef
    ? type()
    : type;
  var fn;
  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
}

function ɵɵdefineInjectable(opts) {
  return {
    token: opts.token,
    providedIn: opts.providedIn || null,
    factory: opts.factory,
    value: void 0,
  };
}
function ɵɵdefineInjector(options) {
  return {
    factory: options.factory,
    providers: options.providers || [],
    imports: options.imports || [],
  };
}
function getInjectableDef(type) {
  return getOwnDefinition(type, NG_PROV_DEF) || getOwnDefinition(type, NG_INJECTABLE_DEF);
}
function getOwnDefinition(type, field) {
  return type.hasOwnProperty(field) ? type[field] : null;
}
function getInjectorDef(type) {
  return type && (type.hasOwnProperty(NG_INJ_DEF) || type.hasOwnProperty(NG_INJECTOR_DEF))
    ? type[NG_INJ_DEF]
    : null;
}
const NG_PROV_DEF = getClosureSafeProperty({
    ɵprov: getClosureSafeProperty,
  }),
  NG_INJ_DEF = getClosureSafeProperty({
    ɵinj: getClosureSafeProperty,
  }),
  NG_INJECTABLE_DEF = getClosureSafeProperty({
    ngInjectableDef: getClosureSafeProperty,
  }),
  NG_INJECTOR_DEF = getClosureSafeProperty({
    ngInjectorDef: getClosureSafeProperty,
  });

var InjectFlags = (function (InjectFlags) {
  return (
    (InjectFlags[(InjectFlags.Default = 0)] = 'Default'),
    (InjectFlags[(InjectFlags.Host = 1)] = 'Host'),
    (InjectFlags[(InjectFlags.Self = 2)] = 'Self'),
    (InjectFlags[(InjectFlags.SkipSelf = 4)] = 'SkipSelf'),
    (InjectFlags[(InjectFlags.Optional = 8)] = 'Optional'),
    InjectFlags
  );
})({});
let _injectImplementation;
function setInjectImplementation(impl) {
  const previous = _injectImplementation;
  return (_injectImplementation = impl), previous;
}
function injectRootLimpMode(token, notFoundValue, flags) {
  const injectableDef = getInjectableDef(token);
  if (injectableDef && 'root' == injectableDef.providedIn)
    return void 0 === injectableDef.value
      ? (injectableDef.value = injectableDef.factory())
      : injectableDef.value;
  if (flags & InjectFlags.Optional) return null;
  if (void 0 !== notFoundValue) return notFoundValue;
  throw new Error(`Injector: NOT_FOUND [${stringify(token)}]`);
}

function noSideEffects(fn) {
  return {
    toString: fn,
  }.toString();
}
var ChangeDetectionStrategy = (function (ChangeDetectionStrategy) {
    return (
      (ChangeDetectionStrategy[(ChangeDetectionStrategy.OnPush = 0)] = 'OnPush'),
      (ChangeDetectionStrategy[(ChangeDetectionStrategy.Default = 1)] = 'Default'),
      ChangeDetectionStrategy
    );
  })({}),
  ViewEncapsulation = (function (ViewEncapsulation) {
    return (
      (ViewEncapsulation[(ViewEncapsulation.Emulated = 0)] = 'Emulated'),
      (ViewEncapsulation[(ViewEncapsulation.None = 2)] = 'None'),
      (ViewEncapsulation[(ViewEncapsulation.ShadowDom = 3)] = 'ShadowDom'),
      ViewEncapsulation
    );
  })({});

const __globalThis = 'undefined' != typeof globalThis && globalThis,
  __window = 'undefined' != typeof window && window,
  __self =
    'undefined' != typeof self &&
    'undefined' != typeof WorkerGlobalScope &&
    self instanceof WorkerGlobalScope &&
    self,
  __global = 'undefined' != typeof global && global,
  _global = __globalThis || __global || __window || __self,
  EMPTY_OBJ = {},
  EMPTY_ARRAY = [],
  NG_COMP_DEF = getClosureSafeProperty({
    ɵcmp: getClosureSafeProperty,
  }),
  NG_DIR_DEF = getClosureSafeProperty({
    ɵdir: getClosureSafeProperty,
  }),
  NG_PIPE_DEF = getClosureSafeProperty({
    ɵpipe: getClosureSafeProperty,
  }),
  NG_MOD_DEF = getClosureSafeProperty({
    ɵmod: getClosureSafeProperty,
  }),
  NG_LOC_ID_DEF = getClosureSafeProperty({
    ɵloc: getClosureSafeProperty,
  }),
  NG_FACTORY_DEF = getClosureSafeProperty({
    ɵfac: getClosureSafeProperty,
  }),
  NG_ELEMENT_ID = getClosureSafeProperty({
    __NG_ELEMENT_ID__: getClosureSafeProperty,
  });

let _renderCompCount = 0;
function ɵɵdefineComponent(componentDefinition) {
  return noSideEffects(() => {
    const declaredInputs = {},
      def = {
        type: componentDefinition.type,
        providersResolver: null,
        decls: componentDefinition.decls,
        vars: componentDefinition.vars,
        factory: null,
        template: componentDefinition.template || null,
        consts: componentDefinition.consts || null,
        ngContentSelectors: componentDefinition.ngContentSelectors,
        hostBindings: componentDefinition.hostBindings || null,
        hostVars: componentDefinition.hostVars || 0,
        hostAttrs: componentDefinition.hostAttrs || null,
        contentQueries: componentDefinition.contentQueries || null,
        declaredInputs: declaredInputs,
        inputs: null,
        outputs: null,
        exportAs: componentDefinition.exportAs || null,
        onPush: componentDefinition.changeDetection === ChangeDetectionStrategy.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        selectors: componentDefinition.selectors || EMPTY_ARRAY,
        viewQuery: componentDefinition.viewQuery || null,
        features: componentDefinition.features || null,
        data: componentDefinition.data || {},
        encapsulation: componentDefinition.encapsulation || ViewEncapsulation.Emulated,
        id: 'c',
        styles: componentDefinition.styles || EMPTY_ARRAY,
        _: null,
        setInput: null,
        schemas: componentDefinition.schemas || null,
        tView: null,
      },
      directiveTypes = componentDefinition.directives,
      feature = componentDefinition.features,
      pipeTypes = componentDefinition.pipes;
    return (
      (def.id += _renderCompCount++),
      (def.inputs = invertObject(componentDefinition.inputs, declaredInputs)),
      (def.outputs = invertObject(componentDefinition.outputs)),
      feature && feature.forEach((fn) => fn(def)),
      (def.directiveDefs = directiveTypes
        ? () =>
            ('function' == typeof directiveTypes ? directiveTypes() : directiveTypes).map(
              extractDirectiveDef,
            )
        : null),
      (def.pipeDefs = pipeTypes
        ? () => ('function' == typeof pipeTypes ? pipeTypes() : pipeTypes).map(extractPipeDef)
        : null),
      def
    );
  });
}
function extractDirectiveDef(type) {
  return (
    getComponentDef(type) ||
    (function (type) {
      return type[NG_DIR_DEF] || null;
    })(type)
  );
}
function extractPipeDef(type) {
  return (function (type) {
    return type[NG_PIPE_DEF] || null;
  })(type);
}
const autoRegisterModuleById = {};
function ɵɵdefineNgModule(def) {
  const res = {
    type: def.type,
    bootstrap: def.bootstrap || EMPTY_ARRAY,
    declarations: def.declarations || EMPTY_ARRAY,
    imports: def.imports || EMPTY_ARRAY,
    exports: def.exports || EMPTY_ARRAY,
    transitiveCompileScopes: null,
    schemas: def.schemas || null,
    id: def.id || null,
  };
  return (
    null != def.id &&
      noSideEffects(() => {
        autoRegisterModuleById[def.id] = def.type;
      }),
    res
  );
}
function invertObject(obj, secondary) {
  if (null == obj) return EMPTY_OBJ;
  const newLookup = {};
  for (const minifiedKey in obj)
    if (obj.hasOwnProperty(minifiedKey)) {
      let publicName = obj[minifiedKey],
        declaredName = publicName;
      Array.isArray(publicName) && ((declaredName = publicName[1]), (publicName = publicName[0])),
        (newLookup[publicName] = minifiedKey),
        secondary && (secondary[publicName] = declaredName);
    }
  return newLookup;
}
const ɵɵdefineDirective = ɵɵdefineComponent;
function getComponentDef(type) {
  return type[NG_COMP_DEF] || null;
}
function getNgModuleDef(type, throwNotFound) {
  const ngModuleDef = type[NG_MOD_DEF] || null;
  if (!ngModuleDef && !0 === throwNotFound)
    throw new Error(`Type ${stringify(type)} does not have 'ɵmod' property.`);
  return ngModuleDef;
}

function isLView(value) {
  return Array.isArray(value) && 'object' == typeof value[1];
}
function isLContainer(value) {
  return Array.isArray(value) && !0 === value[1];
}
function isContentQueryHost(tNode) {
  return 0 != (8 & tNode.flags);
}
function isComponentHost(tNode) {
  return 2 == (2 & tNode.flags);
}
function isDirectiveHost(tNode) {
  return 1 == (1 & tNode.flags);
}
function isComponentDef(def) {
  return null !== def.template;
}

function getFactoryDef(type, throwNotFound) {
  return type.hasOwnProperty(NG_FACTORY_DEF) ? type[NG_FACTORY_DEF] : null;
}
class RuntimeError extends Error {
  constructor(code, message) {
    super(
      (function (code, message) {
        return `${code ? `NG0${code}: ` : ''}${message}`;
      })(
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */ code,
        message,
      ),
    ),
      (this.code = code);
  }
}
function renderStringify(value) {
  return 'string' == typeof value ? value : null == value ? '' : String(value);
}
function stringifyForError(value) {
  return 'function' == typeof value
    ? value.name || value.toString()
    : 'object' == typeof value && null != value && 'function' == typeof value.type
    ? value.type.name || value.type.toString()
    : renderStringify(value);
}
function throwProviderNotFoundError(token, injectorName) {
  const injectorDetails = injectorName ? ` in ${injectorName}` : '';
  throw new RuntimeError(
    '201',
    `No provider for ${stringifyForError(token)} found${injectorDetails}`,
  );
}
class SimpleChange {
  constructor(previousValue, currentValue, firstChange) {
    (this.previousValue = previousValue),
      (this.currentValue = currentValue),
      (this.firstChange = firstChange);
  }
  isFirstChange() {
    return this.firstChange;
  }
}
function rememberChangeHistoryAndInvokeOnChangesHook() {
  const simpleChangesStore = getSimpleChangesStore(this),
    current = null == simpleChangesStore ? void 0 : simpleChangesStore.current;
  if (current) {
    const previous = simpleChangesStore.previous;
    if (previous === EMPTY_OBJ) simpleChangesStore.previous = current;
    else for (let key in current) previous[key] = current[key];
    (simpleChangesStore.current = null), this.ngOnChanges(current);
  }
}
function ngOnChangesSetInput(instance, value, publicName, privateName) {
  const simpleChangesStore =
      getSimpleChangesStore(instance) ||
      (function (instance, store) {
        return (instance.__ngSimpleChanges__ = store);
      })(
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */ instance,
        {
          previous: EMPTY_OBJ,
          current: null,
        },
      ),
    current = simpleChangesStore.current || (simpleChangesStore.current = {}),
    previous = simpleChangesStore.previous,
    declaredName = this.declaredInputs[publicName],
    previousChange = previous[declaredName];
  (current[declaredName] = new SimpleChange(
    previousChange && previousChange.currentValue,
    value,
    previous === EMPTY_OBJ,
  )),
    (instance[privateName] = value);
}
function getSimpleChangesStore(instance) {
  return instance.__ngSimpleChanges__ || null;
}

let DOCUMENT = void 0;

function isProceduralRenderer(renderer) {
  return !!renderer.listen;
}
const domRendererFactory3 = {
  createRenderer: (hostElement, rendererType) =>
    void 0 !== DOCUMENT ? DOCUMENT : 'undefined' != typeof document ? document : void 0,
};
function unwrapRNode(value) {
  for (; Array.isArray(value); ) value = value[0];
  return value;
}
function getNativeByIndex(index, lView) {
  return unwrapRNode(lView[index]);
}
function getNativeByTNode(tNode, lView) {
  return unwrapRNode(lView[tNode.index]);
}
function getTNode(tView, index) {
  return tView.data[index];
}
function getComponentLViewByIndex(nodeIndex, hostView) {
  const slotValue = hostView[nodeIndex];
  return isLView(slotValue) ? slotValue : slotValue[0];
}
function readPatchedLView(target) {
  const value = (function (target) {
    return target.__ngContext__ || null;
  })(target);
  return value ? (Array.isArray(value) ? value : value.lView) : null;
}
function viewAttachedToChangeDetector(view) {
  return 128 == (128 & view[2]);
}
function getConstant(consts, index) {
  return null == index ? null : consts[index];
}
function resetPreOrderHookFlags(lView) {
  lView[18] = 0;
}
function updateTransplantedViewCount(lContainer, amount) {
  lContainer[5] += amount;
  let viewOrContainer = lContainer,
    parent = lContainer[3];
  for (
    ;
    null !== parent &&
    ((1 === amount && 1 === viewOrContainer[5]) || (-1 === amount && 0 === viewOrContainer[5]));

  )
    (parent[5] += amount), (viewOrContainer = parent), (parent = parent[3]);
}
const instructionState = {
  lFrame: createLFrame(null),
  bindingsEnabled: !0,
  isInCheckNoChangesMode: !1,
};
function getLView() {
  return instructionState.lFrame.lView;
}
function getTView() {
  return instructionState.lFrame.tView;
}
function ɵɵrestoreView(viewToRestore) {
  instructionState.lFrame.contextLView = viewToRestore;
}
function getCurrentTNode() {
  let currentTNode = getCurrentTNodePlaceholderOk();
  for (; null !== currentTNode && 64 === currentTNode.type; ) currentTNode = currentTNode.parent;
  return currentTNode;
}
function getCurrentTNodePlaceholderOk() {
  return instructionState.lFrame.currentTNode;
}
function setCurrentTNode(tNode, isParent) {
  const lFrame = instructionState.lFrame;
  (lFrame.currentTNode = tNode), (lFrame.isParent = isParent);
}
function isCurrentTNodeParent() {
  return instructionState.lFrame.isParent;
}
function isInCheckNoChangesMode() {
  return instructionState.isInCheckNoChangesMode;
}
function setIsInCheckNoChangesMode(mode) {
  instructionState.isInCheckNoChangesMode = mode;
}
function nextBindingIndex() {
  return instructionState.lFrame.bindingIndex++;
}
function setBindingRootForHostBindings(bindingRootIndex, currentDirectiveIndex) {
  const lFrame = instructionState.lFrame;
  (lFrame.bindingIndex = lFrame.bindingRootIndex = bindingRootIndex),
    setCurrentDirectiveIndex(currentDirectiveIndex);
}
function setCurrentDirectiveIndex(currentDirectiveIndex) {
  instructionState.lFrame.currentDirectiveIndex = currentDirectiveIndex;
}
function setCurrentQueryIndex(value) {
  instructionState.lFrame.currentQueryIndex = value;
}
function getDeclarationTNode(lView) {
  const tView = lView[1];
  return 2 === tView.type ? tView.declTNode : 1 === tView.type ? lView[6] : null;
}
function enterDI(lView, tNode, flags) {
  if (flags & InjectFlags.SkipSelf) {
    let parentTNode = tNode,
      parentLView = lView;
    for (
      ;
      (parentTNode = parentTNode.parent),
        !(
          null !== parentTNode ||
          flags & InjectFlags.Host ||
          ((parentTNode = getDeclarationTNode(parentLView)), null === parentTNode) ||
          ((parentLView = parentLView[15]), 10 & parentTNode.type)
        );

    );
    if (null === parentTNode) return !1;
    (tNode = parentTNode), (lView = parentLView);
  }
  const lFrame = (instructionState.lFrame = allocLFrame());
  return (lFrame.currentTNode = tNode), (lFrame.lView = lView), !0;
}
function enterView(newView) {
  const newLFrame = allocLFrame(),
    tView = newView[1];
  (instructionState.lFrame = newLFrame),
    (newLFrame.currentTNode = tView.firstChild),
    (newLFrame.lView = newView),
    (newLFrame.tView = tView),
    (newLFrame.contextLView = newView),
    (newLFrame.bindingIndex = tView.bindingStartIndex),
    (newLFrame.inI18n = !1);
}
function allocLFrame() {
  const currentLFrame = instructionState.lFrame,
    childLFrame = null === currentLFrame ? null : currentLFrame.child;
  return null === childLFrame ? createLFrame(currentLFrame) : childLFrame;
}
function createLFrame(parent) {
  const lFrame = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: parent,
    child: null,
    inI18n: !1,
  };
  return null !== parent && (parent.child = lFrame), lFrame;
}
function leaveViewLight() {
  const oldLFrame = instructionState.lFrame;
  return (
    (instructionState.lFrame = oldLFrame.parent),
    (oldLFrame.currentTNode = null),
    (oldLFrame.lView = null),
    oldLFrame
  );
}
const leaveDI = leaveViewLight;
function leaveView() {
  const oldLFrame = leaveViewLight();
  (oldLFrame.isParent = !0),
    (oldLFrame.tView = null),
    (oldLFrame.selectedIndex = -1),
    (oldLFrame.contextLView = null),
    (oldLFrame.elementDepthCount = 0),
    (oldLFrame.currentDirectiveIndex = -1),
    (oldLFrame.currentNamespace = null),
    (oldLFrame.bindingRootIndex = -1),
    (oldLFrame.bindingIndex = -1),
    (oldLFrame.currentQueryIndex = 0);
}
function getSelectedIndex() {
  return instructionState.lFrame.selectedIndex;
}
function setSelectedIndex(index) {
  instructionState.lFrame.selectedIndex = index;
}
function registerPostOrderHooks(tView, tNode) {
  for (let i = tNode.directiveStart, end = tNode.directiveEnd; i < end; i++) {
    const lifecycleHooks = tView.data[i].type.prototype,
      {
        ngAfterContentInit: ngAfterContentInit,
        ngAfterContentChecked: ngAfterContentChecked,
        ngAfterViewInit: ngAfterViewInit,
        ngAfterViewChecked: ngAfterViewChecked,
        ngOnDestroy: ngOnDestroy,
      } = lifecycleHooks;
    ngAfterContentInit &&
      (tView.contentHooks || (tView.contentHooks = [])).push(-i, ngAfterContentInit),
      ngAfterContentChecked &&
        ((tView.contentHooks || (tView.contentHooks = [])).push(i, ngAfterContentChecked),
        (tView.contentCheckHooks || (tView.contentCheckHooks = [])).push(i, ngAfterContentChecked)),
      ngAfterViewInit && (tView.viewHooks || (tView.viewHooks = [])).push(-i, ngAfterViewInit),
      ngAfterViewChecked &&
        ((tView.viewHooks || (tView.viewHooks = [])).push(i, ngAfterViewChecked),
        (tView.viewCheckHooks || (tView.viewCheckHooks = [])).push(i, ngAfterViewChecked)),
      null != ngOnDestroy && (tView.destroyHooks || (tView.destroyHooks = [])).push(i, ngOnDestroy);
  }
}
function executeCheckHooks(lView, hooks, nodeIndex) {
  callHooks(lView, hooks, 3, nodeIndex);
}
function executeInitAndCheckHooks(lView, hooks, initPhase, nodeIndex) {
  (3 & lView[2]) === initPhase && callHooks(lView, hooks, initPhase, nodeIndex);
}
function incrementInitPhaseFlags(lView, initPhase) {
  let flags = lView[2];
  (3 & flags) === initPhase && ((flags &= 2047), (flags += 1), (lView[2] = flags));
}
function callHooks(currentView, arr, initPhase, currentNodeIndex) {
  const nodeIndexLimit = null != currentNodeIndex ? currentNodeIndex : -1;
  let lastNodeIndexFound = 0;
  for (let i = void 0 !== currentNodeIndex ? 65535 & currentView[18] : 0; i < arr.length; i++)
    if ('number' == typeof arr[i + 1]) {
      if (
        ((lastNodeIndexFound = arr[i]),
        null != currentNodeIndex && lastNodeIndexFound >= currentNodeIndex)
      )
        break;
    } else
      arr[i] < 0 && (currentView[18] += 65536),
        (lastNodeIndexFound < nodeIndexLimit || -1 == nodeIndexLimit) &&
          (callHook(currentView, initPhase, arr, i),
          (currentView[18] = (4294901760 & currentView[18]) + i + 2)),
        i++;
}
function callHook(currentView, initPhase, arr, i) {
  const isInitHook = arr[i] < 0,
    hook = arr[i + 1],
    directive = currentView[isInitHook ? -arr[i] : arr[i]];
  isInitHook
    ? currentView[2] >> 11 < currentView[18] >> 16 &&
      (3 & currentView[2]) === initPhase &&
      ((currentView[2] += 2048), hook.call(directive))
    : hook.call(directive);
}
class NodeInjectorFactory {
  constructor(factory, isViewProvider, injectImplementation) {
    (this.factory = factory),
      (this.resolving = !1),
      (this.canSeeViewProviders = isViewProvider),
      (this.injectImpl = injectImplementation);
  }
}
function setUpAttributes(renderer, native, attrs) {
  const isProc = isProceduralRenderer(renderer);
  let i = 0;
  for (; i < attrs.length; ) {
    const value = attrs[i];
    if ('number' == typeof value) {
      if (0 !== value) break;
      i++;
      const namespaceURI = attrs[i++],
        attrName = attrs[i++],
        attrVal = attrs[i++];
      isProc
        ? renderer.setAttribute(native, attrName, attrVal, namespaceURI)
        : native.setAttributeNS(namespaceURI, attrName, attrVal);
    } else {
      const attrName = value,
        attrVal = attrs[++i];
      isAnimationProp(attrName)
        ? isProc && renderer.setProperty(native, attrName, attrVal)
        : isProc
        ? renderer.setAttribute(native, attrName, attrVal)
        : native.setAttribute(attrName, attrVal),
        i++;
    }
  }
  return i;
}
function isAnimationProp(name) {
  return 64 === name.charCodeAt(0);
}
function mergeHostAttrs(dst, src) {
  if (null === src || 0 === src.length);
  else if (null === dst || 0 === dst.length) dst = src.slice();
  else {
    let srcMarker = -1;
    for (let i = 0; i < src.length; i++) {
      const item = src[i];
      'number' == typeof item
        ? (srcMarker = item)
        : 0 === srcMarker ||
          mergeHostAttribute(
            dst,
            srcMarker,
            item,
            null,
            -1 === srcMarker || 2 === srcMarker ? src[++i] : null,
          );
    }
  }
  return dst;
}
function mergeHostAttribute(dst, marker, key1, key2, value) {
  let i = 0,
    markerInsertPosition = dst.length;
  if (-1 === marker) markerInsertPosition = -1;
  else
    for (; i < dst.length; ) {
      const dstValue = dst[i++];
      if ('number' == typeof dstValue) {
        if (dstValue === marker) {
          markerInsertPosition = -1;
          break;
        }
        if (dstValue > marker) {
          markerInsertPosition = i - 1;
          break;
        }
      }
    }
  for (; i < dst.length; ) {
    const item = dst[i];
    if ('number' == typeof item) break;
    if (item === key1) {
      if (null === key2) return void (null !== value && (dst[i + 1] = value));
      if (key2 === dst[i + 1]) return void (dst[i + 2] = value);
    }
    i++, null !== key2 && i++, null !== value && i++;
  }
  -1 !== markerInsertPosition &&
    (dst.splice(markerInsertPosition, 0, marker), (i = markerInsertPosition + 1)),
    dst.splice(i++, 0, key1),
    null !== key2 && dst.splice(i++, 0, key2),
    null !== value && dst.splice(i++, 0, value);
}
function hasParentInjector(parentLocation) {
  return -1 !== parentLocation;
}
function getParentInjectorIndex(parentLocation) {
  return 32767 & parentLocation;
}
function getParentInjectorView(location, startView) {
  let viewOffset = location >> 16,
    parentView = startView;
  for (; viewOffset > 0; ) (parentView = parentView[15]), viewOffset--;
  return parentView;
}
let includeViewProviders = !0;
function setIncludeViewProviders(v) {
  const oldValue = includeViewProviders;
  return (includeViewProviders = v), oldValue;
}
let nextNgElementId = 0;
function getOrCreateNodeInjectorForNode(tNode, lView) {
  const existingInjectorIndex = getInjectorIndex(tNode, lView);
  if (-1 !== existingInjectorIndex) return existingInjectorIndex;
  const tView = lView[1];
  tView.firstCreatePass &&
    ((tNode.injectorIndex = lView.length),
    insertBloom(tView.data, tNode),
    insertBloom(lView, null),
    insertBloom(tView.blueprint, null));
  const parentLoc = getParentInjectorLocation(tNode, lView),
    injectorIndex = tNode.injectorIndex;
  if (hasParentInjector(parentLoc)) {
    const parentIndex = getParentInjectorIndex(parentLoc),
      parentLView = getParentInjectorView(parentLoc, lView),
      parentData = parentLView[1].data;
    for (let i = 0; i < 8; i++)
      lView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
  }
  return (lView[injectorIndex + 8] = parentLoc), injectorIndex;
}
function insertBloom(arr, footer) {
  arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
}
function getInjectorIndex(tNode, lView) {
  return -1 === tNode.injectorIndex ||
    (tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex) ||
    null === lView[tNode.injectorIndex + 8]
    ? -1
    : tNode.injectorIndex;
}
function getParentInjectorLocation(tNode, lView) {
  if (tNode.parent && -1 !== tNode.parent.injectorIndex) return tNode.parent.injectorIndex;
  let declarationViewOffset = 0,
    parentTNode = null,
    lViewCursor = lView;
  for (; null !== lViewCursor; ) {
    const tView = lViewCursor[1],
      tViewType = tView.type;
    if (
      ((parentTNode = 2 === tViewType ? tView.declTNode : 1 === tViewType ? lViewCursor[6] : null),
      null === parentTNode)
    )
      return -1;
    if (
      (declarationViewOffset++, (lViewCursor = lViewCursor[15]), -1 !== parentTNode.injectorIndex)
    )
      return parentTNode.injectorIndex | (declarationViewOffset << 16);
  }
  return -1;
}
function diPublicInInjector(injectorIndex, tView, token) {
  !(function (injectorIndex, tView, type) {
    let id;
    'string' == typeof type
      ? (id = type.charCodeAt(0) || 0)
      : type.hasOwnProperty(NG_ELEMENT_ID) && (id = type[NG_ELEMENT_ID]),
      null == id && (id = type[NG_ELEMENT_ID] = nextNgElementId++);
    const bloomBit = 255 & id,
      mask = 1 << bloomBit,
      b6 = 64 & bloomBit,
      b5 = 32 & bloomBit,
      tData = tView.data;
    128 & bloomBit
      ? b6
        ? b5
          ? (tData[injectorIndex + 7] |= mask)
          : (tData[injectorIndex + 6] |= mask)
        : b5
        ? (tData[injectorIndex + 5] |= mask)
        : (tData[injectorIndex + 4] |= mask)
      : b6
      ? b5
        ? (tData[injectorIndex + 3] |= mask)
        : (tData[injectorIndex + 2] |= mask)
      : b5
      ? (tData[injectorIndex + 1] |= mask)
      : (tData[injectorIndex] |= mask);
  })(injectorIndex, tView, token);
}
function notFoundValueOrThrow(notFoundValue, token, flags) {
  if (flags & InjectFlags.Optional) return notFoundValue;
  throwProviderNotFoundError(token, 'NodeInjector');
}
function lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue) {
  if (
    (flags & InjectFlags.Optional && void 0 === notFoundValue && (notFoundValue = null),
    0 == (flags & (InjectFlags.Self | InjectFlags.Host)))
  ) {
    const moduleInjector = lView[9],
      previousInjectImplementation = setInjectImplementation(void 0);
    try {
      return moduleInjector
        ? moduleInjector.get(token, notFoundValue, flags & InjectFlags.Optional)
        : injectRootLimpMode(token, notFoundValue, flags & InjectFlags.Optional);
    } finally {
      setInjectImplementation(previousInjectImplementation);
    }
  }
  return notFoundValueOrThrow(notFoundValue, token, flags);
}
function getOrCreateInjectable(tNode, lView, token, flags = InjectFlags.Default, notFoundValue) {
  if (null !== tNode) {
    const bloomHash = (function (token) {
      if ('string' == typeof token) return token.charCodeAt(0) || 0;
      const tokenId = token.hasOwnProperty(NG_ELEMENT_ID) ? token[NG_ELEMENT_ID] : void 0;
      return 'number' == typeof tokenId
        ? tokenId >= 0
          ? 255 & tokenId
          : createNodeInjector
        : tokenId;
    })(token);
    if ('function' == typeof bloomHash) {
      if (!enterDI(lView, tNode, flags))
        return flags & InjectFlags.Host
          ? notFoundValueOrThrow(notFoundValue, token, flags)
          : lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue);
      try {
        const value = bloomHash();
        if (null != value || flags & InjectFlags.Optional) return value;
        throwProviderNotFoundError(token);
      } finally {
        leaveDI();
      }
    } else if ('number' == typeof bloomHash) {
      let previousTView = null,
        injectorIndex = getInjectorIndex(tNode, lView),
        parentLocation = -1,
        hostTElementNode = flags & InjectFlags.Host ? lView[16][6] : null;
      for (
        (-1 === injectorIndex || flags & InjectFlags.SkipSelf) &&
        ((parentLocation =
          -1 === injectorIndex
            ? getParentInjectorLocation(tNode, lView)
            : lView[injectorIndex + 8]),
        -1 !== parentLocation && shouldSearchParent(flags, !1)
          ? ((previousTView = lView[1]),
            (injectorIndex = getParentInjectorIndex(parentLocation)),
            (lView = getParentInjectorView(parentLocation, lView)))
          : (injectorIndex = -1));
        -1 !== injectorIndex;

      ) {
        const tView = lView[1];
        if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
          const instance = searchTokensOnInjector(
            injectorIndex,
            lView,
            token,
            previousTView,
            flags,
            hostTElementNode,
          );
          if (instance !== NOT_FOUND) return instance;
        }
        (parentLocation = lView[injectorIndex + 8]),
          -1 !== parentLocation &&
          shouldSearchParent(flags, lView[1].data[injectorIndex + 8] === hostTElementNode) &&
          bloomHasToken(bloomHash, injectorIndex, lView)
            ? ((previousTView = tView),
              (injectorIndex = getParentInjectorIndex(parentLocation)),
              (lView = getParentInjectorView(parentLocation, lView)))
            : (injectorIndex = -1);
      }
    }
  }
  return lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue);
}
const NOT_FOUND = {};
function createNodeInjector() {
  return new NodeInjector(getCurrentTNode(), getLView());
}
function searchTokensOnInjector(
  injectorIndex,
  lView,
  token,
  previousTView,
  flags,
  hostTElementNode,
) {
  const currentTView = lView[1],
    tNode = currentTView.data[injectorIndex + 8],
    injectableIdx = (function (tNode, tView, token, canAccessViewProviders, isHostSpecialCase) {
      const nodeProviderIndexes = tNode.providerIndexes,
        tInjectables = tView.data,
        injectablesStart = 1048575 & nodeProviderIndexes,
        directivesStart = tNode.directiveStart,
        cptViewProvidersCount = nodeProviderIndexes >> 20,
        endIndex = isHostSpecialCase
          ? injectablesStart + cptViewProvidersCount
          : tNode.directiveEnd;
      for (
        let i = canAccessViewProviders
          ? injectablesStart
          : injectablesStart + cptViewProvidersCount;
        i < endIndex;
        i++
      ) {
        const providerTokenOrDef = tInjectables[i];
        if (
          (i < directivesStart && token === providerTokenOrDef) ||
          (i >= directivesStart && providerTokenOrDef.type === token)
        )
          return i;
      }
      if (isHostSpecialCase) {
        const dirDef = tInjectables[directivesStart];
        if (dirDef && isComponentDef(dirDef) && dirDef.type === token) return directivesStart;
      }
      return null;
    })(
      tNode,
      currentTView,
      token,
      null == previousTView
        ? isComponentHost(tNode) && includeViewProviders
        : previousTView != currentTView && 0 != (3 & tNode.type),
      flags & InjectFlags.Host && hostTElementNode === tNode,
    );
  return null !== injectableIdx
    ? getNodeInjectable(lView, currentTView, injectableIdx, tNode)
    : NOT_FOUND;
}
function getNodeInjectable(lView, tView, index, tNode) {
  let value = lView[index];
  const tData = tView.data;
  if (value instanceof NodeInjectorFactory) {
    const factory = value;
    factory.resolving &&
      (function (token, path) {
        throw new RuntimeError('200', `Circular dependency in DI detected for ${token}`);
      })(stringifyForError(tData[index]));
    const previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
    factory.resolving = !0;
    const previousInjectImplementation = factory.injectImpl
      ? setInjectImplementation(factory.injectImpl)
      : null;
    enterDI(lView, tNode, InjectFlags.Default);
    try {
      (value = lView[index] = factory.factory(void 0, tData, lView, tNode)),
        tView.firstCreatePass &&
          index >= tNode.directiveStart &&
          /**
           * @license
           * Copyright Google LLC All Rights Reserved.
           *
           * Use of this source code is governed by an MIT-style license that can be
           * found in the LICENSE file at https://angular.io/license
           */
          (function (directiveIndex, directiveDef, tView) {
            const {
              ngOnChanges: ngOnChanges,
              ngOnInit: ngOnInit,
              ngDoCheck: ngDoCheck,
            } = directiveDef.type.prototype;
            if (ngOnChanges) {
              const wrappedOnChanges =
                ((definition = directiveDef).type.prototype.ngOnChanges &&
                  (definition.setInput = ngOnChangesSetInput),
                rememberChangeHistoryAndInvokeOnChangesHook);
              (tView.preOrderHooks || (tView.preOrderHooks = [])).push(
                directiveIndex,
                wrappedOnChanges,
              ),
                (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(
                  directiveIndex,
                  wrappedOnChanges,
                );
            }
            var definition;
            ngOnInit &&
              (tView.preOrderHooks || (tView.preOrderHooks = [])).push(
                0 - directiveIndex,
                ngOnInit,
              ),
              ngDoCheck &&
                ((tView.preOrderHooks || (tView.preOrderHooks = [])).push(
                  directiveIndex,
                  ngDoCheck,
                ),
                (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(
                  directiveIndex,
                  ngDoCheck,
                ));
          })(index, tData[index], tView);
    } finally {
      null !== previousInjectImplementation &&
        setInjectImplementation(previousInjectImplementation),
        setIncludeViewProviders(previousIncludeViewProviders),
        (factory.resolving = !1),
        leaveDI();
    }
  }
  return value;
}
function bloomHasToken(bloomHash, injectorIndex, injectorView) {
  const b6 = 64 & bloomHash,
    b5 = 32 & bloomHash;
  let value;
  return (
    (value =
      128 & bloomHash
        ? b6
          ? b5
            ? injectorView[injectorIndex + 7]
            : injectorView[injectorIndex + 6]
          : b5
          ? injectorView[injectorIndex + 5]
          : injectorView[injectorIndex + 4]
        : b6
        ? b5
          ? injectorView[injectorIndex + 3]
          : injectorView[injectorIndex + 2]
        : b5
        ? injectorView[injectorIndex + 1]
        : injectorView[injectorIndex]),
    !!(value & (1 << bloomHash))
  );
}
function shouldSearchParent(flags, isFirstHostTNode) {
  return !(flags & InjectFlags.Self || (flags & InjectFlags.Host && isFirstHostTNode));
}
class NodeInjector {
  constructor(_tNode, _lView) {
    (this._tNode = _tNode), (this._lView = _lView);
  }
  get(token, notFoundValue) {
    return getOrCreateInjectable(this._tNode, this._lView, token, void 0, notFoundValue);
  }
}
function makeParamDecorator(name, props, parentClass) {
  return noSideEffects(() => {
    const metaCtor = (function (props) {
      return function (...args) {
        if (props) {
          const values = props(...args);
          for (const propName in values) this[propName] = values[propName];
        }
      };
    })(props);
    function ParamDecoratorFactory(...args) {
      if (this instanceof ParamDecoratorFactory) return metaCtor.apply(this, args), this;
      const annotationInstance = new ParamDecoratorFactory(...args);
      return (ParamDecorator.annotation = annotationInstance), ParamDecorator;
      function ParamDecorator(cls, unusedKey, index) {
        const parameters = cls.hasOwnProperty('__parameters__')
          ? cls.__parameters__
          : Object.defineProperty(cls, '__parameters__', {
              value: [],
            }).__parameters__;
        for (; parameters.length <= index; ) parameters.push(null);
        return (parameters[index] = parameters[index] || []).push(annotationInstance), cls;
      }
    }
    return (
      parentClass && (ParamDecoratorFactory.prototype = Object.create(parentClass.prototype)),
      (ParamDecoratorFactory.prototype.ngMetadataName = name),
      (ParamDecoratorFactory.annotationCls = ParamDecoratorFactory),
      ParamDecoratorFactory
    );
  });
}
class InjectionToken {
  constructor(_desc, options) {
    (this._desc = _desc),
      (this.ngMetadataName = 'InjectionToken'),
      (this.ɵprov = void 0),
      'number' == typeof options
        ? (this.__NG_ELEMENT_ID__ = options)
        : void 0 !== options &&
          (this.ɵprov = ɵɵdefineInjectable({
            token: this,
            providedIn: options.providedIn || 'root',
            factory: options.factory,
          }));
  }
  toString() {
    return `InjectionToken ${this._desc}`;
  }
}

function deepForEach(input, fn) {
  input.forEach((value) => (Array.isArray(value) ? deepForEach(value, fn) : fn(value)));
}
function addToArray(arr, index, value) {
  index >= arr.length ? arr.push(value) : arr.splice(index, 0, value);
}
function removeFromArray(arr, index) {
  return index >= arr.length - 1 ? arr.pop() : arr.splice(index, 1)[0];
}
function keyValueArraySet(keyValueArray, key, value) {
  let index = keyValueArrayIndexOf(keyValueArray, key);
  return (
    index >= 0
      ? (keyValueArray[1 | index] = value)
      : ((index = ~index),
        (function (array, index, value1, value2) {
          let end = array.length;
          if (end == index) array.push(value1, value2);
          else if (1 === end) array.push(value2, array[0]), (array[0] = value1);
          else {
            for (end--, array.push(array[end - 1], array[end]); end > index; )
              (array[end] = array[end - 2]), end--;
            (array[index] = value1), (array[index + 1] = value2);
          }
        })(keyValueArray, index, key, value)),
    index
  );
}
function keyValueArrayGet(keyValueArray, key) {
  const index = keyValueArrayIndexOf(keyValueArray, key);
  if (index >= 0) return keyValueArray[1 | index];
}
function keyValueArrayIndexOf(keyValueArray, key) {
  return (function (array, value, shift) {
    let start = 0,
      end = array.length >> 1;
    for (; end !== start; ) {
      const middle = start + ((end - start) >> 1),
        current = array[middle << 1];
      if (value === current) return middle << 1;
      current > value ? (end = middle) : (start = middle + 1);
    }
    return ~(end << 1);
  })(
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */ keyValueArray,
    key,
  );
}
const Inject = makeParamDecorator('Inject', (token) => ({
    token: token,
  })),
  Optional = makeParamDecorator('Optional'),
  Self = makeParamDecorator('Self'),
  SkipSelf = makeParamDecorator('SkipSelf'),
  THROW_IF_NOT_FOUND = {},
  NEW_LINE = /\n/gm,
  USE_VALUE = getClosureSafeProperty({
    provide: String,
    useValue: getClosureSafeProperty,
  });
let _currentInjector = void 0;
function setCurrentInjector(injector) {
  const former = _currentInjector;
  return (_currentInjector = injector), former;
}
function injectInjectorOnly(token, flags = InjectFlags.Default) {
  if (void 0 === _currentInjector)
    throw new Error('inject() must be called from an injection context');
  return null === _currentInjector
    ? injectRootLimpMode(token, void 0, flags)
    : _currentInjector.get(token, flags & InjectFlags.Optional ? null : void 0, flags);
}
function ɵɵinject(token, flags = InjectFlags.Default) {
  return (_injectImplementation || injectInjectorOnly)(resolveForwardRef(token), flags);
}
function injectArgs(types) {
  const args = [];
  for (let i = 0; i < types.length; i++) {
    const arg = resolveForwardRef(types[i]);
    if (Array.isArray(arg)) {
      if (0 === arg.length) throw new Error('Arguments array must have arguments.');
      let type = void 0,
        flags = InjectFlags.Default;
      for (let j = 0; j < arg.length; j++) {
        const meta = arg[j];
        meta instanceof Optional || 'Optional' === meta.ngMetadataName || meta === Optional
          ? (flags |= InjectFlags.Optional)
          : meta instanceof SkipSelf || 'SkipSelf' === meta.ngMetadataName || meta === SkipSelf
          ? (flags |= InjectFlags.SkipSelf)
          : meta instanceof Self || 'Self' === meta.ngMetadataName || meta === Self
          ? (flags |= InjectFlags.Self)
          : (type = meta instanceof Inject || meta === Inject ? meta.token : meta);
      }
      args.push(ɵɵinject(type, flags));
    } else args.push(ɵɵinject(arg));
  }
  return args;
}

function getDebugContext(error) {
  return error.ngDebugContext;
}
function getOriginalError(error) {
  return error.ngOriginalError;
}
function defaultErrorLogger(console, ...values) {
  console.error(...values);
}
class ErrorHandler {
  constructor() {
    this._console = console;
  }
  handleError(error) {
    const originalError = this._findOriginalError(error),
      context = this._findContext(error),
      errorLogger = (function (error) {
        return error.ngErrorLogger || defaultErrorLogger;
      })(error);
    errorLogger(this._console, 'ERROR', error),
      originalError && errorLogger(this._console, 'ORIGINAL ERROR', originalError),
      context && errorLogger(this._console, 'ERROR CONTEXT', context);
  }
  _findContext(error) {
    return error
      ? getDebugContext(error)
        ? getDebugContext(error)
        : this._findContext(getOriginalError(error))
      : null;
  }
  _findOriginalError(error) {
    let e = getOriginalError(error);
    for (; e && getOriginalError(e); ) e = getOriginalError(e);
    return e;
  }
}
function attachPatchData(target, data) {
  target.__ngContext__ = data;
}

const defaultScheduler = (() =>
  (('undefined' != typeof requestAnimationFrame && requestAnimationFrame) || setTimeout).bind(
    _global,
  ))();
function maybeUnwrapFn(value) {
  return value instanceof Function ? value() : value;
}

var RendererStyleFlags2 = (function (RendererStyleFlags2) {
  return (
    (RendererStyleFlags2[(RendererStyleFlags2.Important = 1)] = 'Important'),
    (RendererStyleFlags2[(RendererStyleFlags2.DashCase = 2)] = 'DashCase'),
    RendererStyleFlags2
  );
})({});
function icuContainerIterate(tIcuContainerNode, lView) {
  return (void 0)();
}
function getLViewParent(lView) {
  const parent = lView[3];
  return isLContainer(parent) ? parent[3] : parent;
}
function getFirstLContainer(lView) {
  return getNearestLContainer(lView[13]);
}
function getNextLContainer(container) {
  return getNearestLContainer(container[4]);
}
function getNearestLContainer(viewOrContainer) {
  for (; null !== viewOrContainer && !isLContainer(viewOrContainer); )
    viewOrContainer = viewOrContainer[4];
  return viewOrContainer;
}
function applyToElementOrContainer(action, renderer, parent, lNodeToHandle, beforeNode) {
  if (null != lNodeToHandle) {
    let lContainer,
      isComponent = !1;
    isLContainer(lNodeToHandle)
      ? (lContainer = lNodeToHandle)
      : isLView(lNodeToHandle) && ((isComponent = !0), (lNodeToHandle = lNodeToHandle[0]));
    const rNode = unwrapRNode(lNodeToHandle);
    0 === action && null !== parent
      ? null == beforeNode
        ? nativeAppendChild(renderer, parent, rNode)
        : nativeInsertBefore(renderer, parent, rNode, beforeNode || null, !0)
      : 1 === action && null !== parent
      ? nativeInsertBefore(renderer, parent, rNode, beforeNode || null, !0)
      : 2 === action
      ? (function (renderer, rNode, isHostElement) {
          const nativeParent = nativeParentNode(renderer, rNode);
          nativeParent &&
            (function (renderer, parent, child, isHostElement) {
              isProceduralRenderer(renderer)
                ? renderer.removeChild(parent, child, isHostElement)
                : parent.removeChild(child);
            })(renderer, nativeParent, rNode, isHostElement);
        })(renderer, rNode, isComponent)
      : 3 === action && renderer.destroyNode(rNode),
      null != lContainer &&
        (function (renderer, action, lContainer, parentRElement, beforeNode) {
          const anchor = lContainer[7];
          anchor !== unwrapRNode(lContainer) &&
            applyToElementOrContainer(action, renderer, parentRElement, anchor, beforeNode);
          for (let i = 10; i < lContainer.length; i++) {
            const lView = lContainer[i];
            applyView(lView[1], lView, renderer, action, parentRElement, anchor);
          }
        })(renderer, action, lContainer, parent, beforeNode);
  }
}
function createElementNode(renderer, name, namespace) {
  return isProceduralRenderer(renderer)
    ? renderer.createElement(name, namespace)
    : null === namespace
    ? renderer.createElement(name)
    : renderer.createElementNS(namespace, name);
}
function detachMovedView(declarationContainer, lView) {
  const movedViews = declarationContainer[9],
    declarationViewIndex = movedViews.indexOf(lView),
    insertionLContainer = lView[3];
  1024 & lView[2] && ((lView[2] &= -1025), updateTransplantedViewCount(insertionLContainer, -1)),
    movedViews.splice(declarationViewIndex, 1);
}
function detachView(lContainer, removeIndex) {
  if (lContainer.length <= 10) return;
  const indexInContainer = 10 + removeIndex,
    viewToDetach = lContainer[indexInContainer];
  if (viewToDetach) {
    const declarationLContainer = viewToDetach[17];
    null !== declarationLContainer &&
      declarationLContainer !== lContainer &&
      detachMovedView(declarationLContainer, viewToDetach),
      removeIndex > 0 && (lContainer[indexInContainer - 1][4] = viewToDetach[4]);
    const removedLView = removeFromArray(lContainer, 10 + removeIndex);
    applyView(viewToDetach[1], (lView = viewToDetach), lView[11], 2, null, null),
      (lView[0] = null),
      (lView[6] = null);
    const lQueries = removedLView[19];
    null !== lQueries && lQueries.detachView(removedLView[1]),
      (viewToDetach[3] = null),
      (viewToDetach[4] = null),
      (viewToDetach[2] &= -129);
  }
  var lView;
  return viewToDetach;
}
function destroyLView(tView, lView) {
  if (!(256 & lView[2])) {
    const renderer = lView[11];
    isProceduralRenderer(renderer) &&
      renderer.destroyNode &&
      applyView(tView, lView, renderer, 3, null, null),
      (function (rootView) {
        let lViewOrLContainer = rootView[13];
        if (!lViewOrLContainer) return cleanUpView(rootView[1], rootView);
        for (; lViewOrLContainer; ) {
          let next = null;
          if (isLView(lViewOrLContainer)) next = lViewOrLContainer[13];
          else {
            const firstView = lViewOrLContainer[10];
            firstView && (next = firstView);
          }
          if (!next) {
            for (; lViewOrLContainer && !lViewOrLContainer[4] && lViewOrLContainer !== rootView; )
              isLView(lViewOrLContainer) && cleanUpView(lViewOrLContainer[1], lViewOrLContainer),
                (lViewOrLContainer = lViewOrLContainer[3]);
            null === lViewOrLContainer && (lViewOrLContainer = rootView),
              isLView(lViewOrLContainer) && cleanUpView(lViewOrLContainer[1], lViewOrLContainer),
              (next = lViewOrLContainer && lViewOrLContainer[4]);
          }
          lViewOrLContainer = next;
        }
      })(lView);
  }
}
function cleanUpView(tView, lView) {
  if (!(256 & lView[2])) {
    (lView[2] &= -129),
      (lView[2] |= 256),
      (function (tView, lView) {
        let destroyHooks;
        if (null != tView && null != (destroyHooks = tView.destroyHooks))
          for (let i = 0; i < destroyHooks.length; i += 2) {
            const context = lView[destroyHooks[i]];
            if (!(context instanceof NodeInjectorFactory)) {
              const toCall = destroyHooks[i + 1];
              if (Array.isArray(toCall))
                for (let j = 0; j < toCall.length; j += 2) toCall[j + 1].call(context[toCall[j]]);
              else toCall.call(context);
            }
          }
      })(tView, lView),
      (function (tView, lView) {
        const tCleanup = tView.cleanup,
          lCleanup = lView[7];
        let lastLCleanupIndex = -1;
        if (null !== tCleanup) {
          for (let i = 0; i < tCleanup.length - 1; i += 2)
            if ('string' == typeof tCleanup[i]) {
              const idxOrTargetGetter = tCleanup[i + 1],
                target =
                  'function' == typeof idxOrTargetGetter
                    ? idxOrTargetGetter(lView)
                    : unwrapRNode(lView[idxOrTargetGetter]),
                listener = lCleanup[(lastLCleanupIndex = tCleanup[i + 2])],
                useCaptureOrSubIdx = tCleanup[i + 3];
              'boolean' == typeof useCaptureOrSubIdx
                ? target.removeEventListener(tCleanup[i], listener, useCaptureOrSubIdx)
                : useCaptureOrSubIdx >= 0
                ? lCleanup[(lastLCleanupIndex = useCaptureOrSubIdx)]()
                : lCleanup[(lastLCleanupIndex = -useCaptureOrSubIdx)].unsubscribe(),
                (i += 2);
            } else {
              const context = lCleanup[(lastLCleanupIndex = tCleanup[i + 1])];
              tCleanup[i].call(context);
            }
          if (null !== lCleanup)
            for (let i = lastLCleanupIndex + 1; i < lCleanup.length; i++) (0, lCleanup[i])();
          lView[7] = null;
        }
      })(tView, lView),
      1 === lView[1].type && isProceduralRenderer(lView[11]) && lView[11].destroy();
    const declarationContainer = lView[17];
    if (null !== declarationContainer && isLContainer(lView[3])) {
      declarationContainer !== lView[3] && detachMovedView(declarationContainer, lView);
      const lQueries = lView[19];
      null !== lQueries && lQueries.detachView(tView);
    }
  }
}
function nativeInsertBefore(renderer, parent, child, beforeNode, isMove) {
  isProceduralRenderer(renderer)
    ? renderer.insertBefore(parent, child, beforeNode, isMove)
    : parent.insertBefore(child, beforeNode, isMove);
}
function nativeAppendChild(renderer, parent, child) {
  isProceduralRenderer(renderer) ? renderer.appendChild(parent, child) : parent.appendChild(child);
}
function nativeAppendOrInsertBefore(renderer, parent, child, beforeNode, isMove) {
  null !== beforeNode
    ? nativeInsertBefore(renderer, parent, child, beforeNode, isMove)
    : nativeAppendChild(renderer, parent, child);
}
function nativeParentNode(renderer, node) {
  return isProceduralRenderer(renderer) ? renderer.parentNode(node) : node.parentNode;
}
function appendChild(tView, lView, childRNode, childTNode) {
  const parentRNode = (function (tView, tNode, lView) {
      return (function (tView, tNode, lView) {
        let parentTNode = tNode;
        for (; null !== parentTNode && 40 & parentTNode.type; )
          parentTNode = (tNode = parentTNode).parent;
        if (null === parentTNode) return lView[0];
        if (2 & parentTNode.flags) {
          const encapsulation = tView.data[parentTNode.directiveStart].encapsulation;
          if (
            encapsulation === ViewEncapsulation.None ||
            encapsulation === ViewEncapsulation.Emulated
          )
            return null;
        }
        return getNativeByTNode(parentTNode, lView);
      })(tView, tNode.parent, lView);
    })(tView, childTNode, lView),
    renderer = lView[11],
    anchorNode = (function (parentTNode, currentTNode, lView) {
      return (function (parentTNode, currentTNode, lView) {
        return 40 & parentTNode.type ? getNativeByTNode(parentTNode, lView) : null;
      })(parentTNode, 0, lView);
    })(childTNode.parent || lView[6], 0, lView);
  if (null != parentRNode)
    if (Array.isArray(childRNode))
      for (let i = 0; i < childRNode.length; i++)
        nativeAppendOrInsertBefore(renderer, parentRNode, childRNode[i], anchorNode, !1);
    else nativeAppendOrInsertBefore(renderer, parentRNode, childRNode, anchorNode, !1);
}
function applyNodes(renderer, action, tNode, lView, parentRElement, beforeNode, isProjection) {
  for (; null != tNode; ) {
    const rawSlotValue = lView[tNode.index],
      tNodeType = tNode.type;
    if (
      (isProjection &&
        0 === action &&
        (rawSlotValue && attachPatchData(unwrapRNode(rawSlotValue), lView), (tNode.flags |= 4)),
      64 != (64 & tNode.flags))
    )
      if (8 & tNodeType)
        applyNodes(renderer, action, tNode.child, lView, parentRElement, beforeNode, !1),
          applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode);
      else if (32 & tNodeType) {
        const nextRNode = icuContainerIterate();
        let rNode;
        for (; (rNode = nextRNode()); )
          applyToElementOrContainer(action, renderer, parentRElement, rNode, beforeNode);
        applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode);
      } else
        16 & tNodeType
          ? applyProjectionRecursive(renderer, action, lView, tNode, parentRElement, beforeNode)
          : applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode);
    tNode = isProjection ? tNode.projectionNext : tNode.next;
  }
}
function applyView(tView, lView, renderer, action, parentRElement, beforeNode) {
  applyNodes(renderer, action, tView.firstChild, lView, parentRElement, beforeNode, !1);
}
function applyProjectionRecursive(
  renderer,
  action,
  lView,
  tProjectionNode,
  parentRElement,
  beforeNode,
) {
  const componentLView = lView[16],
    nodeToProjectOrRNodes = componentLView[6].projection[tProjectionNode.projection];
  if (Array.isArray(nodeToProjectOrRNodes))
    for (let i = 0; i < nodeToProjectOrRNodes.length; i++)
      applyToElementOrContainer(
        action,
        renderer,
        parentRElement,
        nodeToProjectOrRNodes[i],
        beforeNode,
      );
  else
    applyNodes(
      renderer,
      action,
      nodeToProjectOrRNodes,
      componentLView[3],
      parentRElement,
      beforeNode,
      !0,
    );
}
function writeDirectStyle(renderer, element, newValue) {
  isProceduralRenderer(renderer)
    ? renderer.setAttribute(element, 'style', newValue)
    : (element.style.cssText = newValue);
}
function writeDirectClass(renderer, element, newValue) {
  isProceduralRenderer(renderer)
    ? '' === newValue
      ? renderer.removeAttribute(element, 'class')
      : renderer.setAttribute(element, 'class', newValue)
    : (element.className = newValue);
}
function classIndexOf(className, classToSearch, startingIndex) {
  let end = className.length;
  for (;;) {
    const foundIndex = className.indexOf(classToSearch, startingIndex);
    if (-1 === foundIndex) return foundIndex;
    if (0 === foundIndex || className.charCodeAt(foundIndex - 1) <= 32) {
      const length = classToSearch.length;
      if (foundIndex + length === end || className.charCodeAt(foundIndex + length) <= 32)
        return foundIndex;
    }
    startingIndex = foundIndex + 1;
  }
}
function isCssClassMatching(attrs, cssClassToMatch, isProjectionMode) {
  let i = 0;
  for (; i < attrs.length; ) {
    let item = attrs[i++];
    if (isProjectionMode && 'class' === item) {
      if (((item = attrs[i]), -1 !== classIndexOf(item.toLowerCase(), cssClassToMatch, 0)))
        return !0;
    } else if (1 === item) {
      for (; i < attrs.length && 'string' == typeof (item = attrs[i++]); )
        if (item.toLowerCase() === cssClassToMatch) return !0;
      return !1;
    }
  }
  return !1;
}
function isInlineTemplate(tNode) {
  return 4 === tNode.type && 'ng-template' !== tNode.value;
}
function hasTagAndTypeMatch(tNode, currentSelector, isProjectionMode) {
  return currentSelector === (4 !== tNode.type || isProjectionMode ? tNode.value : 'ng-template');
}
function isNodeMatchingSelector(tNode, selector, isProjectionMode) {
  let mode = 4;
  const nodeAttrs = tNode.attrs || [],
    nameOnlyMarkerIdx = (function (nodeAttrs) {
      for (let i = 0; i < nodeAttrs.length; i++)
        if (3 === (marker = nodeAttrs[i]) || 4 === marker || 6 === marker) return i;
      var marker;
      return nodeAttrs.length;
    })(nodeAttrs);
  let skipToNextSelector = !1;
  for (let i = 0; i < selector.length; i++) {
    const current = selector[i];
    if ('number' != typeof current) {
      if (!skipToNextSelector)
        if (4 & mode) {
          if (
            ((mode = 2 | (1 & mode)),
            ('' !== current && !hasTagAndTypeMatch(tNode, current, isProjectionMode)) ||
              ('' === current && 1 === selector.length))
          ) {
            if (isPositive(mode)) return !1;
            skipToNextSelector = !0;
          }
        } else {
          const selectorAttrValue = 8 & mode ? current : selector[++i];
          if (8 & mode && null !== tNode.attrs) {
            if (!isCssClassMatching(tNode.attrs, selectorAttrValue, isProjectionMode)) {
              if (isPositive(mode)) return !1;
              skipToNextSelector = !0;
            }
            continue;
          }
          const attrIndexInNode = findAttrIndexInNode(
            8 & mode ? 'class' : current,
            nodeAttrs,
            isInlineTemplate(tNode),
            isProjectionMode,
          );
          if (-1 === attrIndexInNode) {
            if (isPositive(mode)) return !1;
            skipToNextSelector = !0;
            continue;
          }
          if ('' !== selectorAttrValue) {
            let nodeAttrValue;
            nodeAttrValue =
              attrIndexInNode > nameOnlyMarkerIdx
                ? ''
                : nodeAttrs[attrIndexInNode + 1].toLowerCase();
            const compareAgainstClassName = 8 & mode ? nodeAttrValue : null;
            if (
              (compareAgainstClassName &&
                -1 !== classIndexOf(compareAgainstClassName, selectorAttrValue, 0)) ||
              (2 & mode && selectorAttrValue !== nodeAttrValue)
            ) {
              if (isPositive(mode)) return !1;
              skipToNextSelector = !0;
            }
          }
        }
    } else {
      if (!skipToNextSelector && !isPositive(mode) && !isPositive(current)) return !1;
      if (skipToNextSelector && isPositive(current)) continue;
      (skipToNextSelector = !1), (mode = current | (1 & mode));
    }
  }
  return isPositive(mode) || skipToNextSelector;
}
function isPositive(mode) {
  return 0 == (1 & mode);
}
function findAttrIndexInNode(name, attrs, isInlineTemplate, isProjectionMode) {
  if (null === attrs) return -1;
  let i = 0;
  if (isProjectionMode || !isInlineTemplate) {
    let bindingsMode = !1;
    for (; i < attrs.length; ) {
      const maybeAttrName = attrs[i];
      if (maybeAttrName === name) return i;
      if (3 === maybeAttrName || 6 === maybeAttrName) bindingsMode = !0;
      else {
        if (1 === maybeAttrName || 2 === maybeAttrName) {
          let value = attrs[++i];
          for (; 'string' == typeof value; ) value = attrs[++i];
          continue;
        }
        if (4 === maybeAttrName) break;
        if (0 === maybeAttrName) {
          i += 4;
          continue;
        }
      }
      i += bindingsMode ? 1 : 2;
    }
    return -1;
  }
  return (function (attrs, name) {
    let i = attrs.indexOf(4);
    if (i > -1)
      for (i++; i < attrs.length; ) {
        const attr = attrs[i];
        if ('number' == typeof attr) return -1;
        if (attr === name) return i;
        i++;
      }
    return -1;
  })(attrs, name);
}
function isNodeMatchingSelectorList(tNode, selector, isProjectionMode = !1) {
  for (let i = 0; i < selector.length; i++)
    if (isNodeMatchingSelector(tNode, selector[i], isProjectionMode)) return !0;
  return !1;
}
function maybeWrapInNotSelector(isNegativeMode, chunk) {
  return isNegativeMode ? ':not(' + chunk.trim() + ')' : chunk;
}
function stringifyCSSSelector(selector) {
  let result = selector[0],
    i = 1,
    mode = 2,
    currentChunk = '',
    isNegativeMode = !1;
  for (; i < selector.length; ) {
    let valueOrMarker = selector[i];
    if ('string' == typeof valueOrMarker)
      if (2 & mode) {
        const attrValue = selector[++i];
        currentChunk +=
          '[' + valueOrMarker + (attrValue.length > 0 ? '="' + attrValue + '"' : '') + ']';
      } else
        8 & mode
          ? (currentChunk += '.' + valueOrMarker)
          : 4 & mode && (currentChunk += ' ' + valueOrMarker);
    else
      '' === currentChunk ||
        isPositive(valueOrMarker) ||
        ((result += maybeWrapInNotSelector(isNegativeMode, currentChunk)), (currentChunk = '')),
        (mode = valueOrMarker),
        (isNegativeMode = isNegativeMode || !isPositive(mode));
    i++;
  }
  return (
    '' !== currentChunk && (result += maybeWrapInNotSelector(isNegativeMode, currentChunk)), result
  );
}

const NO_CHANGE = {};
function ɵɵadvance(delta) {
  selectIndexInternal(getTView(), getLView(), getSelectedIndex() + delta, isInCheckNoChangesMode());
}
function selectIndexInternal(tView, lView, index, checkNoChangesMode) {
  if (!checkNoChangesMode)
    if (3 == (3 & lView[2])) {
      const preOrderCheckHooks = tView.preOrderCheckHooks;
      null !== preOrderCheckHooks && executeCheckHooks(lView, preOrderCheckHooks, index);
    } else {
      const preOrderHooks = tView.preOrderHooks;
      null !== preOrderHooks && executeInitAndCheckHooks(lView, preOrderHooks, 0, index);
    }
  setSelectedIndex(index);
}
function toTStylingRange(prev, next) {
  return (prev << 17) | (next << 2);
}
function getTStylingRangePrev(tStylingRange) {
  return (tStylingRange >> 17) & 32767;
}
function setTStylingRangePrevDuplicate(tStylingRange) {
  return 2 | tStylingRange;
}
function getTStylingRangeNext(tStylingRange) {
  return (131068 & tStylingRange) >> 2;
}
function setTStylingRangeNext(tStylingRange, next) {
  return (-131069 & tStylingRange) | (next << 2);
}
function setTStylingRangeNextDuplicate(tStylingRange) {
  return 1 | tStylingRange;
}
function refreshContentQueries(tView, lView) {
  const contentQueries = tView.contentQueries;
  if (null !== contentQueries)
    for (let i = 0; i < contentQueries.length; i += 2) {
      const queryStartIdx = contentQueries[i],
        directiveDefIdx = contentQueries[i + 1];
      if (-1 !== directiveDefIdx) {
        const directiveDef = tView.data[directiveDefIdx];
        setCurrentQueryIndex(queryStartIdx),
          directiveDef.contentQueries(2, lView[directiveDefIdx], directiveDefIdx);
      }
    }
}
function createLView(
  parentLView,
  tView,
  context,
  flags,
  host,
  tHostNode,
  rendererFactory,
  renderer,
  sanitizer,
  injector,
) {
  const lView = tView.blueprint.slice();
  return (
    (lView[0] = host),
    (lView[2] = 140 | flags),
    resetPreOrderHookFlags(lView),
    (lView[3] = lView[15] = parentLView),
    (lView[8] = context),
    (lView[10] = rendererFactory || (parentLView && parentLView[10])),
    (lView[11] = renderer || (parentLView && parentLView[11])),
    (lView[12] = sanitizer || (parentLView && parentLView[12]) || null),
    (lView[9] = injector || (parentLView && parentLView[9]) || null),
    (lView[6] = tHostNode),
    (lView[16] = 2 == tView.type ? parentLView[16] : lView),
    lView
  );
}
function getOrCreateTNode(tView, index, type, name, attrs) {
  let tNode = tView.data[index];
  if (null === tNode)
    (tNode = (function (tView, index, type, name, attrs) {
      const currentTNode = getCurrentTNodePlaceholderOk(),
        isParent = isCurrentTNodeParent(),
        tNode = (tView.data[index] = (function (tView, tParent, type, index, value, attrs) {
          return {
            type: type,
            index: index,
            insertBeforeIndex: null,
            injectorIndex: tParent ? tParent.injectorIndex : -1,
            directiveStart: -1,
            directiveEnd: -1,
            directiveStylingLast: -1,
            propertyBindings: null,
            flags: 0,
            providerIndexes: 0,
            value: value,
            attrs: attrs,
            mergedAttrs: null,
            localNames: null,
            initialInputs: void 0,
            inputs: null,
            outputs: null,
            tViews: null,
            next: null,
            projectionNext: null,
            child: null,
            parent: tParent,
            projection: null,
            styles: null,
            stylesWithoutHost: null,
            residualStyles: void 0,
            classes: null,
            classesWithoutHost: null,
            residualClasses: void 0,
            classBindings: 0,
            styleBindings: 0,
          };
        })(
          0,
          isParent ? currentTNode : currentTNode && currentTNode.parent,
          type,
          index,
          name,
          attrs,
        ));
      return (
        null === tView.firstChild && (tView.firstChild = tNode),
        null !== currentTNode &&
          (isParent
            ? null == currentTNode.child && null !== tNode.parent && (currentTNode.child = tNode)
            : null === currentTNode.next && (currentTNode.next = tNode)),
        tNode
      );
    })(tView, index, type, name, attrs)),
      instructionState.lFrame.inI18n && (tNode.flags |= 64);
  else if (64 & tNode.type) {
    (tNode.type = type), (tNode.value = name), (tNode.attrs = attrs);
    const parent = (function () {
      const lFrame = instructionState.lFrame,
        currentTNode = lFrame.currentTNode;
      return lFrame.isParent ? currentTNode : currentTNode.parent;
    })();
    tNode.injectorIndex = null === parent ? -1 : parent.injectorIndex;
  }
  return setCurrentTNode(tNode, !0), tNode;
}
function allocExpando(tView, lView, numSlotsToAlloc, initialValue) {
  if (0 === numSlotsToAlloc) return -1;
  const allocIdx = lView.length;
  for (let i = 0; i < numSlotsToAlloc; i++)
    lView.push(initialValue), tView.blueprint.push(initialValue), tView.data.push(null);
  return allocIdx;
}
function renderView(tView, lView, context) {
  enterView(lView);
  try {
    const viewQuery = tView.viewQuery;
    null !== viewQuery && executeViewQueryFn(1, viewQuery, context);
    const templateFn = tView.template;
    null !== templateFn && executeTemplate(tView, lView, templateFn, 1, context),
      tView.firstCreatePass && (tView.firstCreatePass = !1),
      tView.staticContentQueries && refreshContentQueries(tView, lView),
      tView.staticViewQueries && executeViewQueryFn(2, tView.viewQuery, context);
    const components = tView.components;
    null !== components &&
      (function (hostLView, components) {
        for (let i = 0; i < components.length; i++) renderComponent(hostLView, components[i]);
      })(lView, components);
  } catch (error) {
    throw (tView.firstCreatePass && (tView.incompleteFirstPass = !0), error);
  } finally {
    (lView[2] &= -5), leaveView();
  }
}
function refreshView(tView, lView, templateFn, context) {
  const flags = lView[2];
  if (256 == (256 & flags)) return;
  enterView(lView);
  const isInCheckNoChangesPass = isInCheckNoChangesMode();
  try {
    resetPreOrderHookFlags(lView),
      (instructionState.lFrame.bindingIndex = tView.bindingStartIndex),
      null !== templateFn && executeTemplate(tView, lView, templateFn, 2, context);
    const hooksInitPhaseCompleted = 3 == (3 & flags);
    if (!isInCheckNoChangesPass)
      if (hooksInitPhaseCompleted) {
        const preOrderCheckHooks = tView.preOrderCheckHooks;
        null !== preOrderCheckHooks && executeCheckHooks(lView, preOrderCheckHooks, null);
      } else {
        const preOrderHooks = tView.preOrderHooks;
        null !== preOrderHooks && executeInitAndCheckHooks(lView, preOrderHooks, 0, null),
          incrementInitPhaseFlags(lView, 0);
      }
    if (
      ((function (lView) {
        for (
          let lContainer = getFirstLContainer(lView);
          null !== lContainer;
          lContainer = getNextLContainer(lContainer)
        ) {
          if (!lContainer[2]) continue;
          const movedViews = lContainer[9];
          for (let i = 0; i < movedViews.length; i++) {
            const movedLView = movedViews[i],
              insertionLContainer = movedLView[3];
            0 == (1024 & movedLView[2]) && updateTransplantedViewCount(insertionLContainer, 1),
              (movedLView[2] |= 1024);
          }
        }
      })(lView),
      (function (lView) {
        for (
          let lContainer = getFirstLContainer(lView);
          null !== lContainer;
          lContainer = getNextLContainer(lContainer)
        )
          for (let i = 10; i < lContainer.length; i++) {
            const embeddedLView = lContainer[i],
              embeddedTView = embeddedLView[1];
            viewAttachedToChangeDetector(embeddedLView) &&
              refreshView(embeddedTView, embeddedLView, embeddedTView.template, embeddedLView[8]);
          }
      })(lView),
      null !== tView.contentQueries && refreshContentQueries(tView, lView),
      !isInCheckNoChangesPass)
    )
      if (hooksInitPhaseCompleted) {
        const contentCheckHooks = tView.contentCheckHooks;
        null !== contentCheckHooks && executeCheckHooks(lView, contentCheckHooks);
      } else {
        const contentHooks = tView.contentHooks;
        null !== contentHooks && executeInitAndCheckHooks(lView, contentHooks, 1),
          incrementInitPhaseFlags(lView, 1);
      }
    !(function (tView, lView) {
      const hostBindingOpCodes = tView.hostBindingOpCodes;
      if (null !== hostBindingOpCodes)
        try {
          for (let i = 0; i < hostBindingOpCodes.length; i++) {
            const opCode = hostBindingOpCodes[i];
            if (opCode < 0) setSelectedIndex(~opCode);
            else {
              const directiveIdx = opCode,
                bindingRootIndx = hostBindingOpCodes[++i],
                hostBindingFn = hostBindingOpCodes[++i];
              setBindingRootForHostBindings(bindingRootIndx, directiveIdx),
                hostBindingFn(2, lView[directiveIdx]);
            }
          }
        } finally {
          setSelectedIndex(-1);
        }
    })(tView, lView);
    const components = tView.components;
    null !== components &&
      (function (hostLView, components) {
        for (let i = 0; i < components.length; i++) refreshComponent(hostLView, components[i]);
      })(lView, components);
    const viewQuery = tView.viewQuery;
    if ((null !== viewQuery && executeViewQueryFn(2, viewQuery, context), !isInCheckNoChangesPass))
      if (hooksInitPhaseCompleted) {
        const viewCheckHooks = tView.viewCheckHooks;
        null !== viewCheckHooks && executeCheckHooks(lView, viewCheckHooks);
      } else {
        const viewHooks = tView.viewHooks;
        null !== viewHooks && executeInitAndCheckHooks(lView, viewHooks, 2),
          incrementInitPhaseFlags(lView, 2);
      }
    !0 === tView.firstUpdatePass && (tView.firstUpdatePass = !1),
      isInCheckNoChangesPass || (lView[2] &= -73),
      1024 & lView[2] && ((lView[2] &= -1025), updateTransplantedViewCount(lView[3], -1));
  } finally {
    leaveView();
  }
}
function renderComponentOrTemplate(tView, lView, templateFn, context) {
  const rendererFactory = lView[10],
    normalExecutionPath = !isInCheckNoChangesMode(),
    creationModeIsActive = 4 == (4 & lView[2]);
  try {
    normalExecutionPath &&
      !creationModeIsActive &&
      rendererFactory.begin &&
      rendererFactory.begin(),
      creationModeIsActive && renderView(tView, lView, context),
      refreshView(tView, lView, templateFn, context);
  } finally {
    normalExecutionPath && !creationModeIsActive && rendererFactory.end && rendererFactory.end();
  }
}
function executeTemplate(tView, lView, templateFn, rf, context) {
  const prevSelectedIndex = getSelectedIndex();
  try {
    setSelectedIndex(-1),
      2 & rf &&
        lView.length > 20 &&
        selectIndexInternal(tView, lView, 20, isInCheckNoChangesMode()),
      templateFn(rf, context);
  } finally {
    setSelectedIndex(prevSelectedIndex);
  }
}
function createDirectivesInstances(tView, lView, tNode) {
  !(function (tView, lView, tNode, native) {
    const start = tNode.directiveStart,
      end = tNode.directiveEnd;
    tView.firstCreatePass || getOrCreateNodeInjectorForNode(tNode, lView),
      attachPatchData(native, lView);
    const initialInputs = tNode.initialInputs;
    for (let i = start; i < end; i++) {
      const def = tView.data[i],
        isComponent = isComponentDef(def);
      isComponent && addComponentLogic(lView, tNode, def);
      const directive = getNodeInjectable(lView, tView, i, tNode);
      attachPatchData(directive, lView),
        null !== initialInputs &&
          setInputsFromAttrs(0, i - start, directive, def, 0, initialInputs),
        isComponent && (getComponentLViewByIndex(tNode.index, lView)[8] = directive);
    }
  })(tView, lView, tNode, getNativeByTNode(tNode, lView)),
    128 == (128 & tNode.flags) &&
      (function (tView, lView, tNode) {
        const start = tNode.directiveStart,
          end = tNode.directiveEnd,
          elementIndex = tNode.index,
          currentDirectiveIndex = instructionState.lFrame.currentDirectiveIndex;
        try {
          setSelectedIndex(elementIndex);
          for (let dirIndex = start; dirIndex < end; dirIndex++) {
            const def = tView.data[dirIndex],
              directive = lView[dirIndex];
            setCurrentDirectiveIndex(dirIndex),
              (null === def.hostBindings && 0 === def.hostVars && null === def.hostAttrs) ||
                invokeHostBindingsInCreationMode(def, directive);
          }
        } finally {
          setSelectedIndex(-1), setCurrentDirectiveIndex(currentDirectiveIndex);
        }
      })(tView, lView, tNode);
}
function saveResolvedLocalsInData(viewData, tNode, localRefExtractor = getNativeByTNode) {
  const localNames = tNode.localNames;
  if (null !== localNames) {
    let localIndex = tNode.index + 1;
    for (let i = 0; i < localNames.length; i += 2) {
      const index = localNames[i + 1],
        value = -1 === index ? localRefExtractor(tNode, viewData) : viewData[index];
      viewData[localIndex++] = value;
    }
  }
}
function getOrCreateTComponentView(def) {
  const tView = def.tView;
  return null === tView || tView.incompleteFirstPass
    ? (def.tView = createTView(
        1,
        null,
        def.template,
        def.decls,
        def.vars,
        def.directiveDefs,
        def.pipeDefs,
        def.viewQuery,
        def.schemas,
        def.consts,
      ))
    : tView;
}
function createTView(
  type,
  declTNode,
  templateFn,
  decls,
  vars,
  directives,
  pipes,
  viewQuery,
  schemas,
  constsOrFactory,
) {
  const bindingStartIndex = 20 + decls,
    initialViewLength = bindingStartIndex + vars,
    blueprint = (function (bindingStartIndex, initialViewLength) {
      const blueprint = [];
      for (let i = 0; i < initialViewLength; i++)
        blueprint.push(i < bindingStartIndex ? null : NO_CHANGE);
      return blueprint;
    })(bindingStartIndex, initialViewLength),
    consts = 'function' == typeof constsOrFactory ? constsOrFactory() : constsOrFactory;
  return (blueprint[1] = {
    type: type,
    blueprint: blueprint,
    template: templateFn,
    queries: null,
    viewQuery: viewQuery,
    declTNode: declTNode,
    data: blueprint.slice().fill(null, bindingStartIndex),
    bindingStartIndex: bindingStartIndex,
    expandoStartIndex: initialViewLength,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: 'function' == typeof directives ? directives() : directives,
    pipeRegistry: 'function' == typeof pipes ? pipes() : pipes,
    firstChild: null,
    schemas: schemas,
    consts: consts,
    incompleteFirstPass: !1,
  });
}
function generatePropertyAliases(inputAliasMap, directiveDefIdx, propStore) {
  for (let publicName in inputAliasMap)
    if (inputAliasMap.hasOwnProperty(publicName)) {
      const internalName = inputAliasMap[publicName];
      (propStore = null === propStore ? {} : propStore).hasOwnProperty(publicName)
        ? propStore[publicName].push(directiveDefIdx, internalName)
        : (propStore[publicName] = [directiveDefIdx, internalName]);
    }
  return propStore;
}
function resolveDirectives(tView, lView, tNode, localRefs) {
  let hasDirectives = !1;
  {
    const directiveDefs = (function (tView, viewData, tNode) {
        const registry = tView.directiveRegistry;
        let matches = null;
        if (registry)
          for (let i = 0; i < registry.length; i++) {
            const def = registry[i];
            isNodeMatchingSelectorList(tNode, def.selectors, !1) &&
              (matches || (matches = []),
              diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, viewData), tView, def.type),
              isComponentDef(def)
                ? (markAsComponentHost(tView, tNode), matches.unshift(def))
                : matches.push(def));
          }
        return matches;
      })(tView, lView, tNode),
      exportsMap =
        null === localRefs
          ? null
          : {
              '': -1,
            };
    if (null !== directiveDefs) {
      (hasDirectives = !0), initTNodeFlags(tNode, tView.data.length, directiveDefs.length);
      for (let i = 0; i < directiveDefs.length; i++) {
        const def = directiveDefs[i];
        def.providersResolver && def.providersResolver(def);
      }
      let preOrderHooksFound = !1,
        preOrderCheckHooksFound = !1,
        directiveIdx = allocExpando(tView, lView, directiveDefs.length, null);
      for (let i = 0; i < directiveDefs.length; i++) {
        const def = directiveDefs[i];
        (tNode.mergedAttrs = mergeHostAttrs(tNode.mergedAttrs, def.hostAttrs)),
          configureViewWithDirective(tView, tNode, lView, directiveIdx, def),
          saveNameToExportMap(directiveIdx, def, exportsMap),
          null !== def.contentQueries && (tNode.flags |= 8),
          (null === def.hostBindings && null === def.hostAttrs && 0 === def.hostVars) ||
            (tNode.flags |= 128);
        const lifeCycleHooks = def.type.prototype;
        !preOrderHooksFound &&
          (lifeCycleHooks.ngOnChanges || lifeCycleHooks.ngOnInit || lifeCycleHooks.ngDoCheck) &&
          ((tView.preOrderHooks || (tView.preOrderHooks = [])).push(tNode.index),
          (preOrderHooksFound = !0)),
          preOrderCheckHooksFound ||
            (!lifeCycleHooks.ngOnChanges && !lifeCycleHooks.ngDoCheck) ||
            ((tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(tNode.index),
            (preOrderCheckHooksFound = !0)),
          directiveIdx++;
      }
      !(function (tView, tNode) {
        const end = tNode.directiveEnd,
          tViewData = tView.data,
          tNodeAttrs = tNode.attrs,
          inputsFromAttrs = [];
        let inputsStore = null,
          outputsStore = null;
        for (let i = tNode.directiveStart; i < end; i++) {
          const directiveDef = tViewData[i],
            directiveInputs = directiveDef.inputs,
            initialInputs =
              null === tNodeAttrs || isInlineTemplate(tNode)
                ? null
                : generateInitialInputs(directiveInputs, tNodeAttrs);
          inputsFromAttrs.push(initialInputs),
            (inputsStore = generatePropertyAliases(directiveInputs, i, inputsStore)),
            (outputsStore = generatePropertyAliases(directiveDef.outputs, i, outputsStore));
        }
        null !== inputsStore &&
          (inputsStore.hasOwnProperty('class') && (tNode.flags |= 16),
          inputsStore.hasOwnProperty('style') && (tNode.flags |= 32)),
          (tNode.initialInputs = inputsFromAttrs),
          (tNode.inputs = inputsStore),
          (tNode.outputs = outputsStore);
      })(tView, tNode);
    }
    exportsMap &&
      (function (tNode, localRefs, exportsMap) {
        if (localRefs) {
          const localNames = (tNode.localNames = []);
          for (let i = 0; i < localRefs.length; i += 2) {
            const index = exportsMap[localRefs[i + 1]];
            if (null == index)
              throw new RuntimeError('301', `Export of name '${localRefs[i + 1]}' not found!`);
            localNames.push(localRefs[i], index);
          }
        }
      })(tNode, localRefs, exportsMap);
  }
  return (tNode.mergedAttrs = mergeHostAttrs(tNode.mergedAttrs, tNode.attrs)), hasDirectives;
}
function registerHostBindingOpCodes(tView, tNode, lView, directiveIdx, directiveVarsIdx, def) {
  const hostBindings = def.hostBindings;
  if (hostBindings) {
    let hostBindingOpCodes = tView.hostBindingOpCodes;
    null === hostBindingOpCodes && (hostBindingOpCodes = tView.hostBindingOpCodes = []);
    const elementIndx = ~tNode.index;
    (function (hostBindingOpCodes) {
      let i = hostBindingOpCodes.length;
      for (; i > 0; ) {
        const value = hostBindingOpCodes[--i];
        if ('number' == typeof value && value < 0) return value;
      }
      return 0;
    })(hostBindingOpCodes) != elementIndx && hostBindingOpCodes.push(elementIndx),
      hostBindingOpCodes.push(directiveIdx, directiveVarsIdx, hostBindings);
  }
}
function invokeHostBindingsInCreationMode(def, directive) {
  null !== def.hostBindings && def.hostBindings(1, directive);
}
function markAsComponentHost(tView, hostTNode) {
  (hostTNode.flags |= 2), (tView.components || (tView.components = [])).push(hostTNode.index);
}
function saveNameToExportMap(directiveIdx, def, exportsMap) {
  if (exportsMap) {
    if (def.exportAs)
      for (let i = 0; i < def.exportAs.length; i++) exportsMap[def.exportAs[i]] = directiveIdx;
    isComponentDef(def) && (exportsMap[''] = directiveIdx);
  }
}
function initTNodeFlags(tNode, index, numberOfDirectives) {
  (tNode.flags |= 1),
    (tNode.directiveStart = index),
    (tNode.directiveEnd = index + numberOfDirectives),
    (tNode.providerIndexes = index);
}
function configureViewWithDirective(tView, tNode, lView, directiveIndex, def) {
  tView.data[directiveIndex] = def;
  const directiveFactory = def.factory || (def.factory = getFactoryDef(def.type)),
    nodeInjectorFactory = new NodeInjectorFactory(directiveFactory, isComponentDef(def), null);
  (tView.blueprint[directiveIndex] = nodeInjectorFactory),
    (lView[directiveIndex] = nodeInjectorFactory),
    registerHostBindingOpCodes(
      tView,
      tNode,
      0,
      directiveIndex,
      allocExpando(tView, lView, def.hostVars, NO_CHANGE),
      def,
    );
}
function addComponentLogic(lView, hostTNode, def) {
  const native = getNativeByTNode(hostTNode, lView),
    tView = getOrCreateTComponentView(def),
    rendererFactory = lView[10],
    componentView = addToViewTree(
      lView,
      createLView(
        lView,
        tView,
        null,
        def.onPush ? 64 : 16,
        native,
        hostTNode,
        rendererFactory,
        rendererFactory.createRenderer(native, def),
        null,
        null,
      ),
    );
  lView[hostTNode.index] = componentView;
}
function setInputsFromAttrs(lView, directiveIndex, instance, def, tNode, initialInputData) {
  const initialInputs = initialInputData[directiveIndex];
  if (null !== initialInputs) {
    const setInput = def.setInput;
    for (let i = 0; i < initialInputs.length; ) {
      const publicName = initialInputs[i++],
        privateName = initialInputs[i++],
        value = initialInputs[i++];
      null !== setInput
        ? def.setInput(instance, value, publicName, privateName)
        : (instance[privateName] = value);
    }
  }
}
function generateInitialInputs(inputs, attrs) {
  let inputsToStore = null,
    i = 0;
  for (; i < attrs.length; ) {
    const attrName = attrs[i];
    if (0 !== attrName)
      if (5 !== attrName) {
        if ('number' == typeof attrName) break;
        inputs.hasOwnProperty(attrName) &&
          (null === inputsToStore && (inputsToStore = []),
          inputsToStore.push(attrName, inputs[attrName], attrs[i + 1])),
          (i += 2);
      } else i += 2;
    else i += 4;
  }
  return inputsToStore;
}
function createLContainer(hostNative, currentView, native, tNode) {
  return new Array(hostNative, !0, !1, currentView, null, 0, tNode, native, null, null);
}
function refreshComponent(hostLView, componentHostIdx) {
  const componentView = getComponentLViewByIndex(componentHostIdx, hostLView);
  if (viewAttachedToChangeDetector(componentView)) {
    const tView = componentView[1];
    80 & componentView[2]
      ? refreshView(tView, componentView, tView.template, componentView[8])
      : componentView[5] > 0 &&
        (function refreshContainsDirtyView(lView) {
          for (
            let lContainer = getFirstLContainer(lView);
            null !== lContainer;
            lContainer = getNextLContainer(lContainer)
          )
            for (let i = 10; i < lContainer.length; i++) {
              const embeddedLView = lContainer[i];
              if (1024 & embeddedLView[2]) {
                const embeddedTView = embeddedLView[1];
                refreshView(embeddedTView, embeddedLView, embeddedTView.template, embeddedLView[8]);
              } else embeddedLView[5] > 0 && refreshContainsDirtyView(embeddedLView);
            }
          const components = lView[1].components;
          if (null !== components)
            for (let i = 0; i < components.length; i++) {
              const componentView = getComponentLViewByIndex(components[i], lView);
              viewAttachedToChangeDetector(componentView) &&
                componentView[5] > 0 &&
                refreshContainsDirtyView(componentView);
            }
        })(componentView);
  }
}
function renderComponent(hostLView, componentHostIdx) {
  const componentView = getComponentLViewByIndex(componentHostIdx, hostLView),
    componentTView = componentView[1];
  !(function (tView, lView) {
    for (let i = lView.length; i < tView.blueprint.length; i++) lView.push(tView.blueprint[i]);
  })(componentTView, componentView),
    renderView(componentTView, componentView, componentView[8]);
}
function addToViewTree(lView, lViewOrLContainer) {
  return (
    lView[13] ? (lView[14][4] = lViewOrLContainer) : (lView[13] = lViewOrLContainer),
    (lView[14] = lViewOrLContainer),
    lViewOrLContainer
  );
}
function markViewDirty(lView) {
  for (; lView; ) {
    lView[2] |= 64;
    const parent = getLViewParent(lView);
    if (0 != (512 & lView[2]) && !parent) return lView;
    lView = parent;
  }
  return null;
}
function detectChangesInternal(tView, lView, context) {
  const rendererFactory = lView[10];
  rendererFactory.begin && rendererFactory.begin();
  try {
    refreshView(tView, lView, tView.template, context);
  } catch (error) {
    throw (handleError(lView, error), error);
  } finally {
    rendererFactory.end && rendererFactory.end();
  }
}
function detectChangesInRootView(lView) {
  !(function (rootContext) {
    for (let i = 0; i < rootContext.components.length; i++) {
      const rootComponent = rootContext.components[i],
        lView = readPatchedLView(rootComponent),
        tView = lView[1];
      renderComponentOrTemplate(tView, lView, tView.template, rootComponent);
    }
  })(lView[8]);
}
function executeViewQueryFn(flags, viewQueryFn, component) {
  setCurrentQueryIndex(0), viewQueryFn(flags, component);
}
const CLEAN_PROMISE = (() => Promise.resolve(null))();
function getLCleanup(view) {
  return view[7] || (view[7] = []);
}
function handleError(lView, error) {
  const injector = lView[9],
    errorHandler = injector ? injector.get(ErrorHandler, null) : null;
  errorHandler && errorHandler.handleError(error);
}
function setInputsForProperty(tView, lView, inputs, publicName, value) {
  for (let i = 0; i < inputs.length; ) {
    const index = inputs[i++],
      privateName = inputs[i++],
      instance = lView[index],
      def = tView.data[index];
    null !== def.setInput
      ? def.setInput(instance, value, publicName, privateName)
      : (instance[privateName] = value);
  }
}

function computeStaticStyling(tNode, attrs, writeToHost) {
  let styles = writeToHost ? tNode.styles : null,
    classes = writeToHost ? tNode.classes : null,
    mode = 0;
  if (null !== attrs)
    for (let i = 0; i < attrs.length; i++) {
      const value = attrs[i];
      'number' == typeof value
        ? (mode = value)
        : 1 == mode
        ? (classes = concatStringsWithSpace(classes, value))
        : 2 == mode && (styles = concatStringsWithSpace(styles, value + ': ' + attrs[++i] + ';'));
    }
  writeToHost ? (tNode.styles = styles) : (tNode.stylesWithoutHost = styles),
    writeToHost ? (tNode.classes = classes) : (tNode.classesWithoutHost = classes);
}

const INJECTOR$1 = new InjectionToken('INJECTOR', -1);
class NullInjector {
  get(token, notFoundValue = THROW_IF_NOT_FOUND) {
    if (notFoundValue === THROW_IF_NOT_FOUND) {
      const error = new Error(`NullInjectorError: No provider for ${stringify(token)}!`);
      throw ((error.name = 'NullInjectorError'), error);
    }
    return notFoundValue;
  }
}
const INJECTOR_SCOPE = new InjectionToken('Set Injector scope.'),
  NOT_YET = {},
  CIRCULAR = {},
  EMPTY_ARRAY$1 = [];
let NULL_INJECTOR = void 0;
function getNullInjector() {
  return void 0 === NULL_INJECTOR && (NULL_INJECTOR = new NullInjector()), NULL_INJECTOR;
}
function createInjectorWithoutInjectorInstances(
  defType,
  parent = null,
  additionalProviders = null,
  name,
) {
  return new R3Injector(defType, additionalProviders, parent || getNullInjector(), name);
}
class R3Injector {
  constructor(def, additionalProviders, parent, source = null) {
    (this.parent = parent),
      (this.records = new Map()),
      (this.injectorDefTypes = new Set()),
      (this.onDestroy = new Set()),
      (this._destroyed = !1);
    const dedupStack = [];
    additionalProviders &&
      deepForEach(additionalProviders, (provider) =>
        this.processProvider(provider, def, additionalProviders),
      ),
      deepForEach([def], (injectorDef) => this.processInjectorType(injectorDef, [], dedupStack)),
      this.records.set(INJECTOR$1, makeRecord(void 0, this));
    const record = this.records.get(INJECTOR_SCOPE);
    (this.scope = null != record ? record.value : null),
      (this.source = source || ('object' == typeof def ? null : stringify(def)));
  }
  get destroyed() {
    return this._destroyed;
  }
  destroy() {
    this.assertNotDestroyed(), (this._destroyed = !0);
    try {
      this.onDestroy.forEach((service) => service.ngOnDestroy());
    } finally {
      this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear();
    }
  }
  get(token, notFoundValue = THROW_IF_NOT_FOUND, flags = InjectFlags.Default) {
    this.assertNotDestroyed();
    const previousInjector = setCurrentInjector(this);
    try {
      if (!(flags & InjectFlags.SkipSelf)) {
        let record = this.records.get(token);
        if (void 0 === record) {
          const def =
            ('function' == typeof (value = token) ||
              ('object' == typeof value && value instanceof InjectionToken)) &&
            getInjectableDef(token);
          (record =
            def && this.injectableDefInScope(def)
              ? makeRecord(injectableDefOrInjectorDefFactory(token), NOT_YET)
              : null),
            this.records.set(token, record);
        }
        if (null != record) return this.hydrate(token, record);
      }
      return (flags & InjectFlags.Self ? getNullInjector() : this.parent).get(
        token,
        (notFoundValue =
          flags & InjectFlags.Optional && notFoundValue === THROW_IF_NOT_FOUND
            ? null
            : notFoundValue),
      );
    } catch (e) {
      if ('NullInjectorError' === e.name) {
        if (
          ((e.ngTempTokenPath = e.ngTempTokenPath || []).unshift(stringify(token)),
          previousInjector)
        )
          throw e;
        return (function (e, token, injectorErrorName, source) {
          const tokenPath = e.ngTempTokenPath;
          throw (
            (token.__source && tokenPath.unshift(token.__source),
            (e.message = (function (text, obj, injectorErrorName, source = null) {
              text =
                text && '\n' === text.charAt(0) && 'ɵ' == text.charAt(1) ? text.substr(2) : text;
              let context = stringify(obj);
              if (Array.isArray(obj)) context = obj.map(stringify).join(' -> ');
              else if ('object' == typeof obj) {
                let parts = [];
                for (let key in obj)
                  if (obj.hasOwnProperty(key)) {
                    let value = obj[key];
                    parts.push(
                      key +
                        ':' +
                        ('string' == typeof value ? JSON.stringify(value) : stringify(value)),
                    );
                  }
                context = `{${parts.join(', ')}}`;
              }
              return `${injectorErrorName}${
                source ? '(' + source + ')' : ''
              }[${context}]: ${text.replace(NEW_LINE, '\n  ')}`;
            })(
              /**
               * @license
               * Copyright Google LLC All Rights Reserved.
               *
               * Use of this source code is governed by an MIT-style license that can be
               * found in the LICENSE file at https://angular.io/license
               */ '\n' + e.message,
              tokenPath,
              'R3InjectorError',
              source,
            )),
            (e.ngTokenPath = tokenPath),
            (e.ngTempTokenPath = null),
            e)
          );
        })(e, token, 0, this.source);
      }
      throw e;
    } finally {
      setCurrentInjector(previousInjector);
    }
    var value;
  }
  _resolveInjectorDefTypes() {
    this.injectorDefTypes.forEach((defType) => this.get(defType));
  }
  toString() {
    const tokens = [];
    return (
      this.records.forEach((v, token) => tokens.push(stringify(token))),
      `R3Injector[${tokens.join(', ')}]`
    );
  }
  assertNotDestroyed() {
    if (this._destroyed) throw new Error('Injector has already been destroyed.');
  }
  processInjectorType(defOrWrappedDef, parents, dedupStack) {
    if (!(defOrWrappedDef = resolveForwardRef(defOrWrappedDef))) return !1;
    let def = getInjectorDef(defOrWrappedDef);
    const ngModule = (null == def && defOrWrappedDef.ngModule) || void 0,
      defType = void 0 === ngModule ? defOrWrappedDef : ngModule,
      isDuplicate = -1 !== dedupStack.indexOf(defType);
    if ((void 0 !== ngModule && (def = getInjectorDef(ngModule)), null == def)) return !1;
    if (null != def.imports && !isDuplicate) {
      let importTypesWithProviders;
      dedupStack.push(defType);
      try {
        deepForEach(def.imports, (imported) => {
          this.processInjectorType(imported, parents, dedupStack) &&
            (void 0 === importTypesWithProviders && (importTypesWithProviders = []),
            importTypesWithProviders.push(imported));
        });
      } finally {
      }
      if (void 0 !== importTypesWithProviders)
        for (let i = 0; i < importTypesWithProviders.length; i++) {
          const { ngModule: ngModule, providers: providers } = importTypesWithProviders[i];
          deepForEach(providers, (provider) =>
            this.processProvider(provider, ngModule, providers || EMPTY_ARRAY$1),
          );
        }
    }
    this.injectorDefTypes.add(defType), this.records.set(defType, makeRecord(def.factory, NOT_YET));
    const defProviders = def.providers;
    if (null != defProviders && !isDuplicate) {
      const injectorType = defOrWrappedDef;
      deepForEach(defProviders, (provider) =>
        this.processProvider(provider, injectorType, defProviders),
      );
    }
    return void 0 !== ngModule && void 0 !== defOrWrappedDef.providers;
  }
  processProvider(provider, ngModuleType, providers) {
    let token = isTypeProvider((provider = resolveForwardRef(provider)))
      ? provider
      : resolveForwardRef(provider && provider.provide);
    const record = (function (provider, ngModuleType, providers) {
      return isValueProvider(provider)
        ? makeRecord(void 0, provider.useValue)
        : makeRecord(
            (function (provider, ngModuleType, providers) {
              let factory = void 0;
              if (isTypeProvider(provider)) {
                const unwrappedProvider = resolveForwardRef(provider);
                return (
                  getFactoryDef(unwrappedProvider) ||
                  injectableDefOrInjectorDefFactory(unwrappedProvider)
                );
              }
              if (isValueProvider(provider)) factory = () => resolveForwardRef(provider.useValue);
              else if ((value = provider) && value.useFactory)
                factory = () => provider.useFactory(...injectArgs(provider.deps || []));
              else if (
                (function (value) {
                  return !(!value || !value.useExisting);
                })(provider)
              )
                factory = () => ɵɵinject(resolveForwardRef(provider.useExisting));
              else {
                const classRef = resolveForwardRef(
                  provider && (provider.useClass || provider.provide),
                );
                if (
                  !(function (value) {
                    return !!value.deps;
                  })(provider)
                )
                  return getFactoryDef(classRef) || injectableDefOrInjectorDefFactory(classRef);
                factory = () => new classRef(...injectArgs(provider.deps));
              }
              var value;
              return factory;
            })(provider),
            NOT_YET,
          );
    })(provider);
    if (isTypeProvider(provider) || !0 !== provider.multi) this.records.get(token);
    else {
      let multiRecord = this.records.get(token);
      multiRecord ||
        ((multiRecord = makeRecord(void 0, NOT_YET, !0)),
        (multiRecord.factory = () => injectArgs(multiRecord.multi)),
        this.records.set(token, multiRecord)),
        (token = provider),
        multiRecord.multi.push(provider);
    }
    this.records.set(token, record);
  }
  hydrate(token, record) {
    var value;
    return (
      record.value === NOT_YET && ((record.value = CIRCULAR), (record.value = record.factory())),
      'object' == typeof record.value &&
        record.value &&
        null !== (value = record.value) &&
        'object' == typeof value &&
        'function' == typeof value.ngOnDestroy &&
        this.onDestroy.add(record.value),
      record.value
    );
  }
  injectableDefInScope(def) {
    return (
      !!def.providedIn &&
      ('string' == typeof def.providedIn
        ? 'any' === def.providedIn || def.providedIn === this.scope
        : this.injectorDefTypes.has(def.providedIn))
    );
  }
}
function injectableDefOrInjectorDefFactory(token) {
  const injectableDef = getInjectableDef(token),
    factory = null !== injectableDef ? injectableDef.factory : getFactoryDef(token);
  if (null !== factory) return factory;
  const injectorDef = getInjectorDef(token);
  if (null !== injectorDef) return injectorDef.factory;
  if (token instanceof InjectionToken)
    throw new Error(`Token ${stringify(token)} is missing a ɵprov definition.`);
  if (token instanceof Function)
    return (function (token) {
      const paramLength = token.length;
      if (paramLength > 0) {
        const args = (function (size, value) {
          const list = [];
          for (let i = 0; i < size; i++) list.push('?');
          return list;
        })(paramLength);
        throw new Error(
          `Can't resolve all parameters for ${stringify(token)}: (${args.join(', ')}).`,
        );
      }
      const inheritedInjectableDef = (function (type) {
        const def = type && (type[NG_PROV_DEF] || type[NG_INJECTABLE_DEF]);
        if (def) {
          const typeName = (function (type) {
            if (type.hasOwnProperty('name')) return type.name;
            const match = ('' + type).match(/^function\s*([^\s(]+)/);
            return null === match ? '' : match[1];
          })(type);
          return (
            console.warn(
              `DEPRECATED: DI is instantiating a token "${typeName}" that inherits its @Injectable decorator but does not provide one itself.\n` +
                `This will become an error in a future version of Angular. Please add @Injectable() to the "${typeName}" class.`,
            ),
            def
          );
        }
        return null;
      })(token);
      return null !== inheritedInjectableDef
        ? () => inheritedInjectableDef.factory(token)
        : () => new token();
    })(token);
  throw new Error('unreachable');
}
function makeRecord(factory, value, multi = !1) {
  return {
    factory: factory,
    value: value,
    multi: multi ? [] : void 0,
  };
}
function isValueProvider(value) {
  return null !== value && 'object' == typeof value && USE_VALUE in value;
}
function isTypeProvider(value) {
  return 'function' == typeof value;
}
const INJECTOR_IMPL = function (providers, parent, name) {
  return (function (defType, parent = null, additionalProviders = null, name) {
    const injector = createInjectorWithoutInjectorInstances(
      defType,
      parent,
      additionalProviders,
      name,
    );
    return injector._resolveInjectorDefTypes(), injector;
  })(
    {
      name: name,
    },
    parent,
    providers,
    name,
  );
};
let Injector = (() => {
  class Injector {
    static create(options, parent) {
      return Array.isArray(options)
        ? INJECTOR_IMPL(options, parent, '')
        : INJECTOR_IMPL(options.providers, options.parent, options.name || '');
    }
  }
  return (
    (Injector.THROW_IF_NOT_FOUND = THROW_IF_NOT_FOUND),
    (Injector.NULL = new NullInjector()),
    (Injector.ɵprov = ɵɵdefineInjectable({
      token: Injector,
      providedIn: 'any',
      factory: () => ɵɵinject(INJECTOR$1),
    })),
    (Injector.__NG_ELEMENT_ID__ = -1),
    Injector
  );
})();
function LifecycleHooksFeature(component, def) {
  registerPostOrderHooks(readPatchedLView(component)[1], getCurrentTNode());
}
let _symbolIterator = null;
function getSymbolIterator() {
  if (!_symbolIterator) {
    const Symbol = _global.Symbol;
    if (Symbol && Symbol.iterator) _symbolIterator = Symbol.iterator;
    else {
      const keys = Object.getOwnPropertyNames(Map.prototype);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        'entries' !== key &&
          'size' !== key &&
          Map.prototype[key] === Map.prototype.entries &&
          (_symbolIterator = key);
      }
    }
  }
  return _symbolIterator;
}
function isListLikeIterable(obj) {
  return (
    !!isJsObject(obj) &&
    (Array.isArray(obj) || (!(obj instanceof Map) && getSymbolIterator() in obj))
  );
}
function isJsObject(o) {
  return null !== o && ('function' == typeof o || 'object' == typeof o);
}
function bindingUpdated(lView, bindingIndex, value) {
  return !Object.is(lView[bindingIndex], value) && ((lView[bindingIndex] = value), !0);
}

function ɵɵdirectiveInject(token, flags = InjectFlags.Default) {
  const lView = getLView();
  return null === lView
    ? ɵɵinject(token, flags)
    : getOrCreateInjectable(getCurrentTNode(), lView, resolveForwardRef(token), flags);
}
function ɵɵproperty(propName, value, sanitizer) {
  const lView = getLView();
  return (
    bindingUpdated(lView, nextBindingIndex(), value) &&
      (function (tView, tNode, lView, propName, value, renderer, sanitizer, nativeOnly) {
        const element = getNativeByTNode(tNode, lView);
        let dataValue,
          inputData = tNode.inputs;
        var name;
        null != inputData && (dataValue = inputData[propName])
          ? (setInputsForProperty(tView, lView, dataValue, propName, value),
            isComponentHost(tNode) &&
              (function (lView, viewIndex) {
                const childComponentLView = getComponentLViewByIndex(viewIndex, lView);
                16 & childComponentLView[2] || (childComponentLView[2] |= 64);
              })(lView, tNode.index))
          : 3 & tNode.type &&
            ((propName =
              'class' === (name = propName)
                ? 'className'
                : 'for' === name
                ? 'htmlFor'
                : 'formaction' === name
                ? 'formAction'
                : 'innerHtml' === name
                ? 'innerHTML'
                : 'readonly' === name
                ? 'readOnly'
                : 'tabindex' === name
                ? 'tabIndex'
                : name),
            (value = null != sanitizer ? sanitizer(value, tNode.value || '', propName) : value),
            isProceduralRenderer(renderer)
              ? renderer.setProperty(element, propName, value)
              : isAnimationProp(propName) ||
                (element.setProperty
                  ? element.setProperty(propName, value)
                  : (element[propName] = value)));
      })(
        getTView(),
        (function () {
          const lFrame = instructionState.lFrame;
          return getTNode(lFrame.tView, lFrame.selectedIndex);
        })(),
        lView,
        propName,
        value,
        lView[11],
        sanitizer,
      ),
    ɵɵproperty
  );
}
function setDirectiveInputsWhichShadowsStyling(tView, tNode, lView, value, isClassBased) {
  const property = isClassBased ? 'class' : 'style';
  setInputsForProperty(tView, lView, tNode.inputs[property], property, value);
}
function ɵɵelementStart(index, name, attrsIndex, localRefsIndex) {
  const lView = getLView(),
    tView = getTView(),
    adjustedIndex = 20 + index,
    renderer = lView[11],
    native = (lView[adjustedIndex] = createElementNode(
      renderer,
      name,
      instructionState.lFrame.currentNamespace,
    )),
    tNode = tView.firstCreatePass
      ? (function (index, tView, lView, native, name, attrsIndex, localRefsIndex) {
          const tViewConsts = tView.consts,
            tNode = getOrCreateTNode(tView, index, 2, name, getConstant(tViewConsts, attrsIndex));
          return (
            resolveDirectives(tView, lView, tNode, getConstant(tViewConsts, localRefsIndex)),
            null !== tNode.attrs && computeStaticStyling(tNode, tNode.attrs, !1),
            null !== tNode.mergedAttrs && computeStaticStyling(tNode, tNode.mergedAttrs, !0),
            null !== tView.queries && tView.queries.elementStart(tView, tNode),
            tNode
          );
        })(adjustedIndex, tView, lView, 0, name, attrsIndex, localRefsIndex)
      : tView.data[adjustedIndex];
  setCurrentTNode(tNode, !0);
  const mergedAttrs = tNode.mergedAttrs;
  null !== mergedAttrs && setUpAttributes(renderer, native, mergedAttrs);
  const classes = tNode.classes;
  null !== classes && writeDirectClass(renderer, native, classes);
  const styles = tNode.styles;
  null !== styles && writeDirectStyle(renderer, native, styles),
    64 != (64 & tNode.flags) && appendChild(tView, lView, native, tNode),
    0 === instructionState.lFrame.elementDepthCount && attachPatchData(native, lView),
    instructionState.lFrame.elementDepthCount++,
    isDirectiveHost(tNode) &&
      (createDirectivesInstances(tView, lView, tNode),
      (function (tView, tNode, lView) {
        if (isContentQueryHost(tNode)) {
          const end = tNode.directiveEnd;
          for (let directiveIndex = tNode.directiveStart; directiveIndex < end; directiveIndex++) {
            const def = tView.data[directiveIndex];
            def.contentQueries && def.contentQueries(1, lView[directiveIndex], directiveIndex);
          }
        }
      })(tView, tNode, lView)),
    null !== localRefsIndex && saveResolvedLocalsInData(lView, tNode);
}
function ɵɵelementEnd() {
  let currentTNode = getCurrentTNode();
  isCurrentTNodeParent()
    ? (instructionState.lFrame.isParent = !1)
    : ((currentTNode = currentTNode.parent), setCurrentTNode(currentTNode, !1));
  const tNode = currentTNode;
  instructionState.lFrame.elementDepthCount--;
  const tView = getTView();
  tView.firstCreatePass &&
    (registerPostOrderHooks(tView, currentTNode),
    isContentQueryHost(currentTNode) && tView.queries.elementEnd(currentTNode)),
    null != tNode.classesWithoutHost &&
      (function (tNode) {
        return 0 != (16 & tNode.flags);
      })(tNode) &&
      setDirectiveInputsWhichShadowsStyling(tView, tNode, getLView(), tNode.classesWithoutHost, !0),
    null != tNode.stylesWithoutHost &&
      (function (tNode) {
        return 0 != (32 & tNode.flags);
      })(
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */ tNode,
      ) &&
      setDirectiveInputsWhichShadowsStyling(tView, tNode, getLView(), tNode.stylesWithoutHost, !1);
}
function ɵɵelement(index, name, attrsIndex, localRefsIndex) {
  ɵɵelementStart(index, name, attrsIndex, localRefsIndex), ɵɵelementEnd();
}

function isPromise(obj) {
  return !!obj && 'function' == typeof obj.then;
}

function ɵɵlistener(eventName, listenerFn, useCapture = !1, eventTargetResolver) {
  const lView = getLView(),
    tView = getTView(),
    tNode = getCurrentTNode();
  return (
    (function (
      tView,
      lView,
      renderer,
      tNode,
      eventName,
      listenerFn,
      useCapture = !1,
      eventTargetResolver,
    ) {
      const isTNodeDirectiveHost = isDirectiveHost(tNode),
        tCleanup =
          tView.firstCreatePass &&
          (function (tView) {
            return tView.cleanup || (tView.cleanup = []);
          })(tView),
        lCleanup = getLCleanup(lView);
      let processOutputs = !0;
      if (3 & tNode.type) {
        const native = getNativeByTNode(tNode, lView),
          resolved = eventTargetResolver ? eventTargetResolver(native) : EMPTY_OBJ,
          target = resolved.target || native,
          lCleanupIndex = lCleanup.length,
          idxOrTargetGetter = eventTargetResolver
            ? (_lView) => eventTargetResolver(unwrapRNode(_lView[tNode.index])).target
            : tNode.index;
        if (isProceduralRenderer(renderer)) {
          let existingListener = null;
          if (
            (!eventTargetResolver &&
              isTNodeDirectiveHost &&
              (existingListener = (function (tView, lView, eventName, tNodeIdx) {
                const tCleanup = tView.cleanup;
                if (null != tCleanup)
                  for (let i = 0; i < tCleanup.length - 1; i += 2) {
                    const cleanupEventName = tCleanup[i];
                    if (cleanupEventName === eventName && tCleanup[i + 1] === tNodeIdx) {
                      const lCleanup = lView[7],
                        listenerIdxInLCleanup = tCleanup[i + 2];
                      return lCleanup.length > listenerIdxInLCleanup
                        ? lCleanup[listenerIdxInLCleanup]
                        : null;
                    }
                    'string' == typeof cleanupEventName && (i += 2);
                  }
                return null;
              })(tView, lView, eventName, tNode.index)),
            null !== existingListener)
          )
            ((
              existingListener.__ngLastListenerFn__ || existingListener
            ).__ngNextListenerFn__ = listenerFn),
              (existingListener.__ngLastListenerFn__ = listenerFn),
              (processOutputs = !1);
          else {
            listenerFn = wrapListener(tNode, lView, listenerFn, !1);
            const cleanupFn = renderer.listen(resolved.name || target, eventName, listenerFn);
            lCleanup.push(listenerFn, cleanupFn),
              tCleanup &&
                tCleanup.push(eventName, idxOrTargetGetter, lCleanupIndex, lCleanupIndex + 1);
          }
        } else
          (listenerFn = wrapListener(tNode, lView, listenerFn, !0)),
            target.addEventListener(eventName, listenerFn, useCapture),
            lCleanup.push(listenerFn),
            tCleanup && tCleanup.push(eventName, idxOrTargetGetter, lCleanupIndex, useCapture);
      } else listenerFn = wrapListener(tNode, lView, listenerFn, !1);
      const outputs = tNode.outputs;
      let props;
      if (processOutputs && null !== outputs && (props = outputs[eventName])) {
        const propsLength = props.length;
        if (propsLength)
          for (let i = 0; i < propsLength; i += 2) {
            const subscription = lView[props[i]][props[i + 1]].subscribe(listenerFn),
              idx = lCleanup.length;
            lCleanup.push(listenerFn, subscription),
              tCleanup && tCleanup.push(eventName, tNode.index, idx, -(idx + 1));
          }
      }
    })(tView, lView, lView[11], tNode, eventName, listenerFn, useCapture, eventTargetResolver),
    ɵɵlistener
  );
}
function executeListenerWithErrorHandling(lView, listenerFn, e) {
  try {
    return !1 !== listenerFn(e);
  } catch (error) {
    return handleError(lView, error), !1;
  }
}
function wrapListener(tNode, lView, listenerFn, wrapWithPreventDefault) {
  return function wrapListenerIn_markDirtyAndPreventDefault(e) {
    if (e === Function) return listenerFn;
    const startView = 2 & tNode.flags ? getComponentLViewByIndex(tNode.index, lView) : lView;
    0 == (32 & lView[2]) && markViewDirty(startView);
    let result = executeListenerWithErrorHandling(lView, listenerFn, e),
      nextListenerFn = wrapListenerIn_markDirtyAndPreventDefault.__ngNextListenerFn__;
    for (; nextListenerFn; )
      (result = executeListenerWithErrorHandling(lView, nextListenerFn, e) && result),
        (nextListenerFn = nextListenerFn.__ngNextListenerFn__);
    return (
      wrapWithPreventDefault && !1 === result && (e.preventDefault(), (e.returnValue = !1)), result
    );
  };
}
function ɵɵnextContext(level = 1) {
  return (function (level) {
    return (instructionState.lFrame.contextLView = (function (nestingLevel, currentView) {
      for (; nestingLevel > 0; ) (currentView = currentView[15]), nestingLevel--;
      return currentView;
    })(level, instructionState.lFrame.contextLView))[8];
  })(level);
}
const EMPTY_ARRAY$2 = [];
function markDuplicates(tData, tStylingKey, index, isPrevDir, isClassBinding) {
  const tStylingAtIndex = tData[index + 1],
    isMap = null === tStylingKey;
  let cursor = isPrevDir
      ? getTStylingRangePrev(tStylingAtIndex)
      : getTStylingRangeNext(tStylingAtIndex),
    foundDuplicate = !1;
  for (; 0 !== cursor && (!1 === foundDuplicate || isMap); ) {
    const tStyleRangeAtCursor = tData[cursor + 1];
    isStylingMatch(tData[cursor], tStylingKey) &&
      ((foundDuplicate = !0),
      (tData[cursor + 1] = isPrevDir
        ? setTStylingRangeNextDuplicate(tStyleRangeAtCursor)
        : setTStylingRangePrevDuplicate(tStyleRangeAtCursor))),
      (cursor = isPrevDir
        ? getTStylingRangePrev(tStyleRangeAtCursor)
        : getTStylingRangeNext(tStyleRangeAtCursor));
  }
  foundDuplicate &&
    (tData[index + 1] = isPrevDir
      ? setTStylingRangePrevDuplicate(tStylingAtIndex)
      : setTStylingRangeNextDuplicate(tStylingAtIndex));
}
function isStylingMatch(tStylingKeyCursor, tStylingKey) {
  return (
    null === tStylingKeyCursor ||
    null == tStylingKey ||
    (Array.isArray(tStylingKeyCursor) ? tStylingKeyCursor[1] : tStylingKeyCursor) === tStylingKey ||
    (!(!Array.isArray(tStylingKeyCursor) || 'string' != typeof tStylingKey) &&
      keyValueArrayIndexOf(tStylingKeyCursor, tStylingKey) >= 0)
  );
}
function ɵɵclassProp(className, value) {
  return (
    (function (prop, value, suffix, isClassBased) {
      const lView = getLView(),
        tView = getTView(),
        bindingIndex = (function (count) {
          const lFrame = instructionState.lFrame,
            index = lFrame.bindingIndex;
          return (lFrame.bindingIndex = lFrame.bindingIndex + 2), index;
        })();
      tView.firstUpdatePass &&
        (function (tView, tStylingKey, bindingIndex, isClassBased) {
          const tData = tView.data;
          if (null === tData[bindingIndex + 1]) {
            const tNode = tData[getSelectedIndex()],
              isHostBindings = (function (tView, bindingIndex) {
                return bindingIndex >= tView.expandoStartIndex;
              })(tView, bindingIndex);
            (function (tNode, isClassBased) {
              return 0 != (16 & tNode.flags);
            })(
              /**
               * @license
               * Copyright Google LLC All Rights Reserved.
               *
               * Use of this source code is governed by an MIT-style license that can be
               * found in the LICENSE file at https://angular.io/license
               */ tNode,
            ) &&
              null === tStylingKey &&
              !isHostBindings &&
              (tStylingKey = !1),
              (tStylingKey = (function (tData, tNode, stylingKey, isClassBased) {
                const hostDirectiveDef = (function (tData) {
                  const currentDirectiveIndex = instructionState.lFrame.currentDirectiveIndex;
                  return -1 === currentDirectiveIndex ? null : tData[currentDirectiveIndex];
                })(tData);
                let residual = tNode.residualClasses;
                if (null === hostDirectiveDef)
                  0 === tNode.classBindings &&
                    ((stylingKey = collectStylingFromTAttrs(
                      (stylingKey = collectStylingFromDirectives(
                        null,
                        tData,
                        tNode,
                        stylingKey,
                        !0,
                      )),
                      tNode.attrs,
                      !0,
                    )),
                    (residual = null));
                else {
                  const directiveStylingLast = tNode.directiveStylingLast;
                  if (
                    -1 === directiveStylingLast ||
                    tData[directiveStylingLast] !== hostDirectiveDef
                  )
                    if (
                      ((stylingKey = collectStylingFromDirectives(
                        hostDirectiveDef,
                        tData,
                        tNode,
                        stylingKey,
                        !0,
                      )),
                      null === residual)
                    ) {
                      let templateStylingKey = (function (tData, tNode, isClassBased) {
                        const bindings = tNode.classBindings;
                        if (0 !== getTStylingRangeNext(bindings))
                          return tData[getTStylingRangePrev(bindings)];
                      })(tData, tNode);
                      void 0 !== templateStylingKey &&
                        Array.isArray(templateStylingKey) &&
                        ((templateStylingKey = collectStylingFromDirectives(
                          null,
                          tData,
                          tNode,
                          templateStylingKey[1],
                          !0,
                        )),
                        (templateStylingKey = collectStylingFromTAttrs(
                          templateStylingKey,
                          tNode.attrs,
                          !0,
                        )),
                        (function (tData, tNode, isClassBased, tStylingKey) {
                          tData[getTStylingRangePrev(tNode.classBindings)] = tStylingKey;
                        })(tData, tNode, 0, templateStylingKey));
                    } else
                      residual = (function (tData, tNode, isClassBased) {
                        let residual = void 0;
                        const directiveEnd = tNode.directiveEnd;
                        for (let i = 1 + tNode.directiveStylingLast; i < directiveEnd; i++)
                          residual = collectStylingFromTAttrs(residual, tData[i].hostAttrs, !0);
                        return collectStylingFromTAttrs(residual, tNode.attrs, !0);
                      })(tData, tNode);
                }
                return void 0 !== residual && (tNode.residualClasses = residual), stylingKey;
              })(tData, tNode, tStylingKey)),
              /**
               * @license
               * Copyright Google LLC All Rights Reserved.
               *
               * Use of this source code is governed by an MIT-style license that can be
               * found in the LICENSE file at https://angular.io/license
               */
              (function (
                tData,
                tNode,
                tStylingKeyWithStatic,
                index,
                isHostBinding,
                isClassBinding,
              ) {
                let tBindings = tNode.classBindings,
                  tmplHead = getTStylingRangePrev(tBindings),
                  tmplTail = getTStylingRangeNext(tBindings);
                tData[index] = tStylingKeyWithStatic;
                let tStylingKey,
                  isKeyDuplicateOfStatic = !1;
                if (Array.isArray(tStylingKeyWithStatic)) {
                  const staticKeyValueArray = tStylingKeyWithStatic;
                  (tStylingKey = staticKeyValueArray[1]),
                    (null === tStylingKey ||
                      keyValueArrayIndexOf(staticKeyValueArray, tStylingKey) > 0) &&
                      (isKeyDuplicateOfStatic = !0);
                } else tStylingKey = tStylingKeyWithStatic;
                if (isHostBinding)
                  if (0 !== tmplTail) {
                    const previousNode = getTStylingRangePrev(tData[tmplHead + 1]);
                    (tData[index + 1] = toTStylingRange(previousNode, tmplHead)),
                      0 !== previousNode &&
                        (tData[previousNode + 1] = setTStylingRangeNext(
                          tData[previousNode + 1],
                          index,
                        )),
                      (tData[tmplHead + 1] = (131071 & tData[tmplHead + 1]) | (index << 17));
                  } else
                    (tData[index + 1] = toTStylingRange(tmplHead, 0)),
                      0 !== tmplHead &&
                        (tData[tmplHead + 1] = setTStylingRangeNext(tData[tmplHead + 1], index)),
                      (tmplHead = index);
                else
                  (tData[index + 1] = toTStylingRange(tmplTail, 0)),
                    0 === tmplHead
                      ? (tmplHead = index)
                      : (tData[tmplTail + 1] = setTStylingRangeNext(tData[tmplTail + 1], index)),
                    (tmplTail = index);
                isKeyDuplicateOfStatic &&
                  (tData[index + 1] = setTStylingRangePrevDuplicate(tData[index + 1])),
                  markDuplicates(tData, tStylingKey, index, !0),
                  markDuplicates(tData, tStylingKey, index, !1),
                  (function (tNode, tStylingKey, tData, index, isClassBinding) {
                    const residual = tNode.residualClasses;
                    null != residual &&
                      'string' == typeof tStylingKey &&
                      keyValueArrayIndexOf(residual, tStylingKey) >= 0 &&
                      (tData[index + 1] = setTStylingRangeNextDuplicate(tData[index + 1]));
                  })(tNode, tStylingKey, tData, index),
                  (tBindings = toTStylingRange(tmplHead, tmplTail)),
                  (tNode.classBindings = tBindings);
              })(tData, tNode, tStylingKey, bindingIndex, isHostBindings);
          }
        })(tView, prop, bindingIndex),
        value !== NO_CHANGE &&
          bindingUpdated(lView, bindingIndex, value) &&
          (function (tView, tNode, lView, renderer, prop, value, isClassBased, bindingIndex) {
            if (!(3 & tNode.type)) return;
            const tData = tView.data,
              tRange = tData[bindingIndex + 1];
            isStylingValuePresent(
              1 == (1 & tRange)
                ? findStylingValue(tData, tNode, lView, prop, getTStylingRangeNext(tRange), !0)
                : void 0,
            ) ||
              (isStylingValuePresent(value) ||
                ((function (tStylingRange) {
                  return 2 == (2 & tStylingRange);
                })(tRange) &&
                  (value = findStylingValue(tData, null, lView, prop, bindingIndex, !0))),
              (function (renderer, isClassBased, rNode, prop, value) {
                const isProcedural = isProceduralRenderer(renderer);
                value
                  ? isProcedural
                    ? renderer.addClass(rNode, prop)
                    : rNode.classList.add(prop)
                  : isProcedural
                  ? renderer.removeClass(rNode, prop)
                  : rNode.classList.remove(prop);
              })(renderer, 0, getNativeByIndex(getSelectedIndex(), lView), prop, value));
          })(
            tView,
            tView.data[getSelectedIndex()],
            lView,
            lView[11],
            prop,
            (lView[bindingIndex + 1] = (function (value, suffix) {
              return (
                null == value ||
                  ('object' == typeof value &&
                    (value = stringify(
                      (function (value) {
                        return value instanceof
                          /**
                           * @license
                           * Copyright Google LLC All Rights Reserved.
                           *
                           * Use of this source code is governed by an MIT-style license that can be
                           * found in the LICENSE file at https://angular.io/license
                           */
                          class {
                            constructor(changingThisBreaksApplicationSecurity) {
                              this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
                            }
                            toString() {
                              return (
                                `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
                                ' (see https://g.co/ng/security#xss)'
                              );
                            }
                          }
                          ? value.changingThisBreaksApplicationSecurity
                          : value;
                      })(
                        /**
                         * @license
                         * Copyright Google LLC All Rights Reserved.
                         *
                         * Use of this source code is governed by an MIT-style license that can be
                         * found in the LICENSE file at https://angular.io/license
                         */ value,
                      ),
                    ))),
                value
              );
            })(value)),
            0,
            bindingIndex,
          );
    })(className, value),
    ɵɵclassProp
  );
}
function collectStylingFromDirectives(hostDirectiveDef, tData, tNode, stylingKey, isClassBased) {
  let currentDirective = null;
  const directiveEnd = tNode.directiveEnd;
  let directiveStylingLast = tNode.directiveStylingLast;
  for (
    -1 === directiveStylingLast
      ? (directiveStylingLast = tNode.directiveStart)
      : directiveStylingLast++;
    directiveStylingLast < directiveEnd &&
    ((currentDirective = tData[directiveStylingLast]),
    (stylingKey = collectStylingFromTAttrs(stylingKey, currentDirective.hostAttrs, isClassBased)),
    currentDirective !== hostDirectiveDef);

  )
    directiveStylingLast++;
  return (
    null !== hostDirectiveDef && (tNode.directiveStylingLast = directiveStylingLast), stylingKey
  );
}
function collectStylingFromTAttrs(stylingKey, attrs, isClassBased) {
  const desiredMarker = isClassBased ? 1 : 2;
  let currentMarker = -1;
  if (null !== attrs)
    for (let i = 0; i < attrs.length; i++) {
      const item = attrs[i];
      'number' == typeof item
        ? (currentMarker = item)
        : currentMarker === desiredMarker &&
          (Array.isArray(stylingKey) ||
            (stylingKey = void 0 === stylingKey ? [] : ['', stylingKey]),
          keyValueArraySet(stylingKey, item, !!isClassBased || attrs[++i]));
    }
  return void 0 === stylingKey ? null : stylingKey;
}
function findStylingValue(tData, tNode, lView, prop, index, isClassBased) {
  const isPrevDirection = null === tNode;
  let value = void 0;
  for (; index > 0; ) {
    const rawKey = tData[index],
      containsStatics = Array.isArray(rawKey),
      key = containsStatics ? rawKey[1] : rawKey,
      isStylingMap = null === key;
    let valueAtLViewIndex = lView[index + 1];
    valueAtLViewIndex === NO_CHANGE && (valueAtLViewIndex = isStylingMap ? EMPTY_ARRAY$2 : void 0);
    let currentValue = isStylingMap
      ? keyValueArrayGet(valueAtLViewIndex, prop)
      : key === prop
      ? valueAtLViewIndex
      : void 0;
    if (
      (containsStatics &&
        !isStylingValuePresent(currentValue) &&
        (currentValue = keyValueArrayGet(rawKey, prop)),
      isStylingValuePresent(currentValue) && ((value = currentValue), isPrevDirection))
    )
      return value;
    const tRange = tData[index + 1];
    index = isPrevDirection ? getTStylingRangePrev(tRange) : getTStylingRangeNext(tRange);
  }
  if (null !== tNode) {
    let residual = isClassBased ? tNode.residualClasses : tNode.residualStyles;
    null != residual && (value = keyValueArrayGet(residual, prop));
  }
  return value;
}
function isStylingValuePresent(value) {
  return void 0 !== value;
}
function ɵɵtext(index, value = '') {
  const lView = getLView(),
    tView = getTView(),
    adjustedIndex = index + 20,
    tNode = tView.firstCreatePass
      ? getOrCreateTNode(tView, adjustedIndex, 1, value, null)
      : tView.data[adjustedIndex],
    textNative = (lView[adjustedIndex] = (function (renderer, value) {
      return isProceduralRenderer(renderer)
        ? renderer.createText(value)
        : renderer.createTextNode(value);
    })(lView[11], value));
  appendChild(tView, lView, textNative, tNode), setCurrentTNode(tNode, !1);
}
function ɵɵtextInterpolate(v0) {
  return ɵɵtextInterpolate1('', v0, ''), ɵɵtextInterpolate;
}
function ɵɵtextInterpolate1(prefix, v0, suffix) {
  const lView = getLView(),
    interpolated = (function (lView, prefix, v0, suffix) {
      return bindingUpdated(lView, nextBindingIndex(), v0)
        ? prefix + renderStringify(v0) + suffix
        : NO_CHANGE;
    })(
      /**
       * @license
       * Copyright Google LLC All Rights Reserved.
       *
       * Use of this source code is governed by an MIT-style license that can be
       * found in the LICENSE file at https://angular.io/license
       */ lView,
      prefix,
      v0,
      suffix,
    );
  return (
    interpolated !== NO_CHANGE &&
      (function (lView, index, value) {
        const element = getNativeByIndex(index, lView);
        !(function (renderer, rNode, value) {
          isProceduralRenderer(renderer)
            ? renderer.setValue(rNode, value)
            : (rNode.textContent = value);
        })(lView[11], element, value);
      })(lView, getSelectedIndex(), interpolated),
    ɵɵtextInterpolate1
  );
}
const u = void 0;
var localeEn = [
  'en',
  [['a', 'p'], ['AM', 'PM'], u],
  [['AM', 'PM'], u, u],
  [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  ],
  u,
  [
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  ],
  u,
  [
    ['B', 'A'],
    ['BC', 'AD'],
    ['Before Christ', 'Anno Domini'],
  ],
  0,
  [6, 0],
  ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
  ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
  ['{1}, {0}', u, "{1} 'at' {0}", u],
  ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
  ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'],
  'USD',
  '$',
  'US Dollar',
  {},
  'ltr',
  function (n) {
    let i = Math.floor(Math.abs(n)),
      v = n.toString().replace(/^[^.]*\.?/, '').length;
    return 1 === i && 0 === v ? 1 : 5;
  },
];
let LOCALE_DATA = {};
function getLocaleData(normalizedLocale) {
  return (
    normalizedLocale in LOCALE_DATA ||
      (LOCALE_DATA[normalizedLocale] =
        _global.ng &&
        _global.ng.common &&
        _global.ng.common.locales &&
        _global.ng.common.locales[normalizedLocale]),
    LOCALE_DATA[normalizedLocale]
  );
}
var LocaleDataIndex = (function (LocaleDataIndex) {
  return (
    (LocaleDataIndex[(LocaleDataIndex.LocaleId = 0)] = 'LocaleId'),
    (LocaleDataIndex[(LocaleDataIndex.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
    (LocaleDataIndex[(LocaleDataIndex.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
    (LocaleDataIndex[(LocaleDataIndex.DaysFormat = 3)] = 'DaysFormat'),
    (LocaleDataIndex[(LocaleDataIndex.DaysStandalone = 4)] = 'DaysStandalone'),
    (LocaleDataIndex[(LocaleDataIndex.MonthsFormat = 5)] = 'MonthsFormat'),
    (LocaleDataIndex[(LocaleDataIndex.MonthsStandalone = 6)] = 'MonthsStandalone'),
    (LocaleDataIndex[(LocaleDataIndex.Eras = 7)] = 'Eras'),
    (LocaleDataIndex[(LocaleDataIndex.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
    (LocaleDataIndex[(LocaleDataIndex.WeekendRange = 9)] = 'WeekendRange'),
    (LocaleDataIndex[(LocaleDataIndex.DateFormat = 10)] = 'DateFormat'),
    (LocaleDataIndex[(LocaleDataIndex.TimeFormat = 11)] = 'TimeFormat'),
    (LocaleDataIndex[(LocaleDataIndex.DateTimeFormat = 12)] = 'DateTimeFormat'),
    (LocaleDataIndex[(LocaleDataIndex.NumberSymbols = 13)] = 'NumberSymbols'),
    (LocaleDataIndex[(LocaleDataIndex.NumberFormats = 14)] = 'NumberFormats'),
    (LocaleDataIndex[(LocaleDataIndex.CurrencyCode = 15)] = 'CurrencyCode'),
    (LocaleDataIndex[(LocaleDataIndex.CurrencySymbol = 16)] = 'CurrencySymbol'),
    (LocaleDataIndex[(LocaleDataIndex.CurrencyName = 17)] = 'CurrencyName'),
    (LocaleDataIndex[(LocaleDataIndex.Currencies = 18)] = 'Currencies'),
    (LocaleDataIndex[(LocaleDataIndex.Directionality = 19)] = 'Directionality'),
    (LocaleDataIndex[(LocaleDataIndex.PluralCase = 20)] = 'PluralCase'),
    (LocaleDataIndex[(LocaleDataIndex.ExtraData = 21)] = 'ExtraData'),
    LocaleDataIndex
  );
})({});

let LOCALE_ID = 'en-US';
function setLocaleId(localeId) {
  var actual, msg;
  (msg = 'Expected localeId to be defined'),
    null == (actual = localeId) &&
      (function (msg, actual, expected, comparison) {
        throw new Error(`ASSERTION ERROR: ${msg}` + ` [Expected=> null != ${actual} <=Actual]`);
      })(msg, actual),
    'string' == typeof localeId && (LOCALE_ID = localeId.toLowerCase().replace(/_/g, '-'));
}
class ComponentFactory {}
class _NullComponentFactoryResolver {
  resolveComponentFactory(component) {
    throw (function (component) {
      const error = Error(
        `No component factory found for ${stringify(
          component,
        )}. Did you add it to @NgModule.entryComponents?`,
      );
      return (error.ngComponent = component), error;
    })(component);
  }
}
let ComponentFactoryResolver = (() => {
  class ComponentFactoryResolver {}
  return (
    (ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver()), ComponentFactoryResolver
  );
})();
function noop(...args) {}
function createElementRef(tNode, lView) {
  return new ElementRef(getNativeByTNode(tNode, lView));
}
const SWITCH_ELEMENT_REF_FACTORY = function () {
  return createElementRef(getCurrentTNode(), getLView());
};
let ElementRef = (() => {
  class ElementRef {
    constructor(nativeElement) {
      this.nativeElement = nativeElement;
    }
  }
  return (ElementRef.__NG_ELEMENT_ID__ = SWITCH_ELEMENT_REF_FACTORY), ElementRef;
})();
class RendererFactory2 {}
let Sanitizer = (() => {
  class Sanitizer {}
  return (
    (Sanitizer.ɵprov = ɵɵdefineInjectable({
      token: Sanitizer,
      providedIn: 'root',
      factory: () => null,
    })),
    Sanitizer
  );
})();
class Version {
  constructor(full) {
    (this.full = full),
      (this.major = full.split('.')[0]),
      (this.minor = full.split('.')[1]),
      (this.patch = full.split('.').slice(2).join('.'));
  }
}
const VERSION = new Version('0.0.0-PLACEHOLDER');
class DefaultIterableDifferFactory {
  constructor() {}
  supports(obj) {
    return isListLikeIterable(obj);
  }
  create(trackByFn) {
    return new DefaultIterableDiffer(trackByFn);
  }
}
const trackByIdentity = (index, item) => item;
class DefaultIterableDiffer {
  constructor(trackByFn) {
    (this.length = 0),
      (this._linkedRecords = null),
      (this._unlinkedRecords = null),
      (this._previousItHead = null),
      (this._itHead = null),
      (this._itTail = null),
      (this._additionsHead = null),
      (this._additionsTail = null),
      (this._movesHead = null),
      (this._movesTail = null),
      (this._removalsHead = null),
      (this._removalsTail = null),
      (this._identityChangesHead = null),
      (this._identityChangesTail = null),
      (this._trackByFn = trackByFn || trackByIdentity);
  }
  forEachItem(fn) {
    let record;
    for (record = this._itHead; null !== record; record = record._next) fn(record);
  }
  forEachOperation(fn) {
    let nextIt = this._itHead,
      nextRemove = this._removalsHead,
      addRemoveOffset = 0,
      moveOffsets = null;
    for (; nextIt || nextRemove; ) {
      const record =
          !nextRemove ||
          (nextIt &&
            nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets))
            ? nextIt
            : nextRemove,
        adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets),
        currentIndex = record.currentIndex;
      if (record === nextRemove) addRemoveOffset--, (nextRemove = nextRemove._nextRemoved);
      else if (((nextIt = nextIt._next), null == record.previousIndex)) addRemoveOffset++;
      else {
        moveOffsets || (moveOffsets = []);
        const localMovePreviousIndex = adjPreviousIndex - addRemoveOffset,
          localCurrentIndex = currentIndex - addRemoveOffset;
        if (localMovePreviousIndex != localCurrentIndex) {
          for (let i = 0; i < localMovePreviousIndex; i++) {
            const offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0),
              index = offset + i;
            localCurrentIndex <= index &&
              index < localMovePreviousIndex &&
              (moveOffsets[i] = offset + 1);
          }
          moveOffsets[record.previousIndex] = localCurrentIndex - localMovePreviousIndex;
        }
      }
      adjPreviousIndex !== currentIndex && fn(record, adjPreviousIndex, currentIndex);
    }
  }
  forEachPreviousItem(fn) {
    let record;
    for (record = this._previousItHead; null !== record; record = record._nextPrevious) fn(record);
  }
  forEachAddedItem(fn) {
    let record;
    for (record = this._additionsHead; null !== record; record = record._nextAdded) fn(record);
  }
  forEachMovedItem(fn) {
    let record;
    for (record = this._movesHead; null !== record; record = record._nextMoved) fn(record);
  }
  forEachRemovedItem(fn) {
    let record;
    for (record = this._removalsHead; null !== record; record = record._nextRemoved) fn(record);
  }
  forEachIdentityChange(fn) {
    let record;
    for (record = this._identityChangesHead; null !== record; record = record._nextIdentityChange)
      fn(record);
  }
  diff(collection) {
    if ((null == collection && (collection = []), !isListLikeIterable(collection)))
      throw new Error(
        `Error trying to diff '${stringify(collection)}'. Only arrays and iterables are allowed`,
      );
    return this.check(collection) ? this : null;
  }
  onDestroy() {}
  check(collection) {
    this._reset();
    let index,
      item,
      itemTrackBy,
      record = this._itHead,
      mayBeDirty = !1;
    if (Array.isArray(collection)) {
      this.length = collection.length;
      for (let index = 0; index < this.length; index++)
        (item = collection[index]),
          (itemTrackBy = this._trackByFn(index, item)),
          null !== record && Object.is(record.trackById, itemTrackBy)
            ? (mayBeDirty && (record = this._verifyReinsertion(record, item, itemTrackBy, index)),
              Object.is(record.item, item) || this._addIdentityChange(record, item))
            : ((record = this._mismatch(record, item, itemTrackBy, index)), (mayBeDirty = !0)),
          (record = record._next);
    } else
      (index = 0),
        (function (obj, fn) {
          if (Array.isArray(obj)) for (let i = 0; i < obj.length; i++) fn(obj[i]);
          else {
            const iterator = obj[getSymbolIterator()]();
            let item;
            for (; !(item = iterator.next()).done; ) fn(item.value);
          }
        })(collection, (item) => {
          (itemTrackBy = this._trackByFn(index, item)),
            null !== record && Object.is(record.trackById, itemTrackBy)
              ? (mayBeDirty && (record = this._verifyReinsertion(record, item, itemTrackBy, index)),
                Object.is(record.item, item) || this._addIdentityChange(record, item))
              : ((record = this._mismatch(record, item, itemTrackBy, index)), (mayBeDirty = !0)),
            (record = record._next),
            index++;
        }),
        (this.length = index);
    return this._truncate(record), (this.collection = collection), this.isDirty;
  }
  get isDirty() {
    return (
      null !== this._additionsHead ||
      null !== this._movesHead ||
      null !== this._removalsHead ||
      null !== this._identityChangesHead
    );
  }
  _reset() {
    if (this.isDirty) {
      let record;
      for (record = this._previousItHead = this._itHead; null !== record; record = record._next)
        record._nextPrevious = record._next;
      for (record = this._additionsHead; null !== record; record = record._nextAdded)
        record.previousIndex = record.currentIndex;
      for (
        this._additionsHead = this._additionsTail = null, record = this._movesHead;
        null !== record;
        record = record._nextMoved
      )
        record.previousIndex = record.currentIndex;
      (this._movesHead = this._movesTail = null),
        (this._removalsHead = this._removalsTail = null),
        (this._identityChangesHead = this._identityChangesTail = null);
    }
  }
  _mismatch(record, item, itemTrackBy, index) {
    let previousRecord;
    return (
      null === record
        ? (previousRecord = this._itTail)
        : ((previousRecord = record._prev), this._remove(record)),
      null !==
      (record = null === this._linkedRecords ? null : this._linkedRecords.get(itemTrackBy, index))
        ? (Object.is(record.item, item) || this._addIdentityChange(record, item),
          this._moveAfter(record, previousRecord, index))
        : null !==
          (record =
            null === this._unlinkedRecords ? null : this._unlinkedRecords.get(itemTrackBy, null))
        ? (Object.is(record.item, item) || this._addIdentityChange(record, item),
          this._reinsertAfter(record, previousRecord, index))
        : (record = this._addAfter(
            new IterableChangeRecord_(item, itemTrackBy),
            previousRecord,
            index,
          )),
      record
    );
  }
  _verifyReinsertion(record, item, itemTrackBy, index) {
    let reinsertRecord =
      null === this._unlinkedRecords ? null : this._unlinkedRecords.get(itemTrackBy, null);
    return (
      null !== reinsertRecord
        ? (record = this._reinsertAfter(reinsertRecord, record._prev, index))
        : record.currentIndex != index &&
          ((record.currentIndex = index), this._addToMoves(record, index)),
      record
    );
  }
  _truncate(record) {
    for (; null !== record; ) {
      const nextRecord = record._next;
      this._addToRemovals(this._unlink(record)), (record = nextRecord);
    }
    null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
      null !== this._additionsTail && (this._additionsTail._nextAdded = null),
      null !== this._movesTail && (this._movesTail._nextMoved = null),
      null !== this._itTail && (this._itTail._next = null),
      null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
      null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
  }
  _reinsertAfter(record, prevRecord, index) {
    null !== this._unlinkedRecords && this._unlinkedRecords.remove(record);
    const prev = record._prevRemoved,
      next = record._nextRemoved;
    return (
      null === prev ? (this._removalsHead = next) : (prev._nextRemoved = next),
      null === next ? (this._removalsTail = prev) : (next._prevRemoved = prev),
      this._insertAfter(record, prevRecord, index),
      this._addToMoves(record, index),
      record
    );
  }
  _moveAfter(record, prevRecord, index) {
    return (
      this._unlink(record),
      this._insertAfter(record, prevRecord, index),
      this._addToMoves(record, index),
      record
    );
  }
  _addAfter(record, prevRecord, index) {
    return (
      this._insertAfter(record, prevRecord, index),
      (this._additionsTail =
        null === this._additionsTail
          ? (this._additionsHead = record)
          : (this._additionsTail._nextAdded = record)),
      record
    );
  }
  _insertAfter(record, prevRecord, index) {
    const next = null === prevRecord ? this._itHead : prevRecord._next;
    return (
      (record._next = next),
      (record._prev = prevRecord),
      null === next ? (this._itTail = record) : (next._prev = record),
      null === prevRecord ? (this._itHead = record) : (prevRecord._next = record),
      null === this._linkedRecords && (this._linkedRecords = new _DuplicateMap()),
      this._linkedRecords.put(record),
      (record.currentIndex = index),
      record
    );
  }
  _remove(record) {
    return this._addToRemovals(this._unlink(record));
  }
  _unlink(record) {
    null !== this._linkedRecords && this._linkedRecords.remove(record);
    const prev = record._prev,
      next = record._next;
    return (
      null === prev ? (this._itHead = next) : (prev._next = next),
      null === next ? (this._itTail = prev) : (next._prev = prev),
      record
    );
  }
  _addToMoves(record, toIndex) {
    return (
      record.previousIndex === toIndex ||
        (this._movesTail =
          null === this._movesTail
            ? (this._movesHead = record)
            : (this._movesTail._nextMoved = record)),
      record
    );
  }
  _addToRemovals(record) {
    return (
      null === this._unlinkedRecords && (this._unlinkedRecords = new _DuplicateMap()),
      this._unlinkedRecords.put(record),
      (record.currentIndex = null),
      (record._nextRemoved = null),
      null === this._removalsTail
        ? ((this._removalsTail = this._removalsHead = record), (record._prevRemoved = null))
        : ((record._prevRemoved = this._removalsTail),
          (this._removalsTail = this._removalsTail._nextRemoved = record)),
      record
    );
  }
  _addIdentityChange(record, item) {
    return (
      (record.item = item),
      (this._identityChangesTail =
        null === this._identityChangesTail
          ? (this._identityChangesHead = record)
          : (this._identityChangesTail._nextIdentityChange = record)),
      record
    );
  }
}
class IterableChangeRecord_ {
  constructor(item, trackById) {
    (this.item = item),
      (this.trackById = trackById),
      (this.currentIndex = null),
      (this.previousIndex = null),
      (this._nextPrevious = null),
      (this._prev = null),
      (this._next = null),
      (this._prevDup = null),
      (this._nextDup = null),
      (this._prevRemoved = null),
      (this._nextRemoved = null),
      (this._nextAdded = null),
      (this._nextMoved = null),
      (this._nextIdentityChange = null);
  }
}
class _DuplicateItemRecordList {
  constructor() {
    (this._head = null), (this._tail = null);
  }
  add(record) {
    null === this._head
      ? ((this._head = this._tail = record), (record._nextDup = null), (record._prevDup = null))
      : ((this._tail._nextDup = record),
        (record._prevDup = this._tail),
        (record._nextDup = null),
        (this._tail = record));
  }
  get(trackById, atOrAfterIndex) {
    let record;
    for (record = this._head; null !== record; record = record._nextDup)
      if (
        (null === atOrAfterIndex || atOrAfterIndex <= record.currentIndex) &&
        Object.is(record.trackById, trackById)
      )
        return record;
    return null;
  }
  remove(record) {
    const prev = record._prevDup,
      next = record._nextDup;
    return (
      null === prev ? (this._head = next) : (prev._nextDup = next),
      null === next ? (this._tail = prev) : (next._prevDup = prev),
      null === this._head
    );
  }
}
class _DuplicateMap {
  constructor() {
    this.map = new Map();
  }
  put(record) {
    const key = record.trackById;
    let duplicates = this.map.get(key);
    duplicates || ((duplicates = new _DuplicateItemRecordList()), this.map.set(key, duplicates)),
      duplicates.add(record);
  }
  get(trackById, atOrAfterIndex) {
    const recordList = this.map.get(trackById);
    return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
  }
  remove(record) {
    const key = record.trackById;
    return this.map.get(key).remove(record) && this.map.delete(key), record;
  }
  get isEmpty() {
    return 0 === this.map.size;
  }
  clear() {
    this.map.clear();
  }
}
function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
  const previousIndex = item.previousIndex;
  if (null === previousIndex) return previousIndex;
  let moveOffset = 0;
  return (
    moveOffsets && previousIndex < moveOffsets.length && (moveOffset = moveOffsets[previousIndex]),
    previousIndex + addRemoveOffset + moveOffset
  );
}
class DefaultKeyValueDifferFactory {
  constructor() {}
  supports(obj) {
    return obj instanceof Map || isJsObject(obj);
  }
  create() {
    return new DefaultKeyValueDiffer();
  }
}
class DefaultKeyValueDiffer {
  constructor() {
    (this._records = new Map()),
      (this._mapHead = null),
      (this._appendAfter = null),
      (this._previousMapHead = null),
      (this._changesHead = null),
      (this._changesTail = null),
      (this._additionsHead = null),
      (this._additionsTail = null),
      (this._removalsHead = null),
      (this._removalsTail = null);
  }
  get isDirty() {
    return (
      null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
    );
  }
  forEachItem(fn) {
    let record;
    for (record = this._mapHead; null !== record; record = record._next) fn(record);
  }
  forEachPreviousItem(fn) {
    let record;
    for (record = this._previousMapHead; null !== record; record = record._nextPrevious) fn(record);
  }
  forEachChangedItem(fn) {
    let record;
    for (record = this._changesHead; null !== record; record = record._nextChanged) fn(record);
  }
  forEachAddedItem(fn) {
    let record;
    for (record = this._additionsHead; null !== record; record = record._nextAdded) fn(record);
  }
  forEachRemovedItem(fn) {
    let record;
    for (record = this._removalsHead; null !== record; record = record._nextRemoved) fn(record);
  }
  diff(map) {
    if (map) {
      if (!(map instanceof Map || isJsObject(map)))
        throw new Error(
          `Error trying to diff '${stringify(map)}'. Only maps and objects are allowed`,
        );
    } else map = new Map();
    return this.check(map) ? this : null;
  }
  onDestroy() {}
  check(map) {
    this._reset();
    let insertBefore = this._mapHead;
    if (
      ((this._appendAfter = null),
      this._forEach(map, (value, key) => {
        if (insertBefore && insertBefore.key === key)
          this._maybeAddToChanges(insertBefore, value),
            (this._appendAfter = insertBefore),
            (insertBefore = insertBefore._next);
        else {
          const record = this._getOrCreateRecordForKey(key, value);
          insertBefore = this._insertBeforeOrAppend(insertBefore, record);
        }
      }),
      insertBefore)
    ) {
      insertBefore._prev && (insertBefore._prev._next = null), (this._removalsHead = insertBefore);
      for (let record = insertBefore; null !== record; record = record._nextRemoved)
        record === this._mapHead && (this._mapHead = null),
          this._records.delete(record.key),
          (record._nextRemoved = record._next),
          (record.previousValue = record.currentValue),
          (record.currentValue = null),
          (record._prev = null),
          (record._next = null);
    }
    return (
      this._changesTail && (this._changesTail._nextChanged = null),
      this._additionsTail && (this._additionsTail._nextAdded = null),
      this.isDirty
    );
  }
  _insertBeforeOrAppend(before, record) {
    if (before) {
      const prev = before._prev;
      return (
        (record._next = before),
        (record._prev = prev),
        (before._prev = record),
        prev && (prev._next = record),
        before === this._mapHead && (this._mapHead = record),
        (this._appendAfter = before),
        before
      );
    }
    return (
      this._appendAfter
        ? ((this._appendAfter._next = record), (record._prev = this._appendAfter))
        : (this._mapHead = record),
      (this._appendAfter = record),
      null
    );
  }
  _getOrCreateRecordForKey(key, value) {
    if (this._records.has(key)) {
      const record = this._records.get(key);
      this._maybeAddToChanges(record, value);
      const prev = record._prev,
        next = record._next;
      return (
        prev && (prev._next = next),
        next && (next._prev = prev),
        (record._next = null),
        (record._prev = null),
        record
      );
    }
    const record = new KeyValueChangeRecord_(key);
    return (
      this._records.set(key, record),
      (record.currentValue = value),
      this._addToAdditions(record),
      record
    );
  }
  _reset() {
    if (this.isDirty) {
      let record;
      for (
        this._previousMapHead = this._mapHead, record = this._previousMapHead;
        null !== record;
        record = record._next
      )
        record._nextPrevious = record._next;
      for (record = this._changesHead; null !== record; record = record._nextChanged)
        record.previousValue = record.currentValue;
      for (record = this._additionsHead; null != record; record = record._nextAdded)
        record.previousValue = record.currentValue;
      (this._changesHead = this._changesTail = null),
        (this._additionsHead = this._additionsTail = null),
        (this._removalsHead = null);
    }
  }
  _maybeAddToChanges(record, newValue) {
    Object.is(newValue, record.currentValue) ||
      ((record.previousValue = record.currentValue),
      (record.currentValue = newValue),
      this._addToChanges(record));
  }
  _addToAdditions(record) {
    null === this._additionsHead
      ? (this._additionsHead = this._additionsTail = record)
      : ((this._additionsTail._nextAdded = record), (this._additionsTail = record));
  }
  _addToChanges(record) {
    null === this._changesHead
      ? (this._changesHead = this._changesTail = record)
      : ((this._changesTail._nextChanged = record), (this._changesTail = record));
  }
  _forEach(obj, fn) {
    obj instanceof Map ? obj.forEach(fn) : Object.keys(obj).forEach((k) => fn(obj[k], k));
  }
}
class KeyValueChangeRecord_ {
  constructor(key) {
    (this.key = key),
      (this.previousValue = null),
      (this.currentValue = null),
      (this._nextPrevious = null),
      (this._next = null),
      (this._prev = null),
      (this._nextAdded = null),
      (this._nextRemoved = null),
      (this._nextChanged = null);
  }
}
function defaultIterableDiffersFactory() {
  return new IterableDiffers([new DefaultIterableDifferFactory()]);
}
let IterableDiffers = (() => {
  class IterableDiffers {
    constructor(factories) {
      this.factories = factories;
    }
    static create(factories, parent) {
      if (null != parent) {
        const copied = parent.factories.slice();
        factories = factories.concat(copied);
      }
      return new IterableDiffers(factories);
    }
    static extend(factories) {
      return {
        provide: IterableDiffers,
        useFactory: (parent) =>
          IterableDiffers.create(factories, parent || defaultIterableDiffersFactory()),
        deps: [[IterableDiffers, new SkipSelf(), new Optional()]],
      };
    }
    find(iterable) {
      const factory = this.factories.find((f) => f.supports(iterable));
      if (null != factory) return factory;
      throw new Error(
        `Cannot find a differ supporting object '${iterable}' of type '${
          ((type = iterable), type.name || typeof type)
        }'`,
      );
      var type;
      /**
       * @license
       * Copyright Google LLC All Rights Reserved.
       *
       * Use of this source code is governed by an MIT-style license that can be
       * found in the LICENSE file at https://angular.io/license
       */
    }
  }
  return (
    (IterableDiffers.ɵprov = ɵɵdefineInjectable({
      token: IterableDiffers,
      providedIn: 'root',
      factory: defaultIterableDiffersFactory,
    })),
    IterableDiffers
  );
})();
function defaultKeyValueDiffersFactory() {
  return new KeyValueDiffers([new DefaultKeyValueDifferFactory()]);
}
let KeyValueDiffers = (() => {
  class KeyValueDiffers {
    constructor(factories) {
      this.factories = factories;
    }
    static create(factories, parent) {
      if (parent) {
        const copied = parent.factories.slice();
        factories = factories.concat(copied);
      }
      return new KeyValueDiffers(factories);
    }
    static extend(factories) {
      return {
        provide: KeyValueDiffers,
        useFactory: (parent) =>
          KeyValueDiffers.create(factories, parent || defaultKeyValueDiffersFactory()),
        deps: [[KeyValueDiffers, new SkipSelf(), new Optional()]],
      };
    }
    find(kv) {
      const factory = this.factories.find((f) => f.supports(kv));
      if (factory) return factory;
      throw new Error(`Cannot find a differ supporting object '${kv}'`);
    }
  }
  return (
    (KeyValueDiffers.ɵprov = ɵɵdefineInjectable({
      token: KeyValueDiffers,
      providedIn: 'root',
      factory: defaultKeyValueDiffersFactory,
    })),
    KeyValueDiffers
  );
})();

class ViewRef {
  constructor(_lView, _cdRefInjectingView) {
    (this._lView = _lView),
      (this._cdRefInjectingView = _cdRefInjectingView),
      (this._appRef = null),
      (this._viewContainerRef = null);
  }
  get rootNodes() {
    const lView = this._lView,
      tView = lView[1];
    return (function collectNativeNodes(tView, lView, tNode, result, isProjection = !1) {
      for (; null !== tNode; ) {
        const lNode = lView[tNode.index];
        if ((null !== lNode && result.push(unwrapRNode(lNode)), isLContainer(lNode)))
          for (let i = 10; i < lNode.length; i++) {
            const lViewInAContainer = lNode[i],
              lViewFirstChildTNode = lViewInAContainer[1].firstChild;
            null !== lViewFirstChildTNode &&
              collectNativeNodes(
                lViewInAContainer[1],
                lViewInAContainer,
                lViewFirstChildTNode,
                result,
              );
          }
        const tNodeType = tNode.type;
        if (8 & tNodeType) collectNativeNodes(tView, lView, tNode.child, result);
        else if (32 & tNodeType) {
          const nextRNode = icuContainerIterate();
          let rNode;
          for (; (rNode = nextRNode()); ) result.push(rNode);
        } else if (16 & tNodeType) {
          const componentView = lView[16],
            nodesInSlot = componentView[6].projection[tNode.projection];
          if (Array.isArray(nodesInSlot)) result.push(...nodesInSlot);
          else {
            const parentView = getLViewParent(componentView);
            collectNativeNodes(parentView[1], parentView, nodesInSlot, result, !0);
          }
        }
        tNode = isProjection ? tNode.projectionNext : tNode.next;
      }
      return result;
    })(tView, lView, tView.firstChild, []);
  }
  get context() {
    return this._lView[8];
  }
  get destroyed() {
    return 256 == (256 & this._lView[2]);
  }
  destroy() {
    if (this._appRef) this._appRef.detachView(this);
    else if (this._viewContainerRef) {
      const index = this._viewContainerRef.indexOf(this);
      index > -1 && this._viewContainerRef.detach(index), (this._viewContainerRef = null);
    }
    destroyLView(this._lView[1], this._lView);
  }
  onDestroy(callback) {
    var cleanupFn;
    (cleanupFn = callback), getLCleanup(this._lView).push(cleanupFn);
  }
  markForCheck() {
    markViewDirty(this._cdRefInjectingView || this._lView);
  }
  detach() {
    this._lView[2] &= -129;
  }
  reattach() {
    this._lView[2] |= 128;
  }
  detectChanges() {
    detectChangesInternal(this._lView[1], this._lView, this.context);
  }
  checkNoChanges() {
    !(function (tView, view, context) {
      setIsInCheckNoChangesMode(!0);
      try {
        detectChangesInternal(tView, view, context);
      } finally {
        setIsInCheckNoChangesMode(!1);
      }
    })(this._lView[1], this._lView, this.context);
  }
  attachToViewContainerRef(vcRef) {
    if (this._appRef)
      throw new Error('This view is already attached directly to the ApplicationRef!');
    this._viewContainerRef = vcRef;
  }
  detachFromAppRef() {
    var lView;
    (this._appRef = null),
      applyView(this._lView[1], (lView = this._lView), lView[11], 2, null, null);
  }
  attachToAppRef(appRef) {
    if (this._viewContainerRef)
      throw new Error('This view is already attached to a ViewContainer!');
    this._appRef = appRef;
  }
}
class RootViewRef extends ViewRef {
  constructor(_view) {
    super(_view), (this._view = _view);
  }
  detectChanges() {
    detectChangesInRootView(this._view);
  }
  checkNoChanges() {
    !(function (lView) {
      setIsInCheckNoChangesMode(!0);
      try {
        detectChangesInRootView(lView);
      } finally {
        setIsInCheckNoChangesMode(!1);
      }
    })(this._view);
  }
  get context() {
    return null;
  }
}
const keyValDiff = [new DefaultKeyValueDifferFactory()],
  defaultIterableDiffers = new IterableDiffers([new DefaultIterableDifferFactory()]),
  defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff),
  SWITCH_TEMPLATE_REF_FACTORY = function () {
    return (
      (hostTNode = getCurrentTNode()),
      (hostLView = getLView()),
      4 & hostTNode.type
        ? new R3TemplateRef(hostLView, hostTNode, createElementRef(hostTNode, hostLView))
        : null
    );
    var hostTNode, hostLView;
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
  };
let TemplateRef = (() => {
  class TemplateRef {}
  return (TemplateRef.__NG_ELEMENT_ID__ = SWITCH_TEMPLATE_REF_FACTORY), TemplateRef;
})();
const ViewEngineTemplateRef = TemplateRef,
  R3TemplateRef = class extends ViewEngineTemplateRef {
    constructor(_declarationLView, _declarationTContainer, elementRef) {
      super(),
        (this._declarationLView = _declarationLView),
        (this._declarationTContainer = _declarationTContainer),
        (this.elementRef = elementRef);
    }
    createEmbeddedView(context) {
      const embeddedTView = this._declarationTContainer.tViews,
        embeddedLView = createLView(
          this._declarationLView,
          embeddedTView,
          context,
          16,
          null,
          embeddedTView.declTNode,
          null,
          null,
          null,
          null,
        );
      embeddedLView[17] = this._declarationLView[this._declarationTContainer.index];
      const declarationViewLQueries = this._declarationLView[19];
      return (
        null !== declarationViewLQueries &&
          (embeddedLView[19] = declarationViewLQueries.createEmbeddedView(embeddedTView)),
        renderView(embeddedTView, embeddedLView, context),
        new ViewRef(embeddedLView)
      );
    }
  };
class NgModuleRef {}
const SWITCH_VIEW_CONTAINER_REF_FACTORY = function () {
  return (function (hostTNode, hostLView) {
    let lContainer;
    const slotValue = hostLView[hostTNode.index];
    if (isLContainer(slotValue)) lContainer = slotValue;
    else {
      let commentNode;
      if (8 & hostTNode.type) commentNode = unwrapRNode(slotValue);
      else {
        const renderer = hostLView[11];
        commentNode = renderer.createComment('');
        const hostNative = getNativeByTNode(hostTNode, hostLView);
        nativeInsertBefore(
          renderer,
          nativeParentNode(renderer, hostNative),
          commentNode,
          (function (renderer, node) {
            return isProceduralRenderer(renderer) ? renderer.nextSibling(node) : node.nextSibling;
          })(renderer, hostNative),
          !1,
        );
      }
      (hostLView[hostTNode.index] = lContainer = createLContainer(
        slotValue,
        hostLView,
        commentNode,
        hostTNode,
      )),
        addToViewTree(hostLView, lContainer);
    }
    return new R3ViewContainerRef(lContainer, hostTNode, hostLView);
  })(
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */ getCurrentTNode(),
    getLView(),
  );
};
let ViewContainerRef = (() => {
  class ViewContainerRef {}
  return (ViewContainerRef.__NG_ELEMENT_ID__ = SWITCH_VIEW_CONTAINER_REF_FACTORY), ViewContainerRef;
})();
const VE_ViewContainerRef = ViewContainerRef,
  R3ViewContainerRef = class extends VE_ViewContainerRef {
    constructor(_lContainer, _hostTNode, _hostLView) {
      super(),
        (this._lContainer = _lContainer),
        (this._hostTNode = _hostTNode),
        (this._hostLView = _hostLView);
    }
    get element() {
      return createElementRef(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new NodeInjector(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      const parentLocation = getParentInjectorLocation(this._hostTNode, this._hostLView);
      if (hasParentInjector(parentLocation)) {
        const parentView = getParentInjectorView(parentLocation, this._hostLView),
          injectorIndex = getParentInjectorIndex(parentLocation);
        return new NodeInjector(parentView[1].data[injectorIndex + 8], parentView);
      }
      return new NodeInjector(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(index) {
      const viewRefs = getViewRefs(this._lContainer);
      return (null !== viewRefs && viewRefs[index]) || null;
    }
    get length() {
      return this._lContainer.length - 10;
    }
    createEmbeddedView(templateRef, context, index) {
      const viewRef = templateRef.createEmbeddedView(context || {});
      return this.insert(viewRef, index), viewRef;
    }
    createComponent(componentFactory, index, injector, projectableNodes, ngModuleRef) {
      const contextInjector = injector || this.parentInjector;
      if (!ngModuleRef && null == componentFactory.ngModule && contextInjector) {
        const result = contextInjector.get(NgModuleRef, null);
        result && (ngModuleRef = result);
      }
      const componentRef = componentFactory.create(
        contextInjector,
        projectableNodes,
        void 0,
        ngModuleRef,
      );
      return this.insert(componentRef.hostView, index), componentRef;
    }
    insert(viewRef, index) {
      const lView = viewRef._lView,
        tView = lView[1];
      if (isLContainer(lView[3])) {
        const prevIdx = this.indexOf(viewRef);
        if (-1 !== prevIdx) this.detach(prevIdx);
        else {
          const prevLContainer = lView[3],
            prevVCRef = new R3ViewContainerRef(
              prevLContainer,
              prevLContainer[6],
              prevLContainer[3],
            );
          prevVCRef.detach(prevVCRef.indexOf(viewRef));
        }
      }
      const adjustedIdx = this._adjustIndex(index),
        lContainer = this._lContainer;
      !(function (tView, lView, lContainer, index) {
        const indexInContainer = 10 + index,
          containerLength = lContainer.length;
        index > 0 && (lContainer[indexInContainer - 1][4] = lView),
          index < containerLength - 10
            ? ((lView[4] = lContainer[indexInContainer]), addToArray(lContainer, 10 + index, lView))
            : (lContainer.push(lView), (lView[4] = null)),
          (lView[3] = lContainer);
        const declarationLContainer = lView[17];
        null !== declarationLContainer &&
          lContainer !== declarationLContainer &&
          (function (declarationContainer, lView) {
            const movedViews = declarationContainer[9];
            lView[16] !== lView[3][3][16] && (declarationContainer[2] = !0),
              null === movedViews ? (declarationContainer[9] = [lView]) : movedViews.push(lView);
          })(declarationLContainer, lView);
        const lQueries = lView[19];
        null !== lQueries && lQueries.insertView(tView), (lView[2] |= 128);
      })(tView, lView, lContainer, adjustedIdx);
      const beforeNode = (function getBeforeNodeForView(viewIndexInContainer, lContainer) {
          const nextViewIndex = 10 + viewIndexInContainer + 1;
          if (nextViewIndex < lContainer.length) {
            const lView = lContainer[nextViewIndex],
              firstTNodeOfView = lView[1].firstChild;
            if (null !== firstTNodeOfView)
              return (function getFirstNativeNode(lView, tNode) {
                if (null !== tNode) {
                  const tNodeType = tNode.type;
                  if (3 & tNodeType) return getNativeByTNode(tNode, lView);
                  if (4 & tNodeType) return getBeforeNodeForView(-1, lView[tNode.index]);
                  if (8 & tNodeType) {
                    const elIcuContainerChild = tNode.child;
                    if (null !== elIcuContainerChild)
                      return getFirstNativeNode(lView, elIcuContainerChild);
                    {
                      const rNodeOrLContainer = lView[tNode.index];
                      return isLContainer(rNodeOrLContainer)
                        ? getBeforeNodeForView(-1, rNodeOrLContainer)
                        : unwrapRNode(rNodeOrLContainer);
                    }
                  }
                  if (32 & tNodeType)
                    return icuContainerIterate()() || unwrapRNode(lView[tNode.index]);
                  {
                    const componentView = lView[16],
                      componentHost = componentView[6],
                      parentView = getLViewParent(componentView),
                      firstProjectedTNode = componentHost.projection[tNode.projection];
                    return null != firstProjectedTNode
                      ? getFirstNativeNode(parentView, firstProjectedTNode)
                      : getFirstNativeNode(lView, tNode.next);
                  }
                }
                return null;
              })(lView, firstTNodeOfView);
          }
          return lContainer[7];
        })(adjustedIdx, lContainer),
        renderer = lView[11],
        parentRNode = nativeParentNode(renderer, lContainer[7]);
      return (
        null !== parentRNode &&
          (function (tView, parentTNode, renderer, lView, parentNativeNode, beforeNode) {
            (lView[0] = parentNativeNode),
              (lView[6] = parentTNode),
              applyView(tView, lView, renderer, 1, parentNativeNode, beforeNode);
          })(tView, lContainer[6], renderer, lView, parentRNode, beforeNode),
        viewRef.attachToViewContainerRef(this),
        addToArray(getOrCreateViewRefs(lContainer), adjustedIdx, viewRef),
        viewRef
      );
    }
    move(viewRef, newIndex) {
      return this.insert(viewRef, newIndex);
    }
    indexOf(viewRef) {
      const viewRefsArr = getViewRefs(this._lContainer);
      return null !== viewRefsArr ? viewRefsArr.indexOf(viewRef) : -1;
    }
    remove(index) {
      const adjustedIdx = this._adjustIndex(index, -1),
        detachedView = detachView(this._lContainer, adjustedIdx);
      detachedView &&
        (removeFromArray(getOrCreateViewRefs(this._lContainer), adjustedIdx),
        destroyLView(detachedView[1], detachedView));
    }
    detach(index) {
      const adjustedIdx = this._adjustIndex(index, -1),
        view = detachView(this._lContainer, adjustedIdx);
      return view && null != removeFromArray(getOrCreateViewRefs(this._lContainer), adjustedIdx)
        ? new ViewRef(view)
        : null;
    }
    _adjustIndex(index, shift = 0) {
      return null == index ? this.length + shift : index;
    }
  };
function getViewRefs(lContainer) {
  return lContainer[8];
}
function getOrCreateViewRefs(lContainer) {
  return lContainer[8] || (lContainer[8] = []);
}
const NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {};
class ComponentFactoryResolver$1 extends ComponentFactoryResolver {
  constructor(ngModule) {
    super(), (this.ngModule = ngModule);
  }
  resolveComponentFactory(component) {
    const componentDef = getComponentDef(component);
    return new ComponentFactory$1(componentDef, this.ngModule);
  }
}
function toRefArray(map) {
  const array = [];
  for (let nonMinified in map)
    map.hasOwnProperty(nonMinified) &&
      array.push({
        propName: map[nonMinified],
        templateName: nonMinified,
      });
  return array;
}
const SCHEDULER = new InjectionToken('SCHEDULER_TOKEN', {
  providedIn: 'root',
  factory: () => defaultScheduler,
});
class ComponentFactory$1 extends ComponentFactory {
  constructor(componentDef, ngModule) {
    super(),
      (this.componentDef = componentDef),
      (this.ngModule = ngModule),
      (this.componentType = componentDef.type),
      (this.selector = componentDef.selectors.map(stringifyCSSSelector).join(',')),
      (this.ngContentSelectors = componentDef.ngContentSelectors
        ? componentDef.ngContentSelectors
        : []),
      (this.isBoundToModule = !!ngModule);
  }
  get inputs() {
    return toRefArray(this.componentDef.inputs);
  }
  get outputs() {
    return toRefArray(this.componentDef.outputs);
  }
  create(injector, projectableNodes, rootSelectorOrNode, ngModule) {
    const rootViewInjector = (ngModule = ngModule || this.ngModule)
        ? (function (rootViewInjector, moduleInjector) {
            return {
              get: (token, notFoundValue, flags) => {
                const value = rootViewInjector.get(
                  token,
                  NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR,
                  flags,
                );
                return value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ||
                  notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR
                  ? value
                  : moduleInjector.get(token, notFoundValue, flags);
              },
            };
          })(injector, ngModule.injector)
        : injector,
      rendererFactory = rootViewInjector.get(RendererFactory2, domRendererFactory3),
      sanitizer = rootViewInjector.get(Sanitizer, null),
      hostRenderer = rendererFactory.createRenderer(null, this.componentDef),
      elementName = this.componentDef.selectors[0][0] || 'div',
      hostRNode = rootSelectorOrNode
        ? (function (renderer, elementOrSelector, encapsulation) {
            if (isProceduralRenderer(renderer))
              return renderer.selectRootElement(
                elementOrSelector,
                encapsulation === ViewEncapsulation.ShadowDom,
              );
            let rElement =
              'string' == typeof elementOrSelector
                ? renderer.querySelector(elementOrSelector)
                : elementOrSelector;
            return (rElement.textContent = ''), rElement;
          })(hostRenderer, rootSelectorOrNode, this.componentDef.encapsulation)
        : createElementNode(
            rendererFactory.createRenderer(null, this.componentDef),
            elementName,
            (function (elementName) {
              const name = elementName.toLowerCase();
              return 'svg' === name
                ? 'http://www.w3.org/2000/svg'
                : 'math' === name
                ? 'http://www.w3.org/1998/MathML/'
                : null;
            })(elementName),
          ),
      rootFlags = this.componentDef.onPush ? 576 : 528,
      rootContext = {
        components: [],
        scheduler: defaultScheduler,
        clean: CLEAN_PROMISE,
        playerHandler: null,
        flags: 0,
      },
      rootTView = createTView(0, null, null, 1, 0, null, null, null, null, null),
      rootLView = createLView(
        null,
        rootTView,
        rootContext,
        rootFlags,
        null,
        null,
        rendererFactory,
        hostRenderer,
        sanitizer,
        rootViewInjector,
      );
    let component, tElementNode;
    enterView(rootLView);
    try {
      const componentView =
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        (function (rNode, def, rootView, rendererFactory, hostRenderer, sanitizer) {
          const tView = rootView[1];
          rootView[20] = rNode;
          const tNode = getOrCreateTNode(tView, 20, 2, '#host', null),
            mergedAttrs = (tNode.mergedAttrs = def.hostAttrs);
          null !== mergedAttrs &&
            (computeStaticStyling(tNode, mergedAttrs, !0),
            null !== rNode &&
              (setUpAttributes(hostRenderer, rNode, mergedAttrs),
              null !== tNode.classes && writeDirectClass(hostRenderer, rNode, tNode.classes),
              null !== tNode.styles && writeDirectStyle(hostRenderer, rNode, tNode.styles)));
          const viewRenderer = rendererFactory.createRenderer(rNode, def),
            componentView = createLView(
              rootView,
              getOrCreateTComponentView(def),
              null,
              def.onPush ? 64 : 16,
              rootView[20],
              tNode,
              rendererFactory,
              viewRenderer,
              null,
              null,
            );
          return (
            tView.firstCreatePass &&
              (diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, rootView), tView, def.type),
              markAsComponentHost(tView, tNode),
              initTNodeFlags(tNode, rootView.length, 1)),
            addToViewTree(rootView, componentView),
            (rootView[20] = componentView)
          );
        })(hostRNode, this.componentDef, rootLView, rendererFactory, hostRenderer);
      if (hostRNode)
        if (rootSelectorOrNode)
          setUpAttributes(hostRenderer, hostRNode, ['ng-version', VERSION.full]);
        else {
          const { attrs: attrs, classes: classes } = (function (selector) {
            const attrs = [],
              classes = [];
            let i = 1,
              mode = 2;
            for (; i < selector.length; ) {
              let valueOrMarker = selector[i];
              if ('string' == typeof valueOrMarker)
                2 === mode
                  ? '' !== valueOrMarker && attrs.push(valueOrMarker, selector[++i])
                  : 8 === mode && classes.push(valueOrMarker);
              else {
                if (!isPositive(mode)) break;
                mode = valueOrMarker;
              }
              i++;
            }
            return {
              attrs: attrs,
              classes: classes,
            };
          })(this.componentDef.selectors[0]);
          attrs && setUpAttributes(hostRenderer, hostRNode, attrs),
            classes &&
              classes.length > 0 &&
              writeDirectClass(hostRenderer, hostRNode, classes.join(' '));
        }
      if (((tElementNode = getTNode(rootTView, 20)), void 0 !== projectableNodes)) {
        const projection = (tElementNode.projection = []);
        for (let i = 0; i < this.ngContentSelectors.length; i++) {
          const nodesforSlot = projectableNodes[i];
          projection.push(null != nodesforSlot ? Array.from(nodesforSlot) : null);
        }
      }
      (component = (function (componentView, componentDef, rootLView, rootContext, hostFeatures) {
        const tView = rootLView[1],
          component = (function (tView, lView, def) {
            const rootTNode = getCurrentTNode();
            tView.firstCreatePass &&
              (def.providersResolver && def.providersResolver(def),
              configureViewWithDirective(
                tView,
                rootTNode,
                lView,
                allocExpando(tView, lView, 1, null),
                def,
              ));
            const directive = getNodeInjectable(lView, tView, rootTNode.directiveStart, rootTNode);
            attachPatchData(directive, lView);
            const native = getNativeByTNode(rootTNode, lView);
            return native && attachPatchData(native, lView), directive;
          })(tView, rootLView, componentDef);
        if (
          (rootContext.components.push(component),
          (componentView[8] = component),
          hostFeatures && hostFeatures.forEach((feature) => feature(component, componentDef)),
          componentDef.contentQueries)
        ) {
          const tNode = getCurrentTNode();
          componentDef.contentQueries(1, component, tNode.directiveStart);
        }
        const rootTNode = getCurrentTNode();
        return (
          !tView.firstCreatePass ||
            (null === componentDef.hostBindings && null === componentDef.hostAttrs) ||
            (setSelectedIndex(rootTNode.index),
            registerHostBindingOpCodes(
              rootLView[1],
              rootTNode,
              0,
              rootTNode.directiveStart,
              rootTNode.directiveEnd,
              componentDef,
            ),
            invokeHostBindingsInCreationMode(componentDef, component)),
          component
        );
      })(componentView, this.componentDef, rootLView, rootContext, [LifecycleHooksFeature])),
        renderView(rootTView, rootLView, null);
    } finally {
      leaveView();
    }
    return new ComponentRef$1(
      this.componentType,
      component,
      createElementRef(tElementNode, rootLView),
      rootLView,
      tElementNode,
    );
  }
}
class ComponentRef$1 extends class {} {
  constructor(componentType, instance, location, _rootLView, _tNode) {
    super(),
      (this.location = location),
      (this._rootLView = _rootLView),
      (this._tNode = _tNode),
      (this.instance = instance),
      (this.hostView = this.changeDetectorRef = new RootViewRef(_rootLView)),
      (this.componentType = componentType);
  }
  get injector() {
    return new NodeInjector(this._tNode, this._rootLView);
  }
  destroy() {
    this.hostView.destroy();
  }
  onDestroy(callback) {
    this.hostView.onDestroy(callback);
  }
}
const modules = new Map();

class NgModuleRef$1 extends NgModuleRef {
  constructor(ngModuleType, _parent) {
    super(),
      (this._parent = _parent),
      (this._bootstrapComponents = []),
      (this.injector = this),
      (this.destroyCbs = []),
      (this.componentFactoryResolver = new ComponentFactoryResolver$1(this));
    const ngModuleDef = getNgModuleDef(ngModuleType),
      ngLocaleIdDef = ngModuleType[NG_LOC_ID_DEF] || null;
    ngLocaleIdDef && setLocaleId(ngLocaleIdDef),
      (this._bootstrapComponents = maybeUnwrapFn(ngModuleDef.bootstrap)),
      (this._r3Injector = createInjectorWithoutInjectorInstances(
        ngModuleType,
        _parent,
        [
          {
            provide: NgModuleRef,
            useValue: this,
          },
          {
            provide: ComponentFactoryResolver,
            useValue: this.componentFactoryResolver,
          },
        ],
        stringify(ngModuleType),
      )),
      this._r3Injector._resolveInjectorDefTypes(),
      (this.instance = this.get(ngModuleType));
  }
  get(token, notFoundValue = Injector.THROW_IF_NOT_FOUND, injectFlags = InjectFlags.Default) {
    return token === Injector || token === NgModuleRef || token === INJECTOR$1
      ? this
      : this._r3Injector.get(token, notFoundValue, injectFlags);
  }
  destroy() {
    const injector = this._r3Injector;
    !injector.destroyed && injector.destroy(),
      this.destroyCbs.forEach((fn) => fn()),
      (this.destroyCbs = null);
  }
  onDestroy(callback) {
    this.destroyCbs.push(callback);
  }
}
class NgModuleFactory$1 extends class {} {
  constructor(moduleType) {
    super(),
      (this.moduleType = moduleType),
      null !== getNgModuleDef(moduleType) &&
        (function (ngModuleType) {
          const visited = new Set();
          !(function recurse(ngModuleType) {
            const def = getNgModuleDef(ngModuleType, !0),
              id = def.id;
            null !== id &&
              (!(function (id, type, incoming) {
                if (type && type !== incoming)
                  throw new Error(
                    `Duplicate module registered for ${id} - ${stringify(type)} vs ${stringify(
                      type.name,
                    )}`,
                  );
              })(id, modules.get(id), ngModuleType),
              modules.set(id, ngModuleType));
            const imports = maybeUnwrapFn(def.imports);
            for (const i of imports) visited.has(i) || (visited.add(i), recurse(i));
          })(ngModuleType);
        })(moduleType);
  }
  create(parentInjector) {
    return new NgModuleRef$1(this.moduleType, parentInjector);
  }
}
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */ var extendStatics = function (
  d,
  b,
) {
  return (extendStatics =
    Object.setPrototypeOf ||
    ({
      __proto__: [],
    } instanceof Array &&
      function (d, b) {
        d.__proto__ = b;
      }) ||
    function (d, b) {
      for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
    })(d, b);
};
function __extends(d, b) {
  function __() {
    this.constructor = d;
  }
  extendStatics(d, b),
    (d.prototype = null === b ? Object.create(b) : ((__.prototype = b.prototype), new __()));
}
function isFunction(x) {
  return 'function' == typeof x;
}
var _enable_super_gross_mode_that_will_cause_bad_things = !1,
  config = {
    Promise: void 0,
    set useDeprecatedSynchronousErrorHandling(value) {
      _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
      return _enable_super_gross_mode_that_will_cause_bad_things;
    },
  };
function hostReportError(err) {
  setTimeout(function () {
    throw err;
  }, 0);
}
var empty = {
    closed: !0,
    next: function (value) {},
    error: function (err) {
      if (config.useDeprecatedSynchronousErrorHandling) throw err;
      hostReportError(err);
    },
    complete: function () {},
  },
  isArray = (function () {
    return (
      Array.isArray ||
      function (x) {
        return x && 'number' == typeof x.length;
      }
    );
  })();
function isObject(x) {
  return null !== x && 'object' == typeof x;
}
var UnsubscriptionError = (function () {
    function UnsubscriptionErrorImpl(errors) {
      return (
        Error.call(this),
        (this.message = errors
          ? errors.length +
            ' errors occurred during unsubscription:\n' +
            errors
              .map(function (err, i) {
                return i + 1 + ') ' + err.toString();
              })
              .join('\n  ')
          : ''),
        (this.name = 'UnsubscriptionError'),
        (this.errors = errors),
        this
      );
    }
    return (
      (UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype)), UnsubscriptionErrorImpl
    );
  })(),
  Subscription = (function () {
    function Subscription(unsubscribe) {
      (this.closed = !1),
        (this._parentOrParents = null),
        (this._subscriptions = null),
        unsubscribe && (this._unsubscribe = unsubscribe);
    }
    return (
      (Subscription.prototype.unsubscribe = function () {
        var errors;
        if (!this.closed) {
          var _parentOrParents = this._parentOrParents,
            _unsubscribe = this._unsubscribe,
            _subscriptions = this._subscriptions;
          if (
            ((this.closed = !0),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            _parentOrParents instanceof Subscription)
          )
            _parentOrParents.remove(this);
          else if (null !== _parentOrParents)
            for (var index = 0; index < _parentOrParents.length; ++index)
              _parentOrParents[index].remove(this);
          if (isFunction(_unsubscribe))
            try {
              _unsubscribe.call(this);
            } catch (e) {
              errors =
                e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
            }
          if (isArray(_subscriptions)) {
            index = -1;
            for (var len = _subscriptions.length; ++index < len; ) {
              var sub = _subscriptions[index];
              if (isObject(sub))
                try {
                  sub.unsubscribe();
                } catch (e) {
                  (errors = errors || []),
                    e instanceof UnsubscriptionError
                      ? (errors = errors.concat(flattenUnsubscriptionErrors(e.errors)))
                      : errors.push(e);
                }
            }
          }
          if (errors) throw new UnsubscriptionError(errors);
        }
      }),
      (Subscription.prototype.add = function (teardown) {
        var subscription = teardown;
        if (!teardown) return Subscription.EMPTY;
        switch (typeof teardown) {
          case 'function':
            subscription = new Subscription(teardown);

          case 'object':
            if (
              subscription === this ||
              subscription.closed ||
              'function' != typeof subscription.unsubscribe
            )
              return subscription;
            if (this.closed) return subscription.unsubscribe(), subscription;
            if (!(subscription instanceof Subscription)) {
              var tmp = subscription;
              (subscription = new Subscription())._subscriptions = [tmp];
            }
            break;

          default:
            throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var _parentOrParents = subscription._parentOrParents;
        if (null === _parentOrParents) subscription._parentOrParents = this;
        else if (_parentOrParents instanceof Subscription) {
          if (_parentOrParents === this) return subscription;
          subscription._parentOrParents = [_parentOrParents, this];
        } else {
          if (-1 !== _parentOrParents.indexOf(this)) return subscription;
          _parentOrParents.push(this);
        }
        var subscriptions = this._subscriptions;
        return (
          null === subscriptions
            ? (this._subscriptions = [subscription])
            : subscriptions.push(subscription),
          subscription
        );
      }),
      (Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
          var subscriptionIndex = subscriptions.indexOf(subscription);
          -1 !== subscriptionIndex && subscriptions.splice(subscriptionIndex, 1);
        }
      }),
      (Subscription.EMPTY = (function (empty) {
        return (empty.closed = !0), empty;
      })(new Subscription())),
      Subscription
    );
  })();
function flattenUnsubscriptionErrors(errors) {
  return errors.reduce(function (errs, err) {
    return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
  }, []);
}
var rxSubscriber = (function () {
    return 'function' == typeof Symbol ? Symbol('rxSubscriber') : '@@rxSubscriber_' + Math.random();
  })(),
  Subscriber = (function (_super) {
    function Subscriber(destinationOrNext, error, complete) {
      var _this = _super.call(this) || this;
      switch (
        ((_this.syncErrorValue = null),
        (_this.syncErrorThrown = !1),
        (_this.syncErrorThrowable = !1),
        (_this.isStopped = !1),
        arguments.length)
      ) {
        case 0:
          _this.destination = empty;
          break;

        case 1:
          if (!destinationOrNext) {
            _this.destination = empty;
            break;
          }
          if ('object' == typeof destinationOrNext) {
            destinationOrNext instanceof Subscriber
              ? ((_this.syncErrorThrowable = destinationOrNext.syncErrorThrowable),
                (_this.destination = destinationOrNext),
                destinationOrNext.add(_this))
              : ((_this.syncErrorThrowable = !0),
                (_this.destination = new SafeSubscriber(_this, destinationOrNext)));
            break;
          }

        default:
          (_this.syncErrorThrowable = !0),
            (_this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete));
      }
      return _this;
    }
    return (
      __extends(Subscriber, _super),
      (Subscriber.prototype[rxSubscriber] = function () {
        return this;
      }),
      (Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        return (subscriber.syncErrorThrowable = !1), subscriber;
      }),
      (Subscriber.prototype.next = function (value) {
        this.isStopped || this._next(value);
      }),
      (Subscriber.prototype.error = function (err) {
        this.isStopped || ((this.isStopped = !0), this._error(err));
      }),
      (Subscriber.prototype.complete = function () {
        this.isStopped || ((this.isStopped = !0), this._complete());
      }),
      (Subscriber.prototype.unsubscribe = function () {
        this.closed || ((this.isStopped = !0), _super.prototype.unsubscribe.call(this));
      }),
      (Subscriber.prototype._next = function (value) {
        this.destination.next(value);
      }),
      (Subscriber.prototype._error = function (err) {
        this.destination.error(err), this.unsubscribe();
      }),
      (Subscriber.prototype._complete = function () {
        this.destination.complete(), this.unsubscribe();
      }),
      (Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _parentOrParents = this._parentOrParents;
        return (
          (this._parentOrParents = null),
          this.unsubscribe(),
          (this.closed = !1),
          (this.isStopped = !1),
          (this._parentOrParents = _parentOrParents),
          this
        );
      }),
      Subscriber
    );
  })(Subscription),
  SafeSubscriber = (function (_super) {
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
      var next,
        _this = _super.call(this) || this;
      _this._parentSubscriber = _parentSubscriber;
      var context = _this;
      return (
        isFunction(observerOrNext)
          ? (next = observerOrNext)
          : observerOrNext &&
            ((next = observerOrNext.next),
            (error = observerOrNext.error),
            (complete = observerOrNext.complete),
            observerOrNext !== empty &&
              (isFunction((context = Object.create(observerOrNext)).unsubscribe) &&
                _this.add(context.unsubscribe.bind(context)),
              (context.unsubscribe = _this.unsubscribe.bind(_this)))),
        (_this._context = context),
        (_this._next = next),
        (_this._error = error),
        (_this._complete = complete),
        _this
      );
    }
    return (
      __extends(SafeSubscriber, _super),
      (SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
          var _parentSubscriber = this._parentSubscriber;
          config.useDeprecatedSynchronousErrorHandling && _parentSubscriber.syncErrorThrowable
            ? this.__tryOrSetError(_parentSubscriber, this._next, value) && this.unsubscribe()
            : this.__tryOrUnsub(this._next, value);
        }
      }),
      (SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
          var _parentSubscriber = this._parentSubscriber,
            useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
          if (this._error)
            useDeprecatedSynchronousErrorHandling && _parentSubscriber.syncErrorThrowable
              ? (this.__tryOrSetError(_parentSubscriber, this._error, err), this.unsubscribe())
              : (this.__tryOrUnsub(this._error, err), this.unsubscribe());
          else if (_parentSubscriber.syncErrorThrowable)
            useDeprecatedSynchronousErrorHandling
              ? ((_parentSubscriber.syncErrorValue = err), (_parentSubscriber.syncErrorThrown = !0))
              : hostReportError(err),
              this.unsubscribe();
          else {
            if ((this.unsubscribe(), useDeprecatedSynchronousErrorHandling)) throw err;
            hostReportError(err);
          }
        }
      }),
      (SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
          var _parentSubscriber = this._parentSubscriber;
          if (this._complete) {
            var wrappedComplete = function () {
              return _this._complete.call(_this._context);
            };
            config.useDeprecatedSynchronousErrorHandling && _parentSubscriber.syncErrorThrowable
              ? (this.__tryOrSetError(_parentSubscriber, wrappedComplete), this.unsubscribe())
              : (this.__tryOrUnsub(wrappedComplete), this.unsubscribe());
          } else this.unsubscribe();
        }
      }),
      (SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
          fn.call(this._context, value);
        } catch (err) {
          if ((this.unsubscribe(), config.useDeprecatedSynchronousErrorHandling)) throw err;
          hostReportError(err);
        }
      }),
      (SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!config.useDeprecatedSynchronousErrorHandling) throw new Error('bad call');
        try {
          fn.call(this._context, value);
        } catch (err) {
          return config.useDeprecatedSynchronousErrorHandling
            ? ((parent.syncErrorValue = err), (parent.syncErrorThrown = !0), !0)
            : (hostReportError(err), !0);
        }
        return !1;
      }),
      (SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        (this._context = null), (this._parentSubscriber = null), _parentSubscriber.unsubscribe();
      }),
      SafeSubscriber
    );
  })(Subscriber),
  observable = (function () {
    return ('function' == typeof Symbol && Symbol.observable) || '@@observable';
  })();
function noop$1() {}
function pipeFromArray(fns) {
  return fns
    ? 1 === fns.length
      ? fns[0]
      : function (input) {
          return fns.reduce(function (prev, fn) {
            return fn(prev);
          }, input);
        }
    : noop$1;
}
var Observable = (function () {
  function Observable(subscribe) {
    (this._isScalar = !1), subscribe && (this._subscribe = subscribe);
  }
  return (
    (Observable.prototype.lift = function (operator) {
      var observable = new Observable();
      return (observable.source = this), (observable.operator = operator), observable;
    }),
    (Observable.prototype.subscribe = function (observerOrNext, error, complete) {
      var operator = this.operator,
        sink = (function (nextOrObserver, error, complete) {
          if (nextOrObserver) {
            if (nextOrObserver instanceof Subscriber) return nextOrObserver;
            if (nextOrObserver[rxSubscriber]) return nextOrObserver[rxSubscriber]();
          }
          return nextOrObserver || error || complete
            ? new Subscriber(nextOrObserver, error, complete)
            : new Subscriber(empty);
        })(observerOrNext, error, complete);
      if (
        (sink.add(
          operator
            ? operator.call(sink, this.source)
            : this.source ||
              (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable)
            ? this._subscribe(sink)
            : this._trySubscribe(sink),
        ),
        config.useDeprecatedSynchronousErrorHandling &&
          sink.syncErrorThrowable &&
          ((sink.syncErrorThrowable = !1), sink.syncErrorThrown))
      )
        throw sink.syncErrorValue;
      return sink;
    }),
    (Observable.prototype._trySubscribe = function (sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        config.useDeprecatedSynchronousErrorHandling &&
          ((sink.syncErrorThrown = !0), (sink.syncErrorValue = err)),
          (function (observer) {
            for (; observer; ) {
              var destination = observer.destination;
              if (observer.closed || observer.isStopped) return !1;
              observer = destination && destination instanceof Subscriber ? destination : null;
            }
            return !0;
          })(sink)
            ? sink.error(err)
            : console.warn(err);
      }
    }),
    (Observable.prototype.forEach = function (next, promiseCtor) {
      var _this = this;
      return new (promiseCtor = getPromiseCtor(promiseCtor))(function (resolve, reject) {
        var subscription;
        subscription = _this.subscribe(
          function (value) {
            try {
              next(value);
            } catch (err) {
              reject(err), subscription && subscription.unsubscribe();
            }
          },
          reject,
          resolve,
        );
      });
    }),
    (Observable.prototype._subscribe = function (subscriber) {
      var source = this.source;
      return source && source.subscribe(subscriber);
    }),
    (Observable.prototype[observable] = function () {
      return this;
    }),
    (Observable.prototype.pipe = function () {
      for (var operations = [], _i = 0; _i < arguments.length; _i++) operations[_i] = arguments[_i];
      return 0 === operations.length ? this : pipeFromArray(operations)(this);
    }),
    (Observable.prototype.toPromise = function (promiseCtor) {
      var _this = this;
      return new (promiseCtor = getPromiseCtor(promiseCtor))(function (resolve, reject) {
        var value;
        _this.subscribe(
          function (x) {
            return (value = x);
          },
          function (err) {
            return reject(err);
          },
          function () {
            return resolve(value);
          },
        );
      });
    }),
    (Observable.create = function (subscribe) {
      return new Observable(subscribe);
    }),
    Observable
  );
})();
function getPromiseCtor(promiseCtor) {
  if ((promiseCtor || (promiseCtor = Promise), !promiseCtor))
    throw new Error('no Promise impl found');
  return promiseCtor;
}
var ObjectUnsubscribedError = (function () {
    function ObjectUnsubscribedErrorImpl() {
      return (
        Error.call(this),
        (this.message = 'object unsubscribed'),
        (this.name = 'ObjectUnsubscribedError'),
        this
      );
    }
    return (
      (ObjectUnsubscribedErrorImpl.prototype = Object.create(Error.prototype)),
      ObjectUnsubscribedErrorImpl
    );
  })(),
  SubjectSubscription = (function (_super) {
    function SubjectSubscription(subject, subscriber) {
      var _this = _super.call(this) || this;
      return (_this.subject = subject), (_this.subscriber = subscriber), (_this.closed = !1), _this;
    }
    return (
      __extends(SubjectSubscription, _super),
      (SubjectSubscription.prototype.unsubscribe = function () {
        if (!this.closed) {
          this.closed = !0;
          var subject = this.subject,
            observers = subject.observers;
          if (
            ((this.subject = null),
            observers && 0 !== observers.length && !subject.isStopped && !subject.closed)
          ) {
            var subscriberIndex = observers.indexOf(this.subscriber);
            -1 !== subscriberIndex && observers.splice(subscriberIndex, 1);
          }
        }
      }),
      SubjectSubscription
    );
  })(Subscription),
  SubjectSubscriber = (function (_super) {
    function SubjectSubscriber(destination) {
      var _this = _super.call(this, destination) || this;
      return (_this.destination = destination), _this;
    }
    return __extends(SubjectSubscriber, _super), SubjectSubscriber;
  })(Subscriber),
  Subject = (function (_super) {
    function Subject() {
      var _this = _super.call(this) || this;
      return (
        (_this.observers = []),
        (_this.closed = !1),
        (_this.isStopped = !1),
        (_this.hasError = !1),
        (_this.thrownError = null),
        _this
      );
    }
    return (
      __extends(Subject, _super),
      (Subject.prototype[rxSubscriber] = function () {
        return new SubjectSubscriber(this);
      }),
      (Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        return (subject.operator = operator), subject;
      }),
      (Subject.prototype.next = function (value) {
        if (this.closed) throw new ObjectUnsubscribedError();
        if (!this.isStopped)
          for (
            var observers = this.observers, len = observers.length, copy = observers.slice(), i = 0;
            i < len;
            i++
          )
            copy[i].next(value);
      }),
      (Subject.prototype.error = function (err) {
        if (this.closed) throw new ObjectUnsubscribedError();
        (this.hasError = !0), (this.thrownError = err), (this.isStopped = !0);
        for (
          var observers = this.observers, len = observers.length, copy = observers.slice(), i = 0;
          i < len;
          i++
        )
          copy[i].error(err);
        this.observers.length = 0;
      }),
      (Subject.prototype.complete = function () {
        if (this.closed) throw new ObjectUnsubscribedError();
        this.isStopped = !0;
        for (
          var observers = this.observers, len = observers.length, copy = observers.slice(), i = 0;
          i < len;
          i++
        )
          copy[i].complete();
        this.observers.length = 0;
      }),
      (Subject.prototype.unsubscribe = function () {
        (this.isStopped = !0), (this.closed = !0), (this.observers = null);
      }),
      (Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) throw new ObjectUnsubscribedError();
        return _super.prototype._trySubscribe.call(this, subscriber);
      }),
      (Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) throw new ObjectUnsubscribedError();
        return this.hasError
          ? (subscriber.error(this.thrownError), Subscription.EMPTY)
          : this.isStopped
          ? (subscriber.complete(), Subscription.EMPTY)
          : (this.observers.push(subscriber), new SubjectSubscription(this, subscriber));
      }),
      (Subject.prototype.asObservable = function () {
        var observable = new Observable();
        return (observable.source = this), observable;
      }),
      (Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
      }),
      Subject
    );
  })(Observable),
  AnonymousSubject = (function (_super) {
    function AnonymousSubject(destination, source) {
      var _this = _super.call(this) || this;
      return (_this.destination = destination), (_this.source = source), _this;
    }
    return (
      __extends(AnonymousSubject, _super),
      (AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        destination && destination.next && destination.next(value);
      }),
      (AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        destination && destination.error && this.destination.error(err);
      }),
      (AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        destination && destination.complete && this.destination.complete();
      }),
      (AnonymousSubject.prototype._subscribe = function (subscriber) {
        return this.source ? this.source.subscribe(subscriber) : Subscription.EMPTY;
      }),
      AnonymousSubject
    );
  })(Subject);
function refCount() {
  return function (source) {
    return source.lift(new RefCountOperator(source));
  };
}
var RefCountOperator = (function () {
    function RefCountOperator(connectable) {
      this.connectable = connectable;
    }
    return (
      (RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable),
          subscription = source.subscribe(refCounter);
        return refCounter.closed || (refCounter.connection = connectable.connect()), subscription;
      }),
      RefCountOperator
    );
  })(),
  RefCountSubscriber = (function (_super) {
    function RefCountSubscriber(destination, connectable) {
      var _this = _super.call(this, destination) || this;
      return (_this.connectable = connectable), _this;
    }
    return (
      __extends(RefCountSubscriber, _super),
      (RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
          this.connectable = null;
          var refCount = connectable._refCount;
          if (refCount <= 0) this.connection = null;
          else if (((connectable._refCount = refCount - 1), refCount > 1)) this.connection = null;
          else {
            var connection = this.connection,
              sharedConnection = connectable._connection;
            (this.connection = null),
              !sharedConnection ||
                (connection && sharedConnection !== connection) ||
                sharedConnection.unsubscribe();
          }
        } else this.connection = null;
      }),
      RefCountSubscriber
    );
  })(Subscriber),
  ConnectableObservable = (function (_super) {
    function ConnectableObservable(source, subjectFactory) {
      var _this = _super.call(this) || this;
      return (
        (_this.source = source),
        (_this.subjectFactory = subjectFactory),
        (_this._refCount = 0),
        (_this._isComplete = !1),
        _this
      );
    }
    return (
      __extends(ConnectableObservable, _super),
      (ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
      }),
      (ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        return (
          (subject && !subject.isStopped) || (this._subject = this.subjectFactory()), this._subject
        );
      }),
      (ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        return (
          connection ||
            ((this._isComplete = !1),
            (connection = this._connection = new Subscription()).add(
              this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)),
            ),
            connection.closed && ((this._connection = null), (connection = Subscription.EMPTY))),
          connection
        );
      }),
      (ConnectableObservable.prototype.refCount = function () {
        return refCount()(this);
      }),
      ConnectableObservable
    );
  })(Observable),
  connectableObservableDescriptor = (function () {
    var connectableProto = ConnectableObservable.prototype;
    return {
      operator: {
        value: null,
      },
      _refCount: {
        value: 0,
        writable: !0,
      },
      _subject: {
        value: null,
        writable: !0,
      },
      _connection: {
        value: null,
        writable: !0,
      },
      _subscribe: {
        value: connectableProto._subscribe,
      },
      _isComplete: {
        value: connectableProto._isComplete,
        writable: !0,
      },
      getSubject: {
        value: connectableProto.getSubject,
      },
      connect: {
        value: connectableProto.connect,
      },
      refCount: {
        value: connectableProto.refCount,
      },
    };
  })(),
  ConnectableSubscriber = (function (_super) {
    function ConnectableSubscriber(destination, connectable) {
      var _this = _super.call(this, destination) || this;
      return (_this.connectable = connectable), _this;
    }
    return (
      __extends(ConnectableSubscriber, _super),
      (ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe(), _super.prototype._error.call(this, err);
      }),
      (ConnectableSubscriber.prototype._complete = function () {
        (this.connectable._isComplete = !0),
          this._unsubscribe(),
          _super.prototype._complete.call(this);
      }),
      (ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
          this.connectable = null;
          var connection = connectable._connection;
          (connectable._refCount = 0),
            (connectable._subject = null),
            (connectable._connection = null),
            connection && connection.unsubscribe();
        }
      }),
      ConnectableSubscriber
    );
  })(SubjectSubscriber);
function isScheduler(value) {
  return value && 'function' == typeof value.schedule;
}
var subscribeToArray = function (array) {
  return function (subscriber) {
    for (var i = 0, len = array.length; i < len && !subscriber.closed; i++)
      subscriber.next(array[i]);
    subscriber.complete();
  };
};
function fromArray(input, scheduler) {
  return scheduler
    ? (function (input, scheduler) {
        return new Observable(function (subscriber) {
          var sub = new Subscription(),
            i = 0;
          return (
            sub.add(
              scheduler.schedule(function () {
                i !== input.length
                  ? (subscriber.next(input[i++]), subscriber.closed || sub.add(this.schedule()))
                  : subscriber.complete();
              }),
            ),
            sub
          );
        });
      })(input, scheduler)
    : new Observable(subscribeToArray(input));
}
function identity(x) {
  return x;
}
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
      (this.project = project), (this.thisArg = thisArg);
    }
    return (
      (MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
      }),
      MapOperator
    );
  })(),
  MapSubscriber = (function (_super) {
    function MapSubscriber(destination, project, thisArg) {
      var _this = _super.call(this, destination) || this;
      return (
        (_this.project = project), (_this.count = 0), (_this.thisArg = thisArg || _this), _this
      );
    }
    return (
      __extends(MapSubscriber, _super),
      (MapSubscriber.prototype._next = function (value) {
        var result;
        try {
          result = this.project.call(this.thisArg, value, this.count++);
        } catch (err) {
          return void this.destination.error(err);
        }
        this.destination.next(result);
      }),
      MapSubscriber
    );
  })(Subscriber),
  OuterSubscriber = (function (_super) {
    function OuterSubscriber() {
      return (null !== _super && _super.apply(this, arguments)) || this;
    }
    return (
      __extends(OuterSubscriber, _super),
      (OuterSubscriber.prototype.notifyNext = function (
        outerValue,
        innerValue,
        outerIndex,
        innerIndex,
        innerSub,
      ) {
        this.destination.next(innerValue);
      }),
      (OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
      }),
      (OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
      }),
      OuterSubscriber
    );
  })(Subscriber),
  InnerSubscriber = (function (_super) {
    function InnerSubscriber(parent, outerValue, outerIndex) {
      var _this = _super.call(this) || this;
      return (
        (_this.parent = parent),
        (_this.outerValue = outerValue),
        (_this.outerIndex = outerIndex),
        (_this.index = 0),
        _this
      );
    }
    return (
      __extends(InnerSubscriber, _super),
      (InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
      }),
      (InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this), this.unsubscribe();
      }),
      (InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this), this.unsubscribe();
      }),
      InnerSubscriber
    );
  })(Subscriber);
function getSymbolIterator$1() {
  return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator';
}
var iterator = getSymbolIterator$1();
var subscribeTo = function (result) {
  if (result && 'function' == typeof result[observable])
    return (
      (obj = result),
      function (subscriber) {
        var obs = obj[observable]();
        if ('function' != typeof obs.subscribe)
          throw new TypeError('Provided object does not correctly implement Symbol.observable');
        return obs.subscribe(subscriber);
      }
    );
  if ((x = result) && 'number' == typeof x.length && 'function' != typeof x)
    return subscribeToArray(result);
  var x;
  if (
    (function (value) {
      return !!value && 'function' != typeof value.subscribe && 'function' == typeof value.then;
    })(result)
  )
    return (function (promise) {
      return function (subscriber) {
        return (
          promise
            .then(
              function (value) {
                subscriber.closed || (subscriber.next(value), subscriber.complete());
              },
              function (err) {
                return subscriber.error(err);
              },
            )
            .then(null, hostReportError),
          subscriber
        );
      };
    })(result);
  if (result && 'function' == typeof result[iterator])
    return (
      (iterable = result),
      function (subscriber) {
        for (var iterator$1 = iterable[iterator](); ; ) {
          var item = iterator$1.next();
          if (item.done) {
            subscriber.complete();
            break;
          }
          if ((subscriber.next(item.value), subscriber.closed)) break;
        }
        return (
          'function' == typeof iterator$1.return &&
            subscriber.add(function () {
              iterator$1.return && iterator$1.return();
            }),
          subscriber
        );
      }
    );
  var iterable,
    obj,
    value = isObject(result) ? 'an invalid object' : "'" + result + "'";
  throw new TypeError(
    'You provided ' +
      value +
      ' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.',
  );
};
var MergeMapOperator = (function () {
    function MergeMapOperator(project, concurrent) {
      void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY),
        (this.project = project),
        (this.concurrent = concurrent);
    }
    return (
      (MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
      }),
      MergeMapOperator
    );
  })(),
  MergeMapSubscriber = (function (_super) {
    function MergeMapSubscriber(destination, project, concurrent) {
      void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY);
      var _this = _super.call(this, destination) || this;
      return (
        (_this.project = project),
        (_this.concurrent = concurrent),
        (_this.hasCompleted = !1),
        (_this.buffer = []),
        (_this.active = 0),
        (_this.index = 0),
        _this
      );
    }
    return (
      __extends(MergeMapSubscriber, _super),
      (MergeMapSubscriber.prototype._next = function (value) {
        this.active < this.concurrent ? this._tryNext(value) : this.buffer.push(value);
      }),
      (MergeMapSubscriber.prototype._tryNext = function (value) {
        var result,
          index = this.index++;
        try {
          result = this.project(value, index);
        } catch (err) {
          return void this.destination.error(err);
        }
        this.active++, this._innerSub(result, value, index);
      }),
      (MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        var innerSubscriber = new InnerSubscriber(this, value, index),
          destination = this.destination;
        destination.add(innerSubscriber);
        var innerSubscription = (function (
          outerSubscriber,
          result,
          outerValue,
          outerIndex,
          innerSubscriber,
        ) {
          if (
            (void 0 === innerSubscriber &&
              (innerSubscriber = new InnerSubscriber(outerSubscriber, void 0, void 0)),
            !innerSubscriber.closed)
          )
            return result instanceof Observable
              ? result.subscribe(innerSubscriber)
              : subscribeTo(result)(innerSubscriber);
        })(this, ish, 0, 0, innerSubscriber);
        innerSubscription !== innerSubscriber && destination.add(innerSubscription);
      }),
      (MergeMapSubscriber.prototype._complete = function () {
        (this.hasCompleted = !0),
          0 === this.active && 0 === this.buffer.length && this.destination.complete(),
          this.unsubscribe();
      }),
      (MergeMapSubscriber.prototype.notifyNext = function (
        outerValue,
        innerValue,
        outerIndex,
        innerIndex,
        innerSub,
      ) {
        this.destination.next(innerValue);
      }),
      (MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub),
          this.active--,
          buffer.length > 0
            ? this._next(buffer.shift())
            : 0 === this.active && this.hasCompleted && this.destination.complete();
      }),
      MergeMapSubscriber
    );
  })(OuterSubscriber);
function mergeAll(concurrent) {
  return (
    void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY),
    (function mergeMap(project, resultSelector, concurrent) {
      return (
        void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY),
        'function' == typeof resultSelector
          ? function (source) {
              return source.pipe(
                mergeMap(function (a, i) {
                  return ((input = project(a, i)),
                  input instanceof Observable ? input : new Observable(subscribeTo(input))).pipe(
                    (function (project, thisArg) {
                      return function (source) {
                        return source.lift(new MapOperator(project, void 0));
                      };
                    })(function (b, ii) {
                      return resultSelector(a, b, i, ii);
                    }),
                  );
                  var input;
                }, concurrent),
              );
            }
          : ('number' == typeof resultSelector && (concurrent = resultSelector),
            function (source) {
              return source.lift(new MergeMapOperator(project, concurrent));
            })
      );
    })(identity, concurrent)
  );
}
const EventEmitter =
  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  class extends Subject {
    constructor(isAsync = !1) {
      super(), (this.__isAsync = isAsync);
    }
    emit(value) {
      super.next(value);
    }
    subscribe(generatorOrNext, error, complete) {
      let schedulerFn,
        errorFn = (err) => null,
        completeFn = () => null;
      generatorOrNext && 'object' == typeof generatorOrNext
        ? ((schedulerFn = this.__isAsync
            ? (value) => {
                setTimeout(() => generatorOrNext.next(value));
              }
            : (value) => {
                generatorOrNext.next(value);
              }),
          generatorOrNext.error &&
            (errorFn = this.__isAsync
              ? (err) => {
                  setTimeout(() => generatorOrNext.error(err));
                }
              : (err) => {
                  generatorOrNext.error(err);
                }),
          generatorOrNext.complete &&
            (completeFn = this.__isAsync
              ? () => {
                  setTimeout(() => generatorOrNext.complete());
                }
              : () => {
                  generatorOrNext.complete();
                }))
        : ((schedulerFn = this.__isAsync
            ? (value) => {
                setTimeout(() => generatorOrNext(value));
              }
            : (value) => {
                generatorOrNext(value);
              }),
          error &&
            (errorFn = this.__isAsync
              ? (err) => {
                  setTimeout(() => error(err));
                }
              : (err) => {
                  error(err);
                }),
          complete &&
            (completeFn = this.__isAsync
              ? () => {
                  setTimeout(() => complete());
                }
              : () => {
                  complete();
                }));
      const sink = super.subscribe(schedulerFn, errorFn, completeFn);
      return generatorOrNext instanceof Subscription && generatorOrNext.add(sink), sink;
    }
  };
function shareSubjectFactory() {
  return new Subject();
}

const APP_INITIALIZER = new InjectionToken('Application Initializer');
let ApplicationInitStatus = (() => {
  class ApplicationInitStatus {
    constructor(appInits) {
      (this.appInits = appInits),
        (this.resolve = noop),
        (this.reject = noop),
        (this.initialized = !1),
        (this.done = !1),
        (this.donePromise = new Promise((res, rej) => {
          (this.resolve = res), (this.reject = rej);
        }));
    }
    runInitializers() {
      if (this.initialized) return;
      const asyncInitPromises = [],
        complete = () => {
          (this.done = !0), this.resolve();
        };
      if (this.appInits)
        for (let i = 0; i < this.appInits.length; i++) {
          const initResult = this.appInits[i]();
          isPromise(initResult) && asyncInitPromises.push(initResult);
        }
      Promise.all(asyncInitPromises)
        .then(() => {
          complete();
        })
        .catch((e) => {
          this.reject(e);
        }),
        0 === asyncInitPromises.length && complete(),
        (this.initialized = !0);
    }
  }
  return (
    (ApplicationInitStatus.ɵfac = function (t) {
      return new (t || ApplicationInitStatus)(ɵɵinject(APP_INITIALIZER, 8));
    }),
    (ApplicationInitStatus.ɵprov = ɵɵdefineInjectable({
      token: ApplicationInitStatus,
      factory: ApplicationInitStatus.ɵfac,
    })),
    ApplicationInitStatus
  );
})();
const APP_ID = new InjectionToken('AppId'),
  APP_ID_RANDOM_PROVIDER = {
    provide: APP_ID,
    useFactory: function () {
      return `${_randomChar()}${_randomChar()}${_randomChar()}`;
    },
    deps: [],
  };
function _randomChar() {
  return String.fromCharCode(97 + Math.floor(25 * Math.random()));
}
const PLATFORM_INITIALIZER = new InjectionToken('Platform Initializer'),
  PLATFORM_ID = new InjectionToken('Platform ID'),
  APP_BOOTSTRAP_LISTENER = new InjectionToken('appBootstrapListener'),
  LOCALE_ID$1 = new InjectionToken('LocaleId'),
  DEFAULT_CURRENCY_CODE = new InjectionToken('DefaultCurrencyCode');

class ModuleWithComponentFactories {
  constructor(ngModuleFactory, componentFactories) {
    (this.ngModuleFactory = ngModuleFactory), (this.componentFactories = componentFactories);
  }
}
const Compiler_compileModuleSync__POST_R3__ = function (moduleType) {
    return new NgModuleFactory$1(moduleType);
  },
  Compiler_compileModuleSync = Compiler_compileModuleSync__POST_R3__,
  Compiler_compileModuleAsync = function (moduleType) {
    return Promise.resolve(Compiler_compileModuleSync__POST_R3__(moduleType));
  },
  Compiler_compileModuleAndAllComponentsSync__POST_R3__ = function (moduleType) {
    const ngModuleFactory = Compiler_compileModuleSync__POST_R3__(moduleType),
      componentFactories = maybeUnwrapFn(getNgModuleDef(moduleType).declarations).reduce(
        (factories, declaration) => {
          const componentDef = getComponentDef(declaration);
          return componentDef && factories.push(new ComponentFactory$1(componentDef)), factories;
        },
        [],
      );
    return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
  },
  Compiler_compileModuleAndAllComponentsSync = Compiler_compileModuleAndAllComponentsSync__POST_R3__,
  Compiler_compileModuleAndAllComponentsAsync = function (moduleType) {
    return Promise.resolve(Compiler_compileModuleAndAllComponentsSync__POST_R3__(moduleType));
  };
let Compiler = (() => {
  class Compiler {
    constructor() {
      (this.compileModuleSync = Compiler_compileModuleSync),
        (this.compileModuleAsync = Compiler_compileModuleAsync),
        (this.compileModuleAndAllComponentsSync = Compiler_compileModuleAndAllComponentsSync),
        (this.compileModuleAndAllComponentsAsync = Compiler_compileModuleAndAllComponentsAsync);
    }
    clearCache() {}
    clearCacheFor(type) {}
    getModuleId(moduleType) {}
  }
  return (
    (Compiler.ɵfac = function (t) {
      return new (t || Compiler)();
    }),
    (Compiler.ɵprov = ɵɵdefineInjectable({
      token: Compiler,
      factory: Compiler.ɵfac,
    })),
    Compiler
  );
})();
const promise = (() => Promise.resolve(0))();
function scheduleMicroTask(fn) {
  'undefined' == typeof Zone
    ? promise.then(() => {
        fn && fn.apply(null, null);
      })
    : Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}

class NgZone {
  constructor({
    enableLongStackTrace: enableLongStackTrace = !1,
    shouldCoalesceEventChangeDetection: shouldCoalesceEventChangeDetection = !1,
    shouldCoalesceRunChangeDetection: shouldCoalesceRunChangeDetection = !1,
  }) {
    if (
      ((this.hasPendingMacrotasks = !1),
      (this.hasPendingMicrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new EventEmitter(!1)),
      (this.onMicrotaskEmpty = new EventEmitter(!1)),
      (this.onStable = new EventEmitter(!1)),
      (this.onError = new EventEmitter(!1)),
      'undefined' == typeof Zone)
    )
      throw new Error('In this configuration Angular requires Zone.js');
    Zone.assertZonePatched(),
      (this._nesting = 0),
      (this._outer = this._inner = Zone.current),
      Zone.TaskTrackingZoneSpec &&
        (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
      enableLongStackTrace &&
        Zone.longStackTraceZoneSpec &&
        (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
      (this.shouldCoalesceEventChangeDetection =
        !shouldCoalesceRunChangeDetection && shouldCoalesceEventChangeDetection),
      (this.shouldCoalesceRunChangeDetection = shouldCoalesceRunChangeDetection),
      (this.lastRequestAnimationFrameId = -1),
      (this.nativeRequestAnimationFrame = (function () {
        let nativeRequestAnimationFrame = _global.requestAnimationFrame,
          nativeCancelAnimationFrame = _global.cancelAnimationFrame;
        if (
          'undefined' != typeof Zone &&
          nativeRequestAnimationFrame &&
          nativeCancelAnimationFrame
        ) {
          const unpatchedRequestAnimationFrame =
            nativeRequestAnimationFrame[Zone.__symbol__('OriginalDelegate')];
          unpatchedRequestAnimationFrame &&
            (nativeRequestAnimationFrame = unpatchedRequestAnimationFrame);
          const unpatchedCancelAnimationFrame =
            nativeCancelAnimationFrame[Zone.__symbol__('OriginalDelegate')];
          unpatchedCancelAnimationFrame &&
            (nativeCancelAnimationFrame = unpatchedCancelAnimationFrame);
        }
        return {
          nativeRequestAnimationFrame: nativeRequestAnimationFrame,
          nativeCancelAnimationFrame: nativeCancelAnimationFrame,
        };
      })().nativeRequestAnimationFrame),
      (function (zone) {
        const delayChangeDetectionForEventsDelegate = () => {
          !(function (zone) {
            -1 === zone.lastRequestAnimationFrameId &&
              ((zone.lastRequestAnimationFrameId = zone.nativeRequestAnimationFrame.call(
                _global,
                () => {
                  zone.fakeTopEventTask ||
                    (zone.fakeTopEventTask = Zone.root.scheduleEventTask(
                      'fakeTopEventTask',
                      () => {
                        (zone.lastRequestAnimationFrameId = -1),
                          updateMicroTaskStatus(zone),
                          checkStable(zone);
                      },
                      void 0,
                      () => {},
                      () => {},
                    )),
                    zone.fakeTopEventTask.invoke();
                },
              )),
              updateMicroTaskStatus(zone));
          })(zone);
        };
        zone._inner = zone._inner.fork({
          name: 'angular',
          properties: {
            isAngularZone: !0,
          },
          onInvokeTask: (delegate, current, target, task, applyThis, applyArgs) => {
            try {
              return onEnter(zone), delegate.invokeTask(target, task, applyThis, applyArgs);
            } finally {
              ((zone.shouldCoalesceEventChangeDetection && 'eventTask' === task.type) ||
                zone.shouldCoalesceRunChangeDetection) &&
                delayChangeDetectionForEventsDelegate(),
                onLeave(zone);
            }
          },
          onInvoke: (delegate, current, target, callback, applyThis, applyArgs, source) => {
            try {
              return onEnter(zone), delegate.invoke(target, callback, applyThis, applyArgs, source);
            } finally {
              zone.shouldCoalesceRunChangeDetection && delayChangeDetectionForEventsDelegate(),
                onLeave(zone);
            }
          },
          onHasTask: (delegate, current, target, hasTaskState) => {
            delegate.hasTask(target, hasTaskState),
              current === target &&
                ('microTask' == hasTaskState.change
                  ? ((zone._hasPendingMicrotasks = hasTaskState.microTask),
                    updateMicroTaskStatus(zone),
                    checkStable(zone))
                  : 'macroTask' == hasTaskState.change &&
                    (zone.hasPendingMacrotasks = hasTaskState.macroTask));
          },
          onHandleError: (delegate, current, target, error) => (
            delegate.handleError(target, error),
            zone.runOutsideAngular(() => zone.onError.emit(error)),
            !1
          ),
        });
      })(this);
  }
  static isInAngularZone() {
    return !0 === Zone.current.get('isAngularZone');
  }
  static assertInAngularZone() {
    if (!NgZone.isInAngularZone())
      throw new Error('Expected to be in Angular Zone, but it is not!');
  }
  static assertNotInAngularZone() {
    if (NgZone.isInAngularZone()) throw new Error('Expected to not be in Angular Zone, but it is!');
  }
  run(fn, applyThis, applyArgs) {
    return this._inner.run(fn, applyThis, applyArgs);
  }
  runTask(fn, applyThis, applyArgs, name) {
    const zone = this._inner,
      task = zone.scheduleEventTask('NgZoneEvent: ' + name, fn, EMPTY_PAYLOAD, noop, noop);
    try {
      return zone.runTask(task, applyThis, applyArgs);
    } finally {
      zone.cancelTask(task);
    }
  }
  runGuarded(fn, applyThis, applyArgs) {
    return this._inner.runGuarded(fn, applyThis, applyArgs);
  }
  runOutsideAngular(fn) {
    return this._outer.run(fn);
  }
}
const EMPTY_PAYLOAD = {};
function checkStable(zone) {
  if (0 == zone._nesting && !zone.hasPendingMicrotasks && !zone.isStable)
    try {
      zone._nesting++, zone.onMicrotaskEmpty.emit(null);
    } finally {
      if ((zone._nesting--, !zone.hasPendingMicrotasks))
        try {
          zone.runOutsideAngular(() => zone.onStable.emit(null));
        } finally {
          zone.isStable = !0;
        }
    }
}
function updateMicroTaskStatus(zone) {
  zone.hasPendingMicrotasks = !!(
    zone._hasPendingMicrotasks ||
    ((zone.shouldCoalesceEventChangeDetection || zone.shouldCoalesceRunChangeDetection) &&
      -1 !== zone.lastRequestAnimationFrameId)
  );
}
function onEnter(zone) {
  zone._nesting++, zone.isStable && ((zone.isStable = !1), zone.onUnstable.emit(null));
}
function onLeave(zone) {
  zone._nesting--, checkStable(zone);
}
class NoopNgZone {
  constructor() {
    (this.hasPendingMicrotasks = !1),
      (this.hasPendingMacrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new EventEmitter()),
      (this.onMicrotaskEmpty = new EventEmitter()),
      (this.onStable = new EventEmitter()),
      (this.onError = new EventEmitter());
  }
  run(fn, applyThis, applyArgs) {
    return fn.apply(applyThis, applyArgs);
  }
  runGuarded(fn, applyThis, applyArgs) {
    return fn.apply(applyThis, applyArgs);
  }
  runOutsideAngular(fn) {
    return fn();
  }
  runTask(fn, applyThis, applyArgs, name) {
    return fn.apply(applyThis, applyArgs);
  }
}
let Testability = (() => {
    class Testability {
      constructor(_ngZone) {
        (this._ngZone = _ngZone),
          (this._pendingCount = 0),
          (this._isZoneStable = !0),
          (this._didWork = !1),
          (this._callbacks = []),
          (this.taskTrackingZone = null),
          this._watchAngularEvents(),
          _ngZone.run(() => {
            this.taskTrackingZone =
              'undefined' == typeof Zone ? null : Zone.current.get('TaskTrackingZone');
          });
      }
      _watchAngularEvents() {
        this._ngZone.onUnstable.subscribe({
          next: () => {
            (this._didWork = !0), (this._isZoneStable = !1);
          },
        }),
          this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.subscribe({
              next: () => {
                NgZone.assertNotInAngularZone(),
                  scheduleMicroTask(() => {
                    (this._isZoneStable = !0), this._runCallbacksIfReady();
                  });
              },
            });
          });
      }
      increasePendingRequestCount() {
        return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
      }
      decreasePendingRequestCount() {
        if (((this._pendingCount -= 1), this._pendingCount < 0))
          throw new Error('pending async requests below zero');
        return this._runCallbacksIfReady(), this._pendingCount;
      }
      isStable() {
        return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
      }
      _runCallbacksIfReady() {
        if (this.isStable())
          scheduleMicroTask(() => {
            for (; 0 !== this._callbacks.length; ) {
              let cb = this._callbacks.pop();
              clearTimeout(cb.timeoutId), cb.doneCb(this._didWork);
            }
            this._didWork = !1;
          });
        else {
          let pending = this.getPendingTasks();
          (this._callbacks = this._callbacks.filter(
            (cb) => !cb.updateCb || !cb.updateCb(pending) || (clearTimeout(cb.timeoutId), !1),
          )),
            (this._didWork = !0);
        }
      }
      getPendingTasks() {
        return this.taskTrackingZone
          ? this.taskTrackingZone.macroTasks.map((t) => ({
              source: t.source,
              creationLocation: t.creationLocation,
              data: t.data,
            }))
          : [];
      }
      addCallback(cb, timeout, updateCb) {
        let timeoutId = -1;
        timeout &&
          timeout > 0 &&
          (timeoutId = setTimeout(() => {
            (this._callbacks = this._callbacks.filter((cb) => cb.timeoutId !== timeoutId)),
              cb(this._didWork, this.getPendingTasks());
          }, timeout)),
          this._callbacks.push({
            doneCb: cb,
            timeoutId: timeoutId,
            updateCb: updateCb,
          });
      }
      whenStable(doneCb, timeout, updateCb) {
        if (updateCb && !this.taskTrackingZone)
          throw new Error(
            'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?',
          );
        this.addCallback(doneCb, timeout, updateCb), this._runCallbacksIfReady();
      }
      getPendingRequestCount() {
        return this._pendingCount;
      }
      findProviders(using, provider, exactMatch) {
        return [];
      }
    }
    return (
      (Testability.ɵfac = function (t) {
        return new (t || Testability)(ɵɵinject(NgZone));
      }),
      (Testability.ɵprov = ɵɵdefineInjectable({
        token: Testability,
        factory: Testability.ɵfac,
      })),
      Testability
    );
  })(),
  TestabilityRegistry = (() => {
    class TestabilityRegistry {
      constructor() {
        (this._applications = new Map()), _testabilityGetter.addToWindow(this);
      }
      registerApplication(token, testability) {
        this._applications.set(token, testability);
      }
      unregisterApplication(token) {
        this._applications.delete(token);
      }
      unregisterAllApplications() {
        this._applications.clear();
      }
      getTestability(elem) {
        return this._applications.get(elem) || null;
      }
      getAllTestabilities() {
        return Array.from(this._applications.values());
      }
      getAllRootElements() {
        return Array.from(this._applications.keys());
      }
      findTestabilityInTree(elem, findInAncestors = !0) {
        return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
      }
    }
    return (
      (TestabilityRegistry.ɵfac = function (t) {
        return new (t || TestabilityRegistry)();
      }),
      (TestabilityRegistry.ɵprov = ɵɵdefineInjectable({
        token: TestabilityRegistry,
        factory: TestabilityRegistry.ɵfac,
      })),
      TestabilityRegistry
    );
  })();
class _NoopGetTestability {
  addToWindow(registry) {}
  findTestabilityInTree(registry, elem, findInAncestors) {
    return null;
  }
}
let _testabilityGetter = new _NoopGetTestability(),
  _devMode = !0,
  _runModeLocked = !1;
function isDevMode() {
  return (_runModeLocked = !0), _devMode;
}

let _platform,
  Console = (() => {
    class Console {
      log(message) {
        console.log(message);
      }
      warn(message) {
        console.warn(message);
      }
    }
    return (
      (Console.ɵfac = function (t) {
        return new (t || Console)();
      }),
      (Console.ɵprov = ɵɵdefineInjectable({
        token: Console,
        factory: Console.ɵfac,
      })),
      Console
    );
  })();
const ALLOW_MULTIPLE_PLATFORMS = new InjectionToken('AllowMultipleToken');
function createPlatformFactory(parentPlatformFactory, name, providers = []) {
  const desc = `Platform: ${name}`,
    marker = new InjectionToken(desc);
  return (extraProviders = []) => {
    let platform = getPlatform();
    if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, !1))
      if (parentPlatformFactory)
        parentPlatformFactory(
          providers.concat(extraProviders).concat({
            provide: marker,
            useValue: !0,
          }),
        );
      else {
        const injectedProviders = providers.concat(extraProviders).concat(
          {
            provide: marker,
            useValue: !0,
          },
          {
            provide: INJECTOR_SCOPE,
            useValue: 'platform',
          },
        );
        !(function (injector) {
          if (
            _platform &&
            !_platform.destroyed &&
            !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, !1)
          )
            throw new Error(
              'There can be only one platform. Destroy the previous one to create a new one.',
            );
          _platform = injector.get(PlatformRef);
          const inits = injector.get(PLATFORM_INITIALIZER, null);
          inits && inits.forEach((init) => init());
        })(
          Injector.create({
            providers: injectedProviders,
            name: desc,
          }),
        );
      }
    return (function (requiredToken) {
      const platform = getPlatform();
      if (!platform) throw new Error('No platform exists!');
      if (!platform.injector.get(requiredToken, null))
        throw new Error(
          'A platform with a different configuration has been created. Please destroy it first.',
        );
      return platform;
    })(marker);
  };
}
function getPlatform() {
  return _platform && !_platform.destroyed ? _platform : null;
}
let PlatformRef = (() => {
  class PlatformRef {
    constructor(_injector) {
      (this._injector = _injector),
        (this._modules = []),
        (this._destroyListeners = []),
        (this._destroyed = !1);
    }
    bootstrapModuleFactory(moduleFactory, options) {
      const ngZone = (function (ngZoneOption, extra) {
          let ngZone;
          return (
            (ngZone =
              'noop' === ngZoneOption
                ? new NoopNgZone()
                : ('zone.js' === ngZoneOption ? void 0 : ngZoneOption) ||
                  new NgZone({
                    enableLongStackTrace: isDevMode(),
                    shouldCoalesceEventChangeDetection: !!(null == extra
                      ? void 0
                      : extra.ngZoneEventCoalescing),
                    shouldCoalesceRunChangeDetection: !!(null == extra
                      ? void 0
                      : extra.ngZoneRunCoalescing),
                  })),
            ngZone
          );
        })(options ? options.ngZone : void 0, {
          ngZoneEventCoalescing: (options && options.ngZoneEventCoalescing) || !1,
          ngZoneRunCoalescing: (options && options.ngZoneRunCoalescing) || !1,
        }),
        providers = [
          {
            provide: NgZone,
            useValue: ngZone,
          },
        ];
      return ngZone.run(() => {
        const ngZoneInjector = Injector.create({
            providers: providers,
            parent: this.injector,
            name: moduleFactory.moduleType.name,
          }),
          moduleRef = moduleFactory.create(ngZoneInjector),
          exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
        if (!exceptionHandler)
          throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
        return (
          ngZone.runOutsideAngular(() => {
            const subscription = ngZone.onError.subscribe({
              next: (error) => {
                exceptionHandler.handleError(error);
              },
            });
            moduleRef.onDestroy(() => {
              remove(this._modules, moduleRef), subscription.unsubscribe();
            });
          }),
          (function (errorHandler, ngZone, callback) {
            try {
              const result = callback();
              return isPromise(result)
                ? result.catch((e) => {
                    throw (ngZone.runOutsideAngular(() => errorHandler.handleError(e)), e);
                  })
                : result;
            } catch (e) {
              throw (ngZone.runOutsideAngular(() => errorHandler.handleError(e)), e);
            }
          })(exceptionHandler, ngZone, () => {
            const initStatus = moduleRef.injector.get(ApplicationInitStatus);
            return (
              initStatus.runInitializers(),
              initStatus.donePromise.then(
                () => (
                  setLocaleId(moduleRef.injector.get(LOCALE_ID$1, 'en-US') || 'en-US'),
                  this._moduleDoBootstrap(moduleRef),
                  moduleRef
                ),
              )
            );
          })
        );
      });
    }
    bootstrapModule(moduleType, compilerOptions = []) {
      const options = optionsReducer({}, compilerOptions);
      return (function (injector, options, moduleType) {
        const moduleFactory = new NgModuleFactory$1(moduleType);
        return Promise.resolve(moduleFactory);
      })(0, 0, moduleType).then((moduleFactory) =>
        this.bootstrapModuleFactory(moduleFactory, options),
      );
    }
    _moduleDoBootstrap(moduleRef) {
      const appRef = moduleRef.injector.get(ApplicationRef);
      if (moduleRef._bootstrapComponents.length > 0)
        moduleRef._bootstrapComponents.forEach((f) => appRef.bootstrap(f));
      else {
        if (!moduleRef.instance.ngDoBootstrap)
          throw new Error(
            `The module ${stringify(
              moduleRef.instance.constructor,
            )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
              'Please define one of these.',
          );
        moduleRef.instance.ngDoBootstrap(appRef);
      }
      this._modules.push(moduleRef);
    }
    onDestroy(callback) {
      this._destroyListeners.push(callback);
    }
    get injector() {
      return this._injector;
    }
    destroy() {
      if (this._destroyed) throw new Error('The platform has already been destroyed!');
      this._modules.slice().forEach((module) => module.destroy()),
        this._destroyListeners.forEach((listener) => listener()),
        (this._destroyed = !0);
    }
    get destroyed() {
      return this._destroyed;
    }
  }
  return (
    (PlatformRef.ɵfac = function (t) {
      return new (t || PlatformRef)(ɵɵinject(Injector));
    }),
    (PlatformRef.ɵprov = ɵɵdefineInjectable({
      token: PlatformRef,
      factory: PlatformRef.ɵfac,
    })),
    PlatformRef
  );
})();
function optionsReducer(dst, objs) {
  return Array.isArray(objs)
    ? objs.reduce(optionsReducer, dst)
    : Object.assign(Object.assign({}, dst), objs);
}
let ApplicationRef = (() => {
  class ApplicationRef {
    constructor(
      _zone,
      _console,
      _injector,
      _exceptionHandler,
      _componentFactoryResolver,
      _initStatus,
    ) {
      (this._zone = _zone),
        (this._console = _console),
        (this._injector = _injector),
        (this._exceptionHandler = _exceptionHandler),
        (this._componentFactoryResolver = _componentFactoryResolver),
        (this._initStatus = _initStatus),
        (this._bootstrapListeners = []),
        (this._views = []),
        (this._runningTick = !1),
        (this._stable = !0),
        (this.componentTypes = []),
        (this.components = []),
        (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
          next: () => {
            this._zone.run(() => {
              this.tick();
            });
          },
        }));
      const isCurrentlyStable = new Observable((observer) => {
          (this._stable =
            this._zone.isStable &&
            !this._zone.hasPendingMacrotasks &&
            !this._zone.hasPendingMicrotasks),
            this._zone.runOutsideAngular(() => {
              observer.next(this._stable), observer.complete();
            });
        }),
        isStable = new Observable((observer) => {
          let stableSub;
          this._zone.runOutsideAngular(() => {
            stableSub = this._zone.onStable.subscribe(() => {
              NgZone.assertNotInAngularZone(),
                scheduleMicroTask(() => {
                  this._stable ||
                    this._zone.hasPendingMacrotasks ||
                    this._zone.hasPendingMicrotasks ||
                    ((this._stable = !0), observer.next(!0));
                });
            });
          });
          const unstableSub = this._zone.onUnstable.subscribe(() => {
            NgZone.assertInAngularZone(),
              this._stable &&
                ((this._stable = !1),
                this._zone.runOutsideAngular(() => {
                  observer.next(!1);
                }));
          });
          return () => {
            stableSub.unsubscribe(), unstableSub.unsubscribe();
          };
        });
      this.isStable = (function () {
        for (var observables = [], _i = 0; _i < arguments.length; _i++)
          observables[_i] = arguments[_i];
        var concurrent = Number.POSITIVE_INFINITY,
          scheduler = null,
          last = observables[observables.length - 1];
        return (
          isScheduler(last)
            ? ((scheduler = observables.pop()),
              observables.length > 1 &&
                'number' == typeof observables[observables.length - 1] &&
                (concurrent = observables.pop()))
            : 'number' == typeof last && (concurrent = observables.pop()),
          null === scheduler && 1 === observables.length && observables[0] instanceof Observable
            ? observables[0]
            : mergeAll(concurrent)(fromArray(observables, scheduler))
        );
      })(
        isCurrentlyStable,
        isStable.pipe(function (source) {
          return refCount()(
            ((subjectOrSubjectFactory = shareSubjectFactory),
            function (source) {
              var subjectFactory;
              subjectFactory =
                'function' == typeof subjectOrSubjectFactory
                  ? subjectOrSubjectFactory
                  : function () {
                      return subjectOrSubjectFactory;
                    };
              var connectable = Object.create(source, connectableObservableDescriptor);
              return (
                (connectable.source = source),
                (connectable.subjectFactory = subjectFactory),
                connectable
              );
            })(source),
          );
          var subjectOrSubjectFactory;
        }),
      );
    }
    bootstrap(componentOrFactory, rootSelectorOrNode) {
      if (!this._initStatus.done)
        throw new Error(
          'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.',
        );
      let componentFactory;
      (componentFactory =
        componentOrFactory instanceof ComponentFactory
          ? componentOrFactory
          : this._componentFactoryResolver.resolveComponentFactory(componentOrFactory)),
        this.componentTypes.push(componentFactory.componentType);
      const ngModule = componentFactory.isBoundToModule ? void 0 : this._injector.get(NgModuleRef),
        compRef = componentFactory.create(
          Injector.NULL,
          [],
          rootSelectorOrNode || componentFactory.selector,
          ngModule,
        ),
        nativeElement = compRef.location.nativeElement,
        testability = compRef.injector.get(Testability, null),
        testabilityRegistry = testability && compRef.injector.get(TestabilityRegistry);
      return (
        testability &&
          testabilityRegistry &&
          testabilityRegistry.registerApplication(nativeElement, testability),
        compRef.onDestroy(() => {
          this.detachView(compRef.hostView),
            remove(this.components, compRef),
            testabilityRegistry && testabilityRegistry.unregisterApplication(nativeElement);
        }),
        this._loadComponent(compRef),
        isDevMode() &&
          this._console.log(
            'Angular is running in development mode. Call enableProdMode() to enable production mode.',
          ),
        compRef
      );
    }
    tick() {
      if (this._runningTick) throw new Error('ApplicationRef.tick is called recursively');
      try {
        this._runningTick = !0;
        for (let view of this._views) view.detectChanges();
      } catch (e) {
        this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(e));
      } finally {
        this._runningTick = !1;
      }
    }
    attachView(viewRef) {
      const view = viewRef;
      this._views.push(view), view.attachToAppRef(this);
    }
    detachView(viewRef) {
      const view = viewRef;
      remove(this._views, view), view.detachFromAppRef();
    }
    _loadComponent(componentRef) {
      this.attachView(componentRef.hostView),
        this.tick(),
        this.components.push(componentRef),
        this._injector
          .get(APP_BOOTSTRAP_LISTENER, [])
          .concat(this._bootstrapListeners)
          .forEach((listener) => listener(componentRef));
    }
    ngOnDestroy() {
      this._views.slice().forEach((view) => view.destroy()),
        this._onMicrotaskEmptySubscription.unsubscribe();
    }
    get viewCount() {
      return this._views.length;
    }
  }
  return (
    (ApplicationRef.ɵfac = function (t) {
      return new (t || ApplicationRef)(
        ɵɵinject(NgZone),
        ɵɵinject(Console),
        ɵɵinject(Injector),
        ɵɵinject(ErrorHandler),
        ɵɵinject(ComponentFactoryResolver),
        ɵɵinject(ApplicationInitStatus),
      );
    }),
    (ApplicationRef.ɵprov = ɵɵdefineInjectable({
      token: ApplicationRef,
      factory: ApplicationRef.ɵfac,
    })),
    ApplicationRef
  );
})();
function remove(list, el) {
  const index = list.indexOf(el);
  index > -1 && list.splice(index, 1);
}

const platformCore = createPlatformFactory(null, 'core', [
    {
      provide: PLATFORM_ID,
      useValue: 'unknown',
    },
    {
      provide: PlatformRef,
      deps: [Injector],
    },
    {
      provide: TestabilityRegistry,
      deps: [],
    },
    {
      provide: Console,
      deps: [],
    },
  ]),
  APPLICATION_MODULE_PROVIDERS = [
    {
      provide: ApplicationRef,
      useClass: ApplicationRef,
      deps: [
        NgZone,
        Console,
        Injector,
        ErrorHandler,
        ComponentFactoryResolver,
        ApplicationInitStatus,
      ],
    },
    {
      provide: SCHEDULER,
      deps: [NgZone],
      useFactory: function (ngZone) {
        let queue = [];
        return (
          ngZone.onStable.subscribe(() => {
            for (; queue.length; ) queue.pop()();
          }),
          function (fn) {
            queue.push(fn);
          }
        );
      },
    },
    {
      provide: ApplicationInitStatus,
      useClass: ApplicationInitStatus,
      deps: [[new Optional(), APP_INITIALIZER]],
    },
    {
      provide: Compiler,
      useClass: Compiler,
      deps: [],
    },
    APP_ID_RANDOM_PROVIDER,
    {
      provide: IterableDiffers,
      useFactory:
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function () {
          return defaultIterableDiffers;
        },
      deps: [],
    },
    {
      provide: KeyValueDiffers,
      useFactory: function () {
        return defaultKeyValueDiffers;
      },
      deps: [],
    },
    {
      provide: LOCALE_ID$1,
      useFactory: function (locale) {
        return (
          setLocaleId(
            (locale = locale || ('undefined' != typeof $localize && $localize.locale) || 'en-US'),
          ),
          locale
        );
      },
      deps: [[new Inject(LOCALE_ID$1), new Optional(), new SkipSelf()]],
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'USD',
    },
  ];
let ApplicationModule = (() => {
    class ApplicationModule {
      constructor(appRef) {}
    }
    return (
      (ApplicationModule.ɵmod = ɵɵdefineNgModule({
        type: ApplicationModule,
      })),
      (ApplicationModule.ɵinj = ɵɵdefineInjector({
        factory: function (t) {
          return new (t || ApplicationModule)(ɵɵinject(ApplicationRef));
        },
        providers: APPLICATION_MODULE_PROVIDERS,
      })),
      ApplicationModule
    );
  })(),
  _DOM = null;
function getDOM() {
  return _DOM;
}

const DOCUMENT$1 = new InjectionToken('DocumentToken');
var Plural = (function (Plural) {
  return (
    (Plural[(Plural.Zero = 0)] = 'Zero'),
    (Plural[(Plural.One = 1)] = 'One'),
    (Plural[(Plural.Two = 2)] = 'Two'),
    (Plural[(Plural.Few = 3)] = 'Few'),
    (Plural[(Plural.Many = 4)] = 'Many'),
    (Plural[(Plural.Other = 5)] = 'Other'),
    Plural
  );
})({});

class NgLocalization {}
let NgLocaleLocalization = (() => {
  class NgLocaleLocalization extends NgLocalization {
    constructor(locale) {
      super(), (this.locale = locale);
    }
    getPluralCategory(value, locale) {
      switch (
        (function (locale) {
          return (function (locale) {
            const normalizedLocale = (function (locale) {
              return locale.toLowerCase().replace(/_/g, '-');
            })(
              /**
               * @license
               * Copyright Google LLC All Rights Reserved.
               *
               * Use of this source code is governed by an MIT-style license that can be
               * found in the LICENSE file at https://angular.io/license
               */ locale,
            );
            let match = getLocaleData(normalizedLocale);
            if (match) return match;
            const parentLocale = normalizedLocale.split('-')[0];
            if (((match = getLocaleData(parentLocale)), match)) return match;
            if ('en' === parentLocale) return localeEn;
            throw new Error(`Missing locale data for the locale "${locale}".`);
          })(locale)[LocaleDataIndex.PluralCase];
        })(locale || this.locale)(value)
      ) {
        case Plural.Zero:
          return 'zero';

        case Plural.One:
          return 'one';

        case Plural.Two:
          return 'two';

        case Plural.Few:
          return 'few';

        case Plural.Many:
          return 'many';

        default:
          return 'other';
      }
    }
  }
  return (
    (NgLocaleLocalization.ɵfac = function (t) {
      return new (t || NgLocaleLocalization)(ɵɵinject(LOCALE_ID$1));
    }),
    (NgLocaleLocalization.ɵprov = ɵɵdefineInjectable({
      token: NgLocaleLocalization,
      factory: NgLocaleLocalization.ɵfac,
    })),
    NgLocaleLocalization
  );
})();

class NgForOfContext {
  constructor($implicit, ngForOf, index, count) {
    (this.$implicit = $implicit),
      (this.ngForOf = ngForOf),
      (this.index = index),
      (this.count = count);
  }
  get first() {
    return 0 === this.index;
  }
  get last() {
    return this.index === this.count - 1;
  }
  get even() {
    return this.index % 2 == 0;
  }
  get odd() {
    return !this.even;
  }
}
let NgForOf = (() => {
  class NgForOf {
    constructor(_viewContainer, _template, _differs) {
      (this._viewContainer = _viewContainer),
        (this._template = _template),
        (this._differs = _differs),
        (this._ngForOf = null),
        (this._ngForOfDirty = !0),
        (this._differ = null);
    }
    set ngForOf(ngForOf) {
      (this._ngForOf = ngForOf), (this._ngForOfDirty = !0);
    }
    set ngForTrackBy(fn) {
      this._trackByFn = fn;
    }
    get ngForTrackBy() {
      return this._trackByFn;
    }
    set ngForTemplate(value) {
      value && (this._template = value);
    }
    ngDoCheck() {
      if (this._ngForOfDirty) {
        this._ngForOfDirty = !1;
        const value = this._ngForOf;
        if (!this._differ && value)
          try {
            this._differ = this._differs.find(value).create(this.ngForTrackBy);
          } catch (_a) {
            throw new Error(
              `Cannot find a differ supporting object '${value}' of type '${
                ((type = value), type.name || typeof type)
              }'. NgFor only supports binding to Iterables such as Arrays.`,
            );
          }
      }
      var type;
      /**
       * @license
       * Copyright Google LLC All Rights Reserved.
       *
       * Use of this source code is governed by an MIT-style license that can be
       * found in the LICENSE file at https://angular.io/license
       */ if (this._differ) {
        const changes = this._differ.diff(this._ngForOf);
        changes && this._applyChanges(changes);
      }
    }
    _applyChanges(changes) {
      const insertTuples = [];
      changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
        if (null == item.previousIndex) {
          const view = this._viewContainer.createEmbeddedView(
              this._template,
              new NgForOfContext(null, this._ngForOf, -1, -1),
              null === currentIndex ? void 0 : currentIndex,
            ),
            tuple = new RecordViewTuple(item, view);
          insertTuples.push(tuple);
        } else if (null == currentIndex)
          this._viewContainer.remove(
            null === adjustedPreviousIndex ? void 0 : adjustedPreviousIndex,
          );
        else if (null !== adjustedPreviousIndex) {
          const view = this._viewContainer.get(adjustedPreviousIndex);
          this._viewContainer.move(view, currentIndex);
          const tuple = new RecordViewTuple(item, view);
          insertTuples.push(tuple);
        }
      });
      for (let i = 0; i < insertTuples.length; i++)
        this._perViewChange(insertTuples[i].view, insertTuples[i].record);
      for (let i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
        const viewRef = this._viewContainer.get(i);
        (viewRef.context.index = i),
          (viewRef.context.count = ilen),
          (viewRef.context.ngForOf = this._ngForOf);
      }
      changes.forEachIdentityChange((record) => {
        this._viewContainer.get(record.currentIndex).context.$implicit = record.item;
      });
    }
    _perViewChange(view, record) {
      view.context.$implicit = record.item;
    }
    static ngTemplateContextGuard(dir, ctx) {
      return !0;
    }
  }
  return (
    (NgForOf.ɵfac = function (t) {
      return new (t || NgForOf)(
        ɵɵdirectiveInject(ViewContainerRef),
        ɵɵdirectiveInject(TemplateRef),
        ɵɵdirectiveInject(IterableDiffers),
      );
    }),
    (NgForOf.ɵdir = ɵɵdefineDirective({
      type: NgForOf,
      selectors: [['', 'ngFor', '', 'ngForOf', '']],
      inputs: {
        ngForOf: 'ngForOf',
        ngForTrackBy: 'ngForTrackBy',
        ngForTemplate: 'ngForTemplate',
      },
    })),
    NgForOf
  );
})();
class RecordViewTuple {
  constructor(record, view) {
    (this.record = record), (this.view = view);
  }
}
let CommonModule = (() => {
  class CommonModule {}
  return (
    (CommonModule.ɵmod = ɵɵdefineNgModule({
      type: CommonModule,
    })),
    (CommonModule.ɵinj = ɵɵdefineInjector({
      factory: function (t) {
        return new (t || CommonModule)();
      },
      providers: [
        {
          provide: NgLocalization,
          useClass: NgLocaleLocalization,
        },
      ],
    })),
    CommonModule
  );
})();

class BrowserDomAdapter
  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  extends class extends class {} {
    constructor() {
      super();
    }
    supportsDOMEvents() {
      return !0;
    }
  } {
  static makeCurrent() {
    var adapter;
    (adapter = new BrowserDomAdapter()), _DOM || (_DOM = adapter);
  }
  getProperty(el, name) {
    return el[name];
  }
  log(error) {
    window.console && window.console.log && window.console.log(error);
  }
  logGroup(error) {
    window.console && window.console.group && window.console.group(error);
  }
  logGroupEnd() {
    window.console && window.console.groupEnd && window.console.groupEnd();
  }
  onAndCancel(el, evt, listener) {
    return (
      el.addEventListener(evt, listener, !1),
      () => {
        el.removeEventListener(evt, listener, !1);
      }
    );
  }
  dispatchEvent(el, evt) {
    el.dispatchEvent(evt);
  }
  remove(node) {
    return node.parentNode && node.parentNode.removeChild(node), node;
  }
  getValue(el) {
    return el.value;
  }
  createElement(tagName, doc) {
    return (doc = doc || this.getDefaultDocument()).createElement(tagName);
  }
  createHtmlDocument() {
    return document.implementation.createHTMLDocument('fakeTitle');
  }
  getDefaultDocument() {
    return document;
  }
  isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }
  isShadowRoot(node) {
    return node instanceof DocumentFragment;
  }
  getGlobalEventTarget(doc, target) {
    return 'window' === target
      ? window
      : 'document' === target
      ? doc
      : 'body' === target
      ? doc.body
      : null;
  }
  getHistory() {
    return window.history;
  }
  getLocation() {
    return window.location;
  }
  getBaseHref(doc) {
    const href =
      baseElement || ((baseElement = document.querySelector('base')), baseElement)
        ? baseElement.getAttribute('href')
        : null;
    return null == href
      ? null
      : ((url = href),
        urlParsingNode || (urlParsingNode = document.createElement('a')),
        urlParsingNode.setAttribute('href', url),
        '/' === urlParsingNode.pathname.charAt(0)
          ? urlParsingNode.pathname
          : '/' + urlParsingNode.pathname);
    var url;
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
  }
  resetBaseElement() {
    baseElement = null;
  }
  getUserAgent() {
    return window.navigator.userAgent;
  }
  performanceNow() {
    return window.performance && window.performance.now
      ? window.performance.now()
      : new Date().getTime();
  }
  supportsCookies() {
    return !0;
  }
  getCookie(name) {
    return (function (cookieStr, name) {
      name = encodeURIComponent(name);
      for (const cookie of cookieStr.split(';')) {
        const eqIndex = cookie.indexOf('='),
          [cookieName, cookieValue] =
            -1 == eqIndex ? [cookie, ''] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
        if (cookieName.trim() === name) return decodeURIComponent(cookieValue);
      }
      return null;
    })(document.cookie, name);
  }
}
let urlParsingNode,
  baseElement = null;
const TRANSITION_ID = new InjectionToken('TRANSITION_ID'),
  SERVER_TRANSITION_PROVIDERS = [
    {
      provide: APP_INITIALIZER,
      useFactory: function (transitionId, document, injector) {
        return () => {
          injector.get(ApplicationInitStatus).donePromise.then(() => {
            const dom = getDOM();
            Array.prototype.slice
              .apply(document.querySelectorAll('style[ng-transition]'))
              .filter((el) => el.getAttribute('ng-transition') === transitionId)
              .forEach((el) => dom.remove(el));
          });
        };
      },
      deps: [TRANSITION_ID, DOCUMENT$1, Injector],
      multi: !0,
    },
  ];

class BrowserGetTestability {
  static init() {
    var getter;
    (getter = new BrowserGetTestability()), (_testabilityGetter = getter);
  }
  addToWindow(registry) {
    (_global.getAngularTestability = (elem, findInAncestors = !0) => {
      const testability = registry.findTestabilityInTree(elem, findInAncestors);
      if (null == testability) throw new Error('Could not find testability for element.');
      return testability;
    }),
      (_global.getAllAngularTestabilities = () => registry.getAllTestabilities()),
      (_global.getAllAngularRootElements = () => registry.getAllRootElements()),
      _global.frameworkStabilizers || (_global.frameworkStabilizers = []),
      _global.frameworkStabilizers.push((callback) => {
        const testabilities = _global.getAllAngularTestabilities();
        let count = testabilities.length,
          didWork = !1;
        const decrement = function (didWork_) {
          (didWork = didWork || didWork_), count--, 0 == count && callback(didWork);
        };
        testabilities.forEach(function (testability) {
          testability.whenStable(decrement);
        });
      });
  }
  findTestabilityInTree(registry, elem, findInAncestors) {
    if (null == elem) return null;
    const t = registry.getTestability(elem);
    return null != t
      ? t
      : findInAncestors
      ? getDOM().isShadowRoot(elem)
        ? this.findTestabilityInTree(registry, elem.host, !0)
        : this.findTestabilityInTree(registry, elem.parentElement, !0)
      : null;
  }
}
const EVENT_MANAGER_PLUGINS = new InjectionToken('EventManagerPlugins');
let EventManager = (() => {
  class EventManager {
    constructor(plugins, _zone) {
      (this._zone = _zone),
        (this._eventNameToPlugin = new Map()),
        plugins.forEach((p) => (p.manager = this)),
        (this._plugins = plugins.slice().reverse());
    }
    addEventListener(element, eventName, handler) {
      return this._findPluginFor(eventName).addEventListener(element, eventName, handler);
    }
    addGlobalEventListener(target, eventName, handler) {
      return this._findPluginFor(eventName).addGlobalEventListener(target, eventName, handler);
    }
    getZone() {
      return this._zone;
    }
    _findPluginFor(eventName) {
      const plugin = this._eventNameToPlugin.get(eventName);
      if (plugin) return plugin;
      const plugins = this._plugins;
      for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        if (plugin.supports(eventName))
          return this._eventNameToPlugin.set(eventName, plugin), plugin;
      }
      throw new Error(`No event manager plugin found for event ${eventName}`);
    }
  }
  return (
    (EventManager.ɵfac = function (t) {
      return new (t || EventManager)(ɵɵinject(EVENT_MANAGER_PLUGINS), ɵɵinject(NgZone));
    }),
    (EventManager.ɵprov = ɵɵdefineInjectable({
      token: EventManager,
      factory: EventManager.ɵfac,
    })),
    EventManager
  );
})();
class EventManagerPlugin {
  constructor(_doc) {
    this._doc = _doc;
  }
  addGlobalEventListener(element, eventName, handler) {
    const target = getDOM().getGlobalEventTarget(this._doc, element);
    if (!target) throw new Error(`Unsupported event target ${target} for event ${eventName}`);
    return this.addEventListener(target, eventName, handler);
  }
}
let SharedStylesHost = (() => {
    class SharedStylesHost {
      constructor() {
        this._stylesSet = new Set();
      }
      addStyles(styles) {
        const additions = new Set();
        styles.forEach((style) => {
          this._stylesSet.has(style) || (this._stylesSet.add(style), additions.add(style));
        }),
          this.onStylesAdded(additions);
      }
      onStylesAdded(additions) {}
      getAllStyles() {
        return Array.from(this._stylesSet);
      }
    }
    return (
      (SharedStylesHost.ɵfac = function (t) {
        return new (t || SharedStylesHost)();
      }),
      (SharedStylesHost.ɵprov = ɵɵdefineInjectable({
        token: SharedStylesHost,
        factory: SharedStylesHost.ɵfac,
      })),
      SharedStylesHost
    );
  })(),
  DomSharedStylesHost = (() => {
    class DomSharedStylesHost extends SharedStylesHost {
      constructor(_doc) {
        super(),
          (this._doc = _doc),
          (this._hostNodes = new Set()),
          (this._styleNodes = new Set()),
          this._hostNodes.add(_doc.head);
      }
      _addStylesToHost(styles, host) {
        styles.forEach((style) => {
          const styleEl = this._doc.createElement('style');
          (styleEl.textContent = style), this._styleNodes.add(host.appendChild(styleEl));
        });
      }
      addHost(hostNode) {
        this._addStylesToHost(this._stylesSet, hostNode), this._hostNodes.add(hostNode);
      }
      removeHost(hostNode) {
        this._hostNodes.delete(hostNode);
      }
      onStylesAdded(additions) {
        this._hostNodes.forEach((hostNode) => this._addStylesToHost(additions, hostNode));
      }
      ngOnDestroy() {
        this._styleNodes.forEach((styleNode) => getDOM().remove(styleNode));
      }
    }
    return (
      (DomSharedStylesHost.ɵfac = function (t) {
        return new (t || DomSharedStylesHost)(ɵɵinject(DOCUMENT$1));
      }),
      (DomSharedStylesHost.ɵprov = ɵɵdefineInjectable({
        token: DomSharedStylesHost,
        factory: DomSharedStylesHost.ɵfac,
      })),
      DomSharedStylesHost
    );
  })();

const NAMESPACE_URIS = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/',
  },
  COMPONENT_REGEX = /%COMP%/g;
function flattenStyles(compId, styles, target) {
  for (let i = 0; i < styles.length; i++) {
    let style = styles[i];
    Array.isArray(style)
      ? flattenStyles(compId, style, target)
      : ((style = style.replace(COMPONENT_REGEX, compId)), target.push(style));
  }
  return target;
}
function decoratePreventDefault(eventHandler) {
  return (event) => {
    if ('__ngUnwrap__' === event) return eventHandler;
    !1 === eventHandler(event) && (event.preventDefault(), (event.returnValue = !1));
  };
}
let DomRendererFactory2 = (() => {
  class DomRendererFactory2 {
    constructor(eventManager, sharedStylesHost, appId) {
      (this.eventManager = eventManager),
        (this.sharedStylesHost = sharedStylesHost),
        (this.appId = appId),
        (this.rendererByCompId = new Map()),
        (this.defaultRenderer = new DefaultDomRenderer2(eventManager));
    }
    createRenderer(element, type) {
      if (!element || !type) return this.defaultRenderer;
      switch (type.encapsulation) {
        case ViewEncapsulation.Emulated: {
          let renderer = this.rendererByCompId.get(type.id);
          return (
            renderer ||
              ((renderer = new EmulatedEncapsulationDomRenderer2(
                this.eventManager,
                this.sharedStylesHost,
                type,
                this.appId,
              )),
              this.rendererByCompId.set(type.id, renderer)),
            renderer.applyToHost(element),
            renderer
          );
        }

        case 1:
        case ViewEncapsulation.ShadowDom:
          return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);

        default:
          if (!this.rendererByCompId.has(type.id)) {
            const styles = flattenStyles(type.id, type.styles, []);
            this.sharedStylesHost.addStyles(styles),
              this.rendererByCompId.set(type.id, this.defaultRenderer);
          }
          return this.defaultRenderer;
      }
    }
    begin() {}
    end() {}
  }
  return (
    (DomRendererFactory2.ɵfac = function (t) {
      return new (t || DomRendererFactory2)(
        ɵɵinject(EventManager),
        ɵɵinject(DomSharedStylesHost),
        ɵɵinject(APP_ID),
      );
    }),
    (DomRendererFactory2.ɵprov = ɵɵdefineInjectable({
      token: DomRendererFactory2,
      factory: DomRendererFactory2.ɵfac,
    })),
    DomRendererFactory2
  );
})();
class DefaultDomRenderer2 {
  constructor(eventManager) {
    (this.eventManager = eventManager), (this.data = Object.create(null));
  }
  destroy() {}
  createElement(name, namespace) {
    return namespace
      ? document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name)
      : document.createElement(name);
  }
  createComment(value) {
    return document.createComment(value);
  }
  createText(value) {
    return document.createTextNode(value);
  }
  appendChild(parent, newChild) {
    parent.appendChild(newChild);
  }
  insertBefore(parent, newChild, refChild) {
    parent && parent.insertBefore(newChild, refChild);
  }
  removeChild(parent, oldChild) {
    parent && parent.removeChild(oldChild);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    let el =
      'string' == typeof selectorOrNode ? document.querySelector(selectorOrNode) : selectorOrNode;
    if (!el) throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
    return preserveContent || (el.textContent = ''), el;
  }
  parentNode(node) {
    return node.parentNode;
  }
  nextSibling(node) {
    return node.nextSibling;
  }
  setAttribute(el, name, value, namespace) {
    if (namespace) {
      name = namespace + ':' + name;
      const namespaceUri = NAMESPACE_URIS[namespace];
      namespaceUri ? el.setAttributeNS(namespaceUri, name, value) : el.setAttribute(name, value);
    } else el.setAttribute(name, value);
  }
  removeAttribute(el, name, namespace) {
    if (namespace) {
      const namespaceUri = NAMESPACE_URIS[namespace];
      namespaceUri
        ? el.removeAttributeNS(namespaceUri, name)
        : el.removeAttribute(`${namespace}:${name}`);
    } else el.removeAttribute(name);
  }
  addClass(el, name) {
    el.classList.add(name);
  }
  removeClass(el, name) {
    el.classList.remove(name);
  }
  setStyle(el, style, value, flags) {
    flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important)
      ? el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? 'important' : '')
      : (el.style[style] = value);
  }
  removeStyle(el, style, flags) {
    flags & RendererStyleFlags2.DashCase ? el.style.removeProperty(style) : (el.style[style] = '');
  }
  setProperty(el, name, value) {
    el[name] = value;
  }
  setValue(node, value) {
    node.nodeValue = value;
  }
  listen(target, event, callback) {
    return 'string' == typeof target
      ? this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback))
      : this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
  }
}
class EmulatedEncapsulationDomRenderer2 extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, component, appId) {
    super(eventManager), (this.component = component);
    const styles = flattenStyles(appId + '-' + component.id, component.styles, []);
    sharedStylesHost.addStyles(styles),
      (this.contentAttr = '_ngcontent-%COMP%'.replace(COMPONENT_REGEX, appId + '-' + component.id)),
      (this.hostAttr = (function (componentShortId) {
        return '_nghost-%COMP%'.replace(COMPONENT_REGEX, componentShortId);
      })(appId + '-' + component.id));
  }
  applyToHost(element) {
    super.setAttribute(element, this.hostAttr, '');
  }
  createElement(parent, name) {
    const el = super.createElement(parent, name);
    return super.setAttribute(el, this.contentAttr, ''), el;
  }
}
class ShadowDomRenderer extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, hostEl, component) {
    super(eventManager),
      (this.sharedStylesHost = sharedStylesHost),
      (this.hostEl = hostEl),
      (this.shadowRoot = hostEl.attachShadow({
        mode: 'open',
      })),
      this.sharedStylesHost.addHost(this.shadowRoot);
    const styles = flattenStyles(component.id, component.styles, []);
    for (let i = 0; i < styles.length; i++) {
      const styleEl = document.createElement('style');
      (styleEl.textContent = styles[i]), this.shadowRoot.appendChild(styleEl);
    }
  }
  nodeOrShadowRoot(node) {
    return node === this.hostEl ? this.shadowRoot : node;
  }
  destroy() {
    this.sharedStylesHost.removeHost(this.shadowRoot);
  }
  appendChild(parent, newChild) {
    return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
  }
  insertBefore(parent, newChild, refChild) {
    return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
  }
  removeChild(parent, oldChild) {
    return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
  }
  parentNode(node) {
    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
  }
}
let DomEventsPlugin = (() => {
  class DomEventsPlugin extends EventManagerPlugin {
    constructor(doc) {
      super(doc);
    }
    supports(eventName) {
      return !0;
    }
    addEventListener(element, eventName, handler) {
      return (
        element.addEventListener(eventName, handler, !1),
        () => this.removeEventListener(element, eventName, handler)
      );
    }
    removeEventListener(target, eventName, callback) {
      return target.removeEventListener(eventName, callback);
    }
  }
  return (
    (DomEventsPlugin.ɵfac = function (t) {
      return new (t || DomEventsPlugin)(ɵɵinject(DOCUMENT$1));
    }),
    (DomEventsPlugin.ɵprov = ɵɵdefineInjectable({
      token: DomEventsPlugin,
      factory: DomEventsPlugin.ɵfac,
    })),
    DomEventsPlugin
  );
})();
const MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'],
  _keyMap = {
    '\b': 'Backspace',
    '\t': 'Tab',
    '': 'Delete',
    '': 'Escape',
    Del: 'Delete',
    Esc: 'Escape',
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
    Up: 'ArrowUp',
    Down: 'ArrowDown',
    Menu: 'ContextMenu',
    Scroll: 'ScrollLock',
    Win: 'OS',
  },
  _chromeNumKeyPadMap = {
    A: '1',
    B: '2',
    C: '3',
    D: '4',
    E: '5',
    F: '6',
    G: '7',
    H: '8',
    I: '9',
    J: '*',
    K: '+',
    M: '-',
    N: '.',
    O: '/',
    '`': '0',
    '': 'NumLock',
  },
  MODIFIER_KEY_GETTERS = {
    alt: (event) => event.altKey,
    control: (event) => event.ctrlKey,
    meta: (event) => event.metaKey,
    shift: (event) => event.shiftKey,
  };
let KeyEventsPlugin = (() => {
  class KeyEventsPlugin extends EventManagerPlugin {
    constructor(doc) {
      super(doc);
    }
    supports(eventName) {
      return null != KeyEventsPlugin.parseEventName(eventName);
    }
    addEventListener(element, eventName, handler) {
      const parsedEvent = KeyEventsPlugin.parseEventName(eventName),
        outsideHandler = KeyEventsPlugin.eventCallback(
          parsedEvent.fullKey,
          handler,
          this.manager.getZone(),
        );
      return this.manager
        .getZone()
        .runOutsideAngular(() =>
          getDOM().onAndCancel(element, parsedEvent.domEventName, outsideHandler),
        );
    }
    static parseEventName(eventName) {
      const parts = eventName.toLowerCase().split('.'),
        domEventName = parts.shift();
      if (0 === parts.length || ('keydown' !== domEventName && 'keyup' !== domEventName))
        return null;
      const key = KeyEventsPlugin._normalizeKey(parts.pop());
      let fullKey = '';
      if (
        (MODIFIER_KEYS.forEach((modifierName) => {
          const index = parts.indexOf(modifierName);
          index > -1 && (parts.splice(index, 1), (fullKey += modifierName + '.'));
        }),
        (fullKey += key),
        0 != parts.length || 0 === key.length)
      )
        return null;
      const result = {};
      return (result.domEventName = domEventName), (result.fullKey = fullKey), result;
    }
    static getEventFullKey(event) {
      let fullKey = '',
        key = (function (event) {
          let key = event.key;
          if (null == key) {
            if (((key = event.keyIdentifier), null == key)) return 'Unidentified';
            key.startsWith('U+') &&
              ((key = String.fromCharCode(parseInt(key.substring(2), 16))),
              3 === event.location &&
                _chromeNumKeyPadMap.hasOwnProperty(key) &&
                (key = _chromeNumKeyPadMap[key]));
          }
          return _keyMap[key] || key;
        })(
          /**
           * @license
           * Copyright Google LLC All Rights Reserved.
           *
           * Use of this source code is governed by an MIT-style license that can be
           * found in the LICENSE file at https://angular.io/license
           */ event,
        );
      return (
        (key = key.toLowerCase()),
        ' ' === key ? (key = 'space') : '.' === key && (key = 'dot'),
        MODIFIER_KEYS.forEach((modifierName) => {
          modifierName != key &&
            (0, MODIFIER_KEY_GETTERS[modifierName])(event) &&
            (fullKey += modifierName + '.');
        }),
        (fullKey += key),
        fullKey
      );
    }
    static eventCallback(fullKey, handler, zone) {
      return (event) => {
        KeyEventsPlugin.getEventFullKey(event) === fullKey && zone.runGuarded(() => handler(event));
      };
    }
    static _normalizeKey(keyName) {
      switch (keyName) {
        case 'esc':
          return 'escape';

        default:
          return keyName;
      }
    }
  }
  return (
    (KeyEventsPlugin.ɵfac = function (t) {
      return new (t || KeyEventsPlugin)(ɵɵinject(DOCUMENT$1));
    }),
    (KeyEventsPlugin.ɵprov = ɵɵdefineInjectable({
      token: KeyEventsPlugin,
      factory: KeyEventsPlugin.ɵfac,
    })),
    KeyEventsPlugin
  );
})();
const platformBrowser = createPlatformFactory(platformCore, 'browser', [
    {
      provide: PLATFORM_ID,
      useValue: 'browser',
    },
    {
      provide: PLATFORM_INITIALIZER,
      useValue: function () {
        BrowserDomAdapter.makeCurrent(), BrowserGetTestability.init();
      },
      multi: !0,
    },
    {
      provide: DOCUMENT$1,
      useFactory: function () {
        return (
          (function (document) {
            DOCUMENT = document;
          })(document),
          document
        );
      },
      deps: [],
    },
  ]),
  BROWSER_MODULE_PROVIDERS = [
    [],
    {
      provide: INJECTOR_SCOPE,
      useValue: 'root',
    },
    {
      provide: ErrorHandler,
      useFactory: function () {
        return new ErrorHandler();
      },
      deps: [],
    },
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: DomEventsPlugin,
      multi: !0,
      deps: [DOCUMENT$1, NgZone, PLATFORM_ID],
    },
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: KeyEventsPlugin,
      multi: !0,
      deps: [DOCUMENT$1],
    },
    [],
    {
      provide: DomRendererFactory2,
      useClass: DomRendererFactory2,
      deps: [EventManager, DomSharedStylesHost, APP_ID],
    },
    {
      provide: RendererFactory2,
      useExisting: DomRendererFactory2,
    },
    {
      provide: SharedStylesHost,
      useExisting: DomSharedStylesHost,
    },
    {
      provide: DomSharedStylesHost,
      useClass: DomSharedStylesHost,
      deps: [DOCUMENT$1],
    },
    {
      provide: Testability,
      useClass: Testability,
      deps: [NgZone],
    },
    {
      provide: EventManager,
      useClass: EventManager,
      deps: [EVENT_MANAGER_PLUGINS, NgZone],
    },
    [],
  ];
let BrowserModule = (() => {
  class BrowserModule {
    constructor(parentModule) {
      if (parentModule)
        throw new Error(
          'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.',
        );
    }
    static withServerTransition(params) {
      return {
        ngModule: BrowserModule,
        providers: [
          {
            provide: APP_ID,
            useValue: params.appId,
          },
          {
            provide: TRANSITION_ID,
            useExisting: APP_ID,
          },
          SERVER_TRANSITION_PROVIDERS,
        ],
      };
    }
  }
  return (
    (BrowserModule.ɵmod = ɵɵdefineNgModule({
      type: BrowserModule,
    })),
    (BrowserModule.ɵinj = ɵɵdefineInjector({
      factory: function (t) {
        return new (t || BrowserModule)(ɵɵinject(BrowserModule, 12));
      },
      providers: BROWSER_MODULE_PROVIDERS,
      imports: [CommonModule, ApplicationModule],
    })),
    BrowserModule
  );
})();
function bindAction(selector, callback) {
  document.querySelector(selector).addEventListener('click', callback);
}

function _random(max) {
  return Math.round(1e3 * Math.random()) % max;
}
function buildData(count) {
  const data = [];
  for (let i = 0; i < count; i++)
    data.push({
      id: i,
      label:
        ADJECTIVES[_random(ADJECTIVES.length)] +
        ' ' +
        COLOURS[_random(COLOURS.length)] +
        ' ' +
        NOUNS[_random(NOUNS.length)],
    });
  return data;
}
!(function () {
  const regex = /(\w+)=(\w+)/g,
    search = decodeURIComponent(location.search);
  let match;
  for (; (match = regex.exec(search)); ) {
    const value = match[2],
      els = document.querySelectorAll('input[name="' + match[1] + '"]');
    let el;
    for (let i = 0; i < els.length; i++)
      (el = els[i]),
        'radio' === el.type || 'checkbox' === el.type
          ? (el.checked = el.value === value)
          : (el.value = value);
  }
})();
const ADJECTIVES = [
    'pretty',
    'large',
    'big',
    'small',
    'tall',
    'short',
    'long',
    'handsome',
    'plain',
    'quaint',
    'clean',
    'elegant',
    'easy',
    'angry',
    'crazy',
    'helpful',
    'mushy',
    'odd',
    'unsightly',
    'adorable',
    'important',
    'inexpensive',
    'cheap',
    'expensive',
    'fancy',
  ],
  COLOURS = [
    'red',
    'yellow',
    'blue',
    'green',
    'pink',
    'brown',
    'purple',
    'brown',
    'white',
    'black',
    'orange',
  ],
  NOUNS = [
    'table',
    'chair',
    'house',
    'bbq',
    'desk',
    'car',
    'pony',
    'cookie',
    'sandwich',
    'burger',
    'pizza',
    'mouse',
    'keyboard',
  ];

function JsWebFrameworksComponent_tr_2_Template(rf, ctx) {
  if (1 & rf) {
    const _r3 = getLView();
    ɵɵelementStart(0, 'tr'),
      ɵɵelementStart(1, 'td', 2),
      ɵɵtext(2),
      ɵɵelementEnd(),
      ɵɵelementStart(3, 'td', 3),
      ɵɵelementStart(4, 'a', 4),
      ɵɵlistener('click', function ($event) {
        ɵɵrestoreView(_r3);
        const item_r1 = ctx.$implicit;
        return ɵɵnextContext().select(item_r1.id), $event.preventDefault();
      }),
      ɵɵtext(5),
      ɵɵelementEnd(),
      ɵɵelementEnd(),
      ɵɵelementStart(6, 'td', 2),
      ɵɵelementStart(7, 'a', 4),
      ɵɵlistener('click', function ($event) {
        ɵɵrestoreView(_r3);
        const item_r1 = ctx.$implicit;
        return ɵɵnextContext().delete(item_r1.id), $event.preventDefault();
      }),
      ɵɵelement(8, 'span', 5),
      ɵɵelementEnd(),
      ɵɵelementEnd(),
      ɵɵelement(9, 'td', 6),
      ɵɵelementEnd();
  }
  if (2 & rf) {
    const item_r1 = ctx.$implicit,
      ctx_r0 = ɵɵnextContext();
    ɵɵclassProp('danger', item_r1.id === ctx_r0.selected),
      ɵɵadvance(2),
      ɵɵtextInterpolate(item_r1.id),
      ɵɵadvance(3),
      ɵɵtextInterpolate(item_r1.label);
  }
}
let JsWebFrameworksComponent = (() => {
    class JsWebFrameworksComponent {
      constructor(_appRef) {
        (this._appRef = _appRef), (this.data = []);
      }
      itemById(index, item) {
        return item.id;
      }
      select(itemId) {
        (this.selected = itemId), this._appRef.tick();
      }
      delete(itemId) {
        const data = this.data;
        for (let i = 0, l = data.length; i < l; i++)
          if (data[i].id === itemId) {
            data.splice(i, 1);
            break;
          }
        this._appRef.tick();
      }
    }
    return (
      (JsWebFrameworksComponent.ɵfac = function (t) {
        return new (t || JsWebFrameworksComponent)(ɵɵdirectiveInject(ApplicationRef));
      }),
      (JsWebFrameworksComponent.ɵcmp = ɵɵdefineComponent({
        type: JsWebFrameworksComponent,
        selectors: [['js-web-frameworks']],
        decls: 3,
        vars: 2,
        consts: [
          [1, 'table', 'table-hover', 'table-striped', 'test-data'],
          [3, 'danger', 4, 'ngFor', 'ngForOf', 'ngForTrackBy'],
          [1, 'col-md-1'],
          [1, 'col-md-4'],
          ['href', '#', 3, 'click'],
          ['aria-hidden', 'true', 1, 'glyphicon', 'glyphicon-remove'],
          [1, 'col-md-6'],
        ],
        template: function (rf, ctx) {
          1 & rf &&
            (ɵɵelementStart(0, 'table', 0),
            ɵɵelementStart(1, 'tbody'),
            (function (
              index,
              templateFn,
              decls,
              vars,
              tagName,
              attrsIndex,
              localRefsIndex,
              localRefExtractor,
            ) {
              const lView = getLView(),
                tView = getTView(),
                tNode = tView.firstCreatePass
                  ? (function (
                      index,
                      tView,
                      lView,
                      templateFn,
                      decls,
                      vars,
                      tagName,
                      attrsIndex,
                      localRefsIndex,
                    ) {
                      const tViewConsts = tView.consts,
                        tNode = getOrCreateTNode(tView, 22, 4, 'tr', getConstant(tViewConsts, 1));
                      resolveDirectives(tView, lView, tNode, getConstant(tViewConsts, void 0)),
                        registerPostOrderHooks(tView, tNode);
                      const embeddedTView = (tNode.tViews = createTView(
                        2,
                        tNode,
                        templateFn,
                        10,
                        4,
                        tView.directiveRegistry,
                        tView.pipeRegistry,
                        null,
                        tView.schemas,
                        tViewConsts,
                      ));
                      return (
                        null !== tView.queries &&
                          (tView.queries.template(tView, tNode),
                          (embeddedTView.queries = tView.queries.embeddedTView(tNode))),
                        tNode
                      );
                    })(0, tView, lView, templateFn)
                  : tView.data[22];
              setCurrentTNode(tNode, !1);
              const comment = lView[11].createComment('');
              appendChild(tView, lView, comment, tNode),
                attachPatchData(comment, lView),
                addToViewTree(
                  lView,
                  (lView[22] = createLContainer(comment, lView, comment, tNode)),
                ),
                isDirectiveHost(tNode) && createDirectivesInstances(tView, lView, tNode);
            })(0, JsWebFrameworksComponent_tr_2_Template),
            ɵɵelementEnd(),
            ɵɵelementEnd()),
            2 & rf && (ɵɵadvance(2), ɵɵproperty('ngForOf', ctx.data)('ngForTrackBy', ctx.itemById));
        },
        directives: [NgForOf],
        encapsulation: 2,
      })),
      JsWebFrameworksComponent
    );
  })(),
  JsWebFrameworksModule = (() => {
    class JsWebFrameworksModule {}
    return (
      (JsWebFrameworksModule.ɵmod = ɵɵdefineNgModule({
        type: JsWebFrameworksModule,
        bootstrap: [JsWebFrameworksComponent],
      })),
      (JsWebFrameworksModule.ɵinj = ɵɵdefineInjector({
        factory: function (t) {
          return new (t || JsWebFrameworksModule)();
        },
        imports: [[BrowserModule]],
      })),
      JsWebFrameworksModule
    );
  })();
const JsWebFrameworksModuleNgFactory = noSideEffects(function () {
  return new NgModuleFactory$1(JsWebFrameworksModule);
});
!(function () {
  if (_runModeLocked) throw new Error('Cannot enable prod mode after platform setup.');
  _devMode = !1;
})(),
  platformBrowser()
    .bootstrapModuleFactory(JsWebFrameworksModuleNgFactory)
    .then(function (moduleRef) {
      let component, appRef;
      (appRef = moduleRef.injector.get(ApplicationRef)),
        (component = appRef.components[0].instance),
        bindAction('#create1KRows', function () {
          (component.data = buildData(1e3)), appRef.tick();
        }),
        bindAction('#create10KRows', function () {
          (component.data = buildData(1e4)), appRef.tick();
        }),
        bindAction('#deleteAll', function () {
          (component.data = []), appRef.tick();
        }),
        bindAction('#update', function () {
          for (let i = 0; i < component.data.length; i += 10) component.data[i].label += ' !!!';
          appRef.tick();
        }),
        bindAction('#swap', function () {
          const data = component.data;
          if (data.length > 998) {
            const a = data[1];
            (data[1] = data[998]), (data[998] = a);
          }
          appRef.tick();
        });
    });
