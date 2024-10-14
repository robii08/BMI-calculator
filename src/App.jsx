import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const BMICalculator = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState();
  const [bmiDescription, setBmiDescription] = useState('');
  const [bmiColor, setBmiColor] = useState('white');
  const [gif, setGif] = useState('../image/think.png'); // Default GIF

  const calculateBMI = () => {
    // Validate inputs
    if (!calculate(age, 'age') || !calculate(height, 'height') || !calculate(weight, 'weight')) {
      return;
    }

    // Calculate BMI
    const heightMeters = parseFloat(height) / 100;
    const bmiValue = parseFloat(weight) / (heightMeters * heightMeters);
    setBmi(bmiValue.toFixed(1));

    // Determine BMI description, color, and GIF
    let bmiDescription = '';
    let bmiColor = '';
    let gifUrl = '';

    if (bmiValue < 18.5) {
      bmiDescription = 'Underweight: Your BMI is below the normal weight range for your height.';
      bmiColor = 'var(--underweight)';
      gifUrl = '../image/skinny.png'; // Underweight GIF
    } else if (bmiValue >= 18.5 && bmiValue <= 25) {
      bmiDescription = 'Normal: Your body weight is considered healthy.';
      bmiColor = 'var(--normal)';
      gifUrl = '../image/healthy.gif'; // Normal weight GIF
    } else if (bmiValue > 25 && bmiValue <= 30) {
      bmiDescription = 'Overweight: Your body weight is higher than the healthy range.';
      bmiColor = 'var(--overweight)';
      gifUrl = '../image/gif.gif'; // Overweight GIF
    } else {
      bmiDescription = 'Obese: Your body weight is significantly higher than the healthy range.';
      bmiColor = 'var(--obese)';
      gifUrl = '../image/gif.gif'; // Obese GIF
    }

    // Update state with calculated values
    setBmiDescription(bmiDescription);
    setBmiColor(bmiColor);
    setGif(gifUrl); // Update GIF based on BMI category
  };

  const handleReset = () => {
    // Reset all state values
    setAge('');
    setHeight('');
    setWeight('');
    setBmi(0);
    setBmiDescription('N/A');
    setBmiColor('white');
    setGif('../image/default.gif'); // Reset to default GIF
  };

  const calculate = (value, name) => {
    if (value === '' || isNaN(value)) {
      alert(`Please enter a valid ${name}.`);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className='container-fluid bg-dark bg-opacity-75 pt-5' style={{ height: '100vh' }}>
        <h1 className='text-center text-light py-4'>BMI Calculator</h1>
        <div className='row bg-dark bg-opacity-50 m-4'>
          <div className='col-md-4 pt-5'>
            <div className='scale d-flex flex-column justify-content-center align-items-center'>
              <div style={{ color: 'var(--underweight)', textAlign: 'center', fontStyle: 'italic', fontWeight: 'bolder' }} className='text-center p-2'>
                <h4>Underweight</h4>
                <p>&lt; 18.5</p>
              </div>
              <div style={{ color: 'var(--normal)', textAlign: 'center', fontStyle: 'italic', fontWeight: 'bolder' }} className='text-center p-2'>
                <h4>Normal</h4>
                <p>18.5 - 25</p>
              </div>

              <div style={{ color: 'var(--overweight)', textAlign: 'center', fontStyle: 'italic', fontWeight: 'bolder' }} className='text-center p-2'>
                <h4>Overweight</h4>
                <p>25 - 30</p>
              </div>

              <div style={{ color: 'var(--obese)', textAlign: 'center', fontStyle: 'italic', fontWeight: 'bolder' }} className='text-center p-2'>
                <h4>Obese</h4>
                <p>&gt; 30</p>
              </div>
            </div>
          </div>

          <div className='col-md-4 d-flex flex-column justify-content-center align-items-center'>
            <img src={gif} alt='BMI Image' className='img-fluid mb-4' style={{ maxWidth: '100%', height: '200px' }} />
            <div className='output text-center'>
              <p id='BMI' style={{ color: bmiColor, fontSize: '50px', fontWeight: '600' }}>{bmi}</p>
              <p id='des' style={{ color: bmiColor }}>{bmiDescription}</p>
            </div>
          </div>

          <div className='col-md-4 d-flex flex-column justify-content-center align-items-center'>
            <form className='container p-5'>
              <div className='mb-3 text-light d-flex justify-content-between px-5 '>
                <div>
                  <input className="form-check-input me-2" type="radio" name="flexRadioDefault" id="radio1" />
                  <label className="form-check-label">Male</label>
                </div>
                <div>
                  <input className="form-check-input me-2" type="radio" name="flexRadioDefault" id="radio2" />
                  <label className="form-check-label">Female</label>
                </div>
              </div>

              <div className='mb-3'>
                <label className='text-light mb-1 ms-2'>Age:</label>
                <input
                  type='number'
                  onChange={(e) => setAge(e.target.value)}
                  placeholder='Age'
                  className='form-control bg-dark text-light'
                  name='age'
                  value={age}
                />
              </div>

              <div className='mb-3'>
                <label className='text-light mb-1 ms-2'>Height:</label>
                <input
                  type='number'
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder='Height (cm)'
                  className='form-control bg-dark text-light'
                  name='height'
                  value={height}
                />
              </div>

              <div className='mb-3'>
                <label className='text-light mb-1 ms-2'>Weight:</label>
                <input
                  type='number'
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder='Weight (kg)'
                  className='form-control bg-dark text-light'
                  name='weight'
                  value={weight}
                />
              </div>

              <div className='d-flex justify-content-between mt-4'>
                <button type='button' className='btn btn-outline-success w-50 me-4' onClick={calculateBMI}>Calculate</button>
                <button type='button' className='btn btn-outline-danger w-50 ms-4' onClick={handleReset}>Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BMICalculator;

