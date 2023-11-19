import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions , setQuestions] = useState([])

  useEffect(()=>{
    fetch (" http://localhost:4000/questions")
    .then (res=>res.json())
    .then ((questions)=>{
      setQuestions(questions);
    });
  },[])

  function handleDeleteClick(id){
    fetch (`http://localhost:4000/questions/${id}` , {
      method: "DELETE",
    })
    .then(res=>res.json())
    .then(()=>{
      const updatedQuestions = questions.filter((item) > item.id !== id);
      setQuestions(updatedQuestions)
    })
  }

  function handleAnswerChange(id , correctIndex){
    fetch (`http://localhost:4000/questions/${id}` , {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex })
    })
    .then(res=> res.json())
    .then((updatedQuestion)=> {
        const updatedQuestions = questions.map((item) => {
        if (item.id === updatedQuestion.id) return updatedQuestion;
        return item;
    });
    setQuestions(updatedQuestions);
  });
  }

  const questionItems = questions.map((item)=> (
    <QuestionItem
    key = {item.id}
    question = {item}
    onDeleteClick = {handleDeleteClick}
    onAnswerChange = {handleAnswerChange}/>
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
