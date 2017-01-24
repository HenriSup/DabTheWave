class CameraBehavior extends Sup.Behavior {
  
  private hasBeenCalledForZoom:boolean=false
  
  private zoomingInTime:number=10
  private zoomingOutTime:number=20
  
  private hasBeenZoomingInFor:number=0
  private hasBeenZoomingOutFor:number=0
  
  private maxZoom=1000
  private minZoom=1080
  
  awake() {
   
    
  }

  update() {
   if (this.hasBeenCalledForZoom){
      this.hasBeenZoomingInFor=0
      this.hasBeenCalledForZoom=false
    }
    if (this.hasBeenZoomingInFor<this.zoomingInTime){
      this.zoomIn()
      this.hasBeenZoomingInFor++
    } else {
      if(this.actor.camera.getOrthographicScale()<this.minZoom){
        this.zoomOut()
      }
    }
  }
  
  zoomIn(){
    this.actor.camera.setOrthographicScale(this.actor.camera.getOrthographicScale()-8)
  }
  zoomOut(){
    this.actor.camera.setOrthographicScale(this.actor.camera.getOrthographicScale()+8)
  }
  
  public callZoom(){
    this.hasBeenCalledForZoom=true
  }
  
  
}
Sup.registerBehavior(CameraBehavior);
