export function generateId(){
    return new Date().getTime()
}

export function stringToNumber(text: string){
    var t = text.replace(/\D/g, "")
    if(t == ""){
        t = "0"
    }
    return parseInt(t);
}