$(document).ready(function () {
  $(function () { objectFitImages(); });
  $(".animsition-overlay").animsition({
    inClass: 'overlay-slide-in-top',
    outClass: 'overlay-slide-out-top',
    inDuration: 600,
    outDuration: 200,
    linkElement: '.animsition-link',
    loading: true,
    loadingParentElement: 'body',
    loadingClass: 'animsition-loading',
    loadingInner: '',
    timeout: false,
    timeoutCountdown: 100,
    onLoadEvent: true,
    browser: ['animation-duration', '-webkit-animation-duration'],
    overlay: true,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'body',
    transition: function (url) { window.location.href = url; }
  });
});


var count = 0;
function populate() {
  if (quiz.questions != "") {
    quess = quiz.getQuestionIndex();
    qz = quess.text;
    chs = quess.choices;
    ans = quess.answer;
    console.log(count);
  } else if (quiz.questions == "") {
    showScores();
  }

  if (quiz.isEnded()) {
    showScores();
  }

  if (count == 5 || count == 10 || count == 14) {
    showStop();
  }

  if (count == 15) {
    showScores();
  }

  else {
    count += 1;
    if ($(".option").hasClass("active")) {
      $(".option").removeClass("active");
    }
    // show question
    var element = document.getElementById("question");
    element.innerHTML = qz;
    function time() {
      var timeleft, time;
      timeleft = time = 15;
      $("#time").html(timeleft);
      $("#time").fadeTo("slow", 1);
      var i = 0;
      remainingtime = setInterval(function () {
        $("#time").html(timeleft);
        timeleft -= 1;
        i += 1;
        if (timeleft <= 0 && i >= time) {
          clearInterval(remainingtime);
          $("#time").html("Time Out!");
        }
      }, 1000);
    }

    // setTimeout(time, 5000)

    // show options
    for (var i = 0; i < chs.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = chs[i];
      guess("btn" + i, chs[i]);
      $(".show").removeClass("active");
      document.getElementById("money").style.display = "none";
      document.getElementById("btn0").style.animation = "none";
      document.getElementById("btn1").style.animation = "none";
      document.getElementById("btn2").style.animation = "none";
      document.getElementById("btn3").style.animation = "none";
      document.getElementById("btn0").style.display = "block";
      document.getElementById("btn1").style.display = "block";
      document.getElementById("btn2").style.display = "block";
      document.getElementById("btn3").style.display = "block";
    }
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  var answer = ans;
  button.onclick = function () {
    if ($(".option").hasClass("active")) {
      $(".option").removeClass("active");
    }
    $(this).toggleClass("active");
    quiz.guess(guess);
    setTimeout(populate, 5000)
    if (button.childNodes[1].innerText == answer) {
      document.getElementById(button.id).style.animation = "color-animation 0.2s infinite linear alternate";
      var audio = document.getElementById("correct");
      audio.play();
      document.getElementById("money").style.display = "block";
      $(".show").addClass("active");
      $(".moneyList .moneyList__item").removeClass("active");
      showProgress();
      if (quiz.questions != "") {
        removedIndx = quiz.questions.indexOf(quess);
        while (removedIndx > -1) {
          quiz.questions.splice(removedIndx, 1);
          removedIndx = quiz.questions.indexOf(quess);
        }
        console.log(quess);
        console.log(quiz.questions);
      } else {

      }
    } else {
      document.getElementById("myModal").style.display = "flex";
      var audio = document.getElementById("wrong");
      audio.play();
    }
  }
  // $(".hideQues").click(function () {
  //   var $ele = $('.option');
  //   var hide = "";
  //   var answer = ans;
  //   btn0 = document.getElementById("btn0");
  //   btn1 = document.getElementById("btn1");
  //   btn2 = document.getElementById("btn2");
  //   btn3 = document.getElementById("btn3");
  //   if (answer == btn0.childNodes[1].innerText || answer == btn1.childNodes[1].innerText) {
  //     hide = $ele.eq(Math.floor(Math.random() * ($ele.length - 2)) + 2).attr('id');
  //     document.getElementById(hide).style.display = "none";
  //   } else if (answer == btn2.childNodes[1].innerText || answer == btn3.childNodes[1].innerText) {
  //     hide = $ele.eq(Math.floor(Math.random() * ($ele.length - 2))).attr('id');
  //     document.getElementById(hide).style.display = "none";
  //   }
  // });
};



function showProgress() {
  var currentQuestionNumber = quiz.questionIndex;
  var element = document.getElementById(currentQuestionNumber);
  element.classList.add("active");
};

function showScores() {
  document.getElementById("modal1").style.display = "flex";
  var audio = document.getElementById("end");
  audio.play();
};

function showStop() {
  document.getElementById("modal2").style.display = "flex";
  var audio = document.getElementById("end");
  audio.play();
};
$('#closemodal').click(function () {
  setTimeout(function () {
    document.getElementById("modal2").style.display = "none";
    $(".animsition-overlay-slide").removeClass("overlay-slide-out-top");
    $(".animsition-overlay-slide").addClass("overlay-slide-in-top");
  }, 1000);
});

// create questions
var questions = [
  new Question("Nguyễn minh bá là ai?", ["sinh viên đại học", "lao công", "giúp việc", "doanh nhân"], "sinh viên đại học"),
  new Question("Nguyễn minh bá sinh năm bao nhiêu?", ["04/12/2004", "22/10/2004", "02/07/2004", "10/02/2004"], "04/12/2004"),
  new Question("Đầu Thị Cẩm Ly quê ở đâu?", ["nghĩa đàn", "quỳnh lưu", "quỳ hợp", "tp vinh"], "nghĩa đàn"),
  new Question('Nhân vật chị Dậu trong tác phẩm "Tắt Đèn" của Ngô Tất Tố có tên thật là gì?', ["Lê Thị Đào", "Lê Thị Mai", "Lê Thị Xuân", "Lê Thị Lan"], "Lê Thị Đào"),
  new Question('Theo một câu hát thì: "Ba thương con vì con giống mẹ. Mẹ thương con thì con giống ..." ai?', ["Ông hàng xóm", "Chú cạnh nhà", "Ba", "Bác đầu ngõ"], "Ba"),
  new Question('Bảy chú lùn trong truyện cổ tích "Nàng Bạch Tuyết và bảy chú lùn" làm nghề gì?', ["Thợ rèn", "Thợ mỏ", "Thợ săn", "Thợ may"], "Thợ mỏ"),
  new Question('Đâu là tên 1 loại mũ?', ["Lưỡi hái", "Lưỡi trai", "Lưỡi lê", "Lưỡi rắn"], "Lưỡi trai"),
  new Question('Đâu là tên một loại bánh Huế?', ["Khoái", "Sướng", "Thích", "Vui"], "Khoái"),
  new Question('Nhạc sĩ nào là người sáng tác ca khúc "Cây đàn sinh viên"?', ["Bảo Chấn", "Trịnh Công Sơn", "Quốc An", "Trần Tiến"], "Quốc An"),
  new Question('Thành viên đầu tiên gia nhập vào băng hải tặc Mũ Rơm là ai?', ["Zoro", "Nami", "Sanji", "Usopp"], "Zoro"),
  new Question('Tên tiếng Nhật của băng hải tặc mũ rơm là gì?', ["Mugshiwara", "Muguwara", "Mugiwara", "Moguwari"], "Mugiwara"),
  new Question('Tác giả của truyện Vua Hải Tặc là ai?', ["Eiichiro Oda", "Masashi Kishimoto", "Yoshihiro Togashi", "Rumiko Takahashi"], "Eiichiro Oda"),
  new Question('Có 1 ông đi săn, ổng đi vào 3 cái hang. Hang 1 ông ấy gặp một con ma, hang 2 ông gặp trái cà, hang 3 ông gặp một con rồng. Hỏi hang thứ tư ông gặp con gì?', ["Cương thi", "Ma cà tưng", "Ma cà rồng", "Ai biết!"], "Ai biết!"),
  new Question('Có cách nào xếp 5 que diêm thành 11 hình tam giác không?', ["Xếp được", "Không xếp được", "Bẻ nhỏ que diêm ra", "Xếp được có 1 hình"], "Xếp được"),
  new Question('Nằm giữa Thái Bình Dương là gì?', ["Nước", "Cá", "Bình", "Ai biết"], "Bình"),
  new Question('1 người đi vào rạp chiếu phim gặp 1 con hổ chết, hỏi tại sao người đó quay về?', ["Sợ hãi khi nhìn thấy xác con hổ", "Mất vé", "Quên đồ ở nhà", "Hết chỗ"], "Hết chỗ"),
  new Question('Có một người đàn bà nọ đinh đi mua mèo về nuôi. Bỗng nhìn thấy cái bàn hình tròn, bà quay vào trong nhà. Bà đã biết trước được điều gì?', ["Ở đây không bán mèo", "Bà không hợp với mèo", "Bà không thể đến cửa hàng mua mèo", "Bà bận bưng bàn vào nhà"], "Ở đây không bán mèo"),
  new Question('Con gì bỏ cái đuôi thành con ngựa?', ["Con mèo", "Con hổ", "Con bò", "Con Khỉ"], "Con mèo"),
  new Question('Cái gì chứa nhiều nước nhất mà ko ướt tí ti nào?', ["Giếng nước", "Cái bát", "Bản đồ", "Đám mây"], "Bản đồ"),
  new Question('Cái gì khi xài thì quăng đi, không xài thì lấy lại?', ["Tiền", "Cái neo thuyền", "Bóng chuyền", "Cục đá"], "Cái neo thuyền"),
];


// create quiz
quiz = new Quiz(questions);
// display quiz
populate();

$(".show").click(function () {
  $("#money").toggle("fast");
  $(this).toggleClass("active");
});

$(".menu__right .hideQues").click(function () {
  if ($(this).hasClass("delete")) {

  } else {
    youSure();
  }
});

$(".menu__right .callDue").click(function () {
  if ($(this).hasClass("delete")) {

  } else {
    callDue();
  }
});

$(".menu__right .choseViewer").click(function () {
  if ($(this).hasClass("delete")) {

  } else {
    choseViewer();
  }
});

function youSure() {
  document.getElementById("modal3").style.display = "flex";
  $("#sure").css("display", "inline-block");
  $("#call").css("display", "none");
  $("#viewer").css("display", "none");
}
function callDue() {
  document.getElementById("modal3").style.display = "flex";
  $("#sure").css("display", "none");
  $("#call").css("display", "inline-block");
  $("#viewer").css("display", "none");
}
function choseViewer() {
  document.getElementById("modal3").style.display = "flex";
  $("#sure").css("display", "none");
  $("#call").css("display", "none");
  $("#viewer").css("display", "inline-block");
}
$('#notSure').click(function () {
  setTimeout(function () {
    document.getElementById("modal3").style.display = "none";
    $(".animsition-overlay-slide").removeClass("overlay-slide-out-top");
    $(".animsition-overlay-slide").addClass("overlay-slide-in-top");
  }, 1000);
});
$('#sure').click(function () {
  actionBtn("hideQues");
  hideQuest();
});
$('#call').click(function () {
  actionBtn("callDue");
  var result = '';
  var sound = ["a", "b", "c", "d"];
  result = sound[Math.floor(Math.random() * sound.length)];
  setTimeout(function () {
    var audio = document.getElementById("answ" + result + "");
    audio.play();
  }, 2000);
});
$('#viewer').click(function () {
  actionBtn("choseViewer");
  setTimeout(function () {
    document.getElementById("modal4").style.display = "flex";
  }, 1000);
  var licount = $(".listAns .listAns__item .listAns__row").length;
  var randomnumber = Math.floor(Math.random() * (licount + 1));
  var randomnumber1 = Math.floor(Math.random() * (licount + 1));
  var randomnumber2 = Math.floor(Math.random() * (licount + 1));
  var randomnumber3 = Math.floor(Math.random() * (licount + 1));
  $(".listAns .listAns__item:nth-child(" + randomnumber + ") .listAns__row").addClass("r50");
  $(".listAns .listAns__item:nth-child(" + randomnumber1 + ") .listAns__row").addClass("r30");
  $(".listAns .listAns__item:nth-child(" + randomnumber2 + ") .listAns__row").addClass("r10");
  $(".listAns .listAns__item:nth-child(" + randomnumber3 + ") .listAns__row").addClass("r10");
  setTimeout(function () {
    document.getElementById("modal4").style.display = "none";
  }, 10000);
});

function actionBtn(txt) {
  $("." + txt).addClass("delete");
  $("." + txt).attr("disabled", "disabled");
  setTimeout(function () {
    document.getElementById("modal3").style.display = "none";
    $(".animsition-overlay-slide").removeClass("overlay-slide-out-top");
    $(".animsition-overlay-slide").addClass("overlay-slide-in-top");
  }, 1000);
}

function hideQuest() {
  var quess = quiz.getQuestionIndex();
  var chs = quess.choices;
  for (var i = 0; i < chs.length; i++) {
    var $ele = $('.option');
    var hide = "";
    var answer = ans;
    btn0 = document.getElementById("btn0");
    btn1 = document.getElementById("btn1");
    btn2 = document.getElementById("btn2");
    btn3 = document.getElementById("btn3");
    if (answer == btn0.childNodes[1].innerText || answer == btn1.childNodes[1].innerText) {
      hide = $ele.eq(Math.floor(Math.random() * ($ele.length - 2)) + 2).attr('id');
      document.getElementById(hide).style.display = "none";
    } else if (answer == btn2.childNodes[1].innerText || answer == btn3.childNodes[1].innerText) {
      hide = $ele.eq(Math.floor(Math.random() * ($ele.length - 2))).attr('id');
      document.getElementById(hide).style.display = "none";
    }
  }
};

function play() {
  var audio = document.getElementById("audio");
  audio.play();
}

$(document).keydown(function (event) {
  if (event.keyCode == 123) { // Prevent F12
    return false;
  } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
    return false;
  }
});
document.addEventListener('contextmenu', event => event.preventDefault());