import { faker } from '@faker-js/faker';
import http from 'http'; // Import the http module

const createRandomContact = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    isFavourite: faker.datatype.boolean(),
    contactType: faker.helpers.arrayElement(['work', 'home', 'personal']),
  };
};

const addRandomContacts = async (count) => {
  // Make the function async
  for (let i = 0; i < count; i++) {
    const contact = createRandomContact();
    const contactData = JSON.stringify(contact);

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/contacts', // Assuming the endpoint is /contacts, adjust if needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(contactData),
      },
    };

    // Use a promise to handle the async request
    await new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        console.log(`Sending contact ${i + 1}: Status Code: ${res.statusCode}`);
        let responseBody = '';
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`Contact ${i + 1} sent successfully. Response: ${responseBody}`);
            resolve();
          } else {
            console.error(`Failed to send contact ${i + 1}. Status: ${res.statusCode}, Response: ${responseBody}`);
            reject(new Error(`Request failed with status code ${res.statusCode}`));
          }
        });
      });

      req.on('error', (error) => {
        console.error(`Error sending contact ${i + 1}:`, error);
        reject(error);
      });

      // Write data to request body
      req.write(contactData);
      req.end();
    }).catch((error) => {
      // Catch errors from the promise (network errors, etc.)
      console.error(`Promise error for contact ${i + 1}:`, error.message);
    });

    // Optional: Add a small delay between requests if needed
    // await new Promise(resolve => setTimeout(resolve, 100));
  }
  console.log('\nFinished sending all contacts.');
};

addRandomContacts(25);
