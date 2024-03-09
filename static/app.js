function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos"); //get 요청
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  //jsonRes = [{id:123, content:'OOO'}]
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    //post 요청
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  // 이벤트가 동작하고 바로 새로고침이됨
  event.preventDefault(); //새로고침을 막아줌
  const input = document.querySelector("#memo-input"); //input입력값을 가져옴
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
