export interface trip {

    id:number,
    name:string,
    country:string,
    startDate:string,
    endDate:string,
    price:number,
    star:number,
    availableSpots:number,
    shortDescription:string,
    imageLink:string

}
export interface dataTrip{
    id:number,
    availableSpots:number

}
export interface starImg{
    star1:string,
    star2:string,
    star3:string,
    star4:string,
    star5:string


}

export interface filter{
    country:string[],
    date:string[],
    price:string[],
    rate:string[]

}

export interface slideInterface{
    url:string,
    title:string


}