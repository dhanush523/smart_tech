function toggleMenu() {
      const navLinks = document.getElementById("navLinks");
      navLinks.classList.toggle("active");
    }

    //    <!-- -------------------------------------------------------------------------------------------- -->
 function bookService(serviceName) {
      const phoneNumber = "919360362776"; // replace with your WhatsApp number
      const message = `Hello! I want to book the service: 
    🛠️${serviceName}`;
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }
 
    // --------------------------------------------------------------------------------------------

    document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page reload

    // get form data
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let service = document.getElementById("service").value;
    let message = document.getElementById("message").value;

    let whatsappNumber = "919360362776"; // your number

    // whatsapp message url
    let url =
      "https://wa.me/" + whatsappNumber + "?text=" +
      "📩 *New Customer Enquiry*%0A%0A" +
      "*Name:* " + name + "%0A" +
      "*Phone:* " + phone + "%0A" +
      "*Email:* " + email + "%0A" +
      "*Service Needed:* " + service + "%0A" +
      "*Message:* " + message + "%0A";

    // open whatsapp
    window.open(url, "_blank");

    // clear form
    document.getElementById("contactForm").reset();
});

// --------------------------------------------------------------------------------------------