var currentValue = 0;
var isDrag = false;
var precoMax = 90000;
var precoAtual = 0;

$('.pointer-barra').mousedown(function(){
    isDrag = true;
});

$(document).mouseup(function(){
    isDrag = false;
    enableTextSelect();
});

function moveBarra() { 
    $('.barra-preco').mousemove(function(e){
        if(isDrag) {
            disableTextSelect()
            var elBase = $(this)
            var mouseX = e.pageX - elBase.offset().left; 
            if(mouseX < 0) {
                mouseX = 0;
            }else if(mouseX > elBase.width()) {
                mouseX = elBase.width();
            }

            $('.pointer-barra').css('left',mouseX - 13 + 'px');
            currentValue = (mouseX / elBase.width()) * 100; 
            $('.barra-preco-fill').css('width',currentValue + '%');
            precoAtual = (currentValue / 100) * precoMax;
            precoAtual = formataPrecoAtual(precoAtual);
            $('.preco-pesqui').html('R$' + precoAtual);
    }
});

}

moveBarra();

function formataPrecoAtual(precoAtual) {
    precoAtual = precoAtual.toFixed(2);
    precoArr = precoAtual.split('.');
    var novoPreco = formataTotal(precoArr);
    return novoPreco;
}

function formataTotal(precoArr) {
    if(precoArr[0] < 1000) {
        return precoArr[0]+precoArr[1];
    }else if(precoArr[0] < 10000) {
        return precoArr[0][0]+'.' + precoArr[0].substr(1,precoArr[0].length) + 
        ',' + precoArr[1];
    }else {
        return precoArr[0][0]+precoArr[0][1]+'.' + precoArr[0].substr(2,precoArr[0].length) + 
        ',' + precoArr[1]; 
    }
}

// Formata numero debaixo da barra

function disableTextSelect() {
    $('body').css('-webkit-user-select','none');
    $('body').css('-moz-user-select','none');
    $('body').css('-ms-user-select','none');
    $('body').css('-o-user-select','none');
    $('body').css('user-select','none');
}

// Eu chamei la no moveBarra();

function enableTextSelect() {
    $('body').css('-webkit-user-select','auto');
    $('body').css('-moz-user-select','auto');
    $('body').css('-ms-user-select','auto');
    $('body').css('-o-user-select','auto');
    $('body').css('user-select','auto');
}

// Eu chamei la no mouseup 


// mini img => style="0background-color:rgb(210,210,210);
// foto destaque => background-image;

var imgShow = 3;
var maxIndex = Math.ceil($('.mini-img-wraper').length / 3) - 1;
var curIndex = 0;

function initSlider() {
    var amt = $('.mini-img-wraper').length * 33.3;
    var elScroll = $(".nav-galeria-wraper");
    var elSingle = $('.mini-img-wraper');
    elScroll.css('width',amt + '%');
    elSingle.css('width',33.3 * (100 / amt) + '%'); 
}

initSlider();

function naviGateSlide() {
    $('.arrow-right-nav').click(function(){
        if(curIndex < maxIndex) {
            curIndex++ //curIndex += 1;
            var elOff = $('.mini-img-wraper').eq(curIndex * 3).offset().left - $('.nav-galeria-wraper').offset().left;
            $('.nav-galeria').animate({'scrollLeft':elOff + 'px'});
        }else {
            // console.log('final');
        }
    }); 

    $('.arrow-left-nav').click(function(){
        if(curIndex > 0) {
            curIndex -- //curIndex -= 1;
            var elOff = $('.mini-img-wraper').eq(curIndex * 3).offset().left - $('.nav-galeria-wraper').offset().left;
            $('.nav-galeria').animate({'scrollLeft':elOff + 'px'});
        }else {
            // console.log('final');
        }
    });
}

naviGateSlide();

function clickSlide() {
    $('.mini-img-wraper').click(function(){
        $('.mini-img-wraper').css('background-color','transparent');
        $(this).css('background-color','rgb(210,210,210)');
        var img = $(this).children().css('background-image');
        $('.foto-destaque').css('background-image',img);
    });

    $('.mini-img-wraper').eq(0).click();

}
clickSlide();

function responsiMenu() {
    $('.mobile').click(function(){
        $(this).find('ul').slideToggle(1000);
    });
}

responsiMenu();