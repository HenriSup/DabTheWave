class ParrotBehavior extends Sup.Behavior {
  
  private shouldCallDab:boolean;
  private rightShouldPlayOn=0;
  private leftShouldPlayOn=0;
  private rightSound = [new Sup.Audio.SoundPlayer("Sounds/ParrotRight", 0.2, { loop: false }),new Sup.Audio.SoundPlayer("Sounds/ParrotRight", 0.2, { loop: false }),new Sup.Audio.SoundPlayer("Sounds/ParrotRight", 0.2, { loop: false })];
  private leftSound = [new Sup.Audio.SoundPlayer("Sounds/ParrotLeft", 0.2, { loop: false }),new Sup.Audio.SoundPlayer("Sounds/ParrotLeft", 0.2, { loop: false }),new Sup.Audio.SoundPlayer("Sounds/ParrotLeft", 0.2, { loop: false })];
  awake() {
    
  }

  update() {
    this.animate()
  }
  
  animate(){
    if(this.shouldCallDab){
      this.actor.spriteRenderer.setAnimation("DabCall",false)
      this.playSound()
      this.shouldCallDab=false
    }
    if (this.actor.spriteRenderer.getAnimation()=="DabCall" && this.actor.spriteRenderer.getAnimationFrameIndex() >= this.actor.spriteRenderer.getAnimationFrameCount()-1){
      if(this.actor.spriteRenderer.getAnimation()!="Idle"){this.actor.spriteRenderer.setAnimation("Idle",true)}
    }
  }
  
  public callDab(){
    this.shouldCallDab = true
  }
  
  public playSound(){
    var randomNumber = Math.random() >= 0.5
    
    if (randomNumber) {
      this.leftSound[this.leftShouldPlayOn].setVolume(0.3);
      this.leftSound[this.leftShouldPlayOn].setPitch(0);
      this.leftSound[this.leftShouldPlayOn].play();
      this.leftShouldPlayOn++;
      if (this.leftShouldPlayOn>=this.leftSound.length){
        this.leftShouldPlayOn=0;
      }
      Sup.getActor("GameManager").getBehavior(GameManagerBehavior).addIncomingMove("left")
      var newText = Sup.appendScene("Prefabs/ParrotTextPrefab")[0];
      newText.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,this.actor.getPosition().z)
      newText.getBehavior(ParrotTextBehavior).setMove("left")
      this.actor.spriteRenderer.setHorizontalFlip(true)
    }
    else {
      this.rightSound[this.rightShouldPlayOn].setVolume(0.3);
      this.rightSound[this.rightShouldPlayOn].setPitch(0);
      this.rightSound[this.rightShouldPlayOn].play();
      this.rightShouldPlayOn++;
      if (this.rightShouldPlayOn>=this.rightSound.length){
        this.rightShouldPlayOn=0;
      }
      Sup.getActor("GameManager").getBehavior(GameManagerBehavior).addIncomingMove("right")
      var newText = Sup.appendScene("Prefabs/ParrotTextPrefab")[0];
      newText.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,this.actor.getPosition().z)
      newText.getBehavior(ParrotTextBehavior).setMove("right")
      this.actor.spriteRenderer.setHorizontalFlip(false)
    }
   
  }
}
Sup.registerBehavior(ParrotBehavior);
