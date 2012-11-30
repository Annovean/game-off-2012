#pragma strict

public var speed : int = 10;
public var size : float = 2;

public var energy : float = 0;
public var energyRegenRate : float = 0.7;
public var energyMax : int = 100;

function Start()  {
    
}

function OnCollisionStay(collisionInfo : Collision) {
    for (var contact : ContactPoint in collisionInfo.contacts) {
    	var object : GameObject = contact.otherCollider.gameObject;
    	if(object.gameObject.name == "Enemy") {
    	  var enemy : Enemy = object.GetComponent("Enemy");
    	  if(enemy.size < size) {
    	    enemy.size -= speed * Time.deltaTime;
    	  }
    	  if(enemy.size <= 0) {
    	    Destroy(object);
    	  }
    	}
    }
}

function Update() {
    transform.localScale = Vector3(size, size, 1);
	var newEnergy : float = energy + (energyRegenRate * Time.deltaTime);
	if(newEnergy > energyMax) {
		energy = energyMax;
	} else {
		energy = newEnergy;
	}
	
	rigidbody.constraints = RigidbodyConstraints.FreezeRotation | RigidbodyConstraints.FreezePositionZ;
	if (Input.GetKey("d") || Input.GetKey("right")) {
	  transform.position.x += speed * Time.deltaTime;
	}
	
	if (Input.GetKey("a") || Input.GetKey("left")) {
	  transform.position.x -= speed * Time.deltaTime;
	}
	
	if (Input.GetKey("w") || Input.GetKey("up")) {
	  transform.position.y += speed * Time.deltaTime;
	}
	
	if (Input.GetKey("s") || Input.GetKey("down")) {
	  transform.position.y -= speed * Time.deltaTime;
	}
}

function OnGUI()  {
    // GUI.Box( Rect( (Screen.width / 2) - 140, 5, 280, 25 ), "Mouse Position = " + Input.mousePosition );
    // GUI.Box( Rect( (Screen.width / 2) - 70, Screen.height - 30, 140, 25 ), "Mouse X = " + Input.mousePosition.x );
    // GUI.Box( Rect( 5, (Screen.height / 2) - 12, 140, 25 ), "Mouse Y = " + Input.mousePosition.y );
}