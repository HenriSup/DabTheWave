class WaveGeneratorBehavior extends Sup.Behavior {
  private frameCounter:number
  private wavesSpeed:number
  private lastWave:number
  
  awake() {
    this.lastWave=1
    this.frameCounter = 0
    this.wavesSpeed = 540;
    this.generateNewWave()
  }

  update() {
    this.frameCounter+=1
    
   // this.generateNewWave()
  }
  
  public generateNewWave(){
    var newWave = Sup.appendScene("Prefabs/WavePrefab")[0];
    newWave.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,this.actor.getPosition().z+(this.frameCounter/10000000))
    newWave.getBehavior(WaveBehavior).setSpeed(this.wavesSpeed)
    newWave.getBehavior(WaveBehavior).waveType=this.nextWaveTypeNumber()
  }
  
  nextWaveTypeNumber():number{
    var waveNumber:number = 1;
    var possibleWaves:number[]
    
    switch (this.lastWave)
    {
      case 1:
        possibleWaves = [2,7,8]
        waveNumber = this.chooseWave(possibleWaves)
        break;
      case 2:
        possibleWaves = [1,7,8]
        waveNumber = this.chooseWave(possibleWaves)
        break;
      case 3:
        possibleWaves = [4,9,12]
        waveNumber = this.chooseWave(possibleWaves)
        break;
      case 4:
        possibleWaves = [3,9,12]
        waveNumber = this.chooseWave(possibleWaves)
        break;
      case 5:
        possibleWaves = [6,10,11]
        waveNumber = this.chooseWave(possibleWaves)
        break;
      case 6:
        possibleWaves = [5,10,11]
        waveNumber = this.chooseWave(possibleWaves)
        break;
      case 7:
        possibleWaves = [4]
        waveNumber = this.chooseWave(possibleWaves)
        break;
      case 8:
        possibleWaves = [5]
        waveNumber = this.chooseWave(possibleWaves)
        break;
      case 9:
        possibleWaves = [5]
        waveNumber = this.chooseWave(possibleWaves)
        break;
      case 10:
        possibleWaves = [4]
        waveNumber = this.chooseWave(possibleWaves)
        break;
      case 11:
        possibleWaves = [1]
        waveNumber = this.chooseWave(possibleWaves)
        break;
      case 12:
        possibleWaves = [2]
        waveNumber = this.chooseWave(possibleWaves)
        break;
    }
    
    this.lastWave = waveNumber
    return waveNumber
  }
  
  private chooseWave(waves:number[]):number {
    var random = Math.floor(Math.random() * waves.length)
    return waves[random]
  }
}
Sup.registerBehavior(WaveGeneratorBehavior);
