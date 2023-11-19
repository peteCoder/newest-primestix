export const formatLocation = (city, country) => {
  if (city && !country) {
    return `${city}`;
  } else if (!city && country) {
    return `${country}`;
  } else if (country && country) {
    return `${city}, ${country}`;
  }
};

export const formatEmailMessage = (userData) => {
  const { firstName, lastName, message, phoneNumber, email } = userData;

  const userMessage = `
    <h1>
        <strong>Name: ${firstName ? firstName : ""} ${
    lastName ? lastName : ""
  }</strong>
    </h1>
      <h1>
        <strong>Customer Email: ${email}</strong>
      </h1>
      <br/>
      <h1>
          <strong>Phone Number: ${phoneNumber}</strong>
      </h1>

      <h1>
          <strong>Message: ${message}</strong>
      </h1>
    `;

  return userMessage;
};
