#pragma strict
public var speed : int = 3;
public var size : float = 1;

private var player : Player;
private var firstUpdate : boolean = true;

function Start () {
  player = GameObject.Find('Player').GetComponent(Player);
}

function Update () {
  if(firstUpdate) {
    transform.position = Vector3(Random.Range(-49, 49), Random.Range(-49, 49), 0);
    firstUpdate = false;
  }
  
  transform.localScale = Vector3(size, size, 1);

  if(player.size < size) {
    seek(player);
  } else {
    avoid(player);
  }
}

function avoid(component : Component) {
  if(transform.position.x < component.transform.position.x) {
    transform.position.x -= speed * Time.deltaTime;
  } else {
    transform.position.x += speed * Time.deltaTime;
  }
  
  if(transform.position.y < component.transform.position.y) {
    transform.position.y -= speed * Time.deltaTime;
  } else {
    transform.position.y += speed * Time.deltaTime;
  }

}

function seek(component : Component) {
  if(transform.position.x > component.transform.position.x) {
    transform.position.x -= speed * Time.deltaTime;
  } else {
    transform.position.x += speed * Time.deltaTime;
  }
  
  if(transform.position.y > component.transform.position.y) {
    transform.position.y -= speed * Time.deltaTime;
  } else {
    transform.position.y += speed * Time.deltaTime;
  }
}