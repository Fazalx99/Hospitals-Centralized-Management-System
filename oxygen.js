
const hospitals = {
    1: {
      name: "City General Hospital",
      oxygenAvailable: true
    },
    2: {
      name: "Metro Health Clinic",
      oxygenAvailable: false
    }
  };
  
  // Load initial oxygen availability on page load
  window.onload = () => {
    for (let hospitalId in hospitals) {
      updateOxygenDisplay(hospitalId);
    }
  };
  
  // Function to check oxygen availability based on selected hospital
  function checkOxygen() {
    const hospitalId = document.getElementById("hospital-select").value;
    const hospital = hospitals[hospitalId];
  
    const availabilityMessage = hospital.oxygenAvailable
      ? `Oxygen is available at ${hospital.name}.`
      : `Oxygen is NOT available at ${hospital.name}.`;
  
    document.getElementById("availability-result").textContent = availabilityMessage;
  }
  
  // Function to update oxygen status in a specific hospital
  function updateOxygen(hospitalId) {
    // Simulate a random change in oxygen availability
    hospitals[hospitalId].oxygenAvailable = !hospitals[hospitalId].oxygenAvailable;
  
    // Update the DOM to reflect the change
    updateOxygenDisplay(hospitalId);
  
    alert(`Oxygen status updated for ${hospitals[hospitalId].name}`);
  }
  
  // Function to display the current oxygen status for a hospital
  function updateOxygenDisplay(hospitalId) {
    const oxygenElement = document.getElementById(`oxygen${hospitalId}`);
    oxygenElement.textContent = hospitals[hospitalId].oxygenAvailable ? "Available" : "Not Available";
  }
  