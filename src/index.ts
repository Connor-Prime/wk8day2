import {v4 as uuidv4} from "uuid"

var ps = require("prompt-sync")
const prompt2 = ps();

// Ask the usernpm i --save-dev @types/prompt-syn four bits of input: Do you want to : Show/Add/Delete or Quit?
let mainMenuHeader:string = "Main Menu \n\n";
let add_item_menu:string = "Type \'add\' to add an item.";
let delete_item_menu:string = "Type \'delete\' to delete an item.";
let view_item_menu:string = "Type \'view\' to all items.";
let quit_menu:string ="Type \'Q\' to quit.";
// This is for bringing the user back to the main menu
let go_back_menu:string="Type \'back\' to go back to the main menu.";



let mainMenu:string = `${mainMenuHeader}\n ${add_item_menu} \n ${delete_item_menu} \n ${view_item_menu} \n\n ${go_back_menu} \n\n ${quit_menu} \n\n`;

let shop: { 
    [item: string] : {
        id:string,
        price:number,
        description:string
    }
} = {};

function addToShoppingCart(item2?:string|null):void{

    let item:string|null =""

    if(!item2){
        item = prompt2("Enter the name of the item you like to add.");

        if (typeof item == null){
            console.log("Please enter item name");
            addToShoppingCart()
        }
    }else{
        item = item2;
    }

    let _price:string|null = prompt2("Enter the item's price");

    if (typeof _price == null){
        console.log("Please enter price amount as a number.");
        addToShoppingCart(item)
    }else{
        let priceNum =parseFloat(String(_price));

        let _description:string|null = prompt2("Enter the item's description");

        if(item != null && _description!=null){
            shop[item]={id:uuidv4(),description:_description,price:priceNum}
        }   
    }
    shopMenu()
}

function deleteItem():void{
    let item:string|null = prompt2("Enter the item you you like to add");
    if(item!=null){
        if(item in shop){
            delete(shop[item])
            prompt2(`${item} has beeen removed for your cart. Press any key to continue.`)
        }
    }

    shopMenu()
}


function viewCart(checkingOut:boolean):void{

    let reciept:string = "\n\n"
    for(let product in shop){
        reciept+=product+" "

        let item:any =shop[product]
        for(let key in item){

            reciept+=String(key)+"  "+item[key]+"\n"
        }
    }
    if(!checkingOut){
        prompt2("Your items are"+reciept+"\n\n"+"Press any key to continue...")
        shopMenu()
    }
}



function shopMenu(){
    let command = prompt2(mainMenu)

    switch (command){
        case "add":{
            addToShoppingCart()
        }
        case "delete":{
            deleteItem()
        }
        case "view":{
            viewCart(false)
        }
        case "Q":{
            break;
        }
        default:{
            prompt2("I didn't quiet get that. Press any enter to continue.")
            shopMenu()
        }
    }
}

shopMenu()