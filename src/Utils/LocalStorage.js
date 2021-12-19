
export function Savedata(key,data){
    localStorage.setItem(key,JSON.stringify(data))
    return 
}

export function Loaddata(key){
    return JSON.parse(localStorage.getItem(key))
}