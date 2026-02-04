import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { SUPABASE_URL, SUPABASE_ANON } from "./config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

let revenue=[];
let expense=[];
let posts=[];
let tasks=[];

window.showLogin = ()=>{
landing.classList.add("hidden");
loginScreen.classList.remove("hidden");
}

window.login = async ()=>{
authMsg.innerText="Signing in...";

const { data,error } = await supabase.auth.signInWithPassword({
email:email.value,
password:password.value
});

if(error){
authMsg.innerText=error.message;
return;
}

loginScreen.classList.add("hidden");
app.classList.remove("hidden");
userEmail.innerText=data.user.email;
}

window.logout = async ()=>{
await supabase.auth.signOut();
location.reload();
}

window.addRevenue = ()=>{
revenue.push(Number(revInput.value||0));
updateFinance();
}

window.addExpense = ()=>{
expense.push(Number(expInput.value||0));
updateFinance();
}

function updateFinance(){
let r=revenue.reduce((a,b)=>a+b,0);
let e=expense.reduce((a,b)=>a+b,0);

revTotal.innerText="$"+r;
expTotal.innerText="$"+e;
profitTotal.innerText="$"+(r-e);
}

window.savePost = ()=>{
posts.push(postCaption.value);
postList.innerHTML=posts.map(p=>`<div>${p}</div>`).join("");
}

window.saveNotes = ()=>{
localStorage.setItem("notes",notes.value);
}

window.addTask = ()=>{
tasks.push(taskInput.value);
taskList.innerHTML=tasks.map(t=>`<div>✔ ${t}</div>`).join("");
}
