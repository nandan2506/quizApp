const questionModel = require("../models/question.model")


const allQuestions = async (req, res) => {
    try {
        const questions = await questionModel.find().select("-correctOpt");

        if (questions.length === 0) {
            return res.status(200).json({ message: 'no question found' });
        }

        return res.status(200).json({
            message: 'all questions fetched',
            questions
        });

    } catch (error) {
        console.log("error while fetching questions", error);
        return res.status(500).json({ message: 'something went wrong' });
    }
};


const checkAnswers = async (req, res) => {
    try {
        let score = 0;
const details = [];
const ans = req.body.answers;
const allQues = await questionModel.find();

allQues.forEach(q => {
    const qId = q._id.toString();
    const userAnswer = ans[qId] ?? null;
    const isCorrect = userAnswer === q.correctOpt;

    if (userAnswer === null) {
        // skipped → no marks
    } else if (isCorrect) {
        score += 1; // full marks for correct
    } else {
        score -= 0.25; // negative marking for wrong
    }

    details.push({
        questionId: qId,
        text: q.text,
        options: q.options,       // include options for frontend
        correctAnswer: q.correctOpt,
        userAnswer,
        correct: isCorrect
    });
});
;

        return res.status(200).json({
            message: 'All answers checked successfully',
            score,
            total: allQues.length,
            details
        });

    } catch (error) {
        console.log('error while checking answers', error);
        return res.status(500).json({ message: 'something went wrong' });
    }
};


module.exports = { allQuestions, checkAnswers }