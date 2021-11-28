export const getFullname = (
  firstName: string,
  middleName: string,
  lastName: string,
) =>
  `${lastName ? lastName : ''} ${middleName ? middleName : ''} ${
    firstName ? firstName : ''
  }`;
