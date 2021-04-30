function getClosureSafeProperty(objWithPropertyToExtract) {
  for (let key in objWithPropertyToExtract)
    if (objWithPropertyToExtract[key] === getClosureSafeProperty) return key;
  throw Error('Could not find renamed property on target object.');
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
  NG_FACTORY_DEF = getClosureSafeProperty({
    ɵfac: getClosureSafeProperty,
  }),
  NG_ELEMENT_ID = getClosureSafeProperty({
    __NG_ELEMENT_ID__: getClosureSafeProperty,
  });

let _renderCompCount = 0;
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
function getComponentDef(type) {
  return type[NG_COMP_DEF] || null;
}

class RuntimeError extends Error {
  constructor(code, message) {
    super(
      (function (code, message) {
        return `${code ? `NG0${code}: ` : ''}${message}`;
      })(code, message),
    ),
      (this.code = code);
  }
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
      })(instance, {
        previous: EMPTY_OBJ,
        current: null,
      }),
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

function isProceduralRenderer(renderer) {
  return !!renderer.listen;
}
const domRendererFactory3 = {
  createRenderer: (hostElement, rendererType) =>
    (function () {
      if ('undefined' != typeof document) return document;
    })(),
};
function getNativeByTNode(tNode, lView) {
  return (function (value) {
    for (; Array.isArray(value); ) value = value[0];
    return value;
  })(lView[tNode.index]);
}
function getComponentLViewByIndex(nodeIndex, hostView) {
  const slotValue = hostView[nodeIndex];
  return (
    (value = slotValue),
    Array.isArray(value) && 'object' == typeof value[1] ? slotValue : slotValue[0]
  );

  var value;
}
function viewAttachedToChangeDetector(view) {
  return 128 == (128 & view[2]);
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
function isInCheckNoChangesMode() {
  return instructionState.isInCheckNoChangesMode;
}
function setBindingRootForHostBindings(bindingRootIndex, currentDirectiveIndex) {
  const lFrame = instructionState.lFrame;
  (lFrame.bindingIndex = lFrame.bindingRootIndex = bindingRootIndex),
    (function (currentDirectiveIndex) {
      instructionState.lFrame.currentDirectiveIndex = currentDirectiveIndex;
    })(currentDirectiveIndex);
}
function setCurrentQueryIndex(value) {
  instructionState.lFrame.currentQueryIndex = value;
}
function getDeclarationTNode(lView) {
  const tView = lView[1];
  return 2 === tView.type ? tView.declTNode : 1 === tView.type ? lView[6] : null;
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
function setSelectedIndex(index) {
  instructionState.lFrame.selectedIndex = index;
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

let includeViewProviders = !0;
function setIncludeViewProviders(v) {
  const oldValue = includeViewProviders;
  return (includeViewProviders = v), oldValue;
}
let nextNgElementId = 0;
function insertBloom(arr, footer) {
  arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
}
function attachPatchData(target, data) {
  target.__ngContext__ = data;
}

const defaultScheduler = (() =>
  (('undefined' != typeof requestAnimationFrame && requestAnimationFrame) || setTimeout).bind(
    _global,
  ))();
function getFirstLContainer(lView) {
  return getNearestLContainer(lView[13]);
}
function getNextLContainer(container) {
  return getNearestLContainer(container[4]);
}
function getNearestLContainer(viewOrContainer) {
  for (
    ;
    null !== viewOrContainer &&
    ((value = viewOrContainer), !Array.isArray(value) || !0 !== value[1]);

  )
    viewOrContainer = viewOrContainer[4];
  var value;
  return viewOrContainer;
}
function nativeAppendOrInsertBefore(renderer, parent, child, beforeNode, isMove) {
  null !== beforeNode
    ? (function (renderer, parent, child, beforeNode, isMove) {
        isProceduralRenderer(renderer)
          ? renderer.insertBefore(parent, child, beforeNode, isMove)
          : parent.insertBefore(child, beforeNode, isMove);
      })(renderer, parent, child, beforeNode, isMove)
    : (function (renderer, parent, child) {
        isProceduralRenderer(renderer)
          ? renderer.appendChild(parent, child)
          : parent.appendChild(child);
      })(renderer, parent, child);
}

const NO_CHANGE = {};
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
        isParent = instructionState.lFrame.isParent,
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
function executeTemplate(tView, lView, templateFn, rf, context) {
  const prevSelectedIndex = instructionState.lFrame.selectedIndex;
  try {
    setSelectedIndex(-1),
      2 & rf &&
        lView.length > 20 &&
        (function (tView, lView, index, checkNoChangesMode) {
          if (!checkNoChangesMode)
            if (3 == (3 & lView[2])) {
              const preOrderCheckHooks = tView.preOrderCheckHooks;
              null !== preOrderCheckHooks && executeCheckHooks(lView, preOrderCheckHooks, 20);
            } else {
              const preOrderHooks = tView.preOrderHooks;
              null !== preOrderHooks && executeInitAndCheckHooks(lView, preOrderHooks, 0, 20);
            }
          setSelectedIndex(20);
        })(tView, lView, 0, isInCheckNoChangesMode()),
      templateFn(rf, context);
  } finally {
    setSelectedIndex(prevSelectedIndex);
  }
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
function instantiateRootComponent(tView, lView, def) {
  const rootTNode = getCurrentTNode();
  tView.firstCreatePass &&
    (def.providersResolver && def.providersResolver(def),
    (function (tView, tNode, lView, directiveIndex, def) {
      tView.data[directiveIndex] = def;
      const directiveFactory =
          def.factory ||
          (def.factory = (type = def.type).hasOwnProperty(NG_FACTORY_DEF)
            ? type[NG_FACTORY_DEF]
            : null),
        nodeInjectorFactory = new NodeInjectorFactory(
          directiveFactory,
          (function (def) {
            return null !== def.template;
          })(def),
          null,
        );

      var type;
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
    })(tView, rootTNode, lView, allocExpando(tView, lView, 1, null), def));
  const directive = (function (lView, tView, index, tNode) {
    let value = lView[index];
    const tData = tView.data;
    if (value instanceof NodeInjectorFactory) {
      const factory = value;
      factory.resolving &&
        (function (token, path) {
          throw new RuntimeError('200', `Circular dependency in DI detected for ${token}`);
        })(
          (function (value) {
            return 'function' == typeof value
              ? value.name || value.toString()
              : 'object' == typeof value && null != value && 'function' == typeof value.type
              ? value.type.name || value.type.toString()
              : (function (value) {
                  return 'string' == typeof value ? value : null == value ? '' : String(value);
                })(value);
          })(tData[index]),
        );
      const previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
      factory.resolving = !0;
      const previousInjectImplementation = factory.injectImpl
        ? setInjectImplementation(factory.injectImpl)
        : null;
      !(function (lView, tNode, flags) {
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
        (lFrame.currentTNode = tNode), (lFrame.lView = lView);
      })(lView, tNode, InjectFlags.Default);
      try {
        (value = lView[index] = factory.factory(void 0, tData, lView, tNode)),
          tView.firstCreatePass &&
            index >= tNode.directiveStart &&
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
  })(lView, tView, rootTNode.directiveStart, rootTNode);
  attachPatchData(directive, lView);
  const native = getNativeByTNode(rootTNode, lView);
  return native && attachPatchData(native, lView), directive;
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
function executeViewQueryFn(flags, viewQueryFn, component) {
  setCurrentQueryIndex(0), viewQueryFn(flags, component);
}
const CLEAN_PROMISE = (() => Promise.resolve(null))();

function ɵɵtext(index, value = '') {
  const lView = instructionState.lFrame.lView,
    tView = instructionState.lFrame.tView,
    adjustedIndex = index + 20,
    tNode = tView.firstCreatePass
      ? getOrCreateTNode(tView, adjustedIndex, 1, value, null)
      : tView.data[adjustedIndex],
    textNative = (lView[adjustedIndex] = (function (renderer, value) {
      return isProceduralRenderer(renderer)
        ? renderer.createText(value)
        : renderer.createTextNode(value);
    })(lView[11], value));
  (function (tView, lView, childRNode, childTNode) {
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
  })(tView, lView, textNative, tNode),
    setCurrentTNode(tNode, !1);
}
!(function (componentType, opts = {}) {
  const rendererFactory = opts.rendererFactory || domRendererFactory3,
    sanitizer = opts.sanitizer || null,
    componentDef = getComponentDef(componentType);
  componentDef.type != componentType && (componentDef.type = componentType);
  const componentTag = componentDef.selectors[0][0],
    hostRNode = (function (renderer, elementOrSelector, encapsulation) {
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
    })(
      rendererFactory.createRenderer(null, null),
      opts.host || componentTag,
      componentDef.encapsulation,
    ),
    rootFlags = componentDef.onPush ? 576 : 528,
    rootContext = {
      components: [],
      scheduler: opts.scheduler || defaultScheduler,
      clean: CLEAN_PROMISE,
      playerHandler: opts.playerHandler || null,
      flags: 0,
    },
    renderer = rendererFactory.createRenderer(hostRNode, componentDef),
    rootTView = createTView(0, null, null, 1, 0, null, null, null, null, null),
    rootView = createLView(
      null,
      rootTView,
      rootContext,
      rootFlags,
      null,
      null,
      rendererFactory,
      renderer,
      null,
      opts.injector || null,
    );
  let component;
  enterView(rootView);
  try {
    rendererFactory.begin && rendererFactory.begin(),
      (component = (function (componentView, componentDef, rootLView, rootContext, hostFeatures) {
        const tView = rootLView[1],
          component = instantiateRootComponent(tView, rootLView, componentDef);
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
        var def;
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
            null !== (def = componentDef).hostBindings && def.hostBindings(1, component)),
          component
        );
      })(
        (function (rNode, def, rootView, rendererFactory, hostRenderer, sanitizer) {
          const tView = rootView[1];
          rootView[20] = rNode;
          const tNode = getOrCreateTNode(tView, 20, 2, '#host', null),
            mergedAttrs = (tNode.mergedAttrs = def.hostAttrs);
          null !== mergedAttrs &&
            ((function (tNode, attrs, writeToHost) {
              let styles = tNode.styles,
                classes = tNode.classes,
                mode = 0;
              if (null !== attrs)
                for (let i = 0; i < attrs.length; i++) {
                  const value = attrs[i];
                  'number' == typeof value
                    ? (mode = value)
                    : 1 == mode
                    ? (classes = concatStringsWithSpace(classes, value))
                    : 2 == mode &&
                      (styles = concatStringsWithSpace(styles, value + ': ' + attrs[++i] + ';'));
                }
              (tNode.styles = styles), (tNode.classes = classes);
            })(tNode, mergedAttrs),
            null !== rNode &&
              ((function (renderer, native, attrs) {
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
                    64 === attrName.charCodeAt(0)
                      ? isProc && renderer.setProperty(native, attrName, attrVal)
                      : isProc
                      ? renderer.setAttribute(native, attrName, attrVal)
                      : native.setAttribute(attrName, attrVal),
                      i++;
                  }
                }
              })(hostRenderer, rNode, mergedAttrs),
              null !== tNode.classes &&
                (function (renderer, element, newValue) {
                  isProceduralRenderer(renderer)
                    ? '' === newValue
                      ? renderer.removeAttribute(element, 'class')
                      : renderer.setAttribute(element, 'class', newValue)
                    : (element.className = newValue);
                })(hostRenderer, rNode, tNode.classes),
              null !== tNode.styles &&
                (function (renderer, element, newValue) {
                  isProceduralRenderer(renderer)
                    ? renderer.setAttribute(element, 'style', newValue)
                    : (element.style.cssText = newValue);
                })(hostRenderer, rNode, tNode.styles)));
          const viewRenderer = rendererFactory.createRenderer(rNode, def),
            componentView = createLView(
              rootView,
              (function (def) {
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
              })(def),
              null,
              def.onPush ? 64 : 16,
              rootView[20],
              tNode,
              rendererFactory,
              viewRenderer,
              sanitizer || null,
              null,
            );
          return (
            tView.firstCreatePass &&
              ((function (injectorIndex, tView, token) {
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
              })(
                (function (tNode, lView) {
                  const existingInjectorIndex = (function (tNode, lView) {
                    return -1 === tNode.injectorIndex ||
                      (tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex) ||
                      null === lView[tNode.injectorIndex + 8]
                      ? -1
                      : tNode.injectorIndex;
                  })(tNode, lView);
                  if (-1 !== existingInjectorIndex) return existingInjectorIndex;
                  const tView = lView[1];
                  tView.firstCreatePass &&
                    ((tNode.injectorIndex = lView.length),
                    insertBloom(tView.data, tNode),
                    insertBloom(lView, null),
                    insertBloom(tView.blueprint, null));
                  const parentLoc = (function (tNode, lView) {
                      if (tNode.parent && -1 !== tNode.parent.injectorIndex)
                        return tNode.parent.injectorIndex;
                      let declarationViewOffset = 0,
                        parentTNode = null,
                        lViewCursor = lView;
                      for (; null !== lViewCursor; ) {
                        const tView = lViewCursor[1],
                          tViewType = tView.type;
                        if (
                          ((parentTNode =
                            2 === tViewType
                              ? tView.declTNode
                              : 1 === tViewType
                              ? lViewCursor[6]
                              : null),
                          null === parentTNode)
                        )
                          return -1;
                        if (
                          (declarationViewOffset++,
                          (lViewCursor = lViewCursor[15]),
                          -1 !== parentTNode.injectorIndex)
                        )
                          return parentTNode.injectorIndex | (declarationViewOffset << 16);
                      }
                      return -1;
                    })(tNode, lView),
                    injectorIndex = tNode.injectorIndex;
                  if (-1 !== parentLoc) {
                    const parentIndex = 32767 & parentLoc,
                      parentLView = (function (location, startView) {
                        let viewOffset = location >> 16,
                          parentView = startView;
                        for (; viewOffset > 0; ) (parentView = parentView[15]), viewOffset--;
                        return parentView;
                      })(parentLoc, lView),
                      parentData = parentLView[1].data;
                    for (let i = 0; i < 8; i++)
                      lView[injectorIndex + i] =
                        parentLView[parentIndex + i] | parentData[parentIndex + i];
                  }
                  return (lView[injectorIndex + 8] = parentLoc), injectorIndex;
                })(tNode, rootView),
                tView,
                def.type,
              ),
              (function (tView, hostTNode) {
                (hostTNode.flags |= 2),
                  (tView.components || (tView.components = [])).push(hostTNode.index);
              })(tView, tNode),
              (function (tNode, index, numberOfDirectives) {
                (tNode.flags |= 1),
                  (tNode.directiveStart = index),
                  (tNode.directiveEnd = index + 1),
                  (tNode.providerIndexes = index);
              })(tNode, rootView.length)),
            (lViewOrLContainer = componentView),
            (lView = rootView)[13]
              ? (lView[14][4] = lViewOrLContainer)
              : (lView[13] = lViewOrLContainer),
            (lView[14] = lViewOrLContainer),
            (rootView[20] = componentView)
          );
          var lView, lViewOrLContainer;
        })(hostRNode, componentDef, rootView, rendererFactory, renderer, sanitizer),
        componentDef,
        rootView,
        rootContext,
        opts.hostFeatures || null,
      )),
      renderView(rootTView, rootView, null),
      refreshView(rootTView, rootView, null, null);
  } finally {
    leaveView(), rendererFactory.end && rendererFactory.end();
  }
})(
  (() => {
    class HelloWorld {}
    var componentDefinition;
    return (
      (HelloWorld.ɵfac = function (t) {
        return new (t || HelloWorld)();
      }),
      (HelloWorld.ɵcmp =
        ((componentDefinition = {
          type: HelloWorld,
          selectors: [['hello-world']],
          decls: 1,
          vars: 0,
          template: function (rf, ctx) {
            1 & rf && ɵɵtext(0, 'Hello World!');
          },
          encapsulation: 2,
        }),
        (() => {
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
        })())),
      HelloWorld
    );
  })(),
);
