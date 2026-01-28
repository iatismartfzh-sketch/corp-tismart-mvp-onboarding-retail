export interface TrainingCapsule {
  id: string;
  title: string;
  content: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}