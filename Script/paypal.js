
var myname = GetCookie("FullName");

paypal.Buttons({
 
    // Sets up the transaction when a payment button is clicked
  
    createOrder: (data, actions) => {
  
      return actions.order.create({
  
        purchase_units: [{
  
          amount: {
           value:document.getElementById("totalpricAfterSale").value,
          }
  
        }]
  
      });
  
    },

  
    // Finalize the transaction after payer approval
  
    onApprove: (data, actions) => {
  
      return actions.order.capture().then(function(orderData) {
  
        // Successful capture! For dev/demo purposes:
  
        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
  
        const transaction = orderData.purchase_units[0].payments.captures[0];
  
        alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
        

        var val =document.getElementById("totalpricAfterSale").value;
        document.getElementById("successOperation").innerText="sucessfull transation you have paid : "+val;
        document.getElementById("totalpricAfterSale").value="0.0";
        localStorage.removeItem(myname);
        document.getElementById("CartProducts").innerHTML="";   
        document.getElementById("totalprice").innerText=""; 
        document.getElementById("totalpriceh").innerText=""; 
        document.getElementById("totallable").innerText="";   

  
        // When ready to go live, remove the alert and show a success message within this page. For example:
  
        // const element = document.getElementById('paypal-button-container');
  
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
  
        // Or go to another URL:  actions.redirect('thank_you.html');
       // window.location.href="approve.html";
  
      });
  
    }

  
  }).render('#paypal-button-container');
  
  