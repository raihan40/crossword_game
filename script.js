var cx;
var cy;
let row_a = [];
let row_u = [];
let col_a = [];
let col_u = [];
let length_a = [];
let length_u = [];
let ans_a = [];
let ans_u = [];
let text_a = [];
let text_u = [];
let final_a = [];
let final_u = [];
let p = 0,
    q = 0;
let k = 0;
let rid = 0;
let t, target, x, i, j;
let flag = 0;

function loadxml(h) {
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
        if (x.readyState == 4 && x.status == 200)
            process(x.responseXML);
    };

    x.open("GET", "crossword.xml", true);
    x.send();
}

function process(xdoc) {
    let s = "",
        s1 = "";
    let acc = xdoc.getElementsByTagName("across")[0];
    let up = xdoc.getElementsByTagName("updown")[0];
    let uclue = up.getElementsByTagName("clue");
    let aclue = acc.getElementsByTagName("clue");
    for (let i = 0; i < aclue.length; i++) {
        let txt = aclue[i].getElementsByTagName("row")[0];
        let txt1 = aclue[i].getElementsByTagName("col")[0];
        let txt2 = aclue[i].getElementsByTagName("length")[0];
        let txt3 = aclue[i].getElementsByTagName("ans")[0];
        let txt4 = aclue[i].getElementsByTagName("text")[0];
        let txt5 = aclue[i].getElementsByTagName("number")[0];
        console.log(txt5)
        row_a.push(txt.childNodes[0].nodeValue);
        col_a.push(txt1.childNodes[0].nodeValue);
        length_a.push(txt2.childNodes[0].nodeValue);
        ans_a.push(txt3.childNodes[0].nodeValue);
        text_a.push(txt4.childNodes[0].nodeValue);
        final_a.push(txt5.childNodes[0].nodeValue);
    }
    let s_final = ""
    for (let i = 0; i < aclue.length; i++) {
        s_final += final_a[i] + ". " + text_a[i] + " (" +
            length_a[i] + ")" + "<br>"
    }
    document.getElementById("disp").innerHTML = s_final;
    for (let i = 0; i < uclue.length; i++) {
        let txt = uclue[i].getElementsByTagName("row")[0];
        row_u.push(txt.childNodes[0].nodeValue);
        let txt1 = uclue[i].getElementsByTagName("col")[0];
        col_u.push(txt1.childNodes[0].nodeValue);
        let txt2 = uclue[i].getElementsByTagName("length")[0];
        length_u.push(txt2.childNodes[0].nodeValue);
        let txt3 = uclue[i].getElementsByTagName("ans")[0];
        ans_u.push(txt3.childNodes[0].nodeValue);
        let txt4 = uclue[i].getElementsByTagName("text")[0];
        text_u.push(txt4.childNodes[0].nodeValue);
        let txt5 = uclue[i].getElementsByTagName("number")[0];
        final_u.push(txt5.childNodes[0].nodeValue);

    }
    let s_final1 = ""
    for (let i = 0; i < uclue.length; i++) {
        s_final1 += final_u[i] + ". " + text_u[i] + " (" +
            length_u[i] + ")" + "<br>"
    }
    document.getElementById("disp1").innerHTML = s_final1;
    init();
}

function init() {
    C = document.getElementById("cw");
    for (let i = 0; i < 13; i++)
        for (let j = 0; j < 13; j++) {
            let rid = i * 13 + j;
            const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            r.setAttribute('x', j * 30);
            r.setAttribute('y', i * 30);
            r.setAttribute('height', '30');
            r.setAttribute('width', '30');
            r.setAttribute('id', rid.toString());
            r.setAttribute('stroke', 'white');
            r.setAttribute('fill', 'white');
            r.setAttribute('content', 'null');
            C.appendChild(r);
            t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            t.setAttribute('x', j * 30 + 10);
            t.setAttribute('y', i * 30 + 20);
            t.setAttribute('font-size', 'lem');
            t.setAttribute('id', "t" + rid.toString());
            C.appendChild(t);
        }
        //C.addEventListener('mousedown', position, true);


    for (p = 0; p < 13; p++)
        for (q = 0; q < 13; q++) {
            if (accross(p, q) == 1) {
                console.log("p = " + p + " q = " + q)
                let rid = p * 13 + q;
                let rr = rid.toString();
                let rec = document.getElementById(rr);
                rec.setAttribute('stroke', 'white ');
                rec.setAttribute('fill', 'black');
                console.log("before add q = " + q)
            } else {
                console.log("target inddex = " + k)
                console.log("before add q = " + q)
                console.log("len = " +
                    length_a[k]);
                q = q + parseInt(length_a[k]) - 1;
                console.log("before add q = " + q)

            }
        }

    updraw();
}

function updraw() {
    C = document.getElementById("cw");
    for (p = 0; p < 13; p++) {
        for (q = 0; q < 13; q++) {
            if (up(p, q) == 0) {
                let temp = parseInt(length_u[k]);
                let temp1 = p;
                while (temp > 0) {
                    console.log("upp = " + p + " upq = " + q)
                    let rid = p * 13 + q;
                    let rr = rid.toString();
                    let rec = document.getElementById(rr);
                    rec.setAttribute('stroke', 'white ');
                    rec.setAttribute('fill', 'white');

                    temp--;
                    p++;
                }
                p = temp1;
            }

        }


    }
    let spanSuper = ""
    for (let i = 0; i < 10; i++) {
        let rid = parseInt(row_a[i]) * 13 + parseInt(col_a[i])
        let rr = rid.toString();
        let tid = "t" + rr;
        console.log(tid)
        let tx = document.getElementById(tid);
        console.log(tx)
        spanSuper = final_a[i];
        tx.innerHTML = spanSuper;
    }
    for (let i = 0; i < 10; i++) {
        let rid = parseInt(row_u[i]) * 13 + parseInt(col_u[i])
        let rr = rid.toString();
        let tid = "t" + rr;
        console.log(tid)
        let tx = document.getElementById(tid);
        console.log(tx)
        let spanSuper = final_u[i]
        tx.innerHTML = spanSuper;
    }
    var x = 3;
    let i = 0,
        j = 3;
    target = document.getElementById(x.toString());
    console.log(target)
    let whiteRect = target.getAttribute('fill');
    console.log(whiteRect == "white")
    if (whiteRect == "white") {
        flag = 2
    } else {
        flag = 1
    }
    console.log("flag = " + flag)
    target.setAttribute('fill', 'pink')
        //  C.addEventListener('mousedown', position, true);
    window.addEventListener("keydown", function(event) {
        event.preventDefault();
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        switch (key) { // change to event.key to key to use the above variable
            case "ArrowLeft":
                // Left pressed
                console.log("in flag =" + flag);
                if ((i >= 0 || i <= 12) && (j >= 0 || j <= 12)) {
                    if (flag == 2) {
                        target.setAttribute('fill', 'white')
                    } else {
                        target.setAttribute('fill', 'black')
                    }

                    j--;
                    x = i * 13 + j
                    target = document.getElementById(x.toString());
                    let whiteRect = target.getAttribute('fill');
                    console.log(whiteRect == "white")
                    if (whiteRect == "white") {
                        flag = 2
                    } else {
                        flag = 1
                    }
                    console.log("out")
                    console.log("flag " + flag)
                    target.setAttribute('fill', 'pink')
                }
                break;
            case "ArrowRight":
                // Right pressed
                if (i >= 0 || i <= 12 && j >= 0 || j <= 12) {
                    if (flag == 2) {
                        target.setAttribute('fill', 'white')
                    } else {
                        target.setAttribute('fill', 'black')
                    }
                    j++;
                    x = i * 13 + j
                    target = document.getElementById(x.toString());
                    let whiteRect = target.getAttribute('fill');
                    console.log(whiteRect == "white")
                    if (whiteRect == "white") {
                        flag = 2
                    } else {
                        flag = 1
                    }
                    console.log("out")
                    console.log("flag " + flag)
                    target.setAttribute('fill', 'pink')
                }
                break;
            case "ArrowUp":
                // Up pressed
                if (i >= 0 || i <= 12 && j >= 0 || j <= 12) {
                    if (flag == 2) {
                        target.setAttribute('fill', 'white')
                    } else {
                        target.setAttribute('fill', 'black')
                    }
                    i--;
                    x = i * 13 + j
                    target = document.getElementById(x.toString());
                    let whiteRect = target.getAttribute('fill');
                    console.log(whiteRect == "white")
                    if (whiteRect == "white") {
                        flag = 2
                    } else {
                        flag = 1
                    }
                    console.log("out")
                    console.log("flag " + flag)
                    target.setAttribute('fill', 'pink')
                }
                break;
            case "ArrowDown":
                if (i >= 0 || i <= 12 && j >= 0 || j <= 12) {
                    if (flag == 2) {
                        target.setAttribute('fill', 'white')
                    } else {
                        target.setAttribute('fill', 'black')
                    }
                    i++;
                    x = i * 13 + j
                    target = document.getElementById(x.toString());
                    let whiteRect = target.getAttribute('fill');
                    console.log(whiteRect == "white")
                    if (whiteRect == "white") {
                        flag = 2
                    } else {
                        flag = 1
                    }
                    console.log("out")
                    console.log("flag " + flag)
                    target.setAttribute('fill', 'pink')
                        // Down pressed


                }
                break;
        }

        let ch = String.fromCharCode(event.keyCode);
        let tid = "t" + x.toString();
        let tx = document.getElementById(tid);
        if (ch >= "A" && ch <= "Z")
            tx.innerHTML = ch;
    });

}

function accross(p, q) {
    for (k = 0; k < row_a.length; k++) {

        if (p == row_a[k] && q == col_a[k]) {
            return 0;
        }

    }
    return 1;


}

function up(p, q) {

    for (k = 0; k < row_u.length; k++) {


        if (p == row_u[k] && q == col_u[k]) {

            console.log("penitrate =============" + p)
            return 0;
        }

    }
    return 1;


}

function position(e) {
    cx = Math.floor(e.offsetX / 30);
    cy = Math.floor(e.offsetY / 30);
    let rid = cy * 13 + cx;
    // alert(rid);
    let rr = rid.toString();
    // alert(rr);
    let rec = document.getElementById(rr);
    console.log(rec);
    const whiteRect = rec.querySelector('rect[fill="white"]');
    console.log(whiteRect)
    if (whiteRect) {
        rec.setAttribute('fill', 'white');
    }
}


function result() {

    for (let i = 0; i < ans_a.length; i++) {
        let temp_l = parseInt(length_a[i]);
        let z = 0
        let temp_r = parseInt(row_a[i]);
        let temp_c = parseInt(col_a[i]);
        while (temp_l > 0) {
            let rid = temp_r * 13 + temp_c;
            let rr = rid.toString();
            let rec1 = document.getElementById(rr);

            let test = ans_a[i].charAt(z);

            let tid = "t" + rr;
            let tx = document.getElementById(tid)
            let test1 = tx.innerHTML;
            if (test == test1) {
                rec1.setAttribute('fill', 'green');
            } else {
                rec1.setAttribute('fill', 'red');
                console.log("in")
            }
            temp_l--;
            temp_c++;
            z++;
        }

    }
    result1();
}



function result1() {

    for (let i = 0; i < ans_u.length; i++) {
        let temp_l = parseInt(length_u[i]);
        let z = 0
        let temp_r = parseInt(row_u[i]);
        let temp_c = parseInt(col_u[i]);
        while (temp_l > 0) {
            let rid = temp_r * 13 + temp_c;
            console.log("rid = " + rid)
            let rr = rid.toString();
            console.log(rr)
            let rec2 = document.getElementById(rr);
            rec2.setAttribute('fill', 'blue');
            let test3 = ans_u[i].charAt(z);
            let tid = "t" + rr;
            let tx = document.getElementById(tid)
            let test4 = tx.innerHTML;

            if (test3 == test4) {

                rec2.setAttribute('fill', 'green');
            } else {
                rec2.setAttribute('fill', 'red');

            }
            temp_l--;
            temp_r++;
            z++;
        }

    }
}

function answer() {
    let s_final = ""
    for (let i = 0; i < ans_a.length; i++) {
        s_final += final_a[i] + ". " + ans_a[i] + "<br>"
    }

    document.getElementById("disp2").innerHTML = "<=Across Answer=>" + "<br>" +
        s_final;
    "&nbsp;&nbsp;&nbsp;&nbsp"
    let s_final1 = ""
    for (let i = 0; i < ans_u.length; i++) {
        s_final1 += final_u[i] + ". " + ans_u[i] + "<br>"
    }
    document.getElementById("disp3").innerHTML = "<=Updown Answer=>" + "<br>" +
        s_final1;

}