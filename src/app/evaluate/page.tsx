
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const salahAnswers = [
  "kayanya engga deh 🤔",
  "bukan gua ini mah 🙅‍♀️",
  "coba lagi! 😡",
];

const questions = [
  {
    id: "q1",
    text: "Seberapa NPD partner-mu?",
    options: [
      { id: "q1o1", text: "Sangat banget", isCorrect: false },
      { id: "q1o2", text: "Pake nanya 🙄", isCorrect: false },
      { id: "q1o3", text: "B aja", isCorrect: false },
      { id: "q1o4", text: "Engga NPD kok 😇", isCorrect: true },
    ],
    layout: "grid",
  },
  {
    id: "q2",
    text: "Seberapa humoris partnermu?",
    options: [
      { id: "q2o1", text: "B aja", isCorrect: false },
      { id: "q2o2", text: "hmzzz 😒", isCorrect: false },
      { id: "q2o3", text: "FREAKKK 🤪", isCorrect: false },
      {
        id: "q2o4",
        text: "Sangat humoris mengocok perut xixixix 🤣",
        isCorrect: true,
      },
    ],
    layout: "grid",
  },
  {
    id: "q3",
    text: "tempat mana yang jadi favoritmu selama kita lomba?",
    subtitle: "(Jawab dengan jujur)",
    options: [
      { id: "q3o1", text: "rain dist", isCorrect: true },
      { id: "q3o2", text: "HILANG ARAH", isCorrect: true },
      { id: "q3o3", text: "GG ajh biar hemat", isCorrect: true },
      { id: "q3o4", text: "tikum", isCorrect: true },
    ],
    layout: "grid",
  },
];

export default function EvaluatePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [randomSalah, setRandomSalah] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Pre-select a random message when the component mounts or question changes
    setRandomSalah(salahAnswers[Math.floor(Math.random() * salahAnswers.length)]);
  }, [currentQuestionIndex]);

  const handleValueChange = (questionId: string, value: string) => {
    if (isAnimating || correctAnswer || wrongAnswer) return;

    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    const selectedOption = question.options.find((o) => o.id === value);
    if (!selectedOption) return;

    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    if (selectedOption.isCorrect) {
      setCorrectAnswer(value);
      setIsAnimating(true);
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setCorrectAnswer(null);
        } else {
          setIsFinished(true);
        }
        setIsAnimating(false);
      }, 1500);
    } else {
      toast({
        title: "Jawaban Salah!",
        description: randomSalah,
        variant: "destructive",
      });
      setWrongAnswer(value);
      setTimeout(() => {
        setWrongAnswer(null);
        setAnswers((prev) => {
          const newAnswers = { ...prev };
          delete newAnswers[questionId];
          return newAnswers;
        });
         // Get a new random message for the next wrong attempt
        setRandomSalah(salahAnswers[Math.floor(Math.random() * salahAnswers.length)]);
      }, 1500);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background transition-colors duration-500">
      <div className="glowing-card w-full max-w-md md:max-w-2xl rounded-xl">
        <div className="glowing-card-content">
          <Card className="w-full bg-card/80 backdrop-blur-sm border-white/10">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-2xl md:text-3xl text-center font-headline text-primary">
                Let's Evaluate Your Partner!
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[300px] flex flex-col justify-center p-4 md:p-8">
              {!isFinished ? (
                <div
                  key={currentQuestionIndex}
                  className={cn(
                    "space-y-6 animate-in fade-in-50",
                    isAnimating &&
                      currentQuestionIndex < questions.length - 1 &&
                      "animate-out fade-out-50"
                  )}
                >
                  <div>
                    <h3 className="mb-2 text-lg md:text-xl font-medium font-body text-foreground/90 text-center">
                      {currentQuestion.text}
                    </h3>
                    {currentQuestion.subtitle && (
                      <p className="mb-4 text-center text-sm text-muted-foreground">
                        {currentQuestion.subtitle}
                      </p>
                    )}
                    <div className="h-6 text-center mb-2" />
                    <RadioGroup
                      value={answers[currentQuestion.id] || ""}
                      onValueChange={(value) =>
                        handleValueChange(currentQuestion.id, value)
                      }
                      className={cn(
                        "space-y-3",
                        currentQuestion.layout === "grid" &&
                          "grid grid-cols-1 sm:grid-cols-2 gap-4 space-y-0"
                      )}
                    >
                      {currentQuestion.options.map((option) => (
                        <div
                          key={option.id}
                          onClick={() =>
                            handleValueChange(currentQuestion.id, option.id)
                          }
                          data-correct={correctAnswer === option.id}
                          data-wrong={wrongAnswer === option.id}
                          data-selected={
                            answers[currentQuestion.id] === option.id
                          }
                          className={cn(
                            "flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-300 bg-black/20",
                            !correctAnswer &&
                              !wrongAnswer &&
                              "hover:bg-white/10 cursor-pointer border-transparent hover:border-primary/50",
                            (correctAnswer || wrongAnswer) &&
                              "cursor-default border-transparent",
                            correctAnswer === option.id &&
                              "!border-green-500 bg-green-500/20",
                            correctAnswer &&
                              correctAnswer !== option.id &&
                              "opacity-50",
                            wrongAnswer === option.id &&
                              "animate-shake border-destructive bg-destructive/20"
                          )}
                        >
                          <RadioGroupItem
                            value={option.id}
                            id={option.id}
                            disabled={!!correctAnswer || !!wrongAnswer}
                          />
                          <Label
                            htmlFor={option.id}
                            className={cn(
                              "font-body text-sm md:text-base w-full",
                              !(correctAnswer || wrongAnswer) && "cursor-pointer"
                            )}
                          >
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-in fade-in-0 zoom-in-95 duration-500">
                  <p className="text-xl md:text-2xl font-headline text-primary">
                    Terima kasih sudah mengevaluasi! 🎉
                  </p>
                  <Link href="/finish" passHref>
                    <Button
                      size="lg"
                      className="font-body text-base md:text-lg bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform"
                    >
                      Lihat Hasilnya 🚀
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center p-4 md:p-6 pt-2">
              <div className="h-4">
                {!isFinished && (
                  <p className="text-sm text-muted-foreground font-code">
                    Pertanyaan {currentQuestionIndex + 1} dari{" "}
                    {questions.length}
                  </p>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
