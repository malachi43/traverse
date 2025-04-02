
function traverse(obj){
    console.log()
    
    const indentCountResetValue = 4;

    //the initial identLevelCount;
    let indentLevelCount = 4;

    function createIndentation(value){
        let indentation = ""
        for(let i = 0; i < value; i++){
             if(i === (value -1) ) indentation += "|_"
             else indentation += " "
        }
        return indentation;
    }
  
    function typeOfProp(obj, prop = ""){
        let type;
        /*
        This checks if "obj" is defined and "prop" is an empty string. 
        This means "obj" is a literal type (either string or number);
        */
        if(obj && !prop) {
            type = `(type: ${typeof obj})`;
            return type;
        }

        if(Array.isArray(obj[prop])) type = "(type: array)";  
        else if(Object.is(obj[prop], null)) type = "(type: null)"
        else if(typeof obj[prop] === "object") type = "(type: object)";
        else if(typeof obj[prop] === "string") type = "(type: string)";
        else if (typeof obj[prop] === "number") type = "(type: number)";
        else if(typeof obj[prop] === "boolean") type = "(type: boolean)";
        else type = "(type: undefined)"
        return type;
    }
    
    function traverseHelper(entity, options = {}){

        let {parentIndentLevel = 0} = options 

        let indentation = createIndentation(parentIndentLevel)
        /*
        I test for an "array" first and not an "object" because "typeof array => object" 
        which will lead to errors if I call array specific methods. 
        So, I streamline the check, the static call to Array.isArray(value) will be "true" 
        if the "value" passed is an array and "false" if it's not an array.
        */
      if(Array.isArray(entity)){
        for(let elem of entity){
            console.log(indentation, "array_item => ", elem);
            console.log();
            traverseHelper(elem, {parentIndentLevel: indentLevelCount++})
            //reset the level count;
            indentLevelCount = indentCountResetValue;
        }
      }else if(typeof entity === "object"){
        for(let prop in entity){
           let propertyType = typeOfProp(entity, prop);
            console.log(indentation, "object_property => ", prop, propertyType);
            console.log();
            traverseHelper(entity[prop], {parentIndentLevel: indentLevelCount++});
            //reset the level count;
            indentLevelCount = indentCountResetValue;
        }
      }else if(typeof entity === "string"){
        console.log(indentation,"value => ", entity, typeOfProp(entity));
        console.log();
      }else if(typeof entity === "number"){
        console.log(indentation,"value => ", entity, typeOfProp(entity));
        console.log()
      }
    }
    traverseHelper(obj)
  }


  
const obj = {
  department: [{sales: [{name: "john"},{name: null}]}],
  prop: undefined
}
  

traverse(obj);
