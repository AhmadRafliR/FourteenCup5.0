async function fetchQuotaStatus() {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbz4CnkIxx6I1iUXwah3QSzQt6YSQz0XNpeANouynrCX7tVLfmWyVAHQlEAFXUy_xlE/exec';

  try {
    while (true) {
      const response = await fetch(scriptUrl, { mode: 'no-cors' });
      console.log('Response:', response);
      
      const text = await response.text();
      console.log('Text:', text);

      // Extract the quota remaining value from the response (assuming it is a simple number)
      const remainingQuota = parseInt(text);
      console.log('Remaining Quota:', remainingQuota);

      updateQuotaStatus(remainingQuota);

      if (remainingQuota <= 0) {
        break; // Exit the loop if the quota is reached
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    }
  } catch (error) {
    console.error('Error fetching quota status:', error);
  }
}
