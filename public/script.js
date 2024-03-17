
// document.addEventListener("DOMContentLoaded", function () {
//     setTimeout(function () {

        
        
//     }, 2000);
// });


// Wait for the page to load completely
window.addEventListener('load', function () {
    // Calculate the time it took for the HTML file to be sent from the server
    var timing = window.performance.timing;
    var fetchStart = timing.fetchStart;
    var responseEnd = timing.responseEnd;
    var loadTime = responseEnd - fetchStart;
    var spinner = document.getElementById("page_load");
    spinner.parentNode.removeChild(spinner);
    
    console.log('Time to fetch HTML file:', loadTime, 'milliseconds');
});



function hide_go_bottom(){
    document.getElementById('goBottom').style.display="none";
}
hide_go_bottom();
function show_go_bottom(){
    document.getElementById('goBottom').style.display="block";
}
function go_bottom(){
    window.scrollTo(0,document.body.scrollHeight);
}

function hide_container(){
    const container = document.getElementById('container');
    container.style.display="none";
}

window.onreset=hide_container();

function hide_landing(){
    const landing_page = document.getElementById('intro_div');
    landing_page.style.display='none';
    container.style.display="flex";
}

function fill_prompt(prompt){
    document.getElementById('prompt').innerHTML=prompt;
    document.getElementById('prompt').value=prompt;
    hideBtn();
    send_prompt(prompt);
    const regenerate = document.querySelector('#regenerate');
    regenerate.style.display='none';
}

function checkOverflow(){
    const textarea = document.getElementById('prompt');
            
    textarea.style.height = '40px'; 

    
    if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
}

function applyTopBar(code){
    
    const className = code.classList[0];
    const topBar = `
    <div id="topBar">
        <p>${className}</p>
        <button id="copy" type="button" class="btn btn-outline" fdprocessedid="roou3h">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
            </svg>
            <p>Copy</p>
          </button>
    </div>
    `;
    
    code.insertAdjacentHTML('beforebegin',topBar); 
    const codeCopy = document.querySelectorAll('#copy');
    codeCopy.forEach((btn)=>{
        console.log(`btn: ${btn}`);
        btn.onclick=copy(btn)
    }); 
    // code.className = 'code_prev';
    
} 
     
function copy(button) {
    button.addEventListener('click', function() {
        const codeContainer = button.closest('#topBar').nextElementSibling;
        const range = document.createRange();
        range.selectNode(codeContainer);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        document.execCommand('copy');

        
        window.getSelection().removeAllRanges();

        const okBtn = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
        <p>Copied!</p>
        `;
        const copyBtn = `
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
        </svg>
        <p>Copy</p>
        `;
        button.innerHTML=okBtn;
        setTimeout(()=>{
            button.innerHTML=copyBtn;
        },1000)
        // alert('Code copied to clipboard!');
    });
}

function copyAllFunc(button){
    button.addEventListener('click', function() {
        const codeContainer = button.closest('#actions').previousElementSibling;
        const range = document.createRange();
        range.selectNode(codeContainer);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');

        window.getSelection().removeAllRanges();
        const okBtn = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" id="newCopyBtn" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
        <p>Copied!</p>
        `;
        const copyBtn = `
        <svg xmlns="http://www.w3.org/2000/svg"  width="10" height="10" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
        </svg>
        `;
        button.innerHTML=okBtn;
        setTimeout(()=>{
            button.innerHTML=copyBtn;
        },1000)
        // alert('Code copied to clipboard!');
    });
}

const sent = document.getElementById('sent');
const send = document.getElementById('send');

function hideBtn(){
    sent.style.display="block";
    send.style.display="none";
}
function showBtn(){
    sent.style.display="none";
    send.style.display="block";
    const textarea = document.getElementById('prompt');
    textarea.value="";
    textarea.style.height = '40px';
}



async function send_prompt(prompt){
    
    const container = document.getElementById('container');
    const prompt_div = `
    <div id="prompt_div">
        <div id="your_pic">
            <img width="36" height="36" src="https://i.pinimg.com/736x/13/21/97/1321974a40b4098834ba034dead25f90.jpg" alt="">
        </div>
        <div id="prompt_actions">
            
            <div id="prompt_text">
                ${prompt}
            </div>
            <div id="actions">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
                </svg>
                <p>Copy</p> -->
            </div>
        </div>
    </div>
    <div id="result_div">
        <div id="ai">
            <img width="36" height="36" src="data:image/png;base64,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" alt="">
        </div>
        <div id="result_actions">
            <div id="result">
            <div class="card" id="loading" aria-hidden="true">
                <div class="card-body">
                    <h5 class="card-title placeholder-wave">
                        <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-wave">
                        <span class="placeholder col-7"></span>
                        
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-8"></span>
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-2"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-8"></span>
                        <span class="placeholder col-2"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-2"></span>
                        <span class="placeholder col-3"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-5"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-7"></span>
                    </p>
                    <a class="btn btn-secondary disabled placeholder-wave col-6" aria-disabled="true"></a>
                </div>
            </div>
        </div>

        <div id="actions">

            <button id="copyAll"  type="button" class="btn btn-outline" fdprocessedid="roou3h">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
                </svg>
            </button>
        </div>
        
        </div>
        
    </div>
    `;

    container.innerHTML+=prompt_div;
    const postData = {
        'prompt':prompt
    }
    
    try{
        const response = await fetch('/send_prompt',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(postData)
        });
        
        if(!response.ok){
            return window.alert('error from server')
        }
        
        
        const data = await response.json();
        
        showBtn();
        
        console.log("🛸🛸prompt sent", prompt);
        console.log(`👽\n${data.result}`);

        const result_div=document.getElementById('result');
        
        const result_md = data.result;

        const a = [];
        a.push(result_md);
        x=marked.parse(a[0]);

        const new_result_div = container.querySelector('#result:not(.prev-result)');
        new_result_div.innerHTML=x;

        if(x == ""){
            new_result_div.innerHTML=`Could not generate any response <br><br>`;
            const regenerate = document.querySelector('#regenerate');
            regenerate.style.display="block";
            regenerate.onclick=()=>{
                const again = 'try again';
                fill_prompt(again);
                regenerate.style.display='none';
            }
            console.log("🌚🌚🌚🌚🌚🌚",prompt);
        }
        const copyAll = document.querySelectorAll('#copyAll');
        copyAll.forEach((copyAllBtn)=>{
            copyAllBtn.onclick=copyAllFunc(copyAllBtn);
        });
        
        new_result_div.classList.add('prev-result');
        if(result_div.querySelectorAll('pre')){
            const pre = document.querySelectorAll('pre'); 
            pre.forEach((code)=>{
                code.classList.add('hljs');
                hljs.highlightAll();
            })
        }
        const newCodeBlocks = new_result_div.querySelectorAll('pre code:not(.top-bar-applied)');
        newCodeBlocks.forEach((code)=>{
            applyTopBar(code);
            code.classList.add('top-bar-applied');
            
        });
        

        go_bottom();
        show_go_bottom();
        return data.result;
    }catch(err){
        console.log(err);
        const result_div=document.getElementById('result');
        result_div.innerHTML = "Server error"
    }
    
}



document.getElementById('form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const postData = document.getElementById('prompt').value;
    hideBtn();
    hide_landing();
    send_prompt(postData);
});
