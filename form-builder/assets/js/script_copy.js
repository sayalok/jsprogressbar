// Inital Variable Declare Related In Global Scope
const formBuilder = document.getElementById('formBuilder')
const addBlock    = document.getElementById('addBlock')
const formWrapper = document.getElementById('formWrapper')


// all Event Listner
document.addEventListener('submit', sendForm)
addBlock.addEventListener('submit', createBlock)

// event delegation event Listner
document.addEventListener('change', enableAmountField)
document.addEventListener('keyup', generateOptions)

// Event Listner Functions Start Here 
function createBlock(e) {
    e.preventDefault();
    let inputBlockLength = formWrapper.getElementsByClassName('inputBlock').length
    document.getElementById('btnMainSubmit').style.display = 'block'
    var newBox = document.createElement("div");
    newBox.innerHTML = `
        <div class="form-group inputBlock">
            <label>Label </label>
            <input type="text" class="form-control" name="question_${inputBlockLength}" value="">
            <input type="hidden" class="question_id" value="question_${inputBlockLength}"/>
            <div class="optDefineDiv">
                <label>Select option Type</label>
                <select name="" class="form-control optionType">
                    <option value="">Select One</option>
                    <option value="btntextField_${inputBlockLength}">Text Field</option>
                    <option value="btnchkBox_${inputBlockLength}">Checkbox</option>
                    <option value="btnRadio_${inputBlockLength}">Radio</option>
                    <option value="btnFile_${inputBlockLength}">File</option>
                </select>
                <div class="optAmuDiv">
                    <label>Amount </label>
                    <input type="text" name="optAmount" class="optAmount"/>
                </div>
            </div>
            <div class="optionFieldsWrapper">
                
            </div>
        </div>
    `
    formWrapper.appendChild(newBox);
}

function sendForm(e) {
    if(e.target && e.target.id == 'formBuilder') {
        e.preventDefault();
        
        var formBuilder = document.forms["formBuilder"].elements["formBuilderInput"]
        //getInput(formBuilder)
    }
}
var optAmtIndex;
function enableAmountField(e) {
    if(e.target && e.target.className == 'form-control optionType') {
        
        optAmtIndex = e.target.value.split('_')[1]

        clearOptionsDiv(optAmtIndex)
        document.getElementsByClassName('optAmount')[optAmtIndex].value = 0;
        let optAmuDiv = document.getElementsByClassName('optAmuDiv')[optAmtIndex];

        let optionType = document.querySelector('.optionType')
        let optTyp = optionType.options[optionType.selectedIndex].value
        if(optTyp != '' && e.target.value.split('_')[0] != 'btntextField' && e.target.value.split('_')[0] != 'btnFile') {
            optAmuDiv.style.display = "inline"
        }else {
            optAmuDiv.style.display = "none"
        }
    }
}

function generateOptions(e) {
    if(e.target && e.target.className == 'optAmount') {
        var optionFieldsWrapper = document.getElementsByClassName('optionFieldsWrapper')[optAmtIndex]
        let optionType          = document.getElementsByClassName('optionType')[optAmtIndex]
        let optTyp              = optionType.options[optionType.selectedIndex].value
        let optAmt              = document.getElementsByClassName('optAmount')[optAmtIndex].value


        clearOptionsDiv(optAmtIndex)
        if(optTyp != '' && optAmt != '') {
            var generateHtml = generateOptionsField(optTyp,optAmtIndex)
            optionFieldsWrapper.style.display = 'block'
            optionFieldsWrapper.innerHTML += '<h4>Options List </h4>'
            for (let i = 1; i <= optAmt; i++) {
                optionFieldsWrapper.innerHTML += generateHtml
            }
        }else {
            return
        }
    }
}
// Event Listner Functions Ends Here 



// Helper Functions Starts Here
function clearOptionsDiv(id) {
    var optionFieldsWrapper = document.getElementsByClassName('optionFieldsWrapper')[id]
    optionFieldsWrapper.style.display = 'none'
    optionFieldsWrapper.innerHTML = ''
}

function generateOptionsField(val, opName) {
    var optionsField;
    val = val.split('_')[0]
    console.log(val, opName)
    if(val == 'btnRadio') {
        optionsField = '<input type="text" class="form-control" name="question_'+opName+'" value=""/>'
    }else if(val == 'btnchkBox') {
        optionsField = '<input type="text" class="form-control" name="question_'+opName+'" value=""/>'
    }
    return optionsField
}
// Helper Functions Ends Here


// function getInput() {
//     let fieldArr = []
//     var inpType

//     for(let i=0; i< formBuilder.length -1; i++){
//         var u = formBuilder.length ? formBuilder[i] : formBuilder;
//         if(formBuilder[i].type == 'file') {
//             inpType = 'src'
//         }else{
//             inpType = 'value'
//         }
//         fieldArr.push({
//             'type': formBuilder[i].type,
//             'questions': formBuilder[i].value
//         })
//     }
//     console.log(fieldArr)
// }