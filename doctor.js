const hospitals = {
    1: {
      name: "City General Hospital"
    },
    2: {
      name: "Metro Health Clinic"
    }
  };
  
 
  function bookConsultation() {
    const hospitalId = document.getElementById("hospital-select-consult").value;
    const department = document.getElementById("department-select").value;
    const date = document.getElementById("consultation-date").value;
    const timing = document.getElementById("timing-select").value;
  
    const hospitalName = hospitals[hospitalId].name;
    const confirmationMessage = `Consultation booked at ${hospitalName} in ${department} department on ${date} during the ${timing} slot.`;
  
    document.getElementById("consultation-result").textContent = confirmationMessage;
  }
  