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
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Throwable = Error;
  var ensureNotNull = Kotlin.ensureNotNull;
  var throwCCE = Kotlin.throwCCE;
  var get_js = Kotlin.kotlin.js.get_js_1yb8b7$;
  var await_0 = $module$kotlinx_coroutines_core.kotlinx.coroutines.experimental.await_t11jrl$;
  var Exception = Kotlin.kotlin.Exception;
  var CoroutineImpl = Kotlin.kotlin.coroutines.experimental.CoroutineImpl;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.experimental.intrinsics.COROUTINE_SUSPENDED;
  var async = $module$kotlinx_coroutines_core.kotlinx.coroutines.experimental.async_nrwt9h$;
  EventException.prototype = Object.create(Throwable.prototype);
  EventException.prototype.constructor = EventException;
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
  function EventException() {
    Throwable.call(this);
    this.message_jws7ak$_0 = void 0;
    this.cause_cglmnq$_0 = null;
    Kotlin.captureStack(Throwable, this);
    this.name = 'EventException';
  }
  Object.defineProperty(EventException.prototype, 'message', {
    get: function () {
      return this.message_jws7ak$_0;
    }
  });
  Object.defineProperty(EventException.prototype, 'cause', {
    get: function () {
      return this.cause_cglmnq$_0;
    }
  });
  EventException.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'EventException',
    interfaces: [Throwable]
  };
  function testPromise$lambda(closure$fail) {
    return function (resolve, reject) {
      if (closure$fail)
        reject(Kotlin.newThrowable('fallito!'));
      else
        resolve('ok!');
      return Unit;
    };
  }
  function testPromise(fail) {
    return new Promise(testPromise$lambda(fail));
  }
  function main$lambda$lambda(closure$ta1) {
    return function (it) {
      closure$ta1.value = closure$ta1.value + ' catch ';
      return ' return ';
    };
  }
  function main$lambda(closure$ta1_0) {
    return function ($receiver, continuation_0, suspended) {
      var instance = new Coroutine$main$lambda(closure$ta1_0, $receiver, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$main$lambda(closure$ta1_0, $receiver, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 5;
    this.local$closure$ta1 = closure$ta1_0;
    this.local$tmp$ = void 0;
    this.local$tmp$_0 = void 0;
  }
  Coroutine$main$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$main$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$main$lambda.prototype.constructor = Coroutine$main$lambda;
  Coroutine$main$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.local$closure$ta1.value = this.local$closure$ta1.value + ' uno ';
            this.local$closure$ta1.value = this.local$closure$ta1.value + ' due ';
            this.exceptionState_0 = 2;
            this.local$tmp$ = this.local$closure$ta1;
            this.local$tmp$_0 = this.local$tmp$.value;
            this.state_0 = 1;
            this.result_0 = await_0(testPromise(true).catch(main$lambda$lambda(this.local$closure$ta1)), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            this.local$tmp$.value = this.local$tmp$_0 + this.result_0;
            return this.local$closure$ta1.value = this.local$closure$ta1.value + ' tre ', Unit;
          case 2:
            this.exceptionState_0 = 5;
            var ex = this.exception_0;
            if (Kotlin.isType(ex, Exception)) {
              return this.local$closure$ta1.value = this.local$closure$ta1.value + ' exe ', Unit;
            }
             else {
              throw ex;
            }

          case 3:
            this.state_0 = 4;
            continue;
          case 4:
            return;
          case 5:
            throw this.exception_0;
        }
      }
       catch (e) {
        if (this.state_0 === 5) {
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
  function main(args) {
    var tmp$, tmp$_0;
    var elements = Kotlin.isType(tmp$ = ensureNotNull(document.getElementById('div1')), HTMLDivElement) ? tmp$ : throwCCE();
    var str = get_js(Kotlin.getKClassFromExpression(elements)).name;
    var ta1 = Kotlin.isType(tmp$_0 = ensureNotNull(document.getElementById('ta1')), HTMLTextAreaElement) ? tmp$_0 : throwCCE();
    async(void 0, void 0, void 0, main$lambda(ta1));
  }
  var canvas;
  function initializeCanvas() {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    context.canvas.width = window.innerWidth - 200 | 0;
    context.canvas.height = window.innerHeight - 200 | 0;
    ensureNotNull(document.body).appendChild(canvas);
    return canvas;
  }
  function get_context() {
    var tmp$;
    return Kotlin.isType(tmp$ = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : throwCCE();
  }
  function get_width() {
    return canvas.width;
  }
  function get_height() {
    return canvas.height;
  }
  function HelloKotlin() {
    this.relX = 0.2 + 0.2 * Math.random();
    this.relY = 0.4 + 0.2 * Math.random();
    this.relXVelocity = this.randomVelocity();
    this.relYVelocity = this.randomVelocity();
    this.message = 'Hello, Kotlin!';
    this.textHeightInPixels = 20;
    get_context().font = 'bold 20px Georgia, serif';
    this.textWidthInPixels = get_context().measureText(this.message).width;
  }
  Object.defineProperty(HelloKotlin.prototype, 'absX', {
    get: function () {
      return this.relX * get_width();
    }
  });
  Object.defineProperty(HelloKotlin.prototype, 'absY', {
    get: function () {
      return this.relY * get_height();
    }
  });
  HelloKotlin.prototype.draw = function () {
    get_context().save();
    this.move();
    get_context().shadowColor = '#000000';
    get_context().shadowBlur = 5.0;
    get_context().shadowOffsetX = -4.0;
    get_context().shadowOffsetY = 4.0;
    get_context().fillStyle = 'rgb(242,160,110)';
    get_context().fillText(this.message, this.absX, this.absY);
    get_context().restore();
  };
  HelloKotlin.prototype.move = function () {
    var relTextWidth = this.textWidthInPixels / get_width();
    if (this.relX > 1.0 - relTextWidth - this.get_abs_yrwdxr$(this.relXVelocity) || this.relX < this.get_abs_yrwdxr$(this.relXVelocity)) {
      this.relXVelocity *= -1;
    }
    var relTextHeight = this.textHeightInPixels / get_height() | 0;
    if (this.relY > 1.0 - this.get_abs_yrwdxr$(this.relYVelocity) || this.relY < this.get_abs_yrwdxr$(this.relYVelocity) + relTextHeight) {
      this.relYVelocity *= -1;
    }
    this.relX += this.relXVelocity;
    this.relY += this.relYVelocity;
  };
  HelloKotlin.prototype.randomVelocity = function () {
    return 0.03 * Math.random() * (Math.random() < 0.5 ? 1 : -1);
  };
  HelloKotlin.prototype.get_abs_yrwdxr$ = function ($receiver) {
    return $receiver > 0 ? $receiver : -$receiver;
  };
  HelloKotlin.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'HelloKotlin',
    interfaces: []
  };
  function renderBackground() {
    get_context().save();
    get_context().fillStyle = '#5C7EED';
    get_context().fillRect(0.0, 0.0, get_width(), get_height());
    get_context().restore();
  }
  function main2$lambda(closure$logos) {
    return function () {
      var tmp$, tmp$_0;
      renderBackground();
      tmp$ = closure$logos;
      for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
        var logo = tmp$[tmp$_0];
        logo.draw();
      }
      return Unit;
    };
  }
  var Array_0 = Array;
  function main2(args) {
    var interval = 50;
    var array = Array_0(3);
    var tmp$;
    tmp$ = array.length - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      array[i] = new HelloKotlin();
    }
    var logos = array;
    window.setInterval(main2$lambda(logos), interval);
  }
  var package$demo = _.demo || (_.demo = {});
  var package$common = package$demo.common || (package$demo.common = {});
  package$common.FancyText = FancyText;
  Object.defineProperty(_, 'HttpRequestDebug', {
    get: HttpRequestDebug_getInstance
  });
  _.EventException = EventException;
  _.testPromise_6taknv$ = testPromise;
  _.main_kand9s$ = main;
  Object.defineProperty(_, 'canvas', {
    get: function () {
      return canvas;
    }
  });
  _.initializeCanvas = initializeCanvas;
  Object.defineProperty(_, 'context', {
    get: get_context
  });
  Object.defineProperty(_, 'width', {
    get: get_width
  });
  Object.defineProperty(_, 'height', {
    get: get_height
  });
  _.HelloKotlin = HelloKotlin;
  _.renderBackground = renderBackground;
  _.main2_kand9s$ = main2;
  canvas = initializeCanvas();
  main([]);
  Kotlin.defineModule('demo-js', _);
  return _;
}(typeof this['demo-js'] === 'undefined' ? {} : this['demo-js'], kotlin, this['kotlinx-coroutines-core']);
