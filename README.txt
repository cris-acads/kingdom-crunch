KINGDOM CRUNCH WEBSITE PROTOTYPE

Files:
- Kingdom Crunch.html
- Kingdom Crunch Design.css
- Kingdom Crunch.js
- images/ (logo, store photo, and menu images supplied earlier)

Open Kingdom Crunch.html in a modern browser. Keep all files and the images folder together.

Features: product add/edit/remove; category and description fields; hot and cold prices; shared stock; manual availability; customer hot/cold selection; cart and demo checkout; featured carousel with staff-managed selection and ordering; localStorage persistence.

Important: this is a front-end prototype. Data and uploaded product images are stored in the current browser's localStorage, so they do not sync to other devices or browsers. Staff access is open for demonstration and is not authentication. Orders are simulated and no real payment is processed.


NEW FEATURE: STAFF CUSTOMER ORDER MANAGEMENT
- Open Staff, then select the Customer Orders subtab.
- Orders submitted through customer checkout appear with order number, customer name, pickup time, item variants/quantities, and total.
- Staff can Confirm order, then mark it Completed after the customer picks it up. Completed orders remain in order history under the Completed orders filter; staff can permanently delete a completed record if needed.
- Orders are saved to localStorage in this browser and are loaded again when the page opens. The order count refreshes between tabs of the same local origin when supported. This is a prototype, so orders do not sync between different browsers/devices and local file-origin behavior can vary by browser.
- Stock is deducted when the customer places the order. Confirming an order does not deduct stock again.
