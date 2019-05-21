export const capitalizeString = string => {
  return (string.charAt(0).toUpperCase() + string.slice(1)).match(/[A-Z][a-z]+|[0-9]+/g).join(' ');
};

export const membershipCardContent = isMember => {
  const imageUrl = isMember
    ? require('../images/task-tracker.png')
    : require('../images/download.png');
  const title = isMember
    ? 'Congratulations! You are a task tracker member'
    : 'Task Tracker membership';
  const subtitle = isMember ? `Your subscription is activated` : 'Price: 5$ per month';
  const body = isMember
    ? 'Now you can create your own teams and also the limit connected with the creation of only 5 boards was also removed from you.'
    : 'Become our member and you will be able to create your own teams, create team boards and create your personal boards without any limits.';
  return { imageUrl, title, subtitle, body };
};

export const elementHeight = element => {
  return element && element.offsetHeight + 30;
};
