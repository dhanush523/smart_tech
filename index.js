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
 