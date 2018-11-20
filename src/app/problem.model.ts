
export class Problem {
  private question: string;
  private answer: string;
  private difficulty: string;
  private choices: string[];
  private correctResponse: string;
  private incorrectResponse: string;
  constructor(question: string, choices: string[], answer: string){
    this.question = question;
    this.answer = answer;
    this.choices = choices;
    this.difficulty = "easy"; //unless otherwise specified
    this.correctResponse = "Correct!"; //unless otherwise specified
    this.incorrectResponse = "Incorrect! Try again!"; //unless otherwise specified
  }

  modifyQuestion(question: string){
    this.question = question;
  }

  getCorrectResponse(){
    return this.correctResponse;
  }

  setCorrectResponse(response: string){
    this.correctResponse = response;
  }

  getIncorrectResponse(){
    return this.incorrectResponse;
  }

  setIncorrectResponse(response: string){
    this.incorrectResponse = response;
  }

  getQuestion(): string{
    return this.question;
  }

  modifyAnswer(answer: string){
    this.answer = answer;
  }

  getAnswer(): string{
    return this.answer;
  }

  modifyChoices(choices: string[]){
    this.choices = choices;
  }

  getChoices(): string[]{
    return this.choices;
  }

}
