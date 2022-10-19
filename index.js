//basic
let num_objec = {
    current_value:null,
    next_value:null,
    act:null,
    is_points:false
}

// input value
let display_num = document.querySelector('#answer');

// 歸0歸0 AC type
function reset()
{
    num_objec = {
        current_value:null,
        next_value:null,
        act:null,
        is_points:false
    }

    display_num.value = 0;
}

// 正負切換 change +-
function reverse()
{
    if(num_objec.current_value != null && num_objec.act == null)
    {
        num_objec.current_value *= -1;
        display_num.value = num_objec.current_value;
    }
    else{
        num_objec.next_value *= -1;
        display_num.value = num_objec.next_value;
    }
}

// 百分比 percent n*0.1
function percent()
{
    if(num_objec.current_value != null && num_objec.act == null)
    {
        num_objec.current_value *= 0.01;
        display_num.value = num_objec.current_value;
    }
    else{
        num_objec.next_value *= 0.01;
        display_num.value = num_objec.next_value;
    }
}

//加法 plus
function plus()
{
    let max = Math.max(point_len(num_objec.current_value),point_len(num_objec.next_value));
    let new_total = Math.floor(Number(num_objec.current_value) * Math.pow(10, max)) + Math.floor(Number(num_objec.next_value) * Math.pow(10, max))
    
    num_objec.current_value = new_total / Math.pow(10, max);
}

//減法 minus
function minus()
{
    let max = Math.max(point_len(num_objec.current_value),point_len(num_objec.next_value));
    let new_total = Math.floor(Number(num_objec.current_value) * Math.pow(10 , max)) - Math.floor(Number(num_objec.next_value) * Math.pow(10, max))

    num_objec.current_value = new_total / Math.pow(10 , max);
}

//乘法 multiply
function multiply()
{
    let max = Number(point_len(num_objec.current_value)) + Number(point_len(num_objec.next_value));
    let current_max = point_len(num_objec.current_value);
    let next_max = point_len(num_objec.next_value);
    let new_total = Math.floor(Number(num_objec.current_value) * Math.pow(10 , Number(current_max))) * Math.floor(Number(num_objec.next_value) * Math.pow(10, next_max))

    num_objec.current_value = new_total / Math.pow(10 , max);
}

//除法 multiply
function devided()
{
    let max = Math.max(Number(point_len(num_objec.current_value)), Number(point_len(num_objec.next_value)));
    let new_total = Math.floor(Number(num_objec.current_value) * Math.pow(10 , Number(max))) / Math.floor(Number(num_objec.next_value) * Math.pow(10, max))

    num_objec.current_value = new_total;
}

//切換小數點 add point
function isPoint()
{
    num_objec.is_points = true;
}

//數學符號 add math symbols
function symbolAct(str)
{
    if(num_objec.next_value != null && num_objec.act != null) cal('symbolAct');
    
    num_objec.act = str;
    num_objec.is_points = false;
}

//計算 calculate the answer
function cal(str = '')
{
    let math_act = num_objec.act;

    switch(math_act){
        case 'plus':
            plus();
            break;
        case 'minus':
            minus();
            break;
        case 'multiply':
            multiply();
            break;
        case 'devided':
            devided();
            break;
    }

    num_objec.next_value = null;
    num_objec.is_points = false;
    num_objec.act = str == 'symbolAct' ? num_objec.act : null ;
    display_num.value = num_objec.current_value;
}

//數字輸入 input number
function num(val)
{
    let new_val = null

    if(num_objec.act == null)
    {
        new_val = map_num(num_objec.current_value, val, num_objec.act); 
        update_num('current', new_val)
        display_num.value = new_val;
    }
    else{
        new_val = map_num(num_objec.next_value ,val, num_objec.act);
        update_num('next', new_val)
        display_num.value = new_val;
    }
}

// 數字輸入合併 handle the number
function map_num(current, val, act)
{
    //當前數字 無 小數點數字處理
    if(!num_objec.is_points)
    {
        if(current == null) return val;
    
        return current.toString() + val.toString();
    }

    //當前數字 已有 小數點數字處理
    if(current == null) current = 0;

    if(num_objec.is_points && current.toString().split('.')[1] == undefined) return current.toString() + '.' + val.toString();
    
    return current.toString().split('.')[0] + '.' + current.toString().split('.')[1] + val.toString();
}

//更新數字 update the number
function update_num(target, val)
{
    if(target == 'current')
    {
        num_objec.current_value = val;
    }
    else if(target == 'next')
    {
        num_objec.next_value = val;
    }
}

// 獲取小數點長度 get the points length
function point_len(num)
{
    return String(num.toString().split('.')[1] != undefined ? num.toString().split('.')[1].length : [].length);
}
