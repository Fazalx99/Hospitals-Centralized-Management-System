// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdycXpYW5zxq84rekT8OCSoIh5pNH7a08",
    authDomain: "healthcare-a4b5b.firebaseapp.com",
    projectId: "healthcare-a4b5b",
    storageBucket: "healthcare-a4b5b.appspot.com",
    messagingSenderId: "81540000620",
    appId: "1:81540000620:web:0df04a8936408501abe149",
    measurementId: "G-0JP3EJEPVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
document.getElementById('appointmentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const department = document.getElementById('department').value;
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('notes').value;

    // Add appointment to Firestore
    try {
        await addDoc(collection(db, "appointments"), {
            name: name,
            email: email,
            phone: phone,
            department: department,
            doctor: doctor,
            appointment_date: date,
            appointment_time: time,
            notes: notes,
            booking_time: serverTimestamp()
        });
        alert("Appointment booked successfully!");
        document.getElementById('appointmentForm').reset(); // Reset form fields
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

// Fetch and display data ordered by booking time
async function fetchAppointments() {
    const tableBody = document.querySelector('#appointmentTable tbody');

    // Create a query that orders documents by booking_time in ascending order
    const appointmentQuery = query(collection(db, "appointments"), orderBy("booking_time", "asc"));

    // Listen for real-time updates and fetch data
    onSnapshot(appointmentQuery, (snapshot) => {
        tableBody.innerHTML = ''; // Clear the table before adding new data
        snapshot.forEach(doc => {
            const appointment = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.name}</td>
                <td>${appointment.email}</td>
                <td>${appointment.phone}</td>
                <td>${appointment.department}</td>
                <td>${appointment.doctor}</td>
                <td>${appointment.appointment_date}</td>
                <td>${appointment.appointment_time}</td>
                <td>${appointment.notes || 'None'}</td>
            `;
            tableBody.appendChild(row);
        });
    }, (error) => {
        console.error("Error fetching data: ", error);
    });
}

// Initial fetch
fetchAppointments();
