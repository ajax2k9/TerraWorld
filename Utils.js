function XN360(angle){
    if(angle < 0) return 360+angle;
    if(angle >= 360) return angle - 360;
    return angle;
}

function degs(radians){
    return radians * 180/PI;
}

function rads(degs){
    return degs * PI/180;
}

function cosd(angle){
    return Math.cos(angle *PI/180);
}


function sind(angle){
    return Math.sin(angle *PI/180);
}

function LogRatio(val,power){
    return Math.min(1,Math.max(Math.log10(val),0)/power);
}

function Cartesian(radius,angle){
    let _x = radius * cosd(angle);
    let _y = radius * sind(angle);
    return {x:_x,y:_y};
}

function mod(val,d){
    return ((val % d ) + d ) % d
}

class Timer{
    constructor(_maxTime){
        this.time = 0;
        this.maxTime = _maxTime;
    }

    Update(_repeat = false,_deltaTime = 0.01){
        if(this.time < this.maxTime){
            this.time += _deltaTime;
            return false;
        } else {
            if(_repeat == true){
                this.Reset();
            }
            return true;
        }
    }
    SetMaxTime(_time){
        this.maxTime = _time;
    }

    Reset(){
        this.time = 0;
    }

    Scale(_mult){
        return this.time/this.maxTime * _mult;
    }

    InvScale(_mult){
        return (1-this.time/this.maxTime) * _mult;
    }
}

function Limit(val,_min,_max){
    return Math.min(Math.max(_min,val),_max);
}

class PID{
    constructor(_kp,_kd,_ki,_dt = 0.33){
        this.kp = _kp;
        this.kd = _kd;
        this.ki = _ki;
        this.errorInt = 0;
        this.errorlast = 0;
        this.dt = _dt;
    }

    Response(_error){
        this.errorInt += _error * this.dt;
        
        let P = _error * this.kp;
        let I =  this.errorInt * this.ki;
        let D = (_error - this.errorlast)/this.dt * this.kd;


        this.errorlast = _error;

        return P + I + D;
    }
}



function AddItem(name){
    if(inventory[name] == undefined){
        inventory[name] = 0;
    }
}


