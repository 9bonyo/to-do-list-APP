// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 삭제된다
// check버튼 누르면 할일이 끝나면서 밑줄이 간다
//1. check버튼을 클릭하는 순간, true > false
//2. true면 끝난걸로 간주하고 밑줄 보여주기
//3. false면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바 이동
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);


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
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
                <div class="task-done">${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="checkTask('${taskList[i].id}')">CHECK</button>
                        <button onclick="deleteTask()">DELETE</button>
                    </div>
               </div>`; 
        }
        else {
            resultHTML += `<div class="task">
                <div>${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="checkTask('${taskList[i].id}')">CHECK</button>
                        <button onclick="deleteTask()">DELETE</button>
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

function deleteTask(){
    console.log("삭제버튼테스트요 삭제버튼 숙제요");
}

function randomIDGenerate(){
    return '_'+Math.random().toString(36).substr(2, 9); //unique id를 위한 함수
}