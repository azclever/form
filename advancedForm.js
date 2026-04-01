const form = document.querySelector("form");
const inputs = document.querySelectorAll("form div input");
const search = document.querySelector(".search input");

// form = form[0];
// Mypass123#
let users = [];
if(localStorage.getItem("users")){
users = JSON.parse(localStorage.getItem("users"));
}
refreshList()




console.log(form)

    sessionStorage.setItem("pass","")
    sessionStorage.setItem("conPass","")    

    document.getElementById("FName").value =sessionStorage.getItem("FName")
    document.getElementById("LName").value =sessionStorage.getItem("LName")
    document.getElementById("Email").value =sessionStorage.getItem("Email")
    document.getElementById("birthDate").value =sessionStorage.getItem("birthDate")
    document.getElementById("conEmail").value =sessionStorage.getItem("conEmail")
  
    // form.addEventListener("change" , ())
    inputs.forEach((ele)=>{
        ele.addEventListener("change" , ((ev)=>{
            sessionStorage.setItem(ele.name,ele.value)
        }))
    })



form.addEventListener("submit", ((event)=>{
    event.preventDefault();

    const fName = document.getElementById("FName").value;
    const LName = document.getElementById("LName").value;
    const Email = document.getElementById("Email").value;
    const birthDate = document.getElementById("birthDate").value;
    const conEmail = document.getElementById("conEmail").value;
    const pass = document.getElementById("pass").value;
    const conPass = document.getElementById("conPass").value;
   
    const regrexLetterOnly = /^[A-Za-z]+$/;
    const regrexemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regrexPass = /^(?=.*\d.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Z][A-Za-z\d!@#$%^&*(),.?":{}|<>]{7,31}$/;
    let isvalid = true;
   

        document.querySelector(".FnameError").textContent="";
        document.querySelector(".LnameError").textContent="";
        document.querySelector(".birthDateError").textContent="";
        document.querySelector(".EmailError").textContent="";
        document.querySelector(".conEmailError").textContent="";
        document.querySelector(".passError").textContent="";
        document.querySelector(".conPassError").textContent="";
        document.querySelector(".errorText").textContent="";


    if(!regrexLetterOnly.test(fName)){
        document.querySelector(".FnameError").textContent="First Name must has letters only ";
        isvalid =false;
    }
    if(!regrexLetterOnly.test(LName)){
        document.querySelector(".LnameError").textContent="First Name must has letters only ";
        isvalid =false; 
    }
    if(!isValidDate(birthDate)){
        document.querySelector(".birthDateError").textContent="The Date must be vaild";
        isvalid =false;  
    }
    if(!regrexemail.test(Email)){
        document.querySelector(".EmailError").textContent="The Email is required";
        isvalid =false;
    } 
    if(!(conEmail === Email) ){
        document.querySelector(".conEmailError").textContent="Emails do not match";
        isvalid =false;
    }    
    if(!regrexPass.test(pass) ){
        document.querySelector(".passError").textContent="The Password Must start with a capital letter, Must contain at least 2 numbers, Must contain at least 1 special character, Length must be between 8 and 32 characters, Password and Confirm Password must match. ";
        isvalid =false;
    }
    if(!(pass === conPass)){
        document.querySelector(".conPassError").textContent="Passwords do not match. ";
        isvalid =false;
    }
    
    
    if(isvalid){

        users.unshift({name:`${fName} ${LName}`})
        let strUsers = JSON.stringify(users);
        localStorage.setItem("users",strUsers)
        refreshList();

        console.log(fName)
    }else{
        document.querySelector(".errorText").textContent="Please fix the errors above to submit the form.";
    }
}))





function isValidDate(dateString) {
    const [year, month, day, ] = dateString.split("-");
    const date = new Date(year, month - 1,  day ,);

    return (
        date.getFullYear() == year && date.getMonth() == month - 1 && date.getDate() == day
    );
}



function refreshList(){
    let userArr =JSON.parse(localStorage.getItem("users"));
    const list = document.getElementById("list");
    console.log(userArr);
    
    list.innerHTML="";

    userArr.forEach((el , index)=>{
             
        let usercard = document.createElement("div");
        
        usercard.classList.add("user");
        
            usercard.innerHTML=(`
            <div class="userRight">
            <div class="imageCon">
            <img src="" alt="">
            </div>
            
            <div class="nameCon">
            <p>${el.name}</p>
            </div>
            </div>
            
            <div class="delete"> Delete</div>
            `);
        
        // list.innerHTML+= usercard;
        usercard.querySelector(".delete").addEventListener("click",(ev)=>{
        
        let users = JSON.parse(localStorage.getItem("users") || []);

        // 2. Remove this user by index
        users.splice(index, 1);

        // 3. Save back
        localStorage.setItem("users", JSON.stringify(users));

        // 4. Remove from UI
        usercard.remove();
        })

        list.append(usercard);
            

    })
    // list.innerHTML = list
    console.log(users)
    console.log(list)
}


search.addEventListener("change" , ((e)=>{
    let value=e.target.value;
    
    let userArr =JSON.parse(localStorage.getItem("users"));
    const list = document.getElementById("list");

    let fiterdArr =userArr.filter((el)=>{
        
        
        return el.name == value; 

    })
    
    
    console.log(fiterdArr);
    
    list.innerHTML="";

    fiterdArr.forEach((el , index)=>{
             
        let usercard = document.createElement("div");
        
        usercard.classList.add("user");
        
            usercard.innerHTML=(`
            <div class="userRight">
            <div class="imageCon">
            <img src="" alt="">
            </div>
            
            <div class="nameCon">
            <p>${el.name}</p>
            </div>
            </div>
            
            <div class="delete"> Delete</div>
            `);
        
        // list.innerHTML+= usercard;
        usercard.querySelector(".delete").addEventListener("click",(ev)=>{
        
        let users = JSON.parse(localStorage.getItem("users") || []);

        // 2. Remove this user by index
        users.splice(index, 1);

        // 3. Save back
        localStorage.setItem("users", JSON.stringify(users));

        // 4. Remove from UI
        usercard.remove();
        })

        list.append(usercard);
            

    })
    // list.innerHTML = list
    console.log(users)
 

}))


document.querySelector(".clear").addEventListener("click", refreshList)





