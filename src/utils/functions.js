export const newStatusMove = status => {
  switch (status) {
    case 'open':
      return 'executed';
    case 'executed':
      return 'inspected';
    case 'inspected':
      return 'filed';
    default:
      return 'open';
  }
};
