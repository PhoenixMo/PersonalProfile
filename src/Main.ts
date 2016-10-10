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


  class Poke extends egret.DisplayObjectContainer {

    private _touchStatus:boolean = false;              
    private _distance:egret.Point = new egret.Point(); 
    private stageW=640;


    public mouseDown(evt:egret.TouchEvent) {
             this._touchStatus = true;
             this._distance.y = evt.stageY - this.y;
             this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseMove(evt:egret.TouchEvent) {
            if( this._touchStatus ) {
                 this.y = evt.stageY - this._distance.y;            
            }            
            
    }

    public mouseUp(evt:egret.TouchEvent) {
            this._touchStatus = false;
             if( this.y < -1136/3 ){
                     egret.Tween.get( this ).to( {x:4/5*this.stageW,y:-1136}, 400, egret.Ease.sineIn )
                     .call( ()=>{ this.parent.addChildAt(this,1);} ).to({x:4/5*this.stageW,y:0}, 100, egret.Ease.sineIn);
                     this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                 }
                 else if(this.y<0){ egret.Tween.get( this ).to( {x:4/5*this.stageW,y:0}, 200, egret.Ease.sineIn )
                 .to( {x:4/5*this.stageW,y:25}, 100, egret.Ease.sineIn ).to( {x:4/5*this.stageW,y:0}, 100, egret.Ease.sineIn );
                
            }
                 if( this.y >1136/3 ){
                     egret.Tween.get( this ).to( {x:4/5*this.stageW,y:1136}, 400, egret.Ease.sineIn )
                     .call( ()=>{ this.parent.addChildAt(this,1);} ).to({x:4/5*this.stageW,y:0}, 100, egret.Ease.sineIn);           
                     this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                 }else if(this.y>0){ egret.Tween.get( this ).to( {x:4/5*this.stageW,y:0}, 200, egret.Ease.sineIn )
                 .to( {x:4/5*this.stageW,y:-25}, 100, egret.Ease.sineIn ).to( {x:4/5*this.stageW,y:0}, 100, egret.Ease.sineIn );}
 
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

      
    
  }
     
  class Music extends egret.DisplayObjectContainer {
    private _touchStatus:boolean = false;   
    private _pauseTime: number = 0;           
    private stageW=640;
    private xuanzhuan:number=0;
    private _sound: egret.Sound;
    public _nScaleBase=0;
    public isplay=0;
    private _channel: egret.SoundChannel;
    constructor() {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }


    private onAddToStage(event: egret.Event) {
        this.loadSound();
    }


    //加载
    private loadSound(): void {
        var sound: egret.Sound = this._sound = new egret.Sound();;
        //sound 加载完成监听
        sound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
            this.init();
        }, this);

        sound.load("resource/assets/Instrumental.mp3");
     
    }
    //播放
    private play():void {
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(this._pauseTime, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
        
        this.addEventListener(egret.Event.ENTER_FRAME, this.onTimeUpdate, this);
        this.isplay=1;

      
    }
    //停止
    private stop():void {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onTimeUpdate, this);
            
            this._channel.stop();
            this._channel = null;
            console.log(this.name);
              this.isplay=0;
           
        }
    }
    //播放完成
    private onComplete(e:egret.Event):void {
        this.stop();
    }
    //更新进度
    private onTimeUpdate(e:egret.Event):void {
        var position:number = this._channel ? this._channel.position : 0;   
    }
    /** 以下为 UI 代码 **/
    private init(): void {
        var isplay:boolean=false;
        //play   
        this.touchEnabled = true;                                         //恩
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if(isplay==false){  this.play(); isplay=true;}
           else if(isplay==true){  this.stop();  isplay=false; }
        }, this);
    }
  }

  class 
  


class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;
    private static STEP_ROT:number = 3;
    private static STEP_SCALE:number = .03;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */

    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;
    private page:number=1;//全局，表示页数
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private sbhd(sky:egret.Bitmap,stageW:number,stageH:number):void{
    
     var touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
     var distance:egret.Point = new egret.Point();
     sky.touchEnabled=true;  
     sky.addEventListener( egret.TouchEvent.TOUCH_BEGIN, downTouch, this )
     sky.addEventListener( egret.TouchEvent.TOUCH_END, onTouch, this );


 
     function onTouch(evt:egret.TouchEvent):void { 
        
      touchStatus = false;
      if(sky.x>0) {  
        egret.Tween.get( sky).to( {x:0,y:0}, 100, egret.Ease.sineIn );
        }  
      if(sky.x<-stageW ) {  
            this.page=2;
            egret.Tween.get( sky).to( {x:-stageW,y:0}, 100, egret.Ease.sineIn );
        }
   
      if(sky.x>-stageW/3&& this.page==1) {
             egret.Tween.get( sky).to( {x:0,y:0}, 300, egret.Ease.sineIn );
              this.page=1;       
        }
      
      if(sky.x<-stageW/3&& this.page==1) {
             egret.Tween.get( sky).to( {x:-stageW,y:0}, 300, egret.Ease.sineIn );
             this. page=2;
        } 
      
      else if((sky.x >=((-stageW/3)*2))&& this.page==2) {
             egret.Tween.get( sky).to( {x:0,y:0}, 300, egret.Ease.sineIn );
              this.page=1;      
        } 
      if(sky.x <-426 && this.page==2&&sky.x>=-stageW) {
             egret.Tween.get( sky).to( {x:-stageW,y:0}, 300, egret.Ease.sineIn );
             this. page=2;      
        }

        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
     }

     function onMove(evt:egret.TouchEvent ):void { 
          if( touchStatus&&sky.x<=0&&sky.x>=-stageW ) {
            sky.x = evt.stageX -distance.x;
        }
     
     }

     function downTouch( evt:egret.TouchEvent):void { 
  
       touchStatus = true;
       distance.x = evt.stageX - sky.x;
       distance.y = evt.stageY - sky.y;
       this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
     }

 }

  private zbhd(p:Poke):void{
     
     p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, p.mouseDown, p);
     p.addEventListener(egret.TouchEvent.TOUCH_END, p.mouseUp, p); 
}


    private createGameScene():void {                                           //is  hereeeeeeeeeee
        var sky:egret.Bitmap= this.createBitmapByName("bg233_jpg");
        this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        this.sbhd(sky,stageW,stageH);
        var p1:Poke = new Poke();
        
        var mz:egret.Bitmap= this.createBitmapByName("59280457_p0_master1200_jpg");
        p1.addChild(mz);
        this.addChild(p1);
        p1.touchEnabled=true;
        this.zbhd(p1);
        p1.x=4/5*stageW;
        p1.y=0;
        var p2:Poke = new Poke();
        var mz2:egret.Bitmap= this.createBitmapByName("59102653_p0_master1200_jpg");
        p2.addChild(mz2);
        this.addChild(p2);
        p2.touchEnabled=true;
        this.zbhd(p2);
        p2.x=4/5*stageW;
        p2.y=0;
        var p3:Poke = new Poke();
        var mz3:egret.Bitmap= this.createBitmapByName("59214113_p0_master1200_jpg");
        p3.addChild(mz3);
        this.addChild(p3);
        p3.touchEnabled=true;
        this.zbhd(p3);
        p3.x=4/5*stageW;
        p3.y=0;
      
        var mustp:egret.Bitmap= this.createBitmapByName("yinyue_png");
        p3.addChild(mz3);
        var mus:Music =new Music;
        this.addChild(mus);
        mus.addChild(mustp);
        mus.anchorOffsetX= mustp.width/2;
        mus.anchorOffsetY = mustp.height/2;
        mus.x=60;
        mus.y=7/8*stageH+40;
        
        mus.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{      
        mus._nScaleBase = 0;
            switch ( mus.isplay ){
                case 1:        // 仅旋转
                    mus.rotation += 1;
               //     mus.scaleX = mus.scaleY = 0.5 + 0.5* Math.abs( Math.sin( mus._nScaleBase += Main.STEP_SCALE ) );
                    break;
                case 0:
                    break;
            }

        }, this );
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 175);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        var touxiang:egret.Bitmap = this.createBitmapByName("头像_jpg");
        this.addChild(touxiang);
       touxiang.x = 26;
       touxiang.y = 50;
       touxiang.scaleX=0.3;
       touxiang.scaleY=0.3;

        var line = new egret.Shape();
        line.graphics.lineStyle(2,0xffffff);
        line.graphics.moveTo(0,0);
        line.graphics.lineTo(0,117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "崔叔阳";
        colorLabel.size = 54;
        colorLabel.x = 140;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 140;
        textfield.y = 150;
        this.textfield = textfield;



        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description", this.startAnimation, this)
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


