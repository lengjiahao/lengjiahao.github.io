
var context;
var arr = new Array();
var starCount = 800;
var rains = new Array();
var rainCount = 20;

function init() {
    var stars = document.getElementById("stars");
    windowWidth = window.outerWidth; //浏览器窗口宽度
    stars.width = windowWidth;
    stars.height = window.outerHeight;//浏览器窗口宽度

    context = stars.getContext("2d");

}

//����һ�����Ƕ���
var Star = function () {
    this.x = windowWidth * Math.random();//������
    this.y = 5000 * Math.random();//������
    this.text = ".";//�ı�
    this.color = "white";//��ɫ
    this.getColor = function () {
        var _r = Math.random();
        if (_r < 0.5) {
            this.color = "#333";
        } else {
            this.color = "white";
        }
    }
    //��ʼ��
    this.init = function () {
        this.getColor();
    }
    //����
    this.draw = function () {
        context.fillStyle = this.color;
        context.fillText(this.text, this.x, this.y);
    }
}

//������
function drawMoon() {
    var moon = new Image();
    // 缺少图片
    moon.src = "./images/moon.jpg"
    context.drawImage(moon, -5, -10);
}

//ҳ����ص�ʱ��
window.onload = function () {
    init();
    //������
    for (var i = 0; i < starCount; i++) {
        var star = new Star();
        star.init();
        star.draw();
        arr.push(star);
    }
    //������
    for (var i = 0; i < rainCount; i++) {
        var rain = new MeteorRain();
        rain.init();
        rain.draw();
        rains.push(rain);
    }
    drawMoon();//��������
    playStars();//��������������
    playRains();//��������

}

//����������
function playStars() {
    for (var n = 0; n < starCount; n++) {
        arr[n].getColor();
        arr[n].draw();
    }

    setTimeout("playStars()", 100);
}

/*�����꿪ʼ*/
var MeteorRain = function () {
    this.x = -1;
    this.y = -1;
    this.length = -1;//����
    this.angle = 30; //��б�Ƕ�
    this.width = -1;//����
    this.height = -1;//�߶�
    this.speed = 1;//�ٶ�
    this.offset_x = -1;//�����ƶ�ƫ����
    this.offset_y = -1;//�����ƶ�ƫ����
    this.alpha = 1; //͸����
    this.color1 = "";//���ǵ�ɫ��
    this.color2 = ""; //���ǵ�ɫ��
    /****************��ʼ������********************/
    this.init = function () //��ʼ��
    {
        this.getPos();
        this.alpha = 1;//͸����
        this.getRandomColor();
        //��С���ȣ���󳤶�
        var x = Math.random() * 80 + 150;
        this.length = Math.ceil(x);
        // x = Math.random()*10+30;
        this.angle = 30; //������б��
        x = Math.random() + 0.5;
        this.speed = Math.ceil(x); //���ǵ��ٶ�
        var cos = Math.cos(this.angle * 3.14 / 180);
        var sin = Math.sin(this.angle * 3.14 / 180);
        this.width = this.length * cos; //������ռ����
        this.height = this.length * sin;//������ռ�߶�
        this.offset_x = this.speed * cos;
        this.offset_y = this.speed * sin;
    }
    /**************��ȡ�����ɫ����*****************/
    this.getRandomColor = function () {
        var a = Math.ceil(255 - 240 * Math.random());
        //�ж���ɫ
        this.color1 = "rgba(" + a + "," + a + "," + a + ",1)";
        //������ɫ
        this.color2 = "black";
    }
    /***************���¼�����������ĺ���******************/
    this.countPos = function ()//
    {
        //�������ƶ�,x���٣�y����
        this.x = this.x - this.offset_x;
        this.y = this.y + this.offset_y;
    }
    /*****************��ȡ�������ĺ���*****************/
    this.getPos = function () //
    {
        //������200--1200
        this.x = Math.random() * window.innerWidth; //���ڸ߶�
        //������С��600
        this.y = Math.random() * window.innerHeight; //���ڿ���
    }
    /****��������***************************/
    this.draw = function () //����һ�����ǵĺ���
    {
        context.save();
        context.beginPath();
        context.lineWidth = 1; //����
        context.globalAlpha = this.alpha; //����͸����
        //�������򽥱���ɫ,����������յ�����
        var line = context.createLinearGradient(this.x, this.y,
            this.x + this.width,
            this.y - this.height);
        //�ֶ�������ɫ
        line.addColorStop(0, "white");
        line.addColorStop(0.3, this.color1);
        line.addColorStop(0.6, this.color2);
        context.strokeStyle = line;
        //���
        context.moveTo(this.x, this.y);
        //�յ�
        context.lineTo(this.x + this.width, this.y - this.height);
        context.closePath();
        context.stroke();
        context.restore();
    }
    this.move = function () {
        //�����������
        var x = this.x + this.width - this.offset_x;
        var y = this.y - this.height;
        context.clearRect(x - 3, y - 3, this.offset_x + 5, this.offset_y + 5);
        // context.strokeStyle="red";
        // context.strokeRect(x,y-1,this.offset_x+1,this.offset_y+1);
        //���¼���λ�ã��������ƶ�
        this.countPos();
        //͸��������
        this.alpha -= 0.002;
        //�ػ�
        this.draw();
    }
}

//��������
function playRains() {

    for (var n = 0; n < rainCount; n++) {
        var rain = rains[n];
        rain.move();//�ƶ�
        if (rain.y > window.innerHeight) {//�������޺�����
            context.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height);
            rains[n] = new MeteorRain();
            rains[n].init();
        }
    }
    setTimeout("playRains()", 2);
}

/*���������*/
