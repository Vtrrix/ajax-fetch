const displayArea = document.getElementById("data");
const callForData = document.getElementById("call");

callForData.addEventListener("click", () => {
  callForData.style.display = "none";

  const reqObj = new XMLHttpRequest();
  reqObj.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      data.map((ele) => {
        displayArea.innerHTML += ` <div class="element">
        <h2>${ele.userId}</h2>
        <h3>
          ${ele.title}
        </h3>
        <p>
          ${ele.body}
        </p>
      </div>`;
      });
    }
  };
  reqObj.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
  reqObj.send();
});
