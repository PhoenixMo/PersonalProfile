//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Poke = (function (_super) {
    __extends(Poke, _super);
    function Poke() {
        _super.apply(this, arguments);
        this._touchStatus = false;
        this._distance = new egret.Point();
        this.stageW = 640;
    }
    var d = __define,c=Poke,p=c.prototype;
    p.mouseDown = function (evt) {
        this._touchStatus = true;
        this._distance.y = evt.stageY - this.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    p.mouseMove = function (evt) {
        var _this = this;
        if (this._touchStatus) {
            this.y = evt.stageY - this._distance.y;
        }
        if (this.y < -1136 / 3) {
            egret.Tween.get(this).to({ x: 4 / 5 * this.stageW, y: -1136 }, 400, egret.Ease.sineIn)
                .call(function () { _this.parent.addChildAt(_this, 1); }).to({ x: 4 / 5 * this.stageW, y: 0 }, 100, egret.Ease.sineIn);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }
        else if (this.y < 0) {
            egret.Tween.get(this).to({ x: 4 / 5 * this.stageW, y: 0 }, 200, egret.Ease.sineIn)
                .to({ x: 4 / 5 * this.stageW, y: 25 }, 100, egret.Ease.sineIn).to({ x: 4 / 5 * this.stageW, y: 0 }, 100, egret.Ease.sineIn);
        }
        if (this.y > 1136 / 3) {
            egret.Tween.get(this).to({ x: 4 / 5 * this.stageW, y: 1136 }, 400, egret.Ease.sineIn)
                .call(function () { _this.parent.addChildAt(_this, 1); }).to({ x: 4 / 5 * this.stageW, y: 0 }, 100, egret.Ease.sineIn);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }
        else if (this.y > 0) {
            egret.Tween.get(this).to({ x: 4 / 5 * this.stageW, y: 0 }, 200, egret.Ease.sineIn)
                .to({ x: 4 / 5 * this.stageW, y: -25 }, 100, egret.Ease.sineIn).to({ x: 4 / 5 * this.stageW, y: 0 }, 100, egret.Ease.sineIn);
        }
    };
    p.mouseUp = function (evt) {
        this._touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    return Poke;
}(egret.DisplayObjectContainer));
egret.registerClass(Poke,'Poke');
var Music = (function (_super) {
    __extends(Music, _super);
    function Music() {
        _super.call(this);
        this._pauseTime = 30;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Music,p=c.prototype;
    p.onAddToStage = function (event) {
        this.loadSound();
    };
    /*** 本示例关键代码段开始 ***/
    //加载
    p.loadSound = function () {
        var sound = this._sound = new egret.Sound();
        ;
        //sound 加载完成监听
        sound.addEventListener(egret.Event.COMPLETE, function (e) {
            this.init();
        }, this);
        sound.load("resource/assets/ccnn.mp3");
    };
    //播放
    p.play = function () {
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(this._pauseTime, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onTimeUpdate, this);
    };
    //停止
    p.stop = function () {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onTimeUpdate, this);
            this._channel.stop();
            this._channel = null;
        }
    };
    //播放完成
    p.onComplete = function (e) {
        console.log("播放完成");
        this.stop();
        this.setAllAbled(false);
        this.setProgress(0);
    };
    //更新进度
    p.onTimeUpdate = function (e) {
        var position = this._channel ? this._channel.position : 0;
        this.setProgress(position);
    };
    p.setProgress = function (position) {
        this._updateTxt.text = position.toFixed(1) + "/" + this._sound.length.toFixed(1);
        var w = (position / this._sound.length) * 400;
        this._bar.x = w + this.stage.stageWidth / 2 - 200;
        var mask = this._progress.mask || new egret.Rectangle(0, 0, 0, 60);
        mask.x = w;
        mask.width = 400 - w;
        this._progress.mask = mask;
    };
    p.init = function () {
        var rap = 180;
        var rapH = 200;
        //play
        var playTxt = this._playTxt = new egret.TextField();
        playTxt.text = "播放";
        playTxt.size = 60;
        playTxt.x = 80;
        playTxt.y = 200 + rapH;
        playTxt.touchEnabled = true;
        playTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.play();
            this.setAllAbled(true);
        }, this);
        this.addChild(playTxt);
        //stop
        var stopTxt = this._stopTxt = new egret.TextField();
        stopTxt.text = "停止";
        stopTxt.size = 60;
        stopTxt.x = playTxt.x + rap * 1;
        stopTxt.y = 200 + rapH;
        stopTxt.touchEnabled = true;
        stopTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (this._channel) {
                this._pauseTime = 0;
                this.stop();
                this.onTimeUpdate();
            }
            this.setAllAbled(false);
        }, this);
        this.addChild(stopTxt);
        //pause 
        var pauseTxt = this._pauseTxt = new egret.TextField();
        pauseTxt.text = "暂停";
        pauseTxt.size = 60;
        pauseTxt.x = playTxt.x + rap * 2;
        pauseTxt.y = 200 + rapH;
        pauseTxt.touchEnabled = true;
        pauseTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (this._channel) {
                this._pauseTime = this._channel.position;
                this.stop();
            }
            this.setAllAbled(false);
        }, this);
        this.addChild(pauseTxt);
        this.setAllAbled(false);
        var bg = new egret.Shape();
        this.addChild(bg);
        bg.x = this.stage.stageWidth / 2 - 200;
        bg.y = 100 - 5 + rapH;
        bg.graphics.beginFill(0x999999);
        bg.graphics.drawRoundRect(0, 0, 400, 10, 5, 5);
        bg.graphics.endFill();
        this._progress = new egret.Shape();
        this.addChild(this._progress);
        this._progress.x = this.stage.stageWidth / 2 - 200;
        this._progress.y = 100 - 5 + rapH;
        this._progress.graphics.beginFill(0xffff00);
        this._progress.graphics.drawRoundRect(0, 0, 400, 10, 5, 5);
        this._progress.graphics.endFill();
        this._bar = new egret.Shape();
        this.addChild(this._bar);
        this._bar.x = this.stage.stageWidth / 2 - 200;
        this._bar.y = 100 + rapH;
        this._bar.graphics.beginFill(0xffff00);
        this._bar.graphics.drawCircle(0, 0, 20);
        this._bar.graphics.endFill();
        this._updateTxt = new egret.TextField();
        this._updateTxt.text = 0 + "/" + this._sound.length.toFixed(1);
        this._updateTxt.width = 200;
        this._updateTxt.size = 30;
        this._updateTxt.x = this.stage.stageWidth / 2 - 100;
        this._updateTxt.y = 50 + rapH;
        this._updateTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this._updateTxt);
    };
    p.setAllAbled = function (isPlaying) {
        this.setTextAbled(this._playTxt, !isPlaying);
        this.setTextAbled(this._stopTxt, isPlaying);
        this.setTextAbled(this._pauseTxt, isPlaying);
    };
    p.setTextAbled = function (text, touchEnabled) {
        text.touchEnabled = touchEnabled;
        if (touchEnabled) {
            text.textColor = 0xffffff;
        }
        else {
            text.textColor = 0x999999;
        }
    };
    return Music;
}(egret.DisplayObjectContainer));
egret.registerClass(Music,'Music');
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.page = 1; //全局，表示页数
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.sbhd = function (sky, stageW, stageH) {
        var touchStatus = false; //当前触摸状态，按下时，值为true
        var distance = new egret.Point();
        sky.touchEnabled = true;
        sky.addEventListener(egret.TouchEvent.TOUCH_BEGIN, downTouch, this);
        sky.addEventListener(egret.TouchEvent.TOUCH_END, onTouch, this);
        function onTouch(evt) {
            touchStatus = false;
            if (sky.x > 0) {
                egret.Tween.get(sky).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
            }
            if (sky.x < -stageW) {
                this.page = 2;
                egret.Tween.get(sky).to({ x: -stageW, y: 0 }, 100, egret.Ease.sineIn);
            }
            if (sky.x > -stageW / 3 && this.page == 1) {
                egret.Tween.get(sky).to({ x: 0, y: 0 }, 300, egret.Ease.sineIn);
                this.page = 1;
            }
            if (sky.x < -stageW / 3 && this.page == 1) {
                egret.Tween.get(sky).to({ x: -stageW, y: 0 }, 300, egret.Ease.sineIn);
                this.page = 2;
            }
            else if ((sky.x >= ((-stageW / 3) * 2)) && this.page == 2) {
                egret.Tween.get(sky).to({ x: 0, y: 0 }, 300, egret.Ease.sineIn);
                this.page = 1;
            }
            if (sky.x < -426 && this.page == 2 && sky.x >= -stageW) {
                egret.Tween.get(sky).to({ x: -stageW, y: 0 }, 300, egret.Ease.sineIn);
                this.page = 2;
            }
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
        function onMove(evt) {
            if (touchStatus && sky.x <= 0 && sky.x >= -stageW) {
                sky.x = evt.stageX - distance.x;
            }
        }
        function downTouch(evt) {
            touchStatus = true;
            distance.x = evt.stageX - sky.x;
            distance.y = evt.stageY - sky.y;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
    };
    p.zbhd = function (p) {
        p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, p.mouseDown, p);
        p.addEventListener(egret.TouchEvent.TOUCH_END, p.mouseUp, p);
    };
    p.createGameScene = function () {
        var sky = this.createBitmapByName("bg233_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.sbhd(sky, stageW, stageH);
        var p1 = new Poke();
        var mz = this.createBitmapByName("59280457_p0_master1200_jpg");
        p1.addChild(mz);
        this.addChild(p1);
        p1.touchEnabled = true;
        this.zbhd(p1);
        p1.x = 4 / 5 * stageW;
        p1.y = 0;
        var p2 = new Poke();
        var mz2 = this.createBitmapByName("59102653_p0_master1200_jpg");
        p2.addChild(mz2);
        this.addChild(p2);
        p2.touchEnabled = true;
        this.zbhd(p2);
        p2.x = 4 / 5 * stageW;
        p2.y = 0;
        var p3 = new Poke();
        var mz3 = this.createBitmapByName("59214113_p0_master1200_jpg");
        p3.addChild(mz3);
        this.addChild(p3);
        p3.touchEnabled = true;
        this.zbhd(p3);
        p3.x = 4 / 5 * stageW;
        p3.y = 0;
        var mus = new Music;
        this.addChild(mus);
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 175);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var touxiang = this.createBitmapByName("头像_jpg");
        this.addChild(touxiang);
        touxiang.x = 26;
        touxiang.y = 50;
        touxiang.scaleX = 0.3;
        touxiang.scaleY = 0.3;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description", this.startAnimation, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    p.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map