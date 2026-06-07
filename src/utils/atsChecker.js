export const calculateATSScore = (resumeText, jobDescription) => {
  const resumeWords = resumeText.toLowerCase().split(/\W+/);
  const jobWords = jobDescription.toLowerCase().split(/\W+/);

  const uniqueJobWords = [...new Set(jobWords)];

  let matchedKeywords = [];

  uniqueJobWords.forEach((word) => {
    if (word.length > 3 && resumeWords.includes(word)) {
      matchedKeywords.push(word);
    }
  });

  const score = Math.min(
    100,
    Math.round((matchedKeywords.length / uniqueJobWords.length) * 100)
  );

  const missingKeywords = uniqueJobWords.filter(
    (word) => !matchedKeywords.includes(word) && word.length > 3
  );

  return {
    score,
    matchedKeywords,
    missingKeywords,
  };
};