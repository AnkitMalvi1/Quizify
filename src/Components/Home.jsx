import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Chip } from 'primereact/chip';
import user from "../statics/user.png";
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import data from "./data";
import { FaRegArrowAltCircleRight } from "react-icons/fa";


const Home = () => {

  const [loader,setLoader] = useState(true);
  const admin = localStorage.getItem("User").split('@')[0].toUpperCase();


  useEffect(() => {
      const timer = setTimeout(() => {
          setLoader(false);
      }, 400);

      return () => {
          clearTimeout(timer);
      };
  }, []);

  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
    

  useEffect(() => {
    const storedScore = localStorage.getItem('Score');

    if (storedScore) {
      setScore(parseInt(storedScore, 10));
    }
    
  }, []);

  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const currentData = data[currentDataIndex];

  const [selectedButton, setSelectedButton] = useState(null);
  const correctAnswerIndex = currentData.options.indexOf(currentData.answer); 

  // console.log(currentData.options);

  // console.log(correctAnswerIndex);
  // console.log(currentData.answer);
  // console.log(currentData.options.indexOf(currentData.answer)===currentData.answer);
  
  
  // console.log(score);
  const load = () => {
      setLoading(true);

      setTimeout((buttonIndex) => {
          localStorage.setItem("Score",`${score+1}`);
          setLoading(false);
          if(selectedButton === correctAnswerIndex) setScore(score+1);
          else setScore(score-1);
      }, 500);

      localStorage.setItem("SubmitDisabled","True");

      const buttonDisabled = () => {
          setButtonDisabled(false);

          const nextDay = new Date();
          nextDay.setDate(nextDay.getDate() + 1);
          const millisecondsUntilNextDay = nextDay - new Date();
          
          setTimeout(() => {
          setButtonDisabled(false);
          }, millisecondsUntilNextDay);
      };
      buttonDisabled();
      resultFunc();
  };

  
  
    
  useEffect(()=>{
    if(localStorage.getItem("SubmitDisabled")) {
      setButtonDisabled(true);

      const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        const millisecondsUntilNextDay = nextDay - new Date();
        
        setTimeout(() => {
        setButtonDisabled(false);
        }, millisecondsUntilNextDay);
    }
  },[])

    
  // const {question} = data[2];
  // const {options} = data[2];
  // const {answer} = data[2];

  

  

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
    setButtonDisabled(false);
  };

  const getButtonStyle = () =>{
    const getButtonStyleForColor = (buttonIndex) => {
        if (selectedButton !== null) {
          if (buttonIndex === correctAnswerIndex) {
            return 'green'; 
          } else if (buttonIndex === selectedButton) {
            return 'red';
          } else {
            return '#fff'; 
          }
        }
      };
      getButtonStyleForColor();
  }
  const getButtonStyleForColor = (buttonIndex) => {
    if (selectedButton !== null) {
      if (buttonIndex === correctAnswerIndex) {
        return 'green'; 
      } else if (buttonIndex === selectedButton) {
        return 'red'; 
      } else {
        return '#fff'; 
      }
    }
  } 


  const rightSwipe = () => {
    const newIndex = (currentDataIndex + 1) % data.length;
    setCurrentDataIndex(newIndex);
    setButtonDisabled(true);
    setSelectedButton(null);
  };

    

    // const [showresult,setShowresult] = useState([]);

    const url = process.env.URL;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.API_KEY,
		'X-RapidAPI-Host': process.env.HOST
	    }
    };

    const resultFunc = async() =>{
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const {data} = result;
            console.log(data);
        } catch (error){
            console.error(error);
        }
    }
    // resultFunc();

    
    // console.log(category);

    return (
        (loader) ? <Loader/> :
        <div className='home'>
            <section className="profile">
                <Chip label={admin} image={user} style={{backgroundColor: "#8EC5FC",backgroundImage: "linear-gradient(62deg, #8ec5fc9c 0%, #e0c3fca6 100%)",boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",fontWeight:"bolder"}} className="profile" />
            </section>
            <section className="scoreattempts">
                <h2 className="score">Score:<span id="score-value">{score}</span></h2>
                <Tag severity="info" value="Quiz of the Day" className="attempts"></Tag>
            </section>
            <section className="main">
                <div className="catmain">
                    <h3 className="category">Category:</h3>
                    <Tag className="categorytag" style={{ border: "1px solid blue", background: "rgba(0, 0, 255, 0.2)", borderRadius: "1rem", color: "blue" }}>{currentData.category}</Tag>
                </div>
                <Card className="question" title={currentData.question} >
                        <section className="options">
                        {[0, 1, 2, 3].map((buttonIndex) => (
                            <Button
                            key={buttonIndex}
                            onClick={() => handleButtonClick(buttonIndex)}
                            style={{
                              backgroundColor: getButtonStyleForColor(buttonIndex),
                              color: getButtonStyle(buttonIndex),
                              pointerEvents: selectedButton !== null ? 'none' : 'auto',
                            }}
                            disabled={selectedButton !== null}><li>{currentData.options[buttonIndex]}</li></Button>
                            ))}
                        </section>
                        <div className="card flex flex-wrap justify-content-center gap-3">
                        <Button label="Submit" icon="pi pi-check" loading={loading} onClick={load} className="next" disabled={isButtonDisabled}/>
                        </div>
                </Card> 
                <div className="rightArrowDiv">
                    <FaRegArrowAltCircleRight className="rightArrow" onClick={rightSwipe}/> 
                </div>
            </section>
        </div>
    )
}

export default Home

