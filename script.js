var initialvalue = "0.23";
//var sliderArr = dragSlider("0.5");
//drawSlider(sliderArr);

setFixedRating(initialvalue);

const slide1 = document.getElementById("slide-wrapper-p1");
const slide2 = document.getElementById("slide-wrapper-p2");
const slide3 = document.getElementById("slide-wrapper-p3");
const slide4 = document.getElementById("slide-wrapper-p4");

function makeGray(){
    slide1.style.background = "darkgray";
    slide2.style.background = "darkgray";
    slide3.style.background = "darkgray";
    slide4.style.background = "darkgray";
}
function drawSlider(sliderArr){
    var tran = sliderArr['transparent'];
    for(var i in tran){
        document.getElementById(tran[i]).style.background = "transparent";
    }
}

function dragSlider(value) {
    var transp = [];
    var slider = [];

    switch(value){
        case "0.5":
            transp.push("slide-wrapper-p3");
            break;
        case "1":
            transp.push("slide-wrapper-p3");
            transp.push("slide-wrapper-p4");
            break;
        case "-0.5":
            transp.push("slide-wrapper-p2");
            break;
        case "-1":
            transp.push("slide-wrapper-p1");
            transp.push("slide-wrapper-p2");
            break
    }
    slider['transparent'] = transp;

    return slider; 
}
progressBar = document.getElementById("gray-wrapper");

progressBar.addEventListener("mouseover", function (e) {
    var bcr = this.getBoundingClientRect();
    const percentage = (e.clientX - bcr.left) / bcr.width;
});

progressBar.addEventListener("mousemove", function (e) {
    var bcr = this.getBoundingClientRect();
    const percentage = (e.clientX - bcr.left) / bcr.width;
    var perc = fillprogressBar(percentage);
    var inPer = percentage * 100;

    for (var i in perc){
        document.getElementById(i).setAttribute('style',`width:${perc[i]}%`);
    }

    if(inPer >= 50){
        document.getElementById("slide-wrapper-p2").setAttribute( 'style', `background: darkgray !important;left:25%;width:25%;`);
        document.getElementById("slide-wrapper-p1").setAttribute( 'style', `background: darkgray !important;left:0;width:25%;`);
        document.getElementById("slide-wrapper-p3").setAttribute( 'style', `background: transparent !important;width:${perc['slide-wrapper-p3']}% !important;left:50% !important;border-radius:0px 40px 40px 0px !important;`);
        document.getElementById("slide-wrapper-p4").setAttribute( 'style', `background: darkgray !important;width:${50 - perc['slide-wrapper-p3']}%  !important;left:${50 + perc['slide-wrapper-p3']}% !important;`);
        var padNum = pad(perc['slide-wrapper-p3']/100,2) * 2;
        document.getElementById("mp5").innerHTML = "";
        document.getElementById("p5").innerHTML = padNum;

    }else{
        document.getElementById("slide-wrapper-p2").setAttribute( 'style', `background: transparent !important;left:${perc['slide-wrapper-p1']}%;width:${50 - perc['slide-wrapper-p1']}%;border-radius:40px 0px 0px 40px;`);
        document.getElementById("slide-wrapper-p1").setAttribute( 'style', `background: darkgray !important;width:${perc['slide-wrapper-p1']}%;`);
        document.getElementById("slide-wrapper-p3").setAttribute( 'style', 'background: darkgray !important;width:25%;');
        document.getElementById("slide-wrapper-p4").setAttribute( 'style', 'background: darkgray !important;width:25%;');
        var disp = pad((perc['slide-wrapper-p2']/100),2) * 2;
        document.getElementById("mp5").innerHTML = "-" + disp;
        document.getElementById("p5").innerHTML = "";
    }

});

function fillprogressBar(percentage){
    var per = `${percentage*100}`;
    var perFloatValue = parseFloat(per);
    var percentageOfDivs = [];

    if(perFloatValue >= 50){
        percentageOfDivs['slide-wrapper-p1'] = 25;
        percentageOfDivs['slide-wrapper-p2'] = 25;
        percentageOfDivs['slide-wrapper-p3'] = perFloatValue-50;
        percentageOfDivs['slide-wrapper-p4'] = 100-perFloatValue;

        if(perFloatValue > 74 && perFloatValue <= 76){
            removeActivepoints();
            document.getElementById("point4").classList.add("active-point");
        }
        if(perFloatValue > 99 && perFloatValue <= 101){
            removeActivepoints();
            document.getElementById("point5").classList.add("active-point");
        }

    }
    if(perFloatValue < 50){
        percentageOfDivs['slide-wrapper-p3'] = 25;
        percentageOfDivs['slide-wrapper-p4'] = 25;
        percentageOfDivs['slide-wrapper-p1'] = perFloatValue;
        percentageOfDivs['slide-wrapper-p2'] = 50-perFloatValue;

        if(perFloatValue > 24  && perFloatValue <= 26){
            removeActivepoints();
            document.getElementById("point2").classList.add("active-point");
        }
        if(perFloatValue > 0 && perFloatValue <= 1){
            removeActivepoints();
            document.getElementById("point1").classList.add("active-point");
        }

    }

    return percentageOfDivs;
}
const pad = (n, width, z) => {
    z = z || "0";
    n = n + "";
    var val =  n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    return parseFloat(val).toFixed(2);
};

function setFixedRating(value){

    if(value >= 0){
        var fixedRatingDiv = document.getElementById("fixed-rating");
        var widthF = (value/2)*100;
        fixedRatingDiv.setAttribute('style',`width:${widthF}%;left:50%;`);
        document.getElementById("fr").classList.add("toright");

    }else{
        value = value * -1;
        var fixedRatingDiv = document.getElementById("fixed-rating");
        var widthF = (value/2)*100;
        fixedRatingDiv.setAttribute('style',`width:${widthF}%;right:50%;`);
        document.getElementById("fr").classList.add("toleft");
    }

    document.getElementById("fr").innerHTML = value;
}

function removeActivepoints(){
    var els = document.querySelectorAll('.point.active-point');
    for (var i = 0; i < els.length; i++) {
        els[i].classList.remove('active-point');
    }
}
