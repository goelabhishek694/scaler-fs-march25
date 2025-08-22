const socket = io();
  socket.on("message", (data) => {
    console.log("receiving message", data);
  });

  const input = document.getElementById("message")
  const btn = document.getElementById("send");
  const ul = document.getElementById("list");
  const grpBtn = document.getElementById("createGrp");
const joinGrp = document.getElementById("joinGrp");
const stg = document.querySelector("#stg");
const leaveRoomBtn = document.getElementById("leave");

  btn.addEventListener("click", () => {
    const value = input.value;
    const div = document.createElement("div");
    div.setAttribute("class", "sender");
    const li = document.createElement("li");
    li.innerText = value;
    const para = document.createElement("p");
    para.innerText = "sender";
    div.appendChild(para);
    div.appendChild(li);
    ul.appendChild(div);
    input.value=""
    socket.emit("message", value);
  });

  socket.on("broadcast", (data) => {
    console.log("broadcasted message", data);
    const div = document.createElement("div");
    div.setAttribute("class", "receiver");
    const li = document.createElement("li");
    li.innerText = data;
    const para = document.createElement("p");
    para.innerText = "receiver";
    div.appendChild(para);
    div.appendChild(li);
    ul.appendChild(div);

  })

  grpBtn.addEventListener("click", () => {
    console.log("group creation req");
    socket.emit("create_grp", Math.random(0.1)*1000);   
  });

  joinGrp.addEventListener("click", () =>{
    console.log("grop join req");
    socket.emit("join_room");
  })

stg.addEventListener("click", function () {
 let value = input.value;
 if (value) {
   socket.emit("grp_message", value);
 }
}); 

leaveRoomBtn.addEventListener("click", () => {
 socket.emit("leave_room");
});
