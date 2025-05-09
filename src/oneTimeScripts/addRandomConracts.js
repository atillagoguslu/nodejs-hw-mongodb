import { faker } from '@faker-js/faker';
import http from 'http';

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
  for (let i = 0; i < count; i++) {
    const contact = createRandomContact();
    const contactData = JSON.stringify(contact);

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/contacts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(contactData),
      },
    };

    await new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve();
          } else {
            console.error(
              `Failed to send contact ${i + 1}. Status: ${res.statusCode}, Response: ${responseBody}`,
            );
            reject(new Error(`Request failed with status code ${res.statusCode}`));
          }
        });
      });

      req.on('error', (error) => {
        console.error(`Error sending contact ${i + 1}:`, error);
        reject(error);
      });

      req.write(contactData);
      req.end();
    }).catch((error) => {
      console.error(`Promise error for contact ${i + 1}:`, error.message);
    });
  }
};

addRandomContacts(25);
