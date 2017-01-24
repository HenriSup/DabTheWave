class GameManagerBehavior extends Sup.Behavior {
  private waves:WaveBehavior[]
  private highWaves:HighWaveBehavior[]
  private pirates:PirateBehavior[]
  public incomingMoves:string[]
  
  awake() {
    this.incomingMoves = new Array<string>()
    this.waves = new Array<WaveBehavior>()
    this.highWaves = new Array<HighWaveBehavior>()
    this.pirates = new Array<PirateBehavior>()
  }

  update() {
    //Sup.log(this.highWaves)
    
  }
  
  public addIncomingMove(newMove:string){
    this.incomingMoves.push(newMove)
  }
  public removeFromIncomingMoves(){
    this.incomingMoves.shift()
  }
  public getMoves():string[]{
    return this.incomingMoves
  }
  
  public addWave(newWave:WaveBehavior){
    this.waves.push(newWave)
  }
  public addHighWave(newHighWave:HighWaveBehavior){
    this.highWaves.push(newHighWave)
  }
  public killHighWave(dabSide:string){
    var firstInstantiatedTime = -2
    var firstHighWave:HighWaveBehavior = null
    this.highWaves.forEach(function(highwave){
      if(dabSide=="right" && (Sup.getActor("RightWaveStopper").getPosition().x-10<highwave.actor.getPosition().x || Sup.getActor("RightWaveStopper").getPosition().x-10<highwave.actor.getPosition().x) && !highwave.getShouldDie() && highwave.canBeKilled() ) {
        if (firstInstantiatedTime==-2 || highwave.getTimeInstantiated() < firstInstantiatedTime){
          firstInstantiatedTime=highwave.getTimeInstantiated()
          firstHighWave=highwave
          Sup.log("condition right remplies wave number")
        }
      }
      else if (dabSide=="left" && (Sup.getActor("LeftWaveStopper").getPosition().x-10>highwave.actor.getPosition().x || Sup.getActor("LeftWaveStopper").getPosition().x-10<highwave.actor.getPosition().x)&& !highwave.getShouldDie() && highwave.canBeKilled()){
        if (firstInstantiatedTime==-2 || highwave.getTimeInstantiated() < firstInstantiatedTime){
          firstInstantiatedTime=highwave.getTimeInstantiated()
          firstHighWave=highwave
          Sup.log("condition left remplies")
        }
      }
    });
    if (firstHighWave!=null){
      Sup.log("Tuer une wave")
      firstHighWave.gotKilled()
    }
  }
  
  public deleteWave(waveToDelete:WaveBehavior){
    this.waves.shift()
  }
  
  public getWaves():WaveBehavior[]{
    return this.waves
  }
  
  public addPirate(newPirate:PirateBehavior){
    this.pirates.push(newPirate)
  }
  
  public deletePirate(pirateToDelete:PirateBehavior){
    this.pirates.shift()
  }
  
  public getPirates():PirateBehavior[]{
    return this.pirates
  }
  
  public tellPiratesToDab(move:string):void{
    this.pirates.forEach(function(pirate){pirate.actor.getBehavior(PirateBehavior).callDab(move)});
  }
  
}
Sup.registerBehavior(GameManagerBehavior);
