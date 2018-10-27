
export class Problem {
  private question: string;
  private answer: string;
  private difficulty: string;
  private choices: string[];
  constructor(question: string, choices: string[], answer: string){
    this.question = question;
    this.answer = answer;
    this.difficulty = "easy"; //unless otherwise specified
  }

  modifyQuestion(question: string){
    this.question = question;
  }

  modifyAnswer(answer: string){
    this.answer = answer;
  }

  modifyChoices(choices: string[]){
    this.choices = choices;
  }

}
