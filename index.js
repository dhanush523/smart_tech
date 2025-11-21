function toggleMenu() {
      const navLinks = document.getElementById("navLinks");
      navLinks.classList.toggle("active");
    }

    //    <!-- -------------------------------------------------------------------------------------------- -->
 let selectedService = "";

function bookService(serviceName) {
  selectedService = serviceName;
  document.getElementById("popup-overlay").style.display = "block";
  document.getElementById("location-popup").style.display = "block";
}

/* -------------------- OPEN FORMS -------------------- */

function openShopForm() {
  document.getElementById("location-popup").style.display = "none";
  document.getElementById("shop-form").style.display = "block";
}

function openHomeForm() {
  document.getElementById("location-popup").style.display = "none";
  document.getElementById("home-form").style.display = "block";
}

/* -------------------- CLOSE POPUPS -------------------- */

function closePopups() {
  resetShopForm();
  resetHomeForm();

  document.getElementById("popup-overlay").style.display = "none";
  document.getElementById("location-popup").style.display = "none";
  document.getElementById("shop-form").style.display = "none";
  document.getElementById("home-form").style.display = "none";
}

/* -------------------- RESET FORMS -------------------- */

function resetShopForm() {
  document.getElementById("shop-name").value = "";
  document.getElementById("shop-phone").value = "";
  document.getElementById("shop-date").value = "";
  document.getElementById("shop-time").value = "";
}

function resetHomeForm() {
  document.getElementById("home-name").value = "";
  document.getElementById("home-phone").value = "";
  document.getElementById("home-address").value = "";
  document.getElementById("home-date").value = "";
  document.getElementById("home-time").value = "";
}

/* -------------------- VALIDATION FUNCTIONS -------------------- */

function isValidName(name) {
  const namePattern = /^[A-Za-z ]+$/;
  return namePattern.test(name);
}

function isValidIndianPhone(phone) {
  const phonePattern = /^[6-9]\d{9}$/;
  return phonePattern.test(phone);
}

/* -------------------- SUBMIT SHOP FORM -------------------- */

function submitShop() {  
  const name = document.getElementById("shop-name").value.trim();
  const phone = document.getElementById("shop-phone").value.trim();
  const date = document.getElementById("shop-date").value;
  const time = document.getElementById("shop-time").value;

  // Your shop address (EDIT HERE)
  const shopAddress = "Smart Tech Info Solution, Avadi, Chennai – 600054";

  // Required field validation
  if (!name || !phone || !date) {
    alert("Please fill Name, Phone and Date.");
    return;
  }

  // Name validation
  if (!isValidName(name)) {
    alert("Enter a valid Name (letters only).");
    return;
  }

  // Indian Phone validation
  if (!isValidIndianPhone(phone)) {
    alert("Enter a valid Indian Phone Number (10 digits & starts with 6/7/8/9).");
    return;
  }

 const message = `📌 *Service Booking (At Shop)*

🔧 *Service:* ${selectedService}

👤 *Name:* ${name}
📞 *Phone:* ${phone}

📅 *Date:* ${date}
⏰ *Time:* ${time || "Not Selected"}

📍 *Our Shop Location:*  
https://maps.app.goo.gl/v2935ze3z8ncTNEd9
`;


  sendToWhatsApp(message);
  resetShopForm();
  closePopups();
}

/* -------------------- SUBMIT HOME FORM -------------------- */

function submitHome() {
  const name = document.getElementById("home-name").value.trim();
  const phone = document.getElementById("home-phone").value.trim();
  const address = document.getElementById("home-address").value.trim();
  const date = document.getElementById("home-date").value;
  const time = document.getElementById("home-time").value;

  // Required field validation
  if (!name || !phone || !address || !date) {
    alert("Please fill Name, Phone, Address and Date.");
    return;
  }

  // Name validation
  if (!isValidName(name)) {
    alert("Enter a valid Name (letters only).");
    return;
  }

  // Indian Phone validation
  if (!isValidIndianPhone(phone)) {
    alert("Enter a valid Indian Phone Number (10 digits & starts with 6/7/8/9).");
    return;
  }

  const message = `
📌 *Service Booking (At Home)*

🔧 *Service*: ${selectedService}
👤 *Name*: ${name}
📞 *Phone*: ${phone}
🏠 *Address*: ${address}

📅 *Date*: ${date}
⏰ *Time*: ${time || "Not Selected"}
  `;

  sendToWhatsApp(message);
  resetHomeForm();
  closePopups();
}


/* -------------------- SEND TO WHATSAPP -------------------- */

function sendToWhatsApp(msg) {
  const phone = "919360362776"; // your WhatsApp number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}



// --------------------------------------------------------------------------------------------