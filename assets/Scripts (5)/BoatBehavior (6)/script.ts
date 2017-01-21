class BoatBehavior extends Sup.Behavior {
  
  private boatOriginLocation:Sup.Math.Vector2
  private debuggerTextRenderer1:Sup.TextRenderer
  private debuggerTextRenderer2:Sup.TextRenderer
  private frameCounter:number
  private hitBoxesActor:Sup.Actor[]
  public activateDebugging:boolean
  
  
  awake() {
    Sup.log(this.actor.getChild("HitBoxes"));
    this.hitBoxesActor = this.actor.getChild("HitBoxes").getChildren()
    this.frameCounter = 0;
    let boatX = this.actor.getLocalX()
    let boatY = this.actor.getLocalY()
      
    this.boatOriginLocation = new Sup.Math.Vector2(boatX,boatY)
    this.debuggerTextRenderer1=this.actor.getChild("Debugger1").textRenderer
    this.debuggerTextRenderer2=this.actor.getChild("Debugger2").textRenderer
  }

  update() {
    let boatVelocity = this.actor.cannonBody.body.velocity
    let boatPosition = this.actor.getPosition()
    
    
    
    boatVelocity.y -= (10+(Math.sin(this.frameCounter/20)*2));
    
    
  
    this.actor.cannonBody.body.velocity = new CANNON.Vec3(boatVelocity.x,boatVelocity.y,0);
    //this.actor.rotateLocalEulerZ(10);
    this.moveHitBoxes();
    this.applyFloatPhysic()
    this.frameCounter+=1
    
    
    if (this.activateDebugging){
      this.debuggerTextRenderer1.setText("vel\nx:"+boatVelocity.x.toPrecision(3)+"\ny:"+boatVelocity.y.toPrecision(3))
      this.debuggerTextRenderer2.setText("pos\nx:"+boatPosition.x.toPrecision(3)+"\ny:"+boatPosition.y.toPrecision(3))
    }  
    else {
      this.debuggerTextRenderer1.setText("")
      this.debuggerTextRenderer2.setText("")
    }
  }
  
  moveHitBoxes(){
    let boatActor = this.actor;
    this.hitBoxesActor.forEach(function(hitboxActor){hitboxActor.getBehavior(HitBoxBehavior).hitbox.warpPosition(boatActor.getPosition().x+hitboxActor.getBehavior(HitBoxBehavior).hitBoxOriginLocation.x,boatActor.getPosition().y+hitboxActor.getBehavior(HitBoxBehavior).hitBoxOriginLocation.y);});
  }
  
  applyFloatPhysic(){
    let boatVelocity = this.actor.cannonBody.body.velocity
    let redHitBoxTriggered = this.hitBoxesActor[0].getBehavior(HitBoxBehavior).triggered;
    let orangeHitBoxTriggered = this.hitBoxesActor[1].getBehavior(HitBoxBehavior).triggered;
    let blueHitBoxTriggered = this.hitBoxesActor[2].getBehavior(HitBoxBehavior).triggered;
    
    if(redHitBoxTriggered){
      boatVelocity.y += 30;
      this.actor.cannonBody.body.linearDamping=0.8;
    }
    else if (orangeHitBoxTriggered){
      boatVelocity.y += 15;
    }
    else if (blueHitBoxTriggered){
      boatVelocity.y += 10;
    }
    
    this.actor.cannonBody.body.velocity=new CANNON.Vec3(boatVelocity.x,boatVelocity.y,0);
  }
  
 
  
}
Sup.registerBehavior(BoatBehavior);
