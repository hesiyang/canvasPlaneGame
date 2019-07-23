const canvasfun = () => {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d')
    

}

// var count = 0
// function fun(arr){
//     count++;
//     let l = arr.length;
//     let r = parseInt(l / 2);
//     if(l==1){
//         return arr[0]
//     }else if(l==2){
//       let target =  arr[0] > arr[1] ? arr[0] : arr[1]
//       return target
//     }else {
//         let arr1 = arr.splice(0,r)
//         let arr2 = arr;
//         let temp1 = fun(arr1)
//         let temp2 = fun(arr2)
//         if(temp1>temp2){
//             return temp1
//         }else{
//             return temp2
//         }
//     }
// }

const fun2 = (w,h)=>{
    if(w==h){
        return w
    }else{
        var temp = w % h;
        if(temp==0){
            return h;
        }
        if(temp>h){
            return fun2(temp,h)
        }else{
            return fun2(h,temp)
        }
    }
}

const quicksort = arr => {
    if(arr.length<2){
        return arr
    }else{
        if(arr[0]>arr[1]){
            return [arr[0],arr[1]].concat(quicksort(arr.splice(2,arr.length-2)))
        }else{
            return [arr[1],arr[0]].concat(quicksort(arr.splice(2,arr.length-2)))
        }
    }
}


export default {
    fun2,
    quicksort
}