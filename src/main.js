import { getApplicationDiv } from "./lib.js";

function main() {
  const appDiv = getApplicationDiv("#app");

  if (appDiv !== null) {
    console.log(appDiv.nodeType);
    console.log(appDiv.nodeName);
    console.log(appDiv.tagName);
    console.log(appDiv.innerHTML);

    appDiv.innerHTML += "<h1>Text</h1>";

    console.log(appDiv.innerHTML);

    console.log(appDiv.outerHTML);

    console.log(appDiv.data);
    console.log(appDiv.textContent);

    const h1 = appDiv.querySelector("h1");
    h1.textContent = "<h2>New text</h2>";

    console.log(appDiv.textContent);

    h1.hidden = false;

    h1.payload = {
      name: "User Name",
      roleId: 145,
    };

    h1.setAttribute("custom-attribute", "my value");
    if (h1.hasAttribute("custom-attribute")) {
      console.log(h1.getAttribute("custom-attribute"));
      h1.removeAttribute("custom-attribute");
    }

    console.log(h1);
    console.dir(h1);

    appDiv.style.height = "80vh";
    appDiv.style.border = "1px solid red";
  } else {
    console.log("App div not found");
  }
}

export { main };
