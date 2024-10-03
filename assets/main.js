const dayIn = document.getElementById('dayIn');
const monthIn = document.getElementById('monthIn');
const yearIn = document.getElementById('yearIn');
const dayOut = document.getElementById('dayOut');
const monthOut = document.getElementById('monthOut');
const yearOut = document.getElementById('yearOut');
const calculateBtn = document.getElementById('calculateBtn');
const errorStyle = '0.5px solid #e44343';


calculateBtn.addEventListener('click', () => {
  const D = parseInt(dayIn.value);
  console.log(D);
  const M = parseInt(monthIn.value);
  const Y = parseInt(yearIn.value);
  const birthday = `${Y}-${M}-${D}`;
  console.log(birthday);

  if (validateDay() && validateMonth() && validateYear()) {
    console.log('Done');
  } else {
    return;
  }

  const birthDate = new Date(birthday);
  const currentDate = new Date();
  
  if (currentDate < birthDate) {
    alert("Birth date cannot be in the future");
    return;
  }

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    days += getNoOfDays(currentDate.getFullYear(), currentDate.getMonth());
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const timeDiff = currentDate.getTime() - birthDate.getTime();
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);


  dayOut.innerText = days;
  monthOut.innerText = months;
  yearOut.innerText = years;
  document.getElementById('hourOut').innerText = hours;
  document.getElementById('minuteOut').innerText = minutes;
  document.getElementById('secondOut').innerText = seconds;
});


function getNoOfDays(y, m) {
  return new Date(y, m + 1, 0).getDate();
}










// Blur Validation

  dayIn.addEventListener('blur', () => {
    validateDay();
  });


  const validateDay = () => {
    const D = dayIn.value;
    const M = monthIn.value;
    const Y = yearIn.value;
    if (D == '') {
      showMessage(dayIn, 'This field is required', errorStyle);
      return false;
    } else if (!validDay(Y, M, D)) {
      showMessage(dayIn, 'Must be a valid day', errorStyle);
      return false;
    } else {
      showMessage(dayIn, '', '');
      return true;
    }
  };


  monthIn.addEventListener('blur', () => {
    validateMonth();
  });

  const validateMonth = () => {
    const M = monthIn.value;
    if (M == '') {
      showMessage(monthIn, 'This field is required', errorStyle);
      return false;
    } else if (!validMonth(M)) {
      showMessage(monthIn, 'Must be a valid month', errorStyle);
      return false;
    } else {
      showMessage(monthIn, '', '');
      return true;
    }
  };


  yearIn.addEventListener('blur', () => {
    validateYear();
  });

  const validateYear = () => {
    const Y = yearIn.value;
    const M = monthIn.value;
    const D = dayIn.value;
    if (Y == '') {
      showMessage(yearIn, 'This field is required', errorStyle);
      return false;
    } else if (!validYear(Y, M, D)) {
      showMessage(yearIn, 'Must be in past', errorStyle);
      return false;
    } else {
      showMessage(yearIn, '', '');
      return true;
    }
  };

  function validDay(y, m, d) {
    if (d > getNoOfDays(y, m) || d < 1) return false;
    return true;
  }


  function validMonth(m) {
    if (m > 12 || m < 1) return false;
    return true;
  }


  function validYear(y, m, d) {
    const secondDate = new Date();
    const firstDate = new Date(`${y}-${m}-${d}`);
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  }


  function showMessage(elem, msg, border) {
    elem.style.border = border;
    elem.nextElementSibling.innerText = msg;
  }
