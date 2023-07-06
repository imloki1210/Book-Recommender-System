let string="";
let buttons= document.querySelectorAll('.btn');
Array.from(buttons).forEach((button)=>{
    button.addEventListener('click',(e)=>{
        if(e.target.innerHTML=='='){
            string=eval(string);
            document.querySelector('.ip').value=string;
        }
        else if(e.target.innerHTML=='C'){
            string="";
            document.querySelector('.ip').value=string;
        }
        else if(e.target.innerHTML=='X'){
            string= string.slice(0,-1);
            document.querySelector('.ip').value=string;
        }
        else if(e.target.innerHTML=='$'){
            const excrate=0.012;
            const usd=string*excrate;
            document.querySelector('.ip').value="$ "+usd.toFixed(2);
        }
        else {
        console.log(e.target);
        string=string+e.target.innerHTML;
        document.querySelector('.ip').value=string;
        }
    })
})