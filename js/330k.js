document.querySelectorAll("a[href^='https://']").forEach((e) => e.setAttribute("target", "_blank"));
document.querySelectorAll("a[href^='http://']").forEach((e) => e.setAttribute("target", "_blank"));