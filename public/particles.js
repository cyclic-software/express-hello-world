let cursor=0
const Typer = document.getElementById("Typer")
setInterval(() => {
    if (cursor===0) {
        Typer.style="border-right: none"
        cursor=1
    } else {
        Typer.style="border-right: 2px solid white"
        cursor=0
    }
}, 500)

let text=1

setInterval(() => {
    if (text===1) {
        setTimeout(() => {Typer.innerHTML="W"}, 100);
        setTimeout(() => {Typer.innerHTML="We"}, 200);
        setTimeout(() => {Typer.innerHTML="Web"}, 300);
        setTimeout(() => {Typer.innerHTML="Web "}, 400);
        setTimeout(() => {Typer.innerHTML="Web D"}, 500);
        setTimeout(() => {Typer.innerHTML="Web De"}, 600);
        setTimeout(() => {Typer.innerHTML="Web Deve"}, 700);
        setTimeout(() => {Typer.innerHTML="Web Develop"}, 800);
        setTimeout(() => {Typer.innerHTML="Web Developme"}, 900);
        setTimeout(() => {Typer.innerHTML="Web Development"}, 1000);
        text=2
    } else {
        setTimeout(() => {Typer.innerHTML="P"}, 100);
        setTimeout(() => {Typer.innerHTML="Pr"}, 200);
        setTimeout(() => {Typer.innerHTML="Pro"}, 300);
        setTimeout(() => {Typer.innerHTML="Prog"}, 400);
        setTimeout(() => {Typer.innerHTML="Progra"}, 500);
        setTimeout(() => {Typer.innerHTML="Program"}, 600);
        setTimeout(() => {Typer.innerHTML="Programi"}, 700);
        setTimeout(() => {Typer.innerHTML="Programin"}, 800);
        setTimeout(() => {Typer.innerHTML="Programing"}, 900);
        text=1
    }
}, 3000);
