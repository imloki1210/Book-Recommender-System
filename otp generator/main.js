function generateotp(){
    let digits="0123456789";
    let otp="";

    for (let i = 0; i < 6; i++) {
        otp+=digits[Math.floor(Math.random()*10)];       
    }
    let ip=document.querySelector('#ip');
    ip.innerHTML=otp;
}