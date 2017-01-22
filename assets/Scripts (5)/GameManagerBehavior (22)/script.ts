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
    //Sup.log(this.incomingMoves)
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
  public killHighWave(beatNumber:number){
        
//         var highWave = this.highWaves[beatNumber]
        
//         highWave.beatNumber==beatNumber
//         highWave.gotKilled()
//         this.highWaves.splice(0)
      
    
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
