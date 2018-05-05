if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'demo-js'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'demo-js'.");
}
if (typeof this['kotlinx-coroutines-core'] === 'undefined') {
  throw new Error("Error loading module 'demo-js'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'demo-js'.");
}
this['demo-js'] = function (_, Kotlin, $module$kotlinx_coroutines_core) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Unit = Kotlin.kotlin.Unit;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var lazy = Kotlin.kotlin.lazy_klfg04$;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var mapOf = Kotlin.kotlin.collections.mapOf_qfcya0$;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var equals = Kotlin.equals;
  var Exception_init = Kotlin.kotlin.Exception_init_pdl1vj$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var throwUPAE = Kotlin.throwUPAE;
  var CoroutineImpl = Kotlin.kotlin.coroutines.experimental.CoroutineImpl;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.experimental.intrinsics.COROUTINE_SUSPENDED;
  var async = $module$kotlinx_coroutines_core.kotlinx.coroutines.experimental.async_nrwt9h$;
  var asList = Kotlin.org.w3c.dom.asList_kt9thq$;
  var startsWith = Kotlin.kotlin.text.startsWith_7epoxm$;
  var throwCCE = Kotlin.throwCCE;
  var await_0 = $module$kotlinx_coroutines_core.kotlinx.coroutines.experimental.await_t11jrl$;
  var RuntimeException_init = Kotlin.kotlin.RuntimeException_init_pdl1vj$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var dropLast = Kotlin.kotlin.text.dropLast_6ic1pp$;
  var getCallableRef = Kotlin.getCallableRef;
  var Exception = Kotlin.kotlin.Exception;
  var toString = Kotlin.toString;
  var Paho$MQTT$Client = Paho.MQTT.Client;
  var Paho$MQTT$Message = Paho.MQTT.Message;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  ResourceWidget.prototype = Object.create(Widget.prototype);
  ResourceWidget.prototype.constructor = ResourceWidget;
  LogWidget.prototype = Object.create(ResourceWidget.prototype);
  LogWidget.prototype.constructor = LogWidget;
  MainWidget.prototype = Object.create(ResourceWidget.prototype);
  MainWidget.prototype.constructor = MainWidget;
  function FancyText(text) {
    this.text_0 = text;
  }
  FancyText.prototype.toString = function () {
    return 'Fancy3: ' + this.text_0;
  };
  FancyText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FancyText',
    interfaces: []
  };
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  function Hotkey() {
    Hotkey_instance = this;
    this.handlers = LinkedHashMap_init();
  }
  function Hotkey$enable$lambda(this$Hotkey) {
    return function (event) {
      this$Hotkey._detectHotKey_0(event);
      return Unit;
    };
  }
  Hotkey.prototype.enable = function () {
    window.addEventListener('keydown', Hotkey$enable$lambda(this), false);
  };
  Hotkey.prototype._detectHotKey_0 = function (ke) {
    if (!Kotlin.isType(ke, KeyboardEvent))
      return;
    var keh = new KeyboardEventHelper(ke);
    if (!keh.allowed)
      return;
    if (!this.handlers.containsKey_11rb$(keh.key))
      return;
    var res = ensureNotNull(this.handlers.get_11rb$(keh.key));
    res();
    ke.preventDefault();
    ke.stopPropagation();
  };
  Hotkey.prototype.add_a4mwiz$ = function (keys, callback) {
    this.handlers.put_xwzc9p$(keys, callback);
  };
  Hotkey.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Hotkey',
    interfaces: []
  };
  var Hotkey_instance = null;
  function Hotkey_getInstance() {
    if (Hotkey_instance === null) {
      new Hotkey();
    }
    return Hotkey_instance;
  }
  function KeyboardEventHelper(ke) {
    this.ke = ke;
    this.key_6o7gfu$_0 = lazy(KeyboardEventHelper$key$lambda(this));
  }
  Object.defineProperty(KeyboardEventHelper.prototype, 'allowed', {
    get: function () {
      return ALLOWED_KEY_IDENTIFIERS.containsKey_11rb$(this.ke.keyCode);
    }
  });
  Object.defineProperty(KeyboardEventHelper.prototype, 'key', {
    get: function () {
      return this.key_6o7gfu$_0.value;
    }
  });
  function KeyboardEventHelper$key$lambda(this$KeyboardEventHelper) {
    return function () {
      var res = '';
      if (this$KeyboardEventHelper.ke.ctrlKey)
        res += 'CTRL-';
      if (this$KeyboardEventHelper.ke.shiftKey)
        res += 'SHIFT-';
      if (this$KeyboardEventHelper.ke.altKey)
        res += 'ALT-';
      res += ALLOWED_KEY_IDENTIFIERS.get_11rb$(this$KeyboardEventHelper.ke.keyCode);
      return res;
    };
  }
  KeyboardEventHelper.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'KeyboardEventHelper',
    interfaces: []
  };
  var ALLOWED_KEY_IDENTIFIERS;
  function HttpRequestDebug() {
    HttpRequestDebug_instance = this;
  }
  function HttpRequestDebug$getString$lambda$lambda(closure$resolve, closure$xhr) {
    return function (it) {
      closure$resolve(closure$xhr.responseText);
      return Unit;
    };
  }
  function HttpRequestDebug$getString$lambda(closure$url) {
    return function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', closure$url);
      xhr.addEventListener('load', HttpRequestDebug$getString$lambda$lambda(resolve, xhr));
      xhr.send();
      return Unit;
    };
  }
  HttpRequestDebug.prototype.getString_61zpoe$ = function (url) {
    var p = new Promise(HttpRequestDebug$getString$lambda(url));
    return p;
  };
  HttpRequestDebug.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'HttpRequestDebug',
    interfaces: []
  };
  var HttpRequestDebug_instance = null;
  function HttpRequestDebug_getInstance() {
    if (HttpRequestDebug_instance === null) {
      new HttpRequestDebug();
    }
    return HttpRequestDebug_instance;
  }
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function WidgetManager(root) {
    this.root = root;
    this.widgets = ArrayList_init();
    this._historyCounter = 0;
    this._backEnable_0 = false;
  }
  WidgetManager.prototype.create_ehz7t8$ = function (widget) {
    widget.manager = this;
    return widget;
  };
  WidgetManager.prototype.show_yfp8vy$ = function (widget) {
    this.widgets.add_11rb$(widget);
    this.removeRootChild_0();
    this.append_yfp8vy$(widget);
    if (this._backEnable_0) {
      this._historyCounter = this._historyCounter + 1 | 0;
      window.history.pushState(JSON.parse('{' + '"' + 'page' + '"' + ':' + this._historyCounter + '}'), 'title ' + this._historyCounter, '?page=' + this._historyCounter);
    }
  };
  WidgetManager.prototype.removeRootChild_0 = function () {
    this.root.innerHTML = '';
  };
  WidgetManager.prototype.append_yfp8vy$ = function (widget) {
    this.root.append(widget.div);
  };
  WidgetManager.prototype.close_yfp8vy$ = function (widget) {
    if (!equals(last(this.widgets), widget))
      throw Exception_init('wtf!?');
    this.closeCurrent();
  };
  WidgetManager.prototype.closeCurrent = function () {
    if (this.widgets.size === 1)
      return;
    this.widgets.removeAt_za3lpa$(this.widgets.size - 1 | 0);
    this.removeRootChild_0();
    if (this.widgets.size > 0)
      this.append_yfp8vy$(last(this.widgets));
  };
  function WidgetManager$handleBack$lambda(this$WidgetManager) {
    return function (it) {
      println('ok gooo');
      this$WidgetManager.closeCurrent();
      return Unit;
    };
  }
  WidgetManager.prototype.handleBack = function () {
    if (this._backEnable_0)
      return;
    this._backEnable_0 = true;
    window.onpopstate = WidgetManager$handleBack$lambda(this);
  };
  WidgetManager.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'WidgetManager',
    interfaces: []
  };
  function Widget() {
    Widget$Companion_getInstance();
    var tmp$, tmp$_0;
    this.div = Kotlin.isType(tmp$ = document.createElement('div'), HTMLDivElement) ? tmp$ : throwCCE();
    this.elements = LinkedHashMap_init();
    this.manager_ork255$_0 = this.manager_ork255$_0;
    this.instanceName = null;
    this.cachedContent_hg1vin$_0 = this.cachedContent_hg1vin$_0;
    this.loader = null;
    tmp$_0 = Widget$Companion_getInstance()._instanceCounter;
    Widget$Companion_getInstance()._instanceCounter = tmp$_0 + 1 | 0;
    this.instanceName = 'inst' + Widget$Companion_getInstance()._instanceCounter;
    println('instance=' + this.instanceName);
    this.loader = async(void 0, void 0, void 0, Widget_init$lambda(this));
    println(this.instanceName + ' async after');
  }
  Object.defineProperty(Widget.prototype, 'manager', {
    get: function () {
      if (this.manager_ork255$_0 == null)
        return throwUPAE('manager');
      return this.manager_ork255$_0;
    },
    set: function (manager) {
      this.manager_ork255$_0 = manager;
    }
  });
  function Widget$Companion() {
    Widget$Companion_instance = this;
    this._instanceCounter = 0;
  }
  Widget$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Widget$Companion_instance = null;
  function Widget$Companion_getInstance() {
    if (Widget$Companion_instance === null) {
      new Widget$Companion();
    }
    return Widget$Companion_instance;
  }
  Object.defineProperty(Widget.prototype, 'cachedContent', {
    get: function () {
      if (this.cachedContent_hg1vin$_0 == null)
        return throwUPAE('cachedContent');
      return this.cachedContent_hg1vin$_0;
    },
    set: function (cachedContent) {
      this.cachedContent_hg1vin$_0 = cachedContent;
    }
  });
  Widget.prototype.contentPromise = function (continuation) {
    return Promise.resolve(this.content);
  };
  function Widget$whenReady$lambda(this$Widget_0, closure$function_0) {
    return function ($receiver, continuation_0, suspended) {
      var instance = new Coroutine$Widget$whenReady$lambda(this$Widget_0, closure$function_0, $receiver, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$Widget$whenReady$lambda(this$Widget_0, closure$function_0, $receiver, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$this$Widget = this$Widget_0;
    this.local$closure$function = closure$function_0;
  }
  Coroutine$Widget$whenReady$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$Widget$whenReady$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$Widget$whenReady$lambda.prototype.constructor = Coroutine$Widget$whenReady$lambda;
  Coroutine$Widget$whenReady$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = this.local$this$Widget.loader.await(this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            return this.local$closure$function();
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  Widget.prototype.whenReady_o14v8n$ = function (function_0) {
    async(void 0, void 0, void 0, Widget$whenReady$lambda(this, function_0));
  };
  Widget.prototype.loadHtml = function () {
    println('loadHTML cached=' + this.cachedContent.substring(0, 50));
    this.div.innerHTML = this.cachedContent;
    this.rename_ezx6j3$(this.div, this.instanceName);
    this.htmlLoaded();
  };
  Widget.prototype.htmlLoaded = function () {
  };
  Widget.prototype.rename_ezx6j3$ = function (node, instanceName) {
    if (Kotlin.isType(node, Element)) {
      if (node.id.length > 0) {
        node.id = this.instanceId_61zpoe$(node.id);
        this.elements.put_xwzc9p$(node.id, node);
      }
    }
    var tmp$;
    tmp$ = asList(node.childNodes).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      this.rename_ezx6j3$(element, instanceName);
    }
  };
  Widget.prototype.instanceId_61zpoe$ = function (id) {
    return this.instanceName + '$' + id;
  };
  Widget.prototype.show = function () {
    this.manager.show_yfp8vy$(this);
  };
  Widget.prototype.qs_61zpoe$ = function (id) {
    var id_0 = id;
    if (startsWith(id_0, '#')) {
      id_0 = id_0.substring(1);
    }
    return ensureNotNull(this.elements.get_11rb$(this.instanceId_61zpoe$(id_0)));
  };
  Widget.prototype.close = function () {
    if (this.manager == null)
      throw Exception_init('no manager defined');
    this.manager.close_yfp8vy$(this);
  };
  Widget.prototype.onClick_8s0k5j$ = function (name, function_0) {
    this.qs_61zpoe$(name).addEventListener('click', function_0);
  };
  function Widget_init$lambda(this$Widget_0) {
    return function ($receiver, continuation_0, suspended) {
      var instance = new Coroutine$Widget_init$lambda(this$Widget_0, $receiver, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$Widget_init$lambda(this$Widget_0, $receiver, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$this$Widget = this$Widget_0;
  }
  Coroutine$Widget_init$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$Widget_init$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$Widget_init$lambda.prototype.constructor = Coroutine$Widget_init$lambda;
  Coroutine$Widget_init$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = this.local$this$Widget.contentPromise(this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            this.state_0 = 3;
            this.result_0 = await_0(this.result_0, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 3:
            this.local$this$Widget.cachedContent = this.result_0;
            this.local$this$Widget.loadHtml();
            return println(this.local$this$Widget.instanceName + ' async done'), Unit;
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  Widget.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Widget',
    interfaces: []
  };
  function ResourceWidget() {
    Widget.call(this);
  }
  ResourceWidget.prototype.contentPromise = function (continuation) {
    return HttpRequestDebug_getInstance().getString_61zpoe$(this.resourceName);
  };
  Object.defineProperty(ResourceWidget.prototype, 'content', {
    get: function () {
      throw RuntimeException_init('should not be called');
    }
  });
  ResourceWidget.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ResourceWidget',
    interfaces: [Widget]
  };
  function main$lambda$lambda(this$) {
    return function () {
      this$.log_61zpoe$('ciaoo');
      return Unit;
    };
  }
  function main$lambda$lambda_0(this$) {
    return function () {
      this$.log_61zpoe$('ciaoo2');
      return Unit;
    };
  }
  function main(args) {
    var app = new WidgetManager(ensureNotNull(document.getElementById('loading')));
    app.handleBack();
    var $receiver = app.create_ehz7t8$(new LogWidget());
    $receiver.whenReady_o14v8n$(main$lambda$lambda($receiver));
    $receiver.whenReady_o14v8n$(main$lambda$lambda_0($receiver));
    $receiver.show();
  }
  function LogWidget() {
    ResourceWidget.call(this);
  }
  Object.defineProperty(LogWidget.prototype, 'resourceName', {
    get: function () {
      return 'build/resources/main/pages/LogWidget.html';
    }
  });
  Object.defineProperty(LogWidget.prototype, 'counter', {
    get: function () {
      var tmp$;
      return Kotlin.isType(tmp$ = this.qs_61zpoe$('#counter'), HTMLElement) ? tmp$ : throwCCE();
    }
  });
  function LogWidget$htmlLoaded$lambda(this$LogWidget) {
    return function (it) {
      this$LogWidget.close();
      return Unit;
    };
  }
  LogWidget.prototype.htmlLoaded = function () {
    this.onClick_8s0k5j$('close', LogWidget$htmlLoaded$lambda(this));
  };
  Object.defineProperty(LogWidget.prototype, 'ul', {
    get: function () {
      var tmp$;
      return Kotlin.isType(tmp$ = this.qs_61zpoe$('ul'), HTMLUListElement) ? tmp$ : throwCCE();
    }
  });
  LogWidget.prototype.log_61zpoe$ = function (payloadString) {
    println('LogWidget.log ' + payloadString);
    this.counter.innerHTML = (toInt(this.counter.innerHTML) + 1 | 0).toString();
    var node = document.createElement('li');
    node.innerHTML = payloadString;
    this.ul.append(node);
    while (this.ul.childNodes.length > 30)
      this.ul.removeChild(first(asList(this.ul.childNodes)));
  };
  LogWidget.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LogWidget',
    interfaces: [ResourceWidget]
  };
  function MainWidget() {
    ResourceWidget.call(this);
    this.caldaiaCommands_fs3n5i$_0 = lazy(MainWidget$caldaiaCommands$lambda(this));
    this.logWidget_p14pvd$_0 = lazy(MainWidget$logWidget$lambda(this));
  }
  Object.defineProperty(MainWidget.prototype, 'resourceName', {
    get: function () {
      return 'build/resources/main/pages/MainWidget.html';
    }
  });
  function MainWidget$init() {
    MainWidget$init_instance = this;
  }
  MainWidget$init.prototype.startup_2rdptt$ = function (root) {
    var app = new WidgetManager(root);
    app.handleBack();
    app.create_ehz7t8$(new MainWidget()).show();
  };
  MainWidget$init.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'init',
    interfaces: []
  };
  var MainWidget$init_instance = null;
  function MainWidget$init_getInstance() {
    if (MainWidget$init_instance === null) {
      new MainWidget$init();
    }
    return MainWidget$init_instance;
  }
  Object.defineProperty(MainWidget.prototype, 'caldaiaCommands', {
    get: function () {
      return this.caldaiaCommands_fs3n5i$_0.value;
    }
  });
  Object.defineProperty(MainWidget.prototype, '_inHours', {
    get: function () {
      var tmp$;
      return Kotlin.isType(tmp$ = this.qs_61zpoe$('#inHours'), HTMLInputElement) ? tmp$ : throwCCE();
    }
  });
  Object.defineProperty(MainWidget.prototype, '_inMinutes', {
    get: function () {
      var tmp$;
      return Kotlin.isType(tmp$ = this.qs_61zpoe$('#inMinutes'), HTMLInputElement) ? tmp$ : throwCCE();
    }
  });
  Object.defineProperty(MainWidget.prototype, '_inDatetime', {
    get: function () {
      var tmp$;
      return Kotlin.isType(tmp$ = this.qs_61zpoe$('#inDatetime'), HTMLInputElement) ? tmp$ : throwCCE();
    }
  });
  Object.defineProperty(MainWidget.prototype, '_url', {
    get: function () {
      var tmp$;
      return Kotlin.isType(tmp$ = this.qs_61zpoe$('#url'), HTMLInputElement) ? tmp$ : throwCCE();
    }
  });
  Object.defineProperty(MainWidget.prototype, '_urlChoice', {
    get: function () {
      var tmp$;
      return Kotlin.isType(tmp$ = this.qs_61zpoe$('#urlChoice'), HTMLSelectElement) ? tmp$ : throwCCE();
    }
  });
  Object.defineProperty(MainWidget.prototype, '_response', {
    get: function () {
      var tmp$;
      return Kotlin.isType(tmp$ = this.qs_61zpoe$('#response'), HTMLElement) ? tmp$ : throwCCE();
    }
  });
  Object.defineProperty(MainWidget.prototype, 'logWidget', {
    get: function () {
      return this.logWidget_p14pvd$_0.value;
    }
  });
  Object.defineProperty(MainWidget.prototype, '_connected', {
    get: function () {
      var tmp$;
      return Kotlin.isType(tmp$ = this.qs_61zpoe$('#connected'), HTMLInputElement) ? tmp$ : throwCCE();
    }
  });
  function MainWidget$htmlLoaded$lambda(this$MainWidget) {
    return function (it) {
      this$MainWidget.HourInc_za3lpa$(-1);
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_0(this$MainWidget) {
    return function (it) {
      this$MainWidget.HourInc_za3lpa$(1);
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_1(this$MainWidget) {
    return function (it) {
      this$MainWidget.MinuteInc_za3lpa$(-10);
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_2(this$MainWidget) {
    return function (it) {
      this$MainWidget.MinuteInc_za3lpa$(10);
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_3(this$MainWidget) {
    return function (it) {
      this$MainWidget.Zero();
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_4(this$MainWidget) {
    return function (it) {
      this$MainWidget.processCommand_61zpoe$('on');
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_5(this$MainWidget) {
    return function (it) {
      this$MainWidget.processCommand_61zpoe$('off');
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_6(this$MainWidget) {
    return function (it) {
      this$MainWidget.cronClear_0();
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_7(this$MainWidget) {
    return function (it) {
      this$MainWidget.sendCmd_61zpoe$('status');
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_8(this$MainWidget) {
    return function (it) {
      this$MainWidget.sendCmd_61zpoe$('cron_list');
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_9(this$MainWidget) {
    return function (it) {
      this$MainWidget.rebootCommand();
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_10(it) {
    return Unit;
  }
  function MainWidget$htmlLoaded$lambda_11(this$MainWidget) {
    return function (it) {
      this$MainWidget.urlChoiceChanged_0();
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_12(this$MainWidget) {
    return function (it) {
      this$MainWidget.logWidget.show();
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_13(this$MainWidget) {
    return function () {
      this$MainWidget.manager.closeCurrent();
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_14(this$MainWidget) {
    return function () {
      this$MainWidget.logWidget.show();
      return Unit;
    };
  }
  function MainWidget$htmlLoaded$lambda_15(this$MainWidget) {
    return function (it) {
      this$MainWidget.caldaiaCommands.updateUrl();
      return Unit;
    };
  }
  MainWidget.prototype.htmlLoaded = function () {
    var tmp$, tmp$_0;
    this.onClick_8s0k5j$('inHDec', MainWidget$htmlLoaded$lambda(this));
    this.onClick_8s0k5j$('inHInc', MainWidget$htmlLoaded$lambda_0(this));
    this.onClick_8s0k5j$('inMDec', MainWidget$htmlLoaded$lambda_1(this));
    this.onClick_8s0k5j$('inMInc', MainWidget$htmlLoaded$lambda_2(this));
    this.onClick_8s0k5j$('inZero', MainWidget$htmlLoaded$lambda_3(this));
    this.onClick_8s0k5j$('onbtn', MainWidget$htmlLoaded$lambda_4(this));
    this.onClick_8s0k5j$('offbtn', MainWidget$htmlLoaded$lambda_5(this));
    this.onClick_8s0k5j$('clearbtn', MainWidget$htmlLoaded$lambda_6(this));
    this.onClick_8s0k5j$('statusbtn', MainWidget$htmlLoaded$lambda_7(this));
    this.onClick_8s0k5j$('cronlistbtn', MainWidget$htmlLoaded$lambda_8(this));
    this.onClick_8s0k5j$('rebootbtn', MainWidget$htmlLoaded$lambda_9(this));
    this.onClick_8s0k5j$('debug', MainWidget$htmlLoaded$lambda_10);
    var urls = ['...select one', 'http://casa.jako.pro:90/cgi-bin/c4?cmd=', 'http://10.0.0.122/cgi-bin/c4?cmd=', 'http://10.0.0.137/cgi-bin/c4?cmd=', 'http://casa.jako.pro:92/cgi-bin/c4?cmd=', 'mqttwss://qbkzojmr:rTaeAnsujbt-@m23.cloudmqtt.com:37516?dest=ESP_0100AE&clientId=dart-client', 'mqttwss://qbkzojmr:rTaeAnsujbt-@m23.cloudmqtt.com:37516?dest=ESP_05B65E&clientId=dart-client'];
    var tmp$_1;
    for (tmp$_1 = 0; tmp$_1 !== urls.length; ++tmp$_1) {
      var element = urls[tmp$_1];
      var tmp$_2;
      var opt = Kotlin.isType(tmp$_2 = document.createElement('option'), HTMLOptionElement) ? tmp$_2 : throwCCE();
      var tmp$_3 = this._urlChoice.options;
      var tmp$_4 = this._urlChoice.options.length;
      opt.value = element;
      opt.text = element;
      tmp$_3[tmp$_4] = opt;
    }
    this._url.value = (tmp$ = window.localStorage['url']) != null ? tmp$ : '';
    this._urlChoice.onchange = MainWidget$htmlLoaded$lambda_11(this);
    var message = ensureNotNull((tmp$_0 = this._urlChoice.options[0]) == null || Kotlin.isType(tmp$_0, HTMLOptionElement) ? tmp$_0 : throwCCE());
    this.onClick_8s0k5j$('log', MainWidget$htmlLoaded$lambda_12(this));
    this.durationChanged();
    Hotkey_getInstance().enable();
    Hotkey_getInstance().add_a4mwiz$('ESC', MainWidget$htmlLoaded$lambda_13(this));
    Hotkey_getInstance().add_a4mwiz$('F1', MainWidget$htmlLoaded$lambda_14(this));
    this._url.onblur = MainWidget$htmlLoaded$lambda_15(this);
    this.caldaiaCommands.updateUrl();
    this.qs_61zpoe$('loading').setAttribute('style', 'display:none');
    this.qs_61zpoe$('loaded').setAttribute('style', '');
  };
  MainWidget.prototype.rebootCommand = function () {
    if (!window.confirm('Sei sicuro'))
      return;
    this.sendCmd_61zpoe$('reboot');
  };
  MainWidget.prototype.cronClear_0 = function () {
    this.logWidget.log_61zpoe$('cronClear to implem');
    if (!window.confirm('Sei sicuro'))
      return;
    this.sendCmd_61zpoe$('cron_clear');
  };
  MainWidget.prototype.urlChoiceChanged_0 = function () {
    var tmp$;
    var opt = Kotlin.isType(tmp$ = first(asList(this._urlChoice.selectedOptions)), HTMLOptionElement) ? tmp$ : throwCCE();
    this._url.value = opt.value;
    window.localStorage['url'] = this._url.value;
    this.caldaiaCommands.updateUrl();
  };
  function MainWidget$setLog$lambda(this$MainWidget, closure$payloadString) {
    return function () {
      this$MainWidget.logWidget.log_61zpoe$(closure$payloadString);
      return Unit;
    };
  }
  var Regex_init = Kotlin.kotlin.text.Regex_init_61zpoe$;
  MainWidget.prototype.setLog_61zpoe$ = function (payloadString) {
    this.logWidget.whenReady_o14v8n$(MainWidget$setLog$lambda(this, payloadString));
    if (!startsWith(payloadString, 'debug') && !startsWith(payloadString, 'ping')) {
      this._response.innerHTML = Regex_init('\n').replace_x2uqeu$(payloadString, '<br>') + '<br>';
    }
  };
  MainWidget.prototype.processCommand_61zpoe$ = function (cmd) {
    if (this.getDurationInMin_0() === 0)
      this.sendCmd_61zpoe$(cmd);
    else
      this.sendCmd_61zpoe$(this.getCronCmd_61zpoe$(cmd));
  };
  MainWidget.prototype.getCronCmd_61zpoe$ = function (cmd) {
    return 'cron_add,' + cmd + ',' + this.getDurationInMin_0();
  };
  MainWidget.prototype.sendCmd_61zpoe$ = function (command) {
    this._response.innerHTML = 'invio comando<br>in attesa della risposta...';
    this.logWidget.log_61zpoe$('sending: ' + command);
    this.caldaiaCommands.send_61zpoe$(command);
  };
  MainWidget.prototype.Zero = function () {
    this._inHours.value = '0';
    this._inMinutes.value = '0';
    this.durationChanged();
  };
  MainWidget.prototype.HourInc_za3lpa$ = function (amount) {
    var h = toInt(this._inHours.value) + amount | 0;
    if (h < 0)
      h = 0;
    if (h > 9999)
      h = 9999;
    this._inHours.value = h.toString();
    this.durationChanged();
  };
  MainWidget.prototype.MinuteInc_za3lpa$ = function (amount) {
    var m = this.getDurationInMin_0() + amount | 0;
    if (m < 0)
      m = 0;
    this.setMinAndHour_za3lpa$(m);
    this.durationChanged();
  };
  var trim = Kotlin.kotlin.text.trim_gw00vp$;
  MainWidget.prototype.durationChanged = function () {
    var $receiver = this._inMinutes.value;
    var tmp$;
    if (trim(Kotlin.isCharSequence(tmp$ = $receiver) ? tmp$ : throwCCE()).toString().length === 0)
      this._inMinutes.value = '0';
    var $receiver_0 = this._inHours.value;
    var tmp$_0;
    if (trim(Kotlin.isCharSequence(tmp$_0 = $receiver_0) ? tmp$_0 : throwCCE()).toString().length === 0)
      this._inHours.value = '0';
    var m = this.getDurationInMin_0();
    var now = new Date();
    now.setSeconds(now.getSeconds() + m);
    var str = now.toISOString();
    var dropLast_0 = dropLast(str, 5);
    println(dropLast_0);
    this._inDatetime.value = dropLast_0;
  };
  MainWidget.prototype.getDurationInMin_0 = function () {
    return toInt(this._inMinutes.value) + (toInt(this._inHours.value) * 60 | 0) | 0;
  };
  MainWidget.prototype.setMinAndHour_za3lpa$ = function (durationInMin) {
    var minutePart = durationInMin % 60;
    this._inMinutes.value = minutePart.toString();
    var hourPart = (durationInMin - minutePart | 0) / 60 | 0;
    this._inHours.value = hourPart.toString();
  };
  function MainWidget$caldaiaCommands$lambda$lambda(this$MainWidget) {
    return function () {
      return this$MainWidget._url.value;
    };
  }
  function MainWidget$caldaiaCommands$lambda$lambda_0(this$MainWidget) {
    return function (it) {
      this$MainWidget._connected.checked = it;
      return Unit;
    };
  }
  function MainWidget$caldaiaCommands$lambda(this$MainWidget) {
    return function () {
      return new CaldaiaRemote(MainWidget$caldaiaCommands$lambda$lambda(this$MainWidget), getCallableRef('setLog', function ($receiver, payloadString) {
        return $receiver.setLog_61zpoe$(payloadString), Unit;
      }.bind(null, this$MainWidget)), MainWidget$caldaiaCommands$lambda$lambda_0(this$MainWidget));
    };
  }
  function MainWidget$logWidget$lambda(this$MainWidget) {
    return function () {
      return this$MainWidget.manager.create_ehz7t8$(new LogWidget());
    };
  }
  MainWidget.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MainWidget',
    interfaces: [ResourceWidget]
  };
  function CaldaiaRemote(urlProvider, setLog, onConnectChange) {
    this.urlProvider = urlProvider;
    this.setLog = setLog;
    this.onConnectChange = onConnectChange;
    this.mqtt = null;
    this.destination = '';
    this._baseUrl_kok3p5$_0 = this._baseUrl_kok3p5$_0;
  }
  Object.defineProperty(CaldaiaRemote.prototype, '_baseUrl', {
    get: function () {
      if (this._baseUrl_kok3p5$_0 == null)
        return throwUPAE('_baseUrl');
      return this._baseUrl_kok3p5$_0;
    },
    set: function (_baseUrl) {
      this._baseUrl_kok3p5$_0 = _baseUrl;
    }
  });
  CaldaiaRemote.prototype.updateUrl = function () {
    var tmp$;
    this._baseUrl = this.urlProvider();
    println('url changed to ' + this._baseUrl);
    try {
      (tmp$ = this.mqtt) != null ? (tmp$.disconnect(), Unit) : null;
      this.onConnectChange(false);
    }
     catch (ex) {
      if (Kotlin.isType(ex, Exception)) {
        println(ex);
      }
       else
        throw ex;
    }
    this.mqtt = null;
    if (this.isMqttUrl)
      this.startMqtt_0();
  };
  Object.defineProperty(CaldaiaRemote.prototype, 'isMqttUrl', {
    get: function () {
      return startsWith(this._baseUrl, 'mqttws');
    }
  });
  function CaldaiaRemote$startMqtt$lambda(this$CaldaiaRemote) {
    return function (it) {
      this$CaldaiaRemote.onConnectChange(true);
      this$CaldaiaRemote.setLog('debug:mqtt connection success');
      ensureNotNull(this$CaldaiaRemote.mqtt).subscribe(this$CaldaiaRemote.destination + '-out');
      return Unit;
    };
  }
  function CaldaiaRemote$startMqtt$lambda_0(it) {
    println('mqtt FAILURE ' + it.errorCode + ' ' + it.errorMessage);
    return Unit;
  }
  function CaldaiaRemote$startMqtt$lambda_1(this$CaldaiaRemote) {
    return function (it) {
      this$CaldaiaRemote.setLog(it.payloadString);
      return Unit;
    };
  }
  function CaldaiaRemote$startMqtt$lambda_2(this$CaldaiaRemote) {
    return function (it) {
      this$CaldaiaRemote.setLog('mqtt CONN LOST ' + it.errorCode + ' ' + it.errorMessage);
      return Unit;
    };
  }
  CaldaiaRemote.prototype.startMqtt_0 = function () {
    var uri = new Uri(this._baseUrl);
    var clientId = toString(uri.params.get_11rb$('clientId')) + (new Date()).getMilliseconds() % 100;
    println(uri.protocol + ' ' + uri.hostname + ' ' + uri.username + ' ' + clientId);
    this.destination = ensureNotNull(uri.params.get_11rb$('dest'));
    this.mqtt = new Paho$MQTT$Client(uri.hostname, uri.port, clientId);
    this.setLog('debug:mqtt params host=' + uri.hostname + ' port=' + uri.port + ' clientId=' + clientId);
    var opt = {};
    opt.userName = uri.username;
    opt.password = uri.password;
    opt.onSuccess = CaldaiaRemote$startMqtt$lambda(this);
    opt.onFailure = CaldaiaRemote$startMqtt$lambda_0;
    opt.reconnect = true;
    opt.useSSL = true;
    ensureNotNull(this.mqtt).onMessageArrived = CaldaiaRemote$startMqtt$lambda_1(this);
    ensureNotNull(this.mqtt).onConnectionLost = CaldaiaRemote$startMqtt$lambda_2(this);
    ensureNotNull(this.mqtt).connect(opt);
  };
  function CaldaiaRemote$send$lambda(closure$url_0, this$CaldaiaRemote_0) {
    return function ($receiver, continuation_0, suspended) {
      var instance = new Coroutine$CaldaiaRemote$send$lambda(closure$url_0, this$CaldaiaRemote_0, $receiver, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$CaldaiaRemote$send$lambda(closure$url_0, this$CaldaiaRemote_0, $receiver, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$closure$url = closure$url_0;
    this.local$this$CaldaiaRemote = this$CaldaiaRemote_0;
  }
  Coroutine$CaldaiaRemote$send$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$CaldaiaRemote$send$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$CaldaiaRemote$send$lambda.prototype.constructor = Coroutine$CaldaiaRemote$send$lambda;
  Coroutine$CaldaiaRemote$send$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = await_0(HttpRequestDebug_getInstance().getString_61zpoe$(this.local$closure$url.v), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            var str = this.result_0;
            return this.local$this$CaldaiaRemote.setLog(str);
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  CaldaiaRemote.prototype.send_61zpoe$ = function (command) {
    if (this.isMqttUrl) {
      var tmp$ = ensureNotNull(this.mqtt);
      var $receiver = new Paho$MQTT$Message(command);
      $receiver.destinationName = this.destination;
      tmp$.send($receiver);
    }
     else {
      var url = {v: this._baseUrl + command};
      this.setLog('debug: ' + url.v);
      async(void 0, void 0, void 0, CaldaiaRemote$send$lambda(url, this));
    }
  };
  CaldaiaRemote.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CaldaiaRemote',
    interfaces: []
  };
  function PahoTest() {
    PahoTest_instance = this;
  }
  function PahoTest$tryit$lambda(closure$client) {
    return function (it) {
      println('SUCCESS');
      closure$client.subscribe('destination1');
      var tmp$ = closure$client;
      var $receiver = new Paho$MQTT$Message('debug: hello world');
      $receiver.destinationName = 'destination2';
      tmp$.send($receiver);
      return Unit;
    };
  }
  function PahoTest$tryit$lambda_0(it) {
    println('FAILURE ' + it.errorCode + ' ' + it.errorMessage);
    return Unit;
  }
  function PahoTest$tryit$lambda_1(it) {
    println('payload=' + it.payloadString);
    return Unit;
  }
  PahoTest.prototype.tryit_za3rmp$ = function (conf) {
    var client = new Paho$MQTT$Client(conf.hostname, conf.port, ensureNotNull(conf.params['clientId']));
    var opt = {};
    opt.userName = conf.username;
    opt.password = conf.password;
    opt.onSuccess = PahoTest$tryit$lambda(client);
    opt.onFailure = PahoTest$tryit$lambda_0;
    opt.reconnect = true;
    opt.useSSL = true;
    client.onMessageArrived = PahoTest$tryit$lambda_1;
    client.connect(opt);
  };
  PahoTest.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'PahoTest',
    interfaces: []
  };
  var PahoTest_instance = null;
  function PahoTest_getInstance() {
    if (PahoTest_instance === null) {
      new PahoTest();
    }
    return PahoTest_instance;
  }
  function Uri(uri) {
    this.protocol = '';
    this.username = '';
    this.password = '';
    this.hostname = '';
    this.port = 0;
    this.queryString = '';
    this.params = LinkedHashMap_init();
    var leftOver = {v: uri};
    var s = Uri_init$s(leftOver);
    this.protocol = s('://');
    this.username = s(':');
    this.password = s('@');
    this.hostname = s(':');
    this.port = toInt(s('?'));
    this.queryString = leftOver.v;
    var tmp$;
    tmp$ = split(this.queryString, ['&']).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var keyvalue = split(element, ['=']);
      switch (keyvalue.size) {
        case 1:
          var $receiver = this.params;
          var key = keyvalue.get_za3lpa$(0);
          $receiver.put_xwzc9p$(key, '');
          break;
        case 2:
          var $receiver_0 = this.params;
          var key_0 = keyvalue.get_za3lpa$(0);
          var value = keyvalue.get_za3lpa$(1);
          $receiver_0.put_xwzc9p$(key_0, value);
          break;
      }
    }
    println('p=' + this.protocol + ' u=' + this.username + ' p=' + this.password + ' h=' + this.hostname + ' port=' + this.port + ' q=' + this.queryString);
  }
  function Uri_init$s(closure$leftOver) {
    return function (delimiters) {
      var split_0 = split(closure$leftOver.v, [delimiters], void 0, 2);
      closure$leftOver.v = split_0.size > 1 ? split_0.get_za3lpa$(1) : '';
      return first(split_0);
    };
  }
  Uri.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Uri',
    interfaces: []
  };
  var package$demo = _.demo || (_.demo = {});
  var package$common = package$demo.common || (package$demo.common = {});
  package$common.FancyText = FancyText;
  var package$fragment = _.fragment || (_.fragment = {});
  Object.defineProperty(package$fragment, 'Hotkey', {
    get: Hotkey_getInstance
  });
  package$fragment.KeyboardEventHelper = KeyboardEventHelper;
  Object.defineProperty(package$fragment, 'ALLOWED_KEY_IDENTIFIERS', {
    get: function () {
      return ALLOWED_KEY_IDENTIFIERS;
    }
  });
  Object.defineProperty(package$fragment, 'HttpRequestDebug', {
    get: HttpRequestDebug_getInstance
  });
  package$fragment.WidgetManager = WidgetManager;
  Object.defineProperty(Widget, 'Companion', {
    get: Widget$Companion_getInstance
  });
  package$fragment.Widget = Widget;
  package$fragment.ResourceWidget = ResourceWidget;
  _.main_kand9s$ = main;
  var package$pages = _.pages || (_.pages = {});
  package$pages.LogWidget = LogWidget;
  Object.defineProperty(MainWidget, 'init', {
    get: MainWidget$init_getInstance
  });
  package$pages.MainWidget = MainWidget;
  var package$utils = _.utils || (_.utils = {});
  package$utils.CaldaiaRemote = CaldaiaRemote;
  var package$js = _.js || (_.js = {});
  var package$externals = package$js.externals || (package$js.externals = {});
  var package$paho_mqtt = package$externals.paho_mqtt || (package$externals.paho_mqtt = {});
  Object.defineProperty(package$paho_mqtt, 'PahoTest', {
    get: PahoTest_getInstance
  });
  package$utils.Uri = Uri;
  ALLOWED_KEY_IDENTIFIERS = mapOf([to(8, 'BACKSPACE'), to(9, 'TAB'), to(13, 'ENTER'), to(19, 'PAUSE'), to(20, 'CAPS_LOCK'), to(27, 'ESC'), to(32, 'SPACE'), to(33, 'PAGE_UP'), to(34, 'PAGE_DOWN'), to(35, 'END'), to(36, 'HOME'), to(37, 'LEFT'), to(38, 'UP'), to(39, 'RIGHT'), to(40, 'DOWN'), to(45, 'INSERT'), to(46, 'DELETE'), to(48, '0'), to(49, '1'), to(50, '2'), to(51, '3'), to(52, '4'), to(53, '5'), to(54, '6'), to(55, '7'), to(56, '8'), to(57, '9'), to(65, 'A'), to(66, 'B'), to(67, 'C'), to(68, 'D'), to(69, 'E'), to(70, 'F'), to(71, 'G'), to(72, 'H'), to(73, 'I'), to(74, 'J'), to(75, 'K'), to(76, 'L'), to(77, 'M'), to(78, 'N'), to(79, 'O'), to(80, 'P'), to(81, 'Q'), to(82, 'R'), to(83, 'S'), to(84, 'T'), to(85, 'U'), to(86, 'V'), to(87, 'W'), to(88, 'X'), to(89, 'Y'), to(90, 'Z'), to(91, 'LWIN'), to(92, 'RWIN'), to(112, 'F1'), to(113, 'F2'), to(114, 'F3'), to(115, 'F4'), to(116, 'F5'), to(117, 'F6'), to(118, 'F7'), to(119, 'F8'), to(120, 'F9'), to(121, 'F10'), to(122, 'F11'), to(123, 'F12'), to(144, 'NUM_LOCK'), to(145, 'SCROL_LLOCK'), to(186, ';'), to(187, '='), to(188, ','), to(189, '-'), to(190, '.'), to(191, '/'), to(192, '`'), to(219, '['), to(220, '\\'), to(221, ']'), to(222, '"')]);
  main([]);
  Kotlin.defineModule('demo-js', _);
  return _;
}(typeof this['demo-js'] === 'undefined' ? {} : this['demo-js'], kotlin, this['kotlinx-coroutines-core']);
