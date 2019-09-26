
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function APICALL(cb){
   fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => {cb();console.log(json)}) 
//     var ran = randomIntFromInterval(1000,2000)
//     setTimeout(function(){

//         console.log(ran)
//         cb()
//     },ran)
}

var queue = function Queue(){
    
    var arr = [];

    return{
        push:(cb)=>{
            arr.push(cb);
        },
        pop: ()=>{
            return arr.shift()
        },
        length:()=>{
            return arr.length;
        }
    }
}();


var count = 0;
function exicuteFunction(calledFromCB){
    count++;
    let APICALL;
    if(calledFromCB){
        if(queue.length()>0){
            APICALL = queue.pop();
            APICALL.call(null,function(){
                exicuteFunction("calledFromCB")
            })
        }
        
    }
    if(count<=3){
        APICALL = queue.pop();
        APICALL.call(null,function(){
            exicuteFunction("calledFromCB")
        })
    }
    
}

 function callAPI(){
    queue.push(APICALL);
    exicuteFunction();
 }

 for(var i = 0; i<10;i++){
     callAPI();
 }
