#pragma strict

public var Boundary : int = 50;
public var speed : int = 10;

private var theScreenWidth : int;
private var theScreenHeight : int;

function Start() 
{
    theScreenWidth = Screen.width;
    theScreenHeight = Screen.height;
    
}

function OnCollisionEnter( collision : Collision )
{
    var object : GameObject = collision.gameObject;
    if(object.name == "Enemy") {
      Debug.Log("Enemy Collided");
    }
}

function Update() 
{
    rigidbody.constraints = RigidbodyConstraints.FreezeRotation | RigidbodyConstraints.FreezePositionZ;
    if (Input.GetKey("d") || Input.GetKey("right"))
    {
       transform.position.x += speed * Time.deltaTime;
    }

    if (Input.GetKey("a") || Input.GetKey("left"))
    {
       transform.position.x -= speed * Time.deltaTime;
    }

    if (Input.GetKey("w") || Input.GetKey("up"))
    {
       transform.position.y += speed * Time.deltaTime;
    }

    if (Input.GetKey("s") || Input.GetKey("down"))
    {
       transform.position.y -= speed * Time.deltaTime;
    }

}   

function OnGUI() 
{
    // GUI.Box( Rect( (Screen.width / 2) - 140, 5, 280, 25 ), "Mouse Position = " + Input.mousePosition );
    // GUI.Box( Rect( (Screen.width / 2) - 70, Screen.height - 30, 140, 25 ), "Mouse X = " + Input.mousePosition.x );
    // GUI.Box( Rect( 5, (Screen.height / 2) - 12, 140, 25 ), "Mouse Y = " + Input.mousePosition.y );
}