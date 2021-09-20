document.querySelectorAll("a[href^='http://'],a[href^='https:']:not(a[href^='https://www.330k.info/'])").forEach((e) => e.setAttribute("target", "_blank"));

document.querySelectorAll("main a[href^='http://'], main a[href^='https:']:not(a[href^='https://www.330k.info/'])").forEach((e) => {
  const img = document.createElement("img");
  img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='13'%3E%3Cpath fill='%2336b' d='M5.002 1.01h7v7l-2-2-3 2v-1l3-2.25 1 1V2.01h-3.75l1 1-2.25 3h-1l2-3z'/%3E%3Cpath fill='%2336b' d='M7.002 3.01h-5v8h8v-5h-1v4h-6v-6h4z'/%3E%3Cpath fill='%2315a5ea' d='M4.082 5.51c0-.621.621-.621.621-.621 1.864.621 3.107 1.864 3.728 3.728 0 0 0 .621-.62.621-1.245-1.864-1.866-2.485-3.73-3.728z'/%3E%3C/svg%3E";
  e.appendChild(img);
});
