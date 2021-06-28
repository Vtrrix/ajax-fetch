const displayArea = document.getElementById("data");
const callForData = document.getElementById("call");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
nextBtn.style.display = "none";
prevBtn.style.display = "none";

const reqObj = new XMLHttpRequest();
let i = 1,
  dataSize;

function sendReq() {
  // for button navigation-----------------------------------
  displayArea.innerHTML = "";
  nextBtn.style.display = "initial";
  prevBtn.style.display = "initial";
  // -----------------------------------------------------------
  callForData.style.display = "none";
  reqObj.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${i}`,
    true
  );
  reqObj.onreadystatechange = function () {
    if (this.readyState == 4) {
      const data = JSON.parse(this.responseText);
      dataSize = data.length;
      if (this.status == 200) {
        data.map((ele) => {
          displayArea.innerHTML += ` <div class="element">
              <h3>${ele.userId}</h3>
              <div>
                <h4>
                  ${ele.title}
                </h4>
                <p>
                  ${ele.body}
                </p>
              </div>
          </div>`;
        });
      } else {
        console.log(this.status);
        displayArea.innerHTML += `<h2> Oops! Something Went Wrong.</h2>`;
      }
    }
  };

  reqObj.send();

  // for scroll navigation----------------------
  // i++;
  // window.onscroll = function () {
  //   if (
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight &&
  //     i <= dataSize
  //   ) {
  //     sendReq();
  //   }
  // };
  // -----------------------------------------
}

callForData.addEventListener("click", sendReq);

// for button navigation-----------------------------------
nextBtn.addEventListener("click", () => {
  i++;
  sendReq();
});
prevBtn.addEventListener("click", () => {
  i--;
  sendReq();
});
// -----------------------------------------------------------
