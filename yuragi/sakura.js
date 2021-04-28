(function(d,b,w){
    // d -> window.document
    // b -> window.document.body
    // w -> window

    const q = d.createElement('div')
    q.id = "sakura"
    b.appendChild(q)

    var h = w.innerHeight
    var u = d.documentElement.scrollTop || b.scrollTop
    var z = 9999

    var t = new Array()
    var l = new Array()
    var y = new Array()
    var s = new Array()
    var g = new Array()
    var c = new Array()
    var k = 0

    d.addEventListener('scroll',() => {
        u = d.documentElement.scrollTop || b.scrollTop
    },false)

    for(var i=0;i<30;i++){
        var m = d.createElement('div');
        m.id = 'hanabira'+i;
        t[i] = Math.random()*-1000+u;
        l[i] = Math.random()*w.innerWidth;
        m.setAttribute('style','z-index:'+(z+i)+';top:'+t[i]+'px;left:'+l[i]+'px;');
        m.setAttribute('class','hana');
        q.appendChild(m);
        y[i] = Math.random()*40+5;
        s[i] = Math.random()*5+2;
        g[i] = d.getElementById('hanabira'+i);
        c[i] = 0;
    }

    setInterval(function(){
        for(var i=0;i<30;i++){
            if(t[i]<u+h-40){
                if(y[i]>=c[i]){
                    l[i] = l[i]+0.5+Math.random()*0.5;
                }else{
                    l[i] = l[i]-0.5-Math.random()*0.5;
                }
                if((y[i]*2)<=c[i]){
                    c[i] = 0;
                }
            }else{
                t[i] = u-40;
                l[i] = Math.random()*w.innerWidth;
            }
            if(k>=100 && k<=105){l[i] = l[i]+3;}
            else if(k>=106 && k<=120){l[i] = l[i]+5;}
            else if(k>=121 && k<=290){l[i] = l[i]+8;}
            else if(k>=291 && k<=320){l[i] = l[i]+4;}
            else if(k>=321 && k<=330){l[i] = l[i]+2;}
            else if(k>=500 && k<=505){l[i] = l[i]-3;}
            else if(k>=506 && k<=520){l[i] = l[i]-5;}
            else if(k>=521 && k<=790){l[i] = l[i]-8;}
            else if(k>=791 && k<=820){l[i] = l[i]-4;}
            else if(k>=821 && k<=830){l[i] = l[i]-2;}
            else if(k>=900){k = 0;}

            t[i] = t[i]+s[i];
            g[i].style.top = t[i]+'px';
            g[i].style.left = l[i]+'px';
            c[i]++;
        }
        k++;
        /* console.log(k); */
    },45);

})(window.document,window.document.body,window);
