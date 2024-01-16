import React, { useRef, useState } from 'react';
import {data} from '../utils/data';

export const Quiz = () => {

    const [index, setIndex]= useState(0);
    const [question, setQuestion]=useState(data[index]);
    const [lock, setLock]= useState(false);
    const [score,setScore]= useState(0);
    const [result, setResult]=useState(null)
    const option1=useRef(null);
    const option2=useRef(null);
    const option3=useRef(null);
    const option4=useRef(null);

    let option_array= [option1,option2,option3,option4];
    const checkAns=(e,ans)=>{

        if(!lock){
            if(question.correctAnswer===question.answerOptions[ans-1]){
                e.target.classList.add("bg-[#dffff2]", "border-[#00d379]");
                setLock(true); 
                setScore(score+1);           
            }
    
            else{
                e.target.classList.add("bg-[#FFEBEB]", "border-[#FF4A4A]");
                setLock(true);
                 
                option_array.map((o, index) => {
                    if (o.current.innerText === question.correctAnswer) {
                      o.current.classList.add("bg-[#dffff2]", "border-[#00d379]");
                    }
                    return null;
                  });             
                  

            }
        }
      
    }    

    const next = () => {
        if (lock) {

            if(index===data.length-1){
                setResult(true);
                return 0;   
            }
          setIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            setQuestion(data[newIndex]);
            setLock(false);
            option_array.forEach((option) =>
              option.current.classList.remove("bg-[#FFEBEB]", "border-[#FF4A4A]", "bg-[#dffff2]", "border-[#00d379]")
            );
            return newIndex;
          });
        }
      };

      const reset=()=>{
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
      }
      

  return (
    

    <div className='quiz ml-96 absolute top-28 w-[640px] bg-white text-gray-600 flex flex-col pt-10 px-12 rounded-lg gap-5 pb-3'>
      <h1 className='font-bold text-2xl text-black '>Quiz App</h1>
      <hr className='h-[2px] bg-gray-500 border-none' />

      {result? <></> :<>
      <h2 className='font-semibold text-black text-xl'>{question.id}. {question.question}</h2>
      
      <ul type="A">
        <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{question.answerOptions[0]}</li>
        <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{question.answerOptions[1]}</li>
        <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{question.answerOptions[2]}</li>
        <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{question.answerOptions[3]}</li>
      </ul>

      <button onClick={()=>next()}
      className='bg-gray-600 border-2 rounded-lg text-white w-[250px] h-16 mx-auto text-xl font-bold rounded-lg'>Next</button>
      <div className='mx-auto text-black'>{index+1} of {data.length} questions</div></>
      }

      {result? <>
      <h2 className="text-3xl text-black font-bold">You scored {score} out of {data.length}</h2>
      <button onClick={reset}
      className='bg-gray-600 border-2 rounded-lg text-white w-[250px] h-16 mx-auto text-xl font-bold rounded-lg'>reset</button></>:<></>}
      
    </div>
  );
};

export default Quiz;
