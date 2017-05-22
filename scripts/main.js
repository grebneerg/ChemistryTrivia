var fileNames = getFileNames();
var questionFiles = getQuestionsArrayFromFiles(fileNames);
var questions = createQuestions(questionFiles);
questions = shuffle(questions);

var qCurrent = 0;
var numCorrect = 0;
var numTotal = 0;

$(".ans").click(function() {
    numTotal++;
    ans = $(this).find("h4").html();
    if (ans == questions[qCurrent].correct) {
        numCorrect++;
        $("#incorrect").hide();
        $("#correct").show();
    } else {
        $("#correct").hide();
        $("#incorrect").show();
    }
    $("#score").html("Correct: " + (numCorrect / numTotal * 100).toFixed(2) + "%");
    qCurrent++;
    $("#qArea").hide();
});

$(".next").click(function() {
    $("#qArea").show();
    $(".result-msg").hide();
    showNextQuestion();
});

$("#playBtn").click(function() {
    $("#playBtn").hide();
    $("#qArea").show();
    showNextQuestion();
});

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var n = Math.floor(Math.random() * i);
        var temp = array[i];
        array[i] = array[n];
        array[n] = temp;
    }
    return array;
}

function showNextQuestion() {
    if (qCurrent < questions.length) {
        $("#qBody").html(questions[qCurrent].body);
        questions[qCurrent].choices = shuffle(questions[qCurrent].choices);
        for (var i = 0; i < questions[qCurrent].choices.length; i++) {
            $("#ans" + (i + 1)).html(questions[qCurrent].choices[i]);
        }
    } else {
        $("#qArea").hide();
        $("#finalScore").html("Correct: " + (numCorrect / numTotal * 100).toFixed(2) + "%");
        $("#finalScreen").show();
    }
}