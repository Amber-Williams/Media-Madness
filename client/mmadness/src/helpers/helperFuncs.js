import questionData from './questions.json';

const generateQuestion = () => {
  const filteredPickOne = questionData.blackCards
  .filter(quest => {
    if(quest.pick === 1){
      return quest;
    }
  });
  const question = filteredPickOne[ Math.floor(Math.random() * Math.floor(filteredPickOne.length-1))];

  return question;
}

export default {
  generateQuestion
}