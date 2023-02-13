const root = document.getElementById('root');
const next = document.getElementById('load_next');
const prev = document.getElementById('load_prev');
const pagedisplay = document.getElementById('page-no');
const errorsdisplay = document.getElementById('errors');

let pageNmbr = 1;

const displayResults = async ()=>{
    let childs='';
    let auth = await getAuth();
    let issues = await fetchData(auth);    
    console.log(issues)
    issues.map((issue)=>{
        childs += `<li class='list-item' >${issue.title}: <a href = ${issue.html_url} target='_blank'>Visit</a></li>`
    });
    pagedisplay.innerText = pageNmbr
    root.innerHTML = childs;
}
async function getAuth(){

    try{
        const res = await fetch('/auth.json');
        auth = await res.json();
        return auth;
    }
    catch(e){
        console.log(e);
        errorsdisplay.innerText = "Create a file auth.json and add your github username and password for authentication !!";
    }
}

async function fetchData(auth){

    try{
        const response = await fetch(`https://api.github.com/repositories/1296269/issues?page=${pageNmbr}&per_page=5` ,{
            auth
        });

        issues = await response.json();
        return issues;
    }
    catch(e){
        console.log(e.message);
        errorsdisplay.innerText = "Something went wrong!!";
        setTimeout(()=>{
            errorsdisplay.innerText = ""
        }, 1500)
    }
}

displayResults();

next.addEventListener('click', ()=>{
    pageNmbr++;
    displayResults();
})

prev.addEventListener('click', ()=>{
    if(pageNmbr === 1){
        errorsdisplay.innerText = "You have reached the end!!";
        setTimeout(()=>{
            errorsdisplay.innerText = ""
        }, 1500);

    }else{
        pageNmbr--;
        displayResults()
    }
})