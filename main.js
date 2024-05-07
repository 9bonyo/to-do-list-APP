// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 삭제된다
// check버튼 누르면 할일이 끝나면서 밑줄이 간다
//1. check버튼을 클릭하는 순간, true > false
//2. true면 끝난걸로 간주하고 밑줄 보여주기
//3. false면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바 이동
// 전체탭을 누르면 다시 전체아이템으로 돌아옴
// + input칸에 값 입력하면, 비우기
// + input칸에 enter만 눌러도 list에 추가되기

let taskInput = document.getElementById("task-input");
console.log("taskInput은",taskInput);
let addButton = document.getElementById("add-button");
let tabUnderLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-tabs div");
let mode = 'all';
console.log(tabs);
let taskList = [];
let filterList = [];
let list=[];

addButton.addEventListener("click", addTask);

document.addEventListener
('keydown',
(event)=>{if(event.keyCode === 13)
    {console.log("enter",event);
    if(taskInput.value ==""){
        alert("값을 입력하세요");
        return;
    }else{
    addTask();
    taskInput.value = "";}
    
}
})


for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){filter(event), activeTab(event)}); //event는 어떤값을 클릭했는지 값
}





function activeTab(event){
    tabUnderLine.style.left = event.currentTarget.offsetLeft + "px";
    tabUnderLine.style.width = event.currentTarget.offsetWidth + "px";
}

function addTask(){
    

    let task = {

        id : randomIDGenerate(), //어떤 check버튼인지 콕 집어 선택하기 위한 unique id
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task)
    console.log(taskList)
    render();
}

function render(){
    let resultHTML = '';
    
    //내가 선택한 탭에 따라서 리스트를 달리보여주기
    //탭 모두 클릭시 > taskList
    //탭 진행중, 끝남 클릭시 > filterList
    if(mode =='all'){
            list = taskList
    }else if(mode =='ongoing' || mode == 'done'){
            list = filterList
    }

    console.log(filterList)



    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <i class="fa-solid fa-check" onclick="checkTask('${list[i].id}')"></i>
                        <i class="fa-solid fa-trash-can" onclick="deleteTask('${list[i].id}')"></i>
                    </div>
               </div>`; 
        }
        else {
            resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                    <div>
                        <i class="fa-solid fa-check" onclick="checkTask('${list[i].id}')"></i>
                        <i class="fa-solid fa-trash-can" onclick="deleteTask('${list[i].id}')"></i>
                    </div>
               </div>`;        
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;


}

function checkTask(id){
   for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }       
   }
   render();
   console.log(taskList);
}

function filter(event){
    //해당 탭을 클릭했을때의 내용만 보이기
    //underline 해당 탭 

    mode = event.target.id
    filterList =[]
    
    //id=all 전체리스트 > 전체
    //id=ongoing 진행중 > isComplete == false
    //id=done 끝남 > isComplete == true

    if(mode === "all"){
         
        list = taskList
        render();
    }else if(mode === "ongoing"){
        
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중리스트", filterList);
        


    }else if(mode === "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("끝남리스트", filterList);
    }
}


function deleteTask(id){
    console.log("삭제버튼테스트요 삭제버튼 숙제요");
    console.log("mode는",mode)
    //만약 탭이 모두면 모두에서 삭제
    //만약 탭이 진행중이면 진행중에서 삭제
    //만약 탭이 끝남이면 끝남에서 삭제
    if(mode == "all"){
        for(let i=0; i<taskList.length;i++){
            if(list[i].id == id){
                taskList.splice(i,1);
                break;
            }
            }
            render();
    }
    else if(mode=="done"||mode=="ongoing"){
        for(let i=0; i<filterList.length;i++){
            if(list[i].id == id){
                filterList.splice(i,1);
                let taskListIndex = taskList.findIndex(task => task.id === `${id}`) //**해결포인트 */
                console.log(taskListIndex)
                taskList.splice(taskListIndex,1);
                break;
            }
            }
            render();
    }


    
    console.log(taskList);
}

function randomIDGenerate(){
    return '_'+Math.random().toString(36).substr(2, 9); //unique id를 위한 함수
}